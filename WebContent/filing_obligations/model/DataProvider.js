jQuery.sap.declare("sap.umc.mobile.filing_obligations.model.DataProvider");

sap.umc.mobile.filing_obligations.model.DataProvider ={
	loadFilingObligations: function(oDelegate, bForcedReload,notFiled) {
	    if(bForcedReload== true && notFiled == true){
	        this._reloadFilingObligationsNotFiled(oDelegate);
	    }else
		if (bForcedReload == true){
			this._reloadFilingObligations(oDelegate);
		} else {
			if (!this.oFilingObligations) {
				this._reloadFilingObligations(oDelegate);
			} else {
				if (oDelegate != null){
					oDelegate.onFilingObligationsLoaded(this.oFilingObligations);
				}
			}
		}
	},
	_reloadFilingObligations: function(oDelegate) {
		this.oFilingObligations = new sap.ui.model.json.JSONModel();
		this._readFilingObligations(oDelegate);
	},
	_reloadFilingObligationsNotFiled: function(oDelegate) {
        this.oFilingObligations = new sap.ui.model.json.JSONModel();
        this._readFilingObligationsNotFiled(oDelegate);
    },
    
    
	
};
