jQuery.sap.declare("sap.umc.mobile.forms.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.core.routing.History");

sap.ui.core.UIComponent.extend("sap.umc.mobile.forms.Component", {

	metadata : {
		"name": "sap.umc.mobile.forms.Component",
		"includes" : ["model/DataProvider.js","js/utils.js"],
		"viewPath": "sap.umc.mobile.forms.view",
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
				"forms" : {
					"pattern" : "forms",
					"viewPath" : "sap.umc.mobile.forms.view",
					"view" : "FormsList",
					"targetControl" : "fullScreenWithShellContainer",
					"targetAggregation" : "pages",
					"viewLevel" : 1,
					"callback": function(oEvent, oParams, oConfigs, oTargetControl, oView){
						sap.ui.getCore().getComponent("AppComponent").toFullScreenWithShell(); 
						oTargetControl.to(oView.getId());
					}
				},
				
                
                "SUTForms" : { // master is the name of the route
                    "pattern" : "SUTForms/{FormBundleTypeID}", // will be the url and from has to be provided in the data
                    "viewPath" : "sap.umc.mobile.forms.view.forms.SUTForms",
                    "view" : "FullScreenForms",
                    "targetControl" : "fullScreenWithShellContainer",
                    "targetAggregation" : "pages",
                    "viewLevel" : 1,
                    "callback": function(oEvent, oParams, oConfigs, oTargetControl, oView){
                        sap.ui.getCore().getComponent("AppComponent").toFullScreenWithShell(); 
                        oTargetControl.to(oView.getId());
                    }             
                },
                
                "UETForms" : { // master is the name of the route
                    "pattern" : "UETForms/{FormBundleTypeID}", // will be the url and from has to be provided in the data
                    "viewPath" : "sap.umc.mobile.forms.view.forms.UETForms",
                    "view" : "FullScreenForms",
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
		sap.umc.mobile.private.app.model.DataProviderFactory.generate("forms");
		this._initializeRouter();

	},
	_initializeRouter: function(){
		var oRouter = this.getRouter();
		oRouter.register("formsRouter");
		oRouter.initialize();
	},

	getI18n: function(){
		return this.oI18n;
	},
	getDataProvider: function(){
		return sap.umc.mobile.forms.model.DataProvider;
	}
});