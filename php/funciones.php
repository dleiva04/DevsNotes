<?php
include 'conexion.php';

    if (isset($_POST['accion'])){
        switch($_POST['accion']){
            case 1:
            $username = $_POST['username'];
            $password = $_POST['password'];
            $sql = "call login('$username','$password')";
            $result = $conn->query($sql);
            
            if ($result->num_rows == 1) {
                echo "ingresado ";
            } else {
                echo "0 results";
            }
            break; 
        }
    }

?>