$(document).ready(function () {
    $('#nombreUsuario').text(sessionStorage.getItem('nombre'));
    $('#userUsuario').text(`@${sessionStorage.getItem('user')}`);
    
    const rol1 = sessionStorage.getItem('rol1');
    const rol2 = sessionStorage.getItem('rol2');
    const rol3 = sessionStorage.getItem('rol3');
    
    if(rol1 == null){
        $('#btnUsuarios').remove();
        $('#adminP').remove();
    }else if(rol3 == null && rol2 == null){
        $('#btnProyectos').remove();
    }
    if(rol2 == null){
        $('#admin').remove();
    }else if(rol3 == null){
        $('#dev').remove();
    }



});