/*global window */
jQuery.sap.declare("sap.umc.mobile.invoice.view.PaymentsController");

sap.umc.mobile.invoice.view.PaymentsController = {
	setView: function(oView) {
		this._oView = oView;
	},
	getView: function() {
		return this._oView;
	},
	getDataProvider: function() {
		return sap.umc.mobile.invoice.model.DataProvider;
	},
	read: function(oParameters) {
		this.getDataProvider().loadPaymentMethods(this, oParameters);
	},
	onPaymentMethodsLoaded: function(oExistingAccounts, sPaymentID) {
		this.getView().setModel(oExistingAccounts, "existingAccounts");
		if(this._paymentComboBox && sPaymentID){
			this.getView().getModel("existingAccounts").setProperty("/selectedKey", sPaymentID);
			this._paymentComboBox.setSelectedKey(sPaymentID);
		}
		else if(this._paymentComboBox){
			// -3 is the default selection "Select a payment method" key
			this.getView().getModel("existingAccounts").setProperty("/selectedKey", "-3");
			this._paymentComboBox.setSelectedKey("-3");
		}				
	},
	isDirty: function() {
		var oExistingAccounts = this.getView().getModel("existingAccounts");
		var sAmount = oExistingAccounts.getProperty("/amount");
		var sDefaultAmount = oExistingAccounts.getProperty("/_defaultAmount");
		var sPaymentMethodKey = oExistingAccounts.getProperty("/selectedKey");
		var sCVC = oExistingAccounts.getProperty("/cvc");
		var dOrginal = sap.umc.mobile.private.app.js.utils.formatDate(oExistingAccounts.getProperty("/date"));
		var dCurrent = sap.umc.mobile.private.app.js.utils.formatDate(oExistingAccounts.getProperty("/_defaultDate"));

		if ((sAmount != sDefaultAmount) || sPaymentMethodKey || sCVC || (dOrginal != dCurrent)) {
			return true;
		} else {
			return false;
		}
	},
	_isValidPayment: function() {
		var oExistingAccounts = this.getView().getModel("existingAccounts");
		var sAmount = sap.umc.mobile.private.app.js.formatters.parseFormattedAmount(oExistingAccounts.getProperty("/amount")).toString();
		var sAmountNumber = Number(sAmount);
		var sTotalNumber = Number(this.getView().getModel("invoice").getProperty("/AmountDue"));
		var sPaymentMethodKey = oExistingAccounts.getProperty("/selectedKey");
		var sCVC = oExistingAccounts.getProperty("/cvc");
		var dPaymentDate = oExistingAccounts.getProperty("/date");


		//sPaymentMethodKey = -3 is the default selection "Select a payment method" key
		if (!sPaymentMethodKey || sPaymentMethodKey === "-3") {
			sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
			"INVOICE.METHOD_MISSING"));
			return false;
		} else if (!sAmount) {
			sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
			"INVOICE.AMOUNT_MISSING"));
			return false;
		} else if (!sCVC && sPaymentMethodKey.indexOf("card") != -1) {
			sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
			"INVOICE.CVC_MISSING"));
			return false;
		} else if (isNaN(sAmount)){
			sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
			"VALOR.NONUMBER"));
			return false;
		} else if (sAmount.search(".") == -1){
			sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
			"VALOR.NONUMBER"));
			return false;
		}
		
		else if (!dPaymentDate) {
			sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
			"INVOICE.DATE_MISSING"));
			return false;
		}else if (sAmountNumber  > sTotalNumber){ // Verificar valor no mayor  a la deuda ACASTANEDA  8/5/19
			sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.ui.getCore().getModel("i18n").getProperty(
			"VALOR.ALTO"));
			return false;
		} else {
			return true;
		}
	},
	onSubmitOneTimePayment: function() {
		var oExistingAccounts = this.getView().getModel("existingAccounts");
		var sPaymentMethodKey = oExistingAccounts.getProperty("/selectedKey");
		var oSelectedAccount = this._getSelectedPaymentMethod(oExistingAccounts.getProperty("/"), sPaymentMethodKey);
		var sInvoiceID = this.getView().getModel("invoice").getProperty("/InvoiceID");
		var sAmount = sap.umc.mobile.private.app.js.formatters.parseFormattedAmount(oExistingAccounts.getProperty("/amount")).toString();
		var sCVC = oExistingAccounts.getProperty("/cvc");
		var dPaymentDate = oExistingAccounts.getProperty("/date");
		if (this._isValidPayment()) {
			/*dPaymentDate.setHours(0);
			dPaymentDate.setMinutes(0);
			dPaymentDate.setSeconds(0);*/
			  
			var sFormattedDate = "";
			sFormattedDate += dPaymentDate.getFullYear().toString()+"-";
		if((dPaymentDate.getMonth()+1)<10){
			sFormattedDate += "0"+(dPaymentDate.getMonth()+1).toString()+"-";
		}
		else
			{
			sFormattedDate += (dPaymentDate.getMonth()+1).toString()+"-";
			}
		if((dPaymentDate.getDate())<10){
			sFormattedDate += "0"+dPaymentDate.getDate().toString();
		}
		else
			{
			sFormattedDate += dPaymentDate.getDate().toString();
			}
		
		sFormattedDate = sFormattedDate+"T"+"00:00:00";
dPaymentDate = sFormattedDate;
		//var dNewDate = new Date(Date.UTC(dPaymentDate.getFullYear(), dPaymentDate.getMonth(), dPaymentDate.getDate(), 0, 0, 0));
		//dPaymentDate = dNewDate;
			//commented to fix utc , ask alb
			//dPaymentDate.setHours(22);
			if (sPaymentMethodKey.indexOf("card") != -1) {
				this.getDataProvider().createOneTimePaymentByCard(sCVC, dPaymentDate, oSelectedAccount.PaymentCardID, sAmount, sInvoiceID,
						jQuery.proxy(this._onPaymentSuccess, this));
			}
			if (sPaymentMethodKey.indexOf("bank") != -1) {
				this.getDataProvider().createOneTimePaymentByBank(dPaymentDate, oSelectedAccount.BankAccountID, sAmount, sInvoiceID,
						jQuery.proxy(this._onPaymentSuccess, this));
			}
			if (sPaymentMethodKey == -4) {  // Si se selecciona pago PSE ACASTANEDA 
				
				
		    	that = this
		    	// this is required since there is no direct access to the box's icons like MessageBox.Icon.WARNING
		    	jQuery.sap.require("sap.ui.commons.MessageBox");

		    	// open a fully configured message box
		    	sap.ui.commons.MessageBox.show(sap.ui.getCore().getModel("i18n").getProperty("INVOICE.SEGUROPAGO")+ sAmount + "?",
		    			sap.ui.commons.MessageBox.Icon.WARNING,
		    			"Realizar pago PSE",
		    			[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
		    			jQuery.proxy(that.llamarPSE, that),
		    			sap.ui.commons.MessageBox.Action.YES);
		    	


			}
		}
	},
	llamarPSE: function(that){
		if (that == "YES")
		{
		var f = this.getView().getModel("invoice").getProperty("/DueDate");
		//var ano = f.getFullYear() ;
		var anoStr = new String(f.getFullYear());
		//var mes = (f.getMonth() +1) ; 
		var mesStr = new String((f.getMonth() +1));
		//var dia = f.getDate();
		var diaStr = new String(f.getDate());
		if (diaStr.length == 1){
			diaStr = "0"+ diaStr;
		}
		if (mesStr.length == 1){
			mesStr = "0"+ mesStr;
		}
		
		var FechaVencimiento = anoStr+mesStr+diaStr;
		var oExistingAccounts = this.getView().getModel("existingAccounts");
		var InvId = this.getView().getModel("invoice").getProperty("/InvoiceID");
		var VKont = this.getView().getModel("invoice").getProperty("/ContractAccountID");
		var Amount = sap.umc.mobile.private.app.js.formatters.parseFormattedAmount(oExistingAccounts.getProperty("/amount")).toString();
		var BP = this.getView().getModel("invoice").getProperty("/AccountID");
		
		// Llamado al Odata de Creacion de ID transaccion PSE
		var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
		this.getView().setModel(omodel,"ZODATA_MCF_SRV");  // Van una sola vez en la aplicacion 
		var oModelFactura = new sap.ui.model.json.JSONModel({
			results: []
			});
		this.getView().setModel(oModelFactura, "IDPse");
		this.getView().getModel("ZODATA_MCF_SRV").read("/PagosPSESet",{
			filters: [new sap.ui.model.Filter({
			      path: "Invid",
			      operator: sap.ui.model.FilterOperator.EQ,
			      value1: InvId
			     }), new sap.ui.model.Filter({
				      path: "Fvencimiento",
				      operator: sap.ui.model.FilterOperator.EQ,
				      value1: FechaVencimiento
				     }), new sap.ui.model.Filter({
					      path: "Partialpayamount",
					      operator: sap.ui.model.FilterOperator.EQ,
					      value1: Amount
					     }), new sap.ui.model.Filter({
						      path: "Metodopago",
						      operator: sap.ui.model.FilterOperator.EQ,
						      value1: '01'
						     }),new sap.ui.model.Filter({
							      path: "Partnerkey",
							      operator: sap.ui.model.FilterOperator.EQ,
							      value1: BP
							     })],
							     async:false,
			success:function(odata){
				this.getView().getModel("IDPse").setProperty("/results",odata.results);
				var dialog = new sap.m.Dialog({
					title: 'Proceso Exitoso',
					type: 'Message',
						content: new sap.m.Text({
							text: sap.ui.getCore().getModel("i18n").getProperty("INVOICE.REDIRECTPSE")
						}),
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							console.log("LLamar a PSE");
							sap.m.URLHelper.redirect("https://www.pse.com.co/inicio", false);
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
			}.bind(this),  
			error:function(odata){
				var error = JSON.parse(odata.responseText);
				var textShow = error.error.message.value;
				var dialog = new sap.m.Dialog({
					title: 'Error',
					type: 'Message',
					state: 'Error',
					content: new sap.m.Text({
						text: textShow
					}),
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							dialog.close();
							dialog.destroy();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
				
			}
		});
	}
	},
	onSubmitBalancePayment: function() {
		var oExistingAccounts = this.getView().getModel("existingAccounts");
		var sPaymentMethodKey = oExistingAccounts.getProperty("/selectedKey");
		var sCurrency = oExistingAccounts.getProperty("/_currency");
		var oSelectedAccount = this._getSelectedPaymentMethod(oExistingAccounts.getProperty("/"), sPaymentMethodKey);
		var sAmount = sap.umc.mobile.private.app.js.formatters.parseFormattedAmount(oExistingAccounts.getProperty("/amount")).toString();
		oExistingAccounts.getProperty("/amount").disabled = true;
		var sCVC = oExistingAccounts.getProperty("/cvc");
		var dPaymentDate = oExistingAccounts.getProperty("/date");
		if (this._isValidPayment()) {
			dPaymentDate.setHours(22);
			if (sPaymentMethodKey.indexOf("card") != -1) {
				this.getDataProvider().createBalancePaymentByCard(sCVC, dPaymentDate, oSelectedAccount.PaymentCardID, sAmount, sCurrency,
						jQuery.proxy(this._onPaymentSuccess, this));
			}
			if (sPaymentMethodKey.indexOf("bank") != -1) {
				this.getDataProvider().createBalancePaymentByBank(dPaymentDate, oSelectedAccount.BankAccountID, sAmount, sCurrency,
						jQuery.proxy(this._onPaymentSuccess, this));
			}
		}
	},
	_getSelectedPaymentMethod: function(oExistingAccounts, sKey) {
		for ( var i = 0; i < oExistingAccounts.length; i++) {
			if (oExistingAccounts[i].id === sKey) {
				return oExistingAccounts[i];
			}
		}
	},
	_onPaymentSuccess: function() {
		sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, sap.ui.getCore().getModel("i18n").getProperty(
		"INVOICE.PAYMENT_SUCCESS"));

		//Calls function in either InvoiceDetail or Balance controller
		this.getView().getController().onPaymentSuccess();
	},
	onPaymentMethodChange: function(oEvent) {
		if(!this._paymentComboBox){
			this._paymentComboBox = oEvent.getSource();
		}
		var sSelectedKey = oEvent.getSource().getSelectedKey();
		if (sSelectedKey === "-1") {
			// To New Bank account Page
			sap.ui.getCore().getComponent("AppComponent").getComponentFactory().getUserProfile().getRouter().myNavTo("bankDetail", {
				BankAccountID: "-1"
			}, false);
		} else if (sSelectedKey === "-2") {
			// To New credit card page
			sap.ui.getCore().getComponent("AppComponent").getComponentFactory().getUserProfile().getRouter().myNavTo("cardDetail", {
				PaymentCardID: "-1"
			}, false);
		} else {
			var oCurrentModel = this.getView().getModel("existingAccounts");
			this.getView().setModel(this.getDataProvider().updatePaymentMethodId(oCurrentModel, sSelectedKey), "existingAccounts");
		}
	},
	onCvcLiveChange: function(oEvent) {
		var oModel = this.getView().getModel("existingAccounts");
		var sCVC = oModel.getProperty("/cvc");
		var sNewCVC = sCVC.replace(/\D/g, '');
		this.getView().setModel(this.getDataProvider().updatecvc(oModel, sNewCVC), "existingAccounts");
	}
};