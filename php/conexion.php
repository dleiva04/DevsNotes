<?php
$servername = "35.192.50.87:3306";
$username = "users";
$password = "";
$dbname = "devsnotes";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>