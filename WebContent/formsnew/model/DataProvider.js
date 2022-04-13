jQuery.sap.declare("sap.umc.mobile.forms.model.DataProvider");

sap.umc.mobile.forms.model.DataProvider={
_getEtagAlert: function(oDelegate){

  var oThis = this;
  var okBtn = new sap.m.Button({
     text:oDelegate.getText("APP.OK"),
        press:function(evt){
          oThis.alertDialog.close();
        oThis.alertDialog.destroy();
      delete oThis.alertDialog;
      delete sap.umc.mobile.base.utils.oErrorDialog;
          oDelegate.onRouteMatched();
         }
    });

  oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,oDelegate.getText("FORMS.FORM_RELOAD"));
  sap.umc.mobile.base.utils.oErrorDialog.removeAllButtons();

  sap.umc.mobile.base.utils.oErrorDialog.addButton(okBtn);

  this.alertDialog = sap.umc.mobile.base.utils.oErrorDialog;
  return this.alertDialog;
/*var oThis = this;
if(!this.alertDialog){
  var okBtn = new sap.m.Button({
        text:"Ok",
        press:function(evt){
          oThis.alertDialog.close();
          oDelegate.onRouteMatched();
         }
    });
    var cancelBtn = new sap.m.Button({
        text:"Cancel",
        press:function(){
          oThis.alertDialog.close();
         }
    });

    this.alertDialog = new sap.m.Dialog({
        title:"Select an option",
        content:[new sap.m.Text({text:"Should the form be reloaded?"})],
        buttons:[okBtn,cancelBtn]
    });
}
return this.alertDialog;*/
}   ,	// Visibilidad Direccion Formulario ZPLU ACASTANEDA
initializeCDVisible:function(){
	this.oCDVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oCDVisibleModel.setData(obj);
	return this.oCDVisibleModel;
	
},	// Visibilidad Direccion Formulario ZPLU ACASTANEDA
initializeRURALVisible:function(){
	this.oRURALVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oRURALVisibleModel.setData(obj);
	return this.oRURALVisibleModel;
	
},	// Visibilidad Direccion Formulario ZPLU ACASTANEDA
initializeVIAVisiblel:function(){
	this.oVIAVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oVIAVisibleModel.setData(obj);
	return this.oVIAVisibleModel;
	
},initializeRESPVisiblel:function(){
	this.oRESPVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oRESPVisibleModel.setData(obj);
	return this.oRESPVisibleModel;
	
},initializeAGERETVisiblel:function(){
	this.oAGERETVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oAGERETVisibleModel.setData(obj);
	return this.oAGERETVisibleModel;
	
},initializeOUSOVisiblel:function(){
	this.oOUSOVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oOUSOVisibleModel.setData(obj);
	return this.oOUSOVisibleModel;
	
},initializeOTRASANVisiblel:function(){
	this.oOTRASANVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oOTRASANVisibleModel.setData(obj);
	return this.oOTRASANVisibleModel;
	
},initializeExtVisible:function(){
	this.oEXTVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oEXTVisibleModel.setData(obj);
	return this.oEXTVisibleModel;
	
}, initializeCORRVisible:function(){
	this.oCORRVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oCORRVisibleModel.setData(obj);
	return this.oCORRVisibleModel;
	
},   initializeINEXVisible:function(){
	this.oINEXVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oINEXVisibleModel.setData(obj);
	return this.oINEXVisibleModel;
	
},  

//Visibilidad Direccion Formulario ZPLU ACASTANEDA
initializeDIRVisiblel:function(){
	this.oDIRVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oDIRVisibleModel.setData(obj);
	return this.oDIRVisibleModel;
	
},initializeDIRVisiblel2:function(){
	this.oDIRVisibleModel2 = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oDIRVisibleModel2.setData(obj);
	return this.oDIRVisibleModel2;
	
},

initializePJURVisible:function(){
	this.oPJURVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oPJURVisibleModel.setData(obj);
	return this.oPJURVisibleModel;
	
},

initializeSEGFIRMAVisible:function(){
	this.oSEGFIRMAVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oSEGFIRMAVisibleModel.setData(obj);
	return this.oSEGFIRMAVisibleModel;	
},
initializeFIRMADECLVisible:function(){
	this.oFIRMADECLVisibleModel = new sap.ui.model.json.JSONModel();
	var obj = {};
	obj.visible = false;
	this.oFIRMADECLVisibleModel.setData(obj);
	return this.oFIRMADECLVisibleModel;	
},
// Begin c5257470

loadInvoices: function(oDelegate, bForcedReload) {
  if (bForcedReload == true){
    this._reloadInvoices(oDelegate);
  } else {
    if (!this.oInvoices) {
      this._reloadInvoices(oDelegate);
    } else {
      if (oDelegate != null){
        oDelegate.onInvoicesLoaded(this.oInvoices);
      }
    }
  }
},
_reloadInvoices: function(oDelegate) {
  this.oInvoices = new sap.ui.model.json.JSONModel();
  this._readInvoices(oDelegate);
},

  checkInvoices: function(oDelegate) {

    this._callInvoices(oDelegate);
  },

_determinePaymentState: function() {
  var invoices = this.oInvoices.getData().results;
  for ( var i = 0; i < invoices.length; i++) {
    if (invoices[i].AmountRemaining > 0) {
      invoices[i].PaymentStateDescription = sap.ui.getCore().getModel("i18n").getProperty("INVOICE.DUE");
      invoices[i].PaymentState = "Warning";
    } else {
      invoices[i].PaymentStateDescription = sap.ui.getCore().getModel("i18n").getProperty("INVOICE.PAID");
      invoices[i].PaymentState = "Success";
    }
  }
},


