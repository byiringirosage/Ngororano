# Car Repair Management System (CRPMS) - Project Structure

## Implementation Plan

Since we're unable to install Laravel directly due to missing PHP and Composer, this document outlines the complete project structure that would be created for the CRPMS system.

## Database Schema

```sql
-- Create database
CREATE DATABASE CRPMS;
USE CRPMS;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'mechanic') DEFAULT 'mechanic',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cars table
CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    type VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year_of_manufacture YEAR NOT NULL,
    driver_phone_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ServiceRecords table
CREATE TABLE service_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    service_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_record_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'cash',
    receipt_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_record_id) REFERENCES service_records(id) ON DELETE CASCADE
);

-- Insert predefined services
INSERT INTO services (name, description, price) VALUES
('Engine repair', 'Complete engine repair service', 150000.00),
('Transmission repair', 'Transmission system repair', 80800.00),
('Disc replacement', 'Brake disc replacement', 400000.00),
('Wheel alignment', 'Wheel alignment service', 5000.00);
```

## Laravel Project Structure

When Laravel is installed, the following structure would be created:

```
Ngororano_Samuel_National-_practical_exam_2025/
├── app/
│   ├── Console/
│   ├── Exceptions/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── CarController.php
│   │   │   ├── ServiceController.php
│   │   │   ├── ServiceRecordController.php
│   │   │   ├── PaymentController.php
│   │   │   ├── ReportController.php
│   │   │   └── Auth/
│   │   ├── Middleware/
│   │   └── Requests/
│   │       ├── CarRequest.php
│   │       ├── ServiceRequest.php
│   │       ├── ServiceRecordRequest.php
│   │       └── PaymentRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Car.php
│   │   ├── Service.php
│   │   ├── ServiceRecord.php
│   │   └── Payment.php
│   └── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   │   ├── 2014_10_12_000000_create_users_table.php
│   │   ├── 2023_01_01_000001_create_cars_table.php
│   │   ├── 2023_01_01_000002_create_services_table.php
│   │   ├── 2023_01_01_000003_create_service_records_table.php
│   │   └── 2023_01_01_000004_create_payments_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── ServiceSeeder.php
├── public/
│   ├── css/
│   ├── js/
│   └── index.php
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   └── app.js
│   └── views/
│       ├── auth/
│       ├── cars/
│       │   ├── index.blade.php
│       │   ├── create.blade.php
│       │   ├── edit.blade.php
│       │   └── show.blade.php
│       ├── services/
│       │   ├── index.blade.php
│       │   ├── create.blade.php
│       │   ├── edit.blade.php
│       │   └── show.blade.php
│       ├── service-records/
│       │   ├── index.blade.php
│       │   ├── create.blade.php
│       │   ├── edit.blade.php
│       │   └── show.blade.php
│       ├── payments/
│       │   ├── index.blade.php
│       │   ├── create.blade.php
│       │   ├── edit.blade.php
│       │   └── show.blade.php
│       ├── reports/
│       │   ├── index.blade.php
│       │   ├── daily.blade.php
│       │   ├── weekly.blade.php
│       │   └── monthly.blade.php
│       ├── layouts/
│       │   └── app.blade.php
│       ├── components/
│       └── dashboard.blade.php
├── routes/
│   ├── web.php
│   └── api.php
├── storage/
├── tests/
├── .env
├── .env.example
├── .gitignore
├── artisan
├── composer.json
├── package.json
├── tailwind.config.js
└── README.md
```

## Model Relationships

```php
// User Model
class User extends Authenticatable {
    public function serviceRecords() {
        return $this->hasMany(ServiceRecord::class);
    }
}

// Car Model
class Car extends Model {
    public function serviceRecords() {
        return $this->hasMany(ServiceRecord::class);
    }
}

// Service Model
class Service extends Model {
    public function serviceRecords() {
        return $this->hasMany(ServiceRecord::class);
    }
}

// ServiceRecord Model
class ServiceRecord extends Model {
    public function car() {
        return $this->belongsTo(Car::class);
    }

    public function service() {
        return $this->belongsTo(Service::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function payment() {
        return $this->hasOne(Payment::class);
    }
}

// Payment Model
class Payment extends Model {
    public function serviceRecord() {
        return $this->belongsTo(ServiceRecord::class);
    }
}
```

## Routes Configuration

```php
// web.php
Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('cars', CarController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('service-records', ServiceRecordController::class);
    Route::resource('payments', PaymentController::class);

    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/', [ReportController::class, 'index'])->name('index');
        Route::get('/daily', [ReportController::class, 'daily'])->name('daily');
        Route::get('/weekly', [ReportController::class, 'weekly'])->name('weekly');
        Route::get('/monthly', [ReportController::class, 'monthly'])->name('monthly');
        Route::get('/generate-pdf/{type}', [ReportController::class, 'generatePdf'])->name('generate-pdf');
    });
});

require __DIR__.'/auth.php';
```

## UI Implementation with Tailwind CSS

The UI would be implemented using Tailwind CSS with a responsive design that works on all devices. The layout would include:

1. A navigation menu with options for:

   - Cars
   - Services
   - Service Records
   - Payments
   - Reports
   - Logout

2. Dashboard with summary statistics
3. CRUD forms for all entities
4. Reporting interface with filtering options
5. Invoice generation functionality

## Installation Requirements

To implement this project, you would need:

1. PHP 8.1 or higher
2. Composer (for Laravel installation)
3. MySQL database server
4. Node.js and NPM (for frontend assets)

## Installation Steps

```bash
# Install Laravel
composer create-project --prefer-dist laravel/laravel Ngororano_Samuel_National-_practical_exam_2025

# Navigate to project directory
cd Ngororano_Samuel_National-_practical_exam_2025

# Install Laravel UI and authentication
composer require laravel/ui
php artisan ui bootstrap --auth

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure database in .env file
# Run migrations and seeders
php artisan migrate --seed

# Compile assets
npm run dev

# Start development server
php artisan serve
```

## Conclusion

This document outlines the complete structure and implementation plan for the Car Repair Management System (CRPMS) for smartPark. Once PHP and Composer are installed, this plan can be followed to create the full application as specified in the requirements.
