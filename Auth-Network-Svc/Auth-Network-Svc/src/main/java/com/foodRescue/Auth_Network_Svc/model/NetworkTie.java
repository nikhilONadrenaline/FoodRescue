package com.foodRescue.Auth_Network_Svc.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "network_ties")
public class NetworkTie {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "kitchen_id", nullable = false)
    private String kitchenId;

    @Column(name = "ngo_id", nullable = false)
    private String ngoId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TieStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum TieStatus {
        PENDING, ACCEPTED, REJECTED
    }
}
