jQuery.sap.declare("sap.umc.mobile.user_profile.view.RelationshipController");

sap.umc.mobile.user_profile.view.RelationshipController = {
	setView: function(oView) {
		this._oView = oView;
	},
	getView: function() {
		return this._oView;
	},
	getDataProvider: function() {
		return sap.umc.mobile.user_profile.model.DataProvider;
	},
	//filter search handled
	onSearchRelations: function() {
    	var oParameter =this._getSearchRelationsParameter();
    	   
       this.getDataProvider().searchRelations(this.getView().getController(),oParameter);
    },
    //read the fields of the filter
    _getSearchRelationsParameter: function() {
    	var oFilterBar = sap.ui.getCore().byId("idAddRelationsFilter");
    	var oFilterItems = oFilterBar.getAllFilterItems();
    	var oSearchParameter = {};
    	$.each(oFilterItems, function(index,oFilterItem){
    		
    		if(sap.m.Input.prototype.isPrototypeOf(oFilterBar.determineControlByFilterItem(oFilterItem)) && typeof(oFilterBar.determineControlByFilterItem(oFilterItem).getValue)=="function"){
    		oSearchParameter[oFilterItem.getProperty("name")] = oFilterBar.determineControlByFilterItem(oFilterItem).getValue();}
    		if(sap.m.Select.prototype.isPrototypeOf(oFilterBar.determineControlByFilterItem(oFilterItem)) && typeof(oFilterBar.determineControlByFilterItem(oFilterItem).getSelectedItem)=="function"){
        	oSearchParameter[oFilterItem.getProperty("name")] = oFilterBar.determineControlByFilterItem(oFilterItem).getSelectedItem().getKey();
        		
    		}
        		
    		
     });

	     return oSearchParameter;
    },
    //after the tax advisor is selected bind data to relationshipDetails model and close pop up
    onTaxAdvisorSelection:function(evt) {
    	//commented below as service changed from function import to read with filter
    	//var oSelectedItemContext = evt.getSource().getSelectedContexts()[0];
    	var oSelectedItemContext = evt.getSource().oBindingContexts.businessDirectory;
    	var sPath = oSelectedItemContext.sPath;
    	var oListModel = oSelectedItemContext.getModel();
    	var oSelectedObject  = oListModel.getObject(sPath);
    	this.getDataProvider().setSelectedAddressDetails(oSelectedObject,this.getView().getController());
    	
    	/*
    	this.getDataProvider()._readAddress();*/
    },
	
}