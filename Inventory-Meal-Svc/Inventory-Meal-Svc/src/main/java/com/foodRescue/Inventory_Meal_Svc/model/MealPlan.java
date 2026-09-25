package com.foodRescue.Inventory_Meal_Svc.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meal_plans")
public class MealPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "kitchen_id", nullable = false)
    private String kitchenId;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Column(name = "ai_suggested_pax")
    private Integer aiSuggestedPax;

    @Column(name = "planned_pax")
    private Integer plannedPax;

    @Enumerated(EnumType.STRING)
    private MealPlanStatus status;

    @OneToMany(mappedBy = "mealPlan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MealPlanItem> items;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = MealPlanStatus.PLANNED;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum MealType {
        BREAKFAST, LUNCH, DINNER
    }

    public enum MealPlanStatus {
        PLANNED, COOKING, COMPLETED
    }
}
