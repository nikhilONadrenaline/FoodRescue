package com.foodRescue.Inventory_Meal_Svc.repository;

import com.foodRescue.Inventory_Meal_Svc.model.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, String> {
    List<MealPlan> findByKitchenIdAndDate(String kitchenId, LocalDate date);
    List<MealPlan> findByKitchenId(String kitchenId);
}
