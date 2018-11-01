$(document).ready(function () {
    $('#nombreUsuario').text(sessionStorage.getItem('nombre'));
    $('#userUsuario').text(`@${sessionStorage.getItem('user')}`);
});