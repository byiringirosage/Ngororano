# Car Repair Management System (CRPMS) for smartPark

## Project Overview

This web-based application is designed for smartPark, a company located in Rubavu District, Rwanda. It replaces their manual, paper-based system for managing car repair services with a digital solution that allows the chief mechanic to record car details, manage repair services, track payments, and generate reports.

## System Requirements

- PHP 8.1 or higher
- Composer
- Laravel Framework
- MySQL Database
- Node.js and NPM (for frontend assets)

## Database Structure

The system uses a MySQL database called CRPMS with the following tables:

### Users Table

- id (primary key)
- name
- email
- password
- role (admin, mechanic)
- created_at
- updated_at

### Cars Table

- id (primary key)
- license_plate
- type
- model
- year_of_manufacture
- driver_phone_number
- created_at
- updated_at

### Services Table

- id (primary key)
- name
- description
- price
- created_at
- updated_at

Pre-defined services:

- Engine repair: 150,000 Rwf
- Transmission repair: 80,800 Rwf
- Disc replacement: 400,000 Rwf
- Wheel alignment: 5,000 Rwf

### ServiceRecords Table

- id (primary key)
- car_id (foreign key)
- service_id (foreign key)
- user_id (foreign key)
- status (pending, in-progress, completed)
- notes
- created_at
- updated_at

### Payments Table

- id (primary key)
- service_record_id (foreign key)
- amount
- payment_date
- payment_method
- receipt_number
- created_at
- updated_at

## Features

### Authentication

- User login/logout
- Role-based access control

### Car Management

- Add new cars
- View car details
- Update car information
- Delete car records

### Service Management

- View available services
- Add new services
- Update service details
- Delete services

### Service Record Management

- Create new service records
- Assign services to cars
- Update service status
- View service history

### Payment Management

- Record payments
- Generate invoices
- View payment history

### Reporting

- Generate daily/weekly/monthly reports
- Service statistics
- Revenue reports

## Implementation Details

### Backend

- Laravel Framework
- MySQL Database
- RESTful API endpoints for CRUD operations

### Frontend

- Blade templates with Tailwind CSS
- Responsive design for all devices

### UI Features

- Dashboard with summary statistics
- Navigation menu with Car, Services, ServiceRecord, Payment, Reports, and Logout options
- Forms for data input with validation
- Tables for data display with sorting and filtering
- PDF generation for invoices and reports

## Installation Instructions

1. Clone the repository
2. Install dependencies: `composer install`
3. Copy .env.example to .env and configure database
4. Generate application key: `php artisan key:generate`
5. Run migrations and seeders: `php artisan migrate --seed`
6. Install frontend dependencies: `npm install`
7. Build frontend assets: `npm run dev`
8. Start the development server: `php artisan serve`

## Project Structure

- `app/Models` - Database models
- `app/Http/Controllers` - Controllers for handling requests
- `app/Http/Requests` - Form validation requests
- `database/migrations` - Database migrations
- `database/seeders` - Database seeders
- `resources/views` - Blade templates
- `routes` - Application routes
- `public` - Public assets

## Screenshots

[Screenshots would be included here after implementation]

## Future Enhancements

- Customer portal for service tracking
- SMS notifications for service updates
- Integration with accounting software
- Mobile application for mechanics

## Contact

For any inquiries, please contact smartPark management.