getInvoiceById: function(invoiceId) {
  var invoices = this.oInvoices.getData().results;
  var invoiceModel;
  if (invoices) {
    for ( var i = 0; i < invoices.length; i++) {
      if (invoices[i].InvoiceID === invoiceId) {
        invoiceModel = new sap.ui.model.json.JSONModel();
        invoiceModel.setData(invoices[i]);
        break;
      }
    }
  }
  return invoiceModel;
},



loadPaymentMethods: function(oDelegate, oParameters) {
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
    // parameters
    if (oParameters.Currency) {
      this.oExistingAccounts.setProperty("/_currency", oParameters.Currency);
    }
    this.oExistingAccounts.setProperty("/amount", oParameters.Amount);
    this.oExistingAccounts.setProperty("/_defaultAmount", oParameters.Amount);
    this.oExistingAccounts.setProperty("/paymentEnabled", oParameters.EnablePaymentAmount);
    oDelegate.onPaymentMethodsLoaded(this.oExistingAccounts, oParameters.PaymentID);
  }, this);
  this._readPaymentMethods(fnCallBack);
  // }
  // else {
  // oDelegate.onPaymentMethodsLoaded(this.oExistingAccounts, fnCallBackView);
  // }
},

updatePaymentMethodId: function(oModel, oSelectedPaymentKey) {
  var oPaymentsUpdatedModel = oModel;
  oPaymentsUpdatedModel.setProperty("/selectedKey", oSelectedPaymentKey);
  return oPaymentsUpdatedModel;
},

createOneTimePaymentByCard: function(sCVC, dExecution, sPaymentCardID, sAmount, sInvoiceID, fnSuccess) {
  this._createPaymentByCard(sCVC, dExecution, sPaymentCardID, sAmount, sInvoiceID, fnSuccess);
},
createOneTimePaymentByBank: function(dExecution, sBankID, sAmount, sInvoiceID, fnSuccess) {
  this._createPaymentByBank(dExecution, sBankID, sAmount, sInvoiceID, fnSuccess);
},
createBalancePaymentByCard: function(sCVC, dExecution, sPaymentCardID, sAmount, sCurrency, fnSuccess) {
  this._createBalancePaymentByCard(sCVC, dExecution, sPaymentCardID, sAmount, sCurrency, fnSuccess);
},
createBalancePaymentByBank: function(dExecution, sBankID, sAmount, sCurrency, fnSuccess) {
  this._createBalancePaymentByBank(dExecution, sBankID, sAmount, sCurrency, fnSuccess);
},

cancelPayment: function(oDelegate, oPaymentDocument){
  this._removePaymentDocument(oDelegate, oPaymentDocument);
},

// End c5257470

