'use strict';

const $ = require('jquery');
require ('../css/backend.css');

$(document).ready(function () {
    //check the action from the current url
    var $url = window.location.href;
    var $captured = /action=([^&]+)/.exec($url)[1]; // Value is in [1]
    //alert(captured);
    var $result = $captured ? $captured : 'edit'; //default is edit
    //alert($result);
    //on action 'new' hide slug
    if ($result == 'new') {
        var $slugInput = $('.vl-slug');
        var $slugInputParent = $slugInput.parent();
        $slugInput.hide();
        $slugInputParent.hide();
    }
});