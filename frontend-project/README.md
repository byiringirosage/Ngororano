Car Repair and Parking Management System (CRPMS)
This is a web-based application for SmartPark, a company in Rubavu District, Western Province of Rwanda, to manage car repair services. The system replaces a manual, paper-based process with a digital solution to handle car details, repair services, service records, payments, and generate reports. The application uses a MySQL database, a Node.js/Express backend, and a React.js frontend with Tailwind CSS for styling.
Project Structure
Ngororano_Samuel_National_practical_exam_2025/
├── backend-project/
│   ├── package.json
│   ├── server.js
│   ├── .env
├── frontend-project/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── components/
│   │   │   ├── Car.js
│   │   │   ├── Service.js
│   │   │   ├── ServiceRecord.js
│   │   │   ├── Payment.js
│   │   │   ├── Reports.js
├── CRPMS_Database_Schema.sql
├── README.md

Installed Software and Dependencies
Prerequisites

Node.js: Version 16 or higher (nodejs.org).
MySQL: Version 8 or higher (mysql.com).
WAMP: Provides MySQL and phpMyAdmin (wampserver.com).
Git: Optional, for version control (git-scm.com).
Web Browser: Chrome, Firefox, or similar.

Backend Dependencies

express: ^4.18.2 (REST API framework).
mysql2: ^3.2.0 (MySQL client for Node.js).
cors: ^2.8.5 (Enables CORS for frontend requests).
dotenv: ^16.0.3 (Loads environment variables).
Installation:cd backend-project
npm install express mysql2 cors dotenv



Frontend Dependencies

react: ^18.2.0 (React core library).
react-dom: ^18.2.0 (DOM rendering).
react-router-dom: ^6.11.0 (Client-side routing).
axios: ^1.4.0 (HTTP client for API requests).
tailwindcss: ^3.3.0 (CSS framework).
web-vitals: ^3.5.0 (Performance metrics).
react-scripts: ^5.0.1 (Create React App scripts).
Installation:cd frontend-project
npm install react react-dom react-router-dom axios tailwindcss web-vitals react-scripts
npm install -D tailwindcss
npx tailwindcss init



Database

MySQL Database: CRPMS with tables Car, Service, ServiceRecord, User, Payment.
Predefined services:
Engine Repair: 150,000 Rwf
Transmission Repair: 80,800 Rwf
Disc Replacement: 400,000 Rwf
Wheel Alignment: 5,000 Rwf



Installation Steps
1. Set Up the MySQL Database

Start WAMP and ensure MySQL is running.
Run CRPMS_Database_Schema.sql in phpMyAdmin (http://localhost/phpmyadmin) or a MySQL client:mysql -u root -p < CRPMS_Database_Schema.sql


Verify the CRPMS database and tables exist.

2. Set Up the Backend

Navigate to backend-project:cd backend-project


Install dependencies:npm install


Configure .env:DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=CRPMS1


Start the backend:npm start



3. Set Up the Frontend

Navigate to frontend-project:cd frontend-project


Install dependencies:npm install


Configure Tailwind CSS (ensure tailwind.config.js and src/index.css are set up as above).
Start the frontend:npm start



4. Verify Application

Open http://localhost:3000 in a browser.
Test pages: /car, /service, /service-record, /payment, /reports.
Add data and verify it appears in tables and reports.

Troubleshooting

Module not found: Run npm install in frontend-project or backend-project. Delete node_modules and package-lock.json, then reinstall.
Database errors: Verify MySQL credentials in .env and ensure the database is created.
Port conflicts: Change ports in server.js (backend) or package.json (frontend) if needed.
CORS issues: Ensure the backend is running before the frontend.

Author
Ngororano Samuel
License
For educational purposes (National Practical Exam 2025).
