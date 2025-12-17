<?php
require "../../config/cors.php";
require "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$hash = password_hash($data['password'], PASSWORD_BCRYPT);

$stmt = $pdo->prepare("
  INSERT INTO users (first_name, last_name, email, password_hash)
  VALUES (?, ?, ?, ?)
");

$stmt->execute([
  $data['firstName'],
  $data['lastName'],
  $data['email'],
  $hash
]);

$_SESSION['user_id'] = $pdo->lastInsertId();

echo json_encode(["success" => true]);
