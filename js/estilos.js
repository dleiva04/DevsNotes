$(document).ready(function () {    
    $('#background').css('height', $(window).height()+'px');
    $('#background').css('width', $(window).width()+'px');
    $(window).resize(function () { 
        $('#background').css('height', $(window).height()+'px');
        $('#background').css('width', $(window).width()+'px');
    });
});