package com.foodRescue.Inventory_Meal_Svc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiMealPredictionRequest {
    private String kitchenId;
    private String mealType;
    private String dayOfWeek;
    private Integer historicalAveragePax;
}
