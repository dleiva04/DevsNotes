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
        $('#crearProyecto').remove();
        $('#crearTarea').remove();
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
                        limpiarFormRegistro();  
                        $('#titulosNotificacion1').append(`
                        <div style ="font-size: 18px" class="alert alert-success notificacion" role="alert">
                            INGRESADO             
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `);        
                        actualizarTablaRoles();
                    }else{
                        $('#titulosNotificacion1').append(`
                        <div style ="font-size: 18px" class="alert alert-danger notificacion" role="alert">
                            ERROR AL REGISTRAR             
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `); 
                    }
                }
            });
        }
    });

    $('#btnProyectos').click(function (e) { 
        e.preventDefault();
        let datos = {
            "accion":16,
            "idUser":sessionStorage.getItem('idUser')
        };
        setInterval(() => {
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: datos,
            success: function (r) {
                let arr = JSON.parse(r);                
                cargarTareas(arr);
            }
        });
        }, 1000);
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
   $('#btnChat').click(function (e) { 
    e.preventDefault();
   $('.foro').toggleClass('des');
    });

    $('#cbxProyectosForo').click(function (e) { 
        e.preventDefault();
        //console.log("click");
        if(rol2 != null){
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: {"accion":13},
                success: function (r) {    
                    if(r == 0){
                        alert("No hay proyectos");
                    } else{
                        let info = JSON.parse(r);
                        $('#dropMenuForo').empty();     
                        for (const i of info) {
                            $('#dropMenuForo').append(`
                            <div class="dropdown-item itemChat" onclick="seleccionProyectoForo(this)" id="${i.Id_Proyecto}">${i.Nombre_Proyecto}</div>
                            `);
                        }
                    }          
                }
            });    
        }else{
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: {"accion":7,"idUser":sessionStorage.getItem('idUser')},
                success: function (r) {    
                    if(r == 0){
                        alert("No hay proyectos");
                    } else{
                        let info = JSON.parse(r);
                        $('#dropMenuForo').empty();     
                        for (const i of info) {
                            $('#dropMenuForo').append(`
                                <div class="dropdown-item itemChat" onclick="seleccionProyectoForo(this)" id="${i.Id_Proyecto}">${i.Nombre_Proyecto}</div>
                            `);
                        }
                    }          
                }
            }); 
        }      
    });
    let click = false;
    $('#cbxUserTarea').click(function (e) { 
        e.preventDefault();
        console.log("click");
        if(!click){                 
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: {"accion":12},
                success: function (r) {    
                    if(r == 0){
                        alert("No hay usuarios");
                    } else{
                        let info = JSON.parse(r);
                        $('#dropMenuUsuario').empty();     
                        for (const i of info) {
                            $('#dropMenuUsuario').append(`
                                <div class="dropdown-item itemChat" onclick="seleccionUsuarioTarea(this)" id="${i.Id_Usuario}">@${i.Nombre_Usuario}</div>
                            `);
                        }
                    }          
                }            
            });
            click = true;    
        }else{
            click = false;     
        }
    });
    let click1 = false;
    $('#cbxProyectoTarea').click(function (e) { 
        e.preventDefault();
        console.log("click");
        if(!click1){   
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: {"accion":13},
                success: function (r) {    
                    if(r == 0){
                        alert("No hay proyectos");
                    } else{
                        let info = JSON.parse(r);
                        $('#dropMenuProyecto').empty();     
                        for (const i of info) {
                            $('#dropMenuProyecto').append(`
                                <div class="dropdown-item itemChat" onclick="seleccionProyectoTarea(this)" id="${i.Id_Proyecto}">${i.Nombre_Proyecto}</div>
                            `);
                        }
                    }          
                }
            });      
        }else{
            click1 = true;
        }  
    });

    $('#btnEnviarMsj').click(function (e) { 
        e.preventDefault();

        let datos = {
            "accion":8,
            "idProyecto":sessionStorage.getItem("idProyectoSeleccionadoForo"),
            "idUser":sessionStorage.getItem("idUser"),
            "desConsulta":$('#msj').val()
        };
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: datos,
            success: function (r) {
                if(r == 1){
                    $('#msj').val('');
                }
            }
        });
        
    });
    $('#btnGuardarCambios').click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: {"accion":19,"observacion":$('#comment').val(),id},
            success: function (r) {
                
            }
        });
    });
    $('#btnCrearProyecto').click(function (e) { 
        let datos = {
            "accion":11,
            "nombreProyecto":$('#nombreProyecto').val(),
            "idCreador":sessionStorage.getItem('idUser')
        };
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: datos,
            success: function (r) {
                if(r==1){                   
                    $('#nombreProyecto').val('');
                    $('#titulosNotificacion2').append(`
                    <div style ="font-size: 18px" class="alert alert-success notificacion" role="alert">
                        INGRESADO             
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `);
                }else{
                    $('#titulosNotificacion2').append(`
                    <div style ="font-size: 18px" class="alert alert-danger notificacion" role="alert">
                        ERROR AL REGISTRAR              
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `);
                }
            }
        });
    });
    $('#btnCrearTarea').click(function (e) { 
        e.preventDefault();
        let datos = {
            "accion":14,
            "nombre": $('#nombreTarea').val(),
            "proyecto": sessionStorage.getItem('ProyectoTarea'),
            "idUsuario": sessionStorage.getItem('UsuarioTarea')
        };
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: datos,
            success: function (r) {
                console.log(r);
                $('#nombreTarea').val('');
                $('#cbxUserTarea').html('Usuario Encargado');
                $('#cbxProyectoTarea').html('Proyecto');
            }
        });
    });
    $('#grupoBtnP').click(function (e) { 
        e.preventDefault();
        console.log("click");
    });

});    
    function cargarTareas(arr){
        $('#cuadroTareas').empty();
        for (const i of arr) {
            let estado;
            let color;
            if(i.Id_Estado_Tarea == 1){
                estado = "Activo";
                color = 'darkorange';
            }else if(i.Id_Estado_Tarea == 2){
                estado = "Pausado";
                color = "darkseagreen";
            }else{
                estado = "Finalizado";
                color = "grey";
            }
            $('#cuadroTareas').append(`
            <div class="tarea" style = "border: 2px solid ${color};" id="${i.Id_Tarea}">
            <div class="tit" style = "border-bottom: 2px solid ${color};">
                <p id="id">${i.Descripcion}</p>
                <p id="id">Proyecto#${i.Id_Proyecto}</p>
            </div>
            <div class="cuerpoTarea">
                <button class="btn btn-primary btnDrop" data-toggle="modal" data-target="#obs" id="btnObservacion">Observacion</button>
                <button class="btn btn-primary btnDrop" id="btnFinalizar">Finalizar Tarea</button>
            </div>
            <div class="est">
                    <div class="estado1" onclick="cambiar(${i.Id_Tarea},1)">
                        <div class="estado e1"></div>
                        <p>Activo</p>
                    </div>                        
                    <div class="estado1" onclick="cambiar(${i.Id_Tarea},2)">
                        <div class="estado e2"></div>
                        <p>Pausado</p>
                    </div>                        
                    <div class="estado1" style="cursor: initial;">
                        <div class="estado e3"></div>
                        <p>Finalizado</p>
                    </div>
            </div>
            </div>
            `);
            
        }
    }    
    $('#btnFinalizar').click(function (e) { 
        e.preventDefault();
        console.log("clickfin");
        //cambiar();
    });
    function seleccionUsuarioTarea(btn){
        $('#cbxUserTarea').html($(btn).text());
        sessionStorage.setItem('UsuarioTarea',$(btn).attr('id'));
    }
    function seleccionProyectoTarea(btn){
        $('#cbxProyectoTarea').html($(btn).text());
        console.log(btn);
        sessionStorage.setItem('ProyectoTarea',$(btn).attr('id'));
    }
    function seleccionEstado(btn){
        $('#dropMenuEstados').html($(btn).text());
        console.log("click en estados");
    }

    function cambiar(idTarea,idEstado) { 
        $.ajax({
            type: "post",
            url: "php/funciones.php",            
            data: {"accion":18, "estado":idEstado,"idTarea":idTarea},
            success: function (r) {           
                if(r==0){
                    alert("error");
                }
            }
        });
    }
    function actualizarTablaRoles(){
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: {"accion":4},
            success: function (r) {
                    let infoUsers = JSON.parse(r);           
                    $('#cajaRoles').empty();                                 
                    for(let i =0;i<infoUsers.length;i++){                      
                        $('.cajaRoles').append(`
                        <div class="cuadroRolUsuario">                        
                            <div class="cuadroUser">
                                <p class="titRoles">${infoUsers[i].Nombre}</p>
                                <p class="titRoles color">@${infoUsers[i].Nombre_Usuario}</p>
                                <button class="btn btn-danger" onclick="eliminar(${infoUsers[i].Id_Usuario})" >Eliminar</button>
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

    function seleccionProyecto(btn){
        if(btn.className.includes("itemChat")){
            console.log("click en item");
            $('#cbxProyectos').html($(btn).text());
            sessionStorage.setItem('idProyectoSeleccionado',btn.id);
            $.ajax({
                type: "post",
                url: "php/funciones.php",
                data: {"accion":9,"idProyecto":sessionStorage.getItem('idProyectoSeleccionado')},
                success: function (r) {
                    console.log(r);
                }
            });
        }        
    }
    
    function seleccionProyectoForo(btn){
        if(btn.className.includes("itemChat")){
            //console.log(btn);
            $('#cbxProyectosForo').html($(btn).text());
            sessionStorage.setItem('idProyectoSeleccionadoForo',btn.id);
            setInterval(()=>{
            actualizarForo();
            },1000);
        }
    }
    function eliminar(btn){ 
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: {"accion":10,"idUser":btn},
            success: function (r) {
                console.log(r);
                actualizarTablaRoles();
            }
        });
    }
    function actualizarForo(){
        $.ajax({
            type: "post",
            url: "php/funciones.php",
            data: {"accion":17,"idProyecto":sessionStorage.getItem('idProyectoSeleccionadoForo')},
            success: function (r) {
                $('#mensajes').empty();  
                let msj = JSON.parse(r); 
                console.log(msj);
                for (const i of msj) {                          
                    $('#mensajes').append(`
                    <div class="mensaje">
                        <div class="persona">
                            <h4>@${i.Nombre_Usuario}</h4>
                        </div>
                        <div class="text">
                            <p>${i.Desc_Consulta}</p>
                        </div>
                    </div>
                    `);
                }              
            }
        });
    }
    function proyectosForo(e) {

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
        
    }