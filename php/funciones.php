<?php
include 'conexion.php';
    if (isset($_POST['accion'])){
        switch($_POST['accion']){
            case 1:
            $username = $_POST['username'];
            $password = $_POST['password'];
            $sql = "call login2('$username','$password')";
            $result = $conn->query($sql);
            
            if ($result->num_rows>0) {                
                while($lector = $result->fetch_assoc()) {
                    $jsonArray[] = $lector; 
                }  
                
                //================================
                
                /*
                $_SESSION['nombre']='';
                $_SESSION['username']='';
                $_SESSION['idUsuario']='';
                $_SESSION['roles'] = array(1);
                */
                //================================
                
                echo json_encode($jsonArray);
            } else {
                echo 0;
            }
            break; 
        }
    }



?>