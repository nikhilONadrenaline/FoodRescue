package com.foodRescue.Inventory_Meal_Svc.controller;

import com.foodRescue.Inventory_Meal_Svc.dto.ApiResponse;
import com.foodRescue.Inventory_Meal_Svc.model.InventoryItem;
import com.foodRescue.Inventory_Meal_Svc.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory/items")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<InventoryItem>>> getInventory(@RequestHeader("X-Kitchen-Id") String kitchenId) {
        List<InventoryItem> items = inventoryService.getAllInventory(kitchenId);
        return ResponseEntity.ok(ApiResponse.success(items, "Action completed successfully"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<InventoryItem>> addItem(@RequestHeader("X-Kitchen-Id") String kitchenId, @RequestBody InventoryItem item) {
        item.setKitchenId(kitchenId);
        InventoryItem savedItem = inventoryService.addItem(item);
        return ResponseEntity.ok(ApiResponse.success(savedItem, "Action completed successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable String id) {
        inventoryService.deleteItem(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Action completed successfully"));
    }
}
