<?php
// DB config
$db = new mysqli('localhost', 'DB_USER', 'DB_PASS', 'DB_NAME');
if ($db->connect_error) die('DB connection failed');

// Get today's leads
$today = date('Y-m-d');
$res = $db->query("SELECT * FROM leads WHERE DATE(created_at) = '$today'");

// Build HTML table
$html = "<h2>Today's Leads</h2><table border='1'><tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Notes</th><th>Location</th></tr>";
while ($row = $res->fetch_assoc()) {
  $html .= "<tr>
    <td>{$row['name']}</td>
    <td>{$row['email']}</td>
    <td>{$row['phone']}</td>
    <td>{$row['company']}</td>
    <td>{$row['notes']}</td>
    <td>{$row['location']}</td>
  </tr>";
}
$html .= "</table>";

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
$mail->Subject = "Daily Lead Summary ($today)";
$mail->isHTML(true);
$mail->Body = $html;
$mail->send();

// Note: Set up a CPanel Cron Job to run this file daily.
?>
