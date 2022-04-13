jQuery.sap.require("sap.umc.mobile.user_profile.view.RelationshipController");
jQuery.sap.require("sap.umc.mobile.user_profile.view.AddRelationDetailsDialogController");

sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.user_profile.view.AddRelationshipDetails", {
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
	            if (sNavigationName === "addRelationshipDetails") {
	            	
					this._setDefaultValues();
	            }
	        }, this);
	    },
	 //create relationship details model for this page and set default values for date
	    _setDefaultValues: function(){

    		this.getView().byId("idDetailsHbox").addStyleClass("sapDisplayNone");
    		//commented as button removed now
    		//this.getView().byId("idSearchButtonHbox").setJustifyContent("Start");	
    		this.getView().byId("idSaveRelation").setVisible(false);
    		if(this.getView().getModel("relationshipDetails")){
    			
    			this.getView().getModel("relationshipDetails").setData(this.getDataProvider().setRelationshipDetails().oData);
		
    		}
    		else{
    			this.getView().setModel(this.getDataProvider().setRelationshipDetails(),"relationshipDetails");
    			
    		}
    		if(this.getView().getModel("address")){

    			this.getView().getModel("address").setData([]);
    		}
		
	    	
	    	/*
	    	var obj = new Object();
	    
	    	obj.button = false;
	    	this.oRelationshipDetailsVisisble = new sap.ui.model.json.JSONModel();
	    	this.oRelationshipDetailsVisisble.setData(obj);
	    	
	    	this.getView().setModel(this.oRelationshipDetailsVisisble,"relationshipDetailsVisisble");
	 */   	
	    },
	//pop up creation on search button press    
	onSearchTaxAdvisorPress:function(){
		//create buttons for pop up-add relationship details
    	/*var oBtnOK = new sap.m.Button({
			text : "OK",
			press :  jQuery.proxy(function() {
			*************************************************	set  data before closing
				
					this.oAddRelationDetailsDialog.close();
				
				},this)
		});*/
		/*var oBtnCancel = new sap.m.Button({
			text : "Cancel",
			press : jQuery.proxy(function() {this.oAddRelationDetailsDialog.close();},this)
		});*/
		//call fragment to add in pop up-add relationship details
		if(!this.oRelationshipFragment){
			this.oRelationshipController = sap.umc.mobile.user_profile.view.RelationshipController;
			
		 this.oRelationshipFragment =sap.ui.xmlfragment("sap.umc.mobile.user_profile.view.Relationship", this.oRelationshipController);
		 this.oRelationshipController.setView(this.getView());
		 //this._handleTaxAdvisorSelection();
		}
		
		//create pop-up
		 if (!this.oAddRelationDetailsDialog) {
			 
			 this.oAddRelationDetailsDialogController = sap.umc.mobile.user_profile.view.AddRelationDetailsDialogController;
				
			 
			 this.oAddRelationDetailsDialog =sap.ui.xmlfragment("sap.umc.mobile.user_profile.view.AddRelationDetailsDialog", this.oAddRelationDetailsDialogController);
			 this.oAddRelationDetailsDialogController.setView(this.getView());
			 this.oAddRelationDetailsDialog.addContent(this.oRelationshipFragment[0]);
			 this.oAddRelationDetailsDialog.addContent(this.oRelationshipFragment[1]);
		/*	this.oAddRelationDetailsDialog = new sap.m.Dialog({
				title : "Searching for Business Partners",
				modal : true,
				contentWidth : "71%",
				buttons : [oBtnCancel],
				content : [ this.oRelationshipFragment ]
			});*/
			 this._readCountriesForFliter();
		}
		 //set initial data to pop up field drop down of filter before opening - coutries
		 
		
		 this.setDefaultValues();
	
		

	},
	setDefaultValues:function(){
		if(this.getDataProvider().oBusinessDirectory){
    		this.getDataProvider().oBusinessDirectory.setData([]);
    	}
    	
    	//set default values to other fields

    	var oFilterBar = sap.ui.getCore().byId("idAddRelationsFilter");
    	var oFilterItems = oFilterBar.getAllFilterItems();
    
    	$.each(oFilterItems, function(index,oFilterItem){
    		
    		if(typeof(oFilterBar.determineControlByFilterItem(oFilterItem).getValue)=="function"){
    	oFilterBar.determineControlByFilterItem(oFilterItem).setValue("");}
    		
        		
    		
     });

	    
    	sap.ui.getCore().byId("idCountrySelect").setSelection(null);
    	this.oAddRelationDetailsDialog.open();
	},
	    
	    //to read countries to bind to drop down
	_readCountriesForFliter:function(){
	    	this.getDataProvider().readCountriesForFliter(this);
	    },
	    //after country has been loaded set model to drop down and open the dialog
	    onCountriesLoadedForFilter:function(oCountries){
	    	this.oAddRelationDetailsDialog.setModel(oCountries,"countries");
	    	
	    },
	  //after the business directory is read, set model to pop up to show the list of
	  //tax advisors
		onSearchRelationsSuccess:function(oBusinessDirectory) {
	    	this.oAddRelationDetailsDialog.setModel(oBusinessDirectory,"businessDirectory");
	    	
	    },
	    setSelectedAddressDetails:function(oAddressDetails) {
	    this.getView().byId("idDetailsHbox").removeStyleClass("sapDisplayNone");	
//		this.getView().byId("idDetailsHbox").addStyleClass("sapDisplayFlex");	
	    //commented as button removed now
		//this.getView().byId("idSearchButtonHbox").setJustifyContent("End");	
		this.getView().byId("idSaveRelation").setVisible(true);
		this.getView().setModel(oAddressDetails,"address");
		/*this.getView().getModel("relationshipDetailsVisisble").setProperty("/button",true);
		this.getView().getModel("relationshipDetailsVisisble").refresh()*/;
		//after setting the address close the pop up
		this.oAddRelationDetailsDialog.close();
		},
	   /* _handleTaxAdvisorSelection: function() {
			//this.getPayButton().setVisible(false);
			
			if (this.oRelationshipFragment) {
				this._getTaxAdvisorList().attachPress(null, this.oRelationshipController.onTaxAdvisorSelection, this.oRelationshipController);
			}
			
		},
		_getTaxAdvisorList: function() {
			return this.getView().byId("idTaxAdvisorList");
		},*/
		
		//create relation
		onAddRelationSavePress:function() {
			if( this._dateValidation())
			{
				
				this._createRelationship();
				
			}
			else{
		/*	**********************show error msg */	
				sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
				"USER_PROFILE.DATE_VALIDATION_ERROR"));
				
				
			}
			},
			_dateValidation:function(){
		    	var validFrom = this.getView().byId("idValidFrom").getDateValue();
		    	var validTo = this.getView().byId("idValidTo").getDateValue();
		    	if(validFrom<=validTo)
		    	return true;
		    	else 
		    	return false;
		    },
		    
		    _createRelationship:function(){

				
		    	this.getDataProvider().createRelationship(this);
		    },
		    onCreateRelationSuccess:function(){
		    	sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, sap.ui.getCore().getModel("i18n").getProperty(
				"USER_PROFILE.RELATION_CREATION_SUCCESS"));
		    	this._setDefaultValues();
		    	this.getRouter().myNavBack();
		    	//this.getRouter().myNavTo("manageRelationships");
				
		    },
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf user_profile.view.AddRelationshipDetails
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf user_profile.view.AddRelationshipDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf user_profile.view.AddRelationshipDetails
*/
/*onAfterRendering: function() {
	this.getView().byId("idSaveRelation").setVisible(false);
},*/

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf user_profile.view.AddRelationshipDetails
*/
//	onExit: function() {
//
//	}

});