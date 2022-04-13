jQuery.sap.declare("sap.umc.mobile.users.js.utils");

sap.umc.mobile.users.js.utils = jQuery.extend(sap.umc.mobile.private.app.js.utils, {
	userGroupListFormatter: function(oUserGroups) {
		if (jQuery.isEmptyObject(oUserGroups.getData())) {
			return;
		}
		for ( var i = 0; i < oUserGroups.getData().results.length; i++) {
			if (oUserGroups.getData().results[i].UserGroupID) {
				oUserGroups.getData().results[i].selectionDescription = oUserGroups.getData().results[i].Description ;
				oUserGroups.getData().results[i].selectionUserGroupID = oUserGroups.getData().results[i].UserGroupID
						+ "usergrp";
			}
		}
		var topSelection = {
				selectionDescription: "",
				selectionUserGroupID: "-1",
			
		};
		oUserGroups.getData().results.unshift(topSelection);
		return oUserGroups;
	},
	formatFirstLastName:function(sFname,sLname){
		return sFname + " " + sLname;
		
	},
	formatUsersDate: function(dDate){
		
			var newDate = new Date();
			if (dDate) {
				newDate.setYear(dDate.getUTCFullYear());
				newDate.setMonth(dDate.getUTCMonth());
				newDate.setDate(dDate.getUTCDate());
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
			}
			
	return newDate;
	/*	if(dDate){
			var oDateFormat = sap.ca.ui.model.format.DateFormat.getDateInstance();
		      var a = oDateFormat.format(dDate,true);
		      return oDateFormat.parse(a,true);
			
		}*/
	   
    },
   
    	usersDateFormatter: function(dDate) {
    		if(dDate){
    			 var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance();
    	            return oDateFormat.format(dDate);
    		}
           
        

    },
/*	***********************************************/
	bankAccountNoFormatter: function(sBankAccountNo, sBankID) {
		return sBankAccountNo + "" + sBankID;
	},
	bankIdFormatter: function(sBankID, sName) {
		if (sName || sBankID) {
			return sName + "-" + sBankID;
		}
		return "";
	},
	cardAccountNoFormatter: function(sCardNumber, sDescription) {
		return sCardNumber + "-" + sDescription;
	},
	businessAgreementsListFormatter: function(oBusinessAgreements) {
		if (jQuery.isEmptyObject(oBusinessAgreements.getData())) {
			return;
		}
		for ( var i = 0; i < oBusinessAgreements.getData().results.length; i++) {
			if (oBusinessAgreements.getData().results[i].IncomingPaymentMethodID === sap.umc.mobile.private.app.Constants.PAYMENT_METHODS.PAYMENT_BANK) {
				oBusinessAgreements.getData().results[i].SwitchFlag = true;
				oBusinessAgreements.getData().results[i].SelectedPaymentMethodKey = oBusinessAgreements.getData().results[i].IncomingPaymentBankAccountID
						+ sap.umc.mobile.private.app.Constants.PAYMENT_METHODS.BANK;
			} else if (oBusinessAgreements.getData().results[i].IncomingPaymentMethodID === sap.umc.mobile.private.app.Constants.PAYMENT_METHODS.PAYMENT_CARD) {
				oBusinessAgreements.getData().results[i].SwitchFlag = true;
				oBusinessAgreements.getData().results[i].SelectedPaymentMethodKey = oBusinessAgreements.getData().results[i].IncomingPaymentPaymentCardID
						+ sap.umc.mobile.private.app.Constants.PAYMENT_METHODS.CARD;
			} else {
				oBusinessAgreements.getData().results[i].SwitchFlag = false;
				oBusinessAgreements.getData().results[i].SelectedPaymentMethodKey = -1;
			}
		}
		return oBusinessAgreements;
	},
	paymentMethodsListFormatter: function(oPaymentMethods) {
		if (jQuery.isEmptyObject(oPaymentMethods.getData())) {
			return;
		}
		for ( var i = 0; i < oPaymentMethods.getData().results.length; i++) {
			if (oPaymentMethods.getData().results[i].BankAccountID) {
				oPaymentMethods.getData().results[i].PaymentMethodName = oPaymentMethods.getData().results[i].BankAccountNo + "-"
						+ oPaymentMethods.getData().results[i].BankID;
				oPaymentMethods.getData().results[i].PaymentMethodKey = oPaymentMethods.getData().results[i].BankAccountID
						+ sap.umc.mobile.private.app.Constants.PAYMENT_METHODS.BANK;
			} else {
				oPaymentMethods.getData().results[i].PaymentMethodName = oPaymentMethods.getData().results[i].CardNumber + "-"
						+ oPaymentMethods.getData().results[i].PaymentCardType.Description;
				oPaymentMethods.getData().results[i].PaymentMethodKey = oPaymentMethods.getData().results[i].PaymentCardID
						+ sap.umc.mobile.private.app.Constants.PAYMENT_METHODS.CARD;
			}
			oPaymentMethods.getData().results[i].Selectable = true;
		}
		var topSelection = {
			PaymentMethodName: sap.ui.getCore().getModel("i18n").getProperty("USER_PROFILE.SELECT_ACCOUNT"),
			PaymentMethodKey: -1,
			Selectable: true
		};
		oPaymentMethods.getData().results.unshift(topSelection);
		return oPaymentMethods;
	},
	getFormattedDate: function(value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MMMM yyyy"
			});
			return oDateFormat.format(value);
		} else {
			return value;
		}
	},
	userTitleFormatter: function(sTitle, sFirstName, sLastName) {
		return sTitle + " " + sFirstName + " " + sLastName;
	},
	customerNumberFormatter: function(sAccountID) {
		return sap.ui.getCore().getModel("i18n").getProperty("USER_PROFILE.CUSTOMER_NUMBER") + " " + sAccountID;
	},

	keyFormatter: function(oMethod) {
		if (oMethod) {
			return oMethod.CommunicationMethodID;
		}
	},
	paperlessBillFormatter: function(oPreference) {
		if (oPreference) {
			if (oPreference.CommunicationMethodID === "STND") {
				return true;
			} else {
				return false;
			}
		}
	},
	oppositeValueFormatter: function(bValue) {
		return !bValue;
	},
	swapArrayPosition: function(aValues, iIndex1, iIndex2) {
		var tmp = aValues[iIndex1];
		aValues[iIndex1] = aValues[iIndex2];
		aValues[iIndex2] = tmp;
	},

	profileAddressEditButtonVisibilityFormatter: function(sCurrentTab, bEditMode) {
		var bReturnValue = false;

		if (sCurrentTab === "0" && bEditMode === false) {
			bReturnValue = true;
		}
		return bReturnValue;
	},

	profileAddressSaveButtonVisibilityFormatter: function(sCurrentTab, bEditMode, bDataModified) {
		var bReturnValue = false;

		if (sCurrentTab === "0" && bEditMode === true && bDataModified) {
			bReturnValue = true;
		}
		return bReturnValue;
	},

	profilePhonesEditButtonVisibilityFormatter: function(sCurrentTab, bEditMode) {
		var bReturnValue = false;

		if (sCurrentTab === "1" && bEditMode === false) {
			bReturnValue = true;
		}
		return bReturnValue;
	},

	profilePhonesSaveButtonVisibilityFormatter: function(sCurrentTab, bEditMode, bDataModified) {
		var bReturnValue = false;

		if (sCurrentTab === "1" && bEditMode === true && bDataModified) {
			bReturnValue = true;
		}
		return bReturnValue;
	},

	getLanguageSkeleton: function() {
		return {
			LanguageID: "",
			Name: ""
		};
	},
	getEmptyAddress: function() {
		return {
			PremiseID: "",
			AddressInfo: {
				ShortForm: "",
				HouseNo: "",
				Street: "",
				RoomNo: "",
				City: "",
				CountryID: "-1",
				Region: "-1",
				PostalCode: ""
			}
		};
	},
	getEmptyCountry: function() {
		return {
			CountryID: "-1",
			Name: ""
		};
	},
	getEmptyRegion: function() {
		return {
			RegionID: "-1",
			Name: ""
		};
	},
	getDefaultRegionArray: function() {
		return [{
			RegionID: "-1",
			Name: sap.ui.getCore().getModel("i18n").getProperty("USER_PROFILE.DEFAULT_REGION_NAME")
		}];
	}

});