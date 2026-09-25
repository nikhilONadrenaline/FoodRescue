package com.foodRescue.Inventory_Meal_Svc.repository;

import com.foodRescue.Inventory_Meal_Svc.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, String> {
    List<InventoryItem> findByKitchenId(String kitchenId);
    List<InventoryItem> findByExpiryDateBeforeAndExpiryRiskLevelNot(LocalDate date, InventoryItem.ExpiryRiskLevel riskLevel);
}
