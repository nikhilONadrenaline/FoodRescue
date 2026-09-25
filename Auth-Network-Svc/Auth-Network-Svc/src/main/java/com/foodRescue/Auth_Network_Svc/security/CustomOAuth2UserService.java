package com.foodRescue.Auth_Network_Svc.security;

import com.foodRescue.Auth_Network_Svc.model.User;
import com.foodRescue.Auth_Network_Svc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getAttribute("sub");
        if (providerId == null) {
            providerId = oAuth2User.getAttribute("id"); // GitHub might use "id"
        }
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Update provider if needed
            if(user.getProvider() == null) {
                user.setProvider(provider);
                user.setProviderId(providerId);
                userRepository.save(user);
            }
        } else {
            // New user via OAuth2, save to DB with default role or handle registration flow
            user = User.builder()
                    .email(email)
                    .orgName(name)
                    .passwordHash("") // No password for OAuth2
                    .provider(provider)
                    .providerId(providerId)
                    .role(User.Role.ROLE_NEEDS_CONFIRMATION) // Defaulting to needs confirmation, they can update this
                    .verified(false)
                    .build();
            userRepository.save(user);
        }

        return new DefaultOAuth2User(
                Collections.singleton(new org.springframework.security.core.authority.SimpleGrantedAuthority(user.getRole().name())),
                oAuth2User.getAttributes(),
                "email" // Name attribute key
        );
    }
}