readFormOnSubmitTab: function(oDelegate,data,isPaymentTab,fnCallback) {

  var oCallBacks = {fnSuccess:jQuery.proxy(function(oData, oResponse) {
             fnCallback(oDelegate.generateFormDataJSON(oData),isPaymentTab);
     }, this),
    fnError:jQuery.proxy(function(oData, oResponse) {
      if(isPaymentTab){
      oDelegate.oDeferredFormData.reject();
      oDelegate.oFormBusyDialog.close();
      }
    }, this),
    fnErrorEtag:$.proxy(function(){
      if(this.sStatus === "SUBMITTED"){
          oDelegate.oCurrentFormBundle.StatusID = sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
          oDelegate.oCurrentFormBundle.StatusText = "Submitted";
          oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_CHANGE_NOT_POSSIBLE"));

       	}
      else{
      oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_UPDATED"));
    //oDelegate.getRouter().backToHome();
      }
      if(this._getEtagAlert(oDelegate)){
            this.alertDialog.open();
            }
  },this),};
     this._readFormData(data,oCallBacks);


},
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

     getFormDataOnValidation: function(oDelegate,oForm) {
        //no need to handle this method for amend
       	//as the before save draft/submit of an amend form
       	//we intent to get all th forms data
     var  oCallBacks = {fnSuccess : jQuery.proxy(function(oData, oResponse) {


               oDelegate.saveFormDataLocally(oForm.FormID,oForm.FormNo,oDelegate.generateFormDataJSON(oData)/*,enableData commented for time being*/);
               oDelegate.saveFormScenarioTableDataLocally(oForm.FormID,oForm.FormNo,oData);
           }, this),
           fnErrorEtag:$.proxy(function(){
             if(this.sStatus === "SUBMITTED"){
                  oDelegate.oCurrentFormBundle.StatusID = sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
                  oDelegate.oCurrentFormBundle.StatusText = "Submitted";
                  oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_CHANGE_NOT_POSSIBLE"));

                }
             else{
             oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_UPDATED"));
          //oDelegate.getRouter().backToHome();
             }
             if(this._getEtagAlert(oDelegate)){
                   this.alertDialog.open();
                   }
       	},this),};
           var sTableForm = "";

           var data={
                      FormBundleID:"'"+oDelegate.oCurrentFormBundle.FormBundleID+"'",
                      FormID:"'"+oForm.FormID+"'",
                      CurrentFormNo:"'"+oForm.FormNo+"'",
                      TableForm:"'"+sTableForm+"'",
                      };
           this._readFormData(data,oCallBacks);
       },
  _reloadForms: function(oDelegate,status) {
    this.oForms = new sap.ui.model.json.JSONModel();
    this._readForms(oDelegate,status);
  },
  getFormData: function(oDelegate,oFilter) {
       var  oIconTabFilterData = oDelegate.oFinalIconTabBarFiltersData[oFilter.getKey()];

    var oCallBacks = {
          fnSuccess:jQuery.proxy(function(oData, oResponse) {
                 if(oIconTabFilterData.bTableForm){
                  oDelegate.onTableFormDataLoaded(oFilter,oData);
                 }
                 if(oIconTabFilterData.bFormBundleType){
                  oDelegate.onFormDataLoaded(oFilter,oData);
                 }

             }, this),
             fnErrorEtag:$.proxy(function(){
               if(this.sStatus === "SUBMITTED"){
                      oDelegate.oCurrentFormBundle.StatusID = sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
                      oDelegate.oCurrentFormBundle.StatusText = "Submitted";
                      oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_CHANGE_NOT_POSSIBLE"));

                    }
               else{
               oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,oDelegate.getText("FORMS.FORM_UPDATED"));
            //oDelegate.getRouter().backToHome();
               }
               if(this._getEtagAlert(oDelegate)){
                     this.alertDialog.open();
                     }
          },this),
    };





        this._readFormData(this.getPayLoadGetFormData(oDelegate,oFilter.getKey(),oFilter.data().CurrentFormNo),oCallBacks);
    },

    // general function for save draft and submit-it will process form depending on status draft or submit
    //save draft and submit change bedited to false
    processForm: function (oDelegate,sStatusID,bNoFormData,bSyncCall,fn) {

    	oDelegate.getView().byId("idFormSubmit").setEnabled(false); //change for incident ACASTANEDA
    	oDelegate.getView().byId("idFormSave").setEnabled(false); //change for incident ACASTANEDA
    	oDelegate.getView().byId("idFormValidate").setEnabled(false); //change for incident ACASTANEDA
    	
      if(oDelegate.amendFormBundleID){
        for( var i =0 ;i<oDelegate.aIconTabBarFilterSequence.length;i++){
          var sKey = oDelegate.aIconTabBarFilterSequence[i];
          if(oDelegate.oFinalIconTabBarFiltersData[sKey]["bFormBundleType"]){
            this.getFormDataOfAllFormInstancesToSaveLocally(oDelegate, sKey);
          }
        }
      }

    var sFormDataJson ="";
//draft
    if(((sStatusID)?sStatusID.toLowerCase():sStatusID) == sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT.toLowerCase()){
         if(bNoFormData==true){
            sFormDataJson="";
        }else{
          //testing performance
          //sFormDataJson = this._getAllFormsJSONString(oDelegate);
          sFormDataJson = this._getAllFormsJSONStringToSave(oDelegate);
          //sFormDataJson = this._getFormDataJSONStringOnSubmit(oDelegate);
        }
    }
//submit
if(((sStatusID)?sStatusID.toLowerCase():sStatusID) == sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){

        if(bNoFormData==true){
            sFormDataJson="";
        }else{
          //testing performance
          //sFormDataJson = this._getAllFormsJSONString(oDelegate);
          sFormDataJson = this._getAllFormsJSONStringToSave(oDelegate);
          //sFormDataJson = this._getFormDataJSONStringOnSubmit(oDelegate);
        }
    }
  var formBundleId;
    if(oDelegate.oCurrentFormBundle.FormBundleID){
        formBundleId=oDelegate.oCurrentFormBundle.FormBundleID;
    }else{
        formBundleId="";
    }

    var AccountID=this.getContextAccountId();
    var data={
            "d" :{
                "FormBundleID":formBundleId,
                "FormData":sFormDataJson,
                "AccountID":AccountID,
                "FormBundleTypeID":oDelegate.oCurrentFormBundle.FormBundleTypeID,
               /* "PeriodID":oDelegate.oCurrentFormBundle.PeriodID,*/
                "StatusID":sStatusID,
               }
        };

  if(oDelegate.bPeriodBased) {
    data.d.PeriodID = oDelegate.oCurrentFormBundle.PeriodID;
  }
  else if(oDelegate.bKeyDateBased){
    data.d.KeyDate = sap.umc.mobile.forms.js.utils.formatDateKey(oDelegate.oCurrentFormBundle.KeyDate);
  }

  if(oDelegate.oCurrentFormBundle.FormBundleID){
      //if form bundle id already exists update
        this._updateForm(oDelegate, data, oDelegate.oCurrentFormBundle.FormBundleID, sStatusID, bSyncCall,"",function(){
        	fn();
        });
    }else{
      //if its a new form first create
        this._createForm(oDelegate, data, sStatusID,bSyncCall,"",function(){
        	fn();
        });
    }
},
getFormDataOfAllFormInstancesToSaveLocally: function(oDelegate,sKey){
  var oThis = this;

  var param=oDelegate.oFinalIconTabBarFiltersData[sKey];
 	var oCallBacks = {
    fnSuccess:jQuery.proxy(function(oData, oResponse) {
     	  var data=JSON.parse(oData.FormData);
     	/*if(oDelegate.amendFormBundleID){*/
         $.each(data, function( index, e ) {
          if(!(oDelegate.oAllFormsData[sKey] &&
              oDelegate.oAllFormsData[sKey][e.FORMNO] &&
              oDelegate.oAllFormsData[sKey][e.FORMNO]["FormData"])){

               ////check here if the dtaa exists in oAllFOrms or not if not then only call
                         // oIconTabFilterControl.data().CurrentFormNo = e.FORMNO;
                    oThis.getFormDataOfFormInstanceToSaveLocally(oDelegate, sKey,e.FORMNO);
 }
          });

     //	}
 }, this),

  fnErrorEtag:$.proxy(function(){
    if(this.sStatus === "SUBMITTED"){
          oDelegate.oCurrentFormBundle.StatusID = sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
          oDelegate.oCurrentFormBundle.StatusText = "Submitted";
          oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_CHANGE_NOT_POSSIBLE"));

       	}
    else{
    oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_UPDATED"));
    //oDelegate.getRouter().backToHome();
    }
    if(this._getEtagAlert(oDelegate)){
            this.alertDialog.open();
            }
  },this),
 	};

/*     if(oDelegate.amendFormBundleID){
     	 this.SERVICE.read(sFormBundleTypesPath , ["FormBundleID="+"'"+oDelegate.amendFormBundleID+"'","FormID="+"'"+param.FormID+"'","$format=json"], false, {
              fnSuccess: fnSuccess
          });
   }
     */

     var data = {};
     if(oDelegate.amendFormBundleID){
     	data.FormBundleID = oDelegate.amendFormBundleID;
     	 data.FormID = param.FormID;
     	 this._readExistingForms(data,oCallBacks);
     	}


 },
 getFormDataOfFormInstanceToSaveLocally: function(oDelegate,sFormID,sFormNo) {
   var oCallBacks ={
       fnSuccess: jQuery.proxy(function(oData, oResponse) {
                oDelegate.saveFormDataLocally(sFormID,sFormNo,oDelegate.generateFormDataJSON(oData));
                oDelegate.saveFormScenarioTableDataLocally(sFormID,sFormNo,oData);
            }, this),
            fnErrorEtag:$.proxy(function(){
              if(this.sStatus === "SUBMITTED"){
                    oDelegate.oCurrentFormBundle.StatusID = sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
                    oDelegate.oCurrentFormBundle.StatusText = "Submitted";
                    oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,oDelegate.getText("FORMS.FORM_CHANGE_NOT_POSSIBLE"));

                  }
              else{
              oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_UPDATED"));
            //oDelegate.getRouter().backToHome();
              }
              if(this._getEtagAlert(oDelegate)){
                    this.alertDialog.open();
                    }
          },this),
   }




            this._readFormData(this.getPayLoadGetFormData(oDelegate,sFormID,sFormNo),oCallBacks);
    },
    getPayLoadGetFormData: function(oDelegate,sFormID,sFormNo){
      var data={};

   	 var sTableForm = "";
   	 var oIconTabFilterData = oDelegate.oFinalIconTabBarFiltersData[sFormID];
         if(oIconTabFilterData.bTableForm){
          sTableForm = "X";
          data.CurrentFormNo ="'"+"0001"+"'";
        }
         if(oIconTabFilterData.bFormBundleType){
         	 data.CurrentFormNo = "'"+sFormNo+"'";
         }
         if(oDelegate.amendFormBundleID){
          data.FormBundleID="'"+oDelegate.amendFormBundleID+"'";
        }
         else{ data.FormBundleID="'"+oDelegate.oCurrentFormBundle.FormBundleID+"'";
     	 }
         data.FormID="'"+oIconTabFilterData.FormID+"'";
         data.TableForm="'"+sTableForm+"'";
         return data;
    },

    _callFormBundleRules:function(sFormDataJson,oDelegate,ruleID, bValidate,fnCallback,bCheckBeforeSubmitCall)
     {
         var formBundleId;
         if(oDelegate.oCurrentFormBundle.FormBundleID){
             formBundleId=oDelegate.oCurrentFormBundle.FormBundleID;
         }else{
             formBundleId="";
         }

         var AccountID=this.getContextAccountId();
         var data={
                 "d" :{
                     "FormBundleID":formBundleId,
                     "FormData":sFormDataJson,
                     "AccountID":AccountID,
                     "RevenueType":oDelegate.oCurrentFormBundle.RevenueType,
                     "FormBundleTypeID":oDelegate.oCurrentFormBundle.FormBundleTypeID,
                     "FormProcess":"TAX_RETURN",
                    /* "PeriodID":oDelegate.oCurrentFormBundle.PeriodID,*/
                     "RuleID" : ruleID
             }
             };
         if(oDelegate.bPeriodBased) {

      data.d.PeriodID = oDelegate.oCurrentFormBundle.PeriodID;
    }
    else if(oDelegate.bKeyDateBased){
      data.d.KeyDate = sap.umc.mobile.forms.js.utils.formatDateKey(oDelegate.oCurrentFormBundle.KeyDate);
    }
         this._validateForm(oDelegate,data,bValidate,fnCallback,bCheckBeforeSubmitCall);

     },

     //below funstion not used
