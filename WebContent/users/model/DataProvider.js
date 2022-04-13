jQuery.sap.declare("sap.umc.mobile.users.model.DataProvider");

sap.umc.mobile.users.model.DataProvider={
		loadUsers: function(oDelegate, bForcedReload,oSelectedUser) {
			if (bForcedReload == true){
				this._reloadUsers(oDelegate,oSelectedUser);
			} else {/*
				if (!this.oUsers) {
					this._reloadUsers(oDelegate);
				} else {
					if (oDelegate != null){
						oDelegate.onUsersLoaded(this.oUsers);
					}
				}
			*/}
			
			
			
		},
		_reloadUsers: function(oDelegate,oSelectedUser) {
			this.oUsers = new sap.ui.model.json.JSONModel();
			this._readUsers(oDelegate,oSelectedUser);
		},
		loadUserGroups: function(oDelegate, bForcedReload) {
			this.oUserGroups = new sap.ui.model.json.JSONModel();
			this._loadUserGroups(oDelegate);
		},
		_onUserGroupsLoadedSuccess: function(oDelegate,oData){
			
		/*	oData.results.unshift("");*/
			
			
			this.oUserGroups.setData(oData);
			
			oDelegate.onUserGroupsLoadedSuccess(this.oUserGroups);		
		},
		setDefaultUserDetails: function(){
			this.oUserDetails = new sap.ui.model.json.JSONModel();
			this.oUserDetails.setProperty("/AliasID","");
			this.oUserDetails.setProperty("/ValidFrom",new Date());
			this.oUserDetails.setProperty("/ValidTo",new Date(9999,11,31));
			this.oUserDetails.setProperty("/FirstName","");
			this.oUserDetails.setProperty("/LastName","");
			this.oUserDetails.setProperty("/AccountID",this.getAccount().getProperty("/AccountID"));
			this.oUserDetails.setProperty("/Email","");
			this.oUserDetails.setProperty("/UserGroupID","");
			
			return this.oUserDetails;
			},
			setDefaultUserGroupSelected: function(){
				this.oUserGroupSelected = new sap.ui.model.json.JSONModel();
				this.oUserGroupSelected.setProperty("/selectionUserGroupID","-1");
			
				
				return this.oUserGroupSelected;
				},
			createUser:function(oDelegate){
				this._createUser(oDelegate);
			},
			
			loadUserAssignedPrivileges:function(oDelegate,oSelectedUser){
				this.oUserAssignedPrivileges = new sap.ui.model.json.JSONModel();
				this._loadUserAssignedPrivileges(oDelegate,oSelectedUser);
			},
			loadUserPrivileges:function(oDelegate,oSelectedUser){
				this.oUserPrivileges = new sap.ui.model.json.JSONModel();
				this._loadUserPrivileges(oDelegate,oSelectedUser);
			},
			createUserRoles:function(oDelegate,oSelectedUser){
				this._createUserRoles(oDelegate,oSelectedUser);
			},
			_onUserPrivilegesLoaded:function(oDelegate){
				
				
				var aUserAssignedPrvlg = oDelegate.getView().getModel("UserAssignedPrivileges").oData.results;
				//initialize valid from and to - null
				for(var i=0;i<this.oUserPrivileges.oData.results.length;i++){
					
					this.oUserPrivileges.oData.results[i].ValidTo = null;
					this.oUserPrivileges.oData.results[i].ValidFrom = null;
					this.oUserPrivileges.oData.results[i].enabled = false;
				}
				//change the valid from and to-according to already existing user assigned privilege valid from n to
				for(var i=0;i<this.oUserPrivileges.oData.results.length;i++){
					for(var j=0;j<aUserAssignedPrvlg.length;j++){
						if(this.oUserPrivileges.oData.results[i].UserPrivilegeID === aUserAssignedPrvlg[j].UserPrivilege.UserPrivilegeID){
							/*aUserAssignedPrvlg[j].ValidTo.setHours(0);
							aUserAssignedPrvlg[j].ValidTo.setMinutes(0);
							aUserAssignedPrvlg[j].ValidTo.setSeconds(0);*/
							this.oUserPrivileges.oData.results[i].ValidTo = aUserAssignedPrvlg[j].ValidTo;
							this.oUserPrivileges.oData.results[i].ValidFrom = aUserAssignedPrvlg[j].ValidFrom;
							this.oUserPrivileges.oData.results[i].enabled = true;
						
						}
					}
					
				}
				oDelegate.onUserPrivilegesLoaded(this.oUserPrivileges);
			}
		/*getUserByIndex: function(index) {
			var invoices = this.oInvoices.getData().results;
			var invoiceModel;
			if (invoices) {
				for ( var i = 0; i < invoices.length; i++) {
					if (invoices[i].InvoiceID === invoiceId) {
						invoiceModel = new sap.ui.model.json.JSONModel();
						invoiceModel.setData(invoices[i]);
						break;
					}
				}
			}
			return invoiceModel;
		},*/
		
};
