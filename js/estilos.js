$(document).ready(function () {    
    $('#background').css('height', $(window).height()+'px');
    $('#background').css('width', $(window).width()+'px');
    $(window).resize(function () { 
        $('#background').css('height', $(window).height()+'px');
        $('#background').css('width', $(window).width()+'px');
    });
    let porcentajeNav=0.15;
    $('#nav').css('height', ($(window).height()*porcentajeNav)+'px');
    $('#nav').css('width', $(window).width()+'px');
    $(window).resize(function () { 
        $('#nav').css('height', ($(window).height()*porcentajeNav)+'px');
        $('#nav').css('width', $(window).width()+'px');
    });
    let porcentajeCuerpo=0.85;
    $('#cuerpo').css('height', ($(window).height()*porcentajeCuerpo)+'px');
    $('#cuerpo').css('margin-top', ($(window).height()*porcentajeNav)+'px');
    $(window).resize(function () { 
        $('#cuerpo').css('height', ($(window).height()*porcentajeCuerpo)+'px');
        $('#cuerpo').css('margin-top', ($(window).height()*porcentajeNav)+'px');
    });    
    $('.item').click(function (e) { 
        e.preventDefault();
        if($('.item').hasClass('activo')){
            $('.item').removeClass('activo');
        }
        if($(this).hasClass('activo')){
            $(this).removeClass('activo');
        }else{
            $(this).addClass('activo');
        }        
    });
    $('#btnUsuarios').click(function (e) { 
        e.preventDefault();        
        console.log("click");
        $('#bienvenida').css('display', 'none');
        $('#proyectos').css('display', 'none');
        $('#usuarios').css('display', 'flex');
    });
    $('#btnProyectos').click(function (e) { 
        e.preventDefault();        
        console.log("click");
        $('#bienvenida').css('display', 'none');
        $('#usuarios').css('display', 'none');
        $('#proyectos').css('display', 'flex');
    });

});