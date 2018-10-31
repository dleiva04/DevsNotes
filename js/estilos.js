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
    $(window).resize(function () { 
        $('#cuerpo').css('height', ($(window).height()*porcentajeCuerpo)+'px');
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
});