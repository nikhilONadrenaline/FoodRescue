package com.foodRescue.Inventory_Meal_Svc.service;

import com.foodRescue.Inventory_Meal_Svc.model.InventoryItem;
import com.foodRescue.Inventory_Meal_Svc.repository.InventoryItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MockIotService {

    private final InventoryItemRepository inventoryItemRepository;
    private final KafkaProducerService kafkaProducerService;

    // Runs every 4 hours or manually triggered
    @Scheduled(cron = "${iot.sweep.cron:0 0 */4 * * *}")
    public void scheduledSweep() {
        log.info("Starting Mock IoT Inventory Sweep...");
        triggerSweep();
    }

    public void triggerSweep() {
        // Items expiring within 24 hours (basically tomorrow or today)
        LocalDate tomorrow = LocalDate.now().plusDays(2);
        
        List<InventoryItem> itemsNearingExpiry = inventoryItemRepository
                .findByExpiryDateBeforeAndExpiryRiskLevelNot(tomorrow, InventoryItem.ExpiryRiskLevel.EXPIRED);

        for (InventoryItem item : itemsNearingExpiry) {
            long daysUntilExpiry = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), item.getExpiryDate());
            long hoursRemaining = daysUntilExpiry * 24;
            
            kafkaProducerService.publishIotAlert(
                    item.getKitchenId(), 
                    item.getName(), 
                    item.getStorageUnit(), 
                    hoursRemaining > 0 ? hoursRemaining : 0
            );
        }
        log.info("Completed Mock IoT Inventory Sweep. Flagged {} items.", itemsNearingExpiry.size());
    }
}
