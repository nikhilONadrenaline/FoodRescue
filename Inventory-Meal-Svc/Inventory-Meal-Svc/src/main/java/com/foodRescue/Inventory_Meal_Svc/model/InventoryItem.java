package com.foodRescue.Inventory_Meal_Svc.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory_items")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "kitchen_id", nullable = false)
    private String kitchenId;

    @Column(nullable = false)
    private String name;

    private String category;

    @Column(nullable = false)
    private Double quantity;

    @Column(nullable = false)
    private String unit;

    private Double unitPrice;
    
    private Double totalPrice;

    private String storageUnit;

    private LocalDate purchaseDate;
    
    private LocalDate expiryDate;

    @Enumerated(EnumType.STRING)
    private ExpiryRiskLevel expiryRiskLevel;

    @Column(nullable = false)
    private boolean flaggedRed = false;

    private Double confidenceScore;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        calculateRiskLevel();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateRiskLevel();
    }

    public void calculateRiskLevel() {
        if (expiryDate == null) {
            this.expiryRiskLevel = ExpiryRiskLevel.LOW;
            return;
        }
        long daysUntilExpiry = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), expiryDate);
        if (daysUntilExpiry < 0) {
            this.expiryRiskLevel = ExpiryRiskLevel.EXPIRED;
        } else if (daysUntilExpiry <= 1) {
            this.expiryRiskLevel = ExpiryRiskLevel.HIGH;
        } else if (daysUntilExpiry <= 3) {
            this.expiryRiskLevel = ExpiryRiskLevel.MEDIUM;
        } else {
            this.expiryRiskLevel = ExpiryRiskLevel.LOW;
        }
    }

    public enum ExpiryRiskLevel {
        LOW, MEDIUM, HIGH, EXPIRED
    }
}
