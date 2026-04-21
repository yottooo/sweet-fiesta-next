'use strict';
require('../css/login.css');

$(document).ready(function(){
    var isError = $('.alert').data('is-error');
    if (isError) {
        jQuery('.log-status').addClass('wrong-entry');
        jQuery('.log-status').addClass('wrong-entry');
        jQuery('.alert').fadeIn(500);
        setTimeout( "jQuery('.alert').fadeOut(1500);",3000 );
    }
});