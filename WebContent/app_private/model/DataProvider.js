jQuery.sap.declare("sap.umc.mobile.private.app.model.DataProvider");

sap.umc.mobile.private.app.model.DataProvider = jQuery.extend({},sap.umc.mobile.base.model.DataProvider, {
	init: function() {
		
		this.oHelper = sap.umc.mobile.private.app.model.DataProviderHelper;	
		return this._prepareData();
	
	},
	//pat-multiple account 
	showAccountSearch:function(){
		 var accountsLimit = 20;
		 if(this._oAccounts && this._oAccounts.getData().length>accountsLimit){
			
			 return true;
			 
		 }
		 else{
			 return false;
		 }
		 
		
	},
	
	_prepareData: function(){
		var oDataProvider = this;
		return jQuery.when(this._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_ERP, true,true), 
				/*this._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_CRM, true),*/
				this._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_USERMANAGEMENT, true,true)).then(function(_ERP,/* _CRM,*/ _USERMANAGEMENT){
					oDataProvider.ERP = _ERP;
					//oDataProvider.CRM = _CRM;
					oDataProvider.USERMANAGEMENT = _USERMANAGEMENT;
					oDataProvider._SERVICE();
//					oDataProvider._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_GEO, true).then(function(_GEOCODER){
//						oDataProvider.GEOCODER = _GEOCODER;
//					});
//					oDataProvider._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_VBI, true).then(function(_VBI){
//						oDataProvider.VBI = _VBI;
//					});
//					oDataProvider._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_CRM_URM, true).then(function(_CRMURM){
//						oDataProvider.CRMURM = _CRMURM;
//					});
					return jQuery.when(oDataProvider._readAccounts(), oDataProvider._decideAgentThenLoad()).then(function(){
						sap.umc.mobile.Logger.debug("Data provider initialization is done successfully");
					}, function(){
						sap.ui.getCore().getEventBus().publish("user", "forbidden");
					});
				}, function(){
					sap.ui.getCore().getEventBus().publish("user", "forbidden");
				});
		/*var oDeferredERP = jQuery.Deferred();*/
		//this.ERP = this._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_ERP, true, oDeferredERP);
		//this.USERMANAGEMENT = this._initService(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_USERMANAGEMENT, true);
		//this._SERVICE();
		/*var oDeferredReadAccounts = jQuery.Deferred();
		this._readAccounts(oDeferredReadAccounts);
		if(sap.ui.getCore().getComponent("AppComponent").isDemo()){
			return jQuery.when(oDeferredReadAccounts);
		}
		
		
		var oDeferredAgent = jQuery.Deferred();
		jQuery.when(oDeferredERP).done(jQuery.proxy(function(){
			this._decideAgentThenLoad(oDeferredAgent);
		}, this));
		return jQuery.when(oDeferredERP, oDeferredReadAccounts, oDeferredAgent);*/
	},
	
	_initService: function(sServiceName, bToken,bBatchEnabled){
		return sap.umc.mobile.base.model.ServiceWrapper().init2(sServiceName, bToken,bBatchEnabled);
	},
	/*_initService: function(sServiceName, bToken, oDeferred){
		return sap.umc.mobile.base.model.ServiceWrapper().init(sServiceName, bToken, oDeferred);
	},*/
	_SERVICE: function() {
		if (false) {
			this.SERVICE = this.CRM;
		} else {
			this.SERVICE = this.ERP;
		}
		return this.SERVICE;
	},
	_readAccounts: function(){

		var oDeferred = jQuery.Deferred();
		if (this.isMock()) {
			var oFakeJsonModel = new sap.ui.model.json.JSONModel();
			oFakeJsonModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile.private") + "/app_private/model/mockdata/Accounts_2BP.json");
			var fnCompleted = jQuery.proxy(function(oResponse, oData){
				sap.ui.getCore().getModel("settings").setProperty("/bIsMultipleAccounts", (oData.getData().d.results.length > 1));
				this._oAccounts = new sap.ui.model.json.JSONModel();
				this._oAccounts.setData(oData.getData().d.results);
				this._oContextAccount = new sap.ui.model.json.JSONModel();
				this._oContextAccount.setData(oData.getData().d.results[0]);
				oDeferred.resolve();
			}, this);
			oFakeJsonModel.attachRequestCompleted(oFakeJsonModel, fnCompleted);	
		}else{
			var _fnSuccess = jQuery.proxy(function(oData, oResponse) {
		
				if (oData.results && oData.results.length) {

					this._oAccounts = new sap.ui.model.json.JSONModel();
					this._oAccounts.setData(oData.results);
					this._oContextAccount = new sap.ui.model.json.JSONModel();
					//pat-multiple account
					sap.ui.getCore().getModel("settings").setProperty("/bIsMultipleAccounts", (oData.results.length > 1 && !this.showAccountSearch()));
					
					//pat-multiple account - if the length is
					//more than the account limit we need not set the context now
					// but later after selection from the select account page
//					if(!this.showAccountSearch()){
						this._oContextAccount.setData(oData.results[0]);
					/*}*/
					
				
					
					
					
				
				}else{
					sap.ui.getCore().getModel("settings").setProperty("/bIsMultipleAccounts", false);
				}
				
				oDeferred.resolve();
			}, this);
			var _fnError = jQuery.proxy(function(oError){
				oDeferred.reject();
			}, this);
			this.SERVICE.read("/Accounts", ["$format=json"], false, {
				fnSuccess: _fnSuccess, 
				fnError: _fnError
			});
		}
		return oDeferred;
		
	
	},
	_readAccount: function(sAccountId) {
		var oAccount;
		if (this.isMock()) {		
			var oFakeJsonModel = new sap.ui.model.json.JSONModel();
			oFakeJsonModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile.private") + "/app_private/model/mockdata/erp/account.json");
			var fnCompleted = jQuery.proxy(function(){
				if (oFakeJsonModel.getData().d) {
					oAccount = new sap.ui.model.json.JSONModel();
					oAccount.setData(oFakeJsonModel.getData().d);
				}
				
			}, this);
			oFakeJsonModel.attachRequestCompleted(oFakeJsonModel.getData().d, fnCompleted);	
			
			// return before the read finish !! issue to be fix - switch users!!
			return oAccount;
		} 
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			if (oData) {
				oAccount = new sap.ui.model.json.JSONModel();
				oAccount.setData(oData);
			}
		}, this);
		this.SERVICE.read("/Accounts('" + sAccountId + "')", ["$format=json"], false, {
			fnSuccess: fnSuccess
		});
		return oAccount;
	},
	getAccountId: function() {
		return this.getContextAccountId();
	},
	getContextAccountId: function(){
		return this.getContextAccount().getData().AccountID;
	},
	getAccount: function() {
		return this._oContextAccount;
	},
	getAccountById: function(sAccountId) {
		var oAccount;
		
		if(this._oAccounts){
			var oAccounts = this._oAccounts.getData();
			
			var x;
			for (x in oAccounts) {
				if(oAccounts[x].AccountID == sAccountId){
					oAccount = new sap.ui.model.json.JSONModel();
					oAccount.setData(oAccounts[x]);
				}
			}
		}
		
		if(!oAccount){
			oAccount = this._readAccount(sAccountId);
		}
		return oAccount;
	},
	getAccounts: function() {
		return this._oAccounts;
	},
	getContextAccount: function(){
		return this._oContextAccount;
	},
	clearContextAccount: function(){
		this._oContextAccount;
	},
	
	
	changeContextAccount: function(sAccountId) {
	
		if (this.isMock()) {			
			var oAccount;			
			if(this._oAccounts){
				var oAccounts = this._oAccounts.getData();				
				var x;
				for (x in oAccounts) {
					if(oAccounts[x].AccountID == sAccountId){
						oAccount = new sap.ui.model.json.JSONModel();
						oAccount.setData(oAccounts[x]);
						sap.ui.getCore().getEventBus().publish("App", "contextAccountChanged", this);		
					}
				}
			}								
			if (!oAccount) {
				var oFakeJsonModel = new sap.ui.model.json.JSONModel();
				oFakeJsonModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile.private") + "/app_private/model/mockdata/account_" + sAccountId + ".json"); //+ sAccountId
				var fnCompleted = jQuery.proxy(function() {
					if (oFakeJsonModel.getData().d) {
						oAccount = new sap.ui.model.json.JSONModel();
						oAccount.setData(oFakeJsonModel.getData().d);
						this._oContextAccount = oAccount;
						sap.ui.getCore().getEventBus().publish("App", "contextAccountChanged", this);
					}
				}, this);
				oFakeJsonModel.attachRequestCompleted(oFakeJsonModel.getData().d, fnCompleted);
			} 		
		} else {
			this._oContextAccount = this.getAccountById(sAccountId);
			sap.ui.getCore().getEventBus().publish("App", "contextAccountChanged", this);	
		}
	
	},
	
	getContextAccountPath: function(){
		return "/Accounts('" + this.getContextAccountId() + "')/";
	},
	getAccountPath: function() {
		return this.getContextAccountPath();
	},
	_decideAgentThenLoad: function(){

		
		if(this.isMock()){
			var fnLoadJSON = sap.ui.getCore().getComponent("AppComponent").getUtils().loadJSON;
			/*return fnLoadJSON(jQuery.sap.getModulePath("sap.umc.mobile.private") + "/app_private/model/mockdata/GetAgentUserGroup.json").then(function(oData){
				sap.ui.getCore().getModel("settings").setProperty("/sAgentUserGroup", oData.getData().d.GetAgentUserGroup.UserGroup);
				return fnLoadJSON(jQuery.sap.getModulePath("sap.umc.mobile.private") + "/app_private/model/mockdata/CurrentUser.json");
			}).then(function(oData){
				return fnLoadJSON(jQuery.sap.getModulePath("sap.umc.mobile.private") + "/app_private/model/mockdata/UserColl.json");
			}).then(function(oData){
				var sAgentUserGroup = sap.ui.getCore().getModel("settings").getProperty("/sAgentUserGroup");
				var bIsAgent = (sAgentUserGroup && (sAgentUserGroup === oData.getData().d.UserProfile.UserGroup));
				sap.ui.getCore().getModel("settings").setProperty("/bIsAgent", bIsAgent);
				sap.ui.getCore().getModel("settings").setProperty("/bIsNotAgent", !bIsAgent);
			});*/
			return fnLoadJSON(jQuery.sap.getModulePath("sap.umc.mobile.private") + "/app_private/model/mockdata/GetAgentUserGroup.json").then(function(oData){
				sap.ui.getCore().getModel("settings").setProperty("/sAgentUserGroup", oData.getData().d.GetAgentUserGroup.UserGroup);
				sap.ui.getCore().getModel("settings").setProperty("/bIsAgent", false);
				sap.ui.getCore().getModel("settings").setProperty("/bIsNotAgent", true);
				sap.ui.getCore().getModel("settings").setProperty("/UserFirstName", oData.FirstName);
				
			});
			
		}
		
		var oDeferred = jQuery.Deferred();
		var getAgentData = jQuery.proxy(function() {		
			var fnSecondSuccess = jQuery.proxy(function(oData) {
				var sAgentUserGroup = sap.ui.getCore().getModel("settings").getProperty("/sAgentUserGroup");
				var bIsAgent = ((sAgentUserGroup !== '' && sAgentUserGroup !== 'undefined') && (sAgentUserGroup === oData.UserProfile.UserGroup));
				sap.ui.getCore().getModel("settings").setProperty("/bIsAgent", bIsAgent);
				sap.ui.getCore().getModel("settings").setProperty("/bIsNotAgent", !bIsAgent);
				sap.ui.getCore().getModel("settings").setProperty("/UserFirstName", oData.FirstName);
				
				if(bIsAgent){
					sap.ui.getCore().getModel("settings").setProperty("/bIsMultipleAccounts", false);
				}
				oDeferred.resolve();
			}, this);

			var fnFirstSuccess = jQuery.proxy(function(oData) {
				this.USERMANAGEMENT.read("/UserCollection('" + oData.CurrentUser.UserName + "')", ["$format=json"], false, {
					fnSuccess: fnSecondSuccess,
					fnError: function(){
						oDeferred.reject();
					}
				});
			}, this);
			this.USERMANAGEMENT.read("/CurrentUser", ["$format=json"], false, {
				fnSuccess: fnFirstSuccess,
				fnError: function(){
					oDeferred.reject();
				}
			});
		
		}, this);
		
		
		var oCallback = {
			fnSuccess: function(oData) {
				sap.ui.getCore().getModel("settings").setProperty("/sAgentUserGroup", oData.GetAgentUserGroup.UserGroup);
				getAgentData();
			}		
		};
		this.ERP.functionImport("GetAgentUserGroup", sap.umc.mobile.private.app.Constants.HTTP_GET, {}, true, oCallback);			
		return oDeferred;
	
	
	},		
});