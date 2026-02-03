# Lead Capture PWA Backend

## Setup

1. Creează baza de date și importă `leads.sql`.
2. Editează `api.php` și `daily_report.php` cu datele tale de conectare MySQL și SMTP.
3. Copiază fișierele PHP și PHPMailer în `public_html`.
4. Configurează un cron job pentru `daily_report.php` (ex: din CPanel).

## Notă
- Asigură-te că PHPMailer este inclus corect (poate fi descărcat de pe GitHub).
- CORS este activat în `api.php` pentru acces de pe frontend.