_getAllFormsJSONString:function(oDelegate){
    //SAVE DRAFT-it picks up all the forms id's form instances which have been viewed(all viewed instanes of formids are
  //stored in oAllFormsData) irrespective of modified or not
  var arr=[];
    var sFormDataJson ="";
  if(!($.isEmptyObject(oDelegate.oAllFormsData))){
    for (var formID in oDelegate.oAllFormsData){
      var oFormInstances = oDelegate.oAllFormsData[formID];
      if(oDelegate.oFinalIconTabBarFiltersData[formID].bFormBundleType){
        //for standard forms
      if(!($.isEmptyObject(oFormInstances))){
        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          var filledData = jQuery.extend( true, {}, oFormInstance.FormData);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex="1";
              obj.TableForm="";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);
            }
      }
    }
    else if(oDelegate.oFinalIconTabBarFiltersData[formID].bTableForm) {//for table forms

      if(!($.isEmptyObject(oFormInstances))){
        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          var allRowsData = oFormInstance.FormData;
          for(var i=0;i<allRowsData.length;i++){
          var filledData = jQuery.extend( true, {}, allRowsData[i]);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex = (i+1).toString();
              obj.TableForm="X";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);  }
            }
      }
        }
    }
  }

    sFormDataJson= JSON.stringify(arr);
    return sFormDataJson;

  },
