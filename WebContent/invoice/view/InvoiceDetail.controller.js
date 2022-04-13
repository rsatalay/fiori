/*global window */
jQuery.sap.require("sap.umc.mobile.invoice.view.PaymentsController");
sap.umc.mobile.private.app.view.DetailBaseController.extend("sap.umc.mobile.invoice.view.InvoiceDetail", {
	
  onInit: function() {
    sap.umc.mobile.private.app.view.DetailBaseController.prototype.onInit.call(this);
    this._handleRouting();
  },
  _handleRouting: function() {
    this.getRouter().attachRouteMatched(function(oEvent) {
      var sNavigationName = oEvent.getParameter("name");
      if (sNavigationName === "invoiceDetail") {
        var sInvoiceId = oEvent.getParameter("arguments").InvoiceID;

        this._setInvoiceModel(sInvoiceId);
//commented as chart has been removed
        /*var oImgModelData = {
            chartImg1: jQuery.sap.getModulePath("sap.umc.mobile.private") + "/invoice/img/sapUiChart1.png",
            chartImg2: jQuery.sap.getModulePath("sap.umc.mobile.private") + "/invoice/img/sapUiChart2.png",
            chartImg3: jQuery.sap.getModulePath("sap.umc.mobile.private") + "/invoice/img/sapUiChart3.png",
            imgWidth: "100%"
        };

        var oImgModel = new sap.ui.model.json.JSONModel(oImgModelData);
        this.getView().setModel(oImgModel, "ChartImages");*/


        var sStatusID = parseInt(this.getView().getModel("invoice").getProperty("/InvoiceStatusID"), 10);
        
        var omodel =  this.getView().getModel("invoice");
      //  console.log("r1");
      //  console.log(sStatusID);
      //  console.log(omodel);
        
        this._removeContentView();
        if (sStatusID != sap.umc.mobile.private.app.Constants.PAYMENT_STATUS.OPEN) {
          this.getPayButton().setVisible(false);
        } else {
          if (this.getView().getModel("invoice").getProperty("/ContractAccountID").substring(0,2) == 'XX'){ //'53' ICA .. 
          this.getPayButton().setVisible(true); // Se habilita el BotOn Pagar factura PSE para el ICA
          }else{
          this.getPayButton().setVisible(false); // ACASTANEDA Se ESCONDE BOTON PARA OTRAS RENTAS 
          }
        }
        this.getPaySubmitButton().setVisible(false);
        //commented as chart has been removed
      /*  this.getBillHistoryGraph().setVisible(true);
        this.getTrendLabel().setVisible(true);*/
        this._loadBillHistory();
        //commented as chart has been removed
    /*    this._setVizProperties();*/
        if (this._paymentsFragment) {
          this._getPaymentMethodsComboBox().setValue("");
        }
      }
      if (sNavigationName === "invoiceDetailPayment") {
        this._removeContentView();
        var sInvoiceId = oEvent.getParameter("arguments").InvoiceID;
        var sPaymentID = oEvent.getParameter("arguments").PaymentID;
        this._setInvoiceModel(sInvoiceId);

        this.getPayButton().setVisible(false);
        this.getPaySubmitButton().setVisible(true);
        //commented as chart has been removed
        /*this.getBillHistoryGraph().setVisible(false);
        this.getTrendLabel().setVisible(false); */
        if (this._paymentsFragment) {
          this._addContentView(this._paymentsFragment);
          if(sPaymentID){
            this._getPaymentMethodsComboBox().setSelectedKey(sPaymentID);
          }else{
            this._getPaymentMethodsComboBox().setValue("");
          }
        }
        var oParameters = {};
        oParameters.Amount = this.getView().getModel("invoice").getProperty("/AmountRemaining");
        var sCurrency = this.getView().getModel("invoice").getProperty("/Currency");
        oParameters.Amount = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(oParameters.Amount, sCurrency);
        oParameters.EnablePaymentAmount = true;
        oParameters.PaymentID = sPaymentID;
        this._hidecvcOnload();
        this.oPaymentsController.read(oParameters);
        this._addContentView(this._paymentsFragment);
      }

    }, this);
  },
  _setVizProperties: function(){
    var oVizFrame = this.getView().byId("vizFrame");
    oVizFrame.setVizProperties( {
      valueAxis: {
        title: {
          text : this.getView().getModel("invoice").getProperty("/CostCurrency")
        }
      },
      plotArea : {
          dataLabel : {visible : true},
          referenceLine: {
            line: {
              valueAxis: [{
                value: this.getView().getModel("bill2").getData().results[0].average
                }]}}}
      });
  },
  isDirty: function(){
    sap.ui.getCore().getEventBus().subscribe("navigation_confirmation", "ok", jQuery.proxy(function(sChannelId, sEventId, oData){
      if(oData.sViewGUID !== this._GUID){
        return false;
      }
      this._removeContentView();
      this.getPayButton().setVisible(false);  // ACASTANEDA Se cambia para ESCONDER BOTON  Pagar Factura
      this.getPaySubmitButton().setVisible(false);
    }, this));
    if(!this.oPaymentsController){
      return false;
    }
    var bIsDirty = this.oPaymentsController.isDirty();
    return (bIsDirty && this.getPaySubmitButton().getVisible());
  },
  _loadBillHistory: function() {
    var oInvoiceHistory = new sap.ui.model.json.JSONModel();
    oInvoiceHistory.setData(this.getApp().getUtils().copyObject(this.getDataProvider().oInvoices.getData()));
    oInvoiceHistory.setData({
      results: this._getMonthlyTotalAmount(oInvoiceHistory)
    });
    var oFormattedInvoiceHistory = sap.umc.mobile.invoice.js.utils.invoiceBillHistoryFormatter(oInvoiceHistory);
    this.getView().setModel(oFormattedInvoiceHistory.Invoices, "bill");
    var sMonthlyAverage = "  ---  " + this.getText("INVOICE.MONTHLY_AVERAGE") + " : " + this.getView().getModel('invoice').getData().Currency + " "
    + sap.umc.mobile.base.js.formatters.amountFormatter(oFormattedInvoiceHistory.Average);
    this.getView().getModel("invoice").setProperty("/Average", sMonthlyAverage);
    var oAverage = sap.umc.mobile.invoice.js.utils
    .invoiceBillHistoryFormatter2(oFormattedInvoiceHistory.Invoices, oFormattedInvoiceHistory.Average);
    this.getView().setModel(oAverage, "bill2");

  },
  _getMonthlyTotalAmount: function(oInvoiceHistory) {
    var afilteredInvoices = [];
    var dDateFrom = new Date(this.getView().getModel("invoice").getData().InvoiceDate);
    dDateFrom.setMonth(dDateFrom.getMonth() - 6);
    //var sDateFrom = dDateFrom.toString();
    var iDateTo = Date.parse(this.getView().getModel("invoice").getData().InvoiceDate);
    var iDate = Date.parse(dDateFrom);
    for ( var i = 0; i < oInvoiceHistory.getData().results.length; i++) {
      var iInvoiceDate = Date.parse(oInvoiceHistory.getData().results[i].InvoiceDate);
      if (iDate < iInvoiceDate && iInvoiceDate <= iDateTo
          && oInvoiceHistory.getData().results[i].ContractAccountID === this.getView().getModel("invoice").getData().ContractAccountID) {
        if (afilteredInvoices.length === 0) {
          afilteredInvoices.push(oInvoiceHistory.getData().results[i]);
        } else if (afilteredInvoices[afilteredInvoices.length - 1].FormatteInvoiceDate === oInvoiceHistory.getData().results[i].FormatteInvoiceDate) {
          oInvoiceHistory.getData().results[i].AmountDue = parseFloat(oInvoiceHistory.getData().results[i].AmountDue)
          + parseFloat(afilteredInvoices[afilteredInvoices.length - 1].AmountDue);
          //  Fix decimals issue
          oInvoiceHistory.getData().results[i].AmountDue = parseFloat(parseFloat(oInvoiceHistory.getData().results[i].AmountDue).toFixed(2));
          afilteredInvoices.pop();
          afilteredInvoices.push(oInvoiceHistory.getData().results[i]);
        } else {
          afilteredInvoices.push(oInvoiceHistory.getData().results[i]);
        }

      }
    }
    if(afilteredInvoices.length > 6){
      afilteredInvoices.pop();
    }
    return afilteredInvoices.reverse();
  },
  _getPaymentMethodsComboBox: function() {
    var aControls = this._paymentsFragment.findAggregatedObjects();
    return aControls[4];
  },
  _hidecvcOnload: function() {
    var aControls = this._paymentsFragment.findAggregatedObjects();
    var oCvcLabel = aControls[5];
    var oCvcInput = aControls[6];
    oCvcLabel.setVisible(false);
    oCvcInput.setVisible(false);
  },
  getPayButton: function() {
    return this.getView().byId("PayBill");
  },
  getPaySubmitButton: function() {
    return this.getView().byId("SubmitPay");
  },
  getBillHistoryGraph: function() {
    return this.getView().byId("Graph");
  },
  getTrendLabel: function(){
    return this.getView().byId("TrendLabel");
  },
  /*
  handleOpen: function(oEvent) {
    if (!this._invoiceActionSheet) {
      this._invoiceActionSheet = sap.ui.xmlfragment("sap.umc.mobile.invoice.view.ActionSheet", this);
      this.getView().addDependent(this._invoiceActionSheet);
    }
    var oButton = oEvent.getSource();
    jQuery.sap.delayedCall(0, this, function() {
      this._invoiceActionSheet.openBy(oButton);
    });
  },
  handleBillInquiryButton: function(oEvent) {
    var oMessageCenter = this.getApp().getComponentFactory().getMessageCenter();
    var bReplace = sap.ui.getCore().getModel("device").getProperty("/isNoPhone");
    oMessageCenter.getRouter().myNavTo("messageDetail", {
      ID: "-1",
      Type: sap.umc.mobile.private.app.Constants.MESSAGE_TYPE.INTERACTION_RECORD
    }, bReplace);
  },
    */
  
  verificarVigencia: function(oEvent){				
	  var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");

	  
	this.getView().setModel(omodel,"ZODATA_MCF_SRV"); 
	var oModelVencimiento = new sap.ui.model.json.JSONModel({
		results: []
		});
	
	  //Cargar el nombre del botOn que realiza el llamado IMPRIMIR PDF o PAGAR FACTURA
	  var a = oEvent.mParameters.id;
	  this.getView().setModel(oModelVencimiento, "Boton");
	  this.getView().getModel("Boton").setProperty("/Name",a);
	  
	this.getView().setModel(oModelVencimiento, "Vencimiento");
	var InvId = this.getView().getModel("invoice").getProperty("/InvoiceID");
	this.getView().getModel("ZODATA_MCF_SRV").read("/VencimientoRentasVariasSet",{
		filters: [new sap.ui.model.Filter({
		      path: "Invid",
		      operator: sap.ui.model.FilterOperator.EQ,
		      value1: InvId
		     })],
				 async:false,
		success:function(odata){
			this.getView().getModel("Vencimiento").setProperty("/results",odata.results);
			
			if ( odata.results[0] == undefined ){
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.error(
						sap.ui.getCore().getModel("i18n").getProperty("INVOICE.NOREADFVENC"),
						{
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);		
				
				
			}else{
				if (odata.results[0].Vigente == true)
					{
					 if (this.getView().getModel("Boton").getProperty("/Name").slice(-9) == "PDFbutton")
						 {
					 this.VerPDF();
						 }
					 else {
						 this.EnviarPago();
					 }
					}
				else{
					
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					sap.m.MessageBox.error(
							"Su factura se encuentra caducada, por lo tanto no puede realizarse el pago seleccionado",
							{
								styleClass: bCompact ? "sapUiSizeCompact" : ""
							}
						);							
				}
		
			}

		}.bind(this),  
		error:function(odata){
			
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.ui.commons.MessageBox.error(
					sap.ui.getCore().getModel("i18n").getProperty("INVOICE.NOREADFVENC"),
					{
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);

		}
	});
	
  },
  handleViewPDFButton: function(oEvent) {
	  
	  
	    //BotOn para recalcular factura 
	    // Se verifica si la fecha de vencimiento de la factura es mayor a la fecha del dia.
	    // En caso de ser asi se muestra un pop up, preguntando si quiere recalcular los intereses
	    // Para respuesta afirmativa se llama un Odata para recalculo de factura ACASTANEDA
	   if (this.getView().getModel("invoice").oData.InvoiceStatusID == "1") // Pendiente de pago
		   
	    {  
		   
		   var renta = this.getView().getModel("invoice").getProperty("/ContractAccountID").substring(0,2);
		   if (  renta == "60" || renta == "59" || renta == "61"  ) // Para espectaculos publicos se verifica que la factura no presente vencimiento de los dos meses.
			   {

			    this.verificarVigencia(oEvent);

			   }
		   
		   else{
			   this.VerPDF();
		   }

	    }else{
	  	  console.log(this.getView().getModel("invoice").getProperty("/InvoiceID"));
	      this.getDataProvider().getInvoicePdf(this.getView().getModel("invoice").getProperty("/InvoiceID"));  	
	    }
  },
  
  
  VerPDF: function(){
	   var f_dia = new Date();  // Fecha del dia
	   f_dia.setHours(0,0,0,0);
	    var f_vencimiento = this.getView().getModel("invoice").getProperty("/DueDate");
	    f_vencimiento.setDate(f_vencimiento.getDate() +1);
	    f_vencimiento.setHours(0,0,0,0);
	    if (f_dia>f_vencimiento){
	    	f_vencimiento.setDate(f_vencimiento.getDate() - 1);
	    	that = this
	    	// this is required since there is no direct access to the box's icons like MessageBox.Icon.WARNING
	    	jQuery.sap.require("sap.ui.commons.MessageBox");

	    	// open a fully configured message box
	    	sap.ui.commons.MessageBox.show(sap.ui.getCore().getModel("i18n").getProperty("INVOICE.RECOFIPAGOVEN"),
	    			sap.ui.commons.MessageBox.Icon.WARNING,
	    			"Recibo Oficial de Pago Vencido",
	    			[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
	    			jQuery.proxy(that.odata, that),
	    			sap.ui.commons.MessageBox.Action.YES);
	 	    	
	    }else{
	    	f_vencimiento.setDate(f_vencimiento.getDate() - 1);
	    	// Se crea POPUP para confirmar el valor de la factura que se desea imprimir SOLO PARA ICA.
	    		var valorTotal = Number(this.getView().getModel("invoice").getProperty("/AmountRemaining"));
	    		var VKont = this.getView().getModel("invoice").getProperty("/ContractAccountID");
	    		var textoPopUp = 'Favor digitar el valor por el cual desea realizar su documento de cobro. El valor total es: ' + valorTotal; 
	    		if (VKont.substring(0,2) == '53' || VKont.substring(0,2) == '59' || VKont.substring(0,2) == '60' || VKont.substring(0,2) == '61'){
	    		that = this;
	    		//jQuery.sap.require("sap.m.Dialog");
				var dialog = new sap.m.Dialog({
					title: 'Valor a imprimir en documento de cobro',
					type: 'Message',
					content: [
						new sap.m.Label({ text: textoPopUp, labelFor: 'submitDialogTextarea'}),
						new sap.m.Input('submitDialogTextarea', {
							liveChange: function(oEvent) {
								var sText = oEvent.getParameter('value');
								var parent = oEvent.getSource().getParent();
								var desicion = false;
								
								if (sText == "" || sText == "0" || sText > valorTotal || sText.includes(".") || sText.includes(",")  || sText.includes("-"))
									{
									desicion = false;
									} else if (isNaN(sText)){
										desicion = false;
									}
									else {
										desicion = true;
									}
								parent.getBeginButton().setEnabled(desicion);
							},
							width: '100%',
							placeholder: 'Digite el valor a cancelar (sin puntos ni decimales)',
						//	growing:true,
						//	growingMaxLines:1,
						//	showExceededText: false,
							maxLength:13
						})
					],
					beginButton: new sap.m.Button({
						text: 'Imprimir PDF',
						enabled: false,
						press: function () {
							that.CallOdataImprimirPDF(sap.ui.getCore().byId('submitDialogTextarea').getValue());
							//var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
							sap.m.MessageToast.show('Espere un momento, estamos creando el documento');
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cancelar',
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
	    } else{
	  	  console.log(this.getView().getModel("invoice").getProperty("/InvoiceID"));
	      this.getDataProvider().getInvoicePdf(this.getView().getModel("invoice").getProperty("/InvoiceID"));
	    }

	    }
  },
  
   
  CallOdataImprimirPDF: function(ValorFactura)  {
	  this.showBusyIndicator(0);
		that = this;
	// LLamado al odata de Recalculo de intereses
	var BP = this.getView().getModel("invoice").getProperty("/AccountID");
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
	//var FechaVencimiento = "2018";
	var InvId = this.getView().getModel("invoice").getProperty("/InvoiceID");
	var VKont = this.getView().getModel("invoice").getProperty("/ContractAccountID");
	
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"ZODATA_MCF_SRV"); 
	var oModelFacturaPDF = new sap.ui.model.json.JSONModel({
		results: []
		});
	this.getView().setModel(oModelFacturaPDF, "FacturaPDF");
	this.getView().getModel("ZODATA_MCF_SRV").read("/DocumentoDeCobroPDFSet",{
		filters: [new sap.ui.model.Filter({
		      path: "Invid",
		      operator: sap.ui.model.FilterOperator.EQ,
		      value1: InvId
		     }), new sap.ui.model.Filter({
			      path: "FaednKk",
			      operator: sap.ui.model.FilterOperator.EQ,
			      value1: FechaVencimiento
			     }), new sap.ui.model.Filter({
				      path: "Vkont",
				      operator: sap.ui.model.FilterOperator.EQ,
				      value1: VKont
				     }), new sap.ui.model.Filter({
					      path: "Gpart",
					      operator: sap.ui.model.FilterOperator.EQ,
					      value1: BP
					     }), new sap.ui.model.Filter({
						      path: "Amount",
						      operator: sap.ui.model.FilterOperator.EQ,
						      value1: ValorFactura
						     })],
						     async:false,
		success:function(odata){
			this.hideBusyIndicator();
			this.getView().getModel("FacturaPDF").setProperty("/results",odata.results);
			
				var pdfResult = odata.results[0].Pdf;
			
			 	const linkSource = "data:application/pdf;base64, " + encodeURI(pdfResult);
			    const downloadLink = document.createElement("a");
			    const fileName = "factura.pdf";

			    downloadLink.href = linkSource;
			    downloadLink.download = fileName;
			    downloadLink.click();
/* 
			    let pdfWindow = window.open("");
			pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(pdfResult) + "'></iframe>");
			*/
		}.bind(this),  
		error:function(odata){
			that.hideBusyIndicator();
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
  ,
  showBusyIndicator: function (iDelay) {
		if (iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);
		} else {
			sap.ui.core.BusyIndicator.show(0);
		}
	},
	hideBusyIndicator: function () {
		sap.ui.core.BusyIndicator.hide();
	},
  odata: function(that) {
		if (that == "YES")
			{

			this.showBusyIndicator(0);
			that = this;
		// LLamado al odata de Recalculo de intereses
		var BP = this.getView().getModel("invoice").getProperty("/AccountID");
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
		//var FechaVencimiento = "2018";
		var InvId = this.getView().getModel("invoice").getProperty("/InvoiceID");
		var VKont = this.getView().getModel("invoice").getProperty("/ContractAccountID");
		var Amount = this.getView().getModel("invoice").getProperty("/AmountDue");
		
		var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
		this.getView().setModel(omodel,"ZODATA_MCF_SRV");  // Van una sola vez en la aplicacion 
		var oModelFactura = new sap.ui.model.json.JSONModel({
			results: []
			});
		this.getView().setModel(oModelFactura, "Factura");
		this.getView().getModel("ZODATA_MCF_SRV").read("/FacturaIndexadaSet",{
			filters: [new sap.ui.model.Filter({
			      path: "Invid",
			      operator: sap.ui.model.FilterOperator.EQ,
			      value1: InvId
			     }), new sap.ui.model.Filter({
				      path: "FaednKk",
				      operator: sap.ui.model.FilterOperator.EQ,
				      value1: FechaVencimiento
				     }), new sap.ui.model.Filter({
					      path: "Vkont",
					      operator: sap.ui.model.FilterOperator.EQ,
					      value1: VKont
					     }), new sap.ui.model.Filter({
						      path: "Gpart",
						      operator: sap.ui.model.FilterOperator.EQ,
						      value1: BP
						     }), new sap.ui.model.Filter({
							      path: "Amount",
							      operator: sap.ui.model.FilterOperator.EQ,
							      value1: Amount
							     })],
							     async:false,
			success:function(odata){
				this.hideBusyIndicator();
				this.getView().getModel("Factura").setProperty("/results",odata.results);
				var dialog = new sap.m.Dialog({
					title: 'Proceso Exitoso',
					type: 'Message',
						content: new sap.m.Text({
							text: sap.ui.getCore().getModel("i18n").getProperty("INVOICE.NEWRECOK")
						}),
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							dialog.close();
						    that._removeContentView();  // ACASTANEDA Cargar las facturas nuevamente, en caso de ser afirmativo
						    that.getDataProvider().loadInvoices(that, true);
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
			}.bind(this),  
			error:function(odata){
				that.hideBusyIndicator();
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
  
  handlePayButton: function(oEvent) {

    
	   var renta = this.getView().getModel("invoice").getProperty("/ContractAccountID").substring(0,2);
	   if (  renta == "60" || renta == "59"  || renta == "61" ) // Para espectaculos pUblicos se verifica que la factura no presente vencimiento de los dos meses.
		   {
		    this.verificarVigencia(oEvent);
		   }
	   
	   else{
		   this.EnviarPago();
	   }
	   
	   
},
  EnviarPago: function(){
	    //BotOn para recalcular factura 
	    // Se verifica si la fecha de vencimiento de la factura es mayor a la fecha del dia.
	    // En caso de ser asi se muestra un pop up, preguntando si quiere recalcular los intereses
	    // Para respuesta afirmativa se llama un Odata para recalculo de factura ACASTANEDA
	    
	    var f_dia = new Date();  // Fecha del dia
	    f_dia.setHours(0,0,0,0);
	    var f_vencimiento = this.getView().getModel("invoice").getProperty("/DueDate");
	    f_vencimiento.setDate(f_vencimiento.getDate() +1);
	    f_vencimiento.setHours(0,0,0,0);
	    if (f_dia>f_vencimiento){
	    	f_vencimiento.setDate(f_vencimiento.getDate() - 1);
	    	that = this
	    	// this is required since there is no direct access to the box's icons like MessageBox.Icon.WARNING
	    	jQuery.sap.require("sap.ui.commons.MessageBox");

	    	// open a fully configured message box
	    	sap.ui.commons.MessageBox.show(sap.ui.getCore().getModel("i18n").getProperty("INVOICE.RECOFIPAGOVEN"),
	    			sap.ui.commons.MessageBox.Icon.WARNING,
	    			"Recibo Oficial de Pago Vencido",
	    			[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
	    			jQuery.proxy(that.odata, that),
	    			sap.ui.commons.MessageBox.Action.YES);
	        // Fin Recalculo de factura
	    }else{

	    	f_vencimiento.setDate(f_vencimiento.getDate() - 1);

	        this.getPayButton().setVisible(false);
	    //commented as chart has been removed
	    /*this.getBillHistoryGraph().setVisible(false);
	    this.getTrendLabel().setVisible(false);*/
	    this.getPaySubmitButton().setVisible(true);
	    if (!this._paymentsFragment) {
	      this.oPaymentsController = sap.umc.mobile.invoice.view.PaymentsController;
	      this._paymentsFragment = sap.ui.xmlfragment("sap.umc.mobile.invoice.view.Payments", this.oPaymentsController);
	      this.oPaymentsController.setView(this.getView());
	      this.getPaySubmitButton().attachPress(null, this.oPaymentsController.onSubmitOneTimePayment, this.oPaymentsController);
	    }
	    var oParameters = {};
	    oParameters.Amount = this.getView().getModel("invoice").getProperty("/AmountRemaining");
	    var sCurrency = this.getView().getModel("invoice").getProperty("/Currency");
	    oParameters.Amount = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(oParameters.Amount, sCurrency);
	    
	    // Bloqueo de Campo Importe para impuesto plusvalia (no se permite pago parcial)
	    var cuentaContrato = this.getView().getModel("invoice").oData.ContractAccountID
	    if( cuentaContrato.substring(0,2) == '57'){
	        oParameters.EnablePaymentAmount = false;    	
	    }else{
	        oParameters.EnablePaymentAmount = true;    	
	    };

	    this._hidecvcOnload();
	    this.oPaymentsController.read(oParameters);
	    this._addContentView(this._paymentsFragment);
	    // fix - scroll to Bottom on phone&nbsp;
	    if(sap.ui.getCore().getModel("device").getProperty("/isPhone")){
	      this.getView().mAggregations.content[0].scrollTo(500, 1);
	    }
	  }  
  },
  _addContentView: function(oFragment) {
    var oView = this.getView().byId("ContentBox");
    oView.addContent(oFragment);
  },
  _removeContentView: function() {
    var oView = this.getView().byId("ContentBox");
    oView.removeAllContent();
  },
  onPaymentSuccess: function() {
    this.getPayButton().setVisible(false); // ACASTANEDA Se cambia para ESCONDER BOTON  Pagar Factura
    //commented as chart has been removed
    /*this.getBillHistoryGraph().setVisible(true);
    this.getTrendLabel().setVisible(true);*/
    this.getPaySubmitButton().setVisible(false);
    this._getPaymentMethodsComboBox().setSelectedKey();
    this._removeContentView();
    this.getDataProvider().loadInvoices(this, true);
    //reload alert
/*
    var oAlertComponent = this.getApp().getComponentFactory().getMessageCenter();
    var fnCallback = jQuery.proxy(function(oMessages, oSelection) {
      //reload alert view
      var oMessages = oAlertComponent.getDataProvider().oMessages;
      var oSelection = oAlertComponent.getDataProvider()._getSelectionModel();
      try {
        var oAlertListView = oAlertComponent.getRouter().getView("sap.umc.mobile.message_center.view.MessageCenter");
        if (this.getAssociateMasterPage().getViewName() === "sap.umc.mobile.message_center.view.MessageCenter") {
          oAlertListView.getController().onMessagesLoaded(oMessages, oSelection);
        }
      } catch (e) {
        return;
      }

    }, this);
    oAlertComponent.getDataProvider()._reloadMessages(fnCallback );
    */
  },
  _setInvoiceModel: function(sInvoiceID){
    var oModel = this.getDataProvider().getInvoiceById(sInvoiceID);
  //  var oModel2 = this.getDataProvider().getInvoiceById(sInvoiceID);

    oModel.setProperty("/CostCurrency",this.getText("INVOICE.COST") + " (" + oModel.getData().Currency + ")");
    oModel.setProperty("/LocaleCurrency", sap.ui.getCore().getModel("settings").getData().language);
    this.getView().setModel(oModel, "invoice");
   
    
    //MODIFICACION ACASTANEDA 
    // Se crea una variable auxiliar para mostrar unicamente el nunmero de referencia en la pantalla de Posiciones
   // de factura, tambien se modifica el event 1231 para agregar al ID la referencia.
    var referencia = this.getView().getModel("invoice").getProperty("/InvoiceID");
    referencia = referencia.substring(17);
	var oModel2 = new sap.ui.model.json.JSONModel({
		InvoiceID: {}	});
	this.getView().setModel(oModel2, "invoiceAux");
	this.getView().getModel("invoiceAux").setProperty("/InvoiceID",referencia);
	
	
	
	
  },    
  onInvoicesLoaded: function(oInvoices){
    var oInvoiceListView = sap.ui.getCore().getComponent("AppComponent").getComponentFactory().getInvoice().getRouter().getView("sap.umc.mobile.invoice.view.InvoiceList");
    var oFormattedInovices = sap.umc.mobile.invoice.js.utils.invoiceFormatter(oInvoices);
    oInvoiceListView.setModel(oFormattedInovices, "Invoices");

    var sInvoiceId = this.getView().getModel("invoice").getProperty("/InvoiceID");
    this._setInvoiceModel(sInvoiceId);  // ACASTANEDA (AGREGAR EL SETINVOICEIDE.

    var sStatusID = parseInt(this.getView().getModel("invoice").getProperty("/InvoiceStatusID"), 10);
    if (sStatusID != sap.umc.mobile.private.app.Constants.PAYMENT_STATUS.OPEN) {
      this.getPayButton().setVisible(false);
    } else {
      this.getPayButton().setVisible(false); // ACASTANEDA Se cambia para ESCONDER BOTON  Pagar Factura
    }
  }
});