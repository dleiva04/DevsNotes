$(document).ready(function () {
    $('#nombreUsuario').text(sessionStorage.getItem('nombre'));
    $('#userUsuario').text(`@${sessionStorage.getItem('user')}`);
    
    const rol1 = sessionStorage.getItem('rol1');//Admin 
    const rol2 = sessionStorage.getItem('rol2');//Admin P 
    const rol3 = sessionStorage.getItem('rol3');//dev
    
    
    if(rol1 == null){
        $('#btnUsuarios').remove();
        $('#admin').remove();
    }
    if(rol2 == null){
        $('#adminP').remove();
    }
    if(rol3 == null){
        $('#dev').remove();
    }
    if(rol3 == null && rol2 == null){
        $('#btnProyectos').remove();
    }
    //=======================================================
    //Comprobaciones del formulario de registro de usuarios
    $('#nombre').change(function (e){
        if($('#nombre').val() != ""){
            $('#nombre').css('border','1px solid green');
        }else{
            $('#nombre').css('border','1px solid red');
        }        
    });
    $('#usuario').change(function (e){    
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: {"accion":2,"username":$('#usuario').val()},
            success: function (r) {
                if(r == 1){
                    $('#usuario').css('border','1px solid red');
                }else{
                    $('#usuario').css('border','1px solid green');
                }
            }
        });
        //falta agregar texto de usuario valido o invalido, o ya en uso
    });
    $('#pass1').change(function (e){
        if($('#pass1').val() != ""){
            $('#pass1').css('border','1px solid green');
        } 
        if($('#pass1').val() != $('#pass2').val()){
            $('#pass1').css('border','1px solid red');
            $('#pass2').css('border','1px solid red');
        }else{
            $('#pass1').css('border','1px solid green');
            $('#pass2').css('border','1px solid green');
        }               
    });

    $('#pass2').change(function (e){
        if($('#pass2').val() != ""){
            $('#pass2').css('border','1px solid green');
        } 
        if($('#pass1').val() != $('#pass2').val()){
            $('#pass1').css('border','1px solid red');
            $('#pass2').css('border','1px solid red');
        }else{
            $('#pass1').css('border','1px solid green');
            $('#pass2').css('border','1px solid green');
        }              
    });

    $('#btnRegistrar').click(function (e) { 
        e.preventDefault();
        let seguir = true;
        if($('#nombre').val() == ""){
            $('#nombre').css('border','1px solid red');
            seguir = false;
        }
        if($('#usuario').val() == ""){
            $('#usuario').css('border','1px solid red');
            seguir = false;
        }
        if($('#pass1').val() == "" || $('#pass1').val() != $('#pass2').val() || $('#pass2').val()==""){
            $('#pass1').css('border','1px solid red');
            $('#pass2').css('border','1px solid red');
            seguir = false;
        }        
        if(seguir){
            let datos = {
                "accion":3,
                "nombre":$('#nombre').val(),
                "usuario":$('#usuario').val(),
                "pass1":$('#pass1').val()
            };
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: datos,
                success: function (r) {
                    if(r == 1){
                        alert('ingresado');  
                        limpiarFormRegistro();                      
                    }else{
                        alert('no ingresado');
                    }
                }
            });
        }
    });
    function limpiarFormRegistro() {  
        $('#nombre').val('');
        $('#usuario').val('');
        $('#pass1').val('');
        $('#pass2').val('');
        $('#nombre').css('border','1px solid black');
        $('#usuario').css('border','1px solid black');
        $('#pass1').css('border','1px solid black');
        $('#pass2').css('border','1px solid black');
    }    
    //=======================================================


    $('#btnUsuarios').click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: {"accion":4},
            success: function (r) {
                    let infoUsers = JSON.parse(r);      
                    console.log(infoUsers);        
                    for(let i =0;i<infoUsers.length;i++){                      
                        $('.cajaRoles').append(`
                        <div class="cuadroRolUsuario">                        
                            <div class="cuadroUser">
                                <p class="titRoles">${infoUsers[i].Nombre}</p>
                            </div>
                            <div class="cuadroRolesBtn">
                                <div class="cuadroRolesU" id="${infoUsers[i].Id_Usuario}">
                            `);
                        if(infoUsers[i].Correspondientes!=null){                            
                            let str = infoUsers[i].Correspondientes;
                            let c = str.split(",");
                            for(let j = 0;j<=c.length;j++){
                                switch(c[j]){
                                    case '1': 
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU activo" id="admin">
                                        <div class="puntoU"></div>
                                        <p>Administrador</p>
                                    </div>`);
                                    break;
                                    case '2': 
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU activo" id="adminP">
                                        <div class="puntoU"></div>
                                        <p>Administrador Proyectos</p>
                                    </div>`);
                                    break;
                                    case '3':
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU activo" id="dev">
                                        <div class="puntoU"></div>
                                        <p>Desarrollador</p>
                                    </div>`);
                                    break;
                                }
                            }    
                        }else{
                            $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU" id="admin">
                                        <div class="puntoU"></div>
                                        <p>Administrador</p>
                                    </div>`);
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU" id="adminP">
                                        <div class="puntoU"></div>
                                        <p>Administrador Proyectos</p>
                                    </div>`);
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU" id="dev">
                                        <div class="puntoU"></div>
                                        <p>Desarrollador</p>
                                    </div>`);
                        }
                        $('.cajaRoles').append(`
                        </div>
                        </div>`);
                    }             
            }
        });
    });

});
