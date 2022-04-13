jQuery.sap.require("sap.umc.mobile.user_profile.view.RelationshipController");
sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.user_profile.view.AddRelationships", {


	
	  onInit: function() {
	        sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
	        this._handleRouting();
	    },

	    getDataProvider: function() {
	        return sap.umc.mobile.user_profile.model.DataProvider;
	    },

	    _handleRouting: function() {
	        this.getRouter().attachRouteMatched(function(oEvent) {
	            var sNavigationName = oEvent.getParameter("name");
	            /*if (sNavigationName === "addRelationships") {
	            	
					
	            }*/
	        }, this);
	    },
	   /* onSearchRelations: function() {
	    	var oParameter =this._getSearchRelationsParameter();
	    	   
	       this.getDataProvider().searchRelations(this,oParameter);
	    },
	    _getSearchRelationsParameter: function() {
	    	var oFilterBar = this.getView().byId("idAddRelationsFilter");
	    	var oFilterItems = oFilterBar.getAllFilterItems();
	    	var oSearchParameter = {};
	    	$.each(oFilterItems, function(index,oFilterItem){
	    		oSearchParameter[oFilterItem.getProperty("name")] = oFilterBar.determineControlByFilterItem(oFilterItem).getValue();
            });

		     return oSearchParameter;
	    },
	    onSearchRelationsSuccess:function(oBusinessDirectory) {
	    	this.getView().setModel(oBusinessDirectory,"businessDirectory");
	    	
	    },*/
	    handleAddRelationship:function(evt) {
	    	this.oRelationshipDetails = new sap.ui.model.json.JSONModel();
	    	var oSrc = evt.getSource();
	    	var oBindingContext = oSrc.getParent().oBindingContexts;
			var sPath = oBindingContext.businessDirectory.sPath;
			var oRelationshipsModel =oBindingContext.businessDirectory.oModel;
			var oRelationshipSelected = oRelationshipsModel.getObject(sPath);
			this.oRelationshipDetails.setProperty("/RelatedAccountID",oRelationshipSelected.AccountID);
			/*this.getDataProvider().removeRelationship(this,oRelationshipSelected)*/;	
	    	
	    	//create buttons for pop up-add relationship details
	    	var oBtnOK = new sap.m.Button({
				text : "OK",
				press :  jQuery.proxy(function() {
		/*		*************************************************	*//*do validation from date< to date*/
					if( this._dateValidation())
					{
						
						this._createRelationship();
						
					}
					else{
				/*	**********************show error msg */	
						this.oAddRelationDetailsDialog.close();
					}
					},this)
			});
			var oBtnCancel = new sap.m.Button({
				text : "Cancel",
				press : jQuery.proxy(function() {this.oAddRelationDetailsDialog.close();},this)
			});
			//call fragment to add in pop up-add relationship details
			if(!this.oRelationshipFragment){
				this.oRelationshipController = sap.umc.mobile.user_profile.view.RelationshipController;
				
			 this.oRelationshipFragment =sap.ui.xmlfragment("sap.umc.mobile.user_profile.view.Relationship", this.oRelationshipController);
			 this.oRelationshipController.setView(this.getView());
			}
			
			//create pop-up
			 if (!this.oAddRelationDetailsDialog) {
				this.oAddRelationDetailsDialog = new sap.m.Dialog({
					title : "Add Relationship Details",
					modal : true,
					contentWidth : "1em",
					buttons : [oBtnOK,oBtnCancel],
					content : [ this.oRelationshipFragment ]
				});
			}
			 //set initial data to pop up fields before opening
			 
			 this._setRelationshipDetails();
			 
			 //open pop-up
			this.oAddRelationDetailsDialog.open();
	    },
	    
	    _setRelationshipDetails:function() {
	    	
	    	
	    	
	    	/*var oRelationship={};
	    	oRelationship["fromDate"]=new Date();
	    	oRelationship["toDate"]=new Date();
	    	this.oRelationshipDetails.setData(oRelationship);*/
	    	
	    	//this.oRelationshipDetails.setProperty("/diff","hello");
	    	this.oRelationshipDetails.setProperty("/ValidFrom",new Date());

	    	this.oRelationshipDetails.setProperty("/ValidTo",new Date());
	    	this.oRelationshipDetails.setProperty("/DifferentiationValue","");
	    	
			//this.getView().setModel(this.oRelationshipDetails,"relationshipDetails");
			this.oAddRelationDetailsDialog.setModel(this.oRelationshipDetails,"relationshipDetails");
			
	    },
	    _dateValidation:function(){
	    	
	    	return true;
	    },
	    
	    _createRelationship:function(){

			
	    	this.getDataProvider().createRelationship(this);
	    },
	    onCreateRelationSuccess:function(){
	    	this.oAddRelationDetailsDialog.close();
			
	    },


});