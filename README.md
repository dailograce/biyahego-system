# BIYAHEGO Frontend

BIYAHEGO is a Butuan City transportation frontend for route discovery, seat reservation, and commuter ticket tracking. It focuses on local trips connecting terminals, campuses, markets, ports, and Bancasi Airport. It is built for the ITE 18 midterm frontend track by the Dailo & Duro pair.

## Tech Stack

- React + Vite for the component-based frontend
- React Router for page navigation
- Redux Toolkit + React Redux for route and booking state
- Mock JSON endpoint under `public/mock-api/routes.json`
- Lucide React icons for accessible interface controls

## Implemented Screens

- Dashboard: overview cards, route network preview, and commuter flow
- Routes: reads and displays route schedules from the mock API
- Book: validated reservation form with fare summary
- Tickets: displays saved ticket records from Redux state

## Mock API Contract

Current frontend endpoint:

```text
GET /mock-api/routes.json
```

Expected response shape:

```json
{
  "routes": [
    {
      "id": "BX-101",
      "origin": "Langihan Terminal",
      "destination": "Bancasi Airport",
      "vehicle": "Airport Van",
      "departure": "06:30",
      "arrival": "07:05",
      "fare": 80,
      "seats": 10,
      "status": "On time",
      "operator": "Butuan Airport Shuttle"
    }
  ]
}
```

Suggested backend endpoints for final integration:

```text
GET    /api/routes
GET    /api/routes/:id
POST   /api/bookings
GET    /api/tickets/:passengerId
PATCH  /api/bookings/:id/status
```

## Draft ERD Agreement

Suggested shared entities for frontend and backend pairs:

```text
Passenger(passenger_id PK, full_name, mobile_number, email)
Operator(operator_id PK, operator_name, contact_number)
Vehicle(vehicle_id PK, operator_id FK, plate_number, vehicle_type, capacity)
Route(route_id PK, origin, destination, service_area, base_fare, estimated_duration)
Trip(trip_id PK, route_id FK, vehicle_id FK, departure_time, arrival_time, status)
Booking(booking_id PK, passenger_id FK, trip_id FK, seat_count, total_amount, booking_status, created_at)
Ticket(ticket_id PK, booking_id FK, ticket_code, issued_at, ticket_status)
```

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://127.0.0.1:5173/
```

## Midterm Coverage

- Complete main navigation and reusable components
- State management used in route selection, booking draft, and saved tickets
- Mock API integration reads and displays route data
- Validation and error handling on the booking form
- Responsive layout for mobile, tablet, and desktop
- Accessible labels, focus states, semantic headings, and readable contrast
