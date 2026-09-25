package com.foodRescue.Auth_Network_Svc.repository;

import com.foodRescue.Auth_Network_Svc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    List<User> findByRoleAndStateAndDistrictAndLocality(User.Role role, String state, String district, String locality);
}
