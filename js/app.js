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
            success: function (response) {
                console.log(response);
                $('#username').val('');
                $('#password').val('');
            }
        });
    });


});