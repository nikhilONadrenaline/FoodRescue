package com.foodRescue.Inventory_Meal_Svc.controller;

import com.foodRescue.Inventory_Meal_Svc.dto.ApiResponse;
import com.foodRescue.Inventory_Meal_Svc.dto.BillCommitRequest;
import com.foodRescue.Inventory_Meal_Svc.model.Bill;
import com.foodRescue.Inventory_Meal_Svc.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/inventory/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PostMapping("/ocr")
    public ResponseEntity<ApiResponse<Map<String, Object>>> parseOcrBill(
            @RequestHeader("X-Kitchen-Id") String kitchenId,
            @RequestParam("file") MultipartFile file) {
        
        Map<String, Object> result = billService.parseOcrBill(file, kitchenId);
        return ResponseEntity.ok(ApiResponse.success(result, "Action completed successfully"));
    }

    @PostMapping("/commit")
    public ResponseEntity<ApiResponse<Bill>> commitBill(
            @RequestHeader("X-Kitchen-Id") String kitchenId,
            @RequestBody BillCommitRequest request) {
        
        Bill savedBill = billService.commitBill(kitchenId, request);
        return ResponseEntity.ok(ApiResponse.success(savedBill, "Action completed successfully"));
    }
}
