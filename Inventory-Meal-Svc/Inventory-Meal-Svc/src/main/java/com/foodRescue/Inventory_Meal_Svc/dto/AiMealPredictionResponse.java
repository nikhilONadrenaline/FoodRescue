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
public class AiMealPredictionResponse {
    private Integer predictedPax;
    private List<DietItem> dietComposition;
    private Double confidenceScore;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DietItem {
        private String item;
        private Double recommendedProductionKg;
    }
}
