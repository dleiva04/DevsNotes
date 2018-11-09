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
                    echo json_encode($jsonArray);
                } else {
                    echo 0;
                }
            break; 
            case 2:
                $username = $_POST['username'];
                $sql = "call comprobar_usuario('$username')";
                $result = $conn->query($sql); 
                if ($result->num_rows>0) { 
                    echo 1;  
                }else{
                    echo 0;
                }
            break;
            case 3: 
                $nombre = $_POST['nombre'];
                $usuario = $_POST['usuario'];
                $pass = $_POST['pass1'];
                $sql = "call registro_usuarios('$nombre','$usuario','$pass')";
                if ($conn->query($sql) === TRUE) {
                    echo 1;
                }else{
                    echo 0;
                }                
            break;
            case 4: 
                $sql = "call usuario_roles()";
                $result = $conn->query($sql);            
                if ($result->num_rows>0) {                
                    while($lector = $result->fetch_assoc()) {
                        $jsonArray[] = $lector; 
                    }  
                    echo json_encode($jsonArray);
                } else {
                    echo 0;
                }
            break;
            case 5:
                $idUser = $_POST['idUser'];
                $idRolAccion = $_POST['idRolAccion'];
                $idAccion = $_POST['idAccion'];
                $sql = "call condicionUsuariosRoles('$idUser','$idRolAccion','$idAccion')";
                if ($conn->query($sql) === TRUE) {
                    echo 1;
                }else{
                    echo 0;
                }  
            break;
            case 6:
                $idUser = $_POST['idUser'];
                $idRolAccion = $_POST['idRolAccion'];
                $idAccion = $_POST['idAccion'];
                $sql = "call condicionUsuariosRoles('$idUser','$idRolAccion','$idAccion')";
                $result = $conn->query($sql);            
                if ($conn->query($sql) === TRUE) {
                    echo 1;
                }else{
                    echo 0;
                }  
            break;
            case 7: 
                $idUser = $_POST['idUser'];
                $sql = "call selectProyectos('$idUser')";
                $result = $conn->query($sql);            
                if ($result->num_rows>0) {                
                    while($lector = $result->fetch_assoc()) {
                        $jsonArray[] = $lector; 
                    }  
                    echo json_encode($jsonArray);
                } else {
                    echo 0;
                }
            break;
            case 8:            
                $idProyecto = $_POST['idProyecto'];
                $idUser = $_POST['idUser'];
                $desConsulta = $_POST['desConsulta'];
                $sql = "call Insertar_Consulta('$desConsulta','$idUser','$idProyecto')";
                if ($conn->query($sql) === TRUE) {
                    echo 1;
                }else{
                    echo 0;
                }  
            break;
            case 9:
                $idProyecto = $_POST['idProyecto'];
                $sql = "call Seleccion_Mensajes('$idProyecto')";
                $result = $conn->query($sql);            
                if ($result->num_rows>0) {                
                    while($lector = $result->fetch_assoc()) {
                        $jsonArray[] = $lector; 
                    }  
                    echo json_encode($jsonArray);
                } else {
                    echo 0;
                }
            break;
            case 10:
                $idUser = $_POST['idUser'];
                $sql = "call Eliminar_Usuario('$idUser')";
                if ($conn->query($sql) === TRUE) {
                    echo 1;
                }else{
                    echo 0;
                } 
            break;
            case 11:             
                $idNombreProyecto = $_POST['nombreProyecto'];
                $idUser = $_POST['idCreador'];
                $sql = "call Crear_Proyecto('$idNombreProyecto','$idUser')";
                if ($conn->query($sql) === TRUE) {
                    echo 1;
                }else{
                    echo 0;
                } 
            break;
            case 12:             
                $sql = "call Nombre_Id()";
                $result = $conn->query($sql);            
                if ($result->num_rows>0) {                
                    while($lector = $result->fetch_assoc()) {
                        $jsonArray[] = $lector; 
                    }  
                    echo json_encode($jsonArray);
                } else {
                    echo 0;
                }
            break;
            case 13:             
                $sql = "call Select_Proyecto2()";
                $result = $conn->query($sql);            
                if ($result->num_rows>0) {                
                    while($lector = $result->fetch_assoc()) {
                        $jsonArray[] = $lector; 
                    }  
                    echo json_encode($jsonArray);
                } else {
                    echo 0;
                }
            break;
        }
    }



?>