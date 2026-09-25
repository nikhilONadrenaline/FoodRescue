package com.foodRescue.Auth_Network_Svc.controller;

import com.foodRescue.Auth_Network_Svc.dto.AuthRequest;
import com.foodRescue.Auth_Network_Svc.dto.AuthResponse;
import com.foodRescue.Auth_Network_Svc.dto.RoleUpdateRequest;
import com.foodRescue.Auth_Network_Svc.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/update-role")
    public ResponseEntity<AuthResponse> updateRole(@RequestBody RoleUpdateRequest request) {
        return ResponseEntity.ok(authService.updateRole(request.getEmail(), request.getRole()));
    }
}
