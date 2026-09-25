package com.foodRescue.Inventory_Meal_Svc.service;

import com.foodRescue.Inventory_Meal_Svc.model.InventoryItem;
import com.foodRescue.Inventory_Meal_Svc.repository.InventoryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryItemRepository inventoryItemRepository;

    public List<InventoryItem> getAllInventory(String kitchenId) {
        return inventoryItemRepository.findByKitchenId(kitchenId);
    }

    public InventoryItem addItem(InventoryItem item) {
        return inventoryItemRepository.save(item);
    }

    public Optional<InventoryItem> getItem(String id) {
        return inventoryItemRepository.findById(id);
    }

    public void deleteItem(String id) {
        inventoryItemRepository.deleteById(id);
    }

    public InventoryItem updateItem(String id, InventoryItem updatedItem) {
        return inventoryItemRepository.findById(id).map(existing -> {
            existing.setName(updatedItem.getName());
            existing.setCategory(updatedItem.getCategory());
            existing.setQuantity(updatedItem.getQuantity());
            existing.setUnit(updatedItem.getUnit());
            existing.setUnitPrice(updatedItem.getUnitPrice());
            existing.setStorageUnit(updatedItem.getStorageUnit());
            existing.setExpiryDate(updatedItem.getExpiryDate());
            return inventoryItemRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Item not found"));
    }
}
