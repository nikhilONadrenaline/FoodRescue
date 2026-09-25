package com.foodRescue.Auth_Network_Svc.dto;

import com.foodRescue.Auth_Network_Svc.model.User.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
    
    // For Registration
    private Role role;
    private String orgName;
    private String address;
    private String phone;
    private String state;
    private String district;
    private String locality;
}