//below function used for getting all form viewed isr and table forms for saving
  _getAllFormsJSONStringToSave:function(oDelegate){
    //SAVE DRAFT-it picks up all the forms id's form instances which have been viewed(all viewed instanes of formids are
  //stored in oAllFormsData) irrespective of modified or not
  var arr=[];
    var sFormDataJson ="";
  if(!($.isEmptyObject(oDelegate.oAllFormsData))){
    for (var formID in oDelegate.oAllFormsData){
      var oFormInstances = oDelegate.oAllFormsData[formID];
      if(oDelegate.oFinalIconTabBarFiltersData[formID].bFormBundleType){
        //for standard forms
      if(!($.isEmptyObject(oFormInstances))){

        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          var filledData = jQuery.extend( true, {}, oFormInstance.FormData);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex="1";
              obj.TableForm="";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);
            //}
              this.removeEmptyRowsFormFormInstanceOfFormScenarioTable(oFormInstance, oDelegate);
            /*  //start of rearranging tables in form scenarios so that no blank rows stay back

          var oTableGroupsData = jQuery.extend( {}, oFormInstance.TableGroups);

          for(var sTableName in oTableGroupsData){
            var aTableData = oTableGroupsData[sTableName];
            var tableLen = aTableData.length;
            var i=0;
            while(i<tableLen){

              var aTableRowData = aTableData[i];
              var flag = false;
              for(var j=0;j<aTableRowData.length;j++){
                if(aTableRowData[j]){
                  flag = true;
                  break;
                }
              }

              if(flag){i++;}
              if(!flag){
                aTableData.splice(i,1);
                i = 0;
                tableLen = aTableData.length;
              }


            }

          }
          //after the empty rows have been removed from the oAllFormData it has remove empty
          //rows from the ui table as well.
          var oFilter =  oDelegate.getSelectedFilter();
          var sKey = oFilter.getKey();
          var oIconTabFilterData = oDelegate.oFinalIconTabBarFiltersData[sKey];

        if(oIconTabFilterData.bFormBundleType)
        {oDelegate.createFormScenarioTableRows(oFilter);
          }*/
          //when the oAllFormsData has been cleaned of empty rows, we can send the table form scenario
        //into payload for save




      /*  **********************/
        //pick the first row of all form scenario tables and add it merged with formdata - payload
              var oTableGroupsData = jQuery.extend( {}, oFormInstance.TableGroups);
            //  var oFilter =  oDelegate.getSelectedFilter();
          var sKey = formID;

        for(var sTableName in oTableGroupsData){
          var aTableData = oTableGroupsData[sTableName];
          var tableLen = aTableData.length;

if(tableLen){
  var aTableRowData = [];
  if( aTableData[0])
  aTableRowData = aTableData[0];
  for(var j=0;j<aTableRowData.length;j++){
    var tempObj={};
    tempObj.FieldName = oDelegate.aTableGroups[sKey][sTableName]["fields"][j];
    tempObj.FieldValue = aTableRowData[j];
      obj.Data.push(tempObj);
    }

}


          }
        //get other rows of table
        var fieldIndx = 2;
        while(fieldIndx){
          var tempObjFieldIndex = $.extend(true,{},obj);
          tempObjFieldIndex.FieldIndex = fieldIndx.toString();
          tempObjFieldIndex.Data = [];
          var flag = false;
          for(var sTableName in oTableGroupsData){

              aTableData = oTableGroupsData[sTableName];
              var aTableRowData = [];

              if(aTableData[fieldIndx-1]){
                aTableRowData = aTableData[fieldIndx-1];
              }
              //make object of all the (fieldIndx-1)th row of all form scenario tables in the form instance
              for( j=0;j<aTableRowData.length;j++){
                var tempObjTable={};
                tempObjTable.FieldName = oDelegate.aTableGroups[sKey][sTableName]["fields"][j];
                tempObjTable.FieldValue = aTableRowData[j];
                tempObjFieldIndex.Data.push(tempObjTable);
                }
              if(aTableData[fieldIndx]){
                flag = true;
              }

          }

          if(tempObjFieldIndex.Data.length)
          arr.push(tempObjFieldIndex);
          if(flag){
            fieldIndx++;
            }else{
              fieldIndx = null;
              }

        }

        }
      }
    }
    else if(oDelegate.oFinalIconTabBarFiltersData[formID].bTableForm) {//for table forms

      if(!($.isEmptyObject(oFormInstances))){
        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          //if(oFormInstance.bEdited === true){
          var allRowsData = oFormInstance.FormData;
          for(var i=0;i<allRowsData.length;i++){
          var filledData = jQuery.extend( true, {}, allRowsData[i]);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex = (i+1).toString();
              obj.TableForm="X";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);  }
        //}
          }
      }
        }
    }
  }

    sFormDataJson= JSON.stringify(arr);
    return sFormDataJson;

  },

