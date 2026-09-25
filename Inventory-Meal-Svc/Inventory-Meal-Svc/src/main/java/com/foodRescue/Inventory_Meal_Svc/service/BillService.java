package com.foodRescue.Inventory_Meal_Svc.service;

import com.foodRescue.Inventory_Meal_Svc.dto.BillCommitRequest;
import com.foodRescue.Inventory_Meal_Svc.model.Bill;
import com.foodRescue.Inventory_Meal_Svc.model.BillItem;
import com.foodRescue.Inventory_Meal_Svc.model.InventoryItem;
import com.foodRescue.Inventory_Meal_Svc.repository.BillRepository;
import com.foodRescue.Inventory_Meal_Svc.repository.InventoryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final InventoryItemRepository inventoryItemRepository;

    public Map<String, Object> parseOcrBill(MultipartFile file, String kitchenId) {
        // Mock OCR response as requested by PDF page 14
        return Map.of(
                "vendor", "M/S Kisan Mandi",
                "invoiceDate", "2026-09-25",
                "invoiceNumber", "INV-8910",
                "items", List.of(
                        Map.of("name", "Tomatoes", "quantity", 50.0, "unit", "KG", "unitPrice", 22.0, "totalPrice", 1100.0, "confidence", 0.94, "flaggedRed", false),
                        Map.of("name", "Paneer", "quantity", 10.0, "unit", "KG", "unitPrice", 320.0, "totalPrice", 3200.0, "confidence", 0.42, "flaggedRed", true)
                ),
                "totalAmount", 4300.0
        );
    }

    @Transactional
    public Bill commitBill(String kitchenId, BillCommitRequest request) {
        Bill bill = Bill.builder()
                .kitchenId(kitchenId)
                .vendor(request.getVendor())
                .invoiceDate(request.getInvoiceDate())
                .invoiceNumber(request.getInvoiceNumber())
                .status(Bill.BillStatus.COMMITTED)
                .items(new ArrayList<>())
                .build();

        double totalAmount = 0;

        for (BillCommitRequest.BillCommitItemRequest itemReq : request.getItems()) {
            double totalPrice = itemReq.getQuantity() * itemReq.getUnitPrice();
            totalAmount += totalPrice;

            BillItem billItem = BillItem.builder()
                    .bill(bill)
                    .name(itemReq.getName())
                    .quantity(itemReq.getQuantity())
                    .unit(itemReq.getUnit())
                    .unitPrice(itemReq.getUnitPrice())
                    .totalPrice(totalPrice)
                    .expiryDate(itemReq.getExpiryDate())
                    .build();
            
            bill.getItems().add(billItem);

            // Add to live inventory
            InventoryItem invItem = InventoryItem.builder()
                    .kitchenId(kitchenId)
                    .name(itemReq.getName())
                    .quantity(itemReq.getQuantity())
                    .unit(itemReq.getUnit())
                    .unitPrice(itemReq.getUnitPrice())
                    .totalPrice(totalPrice)
                    .purchaseDate(request.getInvoiceDate())
                    .expiryDate(itemReq.getExpiryDate())
                    .build();
            
            inventoryItemRepository.save(invItem);
        }
        
        bill.setTotalAmount(totalAmount);
        return billRepository.save(bill);
    }
}
