<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$db = new mysqli('localhost', 'root', '', 'leadx');
if ($db->connect_error) die(json_encode([]));

$res = $db->query("SELECT name, email, phone, company, notes, location FROM leads ORDER BY created_at DESC");
$leads = [];
while ($row = $res->fetch_assoc()) {
    $leads[] = $row;
}
echo json_encode($leads);
