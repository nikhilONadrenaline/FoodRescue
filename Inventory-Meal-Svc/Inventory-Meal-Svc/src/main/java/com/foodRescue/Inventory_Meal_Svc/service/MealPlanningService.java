package com.foodRescue.Inventory_Meal_Svc.service;

import com.foodRescue.Inventory_Meal_Svc.client.AiServiceClient;
import com.foodRescue.Inventory_Meal_Svc.dto.*;
import com.foodRescue.Inventory_Meal_Svc.model.MealPlan;
import com.foodRescue.Inventory_Meal_Svc.model.MealPlanItem;
import com.foodRescue.Inventory_Meal_Svc.repository.MealPlanRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MealPlanningService {

    private final MealPlanRepository mealPlanRepository;
    private final AiServiceClient aiServiceClient;
    private final KafkaProducerService kafkaProducerService;

    @TimeLimiter(name = "aiService")
    @CircuitBreaker(name = "aiService", fallbackMethod = "defaultDietPlanFallback")
    public MealSuggestionResponse getMealSuggestion(String kitchenId, MealSuggestionRequest request) {
        AiMealPredictionRequest aiReq = AiMealPredictionRequest.builder()
                .kitchenId(kitchenId)
                .mealType(request.getMealType())
                .dayOfWeek(request.getTargetDate().getDayOfWeek().name())
                .historicalAveragePax(150) // Normally fetch from DB
                .build();

        AiMealPredictionResponse aiRes = aiServiceClient.predictMealPlan(aiReq);
        
        List<MealSuggestionResponse.RecommendedDietItem> diet = aiRes.getDietComposition().stream()
                .map(item -> new MealSuggestionResponse.RecommendedDietItem(item.getItem(), item.getRecommendedProductionKg()))
                .collect(Collectors.toList());

        return MealSuggestionResponse.builder()
                .predictedPax(aiRes.getPredictedPax())
                .recommendedBalancedDiet(diet)
                .expectedSurplusRisk(aiRes.getConfidenceScore() > 0.8 ? "LOW" : "MEDIUM")
                .build();
    }

    public MealSuggestionResponse defaultDietPlanFallback(String kitchenId, MealSuggestionRequest request, Throwable t) {
        log.warn("AI Service unavailable or timed out. Falling back to default diet plan. Reason: {}", t.getMessage());
        return MealSuggestionResponse.builder()
                .predictedPax(100)
                .recommendedBalancedDiet(List.of(
                        new MealSuggestionResponse.RecommendedDietItem("Basmati Rice", 35.0),
                        new MealSuggestionResponse.RecommendedDietItem("Dal Tadka", 25.0),
                        new MealSuggestionResponse.RecommendedDietItem("Mixed Vegetable", 28.0)
                ))
                .expectedSurplusRisk("LOW")
                .build();
    }

    @Transactional
    public MealPlan createOrUpdateMealPlan(String kitchenId, MealPlan mealPlan) {
        mealPlan.setKitchenId(kitchenId);
        if (mealPlan.getItems() != null) {
            mealPlan.getItems().forEach(item -> item.setMealPlan(mealPlan));
        }
        return mealPlanRepository.save(mealPlan);
    }

    public List<MealPlan> getMealPlans(String kitchenId) {
        return mealPlanRepository.findByKitchenId(kitchenId);
    }

    @Transactional
    public MealPlan updatePostMeal(String kitchenId, String mealPlanId, PostMealUpdateRequest request) {
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId)
                .orElseThrow(() -> new RuntimeException("Meal Plan not found"));

        if (!mealPlan.getKitchenId().equals(kitchenId)) {
            throw new RuntimeException("Unauthorized to update this meal plan");
        }

        // We update the items in meal plan based on requested wastage/surplus
        for (PostMealUpdateRequest.WasteItemDTO waste : request.getWastedItems()) {
            mealPlan.getItems().stream()
                    .filter(i -> i.getItemName().equals(waste.getItemName()))
                    .findFirst()
                    .ifPresent(i -> {
                        i.setWastedQty(waste.getWasteKg());
                        i.setWasteReason(waste.getReason());
                    });
        }

        for (PostMealUpdateRequest.SurplusItemDTO surplus : request.getRemainingSurplus()) {
            mealPlan.getItems().stream()
                    .filter(i -> i.getItemName().equals(surplus.getItemName()))
                    .findFirst()
                    .ifPresent(i -> {
                        i.setSurplusQty(surplus.getSurplusKg());
                        i.setFitForRedistribution(surplus.getFitForRedistribution());
                    });
        }
        
        mealPlan.setStatus(MealPlan.MealPlanStatus.COMPLETED);
        mealPlanRepository.save(mealPlan);

        kafkaProducerService.publishMealWastage(kitchenId, mealPlanId, request);

        return mealPlan;
    }
}
