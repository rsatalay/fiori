jQuery.sap.declare("sap.umc.mobile.private.app.ComponentFactory");
sap.umc.mobile.private.app.ComponentFactory={
	HOME_ID: "HomeComponent",
	INVOICE_ID: "InvoiceComponent",
	MESSAGE_CENTER_ID:"MessageCenterComponent",
	CONTRACT_ID:"ContractComponent",
	USER_PROFILE_ID:"UserProfileComponent",
	USER_MANAGEMENT_ID:"UserComponent",
	AGENT_PANEL_ID:"AgentPanelComponent",
	FILING_OBLIGATIONS:"FilingObligationsComponent",
	FORMS:"FormsComponent",
	DOCUMENTS:"DocumentsComponent",
	USERS:"UsersComponent",
	
	getFilingObligations: function(){
        var oFilingObligationsComponent = sap.ui.getCore().getComponent(this.FILING_OBLIGATIONS);
        if (!oFilingObligationsComponent) {
            oFilingObligationsComponent = sap.ui.getCore().createComponent({
                name : "sap.umc.mobile.filing_obligations",
                id : "FilingObligationsComponent",
                url : jQuery.sap.getModulePath("sap.umc.mobile") + "/filing_obligations"
            });
        }
        return oFilingObligationsComponent;
    },    
    getForms: function(){
        var oFormsComponent= sap.ui.getCore().getComponent(this.FORMS);
        if (!oFormsComponent) {
            oFormsComponent= sap.ui.getCore().createComponent({
                name : "sap.umc.mobile.forms",
                id : "FormsComponent",
                url : jQuery.sap.getModulePath("sap.umc.mobile") + "/formsnew"
            });
        }
        return oFormsComponent;
    },   
	getHome: function(){
		var oHomeComponent = sap.ui.getCore().getComponent(this.HOME_ID);
		if (!oHomeComponent) {
			oHomeComponent = sap.ui.getCore().createComponent({
				name : "sap.umc.mobile.home",
				id : "HomeComponent",
				url : jQuery.sap.getModulePath("sap.umc.mobile") + "/home"
			})
		}
		return oHomeComponent;
	},
	getInvoice: function(){
		var oInvoiceComponent = sap.ui.getCore().getComponent(this.INVOICE_ID);
		if(!oInvoiceComponent){
			oInvoiceComponent = sap.ui.getCore().createComponent({
				name: "sap.umc.mobile.invoice",
				id: "InvoiceComponent",
				url: jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice"
			});
		}
		return oInvoiceComponent;
	},
	getMessageCenter: function(){
		var oMessageCenterComponent = sap.ui.getCore().getComponent(this.MESSAGE_CENTER_ID);
		if(!oMessageCenterComponent){
			oMessageCenterComponent = sap.ui.getCore().createComponent({
				name: "sap.umc.mobile.message_center",
				id: "MessageCenterComponent",
				url: jQuery.sap.getModulePath("sap.umc.mobile") + "/message_center"
			});
		}
		return oMessageCenterComponent;
	},
	getContract: function(){
		var oContractComponent = sap.ui.getCore().getComponent(this.CONTRACT_ID);
		if(!oContractComponent){
			oContractComponent = sap.ui.getCore().createComponent({
				name: "sap.umc.mobile.contract",
				id: "ContractComponent",
				url: jQuery.sap.getModulePath("sap.umc.mobile") + "/contract"
			});		
		}
		return oContractComponent;
	},
	getUserProfile: function(){
		var oUserProfileComponent = sap.ui.getCore().getComponent(this.USER_PROFILE_ID);
		if(!oUserProfileComponent){
			oUserProfileComponent = sap.ui.getCore().createComponent({
				name: "sap.umc.mobile.user_profile",
				id: "UserProfileComponent",
				url: jQuery.sap.getModulePath("sap.umc.mobile") + "/user_profile"
			});
		}
		return oUserProfileComponent;
	},
	getUserManagement: function() {
        jQuery.sap.registerModulePath("sap.umc.mobile.public.app", jQuery.sap.getModulePath("sap.umc.mobile.public") + "/app_public");
        var oUserComponent = sap.ui.getCore().getComponent(this.USER_MANAGEMENT_ID);
        if (!oUserComponent) {
            oUserComponent = sap.ui.getCore().createComponent({
                name: "sap.umc.mobile.user_management",
                id: "UserComponent",
                url: jQuery.sap.getModulePath("sap.umc.mobile.public") + "/user_management"
            });
        }
        return oUserComponent;
    },
	getAgentPanel: function(){
		oAgentPanelComponent = sap.ui.getCore().getComponent(this.AGENT_PANEL_ID);
		if (!oAgentPanelComponent) {
			oAgentPanelComponent = sap.ui.getCore().createComponent({
				name: "sap.umc.mobile.agent_panel",
				id: "AgentPanelComponent",
				url: jQuery.sap.getModulePath("sap.umc.mobile") + "/agent_panel"
			});			
		}
		return oAgentPanelComponent;
	},
	getDocuments: function(){
        var oDocumentsComponent= sap.ui.getCore().getComponent(this.DOCUMENTS);
        if (!oDocumentsComponent) {
            oDocumentsComponent= sap.ui.getCore().createComponent({
                name : "sap.umc.mobile.documents",
                id : "DocumentsComponent",
                url : jQuery.sap.getModulePath("sap.umc.mobile") + "/documents"
            });
        }
        return oDocumentsComponent;
    }, 
	getUsers: function(){
        var oUsersComponent= sap.ui.getCore().getComponent(this.USERS);
        if (!oUsersComponent) {
        	oUsersComponent= sap.ui.getCore().createComponent({
                name : "sap.umc.mobile.users",
                id : "UsersComponent",
                url : jQuery.sap.getModulePath("sap.umc.mobile") + "/users"
            });
        }
        return oUsersComponent;
    }, 
	getIds: function(){
		return [	this.FILING_OBLIGATIONS,
                    this.FORMS,
		        	this.HOME_ID,
		        	this.INVOICE_ID,
		        	this.MESSAGE_CENTER_ID,
		        	this.CONTRACT_ID,
		        	this.USER_PROFILE_ID,
		        	this.USER_MANAGEMENT_ID,
		        	this.AGENT_PANEL_ID,
		        	this.DOCUMENTS,
		        	this.USERS
		        	
		        ];
	}
};