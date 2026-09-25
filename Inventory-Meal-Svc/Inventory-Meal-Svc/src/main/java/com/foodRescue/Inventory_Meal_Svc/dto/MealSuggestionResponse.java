package com.foodRescue.Inventory_Meal_Svc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealSuggestionResponse {
    private Integer predictedPax;
    private List<RecommendedDietItem> recommendedBalancedDiet;
    private String expectedSurplusRisk;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecommendedDietItem {
        private String item;
        private Double recommendedProductionKg;
    }
}
