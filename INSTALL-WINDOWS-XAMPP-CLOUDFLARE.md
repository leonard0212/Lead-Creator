
# Ghid Publicare LeadX Live prin Cloudflare Tunnel (subfolder htdocs cu site existent)


## 1. Instalare și configurare XAMPP
- Instalează XAMPP de la https://www.apachefriends.org/
- Pornește Apache și MySQL din XAMPP Control Panel.
- Web root-ul este de obicei `C:\xampp\htdocs`.
- Dacă ai deja un site principal (ex: WordPress) în `htdocs`, poți adăuga LeadX ca subfolder fără să afectezi site-ul existent.


## 2. Adăugare aplicație LeadX ca subfolder
- Creează folderul `LeadX` în `C:\xampp\htdocs` (dacă nu există deja).
- Copiază folderul `backend` (cu fișierele PHP) și `frontend` (build React) în `C:\xampp\htdocs\LeadX`.
- Din terminal, mergi în `frontend` și rulează `npm install` apoi `npm run build`.
- Copiază conținutul din `frontend/dist` peste `C:\xampp\htdocs\LeadX\frontend` (sau direct în `LeadX` dacă vrei să accesezi la `/LeadX/`).


## 3. Importă baza de date
- Accesează `http://localhost/phpmyadmin`.
- Creează o bază de date nouă (ex: `leadx`).
- Importă fișierul `backend/leads.sql`.


## 4. Configurează backend-ul
- Editează `backend/api.php`, `backend/leads.php` și `backend/daily_report.php` cu datele tale de conectare MySQL (user, parolă, nume DB).
- Pentru email, poți lăsa SMTP neconfigurat dacă nu vrei să trimiți mailuri.
- Asigură-te că PHPMailer este inclus corect (poate fi descărcat de pe GitHub).


## 5. Acces frontend
- Accesează din browser: `http://localhost/LeadX/` (sau `http://localhost/LeadX/frontend/` dacă ai pus build-ul acolo).
- Poți adăuga un link către LeadX din site-ul principal (ex: `<a href="/LeadX/">LeadX</a>`).


## 6. Integrare cu site existent (ex: WordPress, alt CMS)
- LeadX va funcționa ca subfolder (`/LeadX/`). Site-ul principal rămâne la `/`.
- Poți accesa LeadX la `http://localhost/LeadX/` sau la domeniul tău/LeadX după ce configurezi Cloudflare Tunnel.


## 7. Publicare LeadX live cu Cloudflare Tunnel (fără a afecta site-ul principal)
### 1. Creează cont Cloudflare și adaugă domeniul tău.
### 2. Instalează cloudflared:
  https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
### 3. Autentificare și creare tunel:
  ```powershell
  cloudflared tunnel login
  cloudflared tunnel create leadx-tunnel
  ```
### 4. Configurează DNS pentru subdomeniu dedicat LeadX (ex: leadx.yourdomain.com):
  ```powershell
  cloudflared tunnel route dns leadx-tunnel leadx.yourdomain.com
  ```
### 5. Rulează tunelul pentru subfolderul LeadX:
  ```powershell
  cloudflared tunnel run leadx-tunnel --url http://localhost/LeadX/
  ```
  - Dacă site-ul principal e la `http://localhost/`, iar LeadX la `http://localhost/LeadX/`, tunelul va expune doar subfolderul LeadX la subdomeniul ales.
  - Poți avea și un tunel separat pentru site-ul principal dacă vrei (ex: `cloudflared tunnel run main-tunnel --url http://localhost/`).
### 6. Accesează aplicația la `https://leadx.yourdomain.com` (subfolderul LeadX, site-ul principal rămâne neatins).


## 8. Depanare
- Dacă nu merge backend-ul, verifică:
  - Apache și MySQL rulează?
  - Datele de conectare în PHP sunt corecte?
  - PHPMailer e inclus corect?
- Dacă frontend-ul nu comunică cu backend-ul:
  - Verifică CORS în `api.php`.
  - Folosește calea relativă la API (ex: `fetch('api.php')` dacă frontend și backend sunt în același folder).
  - Dacă accesezi din subdomeniu Cloudflare, asigură-te că fetch-ul folosește calea corectă (`/LeadX/api.php`).
- Dacă tunelul Cloudflare nu funcționează:
  - Verifică log-urile cloudflared.
  - Asigură-te că DNS-ul Cloudflare pointează către tunel.
  - Poți rula tunelul cu `--url http://localhost/LeadX/` pentru subfolder sau `--url http://localhost/` pentru site principal.


## 9. Alte recomandări
- Deschide porturile Apache în firewall dacă vrei acces local.
- Pentru cron job pe Windows, folosește Task Scheduler pentru a rula `php daily_report.php` zilnic.
- Poți avea mai multe tuneluri Cloudflare pentru subdomenii diferite (ex: site principal și LeadX separat).
- Dacă vrei să accesezi LeadX din site-ul principal, adaugă un link către `/LeadX/`.


---
Dacă ai nevoie de ajutor suplimentar, cere suport cu detalii despre eroare sau pasul unde te-ai blocat.