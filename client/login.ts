import * as $ from 'jquery';

/* #region Vars */
const divContainer: JQuery<HTMLDivElement> = $('#container');

/* for signup*/
const inputName_signup = $('.input-signup-name');
const inputEmail_signup = $('.input-signup-email');
const inputPassword_signup = $('.input-signup-password');
const inputConfirmPassword_signup = $('.input-signup-confirm-password');

/* for signin */
const inputEmail_signin = $('.input-signup-email');
const inputPassword_signin = $('.input-signup-password');

/* #endregion */

$('#signUp').on('click', () => {
  divContainer.addClass('right-panel-active');
});

$('#signIn').on('click', () => {
  divContainer.removeClass('right-panel-active');
});

/* display progressbar while all this is going on */
