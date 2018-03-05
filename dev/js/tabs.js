var tab = {

	init: function() {
		tab.elem = {
			tabs: $('.tabs'),
			tabsItem: $('.tabs__item'),
			tabsLink: $('.tabs__link'),
			tabsPanel: $('.tabs__panel')
		};

		tab.UIActions();
	},

	UIActions: function() {
		tab.elem.tabsLink.on('click', tab.animation);
	},

	animation: function() {
		tab.currentLink = $(this);
		tab.animationLink();
		tab.animationPanel();
	},

	animationLink: function() {
		tab.elem.tabsItem.removeClass('active');
		tab.currentLink.parent().addClass('active');
	},

	animationPanel: function() {
		tab.elem.tabsPanel.removeClass('active');
		tab.elem.tabsPanel.filter('[data-tab="'+ tab.currentLink.attr('id') +'"]').addClass('active');
	}
}

$(function() {
	tab.init();
});