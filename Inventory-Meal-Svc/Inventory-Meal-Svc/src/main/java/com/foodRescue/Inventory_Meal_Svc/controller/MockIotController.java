package com.foodRescue.Inventory_Meal_Svc.controller;

import com.foodRescue.Inventory_Meal_Svc.dto.ApiResponse;
import com.foodRescue.Inventory_Meal_Svc.service.MockIotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventory/mock-iot")
@RequiredArgsConstructor
public class MockIotController {

    private final MockIotService mockIotService;

    @PostMapping("/trigger-sweep")
    public ResponseEntity<ApiResponse<Void>> triggerSweep() {
        mockIotService.triggerSweep();
        return ResponseEntity.ok(ApiResponse.success(null, "Action completed successfully"));
    }
}
