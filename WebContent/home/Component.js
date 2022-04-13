jQuery.sap.declare("sap.umc.mobile.home.Component");

/*jQuery.sap.require("sap.umc.mobile.home.model.Tiles");
jQuery.sap.require("sap.umc.mobile.home.view.ActionSheetController");*/

sap.ui.core.UIComponent.extend("sap.umc.mobile.home.Component", {

	metadata : {
		"name": "home",
		"includes" : ["js/utils.js", "model/DataProvider.js", "model/Tiles.js", "fragment/ActionSheetController.js"],
		"viewPath": "sap.umc.mobile.home.view",
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
				"targetAggregation" : "pages",
				"viewLevel" : undefined,
				"clearTarget" : false
			},
			"routes": { // contains routing configuration objects
				"home" : {
					"pattern" : "home",
					"viewPath" : "sap.umc.mobile.home.view",
					"view" : "Home",
					"targetControl" : "fullScreenWithoutShellContainer",
					"targetAggregation" : "pages",
					"viewLevel" : 1,
					"callback": function(oEvent, oParams, oConfigs, oTargetControl, oView){
						sap.ui.getCore().getComponent("AppComponent").toFullScreenWithoutShell(); 
						oTargetControl.to(oView.getId());
					}
				},
				"accounts" : {
					"pattern" : "Accounts",
					"viewPath" : "sap.umc.mobile.home.view",
					"view" : "AccountSearch",
					"targetControl" : "fullScreenWithoutShellContainer",
					"targetAggregation" : "pages",
					"viewLevel" : 1,
					"callback": function(oEvent, oParams, oConfigs, oTargetControl, oView){
						sap.ui.getCore().getComponent("AppComponent").toFullScreenWithoutShell(); 
						oTargetControl.to(oView.getId());
					}
				}
			}
		}
	},
	init : function() {
		
		sap.ui.core.UIComponent.prototype.init.apply(this, []);
		sap.umc.mobile.private.app.model.DataProviderFactory.generate("home");
		this._initializeRouter();

	},
	_initializeRouter: function(){
		var oRouter = this.getRouter();
		oRouter.register("homeRouter");
		oRouter.initialize();
	},
	getDataProvider: function() {
		return sap.umc.mobile.home.model.DataProvider;
	}
});