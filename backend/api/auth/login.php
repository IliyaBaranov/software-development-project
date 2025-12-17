<?php
require "../../config/cors.php";
require "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$data['email']]);
$user = $stmt->fetch();

if (!$user || !password_verify($data['password'], $user['password_hash'])) {
  http_response_code(401);
  echo json_encode(["error" => "Invalid credentials"]);
  exit;
}

$_SESSION['user_id'] = $user['id'];

echo json_encode([
  "id" => $user['id'],
  "firstName" => $user['first_name'],
  "role" => $user['role']
]);
