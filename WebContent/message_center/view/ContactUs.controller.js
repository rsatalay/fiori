sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.message_center.view.ContactUs", {
	onInit: function() {
		sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
		this._setListData();
		this._handleRouting();
	},
	_handleRouting: function() {
		this.getRouter().attachRouteMatched(function(oEvent) {
			var sNavigationName = oEvent.getParameter("name");
			if (sNavigationName === "contactUs") {

			}
		}, this);
	},
	_setListData: function(oEvent) {
		var oFakeData = {
			results: [{
				Icon: "sap-icon://incoming-call",
				Description: this.getText("USER_MANAGEMENT.PHONE"),
				Type: "Navigation"
			},{
				Icon: "sap-icon://call",
				Description: this.getText("USER_MANAGEMENT.PHONE2"),
				Type: "Navigation"
			}, {
				Icon: "sap-icon://addresses",
				Description: this.getText("USER_MANAGEMENT.MAILING_ADDRESS")
			}, {
				Icon: "sap-icon://email",
				Description: this.getText("USER_MANAGEMENT.CORREO")
			}, {
				Icon: "sap-icon://email",
				Description: this.getText("USER_MANAGEMENT.NOTIFICACIONES")
			}, {
				Icon: "sap-icon://history",
				Description: this.getText("USER_MANAGEMENT.HORARIO")
			}]
		};
		var oFakeModel = new sap.ui.model.json.JSONModel(oFakeData);
		this.getView().setModel(oFakeModel, "ContactTypes");
	},
	handleListItemPress: function(oEvent) {
		var oContext = oEvent.getSource().getBindingContext("ContactTypes");
		var oSelectedMessageType = oContext.getProperty(oContext.getPath());
		this._handleContactMethod(oSelectedMessageType);
	},
	handleListItemSelect: function(oEvent) {
		var oContext = oEvent.getParameter("listItem").getBindingContext("ContactTypes");
		var oSelectedMessageType = oContext.getProperty(oContext.getPath());
		this._handleContactMethod(oSelectedMessageType);
	},
	_handleContactMethod: function(oSelectedMessageType) {
		if (oSelectedMessageType.Icon == "sap-icon://email") {
			this._handleAddMessage();
		} else if (oSelectedMessageType.Icon == "sap-icon://incoming-call") {
			this._handleMakeCall();
		}
	},
	_handleMakeCall: function() {
		sap.m.URLHelper.triggerTel("1-800-337-5454");
	},
	_handleAddMessage: function() {
		var oMessageCenterComponent = this.getApp().getComponentFactory().getMessageCenter();
		oMessageCenterComponent.getRouter().myNavTo("addMessage", {Type: "contact"}, false);
	},
});