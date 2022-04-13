/*global window */
jQuery.sap.declare("sap.umc.mobile.invoice.model.OfflineDataProvider");
sap.umc.mobile.invoice.model.OfflineDataProvider = {
	_readInvoices: function(oDelegate) {
		var oFakeJsonModel = new sap.ui.model.json.JSONModel();
		oFakeJsonModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice/model/mockdata/invoices.json");
		var fnCompleted = jQuery.proxy(function() {
			this.oInvoices.setData(oFakeJsonModel.getData().d);
			sap.umc.mobile.invoice.js.utils.invoiceFormatter(this.oInvoices);
			this._determinePaymentState();
			oDelegate.onInvoicesLoaded(this.oInvoices,  this._getBalanceModel());
		}, this);
		oFakeJsonModel.attachRequestCompleted(oFakeJsonModel.getData().d, fnCompleted);
	},
	_readPaymentMethods: function(fnProviderCallBack) {
		var oBankAccountsOdata = null;
		var oPaymentCardsOdata = null;
		var oFakeBankModel = new sap.ui.model.json.JSONModel();
		var oFakeCardModel = new sap.ui.model.json.JSONModel();
		oFakeBankModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice/model/mockdata/bankaccounts.json");
		var fnPaymentCardsCompleted = jQuery.proxy(function() {
			oPaymentCardsOdata = oFakeCardModel.getData().d;
			fnProviderCallBack(oBankAccountsOdata, oPaymentCardsOdata);
		}, this);
		var fnBanksCompleted = jQuery.proxy(function() {
			oBankAccountsOdata = oFakeBankModel.getData().d;
			oFakeCardModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice/model/mockdata/paymentcards.json");
			oFakeCardModel.attachRequestCompleted(oFakeCardModel.getData().d, fnPaymentCardsCompleted);
		}, this);
		oFakeBankModel.attachRequestCompleted(oFakeBankModel.getData().d, fnBanksCompleted);
	},
	getInvoicePdf: function(oInvoiceID) {
		window.open(jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice/model/mockdata/bill.pdf", '_parent', 'location=no,toolbar=yes');
	},
	_readContractAccounts: function(oDelegate) {
		var oFakeJsonModel = new sap.ui.model.json.JSONModel();
		oFakeJsonModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice/model/mockdata/contractAccounts_" + this.getAccountId() + ".json");
		var fnCompleted = jQuery.proxy(function() {
			this.oContractAccounts.setData(oFakeJsonModel.getData().d);
			oDelegate.onContractAccountsLoaded(this.oContractAccounts,  this._getBalanceModel());
		}, this);
		oFakeJsonModel.attachRequestCompleted(oFakeJsonModel.getData().d, fnCompleted);
	},

	_readBillHistory: function(oDelegate, sContractAccountId) {
		var oFakeJsonModel = new sap.ui.model.json.JSONModel();
		oFakeJsonModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice/model/mockdata/bill_history.json");
		var fnCompleted = jQuery.proxy(function(){
			this.oInvoiceHistory.setData(oFakeJsonModel.getData().d);
			oDelegate.onBillHistoryLoaded(this.oInvoiceHistory);
		}, this);
		oFakeJsonModel.attachRequestCompleted(oFakeJsonModel.getData().d, fnCompleted);
	},
	_readPaymentHistory: function(oDelegate) {
		var oFakeJsonModel = new sap.ui.model.json.JSONModel();
		oFakeJsonModel.loadData(jQuery.sap.getModulePath("sap.umc.mobile") + "/invoice/model/mockdata/payment_history.json");
		var fnCompleted = jQuery.proxy(function() {
			var payments = this._sortPaymentHistory(oFakeJsonModel.getData().d.results);			
			this.oInProcessPayments.setSizeLimit(payments.InProcess.results && payments.InProcess.results.length);
			this.oInProcessPayments.setData(payments.InProcess);
			this.oProcessedPayments.setSizeLimit(payments.Processed.results && payments.Processed.results.length);
			this.oProcessedPayments.setData(payments.Processed);			
			for ( var i = 0; i < this.oInProcessPayments.getData().results.length; i++) {
				var sExecutionDate = this.oInProcessPayments.getData().results[i].ExecutionDate;		
				sExecutionDate = sExecutionDate.slice(sExecutionDate.indexOf("(") + 1, sExecutionDate.indexOf(")") + 1);		
				this.oInProcessPayments.getData().results[i].ExecutionDate  = new Date(parseInt(sExecutionDate, 10));
			}				
			for ( var i = 0; i < this.oProcessedPayments.getData().results.length; i++) {
				var sExecutionDate = this.oProcessedPayments.getData().results[i].ExecutionDate;		
				sExecutionDate = sExecutionDate.slice(sExecutionDate.indexOf("(") + 1, sExecutionDate.indexOf(")") + 1);		
				this.oProcessedPayments.getData().results[i].ExecutionDate  = new Date(parseInt(sExecutionDate, 10));
			}	
			oDelegate.onPaymentHistoryLoaded(this.oInProcessPayments, this.oProcessedPayments);
		}, this);
		oFakeJsonModel.attachRequestCompleted(oFakeJsonModel.getData().d, fnCompleted);
	},

	_createPaymentByCard: function() {
		//Not supported in offline mode
		sap.umc.mobile.private.app.js.utils.displayOfflineDisabledDialog();
	},

	_createPaymentByBank: function() {
		//Not supported in offline mode
		sap.umc.mobile.private.app.js.utils.displayOfflineDisabledDialog();
	},

	_createBalancePaymentByBank: function() {
		//Not supported in offline mode
		sap.umc.mobile.private.app.js.utils.displayOfflineDisabledDialog();
	},

	_createBalancePaymentByCard: function() {
		//Not supported in offline mode
		sap.umc.mobile.private.app.js.utils.displayOfflineDisabledDialog();
	},

	_removePaymentDocument: function() {
		//Not supported in offline mode
		sap.umc.mobile.private.app.js.utils.displayOfflineDisabledDialog();
	}
};