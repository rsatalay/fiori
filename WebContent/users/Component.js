jQuery.sap.declare("sap.umc.mobile.users.Component");


sap.ui.core.UIComponent.extend("sap.umc.mobile.users.Component", {

	metadata : {
		"name": "users",
		"version": "1.0.0",
	
		"includes": ["js/utils.js", "model/DataProvider.js"],
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
				"viewPath" : "sap.umc.mobile.users.view",
				"viewLevel" : undefined,
				"clearTarget" : false
			},
			"routes": { // contains routing configuration objects
				"users" : {
					"pattern" : "Users",
					"view" : "UsersList",
					"targetControl" : "splitScreenWithShellContainer",
					"targetAggregation" : "masterPages",
					"viewLevel" : 1,
					"callback":function(oEvent, oParams, oConfigs, oTargetControl, oView){
						sap.ui.getCore().getComponent("AppComponent").toSplitScreenWithShell();
						if(sap.ui.getCore().getModel("device").getProperty("/isNoPhone")){
							oTargetControl.backToTopDetail();
						}
						oTargetControl.toMaster(oView.getId());
						sap.umc.mobile.Logger.debug("Users List route catched");
					}
				},
				"userDetail" : {
					"pattern" : "UserDetails/{AliasID}",
					"view" : "UserDetails",
					"targetControl" : "splitScreenWithShellContainer",
					"targetAggregation" : "detailPages",
					"viewLevel" : 3,
					"callback": function(oEvent, oParams, oConfigs, oTargetControl, oView){
						sap.ui.getCore().getComponent("AppComponent").toSplitScreenWithShell();
						if(sap.ui.getCore().getModel("device").getProperty("/isPhone")){
							oTargetControl.toMaster(oView.getId());
						}else{
							oTargetControl.toDetail(oView.getId());
						}
						sap.umc.mobile.Logger.debug("Users detail route catched");
					}
				},
				"addUser":{ // master is the name of the route
					"pattern": "AddUser", // will be the url and from has to be provided in the data
					"view": "AddUser",
					"targetControl": "fullScreenWithShellContainer",
					"targetAggregation": "pages",
					"viewLevel": 1,
					"callback": function(oEvent, oParams, oConfigs, oTargetControl, oView) {
						sap.ui.getCore().getComponent("AppComponent").toFullScreenWithShell();
						oTargetControl.to(oView.getId());
					}
				}
				/*"invoiceList" : { // master is the name of the route
					"pattern" : "InvoiceList", // will be the url and from has to be provided in the data
					"view" : "InvoiceList",
					"targetControl" : "splitScreenWithShellContainer",
					"targetAggregation" : "masterPages",
					"viewLevel" : 1,
					"callback": function(oEvent, oParams, oConfigs, oTargetControl, oView){
						sap.ui.getCore().getComponent("AppComponent").toSplitScreenWithShell();
						if(sap.ui.getCore().getModel("device").getProperty("/isNoPhone")){
							oTargetControl.backToTopDetail();
						}
						oTargetControl.toMaster(oView.getId());
						sap.umc.mobile.Logger.debug("Invoices List route catched");
					}
				},*/
				
			
			}
		}
	},
	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, []);
		sap.umc.mobile.private.app.model.DataProviderFactory.generate("users");
		this._initializeRouter();

	},
	_initializeRouter: function(){
		var oRouter = this.getRouter();
		oRouter.register("users");
		oRouter.initialize();
	},
	getI18n: function(){
		return this.oI18n;
	},
	getDataProvider: function(){
		return sap.umc.mobile.users.model.DataProvider;
	}
});