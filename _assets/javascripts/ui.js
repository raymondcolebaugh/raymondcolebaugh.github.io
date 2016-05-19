/**
 * Base64 decode an email address from the data-email
 * attribute of an element and update its href and text
 */
function decodeEmail(elem) {
    var email = atob($(elem).attr ('data-email'));
    $(elem).attr ('href', "mailto: " + email);
    $(elem).text (email);
    $(elem).unbind('click');
}

/**
 * Base64 decode a phone number from the data-phone
 * attribute of an element and update its href and text
 */
function decodePhone(elem) {
    var phone = atob($(elem).attr ('data-phone'));
    $(elem).attr ('href', "tel: +" + phone.replace(/[()\s]/g, ''));
    $(elem).text (phone);
    $(elem).unbind('click');
}

/**
 * Set up event handlers on ready
 */
$(function() {
    // Decode email addresses on click
    $(".email-link").click (function(event) {
        event.preventDefault();
        decodeEmail( $(this) );
    });

    // Decode phone numbers on click
    $(".phone-link").click (function(event) {
        event.preventDefault();
        decodePhone( $(this) );
    });

    // Remove href attribute when JS is enabled for proper modal initialization
    $(".key-link").attr ('href', '#');
});

