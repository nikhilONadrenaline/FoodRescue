package com.foodRescue.Inventory_Meal_Svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meal_plan_items")
public class MealPlanItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    @JsonIgnore
    private MealPlan mealPlan;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "planned_qty")
    private Double plannedQty;

    @Column(name = "actual_consumed_qty")
    private Double actualConsumedQty;

    @Column(name = "wasted_qty")
    private Double wastedQty;

    @Column(name = "surplus_qty")
    private Double surplusQty;

    @Column(name = "waste_reason")
    private String wasteReason;

    @Column(name = "fit_for_redistribution")
    private Boolean fitForRedistribution;
}
