package com.foodRescue.Auth_Network_Svc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.foodRescue.Auth_Network_Svc.model.User;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleUpdateRequest {
    private String email;
    private User.Role role;
}
