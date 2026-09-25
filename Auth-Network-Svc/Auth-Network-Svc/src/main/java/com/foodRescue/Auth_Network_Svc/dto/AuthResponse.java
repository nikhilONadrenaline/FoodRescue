package com.foodRescue.Auth_Network_Svc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String refreshToken; // optional
    private String role;
    private String profileId;
    private boolean success;
    private String message;
}
