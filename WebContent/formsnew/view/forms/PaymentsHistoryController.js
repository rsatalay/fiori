/*global window */
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.PaymentsHistoryController");

sap.umc.mobile.forms.view.forms.PaymentsHistoryController = {
	setView: function(oView) {
		this._oView = oView;
	},
	getView: function() {
		return this._oView;
	},
	getDataProvider: function() {
		return sap.umc.mobile.forms.model.DataProvider;
	},
	
	onPaymentHistoryLoaded: function(oInProcessPayments, oProcessedPayments){		
		this.getView().setModel(oInProcessPayments, "InProcessPayments");
		this.getView().setModel(oProcessedPayments, "ProcessedPayments");
		//c5221606 setting paymentHistoryVisible model depending on the length of the results of the model
	 
		if(this.getView().getModel("InProcessPayments").iSizeLimit>0){
			this.getView().getModel("PaymentHistoryVisible").setProperty("/InProcess",true);
		}
		else{
			this.getView().getModel("PaymentHistoryVisible").setProperty("/InProcess",false);
		}
		if(this.getView().getModel("ProcessedPayments").iSizeLimit>0){
			this.getView().getModel("PaymentHistoryVisible").setProperty("/Processed",true);
		}
		else{
			this.getView().getModel("PaymentHistoryVisible").setProperty("/Processed",false);
		}
		//c5221606 to check if the size of both the models exist, if yes then only the fragment of the payment history will be added
		//to the icon tab bar below the pay bills block
		//when all the payment history is loaded n ProcessedPayments, InProcessPayments models are set
		 this.getView().getController().oDeferredPaymentHistoryLoaded.resolve();
		this._updatePaymentAmount();
	},
	//c5221606
	_updatePaymentAmount: function(){
		this.getView().getController().updatePaymentAmount();
	},
	
	setCancelPaymentVisible: function(visible){
		this.getView().getModel("PaymentHistorySetting").setProperty("/CancelPaymentVisible", visible);
	},
	
	/////////////////////////
	showDetail: function(oInvoice){
		var bReplace = sap.ui.getCore().getModel("device").getProperty("/isNoPhone");
		this.getRouter().myNavTo("invoiceDetail", oInvoice, bReplace);
	},
	
	handleListItemPress : function(oEvent){
		var oContext = oEvent.getParameter("listItem").getBindingContext("InProcessPayments");
		var oSelectedPayment = oContext.getProperty(oContext.getPath());
		this.getView().getModel("PaymentHistorySetting").setProperty("/SelectedPayment", oSelectedPayment);
		this._setCancelPaymentVisible(true);
	},
	handleCancelPayment: function(oEvent){
		var obj = {
				title: sap.ui.getCore().getModel("i18n").getProperty("INVOICE.CONFIRMATION"),
				actions: [sap.ui.getCore().getModel("i18n").getProperty("APP.OK"), sap.ui.getCore().getModel("i18n").getProperty("APP.CANCEL")],
				onClose: $.proxy(function(oAction) { 
					if(oAction==="OK"){	      
						this.getDataProvider().cancelPayment(this, this.getView().getModel("PaymentHistorySetting").getProperty("/SelectedPayment"));
					}
				}, this)
		};
		sap.m.MessageBox.show(sap.ui.getCore().getModel("i18n").getProperty("INVOICE.CANCEL_PAYMENT_CONFIRM"), obj);	

	},
	_initSetting: function(){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setProperty("/CancelPaymentVisible", false);
		this.getView().setModel(oModel, "PaymentHistorySetting");		
	},
	_isCancelPaymentVisible: function(){
		return this.getView().getModel("PaymentHistorySetting").getProperty("/CancelPaymentVisible");
	},
	_setCancelPaymentVisible: function(visible){
		this.getView().getModel("PaymentHistorySetting").setProperty("/CancelPaymentVisible", visible);
	},
	_cancelPayment: function(paymentDocumentID){
		this.getDataProvider().CancelPayment(this, paymentDocumentID);
	},
	onCancelPaymentSuccess: function() {
		this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, sap.ui.getCore().getModel("i18n").getProperty("INVOICE.CANCEL_PAYMENT_SUCCESS"));		 
		this.getDataProvider().loadInvoices(null, true);
		this.getDataProvider().loadPaymentHistory(this);
		this._setCancelPaymentVisible(false);
	}
};