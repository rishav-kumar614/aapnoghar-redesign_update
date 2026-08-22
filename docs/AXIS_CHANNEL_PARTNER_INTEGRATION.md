# Axis Channel Partner (AxisRooms) Integration Specification

## 1. Executive Summary & Objective
This document outlines the technical architecture and integration methodology for connecting the **AapnoGhar Resort & Water Park** website with the **Axis Channel Partner (AxisRooms Channel Manager / PMS)**.

The objective of this integration is to achieve **2-way real-time synchronization** for:
- Live room inventory across all 67 resort accommodations (Deluxe, Luxury, Suites, Presidential Villas).
- Dynamic rate management & seasonal promotions.
- Instant booking push & cancellation callbacks.
- **Double-booking mitigation** between direct web bookings and online travel agencies (MakeMyTrip, Agoda, Booking.com, Goibibo).

---

## 2. System Architecture & 2-Way Sync Flow

```
┌─────────────────────────┐                 ┌───────────────────────────────┐                 ┌──────────────────────────┐
│                         │   HTTPS JSON    │                               │   OTA XML       │   Online Travel Agencies │
│   AapnoGhar Direct Web  │ ──────────────> │   Axis Channel Partner API    │ ──────────────> │   (MakeMyTrip, Agoda,    │
│   Booking Engine        │ <────────────── │   (AxisRooms Channel Manager) │ <────────────── │    Booking.com, Goibibo) │
│                         │   Webhooks      │                               │   Sync          │                          │
└─────────────────────────┘                 └───────────────────────────────┘                 └──────────────────────────┘
             ▲                                             ▲
             │                                             │
             └───────────────────────┬─────────────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │  AapnoGhar Property PMS     │
                      │  (Front Desk / Inventory)   │
                      └─────────────────────────────┘
```

---

## 3. Core API Endpoints & Data Exchange

### 3.1 Inventory & Availability Pull (Live Check)
- **Endpoint**: `GET /api/v1/axis/inventory`
- **Purpose**: Retrieves real-time available room count for specified check-in and check-out dates.
- **Request Payload**:
```json
{
  "propertyId": "AAPNOGHAR_GGN_01",
  "checkInDate": "2026-09-01",
  "checkOutDate": "2026-09-03",
  "roomCodes": ["DELUXE", "LUXURY", "LUXURY_POOL", "LUXURY_SHOWER", "EXEC_SUITE", "PRES_GGN", "PRES_NCR"]
}
```
- **Response Payload**:
```json
{
  "status": "SUCCESS",
  "inventory": [
    { "roomCode": "DELUXE", "availableUnits": 3, "ratePerNight": 5999, "currency": "INR", "stopSell": false },
    { "roomCode": "LUXURY", "availableUnits": 2, "ratePerNight": 7499, "currency": "INR", "stopSell": false },
    { "roomCode": "EXEC_SUITE", "availableUnits": 1, "ratePerNight": 11999, "currency": "INR", "stopSell": false }
  ]
}
```

### 3.2 Instant Booking Push (Atomic Lock)
- **Endpoint**: `POST /api/v1/axis/bookings`
- **Purpose**: Creates confirmed reservation in AxisRooms and immediately locks inventory across all channels.
- **Request Payload**:
```json
{
  "bookingRef": "AG-20260901-8492",
  "propertyId": "AAPNOGHAR_GGN_01",
  "guest": {
    "name": "Aditya Sharma",
    "phone": "+919876543210",
    "email": "aditya@example.com"
  },
  "stay": {
    "roomCode": "LUXURY",
    "checkIn": "2026-09-01",
    "checkOut": "2026-09-03",
    "nights": 2,
    "guests": 2
  },
  "pricing": {
    "baseRate": 14998,
    "couponCode": "AAPNO10",
    "discount": 1499.8,
    "totalAmount": 13498.2,
    "currency": "INR"
  }
}
```

### 3.3 Two-Way Webhook Callback (Inventory Update on External OTA Bookings)
- **Endpoint**: `POST /api/webhooks/axis/inventory-update`
- **Purpose**: Whenever an OTA (e.g., MakeMyTrip) consumes an inventory unit, AxisRooms pushes an instant webhook to update direct web availability within < 2 seconds.

---

## 4. Double-Booking Prevention Mechanism

To guarantee **Zero Double Bookings**:
1. **Atomic Pre-Locking**: When a customer enters Step 2 of the booking process, an 8-minute soft hold is placed on the inventory slot via AxisRooms.
2. **Real-Time Rate Parity**: All rate updates (discounts, weekend surges, seasonal packages) published on AxisRooms are instantly reflected on the direct website.
3. **Automated Stop-Sell Trigger**: When remaining units reach `0`, the booking engine immediately displays "Sold Out" and recommends alternate dates/room categories.

---

## 5. Responsibilities & Limitations Matrix

| Component / Area | Agency Responsibility | AapnoGhar / Axis Channel Partner Responsibility |
| :--- | :--- | :--- |
| **API Client Integration** | Build frontend UI, booking engine, API middleware, and webhook handlers. | Provide valid AxisRooms Production/Staging API keys, Property ID, and endpoint URLs. |
| **Rate Management** | Render live rates and apply promotional coupon discounts on client end. | Configure base seasonal tariffs, extra bed charges, and tax slabs in AxisRooms PMS. |
| **Inventory Source of Truth** | Sync availability seamlessly and handle atomic reservation push. | Maintain room cleanliness status and physical room allocations at hotel front desk. |
| **Payment Gateway Integration** | Connect direct merchant account / WhatsApp receipt dispatch. | Reconcile payments received with AxisRooms folio accounts. |
| **Network SLA & Uptime** | Maintain 99.9% uptime on website frontend and API middleware. | Maintain 99.9% uptime on AxisRooms channel distribution servers. |

---

## 6. Security & Compliance
- **TLS 1.3 & HTTPS**: All API exchanges encrypted end-to-end.
- **HMAC Webhook Signatures**: Inbound inventory webhooks verified via secret cryptographic tokens.
- **PCI-DSS & Data Privacy**: Guest PII (Personally Identifiable Information) stored securely with strict retention policies.
