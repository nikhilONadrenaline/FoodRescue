package com.foodRescue.Inventory_Meal_Svc.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public void publishIotAlert(String kitchenId, String itemName, String storageUnit, long hoursRemaining) {
        try {
            Map<String, Object> payload = Map.of(
                    "kitchenId", kitchenId,
                    "itemName", itemName,
                    "storageUnit", storageUnit != null ? storageUnit : "UNKNOWN",
                    "hoursRemaining", hoursRemaining,
                    "alertTime", System.currentTimeMillis()
            );
            kafkaTemplate.send("inventory.iot-alert", kitchenId, payload);
            log.info("Published inventory.iot-alert event for item: {}", itemName);
        } catch (Exception e) {
            log.error("Failed to publish inventory.iot-alert event", e);
        }
    }

    public void publishMealWastage(String kitchenId, String mealPlanId, Object payload) {
        try {
            kafkaTemplate.send("meal.wastage-logged", kitchenId, payload);
            log.info("Published meal.wastage-logged event for mealPlanId: {}", mealPlanId);
        } catch (Exception e) {
            log.error("Failed to publish meal.wastage-logged event", e);
        }
    }
}
