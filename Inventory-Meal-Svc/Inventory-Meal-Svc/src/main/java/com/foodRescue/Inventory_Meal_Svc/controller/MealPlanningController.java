package com.foodRescue.Inventory_Meal_Svc.controller;

import com.foodRescue.Inventory_Meal_Svc.dto.ApiResponse;
import com.foodRescue.Inventory_Meal_Svc.dto.MealSuggestionRequest;
import com.foodRescue.Inventory_Meal_Svc.dto.MealSuggestionResponse;
import com.foodRescue.Inventory_Meal_Svc.dto.PostMealUpdateRequest;
import com.foodRescue.Inventory_Meal_Svc.model.MealPlan;
import com.foodRescue.Inventory_Meal_Svc.service.MealPlanningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planning/meals")
@RequiredArgsConstructor
public class MealPlanningController {

    private final MealPlanningService mealPlanningService;

    @PostMapping("/suggest")
    public ResponseEntity<ApiResponse<MealSuggestionResponse>> suggestMealPlan(
            @RequestHeader("X-Kitchen-Id") String kitchenId,
            @RequestBody MealSuggestionRequest request) {
        
        MealSuggestionResponse response = mealPlanningService.getMealSuggestion(kitchenId, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Action completed successfully"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MealPlan>> createOrUpdateMealPlan(
            @RequestHeader("X-Kitchen-Id") String kitchenId,
            @RequestBody MealPlan mealPlan) {
        
        MealPlan savedPlan = mealPlanningService.createOrUpdateMealPlan(kitchenId, mealPlan);
        return ResponseEntity.ok(ApiResponse.success(savedPlan, "Action completed successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MealPlan>>> getMealPlans(
            @RequestHeader("X-Kitchen-Id") String kitchenId) {
        
        List<MealPlan> plans = mealPlanningService.getMealPlans(kitchenId);
        return ResponseEntity.ok(ApiResponse.success(plans, "Action completed successfully"));
    }

    @PostMapping("/{mealPlanId}/post-meal-update")
    public ResponseEntity<ApiResponse<MealPlan>> postMealUpdate(
            @RequestHeader("X-Kitchen-Id") String kitchenId,
            @PathVariable String mealPlanId,
            @RequestBody PostMealUpdateRequest request) {
        
        MealPlan updatedPlan = mealPlanningService.updatePostMeal(kitchenId, mealPlanId, request);
        return ResponseEntity.ok(ApiResponse.success(updatedPlan, "Action completed successfully"));
    }
}
