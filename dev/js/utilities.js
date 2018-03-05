var Utilities = (function (window, document, IBBC, undefined) {

  'use strict';

  return {
    checkIfIE10: function () {
      /*@cc_on
      if (/^10/.test(@_jscript_version)) {
          IBBC.isIE10 = true;
      }
      @*/

      if (IBBC.isIE10) {
        IBBC.E.classList.add('ie10-browser');
      }
    },
    checkIfIE11: function () {
      IBBC.isIE11 = !(window.ActiveXObject) && 'ActiveXObject' in window;

      if (IBBC.isIE11) {
        IBBC.E.classList.add('ie11-browser');
      }
    },
    checkIfFirefox: function () {
      IBBC.isFirefox = window.navigator.userAgent.search('Firefox');

      if (IBBC.isFirefox != -1) {
        IBBC.E.classList.add('firefox-browser');
      }
    },
    checkIfSafari: function () {
      IBBC.isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

      if (IBBC.isSafari) {
        IBBC.E.classList.add('safari-browser');
      }
    }
  };

}(window, document, window.IBBC));
