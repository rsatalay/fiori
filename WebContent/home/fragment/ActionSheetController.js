/*global window */
jQuery.sap.declare("sap.umc.mobile.home.fragment.ActionSheetController");

sap.umc.mobile.home.fragment.ActionSheetController = {
	setView: function(oView) {
		this._oView = oView;
	},

	getView: function() {
		return this._oView;
	},

	getController: function() {
		return this.getView().getController();
	},

	onClickChangePassword: function() {
		sap.ui.getCore().getComponent("AppComponent").getComponentFactory().getUserManagement().getRouter().myNavTo("changePassword", {}, false);
	},

	onClickAbout: function() {

	},
	onClickManageProfile: function(){
		var oUserProfileComponent = sap.ui.getCore().getComponent("AppComponent").getComponentFactory().getUserProfile();
		oUserProfileComponent.getRouter().myNavTo("userProfile",{}, false);
	},
	onClickLogOut: function() {
		window.location = window.location.protocol + "//" + window.location.host + sap.umc.mobile.private.app.Constants.LOGOFF_SERVICE_PATH + "?redirectURL=" + sap.umc.mobile.private.app.Constants.APPLICATION_LOCATION;
	},

	onClickSelectTheme: function() {
		if (!this._oThemeSelectionDialog) {
			this._oThemeSelectionDialog = sap.ui.xmlfragment("themeSelectionDialog", "sap.umc.mobile.home.view.ThemeSelectionDialog", this);
			var oModel = new sap.ui.model.json.JSONModel();
			var aThemes = {Items: [ /*{themeId: "umc_bluecrystal",
			    label: sap.ui.getCore().getModel("i18n").getProperty("APP.UMC_BLUE_CRYSTAL"),
			    selected : true},*/              
	          {themeId: "sap_bluecrystal",
			    label: sap.ui.getCore().getModel("i18n").getProperty("APP.SAP_BLUE_CRYSTAL"),
			    selected : true},
			    {themeId: "sap_hcb",
			    	//fix-utilities
				    label: sap.ui.getCore().getModel("i18n").getProperty("APP.SAP_HIGH_CONTRAST_BLACK"),
			    	//label:"High-Contrast Black",
				    selected : false}]};
			
			var sThemeId = sap.umc.mobile.base.utils.getCookie("theme");
			if(sThemeId){
				for(var i = 0; i < aThemes.Items.length; i++){
					if (aThemes.Items[i].themeId === sThemeId){
						aThemes.Items[i].selected = true;
					}
					else{
						aThemes.Items[i].selected = false;
					}
				}
			}			
			
			oModel.setData(aThemes);
			this._oThemeSelectionDialog.setModel(oModel, "themes");
		}
		this._oThemeSelectionDialog.open();
	},

	onDialogCancelButton: function() {
		this._oThemeSelectionDialog.close();
	},

	onDialogSubmitButton: function() {
		var oData = this._oThemeSelectionDialog.getModel("themes").getData();
		var i;
		for (i = 0; i < oData.Items.length; i++) {
			if (oData.Items[i].selected) {
				sap.umc.mobile.base.utils.setCookie("theme", oData.Items[i].themeId);
				sap.ui.getCore().applyTheme(oData.Items[i].themeId);
			}
		}
		this._oThemeSelectionDialog.close();
	},
	
	onAgentSearch: function(){
		this.getController()._backToBPSearch();
	}
};