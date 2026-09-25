package com.foodRescue.Inventory_Meal_Svc.repository;

import com.foodRescue.Inventory_Meal_Svc.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, String> {
    List<Bill> findByKitchenId(String kitchenId);
}
