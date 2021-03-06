/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "text!app/template/form/menu.html",
        "app/view/form/connexionView"], 
function($, _, Utils, page, ConnexionView) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $("#app");
			Utils.load("track", {"where" : "Menu"}, function(data) {}, "POST");
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.connexionView = new ConnexionView();
			this.connexionView.show();
		};
		
		this.init();
	};
});