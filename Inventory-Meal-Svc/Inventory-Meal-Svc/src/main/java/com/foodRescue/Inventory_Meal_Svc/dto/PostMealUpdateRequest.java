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
public class PostMealUpdateRequest {
    private List<WasteItemDTO> wastedItems;
    private List<SurplusItemDTO> remainingSurplus;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WasteItemDTO {
        private String itemName;
        private Double wasteKg;
        private String reason;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SurplusItemDTO {
        private String itemName;
        private Double surplusKg;
        private Boolean fitForRedistribution;
    }
}
