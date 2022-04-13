sap.umc.mobile.private.app.view.DetailBaseController.extend("sap.umc.mobile.users.view.UserDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf users.view.UserDetails
*/
	onInit: function() {
		sap.umc.mobile.private.app.view.DetailBaseController.prototype.onInit.call(this);
		//Attach Router Matched method
		this._handleRouting();
		
		
	//	sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
//sap.ui.getCore().getEventBus().subscribe("navigation", "back", $.proxy(function(channel, event, data) {
//			
//			if(data.stack[data.stack.length-1].route === "userDetail" )
//			this.navBackToUserDetail = true;
//		}, this));
		/*sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);*/
	},
	
	//Data Provider Getter
    getDataProvider: function() {
        return sap.umc.mobile.users.model.DataProvider;
    },
    
    onUserDetailChange:function(evt){
    	var oSrc = evt.getSource();
    	if(sap.m.DatePicker.prototype.isPrototypeOf(oSrc)){
    		if(oSrc.mBindingInfos.value.binding.sPath === "/ValidTo"){
    			oSrc.mBindingInfos.value.binding.oModel.oData.ValidTo = oSrc.getDateValue();
    		}
    		
    		if(oSrc.mBindingInfos.value.binding.sPath === "/ValidFrom"){
    			oSrc.mBindingInfos.value.binding.oModel.oData.ValidFrom = oSrc.getDateValue();
    		}
        		
    	}
    	this.bUserDetailsChanged = true;
    },
    onUserPrivilegeChange:function(evt){
    	var oSrc = evt.getSource();
    	if(sap.m.DatePicker.prototype.isPrototypeOf(oSrc)){
    		var sPath = oSrc.oPropagatedProperties.oBindingContexts.UserPrivileges.sPath;
    		var ind = sPath.split("/").pop();
    		if(oSrc.mBindingInfos.value.binding.sPath === "ValidTo"){
    			
    			oSrc.mBindingInfos.value.binding.oModel.oData.results[ind].ValidTo = oSrc.getDateValue();
    		}
    		
    		if(oSrc.mBindingInfos.value.binding.sPath === "ValidFrom"){
    			oSrc.mBindingInfos.value.binding.oModel.oData.results[ind].ValidFrom = oSrc.getDateValue();
    		}
        		
    	}
    	
    },
    //Attach Routing Handler - Route Name "userDetail"
	_handleRouting: function() {
		this.getRouter().attachRouteMatched(function(oEvent) {
			var sNavigationName = oEvent.getParameter("name");
			if (sNavigationName === "userDetail") {
				var data = this.getRouter().getLastRouteData();
				if(data){
					/*	for(var i=0;i<data.stack.length;i++){*/
						/*	if(data.stack[data.stack.length-1].route === "userDetail"){*/
								this.oSelectedUser = data;
								this._setElementVisiblity();
								var selectedUser=jQuery.extend( {}, this.oSelectedUser);
								this._setUsersModel(selectedUser);
								this._loadUserAssignedPrivileges(this.oSelectedUser);
								this.bUserDetailsChanged = false;
							
							/*}*/
						}
				
				//fix-back button
			/*	if(this.navBackToUserDetail){
					this.navBackToUserDetail = false;
					//this.getRouter().myNavTo("users", {}, true);
					
			
				}*/
				/*sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
				
				sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
			*/	/*if(oEvent.getSource()._oCurrentParameters){
				this.oSelectedUser = oEvent.getSource()._oCurrentParameters;
				this._setElementVisiblity();
				this._setUsersModel(oEvent.getSource()._oCurrentParameters);
				this._loadUserAssignedPrivileges(oEvent.getSource()._oCurrentParameters);
			
				}*/
			}
			}, this);
	},
	formatDate:function(sDate){
		if(Date.prototype.isPrototypeOf(sDate)){  
			var sFormattedDate = "";
			sFormattedDate += sDate.getFullYear().toString()+"-";
		if((sDate.getMonth()+1)<10){
			sFormattedDate += "0"+(sDate.getMonth()+1).toString()+"-";
		}
		else
			{
			sFormattedDate += (sDate.getMonth()+1).toString()+"-";
			}
		if((sDate.getDate())<10){
			sFormattedDate += "0"+sDate.getDate().toString();
		}
		else
			{
			sFormattedDate += sDate.getDate().toString();
			}
		
return sFormattedDate+"T"+"00:00:00";}
	 else{
		 return	 sDate;
	 }
		/*
		if(Date.prototype.isPrototypeOf(sDate)){  
		var sLocalDateTemp = sDate.toLocaleDateString();
		
		var sLocalDate= "";
		
		for(var i =0;i<sLocalDateTemp.length;i++){
			if(!(sLocalDateTemp.charCodeAt(i)===8206)){
				
				sLocalDate += sLocalDateTemp.charAt(i);
				
			}
			
		}
		var sSplitDate =  sLocalDate.split("/");
		var sFormattedDate = sSplitDate[2]+"-";
		if(sSplitDate[0].length ==1 ){
		sFormattedDate += "0"+sSplitDate[0]+"-";	
		}
		else{
			sFormattedDate += sSplitDate[0]+"-";	
		}
		if(sSplitDate[1].length ==1 ){
			sFormattedDate += "0"+sSplitDate[1];	
			}
			else{
				sFormattedDate += sSplitDate[1];	
			}
		
		
		
		return sFormattedDate+"T"+"00:00:00";}
	 else{
		 return	 sDate;
	 }
	*/},
	formatToUTCDate:function(sDate){
		
		//var sDate= sap.umc.mobile.users.js.utils.formatUsersDate(sDate);
			
			if(Date.prototype.isPrototypeOf(sDate)){
				return new Date(sDate.getUTCFullYear(),sDate.getUTCMonth(),sDate.getUTCDate());
			}
		 else{
    		 return	 sDate;
    	 }
			
			
		},
	//Set User Model
	_setUsersModel:function(oSelectedUsers){
		var oUsers = jQuery.extend(true, {}, oSelectedUsers);
		/*oUsers.ValidFrom = sap.umc.mobile.private.app.js.formatters.timeRemovalFormatter(oUsers.ValidFrom);
		oUsers.ValidTo = sap.umc.mobile.private.app.js.formatters.timeRemovalFormatter(oUsers.ValidTo);*/
			var oModel = new sap.ui.model.json.JSONModel();	
			
			oModel.setData(oUsers);
			this.getView().setModel(oModel, "user");
			this.getView().getModel("user").setProperty("/editable",false);
		
	},
	
	//On Press of Add User Button
	onAddUserPress:function(){
		//fix-back button
		
		this.getRouter().myNavTo("addUser",{},false);
	},
	
	//Load User Assigned Privileges
	
	_loadUserAssignedPrivileges:function(oSelectedUser){
		
		this.getDataProvider().loadUserAssignedPrivileges(this,oSelectedUser);
	},
	//load user privileges
	_loadUserPrivileges:function(oSelectedUser){
		
		this.getDataProvider().loadUserPrivileges(this,oSelectedUser);
	},
	//on load of User Assigned Privileges
	onUserAssignedPrivilegesLoaded:function(oUserAssignedPrivileges){
		
		/*if(this.getView().getModel("UserAssignedPrivileges")){
			this.getView().getModel("UserAssignedPrivileges").setData(oUserAssignedPrivileges.getData());
			this.getView().getModel("UserAssignedPrivileges").refresh();
		}
		else{*/
			this.getView().setModel(oUserAssignedPrivileges, "UserAssignedPrivileges");
			this.getView().getModel("UserAssignedPrivileges").refresh();
	/*	}*/
	},
	onUserPrivilegesLoaded:function(oUserPrivileges){
	/*	if(this.getView().getModel("UserPrivileges")){
			this.getView().getModel("UserPrivileges").setData(oUserPrivileges.getData());
			this.getView().getModel("UserPrivileges").refresh();
			
		}
		else{*/
			this.getView().setModel(oUserPrivileges, "UserPrivileges");
			this.getView().getModel("UserPrivileges").refresh();
	/*	}*/
		//to set the initial selection of the user privileges list - assigned user prvlg should be 
		//checked and enabled
	/*	var oPrivilegeTable = this.getView().byId("idUserPrivilegesTable");
		
		var aItems = oPrivilegeTable.getItems();*/
		/*for(var i=0;i<aItems.length;i++){
			
			var oItem = aItems[i];
			var oPrivilegeTableModel =oItem.oBindingContexts.UserPrivileges.getModel();
			var sPath = oItem.getBindingContextPath();
			var obj = oPrivilegeTableModel.getObject(sPath);
			if(obj.enabled){
				oItem.setSelected(true);
			}
			else{
				oItem.setSelected(false)
			}
			
		}*/
	
	},
	//on User privileges edit
	onEditUserAssignedPrivilegesPress:function(){
		
		this.getView().getModel("user").setProperty("/editable",true);
		this._loadUserPrivileges(this.oSelectedUser);
	    this._toggleVisiblity();
	    this.getView().byId("idUserPrivilegesTable").removeSelections();
		
	},
	
	//set initial visibility
	_setElementVisiblity:function(){
		
		//this.getView().byId("idUserDetails").setEditable(false);	
		this.getView().byId("idSaveUserAssignedPrivileges").setVisible(false);	
		this.getView().byId("idUserPrivilegesTable").setVisible(false);
		this.getView().byId("idUserAssignedPrivilegesTable").setVisible(true);
		// this.getView().byId("idEditUserAssignedPrivileges").setVisible(true);   // ACASTANEDA 
		//this.getView().byId("idCancelUserAssignedPrivileges").setVisible(false);// ACASTANEDA 
		//this.getView().byId("idCreateUser").setVisible(true); // ACASTANEDA 
		
		
		
		
	},
	
	onSaveUserAssignedPrivilegesPress:function(){
		this._createUserRoles();
		
		
		
	},
	_createUserRoles:function(){
		this.getDataProvider().createUserRoles(this,this.oSelectedUser);
	
	},
	onCreateUserRolesSuccess:function(){
		this.getView().getModel("user").setProperty("/editable",false);
		
		sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, 
		    	sap.ui.getCore().getModel("i18n").getProperty("USER.ROLES_UPDATE_SUCCESS")
				/*"Roles updated Successfully"*/);
		this._loadUserAssignedPrivileges(this.oSelectedUser);
		this._toggleVisiblity();
	
	},
	_toggleVisiblity:function(){
		//this.getView().byId("idUserDetails").setEditable(!(this.getView().byId("idUserDetails").getEditable()));
		this.getView().byId("idEditUserAssignedPrivileges").setVisible(!(this.getView().byId("idEditUserAssignedPrivileges").getVisible()));
		this.getView().byId("idSaveUserAssignedPrivileges").setVisible(!(this.getView().byId("idSaveUserAssignedPrivileges").getVisible()));
		this.getView().byId("idUserPrivilegesTable").setVisible(!(this.getView().byId("idUserPrivilegesTable").getVisible()));
		this.getView().byId("idUserAssignedPrivilegesTable").setVisible(!(this.getView().byId("idUserAssignedPrivilegesTable").getVisible()));
		this.getView().byId("idCancelUserAssignedPrivileges").setVisible(!(this.getView().byId("idCancelUserAssignedPrivileges").getVisible()));
		this.getView().byId("idCreateUser").setVisible(!(this.getView().byId("idCreateUser").getVisible()));
	
	},
	onCancelUserAssignedPrivilegesPress:function(){
		var selectedUser=jQuery.extend( {}, this.oSelectedUser);
		this._setUsersModel(selectedUser);		
		
		this._loadUserAssignedPrivileges(this.oSelectedUser);
		this._toggleVisiblity();	
	
	},
	onUserUpdateSuccess:function(){
		
		var oUsersComponent =  this.getApp().getComponentFactory().getUsers();
		//fix-back button
		oUsersComponent.getRouter().myNavTo("users", this.oSelectedUser, true);
	
		
	},
	onSelectionChange:function(oEvt){
		var oListItemsSelectionChange = oEvt.mParameters.listItems;
		
		for(var i=0;i<oListItemsSelectionChange.length;i++){
			var oListItemSelectionChange = oListItemsSelectionChange[i];
			var oModel = oListItemSelectionChange.oBindingContexts.UserPrivileges.getModel();
			var sPath = oListItemSelectionChange.oBindingContexts.UserPrivileges.sPath;
			var oUserPrvlg = oModel.getObject(sPath);
			if(oListItemSelectionChange.mProperties.selected){
				//if does not already exits, if it is not null 
				//then it would have been already been assigned from already assigned prvlg on unchecking
				if(!oUserPrvlg.ValidTo){
				if(this.oSelectedUser.ValidTo){
					oUserPrvlg.ValidTo = this.oSelectedUser.ValidTo;}
				else{
					oUserPrvlg.ValidTo = new Date(9999,11,31);}}
				
				if(!oUserPrvlg.ValidFrom){
				if(this.oSelectedUser.ValidFrom){
				oUserPrvlg.ValidFrom = this.oSelectedUser.ValidFrom;}
				else{
					oUserPrvlg.ValidFrom = new Date();
				}
				}
				oUserPrvlg.enabled = true;
			}
			else{
				//on unchecking chk 1st initialze to null
				oUserPrvlg.ValidTo = null;
				oUserPrvlg.ValidFrom = null;
				oUserPrvlg.enabled = false;
				//then chk if the prvg is already assigned
				var aUserAssignedPrvlg = this.getView().getModel("UserAssignedPrivileges").oData.results;
				
				//change the valid from and to-according to already existing user assigned privilege valid from n to
				
					for(var j=0;j<aUserAssignedPrvlg.length;j++){
						if(oUserPrvlg.UserPrivilegeID === aUserAssignedPrvlg[j].UserPrivilege.UserPrivilegeID){
							aUserAssignedPrvlg[j].ValidTo.setHours(0);
							aUserAssignedPrvlg[j].ValidTo.setMinutes(0);
							aUserAssignedPrvlg[j].ValidTo.setSeconds(0);
							oUserPrvlg.ValidTo = aUserAssignedPrvlg[j].ValidTo;
							oUserPrvlg.ValidFrom = aUserAssignedPrvlg[j].ValidFrom;
							
							
						}
					}
					
				
				
			}
			
		}
		
		this.getView().getModel("UserPrivileges").refresh();
		/*
		
		var oUserPrivilegesTable = oEvt.getSource();
		
	if(oUserPrivilegesTable.getItems().length == 0){return;}
		
		
		for(var i=0;i<oUserPrivilegesTable.getItems().length;i++){
			var oModel = oUserPrivilegesTable.getItems()[i].oBindingContexts.UserPrivileges.getModel();
			var sPath = oUserPrivilegesTable.getItems()[i].oBindingContexts.UserPrivileges.sPath;
			var oUserPrvlg = oModel.getObject(sPath);
			
			if(oUserPrivilegesTable.getItems()[i].isSelected()){
			
			oUserPrivilegesTable.getItems()[i].getCells()[1].setEnabled(true);
			oUserPrivilegesTable.getItems()[i].getCells()[2].setEnabled(true);
			
			if(!(oUserPrvlg.ValidFrom || oUserPrvlg.ValidTo)){
				
				new Date(9999,11,31);
				new Date();
			}
			
			
			
			}
			else{
				oUserPrivilegesTable.getItems()[i].getCells()[1].setEnabled(false);
				oUserPrivilegesTable.getItems()[i].getCells()[2].setEnabled(false);
				oUserPrvlg.ValidFrom = null;
				
			}
		}
	
		
		
	
	*/},
	handleNavigationEvent:function(channel, event, data) { 
		
		 var sNavigationName = data.route;
         if (sNavigationName === "userDetail") {
		if(data){
	
				if(data.stack[data.stack.length-1].route === "userDetail"){
					this.oSelectedUser = data.stack[data.stack.length-1].parameters;
					this._setElementVisiblity();
					var selectedUser=jQuery.extend( {}, this.oSelectedUser);
					this._setUsersModel(selectedUser);
					this._loadUserAssignedPrivileges(this.oSelectedUser);
					this.bUserDetailsChanged = false;
				
				}
			}}

   
}
	
	
	

});