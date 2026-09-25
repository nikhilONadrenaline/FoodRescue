package com.foodRescue.Auth_Network_Svc.service;

import com.foodRescue.Auth_Network_Svc.dto.AuthRequest;
import com.foodRescue.Auth_Network_Svc.dto.AuthResponse;
import com.foodRescue.Auth_Network_Svc.model.User;
import com.foodRescue.Auth_Network_Svc.repository.UserRepository;
import com.foodRescue.Auth_Network_Svc.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthResponse register(AuthRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email already in use")
                    .build();
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : User.Role.ROLE_KITCHEN)
                .orgName(request.getOrgName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .state(request.getState())
                .district(request.getDistrict())
                .locality(request.getLocality())
                .verified(false) // Admin verifies later, or auto verify
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .success(true)
                .message("User registered successfully")
                .profileId(user.getId())
                .role(user.getRole().name())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String jwtToken = jwtUtils.generateToken(userDetails);

        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .token(jwtToken)
                .profileId(user.getId())
                .role(user.getRole().name())
                .build();
    }

    public AuthResponse updateRole(String email, User.Role newRole) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() == User.Role.ROLE_NEEDS_CONFIRMATION) {
            user.setRole(newRole);
            userRepository.save(user);
            return AuthResponse.builder()
                    .success(true)
                    .message("Role updated successfully")
                    .profileId(user.getId())
                    .role(user.getRole().name())
                    .build();
        } else {
            return AuthResponse.builder()
                    .success(false)
                    .message("Role cannot be updated. User already has an assigned role.")
                    .profileId(user.getId())
                    .role(user.getRole().name())
                    .build();
        }
    }
}
