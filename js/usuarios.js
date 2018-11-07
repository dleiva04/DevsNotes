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
    
    $('#btnChat').click(function (e) { 
        e.preventDefault();
        console.log("click");
    });

    //=======================================================  
    $('#btnUsuarios').click(function (e) { 
        e.preventDefault();
        actualizarTablaRoles();
    });
    /*
    $('.rolU').hover(function () {
            // over
            if($('.rolU').hasClass('activo')){
                /*border: 2px solid green;
                                    color: black;
                                    .puntoU{
                                        background-color:green;
                                    }
                $('.rolU').css('border','2px solid red');
                $('.puntoU').css('background-color','red');
            }
            
        }, function () {
            // out
        }
    );
    */
});    
    function actualizarTablaRoles(){
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: {"accion":4},
            success: function (r) {
                    let infoUsers = JSON.parse(r);           
                    $('#cajaRoles').remove();  
                    $('#windowRoles').append(`
                    <div class="cajaRoles" id="cajaRoles">
                    </div>
                    `);                    
                    for(let i =0;i<infoUsers.length;i++){                      
                        $('.cajaRoles').append(`
                        <div class="cuadroRolUsuario">                        
                            <div class="cuadroUser">
                                <p class="titRoles">${infoUsers[i].Nombre}</p>
                                <p class="titRoles color">@${infoUsers[i].Nombre_Usuario}</p>
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
                                    <div class="rolU activo" id="admin" onclick="btnClick(this)">
                                        <div class="puntoU"></div>
                                        <p>Administrador</p>
                                    </div>`);
                                    break;
                                    case '2': 
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU activo" id="adminP" onclick="btnClick(this)">
                                        <div class="puntoU"></div>
                                        <p>Administrador Proyectos</p>
                                    </div>`);
                                    break;
                                    case '3':
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU activo" id="dev" onclick="btnClick(this)">
                                        <div class="puntoU"></div>
                                        <p>Desarrollador</p>
                                    </div>`);
                                    break;
                                }                           
                            } 
                            if(!(c.includes('1'))){
                                $(`#${infoUsers[i].Id_Usuario}`).append(`
                                <div class="rolU" id="admin" onclick="btnClick(this)">
                                    <div class="puntoU"></div>
                                    <p>Administrador</p>
                                </div>`);                                 
                            }
                            if(!(c.includes('2'))){
                                $(`#${infoUsers[i].Id_Usuario}`).append(`
                                <div class="rolU" id="adminP" onclick="btnClick(this)">
                                    <div class="puntoU"></div>
                                    <p>Administrador Proyectos</p>
                                </div>`); 
                            }
                            if(!(c.includes('3'))){
                                $(`#${infoUsers[i].Id_Usuario}`).append(`
                                <div class="rolU" id="dev" onclick="btnClick(this)">
                                    <div class="puntoU"></div>
                                    <p>Desarrollador</p>
                                </div>`);
                            }   
                        }else{
                            $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU" id="admin" onclick="btnClick(this)">
                                        <div class="puntoU"></div>
                                        <p>Administrador</p>
                                    </div>`);
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU" id="adminP" onclick="btnClick(this)">
                                        <div class="puntoU"></div>
                                        <p>Administrador Proyectos</p>
                                    </div>`);
                                    $(`#${infoUsers[i].Id_Usuario}`).append(`
                                    <div class="rolU" id="dev" onclick="btnClick(this)">
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
    }

    function btnClick(btn){        
        let padreID = $(btn).parent().attr('id'); 
        let idRolAccion;
        if(btn.id=="admin"){
            idRolAccion = 1;
        }else if(btn.id =="adminP"){
            idRolAccion = 2;
        }else{
            idRolAccion = 3;
        }
        console.log(idRolAccion);
        if(btn.className.includes("activo")){
            let datos = {
                "accion": 5,
                "idUser":parseInt(padreID),
                "idRolAccion":idRolAccion,
                "idAccion":1
            };
            console.log(datos);
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: datos,
                success: function (r) {
                    if(r == 1){
                        actualizarTablaRoles()
                    }else{
                        console.log("accion no realizada");
                    }
                }
            });
        }else{
            let datos = {
                "accion": 5,
                "idUser":parseInt(padreID),
                "idRolAccion":idRolAccion,
                "idAccion":0
            };
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: datos,
                success: function (r) {  
                    if(r == 1){
                        actualizarTablaRoles()
                    }else{
                        console.log("accion no realizada");                      
                    }               
                }
            });
        }
        $('#btnChat').click(function (e) { 
            e.preventDefault();
           $('#btnChat').toggleClass('des');
        });
    }