//below function used for getting all form viewed isr only not table forms for check
  _getAllFormsJSONStringToCheck:function(oDelegate){
    //SAVE DRAFT-it picks up all the forms id's form instances which have been viewed(all viewed instanes of formids are
  //stored in oAllFormsData) irrespective of modified or not
  var arr=[];
    var sFormDataJson ="";
  if(!($.isEmptyObject(oDelegate.oAllFormsData))){
    for (var formID in oDelegate.oAllFormsData){
      var oFormInstances = oDelegate.oAllFormsData[formID];
      if(oDelegate.oFinalIconTabBarFiltersData[formID].bFormBundleType){
        //for standard forms
      if(!($.isEmptyObject(oFormInstances))){

        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          var filledData = jQuery.extend( true, {}, oFormInstance.FormData);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex="1";
              obj.TableForm="";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);
            //}
              
              this.removeEmptyRowsFormFormInstanceOfFormScenarioTable(oFormInstance, oDelegate);
              
              
            /*  //start of rearranging tables in form scenarios so that no blank rows stay back

          var oTableGroupsData = jQuery.extend( {}, oFormInstance.TableGroups);

          for(var sTableName in oTableGroupsData){
            var aTableData = oTableGroupsData[sTableName];
            var tableLen = aTableData.length;
            var i=0;
            while(i<tableLen){

              var aTableRowData = aTableData[i];
              var flag = false;
              for(var j=0;j<aTableRowData.length;j++){
                if(aTableRowData[j]){
                  flag = true;
                  break;
                }
              }

              if(flag){i++;}
              if(!flag){
                aTableData.splice(i,1);
                i = 0;
                tableLen = aTableData.length;
              }


            }

          }
          //after the empty rows have been removed from the oAllFormData it has remove empty
          //rows from the ui table as well.
          var oFilter =  oDelegate.getSelectedFilter();
          var sKey = oFilter.getKey();
          var oIconTabFilterData = oDelegate.oFinalIconTabBarFiltersData[sKey];

        if(oIconTabFilterData.bFormBundleType)
        {oDelegate.createFormScenarioTableRows(oFilter);
          }*/
          //when the oAllFormsData has been cleaned of empty rows, we can send the table form scenario
        //into payload for save




      /*  **********************/
        //pick the first row of all form scenario tables and add it merged with formdata - payload
              var oTableGroupsData = jQuery.extend( {}, oFormInstance.TableGroups);
            //  var oFilter =  oDelegate.getSelectedFilter();
          var sKey = formID;

        for(var sTableName in oTableGroupsData){
          var aTableData = oTableGroupsData[sTableName];
          var tableLen = aTableData.length;

if(tableLen){
  var aTableRowData = [];
  if( aTableData[0])
  aTableRowData = aTableData[0];
  for(var j=0;j<aTableRowData.length;j++){
    var tempObj={};
    tempObj.FieldName = oDelegate.aTableGroups[sKey][sTableName]["fields"][j];
    tempObj.FieldValue = aTableRowData[j];
      obj.Data.push(tempObj);
    }

}


          }
        //get other rows of table
        var fieldIndx = 2;
        while(fieldIndx){
          var tempObjFieldIndex = $.extend(true,{},obj);
          tempObjFieldIndex.FieldIndex = fieldIndx.toString();
          tempObjFieldIndex.Data = [];
          var flag = false;
          for(var sTableName in oTableGroupsData){

              aTableData = oTableGroupsData[sTableName];
              var aTableRowData = [];

              if(aTableData[fieldIndx-1]){
                aTableRowData = aTableData[fieldIndx-1];
              }
              //make object of all the (fieldIndx-1)th row of all form scenario tables in the form instance
              for( j=0;j<aTableRowData.length;j++){
                var tempObjTable={};
                tempObjTable.FieldName = oDelegate.aTableGroups[sKey][sTableName]["fields"][j];
                tempObjTable.FieldValue = aTableRowData[j];
                tempObjFieldIndex.Data.push(tempObjTable);
                }
              if(aTableData[fieldIndx]){
                flag = true;
              }

          }

          if(tempObjFieldIndex.Data.length)
          arr.push(tempObjFieldIndex);
          if(flag){
            fieldIndx++;
            }else{
              fieldIndx = null;
              }

        }

        }
      }
    }
  /*  else if(oDelegate.oFinalIconTabBarFiltersData[formID].bTableForm) {//for table forms

      if(!($.isEmptyObject(oFormInstances))){
        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          //if(oFormInstance.bEdited === true){
          var allRowsData = oFormInstance.FormData;
          for(var i=0;i<allRowsData.length;i++){
          var filledData = jQuery.extend( true, {}, allRowsData[i]);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex = (i+1).toString();
              obj.TableForm="X";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);  }
        //}
          }
      }
        }*/
    }
  }

    sFormDataJson= JSON.stringify(arr);
    return sFormDataJson;

  },
  removeEmptyRowsFormFormInstanceOfFormScenarioTable:function(oFormInstance,oDelegate){
    //start of rearranging tables in form scenarios so that no blank rows stay back

    var oTableGroupsData = jQuery.extend( {}, oFormInstance.TableGroups);

    for(var sTableName in oTableGroupsData){
      var aTableData = oTableGroupsData[sTableName];
      var tableLen = aTableData.length;
      var i=0;
      while(i<tableLen){

        var aTableRowData = aTableData[i];
        var flag = false;
        for(var j=0;j<aTableRowData.length;j++){
          if(aTableRowData[j]){
            flag = true;
            break;
          }
        }

        if(flag){i++;}
        if(!flag){
          aTableData.splice(i,1);
          i = 0;
          tableLen = aTableData.length;
        }


      }

    }
    //after the empty rows have been removed from the oAllFormData it has remove empty
    //rows from the ui table as well.
    var oFilter =  oDelegate.getSelectedFilter();
    var sKey = oFilter.getKey();
    var oIconTabFilterData = oDelegate.oFinalIconTabBarFiltersData[sKey];
    if(oIconTabFilterData.bFormBundleType)
    {oDelegate.createFormScenarioTableRows(oFilter);
    }

  },
//below funstion not used
  _getFormDataJSONStringOnSubmit:function(oDelegate){
    //SAVE DRAFT-it picks up all the forms id's form instances which have been viewed(all viewed instanes of formids are
  //stored in oAllFormsData) irrespective of modified or not
  var arr=[];
    var sFormDataJson ="";
  if(!($.isEmptyObject(oDelegate.oAllFormsData))){
    for (var formID in oDelegate.oAllFormsData){
      var oFormInstances = oDelegate.oAllFormsData[formID];
      if(oDelegate.oFinalIconTabBarFiltersData[formID].bFormBundleType){
        //for standard forms
      if(!($.isEmptyObject(oFormInstances))){
        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          if(!($.isEmptyObject(oFormInstance))){
            if(oFormInstance.bEdited === true){
          var filledData = jQuery.extend( true, {}, oFormInstance.FormData);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex="1";
              obj.TableForm="";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);  }}
            }
      }
    }
    else if(oDelegate.oFinalIconTabBarFiltersData[formID].bTableForm) {//for table forms

      if(!($.isEmptyObject(oFormInstances))){
        for (var formNo in oFormInstances){
          var oFormInstance = oFormInstances[formNo];
          if(!($.isEmptyObject(oFormInstance))){
            if(oFormInstance.bEdited === true){
          var allRowsData = oFormInstance.FormData;
          for(var i=0;i<allRowsData.length;i++){
          var filledData = jQuery.extend( true, {}, allRowsData[i]);
          var obj = {};
          obj.FormNo=parseInt(formNo).toString();
              obj.FormId= formID;
              obj.FieldIndex = (i+1).toString();
              obj.TableForm="X";
              var dataArr=[];
          $.each(filledData, function(key, value) {
                  var objData = {};
                  objData.FieldName = key;
                  objData.FieldValue = value;
                  dataArr.push(objData);
              });
              obj.Data=dataArr;
              arr.push(obj);  }

            }}

            }
      }
        }
    }
  }

    sFormDataJson= JSON.stringify(arr);
    return sFormDataJson;

  },
