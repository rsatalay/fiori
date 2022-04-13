sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.user_profile.view.ManageRelationships", {


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
            if (sNavigationName === "manageRelationships") {
            	this._loadRelationships();
				
            }
        }, this);
    },
 
    _loadRelationships: function() {
    	
    	this.getDataProvider().loadRelationships(this);
    },
    onRelationshipsLoadedSuccess: function(oRelationships) {
		this.getView().setModel(oRelationships, "relationships");
		/*this._loadBussinessAgreements();*/
	},
	handleDeleteRelationship: function(evt) {
	this.oSrc = evt.getSource();
		var obj = {
				title: sap.ui.getCore().getModel("i18n").getProperty("USER_PROFILE.RELATIONSHIPS_DELETE"),
				actions: [sap.ui.getCore().getModel("i18n").getProperty("APP.OK"), sap.ui.getCore().getModel("i18n").getProperty("APP.CANCEL")],
				onClose: $.proxy(function(oAction) { 
					if(oAction===sap.ui.getCore().getModel("i18n").getProperty("APP.OK")){	      
						
						
						var oBindingContext = this.oSrc.getParent().oBindingContexts;
						var sPath = oBindingContext.relationships.sPath;
						var oRelationshipsModel =oBindingContext.relationships.oModel;
						var oRelationshipSelected = oRelationshipsModel.getObject(sPath);
						this.getDataProvider().removeRelationship(this,oRelationshipSelected);	
					
					}
				}, this)
		};
		sap.m.MessageBox.show(sap.ui.getCore().getModel("i18n").getProperty("USER_PROFILE.RELATIONSHIPS_DELETE_CONFIRM"), obj);	

	
	
	},
	onRemoveRelationshipSuccess: function() {
		sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, sap.ui.getCore().getModel("i18n").getProperty(
		"USER_PROFILE.RELATION_DELETE_SUCCESS"));
		this._loadRelationships();
	},

	onAddRelationPress:function() {
		this.getRouter().myNavTo("addRelationshipDetails");
		/*var oBtnOK = new sap.m.Button({
			text : "OK",
			press :  jQuery.proxy(function() {this.oRelationDialog.close();},this)
		});
		var oBtnCancel = new sap.m.Button({
			text : "Cancel",
			press : jQuery.proxy(function() {this.oRelationDialog.close();},this)
		});
		if(!this.oRelationshipFragment){
		 this.oRelationshipFragment =sap.ui.xmlfragment("sap.umc.mobile.user_profile.view.Relationship", this);}
		 if (!this.oRelationDialog) {
			this.oRelationDialog = new sap.m.Dialog({
				title : "Add Relation",
				modal : true,
				contentWidth : "1em",
				buttons : [oBtnOK,oBtnCancel],
				content : [ this.oRelationshipFragment ]
			});
		}
		this.oRelationDialog.open();*/
	},
	/*onRelationDialogOK:function() {
		this.oRelationDialog.close();
	},
	
	onRelationDialogCancel:function() {
		this.oRelationDialog.close();
	},*/
	


});