package com.foodRescue.Auth_Network_Svc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TieStatusRequest {
    private String status; // ACCEPTED or REJECTED
}