/*  //pat
  _getFormDataJSONStringOnSubmit:function(oDelegate){
    //SUBMIT
    //it picks up all the forms id's form instances which have been viewed
    //(all viewed instanes of formids and also those that are returned are on form validation are
    //stored in oAllFormsData) and have been modified (bEdited flag true )
    var arr=[];
     var sFormDataJson ="";
    if(!($.isEmptyObject(oDelegate.oAllFormsData))){
      for(var formID in oDelegate.oAllFormsData){
        var oForms = oDelegate.oAllFormsData[formID];
        if(!($.isEmptyObject(oForms))){
          for(var formNo in oForms){
            var oFormIstance = oForms[formNo];
            if(!($.isEmptyObject(oFormIstance))){
              if(oFormIstance.bEdited === true){
                var obj = {};
                      obj.FormNo=formNo;
                      obj.FormId=formID;
                      obj.FieldIndex="1";

                 var dataArr=[];
                 filledData = oFormIstance.FormData;
                        $.each(filledData, function(key, value) {
                            var objData = {};
                            objData.FieldName = key;
                            objData.FieldValue = value;
                            dataArr.push(objData);
                        });
                        obj.Data=dataArr;
                        arr.push(obj);
              }
            }
          }
        }
      }
    }

      sFormDataJson= JSON.stringify(arr);
      return sFormDataJson;
     },*/    //the below function is used to send only the current ISR form being viewed for
  //check, function is open for customer to switch to this behaviour
     _getCurrentFormDataJSONString:function(oDelegate){

         var sCurrentFormNo="1";
         var arr=[];
         var dataArr=[];
         var obj = {};
         var sFormDataJson ="";
         var filledData={};
             var oCurrentSelectedFilter = oDelegate.getSelectedFilter();
                var oCurrentSelectedFilterData = oCurrentSelectedFilter.data();

           if(oCurrentSelectedFilterData.CurrentFormNo){
           	sCurrentFormNo=oCurrentSelectedFilterData.CurrentFormNo;
           }
           //get form data
           var sFormID = oCurrentSelectedFilter.getKey();
           obj.FormNo=sCurrentFormNo;
           obj.FormId= sFormID;
           obj.FieldIndex="1";
           if(    oDelegate.oAllFormsData &&
              oDelegate.oAllFormsData[sFormID] &&
              oDelegate.oAllFormsData[sFormID][sCurrentFormNo] &&
              oDelegate.oAllFormsData[sFormID][sCurrentFormNo]["FormData"]
           )
           	{
           	filledData = jQuery.extend( true, {}, oDelegate.oAllFormsData[sFormID][sCurrentFormNo]["FormData"]);
           	}
           else
           {
           	oDelegate.getView().getModel(obj.FormId+"Model");
           filledData = oDelegate.getView().getModel(obj.FormId+"Model").getData();

           oDelegate.oAllFormsData[sFormID][sCurrentFormNo]["FormData"]=jQuery.extend( true, {}, filledData);
           }
           $.each(filledData, function(key, value) {
               var objData = {};
               objData.FieldName = key;
               objData.FieldValue = value;
               dataArr.push(objData);
           });
           obj.Data=dataArr;

           arr.push(obj);
           //clear empty rows
           var oFormInstance = oDelegate.oAllFormsData[sFormID][sCurrentFormNo];
           this.removeEmptyRowsFormFormInstanceOfFormScenarioTable(oFormInstance, oDelegate);
           //get form scenario table data
      //pick the first row of all form scenario tables and add it merged with formdata - payload
           var  oTableGroupsData = jQuery.extend( {}, oFormInstance.TableGroups);
           var oFilter =  oDelegate.getSelectedFilter();
      var sKey = oFilter.getKey();

      for(var sTableName in oTableGroupsData){
      var aTableData = oTableGroupsData[sTableName];
      var tableLen = aTableData.length;

if(tableLen){
var aTableRowData = [];
if( aTableData[0])
aTableRowData = aTableData[0];
for(var j=0;j<aTableRowData.length;j++){
  var tempObj={};
  tempObj.FieldName = oDelegate.aTableGroups[sKey][sTableName]["fields"][j];
  tempObj.FieldValue = aTableRowData[j];
    obj.Data.push(tempObj);
  }

}


      }
      //get other rows of table
      //get other rows of table
      var fieldIndx = 2;
      while(fieldIndx){
        var tempObjFieldIndex = $.extend(true,{},obj);
        tempObjFieldIndex.FieldIndex = fieldIndx.toString();
        tempObjFieldIndex.Data = [];
        var flag = false;
        for(var sTableName in oTableGroupsData){

            aTableData = oTableGroupsData[sTableName];
            var aTableRowData = [];

            if(aTableData[fieldIndx-1]){
              aTableRowData = aTableData[fieldIndx-1];
            }
            //make object of all the (fieldIndx-1)th row of all form scenario tables in the form instance
            for( j=0;j<aTableRowData.length;j++){
              var tempObjTable={};
              tempObjTable.FieldName = oDelegate.aTableGroups[sKey][sTableName]["fields"][j];
              tempObjTable.FieldValue = aTableRowData[j];
              tempObjFieldIndex.Data.push(tempObjTable);
              }
            if(aTableData[fieldIndx]){
              flag = true;
            }

        }
        if(tempObjFieldIndex.Data.length)
          arr.push(tempObjFieldIndex);



        if(flag){
          fieldIndx++;
          }else{
            fieldIndx = null;
            }

      }
           //end get form scenario table data

           sFormDataJson= JSON.stringify(arr);

       	return sFormDataJson;
       },
   getExistingForms:function(oDelegate,oIconTabFilterControl) {
   	var param=oDelegate.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()];
   	var oCallBacks = {
        fnSuccess:jQuery.proxy(function(oData, oResponse) {

            var formData=JSON.parse(oData.FormData);

              $.each(formData, function( index, e ) {
                if(oDelegate.bPeriodBased) {
                  e.PeriodID=oDelegate.oCurrentFormBundle.PeriodID;

              }
              else if(oDelegate.bKeyDateBased){
                 e.KeyDate=oDelegate.oCurrentFormBundle.KeyDate;

              }

                  e.FormDescription= param.FormDescription;

                });

        oDelegate.onExistingFormsLoaded(formData,oIconTabFilterControl);

    }, this),

      fnErrorEtag:$.proxy(function(){
        if(this.sStatus === "SUBMITTED"){
                  oDelegate.oCurrentFormBundle.StatusID = sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
                  oDelegate.oCurrentFormBundle.StatusText = "Submitted";
                  oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_CHANGE_NOT_POSSIBLE"));

               	}
        else
          {
        oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_UPDATED"));
          }
        //oDelegate.getRouter().backToHome();
        if(this._getEtagAlert(oDelegate)){
                this.alertDialog.open();
                }
      },this),


   	};

    var data = {};
    if(oDelegate.amendFormBundleID){
      data.FormBundleID = oDelegate.amendFormBundleID;
      }
   else{
     data.FormBundleID = oDelegate.oCurrentFormBundle.FormBundleID;
    }
    data.FormID = param.FormID;
