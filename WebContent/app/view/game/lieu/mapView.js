/*global define */
define(["jquery",
        'underscore',
        "text!app/template/game/lieu/map.html",
        "app/model/game/ui/mouseModel",
        "app/model/game/ui/cameraModel",
        "app/view/game/lieu/terrainView",
        "app/view/game/player/playerView",
        "app/model/game/server/refreshMapModel",
        "jquery-mousewheel"],
function($, _, page, MouseModel, CameraModel, Terrain, PlayerView, RefreshMapModel) {
	'use strict';

	return function(parent) {
		this.init = function(parent) {
			this.parent = parent;
			this.player = parent.player;
			
			this.el = $("#map");
			
			this.camera = new CameraModel();
			this.mouse = new MouseModel();
			this.refreshMapModel = new RefreshMapModel();
			
			this.terrain = new Terrain(this);
			this.playerView = new PlayerView(this);
			
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			
			var content = template(templateData).replace(/>\s*</g, '><');
			this.el.html(content);
			
			this.terrain.load();
			
			this.makeEvents();
			this.loopEvents();
		};
		
		this.makeEvents = function() {
		    var that = this;
		    
		    this.el.mousewheel(function(event){
		        that.camera.zoom(event.deltaY*0.25);
		    });
		};
		
		this.loopEvents = function() {
		    var that = this;

		    this.refreshMapModel.send(null, this.player, function(data) {
		    	if (data.codeRetour == 0) {
		        	that.terrain.refresh(data.modifications);
		        	that.playerView.refresh();
		        }
		    });
		    
		    setTimeout(function() {
		        that.loopEvents();
		    }, 100);
		};
		
		this.init(parent);
	};
});