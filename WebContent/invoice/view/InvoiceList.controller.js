sap.umc.mobile.private.app.view.MasterBaseController.extend("sap.umc.mobile.invoice.view.InvoiceList", {
	onInit : function() {
		sap.umc.mobile.private.app.view.MasterBaseController.prototype.onInit.call(this);
		this._handleRouting();
	},
	_handleRouting: function(){
		this.getRouter().attachRouteMatched(
				function(oEvent) {
					var sNavigationName = oEvent.getParameter("name");
					if (sNavigationName === "invoiceList") {
						this.getDataProvider().loadInvoices(this, true);
					}
					if(sNavigationName === "invoiceDetailPayment"){
						this.getDataProvider().loadInvoices(this, true);	
					}
				}, this);
	},
	showDetail: function(oInvoice){
		
		var bReplace = sap.ui.getCore().getModel("device").getProperty("/isNoPhone");
		this.getRouter().myNavTo("invoiceDetail", oInvoice, bReplace);
	},
	onInvoicesLoaded: function(oInvoices){
		this.getView().setModel(sap.umc.mobile.invoice.js.utils.invoiceFormatter(oInvoices), "Invoices");
		if (sap.ui.getCore().getModel("device").getProperty("/isNoPhone")){
			this._setDefaultItemSelection();			
		}		
	},
	_setDefaultItemSelection: function(){
		var oList = this.getView().byId("invoiceList");
		var oFirstItem = oList.getItems()[0];
		if ( oFirstItem != undefined ){
			oList.setSelectedItem(oFirstItem, true);
			var oContext = oFirstItem.getBindingContext("Invoices");
			var oSelectedInvoice = oContext.getProperty(oContext.getPath());
			this.showDetail(oSelectedInvoice);
		}
	},
	handleListItemPress : function(oEvent){
		var oContext = oEvent.getParameter("listItem").getBindingContext("Invoices");
		var oSelectedInvoice = oContext.getProperty(oContext.getPath());
		this.showDetail(oSelectedInvoice);
	}
});