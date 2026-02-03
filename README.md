# Lead Capture PWA

## Overview
A mobile-first Progressive Web App for capturing leads via QR code, business card OCR, or manual entry. Backend is PHP + MySQL, frontend is React (Vite) + Tailwind CSS.

## Setup

### 1. Database
- Import `backend/leads.sql` into your MySQL database.

### 2. Backend
- Upload `backend/api.php`, `backend/daily_report.php`, and PHPMailer library to your `public_html` folder.
- Edit DB and SMTP credentials in the PHP files.
- Set up a daily cron job for `daily_report.php` in CPanel.

### 3. Frontend
- Install dependencies in `frontend`:
  ```bash
  npm install
  ```
- Add Tailwind CSS, Tesseract.js, html5-qrcode as dependencies:
  ```bash
  npm install tailwindcss tesseract.js html5-qrcode
  ```
- Build the app:
  ```bash
  npm run build
  ```
- Upload the contents of `frontend/dist` to your `public_html` (or a subfolder).

### 4. CORS
- If frontend and backend are on different domains, keep the CORS headers in `api.php`.

## Usage
- Home screen: choose QR, OCR, or manual entry.
- OCR uses Tesseract.js to extract contact info from business cards.
- Data is sent to backend, saved in MySQL, and emailed to admin as vCard.

## Daily Report
- `daily_report.php` sends a daily summary email of all leads captured today.

---
Replace placeholders (DB_USER, DB_PASS, SMTP_HOST, etc.) with your actual credentials.
