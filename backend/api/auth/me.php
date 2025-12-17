<?php
require "../../config/cors.php";
require "../../config/db.php";
require "../../middleware/require_auth.php";

$stmt = $pdo->prepare("
  SELECT id, first_name, last_name, email, role
  FROM users WHERE id = ?
");
$stmt->execute([$_SESSION['user_id']]);

echo json_encode($stmt->fetch());
