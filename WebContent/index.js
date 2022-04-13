sap.ui.getCore().attachInitEvent(function() {
	
	var fnRegisterModules = function(sModuleName, sAppName, sNamespace){
	    var sAppUrl = window.location.protocol + "//" + window.location.host + sNamespace + "/" + sAppName;
	    jQuery.sap.registerModulePath(sModuleName, sAppUrl);
	  };

	  fnRegisterModules('sap.umc.mobile.foundation', "zumcui5_mobile_foundation", "/sap/public/bc/ui2");
	  fnRegisterModules('sap.umc.mobile.public', "zfmcaui5_mobile_logon", "/sap/public/bc/ui2");
	  fnRegisterModules('sap.umc.mobile', "zfmcaui5_mobile", "/sap/bc/ui5_ui5/sap");
	  fnRegisterModules('sap.umc.mobile.private', "zfmcaui5_mobile", "/sap/bc/ui5_ui5/sap");

	
	var oAppComponent = sap.ui.getCore().createComponent({
	   name: "sap.umc.mobile.private.app",
	   id: "AppComponent",
	   url: jQuery.sap.getModulePath("sap.umc.mobile") + "/app_private",
	   settings: {
			componentData: {
				isPrivate: true
			}
	   }
	});
});