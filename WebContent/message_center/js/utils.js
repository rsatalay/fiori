jQuery.sap.declare("sap.umc.mobile.message_center.js.utils");

sap.umc.mobile.message_center.js.utils = jQuery.extend(sap.umc.mobile.private.app.js.utils, {

	isAlert: function(value) {
		return value === sap.umc.mobile.private.app.Constants.MESSAGE_TYPE.ALERT;
	},
	isOutage: function(value) {
		return value === sap.umc.mobile.private.app.Constants.MESSAGE_TYPE.OUTAGE;
	},
	isServiceNotification: function(value) {
		return value === sap.umc.mobile.private.app.Constants.MESSAGE_TYPE.SERVICE_NOTIFICATION;
	},
	isInteractionRecord: function(value) {
		return value === sap.umc.mobile.private.app.Constants.MESSAGE_TYPE.INTERACTION_RECORD;
	},
	isNewMessage: function(value) {
		return value === "-1";
	},
	alertType: function(alertTypeID) {
		switch (alertTypeID) {
			case sap.umc.mobile.private.app.Constants.ALERT_TYPE.INVOICE:
				return sap.ui.getCore().getModel("i18n").getProperty("MESSAGE_CENTER.INVOICE");
			case sap.umc.mobile.private.app.Constants.ALERT_TYPE.FILING_OBLIGATION:
                return sap.ui.getCore().getModel("i18n").getProperty("HOME.FILING_OBLIGATIONS");	
			default:
				return alertTypeID;
		}
	},
	dateFormatter: function(value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MMMM d, yyyy"
			});
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},
	twoBooleanOr: function(bBoolean1, bBoolean2) {
		return bBoolean1 || bBoolean2;
	}

});