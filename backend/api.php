<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// DB config
$db = new mysqli('localhost', 'DB_USER', 'DB_PASS', 'DB_NAME');
if ($db->connect_error) die(json_encode(['error' => 'DB connection failed']));

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate
$name = $db->real_escape_string($data['name'] ?? '');
$email = $db->real_escape_string($data['email'] ?? '');
$phone = $db->real_escape_string($data['phone'] ?? '');
$company = $db->real_escape_string($data['company'] ?? '');
$notes = $db->real_escape_string($data['notes'] ?? '');
$location = $db->real_escape_string($data['location'] ?? '');

// Save to DB
$stmt = $db->prepare("INSERT INTO leads (name, email, phone, company, notes, location) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $email, $phone, $company, $notes, $location);
$stmt->execute();

// Generate vCard
$vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:$name\nEMAIL:$email\nTEL:$phone\nORG:$company\nNOTE:$notes\nEND:VCARD";

// Send email
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();
$mail->Host = 'SMTP_HOST';
$mail->SMTPAuth = true;
$mail->Username = 'SMTP_USER';
$mail->Password = 'SMTP_PASS';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('no-reply@yourdomain.com', 'Lead Capture');
$mail->addAddress('admin@yourdomain.com');
$mail->Subject = "New Lead: $name";
$mail->Body = "A new lead was captured:\n\nName: $name\nEmail: $email\nPhone: $phone\nCompany: $company\nNotes: $notes\nLocation: $location";
$mail->addStringAttachment($vcard, "lead.vcf");

if ($mail->send()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['error' => 'Mail failed']);
}
?>
