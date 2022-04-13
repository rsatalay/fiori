
sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.invoice.view.PaymentHistory", {
  onInit : function() {
    sap.umc.mobile.private.app.view.MasterBaseController.prototype.onInit.call(this);
    this._initSetting();
    this._handleRouting();
  },
  _handleRouting: function(){
    this.getRouter().attachRouteMatched(
      function(oEvent) {
        var sNavigationName = oEvent.getParameter("name");
        if (sNavigationName === "paymentHistory") {
          this.getDataProvider().loadPaymentHistory(this);
          this._setCancelPaymentVisible(false);
        }
      }, this);
  },
  showDetail: function(oInvoice){
    var bReplace = sap.ui.getCore().getModel("device").getProperty("/isNoPhone");
    this.getRouter().myNavTo("invoiceDetail", oInvoice, bReplace);
  },
  onPaymentHistoryLoaded: function(oInProcessPayments, oProcessedPayments){
    this.getView().setModel(oInProcessPayments, "InProcessPayments");
    this.getView().setModel(oProcessedPayments, "ProcessedPayments");
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


  handleViewSettingsDialogButtonPressedInProcess : function(oEvent) {
        if (!this._oDialogInProcess) {
            this._oDialogInProcess = sap.ui.xmlfragment(
                    "sap.umc.mobile.invoice.view.FilterDialogInProcess", this);
        }
        // toggle compact style
        jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(),
                this._oDialogInProcess);
        this._oDialogInProcess.open();

        //done
    },


    handleViewSettingsDialogButtonPressedPaymentProcessed : function(oEvent) {
        if (!this._oDialogProcessed) {
            this._oDialogProcessed = sap.ui.xmlfragment(
                    "sap.umc.mobile.invoice.view.FilterDialogProcessed", this);
        }
        // toggle compact style
        jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(),
                this._oDialogProcessed);
        this._oDialogProcessed.open();
        //done
    },


    handleConfirmInProcess : function(oEvent) {

        var oView = this.getView();
        var oTable = oView.byId("listInProcessPayments");

        var mParams = oEvent.getParameters();
        var oBinding = oTable.getBinding("items");
        var aSorters = [];
        var sPath = mParams.sortItem.getKey();
        var bDescending = mParams.sortDescending;
        aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
        oBinding.sort(aSorters);


    },

    handleConfirmProcessed : function(oEvent) {

        var oView = this.getView();
        var oTable = oView.byId("listProcessedPayments");

        var mParams = oEvent.getParameters();
        var oBinding = oTable.getBinding("items");

        // apply sorter to binding
        // (grouping comes before sorting)
        var aSorters = [];

        var sPath = mParams.sortItem.getKey();
        var bDescending = mParams.sortDescending;
        aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
        oBinding.sort(aSorters);

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
});