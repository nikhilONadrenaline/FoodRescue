package com.foodRescue.Auth_Network_Svc.controller;

import com.foodRescue.Auth_Network_Svc.model.NetworkTie;
import com.foodRescue.Auth_Network_Svc.repository.NetworkTieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/network-ties")
@RequiredArgsConstructor
public class NetworkTieController {

    private final NetworkTieRepository networkTieRepository;

    @GetMapping("/kitchen/{kitchenId}")
    public ResponseEntity<List<NetworkTie>> getByKitchenId(@PathVariable String kitchenId) {
        return ResponseEntity.ok(networkTieRepository.findByKitchenId(kitchenId));
    }

    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<NetworkTie>> getByNgoId(@PathVariable String ngoId) {
        return ResponseEntity.ok(networkTieRepository.findByNgoId(ngoId));
    }

    @PostMapping
    public ResponseEntity<NetworkTie> createTie(@RequestBody NetworkTie networkTie) {
        return ResponseEntity.ok(networkTieRepository.save(networkTie));
    }
}
