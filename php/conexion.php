<?php
$servername = "sql9.freemysqlhosting.net";
$username = "sql9264026";
$password = "fi6fmQgvqw";
$dbname = "sql9264026";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>