/* var sSuccess =  */this._readExistingForms(data,oCallBacks);
/* return sSuccess;*/
    },
   getFormBundleTypes:function(oDelegate,FormBundleTypeID,PeriodID) {
        this.oFormBundleTypes = new sap.ui.model.json.JSONModel();
        this._readFormBundleTypes(oDelegate,FormBundleTypeID,PeriodID);
    },
    //addForm
    getFormBundleTypesOffline:function(oDelegate){
        this.oFormBundleTypesOffline = new sap.ui.model.json.JSONModel();
        var sUrl = jQuery.sap.getModulePath("sap.umc.mobile.forms")
    + "/model/FormBundleTypesOffline.json";
    this.oFormBundleTypesOffline.loadData(sUrl);
    return this.oFormBundleTypesOffline;

    },


    validateFormData:function(oDelegate,ruleID,bValidate,fnCallback,bCheckBeforeSubmitCall){

    	oDelegate.getView().byId("idFormSubmit").setEnabled(false); //change for incident ACASTANEDA
    	oDelegate.getView().byId("idFormSave").setEnabled(false); //change for incident ACASTANEDA
    	oDelegate.getView().byId("idFormValidate").setEnabled(false);
    	
      if(bCheckBeforeSubmitCall){
        if(oDelegate.amendFormBundleID){
            for( var i =0 ;i<oDelegate.aIconTabBarFilterSequence.length;i++){
              var sKey = oDelegate.aIconTabBarFilterSequence[i];

              if(oDelegate.oFinalIconTabBarFiltersData[sKey]["bFormBundleType"]){
                this.getFormDataOfAllFormInstancesToSaveLocally(oDelegate, sKey);
              }
            }
          }

      }
       var sFormDataJson="";

          //if bValidate is false it means its pre populate of form data called hence empty form data sent
        if(bValidate){
          if(bCheckBeforeSubmitCall)
            {/*generate formdata for submit tab*/
            //testing performance
              //sFormDataJson = this._getAllFormsJSONString(oDelegate);
              sFormDataJson = this._getAllFormsJSONStringToCheck(oDelegate);
              //sFormDataJson = this._getFormDataJSONStringOnSubmit(oDelegate);
            }
          else
          {sFormDataJson= this._getAllFormsJSONStringToCheck(oDelegate);}

        }
     	this._callFormBundleRules(sFormDataJson,oDelegate,ruleID,bValidate,fnCallback,bCheckBeforeSubmitCall);

             },

    prePopulateFields:function(oDelegate,ruleID,bPrepopulate,fnCallback){
   	 var oCurrentSelectedFilter = oDelegate.getSelectedFilter();
        var oCurrentSelectedFilterData = oCurrentSelectedFilter.data();
     var sCurrentFormNo = "1";
   if(oCurrentSelectedFilterData.CurrentFormNo){
   	sCurrentFormNo=oCurrentSelectedFilterData.CurrentFormNo;
   }
   var sFormID = oCurrentSelectedFilter.getKey();
   	var sFormDataJson="";
       var arr=[];
       var obj = {};
   	if(bPrepopulate &&  oDelegate.oCurrentFormBundle.StatusID===sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT)
   	{
          obj.Data=[];
          obj.FormNo=sCurrentFormNo;
   	        obj.FormId= sFormID;
   	        obj.FieldIndex="1";
            arr.push(obj);
            sFormDataJson= JSON.stringify(arr);
            this._callFormBundleRules(sFormDataJson,oDelegate,ruleID, !bPrepopulate,fnCallback);
   	}

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
/*  getFormBundleId:function(){


  },
setFormBundleId:function(oDelegate){

    this.FormBundleId ="" ;
  }*/
};