"use strict";
exports.__esModule = true;
var $ = require("jquery");
/* #region Vars */
var divContainer = $('#container');
/* for signup*/
var inputName_signup = $('.input-signup-name');
var inputEmail_signup = $('.input-signup-email');
var inputPassword_signup = $('.input-signup-password');
var inputConfirmPassword_signup = $('.input-signup-confirm-password');
/* for signin */
var inputEmail_signin = $('.input-signup-email');
var inputPassword_signin = $('.input-signup-password');
/* #endregion */
$('#signUp').on('click', function () {
    divContainer.addClass('right-panel-active');
});
$('#signIn').on('click', function () {
    divContainer.removeClass('right-panel-active');
});
/* display progressbar while all this is going on */
