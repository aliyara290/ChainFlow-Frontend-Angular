# Customer Service Feature Guide

This guide explains how the Customer Service feature has been implemented using Angular and NgRx for state management.

## Overview

The Customer Service module handles the management of:
- Customers
- Orders
- Deliveries
- Drivers
- Vehicles

It interacts with the backend API at `http://localhost:8080/customer`.

## Architecture

### State Management (NgRx)
The feature uses NgRx for reactive state management.
- **Store Location**: `src/app/features/customer/store`
- **Feature State**: Registered as `customers`, `orders`, `deliveries`, `drivers`, `vehicles`.
- **Entities**: Uses `@ngrx/entity` for efficient collection management.

### Directory Structure
```
src/app/features/customer/
├── customers/       # Customer List and Form components
├── orders/          # Order List and Form components
├── deliveries/      # Delivery List and Form components
├── drivers/         # Driver List and Form components
├── vehicles/        # Vehicle List and Form components
├── models/          # TypeScript interfaces and Enums
├── services/        # HTTP Services
└── store/           # NgRx Actions, Reducers, Effects, Selectors
```

## Features & Usage

### 1. Customers
- **Route**: `/dashboard/customer/customers`
- **Functionality**: View list of customers, create new customer, edit existing customer, delete customer.
- **Data**: First Name, Last Name, Email, Phone, Address.

### 2. Orders
- **Route**: `/dashboard/customer/orders`
- **Functionality**: View orders, create order (add products), update status.
- **Data**: Order Status, Customer ID, Products (ID, Quantity).

### 3. Deliveries
- **Route**: `/dashboard/customer/deliveries`
- **Functionality**: Track deliveries, assign driver/vehicle, update status.
- **Data**: Status, Date, Cost, Address, Linked Order/Driver/Vehicle.

### 4. Drivers
- **Route**: `/dashboard/customer/drivers`
- **Functionality**: Manage drivers directory.
- **Data**: Name, contact info, License details.

### 5. Vehicles
- **Route**: `/dashboard/customer/vehicles`
- **Functionality**: Manage fleet of vehicles.
- **Data**: Plate Number, Brand, Model, Capacity, Status.

## Key Components

- **Services**: `CustomersService`, `OrdersService`, etc., handle HTTP communication.
- **Store**:
  - `Actions`: Define events (e.g., `loadCustomers`, `createCustomer`).
  - `Reducers`: Handle state changes based on actions.
  - `Effects`: Handle side effects (API calls).
  - `Selectors`: Select data from the store for components.

## How to Run

1.  Ensure the backend service is running on `http://localhost:8080`.
2.  Run the frontend:
    ```bash
    npm start
    ```
3.  Navigate to `http://localhost:4200/dashboard/customer/customers` (or via the dashboard navigation if linked).

## Notes
- **UI**: Built with PrimeNG components (Table, Dialog, Button, InputText).
- **Icons**: Uses PrimeIcons.
- **Styling**: Tailwind CSS (via `p-fluid` and utility classes).
