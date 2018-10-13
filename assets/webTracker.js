/***********************************************************************************
 * X2CRM is a customer relationship management program developed by
 * X2Engine, Inc. Copyright (C) 2011-2016 X2Engine Inc.
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY X2ENGINE, X2ENGINE DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 * 
 * You can contact X2Engine, Inc. P.O. Box 66752, Scotts Valley,
 * California 95067, USA. on our website at www.x2crm.com, or at our
 * email address: contact@x2engine.com.
 * 
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 * 
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * X2Engine" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by X2Engine".
 **********************************************************************************/




var x2WebTracker = {};




/**
 * Constructs the weblistener url 
 * @return string
 */
x2WebTracker.getSendKeyUrl = function () {
    return '//crm.colebaugh.com/index.php/api/webListener';

};

/**
 * Structures the parameters which will get sent to the weblistener action, either as a query
 * string or as a dictionary
 * @param object args
 * @param string method ('GET'|'POST')
 * @return object|string 
 */
x2WebTracker.getSendKeyParams = function (args, method) {
    var x2GETKey = args['x2KeyGetParam']; 
    var url = args['url'];
     
    var attributes;
    var fingerprint = args['fingerprint']
    if (typeof fingerprint !== 'undefined') {
        // Ensure fingerprint data has valid keys: these will not be set
        // at this point if the client has DNT set
        if (typeof fingerprint['attributes'] !== 'undefined')
            attributes = fingerprint['attributes'];
        if (typeof fingerprint['fingerprint'] !== 'undefined')
            fingerprint = fingerprint['fingerprint'];
    }
          

    var params = {
        url: (method === 'GET') ? encodeURIComponent (url) : url,
        fingerprint: fingerprint,
        /*attributes: (method === 'GET') ? encodeURIComponent (fingerprint['attributes']) :
            fingerprint['attributes'],*/
         
    };
    if (x2GETKey !== null)
        params['get_key'] = (method === 'GET') ? encodeURIComponent (x2GETKey) : x2GETKey

             
    for (var fingerprintAttr in attributes) {
        params[fingerprintAttr] = (method === 'GET' ? 
            encodeURIComponent (attributes[fingerprintAttr]) : 
            attributes[fingerprintAttr]);
    }
     

    if (method === 'GET') {
        var queryString = '';
        var i = 0;
        for (var paramName in params) {
            if (i++ === 0) {
                queryString += '?';
            } else {
                queryString += '&';
            }
            queryString += paramName + '=' + params[paramName];
        }
        return queryString;
    } else {
        return params;
    }
};

/**
 * Sends the tracking information to the server using a script tag
 */
x2WebTracker.sendKeyNoCORS = function (args) {

    var sendKeyScript = document.createElement ('script');
    sendKeyScript.setAttribute (
        'src', x2WebTracker.getSendKeyUrl () + x2WebTracker.getSendKeyParams (args, 'GET'),
         true);
    document.getElementsByTagName("head")[0].appendChild(sendKeyScript);
};

/**
 * Sends tracking information to the server using an AJAX request if CORS is supported by browser.
 * Falls back on sendKey ().
 */
x2WebTracker.sendKey = function (args) {
    x2WebTracker.sendKeyNoCORS (args);
};

x2WebTracker.generateKey = function () {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var key = '';
    for(var i = 0; i < 32; ++i) { 
        key += chars.charAt (parseInt (Math.floor (Math.random () * chars.length)));
    }
    //console.log ('key = ' + key); 
    return key;
};

x2WebTracker.setKeyCookie = function (key) {
    // Remove a subdomain if present
    if (document.domain.split('.').length > 2)
        var domain = document.domain.replace (/^[^.]*/, '');
    else
        var domain = document.domain;

    document.cookie = "x2_key=" + key + 
        ";expires=" + (new Date (+new Date () + 31556940000)).toGMTString () +
        ";path=/;domain=" + domain;
};

x2WebTracker.setKeyCookieHiddenField = function (key) {
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            var hiddenFields = document.getElementsByName ('x2_key');
            if (hiddenFields.length > 0) {
                var hiddenField = hiddenFields[0];
                hiddenField.setAttribute ('value', key);
            }
        }
    }
};

(x2WebTracker.main = function () {
    var url = window.location.href;

        var fingerprint;
        
        var getParamRegex = /(?:^[?]|[?].*[?&])x2_key=([^&]+)/;
    if (window.location.search && window.location.search.match (getParamRegex)) {
        var x2KeyGetParam = window.location.search.replace (getParamRegex, '$1');
        if (x2KeyGetParam.match (/[a-zA-Z0-9]/)) {
            var x2KeyCookie = x2WebTracker.generateKey ();
            x2WebTracker.setKeyCookie (x2KeyCookie);
            x2WebTracker.sendKey ({
                url: url, 
                x2KeyGetParam: x2KeyGetParam , 
                fingerprint: fingerprint            });
            x2WebTracker.setKeyCookieHiddenField (x2KeyGetParam);
            return;
        }
    }

        var cookieRegex = /(?:^|.*;)\s*x2_key\s*=\s*([^;]*)(?:.*$|$)/;
    if (!document.cookie.match (cookieRegex)) {
        //console.log ('no cookie');
        var x2KeyCookie = x2WebTracker.generateKey ();
        x2WebTracker.setKeyCookie (x2KeyCookie);
        x2WebTracker.setKeyCookieHiddenField (x2KeyCookie);
                x2WebTracker.sendKey ({
            url: url, 
            x2KeyGetParam: null,
            fingerprint: fingerprint
        });
                return; 
    }

        var x2KeyCookie = document.cookie.replace (cookieRegex, '$1');
    //console.log ('x2KeyCookie = ');
    //console.log ('1' + x2KeyCookie + '1');
    if (x2KeyCookie.match (/[a-zA-Z0-9]/)) {
        x2WebTracker.sendKey ({
            url: url, 
            x2KeyGetParam: null , 
            fingerprint: fingerprint        });
        x2WebTracker.setKeyCookieHiddenField (x2KeyCookie);
    }
}) ();


