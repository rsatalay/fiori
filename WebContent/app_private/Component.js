jQuery.sap.require("sap.umc.mobile.foundation.base.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.core.routing.History");
sap.umc.mobile.base.Component.extend("sap.umc.mobile.private.app.Component", {

    metadata : {
        "name" : "app",
        "version" : "1.0.0",
        "description" : "UMC private app component",
        "properties" : {
            componentData : "object"
        },
        "includes" : [ "js/utils.js", "js/formatters.js", "js/Constants.js",
                "view/BaseController.js", "view/FullBaseController.js",
                "view/DetailBaseController.js", "view/MasterBaseController.js",
                "model/DataProvider.js", "model/DataProviderFactory.js",
                "model/DataProviderHelper.js", "ComponentFactory.js" , "js/RouterFmca.js"]
    },
	init: function() {
		sap.umc.mobile.base.Component.prototype.init.apply(this, []);
		/*this.getApp().addStyleClass("back");*/
		
		
	},
	_loadCSS: function(){
		sap.umc.mobile.base.Component.prototype._loadCSS =  function(){
			jQuery("head").find("link[rel='stylesheet']:last").after( jQuery('<link rel="stylesheet" type="text/css" />').attr('href', jQuery.sap.getModulePath("sap.umc.mobile.foundation") + "/base/css/common.css"));
			var sThemeId = sap.umc.mobile.base.utils.getCookie("theme");
			if(sThemeId){ 
				sap.ui.getCore().applyTheme(sThemeId);			
			}
		};
		sap.umc.mobile.base.Component.prototype._loadCSS();
		//jQuery("head").find("link[rel='stylesheet']:last").after(jQuery('<link rel="stylesheet" type="text/css" />').attr('href', jQuery.sap.getModulePath("sap.umc.mobile") + "/app_private/css/common.css"));
		$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', jQuery.sap.getModulePath("sap.umc.mobile") + "/app_private/css/common.css") );
		
	},
	_startNavigation: function(){
		
		//before starting get the app and set background
		this.getApp().addStyleClass("backgroundPrivateApp");
		sap.ui.getCore().byId("fullScreenShell").addStyleClass("backgroundPrivateApp");
		sap.ui.getCore().byId("fullScreenWithoutShellContainer").addStyleClass("backgroundPrivateApp");
		sap.ui.getCore().byId("splitContainerShell").addStyleClass("backgroundPrivateApp");
		sap.ui.getCore().byId("splitScreenWithoutShellContainer").addStyleClass("backgroundPrivateApp");
		var fnInitialNavigation = jQuery.proxy(function(){
			if(this.isAgent()){
				this.navToAgentPanel();
			}else{
				//pat multiple account
				this._decideAccountSelectionProcedure();
				
			}
		}, this);
		window.addEventListener("hashchange", function(oEvent){
			if(window.location.hash === ""){
				fnInitialNavigation();
			}
		    		});
		
		window.addEventListener("popstate", function(oEvent){
			
		});
		
		window.addEventListener("pushstate", function(oEvent){
			
		});
		fnInitialNavigation();
	},
	//pat-multiple account
	_decideAccountSelectionProcedure: function(){
	//decide if multiple account and show search account page or the account drop down
	if(this.getDataProvider().showAccountSearch()){
		//search for account page
		//and then set the below of this.oApp.getDataProvider()
		/*this._oContextAccount = new sap.ui.model.json.JSONModel();
		this._oContextAccount.setData(oData.results[0]);*/
		//navtoSearchAccount Page and den on selecction of that u have to again decide whetehr u want to show the 
		//drop down or nt
		this.navToAccountSearch();
	}
	else{
		this.navToHome();
	}



},
	isAgent: function(){
		return sap.ui.getCore().getModel("settings").getProperty("/bIsAgent");
	},
	_initializeDataProvider: function() {
		return sap.umc.mobile.private.app.model.DataProvider.init();
	},
	navToHome: function(){
		var oHomeComponent = this.getComponentFactory().getHome();
		var bReplace = (this.isAgent())? false : true;
		oHomeComponent.getRouter().myNavTo("home", {}, bReplace);
	},
	//pat-multiple account
	navToAccountSearch: function(){
		var oHomeComponent = this.getComponentFactory().getHome();
		
		oHomeComponent.getRouter().myNavTo("accounts", {}, true);
	},
	navToAgentPanel: function(){
		var oAgentPanelComponent = this.getComponentFactory().getAgentPanel();
		oAgentPanelComponent.getRouter().myNavTo("bpSearch", {}, true);
		
	},
	getDataProvider: function(){
		return sap.umc.mobile.private.app.model.DataProvider;
	},
	getComponentFactory:function(){
		return sap.umc.mobile.private.app.ComponentFactory;
	},
	getAppObject: function(){      
        return sap.umc.mobile.private.app;      
    },      
    getUtils: function(){      
        return sap.umc.mobile.private.app.js.utils;     
    },

});
