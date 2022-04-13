jQuery.sap.declare("sap.umc.mobile.private.app.model.DataProviderHelper");

sap.umc.mobile.private.app.model.DataProviderHelper =jQuery.extend(sap.umc.mobile.base.model.DataProviderHelper, {
	getContractAccountName: function(oService){
		var sService = "";
		if(oService.getName() === sap.umc.mobile.private.app.Constants.ODATA_SERVICE_CRM){
            sService =  "ContractAccounts";
        }
		return sService;
	},
	getContractName: function(oService){
		var sService = "";
		if(oService.getName() === sap.umc.mobile.private.app.Constants.ODATA_SERVICE_CRM){
			sService =  "ContractItems";
		}else if(oService.getName() === sap.umc.mobile.private.app.Constants.ODATA_SERVICE_ERP){
			sService =  "Contracts";
		}
		return sService;
	}
});
