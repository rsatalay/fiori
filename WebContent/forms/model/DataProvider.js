jQuery.sap.declare("sap.umc.mobile.forms.model.DataProvider");

sap.umc.mobile.forms.model.DataProvider={
	loadForms: function(oDelegate, bForcedReload,status) {
		if (bForcedReload == true){
			this._reloadForms(oDelegate,status);
		} else {
			if (!this.oForms) {
				this._reloadForms(oDelegate,status);
			} else {
				if (oDelegate != null){
					oDelegate.onFormsLoaded(this.oForms);
				}
			}
		}
	},
	_reloadForms: function(oDelegate,status) {
		this.oForms = new sap.ui.model.json.JSONModel();
		this._readForms(oDelegate,status);
	},
	
	getDisplayFormData:function(oDelegate,data,status) {
	    if(!this.oDisplayForm){
	        
	        this._getDisplayFormData(oDelegate,data,status);
	    }else{
	        this._readDisplayForm(oDelegate,data,status); 
	    }
	    
    },
    
    _getDisplayFormData: function(oDelegate,data,status) {
        this.oDisplayForm = new sap.ui.model.json.JSONModel();
        this._readDisplayForm(oDelegate,data,status);
    },
    

    submitForm: function(oDelegate, status, bNoFormData) {
        
        this._submitFormData(oDelegate,status, bNoFormData);
        
        
    },
    
    getExistingForms:function(oDelegate,param){
        if(!this.oFormsList){
            
            this._getExistingForms(oDelegate,param);
        }else{
            this._readExistingForms(oDelegate,param); 
        }   
        
    },
   
    _getExistingForms:function(oDelegate,param) {
        this.oFormsList = new sap.ui.model.json.JSONModel();
        this._readExistingForms(oDelegate,param);
        
    },
    
    
 /*   getFormBundleTypes:function(oDelegate) {
        if(!this.oFormBundleTypes){
            this._getFormBundleTypes(oDelegate);
        }else{
            this._readFormBundleTypes(oDelegate); 
        }
        
    },*/
    
    getFormBundleTypes:function(oDelegate) {
        this.oFormBundleTypes = new sap.ui.model.json.JSONModel();
        this._readFormBundleTypes(oDelegate);
        
    },
    //addForm
    getFormBundleTypesOffline:function(oDelegate){
        this.oFormBundleTypesOffline = new sap.ui.model.json.JSONModel();
        var sUrl = jQuery.sap.getModulePath("sap.umc.mobile.private")
		+ "/forms/model/FormBundleTypesOffline.json";
		this.oFormBundleTypesOffline.loadData(sUrl);
		return this.oFormBundleTypesOffline;
		
    },
    //addForm
/*    readSelectedFormBundleTypeOffline: function(oDelegate) {
    	var oData = {};
    	oData.results = [];
    	oData.results.push(oDelegate.data);
        
                $.each(oData.results, function( index, e ) {
                    e.FormBundleID=oDelegate.data.FormBundleID;
                    e.icon="sap-icon://form";
                    e.StatusID=oDelegate.data.StatusID;
                  });
                var unemploymentTax={};
                unemploymentTax.FormDescription="Unemployment Tax";
                unemploymentTax.icon="sap-icon://list";
                unemploymentTax.FormID="UNEMPLOYMENT_TAX";
                unemploymentTax.FormBundleTypeID=oDelegate.data.FormBundleTypeID;
                unemploymentTax.PeriodID=oDelegate.data.PeriodID;
                unemploymentTax.FormBundleID=oDelegate.data.FormBundleID;
                unemploymentTax.StatusID=oDelegate.data.StatusID;
                oData.results.push(unemploymentTax);
                
                var attachment={};
                attachment.FormDescription=oDelegate.getText("FORMS.ATTACHMENTS");
                attachment.icon="sap-icon://attachment";
                attachment.FormID="attachments";
                attachment.FormBundleTypeID=oDelegate.data.FormBundleTypeID;
                attachment.PeriodID=oDelegate.data.PeriodID;
                attachment.FormBundleID=oDelegate.data.FormBundleID;
                attachment.StatusID=oDelegate.data.StatusID;
                oData.results.push(attachment);
                
                var submit={};
                submit.FormDescription=oDelegate.getText("USER_PROFILE.SUBMIT");
                submit.icon="sap-icon://paper-plane";
                submit.FormID="submit";
                submit.FormBundleTypeID=oDelegate.data.FormBundleTypeID;
                submit.PeriodID=oDelegate.data.PeriodID;
                submit.FormBundleID=oDelegate.data.FormBundleID;
                submit.StatusID=oDelegate.data.StatusID;
                oData.results.push(submit);
                //commented for sp05 note version
                var payment={};
                payment.FormDescription=oDelegate.getText("FORMS.PAYMENT");
                payment.icon="sap-icon://simple-payment";
                payment.FormID="payment";
                payment.FormBundleTypeID=oDelegate.data.FormBundleTypeID;
                payment.PeriodID=oDelegate.data.PeriodID;
                payment.FormBundleID=oDelegate.data.FormBundleID;
                payment.StatusID=oDelegate.data.StatusID;
                oData.results.push(payment);
                
              //  this.oFormBundleTypes.setData(oData);
                oDelegate.onFormBundleTypesLoaded(oData);
        
    },*/    
    validateFormData:function(oDelegate,ruleID,validate,fnCallback,isSaveCall){
        this._validateFormData(oDelegate,ruleID,validate,fnCallback,isSaveCall);
    },
    
    getAttachments:function(oDelegate,fnCallback){
        this._getAttachments(oDelegate,fnCallback);
    },
    //c5221606
    loadPaymentMethodsForms: function(oDelegate) {
		// if (!this.oExistingAccounts) {
		var fnCallBack = jQuery.proxy(function(oBanks, oCards) {
			this.oExistingAccounts = new sap.ui.model.json.JSONModel();
			var aBankAccounts = null;
			var aPaymentCards = null;
			if (oBanks.results) {
				oBanks.results = oBanks.results.reverse();
				for ( var i = 0; i < oBanks.results.length; i++) {
					oBanks.results[i].id = oBanks.results[i].BankAccountID + "bank";
					oBanks.results[i].entryName = jQuery.sap.formatMessage("{0}-{1}", [oBanks.results[i].BankAccountNo, oBanks.results[i].BankID]);
				}
				aBankAccounts = oBanks.results;
			}
			if (oCards.results) {
				oCards.results = oCards.results.reverse();
				for ( var i = 0; i < oCards.results.length; i++) {
					oCards.results[i].cvc = "";
					oCards.results[i].id = oCards.results[i].PaymentCardID + "card";
					oCards.results[i].entryName = jQuery.sap.formatMessage("{0}-{1}", [oCards.results[i].CardNumber,
					                                                                   oCards.results[i].PaymentCardType.Description]);
				}
				aPaymentCards = oCards.results;
			}
			var aNewAccounts = [];
			aNewAccounts.push({
				id: -1,
				entryName: sap.ui.getCore().getModel("i18n").getProperty("INVOICE.NEWBANK")
			});
			aNewAccounts.push({
				id: -2,
				entryName: sap.ui.getCore().getModel("i18n").getProperty("INVOICE.NEWCARD")
			});

			//Default account to be prepended to the account array
			oDefaultAccount = {
				id: -3,
				entryName: sap.ui.getCore().getModel("i18n").getProperty("INVOICE.SELECT_PAYMENT_METHOD")
			};

			var aAccounts;
			if (aBankAccounts !== null && aPaymentCards !== null) {
				aAccounts = aBankAccounts.concat(aPaymentCards).concat(aNewAccounts);
			} else if (aBankAccounts !== null) {
				aAccounts = aBankAccounts.concat(aNewAccounts);
			} else if (aPaymentCards !== null) {
				aAccounts = aPaymentCards.concat(aNewAccounts);
			}else{
				aAccounts = aNewAccounts;
			}
			aAccounts.unshift(oDefaultAccount);
			this.oExistingAccounts.setData(aAccounts);
			this.oExistingAccounts.setProperty("/date", new Date());
			this.oExistingAccounts.setProperty("/_defaultDate", new Date());
			this.oExistingAccounts.setProperty("/cvc", "");
			oDelegate.oDefferedBankAcountCard.resolve();
			
			var oThis = this;
			jQuery.when(oDelegate.oDeferredFormData,oDelegate.oDefferedBankAcountCard).then(function(oParameters){
				// parameters
				
				if (oParameters.Currency) {
					oThis.oExistingAccounts.setProperty("/_currency", oParameters.Currency);
				}
				oThis.oExistingAccounts.setProperty("/amount", oParameters.Amount);
				oThis.oExistingAccounts.setProperty("/_defaultAmount", oParameters.Amount);
				//to be set later depending on the value
				oThis.oExistingAccounts.setProperty("/paymentEnabled", oParameters.EnablePaymentAmount);
				oDelegate.onPaymentMethodsLoaded(oThis.oExistingAccounts, oParameters.PaymentID);
				
			})
			
		}, this);
		var oThis = this;
		//jQuery.when(this.oDeferredFlagToLoadBankCard).then(function(oParameter){
       	 oThis._readPaymentMethodsForms(fnCallBack);
     		   
     	 // });
     	  
		
		// }
		// else {
		// oDelegate.onPaymentMethodsLoaded(this.oExistingAccounts, fnCallBackView);
		// }
	},
	
	updatePaymentMethodIdForms: function(oModel, oSelectedPaymentKey) {
		var oPaymentsUpdatedModel = oModel;
		oPaymentsUpdatedModel.setProperty("/selectedKey", oSelectedPaymentKey);
		return oPaymentsUpdatedModel;
	},
	//c5221606
	updatecvc: function(oModel, sCvc) {	
		oModel.setProperty("/cvc", sCvc);
		return oModel;
	},
	clearCVC: function(oModel) {	
		oModel.setProperty("/cvc", "");
		
	},
	createOneTimePaymentByCardForForms: function(sCVC, dExecution, sPaymentCardID, sAmount,sFormBundleId,sCurr,oSelectedAccount, fnSuccess) {
		this._createPaymentByCardForForms(sCVC, dExecution, sPaymentCardID, sAmount,sFormBundleId,sCurr, oSelectedAccount,fnSuccess);
	},
	//c5221606
	createOneTimePaymentByBankForForms: function(dExecution, sBankID, sAmount,sFormBundleId,sCurr,  fnSuccess) {
		this._createPaymentByBankForForms(dExecution, sBankID, sAmount,sFormBundleId,sCurr, fnSuccess);
	},
	//c5221606 for payments history
	loadPaymentHistory: function(oDelegate,sFormBundleId) {
		this.oInProcessPayments = new sap.ui.model.json.JSONModel();
		this.oProcessedPayments = new sap.ui.model.json.JSONModel();
		this._readPaymentHistory(oDelegate,sFormBundleId);
	},
	//c5221606 for payments history
	_sortPaymentHistory: function(data) {
		var payments = {
				"InProcess": {
					"results": []
				},
				"Processed": {
					"results": []
				}
		};
		for ( var i = 0; i < data.length; i++) {
			if (data[i].PaymentStatusID == 2 || data[i].PaymentStatusID == 3 || data[i].PaymentStatusID == 4) {
				data[i].PaymentStatus = sap.ui.getCore().getModel("i18n").getProperty("INVOICE.IN_PROCESS");
				payments.InProcess.results.push(data[i]);
			} else if (data[i].PaymentStatusID == 9) {
				data[i].PaymentStatus = sap.ui.getCore().getModel("i18n").getProperty("INVOICE.PROCESSED");
				payments.Processed.results.push(data[i]);
			} else {
				data[i].PaymentStatus = sap.ui.getCore().getModel("i18n").getProperty("INVOICE.OTHERS");
			}
		}
		return payments;
	},
	deleteAttachment:function(oDelegate){
		
		this._deleteAttachment(oDelegate);
	}
/*	getFormBundleId:function(){
		
		
	},
setFormBundleId:function(oDelegate){
		
		this.FormBundleId ="" ;
	}*/
};
