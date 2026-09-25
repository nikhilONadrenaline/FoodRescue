package com.foodRescue.Inventory_Meal_Svc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BillCommitRequest {
    private String vendor;
    private LocalDate invoiceDate;
    private String invoiceNumber;
    private List<BillCommitItemRequest> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BillCommitItemRequest {
        private String name;
        private Double quantity;
        private String unit;
        private Double unitPrice;
        private LocalDate expiryDate;
    }
}
