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
    var screenHeight = window.screen.height;
    var screenWidth = window.screen.width;

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

    // Toggle PGP key dialog
    $(".pgp-link").click (function(event) {
        event.preventDefault();
        $("#pgpkey-dialog").dialog("open");
    });

    // Initialize PGP key dialog and start closed
    $("#pgpkey-dialog").dialog({
        dialog: true,
        width: screenWidth / 2,
        height: screenHeight / 2,
        buttons: {
            Ok: function() {
                $( this ).dialog ("close");
            }
        }
    });
    $("#pgpkey-dialog").dialog("close");
});

