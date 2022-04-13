
sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.users.view.AddUser", {

	 	onInit: function() {
	        sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
	        //Load User Groups only on Initialization
	        this._loadUserGroups();
	        //Attach Router Matched method
	        this._handleRouting();
	        
	      
	     	
	    },
	    
	    //Data Provider Getter
	    getDataProvider: function() {
	        return sap.umc.mobile.users.model.DataProvider;
	    },
	    
	    //Attach Routing Handler - Route Name "addUser"
	    _handleRouting: function() {
	        this.getRouter().attachRouteMatched(function(oEvent) {
	            var sNavigationName = oEvent.getParameter("name");
	            if (sNavigationName === "addUser") {
	            	this._setDefaultValues();
	            }
	        }, this);
	    },
	    
	    //Load User Groups
	    _loadUserGroups: function() {
	    		this.getDataProvider().loadUserGroups(this);
	    },
	    
	    //To set initial/default values whenever routing to this view
	    _setDefaultValues: function() {
	    		//Set user Model Data
				if(this.getView().getModel("user")){
				this.getView().getModel("user").setData(this.getDataProvider().setDefaultUserDetails().oData);
				}
				else{
				this.getView().setModel(this.getDataProvider().setDefaultUserDetails(),"user");
				}
				//Set userGroupSelected Model Data
				if(this.getView().getModel("userGroupSelected")){
				this.getView().getModel("userGroupSelected").setData(this.getDataProvider().setDefaultUserGroupSelected().oData);
				}
				else{
				this.getView().setModel(this.getDataProvider().setDefaultUserGroupSelected(),"userGroupSelected");
				}
	    },
	    
	    //On User Group Loaded
	    onUserGroupsLoadedSuccess: function(oUsergroups) {
				this.getView().setModel(sap.umc.mobile.users.js.utils.userGroupListFormatter(oUsergroups), "usergroups");
		},
		
		//On User Group Selection
		onUserGroupSelected: function(evt) {
	    	
	    	if(evt.getSource().getSelectedItem().getKey() !== "-1"){
	    		this.getView().getModel("userGroupSelected").setProperty("/selectionUserGroupID",evt.getSource().getSelectedItem().getKey());
	    		this.getView().getModel("user").setProperty("/UserGroupID",evt.getSource().getSelectedItem().getKey().slice(0,-7));}
	    	else{
	    		this.getView().getModel("userGroupSelected").setProperty("/selectionUserGroupID",evt.getSource().getSelectedItem().getKey());
	    	    this.getView().getModel("user").setProperty("/UserGroupID","");
	    	}

	    },

	       //Handle User Save
			onAddUserSavePress:function() {
			if( this._dateValidation())
			{	
				this._createUser();
			}
			else{
				sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
				"USER_PROFILE.DATE_VALIDATION_ERROR"));
			}
			},
			//Date Validation before Relation creation
			_dateValidation:function(){
		    	var validFrom = this.getView().byId("idValidFromUser").getDateValue();
		    	var validTo = this.getView().byId("idValidToUser").getDateValue();
		    	if(validFrom<=validTo)
		    	return true;
		    	else 
		    	return false;
		    },
		    //Create Relation
		    _createUser:function(){
		    	if(this.getView().getModel("userGroupSelected").getProperty("/selectionUserGroupID") !== "-1"){
		    		
		    		this.getDataProvider().createUser(this);
		    		}
		    	else{
		    		sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
					"USER.USER_GROUP_MISSING"));
		    		}
		    	
		    },
		    //On User Creation Success
		    onCreateUserSuccess:function(/*oUserCreated*/){
		    	sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, 
		    	sap.ui.getCore().getModel("i18n").getProperty("USER.USER_CREATION_SUCCESS"));
		    			
		    	this._setDefaultValues();
		    	//fix-back button
		    	
		    	this.getRouter().myNavBack();
		    	/*this.getDataProvider().oUserCreated = oUserCreated;*/
		    	sap.ui.getCore().getEventBus().publish("users", "dirty");
		    	//this.getRouter().myNavTo("users",{},true);
		    	
		    }


});