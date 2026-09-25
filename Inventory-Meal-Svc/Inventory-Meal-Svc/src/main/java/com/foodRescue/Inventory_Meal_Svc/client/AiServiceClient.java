package com.foodRescue.Inventory_Meal_Svc.client;

import com.foodRescue.Inventory_Meal_Svc.dto.AiMealPredictionRequest;
import com.foodRescue.Inventory_Meal_Svc.dto.AiMealPredictionResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ai-service", url = "${services.ai-service.url:http://localhost:8000}")
public interface AiServiceClient {

    @PostMapping("/predict/meal-plan")
    AiMealPredictionResponse predictMealPlan(@RequestBody AiMealPredictionRequest request);
}
