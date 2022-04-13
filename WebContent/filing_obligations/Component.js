jQuery.sap.declare("sap.umc.mobile.filing_obligations.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.core.routing.History");

sap.ui.core.UIComponent.extend("sap.umc.mobile.filing_obligations.Component", {

	metadata : {
		"name": "filing_obligations",
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
				"viewPath" : "sap.umc.mobile.filing_obligations.view",
				"viewLevel" : undefined,
				"clearTarget" : false
			},
			"routes": { // contains routing configuration objects
				"filingObligations" : {
					"pattern" : "filing_obligations",
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
		sap.umc.mobile.private.app.model.DataProviderFactory.generate("filing_obligations");
		this._initializeRouter();

	},
	_initializeRouter: function(){
		var oRouter = this.getRouter();
		oRouter.register("filingObligationsRouter");
		oRouter.initialize();
	},
	getI18n: function(){
		return this.oI18n;
	},
	getDataProvider: function(){
		return sap.umc.mobile.filing_obligations.model.DataProvider;
	}
});