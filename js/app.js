$(document).ready(function () {
    $('#btnLogin').click(function (e) { 
        e.preventDefault();   
        let datos = {
            "accion":1,
            "username": $('#username').val(),
            "password": $('#password').val()
        };  
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: datos,
            success: function (r) {
                $('#username').val('');
                $('#password').val('');
                //console.log(r);
                let datos = JSON.parse(r);
                console.log(datos);
                sessionStorage.clear();
                sessionStorage.setItem('nombre',datos[0].Nombre);
                sessionStorage.setItem('user',datos[0].Nombre_Usuario);
                sessionStorage.setItem('idUser',datos[0].Id_Usuario);
                for(let i =0;i<datos.length;i++){
                    switch(datos[i].Desc_Rol){
                        case 'Desarrollador':
                        sessionStorage.setItem('rol3',datos[i].Id_Rol);
                        break;
                        case 'Administrador':
                        sessionStorage.setItem('rol1',datos[i].Id_Rol);
                        break;
                        case 'Administrador Proyectos':
                        sessionStorage.setItem('rol2',datos[i].Id_Rol);
                        break;
                    }
                }
                window.location.assign('/DevsNotes/landing.html');
            }
        });
    });       
});