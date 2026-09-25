package com.foodRescue.Auth_Network_Svc.model;

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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String orgName;
    private String phone;
    
    // Location hierarchy
    private String state;
    private String district;
    private String locality;
    private String address;

    @Column(nullable = false)
    private boolean verified = false;

    // For OAuth2
    private String provider;
    private String providerId;

    public enum Role {
        ROLE_KITCHEN, ROLE_NGO, ROLE_ADMIN, ROLE_NEEDS_CONFIRMATION
    }
}
