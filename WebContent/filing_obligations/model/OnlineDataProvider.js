/*global window */
jQuery.sap.declare("sap.umc.mobile.filing_obligations.model.OnlineDataProvider");
jQuery.sap.require("sap.umc.mobile.private.app.js.utils");
sap.umc.mobile.filing_obligations.model.OnlineDataProvider = {
		_readFilingObligations: function(oDelegate) {
			var fnSuccess = jQuery.proxy(function(oData, oResponse) {
				if (oData.results) {
				    this.oFilingObligations.setData(oData);
				    if (oDelegate != null) {
                        oDelegate.onFilingObligationsLoaded(this.oFilingObligations);
                    }
				}	
			}, this);

                var sFormsPath = this.getAccountPath() + "FilingObligations";
                this.SERVICE.read(sFormsPath, ["$format=json","$expand=Period"], true, {
                    fnSuccess: fnSuccess
                });
			
		},
		
		_readFilingObligationsNotFiled: function(oDelegate) {
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                if (oData.results ) {
                    this.oFilingObligations.setData(oData);
                    if (oDelegate != null) {
                        oDelegate.onFilingObligationsLoaded(this.oFilingObligations);
                    }
                }     
            }, this);
                var sFormsPath = this.getAccountPath() + "FilingObligations";
                this.SERVICE.read(sFormsPath, ["$format=json","$expand=Period"/*,"$filter=FormBundleSubmitted eq '' and ClearingReason eq ''"*/], true, {
                    fnSuccess: fnSuccess
                },[],[{
        			name: 'FormBundleSubmitted',
        			operator: sap.ui.model.FilterOperator.EQ,
        			value: encodeURIComponent('')
        		},
        		{
        			name: 'ClearingReason',
        			operator: sap.ui.model.FilterOperator.EQ,
        			value: encodeURIComponent('')
        		}
        		]);
    
        },
	
};