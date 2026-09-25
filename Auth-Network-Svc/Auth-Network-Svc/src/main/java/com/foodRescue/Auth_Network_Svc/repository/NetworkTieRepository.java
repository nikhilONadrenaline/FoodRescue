package com.foodRescue.Auth_Network_Svc.repository;

import com.foodRescue.Auth_Network_Svc.model.NetworkTie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NetworkTieRepository extends JpaRepository<NetworkTie, String> {
    List<NetworkTie> findByKitchenId(String kitchenId);
    List<NetworkTie> findByNgoId(String ngoId);
    List<NetworkTie> findByKitchenIdAndStatus(String kitchenId, NetworkTie.TieStatus status);
}
