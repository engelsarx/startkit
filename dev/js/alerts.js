var alert = {
	init : function() {
		alert.elem = {
			alerts: $('.alert'),
			alertClose: $('.alert__close')
		};

		alert.UIActions();
	},

	UIActions: function() {
		alert.elem.alertClose.on('click', alert.close);
	},

	close: function() {
		$(this).parent().fadeOut('slow');
	}
}

$(function() {
	alert.init();
});