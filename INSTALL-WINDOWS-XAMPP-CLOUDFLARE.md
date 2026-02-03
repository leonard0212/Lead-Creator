# Ghid Instalare și Depanare LeadX pe Windows Server cu XAMPP și Cloudflare Tunnel

## 1. Instalare și configurare XAMPP
- Instalează XAMPP de pe https://www.apachefriends.org/
- Pornește Apache și MySQL din XAMPP Control Panel.
- Web root-ul este de obicei `C:\xampp\htdocs`.

## 2. Adăugare aplicație LeadX
- Copiază folderul `backend` (cu fișierele PHP) și `frontend` (build React) în `C:\xampp\htdocs\LeadX`.
- După build (`npm run build` în `frontend`), copiază conținutul din `frontend/dist` în `C:\xampp\htdocs\LeadX\frontend`.

## 3. Importă baza de date
- Accesează `http://localhost/phpmyadmin`.
- Creează o bază de date nouă (ex: `leadx`).
- Importă fișierul `backend/leads.sql`.

## 4. Configurează backend-ul
- Editează `backend/api.php` și `backend/daily_report.php` cu datele tale de conectare MySQL și SMTP.
- Asigură-te că PHPMailer este inclus corect (poate fi descărcat de pe GitHub).

## 5. Acces frontend
- Accesează din browser: `http://localhost/LeadX/frontend/` sau `http://localhost/LeadX/`.
- Poți adăuga un link către LeadX din site-ul principal dacă ai deja un site pe server.

## 6. Integrare cu site existent
- Dacă ai deja un site în `htdocs`, LeadX va funcționa ca subfolder (`/LeadX/`).
- Nu afectează site-ul principal.

## 7. Instalare și configurare Cloudflare Tunnel
- Creează cont Cloudflare și adaugă domeniul tău.
- Instalează cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
- În CMD:
  ```powershell
  cloudflared tunnel login
  cloudflared tunnel create leadx-tunnel
  cloudflared tunnel route dns leadx-tunnel leadx.yourdomain.com
  cloudflared tunnel run leadx-tunnel --url http://localhost/LeadX/
  ```
- Accesează aplicația la `https://leadx.yourdomain.com`.

## 8. Depanare
- Dacă nu merge backend-ul, verifică:
  - Apache și MySQL rulează?
  - Datele de conectare în PHP sunt corecte?
  - PHPMailer e inclus corect?
- Dacă frontend-ul nu comunică cu backend-ul:
  - Verifică CORS în `api.php`.
  - Folosește URL complet către backend în fetch (ex: `https://leadx.yourdomain.com/backend/api.php`).
- Dacă tunelul Cloudflare nu funcționează:
  - Verifică log-urile cloudflared.
  - Asigură-te că DNS-ul Cloudflare pointează către tunel.

## 9. Alte recomandări
- Deschide porturile Apache în firewall dacă vrei acces local.
- Pentru cron job pe Windows, folosește Task Scheduler pentru a rula `php daily_report.php` zilnic.

---
Dacă ai nevoie de ajutor suplimentar, cere suport cu detalii despre eroare sau pasul unde te-ai blocat.