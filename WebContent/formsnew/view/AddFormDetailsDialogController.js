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
		 //pat-comp
		 oFormsComponent.getRouter().myNavTo("form", this.getView().getController().oSelectedObject, false); 

	},
	
	
}