jQuery.sap.declare("sap.umc.mobile.documents.Component");
jQuery.sap.require("sap.ui.core.UIComponent");

jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.core.routing.History");
/*
jQuery.sap.require("sap.umc.mobile.home.model.Tiles");
jQuery.sap.require("sap.umc.mobile.home.view.ActionSheetController");*/

sap.ui.core.UIComponent.extend("sap.umc.mobile.documents.Component", {

	metadata : {
		"name": "documents",
		"version": "1.0.0",
		"includes" : ["model/DataProvider.js"],
		"initOnBeforeRender": false,
		"dependencies": {
			"components" : []
		},
		"config" : {
			"resourceBundle" : "i18n/i18n.properties"
		},
		"routing": {
			"config" : {
				routerClass: sap.umc.mobile.RouterFmca,
				"viewType" : "XML",
				"viewPath" : "sap.umc.mobile.documents.view",
				"viewLevel" : undefined,
				"clearTarget" : false
			},
			"routes": { // contains routing configuration objects
				"documents" : {
					"pattern" : "documents",
					"view" : "List",
					"targetControl" : "fullScreenWithShellContainer",
					"targetAggregation" : "pages",
					"viewLevel" : 1,
					"callback": function(oEvent, oParams, oConfigs, oTargetControl, oView){
						sap.ui.getCore().getComponent("AppComponent").toFullScreenWithShell(); 
						oTargetControl.to(oView.getId());
					}
				},
				
			
			}
		}
	},
	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, []);
		sap.umc.mobile.private.app.model.DataProviderFactory.generate("documents");
		this._initializeRouter();

	},
	_initializeRouter: function(){
		var oRouter = this.getRouter();
		oRouter.register("documentsRouter");
		oRouter.initialize();
	},
	getI18n: function(){
		return this.oI18n;
	},
	getDataProvider: function(){
		return sap.umc.mobile.documents.model.DataProvider;
	}
});