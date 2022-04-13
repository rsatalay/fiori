jQuery.sap.declare("sap.umc.mobile.home.model.DataProvider");

sap.umc.mobile.home.model.DataProvider = {
	loadTiles: function(fnCallback){
		this.oTiles = sap.umc.mobile.home.model.Tiles.getTiles();
		fnCallback(this.oTiles);
	},
	loadHomeData: function(fnCallback){
		var _fnCallback = function(iCriticalAlertCount, oContractAccounts,iFilingObligationCount,iFormsDraftCount){
			fnCallback(iCriticalAlertCount, oContractAccounts,iFilingObligationCount,iFormsDraftCount);
		};
		this._readHomeData(_fnCallback);
	}
};
