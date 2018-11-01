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
                sessionStorage.setItem('nombre',datos[0].Nombre);
                sessionStorage.setItem('user',datos[0].Nombre_Usuario);
                window.location.assign('/DevsNotes/index.html');
            }
        });
    });       
});