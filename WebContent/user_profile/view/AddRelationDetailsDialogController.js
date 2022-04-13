jQuery.sap.declare("sap.umc.mobile.user_profile.view.AddRelationDetailsDialogController");

sap.umc.mobile.user_profile.view.AddRelationDetailsDialogController = {
	setView: function(oView) {
		this._oView = oView;
	},
	getView: function() {
		return this._oView;
	},
	getDataProvider: function() {
		return sap.umc.mobile.user_profile.model.DataProvider;
	},
	onDialogCloseBtn: function(){
		
		this.getView().getController().oAddRelationDetailsDialog.close();
	}
	
	
}