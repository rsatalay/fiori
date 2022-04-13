sap.ui.getCore().attachInitEvent(function() {
        
        
    var fnRegisterModules = function(sModuleName, sAppName, sNamespace){
        var sAppUrl;
        if( sAppName ==="zumcui5_mobile_foundation"){
            sAppUrl = "https:" + "//" + "ldcigm4.wdf.sap.corp:44355" + sNamespace + "/" + sAppName;
        }else
            {
            sAppUrl = window.location.protocol + "//" + window.location.host + sNamespace + "/" + sAppName;
            }
        
        jQuery.sap.registerModulePath(sModuleName, sAppUrl);
    };

    
    //E.g. to use foundation as a local application (fmcaui5_mobile_foundation is the foundation local app name)
    //fnRegisterModules('sap.umc.mobile.foundation', "fmcaui5_mobile_foundation", "");
    //E.g. to use foundation from the server - server path in function fnRegisterModules 
    fnRegisterModules('sap.umc.mobile.foundation', "zumcui5_mobile_foundation", "/sap/public/bc/ui2");

    //Register local logon application (fmcaui5_mobile_logon is the local logon app name)
    fnRegisterModules('sap.umc.mobile.public', "fmcaui5_mobile_logon", "");
    //Register local private application (fmcaui5_mobile is the local private app name)
    fnRegisterModules('sap.umc.mobile', "fmcaui5_mobile", "");
    fnRegisterModules('sap.umc.mobile.private', "fmcaui5_mobile", "");


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