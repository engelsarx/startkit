var App = (function (window, document, undefined) {

  'use strict';

  var SETTINGS = {
    welcome: 'bbc'
  };

  var st = {
    triggerAlert: '.js-alert',
  };

  var dom = {};

  var catchDom = function () {
    dom.$triggerAlert = $(st.triggerAlert);
  };

  var susbscribeEvents = function () {
    dom.$triggerAlert.on('click', events.alertMessage);
  };

  var events = {
    alertMessage: function () {
      console.log(SETTINGS.welcome);
    }
  };

  var fn = {};

  var init = function () {
    catchDom();
    susbscribeEvents();
    // svg4everybody();
  };

  return {
    init: init
  };

}(window, document));
