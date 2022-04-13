jQuery.sap.declare("sap.umc.mobile.forms.view.AddFormDetailsDialogController");

sap.umc.mobile.forms.view.AddFormDetailsDialogController = {
	setView: function(oView) {
		this._oView = oView;
	},
	getView: function() {
		return this._oView;
	},
	getDataProvider: function() {
		return sap.umc.mobile.forms.model.DataProvider;
	},
	onDialogCloseBtn: function(){
		
		this.getView().getController().oAddFormDetailsDialog.close();
	},
	onDialogOKBtn: function(){
		
		 this.getView().getController().oAddFormDetailsDialog.close();
		 var oFormsComponent = this.getView().getController().getApp().getComponentFactory().getForms();
		 oFormsComponent.getRouter().myNavTo(this.getView().getController().oSelectedObject.FormBundleTypeID+"Forms", this.getView().getController().oSelectedObject, false); 

	},
	
	
}