/*global window */
// Global variable
var STPformbundleid = 0;
var flagIndicatorSTP = "";
jQuery.sap.declare("sap.umc.mobile.forms.model.OnlineDataProvider");


sap.umc.mobile.forms.model.OnlineDataProvider = {
    _readForms: function(oDelegate,status) {
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {

        //payBillFlag setting must be done based on data read from customizing and straightthroughidflag

            // STPformbundleid = oData.FormBundleID;
        if (typeof oData.results != 'undefined' && oData.results instanceof Array ) {
          this.oForms.setSizeLimit(oData.results && oData.results.length);
            this.oForms.setData(oData);
            if (oDelegate != null) {
                        oDelegate.onFormsLoaded(this.oForms);
                    }
        }

      }, this);

                var sFormsPath = this.getAccountPath() + "FormBundles";
                if(!oDelegate.amendFormBundleID){
                  this.SERVICE.read(sFormsPath, [/*"$filter=StatusID eq '"+status+"'",*/"$format=json","$expand=Period",encodeURIComponent("$orderby=ReceiptDate asc")], false, {
                        fnSuccess: fnSuccess
                    },[], [{
                  name: 'StatusID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(status)
                },

                ]);
                }
                else{
                   this.SERVICE.read(sFormsPath, [/*"$filter=StatusID eq '"+sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT+"'",*/"$format=json","$expand=Period",encodeURIComponent("$orderby=ReceiptDate asc")], false, {
                         fnSuccess: fnSuccess
                     },[], [{
                  name: 'StatusID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT)
                },

                ]);
                }

    },

    //Begin c5257470

    _readInvoices: function(oDelegate) {
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {


        if (oData.results) {
          this.oInvoices.setSizeLimit(oData.results && oData.results.length);
          this.oInvoices.setData(oData);
          sap.umc.mobile.forms.js.utils.invoiceFormatter(this.oInvoices);
          this._determinePaymentState();

          for(var i=0;i<oData.results.length;i++)
          {
          if (oData.results[i].PaymentStateDescription == "Paid" && oData.results[i].AmountDue == "0.0000" && oData.results[i].AmountPaid == "0.0000" && oData.results[i].AmountRemaining == "0.0000")
            {
            oData.results.splice(i,1);
            }
          }

          if (oData.results)

            {

            if (oData.results[0].PaymentStateDescription == "Paid")
              {
              paymentflag = "X";
              }

            }

          if (oDelegate) {
            oDelegate.onInvoicesLoaded(this.oInvoices);
          }
        }

      }, this);

      var formbundleidSTP = STPformbundleid;
      var sInvoicePath = this.getAccountPath() + "Invoices";
      this.SERVICE.read(sInvoicePath, ["$format=json", "$expand=ContractAccount"], true, {
        fnSuccess: fnSuccess
      },[], [{
          name: 'FormBundleID',
          operator: sap.ui.model.FilterOperator.EQ,
          value: encodeURIComponent(formbundleidSTP)
        },

        ]);
    },

    _callInvoices: function(oDelegate) {
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {

        if(oData.results.length == 0)
          {
            oDelegate.onStraightThroughNotSelected();
            //  window.history.go(-1);
          }
        else if(oData.results.length > 0) {

            oDelegate.onStraightThroughProcess();
           }

      }, this);

            var fnError= jQuery.proxy(function(oData, oResponse) {

              oDelegate.onStraightThroughNotSelected();

            }, this);

      var formbundleidSTP = STPformbundleid;
      var sInvoicePath = this.getAccountPath() + "Invoices";
      this.SERVICE.read(sInvoicePath, ["$format=json", "$expand=ContractAccount"], true, {
        fnSuccess: fnSuccess
      },[], [{
          name: 'FormBundleID',
          operator: sap.ui.model.FilterOperator.EQ,
          value: encodeURIComponent(formbundleidSTP)
        },

        ]);

    },





    _callInvoicesUpdatedForm: function() {
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {

        if(oData.results.length == 0)
          {
          paymentnavigate.onStraightThroughNotSelected();
          payBillFlag = "";

            //  window.history.go(-1);
          }
        else if(oData.results.length > 0) {

         //payBillFlag
          paymentnavigate.onStraightThroughProcess();
           }

      }, this);

            var fnError= jQuery.proxy(function(oData, oResponse) {

              paymentnavigate.onStraightThroughNotSelected();
              payBillFlag = "";

            }, this);

      var formbundleidSTP = STPformbundleid;
      var sInvoicePath = this.getAccountPath() + "Invoices";
      this.SERVICE.read(sInvoicePath, ["$format=json", "$expand=ContractAccount"], true, {
        fnSuccess: fnSuccess
      },[], [{
          name: 'FormBundleID',
          operator: sap.ui.model.FilterOperator.EQ,
          value: encodeURIComponent(formbundleidSTP)
        },

        ]);

    },


    _callInvoiceForm: function() {

      var fnSuccess = jQuery.proxy(function(oData, oResponse) {

        if(oData.results.length == 0)
          {
            payBillflag = "";

          }
        else if(oData.results.length > 0) {

            if (oData.results[0].PaymentStateDescription == "Paid")
              {
              paymentnavigate.formSTPButtonDetermineText();
              }
            else
              {
              paymentnavigate.formSTPButtonDetermine();
              }
           }

      }, this);

            var fnError= jQuery.proxy(function(oData, oResponse) {

              payBillflag = "";

            }, this);

      var formbundleidSTP = STPformbundleid;
      var sInvoicePath = this.getAccountPath() + "Invoices";
      this.SERVICE.read(sInvoicePath, ["$format=json", "$expand=ContractAccount"], true, {
        fnSuccess: fnSuccess
      },[], [{
          name: 'FormBundleID',
          operator: sap.ui.model.FilterOperator.EQ,
          value: encodeURIComponent(formbundleidSTP)
        },

        ]);

    },


    getInvoicePdf: function(sInvoiceID) {
       window.open(this.SERVICE.getServiceUrl(sap.umc.mobile.private.app.Constants.ODATA_SERVICE_ERP) + "/Invoices('" + sInvoiceID + "')/InvoicePDF/$value", '_blank', 'location=no,toolbar=yes');
    },



    _constructBasePaymentPayload: function(dDate) {
      var oOneTimePayment = {
          PaymentDocumentItems: []
      };
      oOneTimePayment.AccountID = this.getAccountId();
      oOneTimePayment.PaymentMethodDescription = "";
      oOneTimePayment.Cardholder = "";
      oOneTimePayment.BankAccountID = "";
      oOneTimePayment.PaymentCardID = "";
      oOneTimePayment.CVC = "";
      oOneTimePayment.Currency = "";
      oOneTimePayment.Amount = "0";
      oOneTimePayment.PaymentCardTypeID = "";
      oOneTimePayment.CardNumber = "";
      oOneTimePayment.PaymentStatusID = "";
      oOneTimePayment.PaymentDocumentID = "";
      oOneTimePayment.ExecutionDate = dDate;
      return oOneTimePayment;
    },
    _constructBaseInvoicePayload: function(sInvoiceID, sPaymentAmount) {
      var oInvoiceEntity = {};
      oInvoiceEntity.InvoiceID = sInvoiceID;
      oInvoiceEntity.Amount = sPaymentAmount.replace(/,/, '');
      oInvoiceEntity.Currency = "";
      oInvoiceEntity.PaymentDocumentID = "";
      return oInvoiceEntity;
    },
    _createPaymentByCard: function(sCVC, dExecution, sPaymentCardID, sAmount, sInvoiceID, fnSuccess) {
      var oOneTimePayment = this._constructBasePaymentPayload(dExecution);
      oOneTimePayment.PaymentCardID = sPaymentCardID;
      oOneTimePayment.CVC = sCVC;
      oOneTimePayment.PaymentDocumentItems.push(this._constructBaseInvoicePayload(sInvoiceID, sAmount));
      this._postPaymentDocuments(oOneTimePayment, fnSuccess);
    },
    _createPaymentByBank: function(dExecution, sBankID, sAmount, sInvoiceID, fnSuccess) {
      var oOneTimePayment = this._constructBasePaymentPayload(dExecution);
      oOneTimePayment.BankAccountID = sBankID;
      oOneTimePayment.PaymentDocumentItems.push(this._constructBaseInvoicePayload(sInvoiceID, sAmount));
      this._postPaymentDocuments(oOneTimePayment, fnSuccess);
    },
    _createBalancePaymentByBank: function(dExecution, sBankID, sAmount, sCurrency, fnSuccess) {
      var oBalancePayment = this._constructBasePaymentPayload(dExecution);
      oBalancePayment.BankAccountID = sBankID;
      oBalancePayment.Amount = sAmount.toString();
      oBalancePayment.Currency = sCurrency;
      this._postPaymentDocuments(oBalancePayment, fnSuccess);
    },
    _createBalancePaymentByCard: function(sCVC, dExecution, sPaymentCardID, sAmount, sCurrency, fnSuccess) {
      var oBalancePayment = this._constructBasePaymentPayload(dExecution);
      oBalancePayment.PaymentCardID = sPaymentCardID;
      oBalancePayment.CVC = sCVC;
      oBalancePayment.Currency = sCurrency;
      oBalancePayment.Amount = sAmount.toString();
      this._postPaymentDocuments(oBalancePayment, fnSuccess);
    },

    _postPaymentDocuments: function(oPayload, fnSuccess) {
      this.SERVICE.createEntity("PaymentDocuments", oPayload, {
        fnSuccess: fnSuccess
      });
    },

    _readPaymentMethods: function(fnProviderCallBack) {
      var sBanksPath = this.getAccountPath() + "BankAccounts";
      var sCardsPath = this.getAccountPath() + "PaymentCards";
      var oBanks = null;
      var oCards = null;
      var fnCardsSuccess = jQuery.proxy(function(oData, oResponse) {
        oCards = oData;
        fnProviderCallBack(oBanks, oCards);
      }, this);
      var fnBanksSuccess = jQuery.proxy(function(oData, oResponse) {
        oBanks = oData;
        this.SERVICE.read(sCardsPath, ["$format=json", "$expand=PaymentCardType"], true, {
          fnSuccess: fnCardsSuccess
        });
      }, this);

      this.SERVICE.read(sBanksPath, ["$format=json", "$expand=Bank"], true, {
        fnSuccess: fnBanksSuccess
      });
    },

    _removePaymentDocument: function(oDelegate, oPaymentDocument) {
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        oDelegate.onCancelPaymentSuccess();
      }, oDelegate);
      oPaymentDocument.PaymentDocumentID = oPaymentDocument.PaymentDocumentID.replace("\\","%5C");

      this.SERVICE.removeEntity("/PaymentDocuments", ["PaymentDocumentID=\'" + oPaymentDocument.PaymentDocumentID + "\'"], {
        fnSuccess: fnSuccess
      });
    },

    //End c5257470


    _readFormData: function(data,oCallBacks) {

      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        //set etag for currently form read, and if on moving to another icontab filter
        //and read formdata/ read forminstances returns a new etag prompt to refresh

    var eTag = oResponse.data.__batchResponses[0].headers.etag;
    if(eTag && this.sEtag){
      if(!(eTag === this.sEtag)){
        //error - etag mismatch, pop for refresh of data
        if(oCallBacks.fnErrorEtag)
         oCallBacks.fnErrorEtag(oData, oResponse);
      }
      else{
        if(oCallBacks.fnSuccess)
        oCallBacks.fnSuccess(oData, oResponse);
      }
    }
    else if(eTag && !this.sEtag){
      this.sEtag = eTag;
      if(oCallBacks.fnSuccess)
       oCallBacks.fnSuccess(oData, oResponse);
    }

      }, this);
      var fnError = jQuery.proxy(function(oData, oResponse) {
        if(oCallBacks.fnError)
        oCallBacks.fnError(oData, oResponse);
      }, this);
            var sDisplayFormPath = "GetFormData";

            this.SERVICE.read(sDisplayFormPath , ["FormBundleID="+data.FormBundleID,"FormID="+data.FormID,"FormNo="+data.CurrentFormNo,"TableForm="+data.TableForm,/*"TfTop=1000000","TfSkip=0",*/"$format=json"], false, {
                fnSuccess:fnSuccess,
                fnError:fnError
            });
        },


/*       _readTableForm: function(oDelegate,data,status) {

            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                var a=jQuery.parseJSON(oData.FormData);
                var formData=[];
                if(a && a.length){
                    $.each(a, function( index, value ) {
                        var row={};
                        $.each(value.DATA, function( index, e ) {
                        row[e.FIELDNAME]=e.FIELDVALUE;
                         });
                        formData.push(row);
                    });
                }
                oDelegate.displayFormData(formData,data.TableForm);
            }, this);
            var sDisplayFormPath = "GetFormData";
            this.SERVICE.read(sDisplayFormPath , ["FormBundleID="+data.FormBundleID,"FormID="+data.FormID,"FormNo="+data.CurrentFormNo,"TableForm="+data.TableForm,"$format=json",], false, {
                fnSuccess: fnSuccess
            });
        },*/

    //done c5221606 get form data json based for save draft and check functionality - for current form
   _createForm: function(oDelegate,data,StatusID,bSyncCall,tableFormData,fn) {
   	if (fn){
    	that = this;
    	that.fn = fn;
    	}
   	
          if(bSyncCall){
            this.SERVICE.createEntitySync = function(sEntityName, oEntityData, oCallbacks, oContext) {
              this._asyncRequestStart();
              this.oServiceModel.setUseBatch(false);
              var mParameters = {};
              mParameters.context = null;
              mParameters.success = jQuery.proxy(function(oData, oResponse) {
                this._asyncRequestFinish();
                if (oCallbacks && oCallbacks.fnSuccess) {
                  oCallbacks.fnSuccess.call(this, oData, oResponse, oContext);
                }
              }, this);
              mParameters.error = jQuery.proxy(function(oError) {
                this._asyncRequestFinish(oError);
                if (oCallbacks && oCallbacks.fnError) {
                  oCallbacks.fnError.call(this, oError);
                }
              }, this);
              mParameters.async = false;
              this.oServiceModel.create(sEntityName, oEntityData, mParameters);
            }
          }
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
            	oDelegate.getView().byId("idFormSubmit").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormSave").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormValidate").setEnabled(true);
              this.sEtag = oResponse.data.__batchResponses[0].__changeResponses[0].headers.etag;
                if(oData && oData.FormBundleID){

                  if(StatusID && StatusID.toLowerCase()==="submitted"){
                  //  oDelegate.onFormSaved(oData.d.FormBundleID);
                  //payment tab should be enabled c5221606 on submit only
                  //  oDelegate.onFormBundleIdCreationSuccess();


                     	 //submitted and processed successfully.

                    if (oData.StraightThroughID == "X")
                      {
                      flagIndicatorSTP = "X";
                      STPformbundleid = oData.FormBundleID;
                      oDelegate.invoiceDialogOpen(oData.FormBundleID);
                      oDelegate.onFormSaved(oData.FormBundleID,StatusID);
                      oDelegate.onStriaghtThroughProcessValidation();

                      }

                    else
                      {
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.FormBundleID]),oData.FormBundleID,StatusID,tableFormData);
                      oDelegate.onStraightThroughNotSelected();
                      payBillFlag = "";
                      }

                    oDelegate.updateFormsData();



                    /*   var oOverlayContainer = new sap.ui.ux3.OverlayContainer({openButtonVisible:false}).addStyleClass("backgroundPrivateApp" );
                    var overLayText = oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.FormBundleID]);
                    oOverlayContainer.addContent(new sap.ui.commons.TextView({text: overLayText}).addStyleClass("sapUmcSubsectionHeading" ).addStyleClass("sapUmcVerticalAfterSpacingX1" ).addStyleClass("sapUmcVerticalBeforeSpacingX2"
).addStyleClass("sapUmcHorizontalBeforeSpacingX4 " ));
                        //"sapUmcVerticalAfterSpacingX1 sapUmcVerticalBeforeSpacingX2"
                    oOverlayContainer.open();*/


                    //1.new form created and submitted successfully , everything non editable
                    //but before this genrate formdata for submit
                    }else if(StatusID && StatusID.toLowerCase()==="draft"){
                    oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SAVED_SUCCESSFULLY",[oData.FormBundleID]),oData.FormBundleID,StatusID,tableFormData);
                  //payment tab should be enabled c5221606
                    /*oDelegate.onFormBundleIdCreationSuccess();*/
                    //2.new form created and save draft successfully-only save data locally with flag bEdited false
                    oDelegate.updateFormsData();
                  /*  if(oUploadParameters){
                    oDelegate.oAttachmentsController.handleAttachment(oUploadParameters);
                  }*/
                    }
                }
                
            	if (that.fn){
            		that.fn();
                	}
            	
            }, this);
            var fnError= jQuery.proxy(function(oData, oResponse) {
            	oDelegate.getView().byId("idFormSubmit").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormSave").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormValidate").setEnabled(true);
            	
                if(StatusID && StatusID.toLowerCase()==="submitted"){
                body=JSON.parse(oData.response.body);
                errorDetails = body.error.innererror.errordetails;
                if(errorDetails.length && errorDetails[1]&& errorDetails[1].message)
                oDelegate.onSubmitFailure(errorDetails[1].message);
                }
            }, this);
            /*var fnError= jQuery.proxy(function(oData, oResponse) {
                if(StatusID && StatusID.toLowerCase()==="draft"){
                body=JSON.parse(oData.response.body);
                errorDetails = body.error.innererror.errordetails;
                oDelegate.onValidateSuccess(errorDetails[0].message,errorDetails[1].message);
                }
            }, this);*/
            var sFormsPath = this.getAccountPath() + "FormBundles";
            if(bSyncCall){
            this.SERVICE.createEntitySync(sFormsPath, data,{
                fnSuccess: fnSuccess,
                fnError:fnError
            },oDelegate);
            }
            else{

                this.SERVICE.createEntity(sFormsPath, data,{
                    fnSuccess: fnSuccess,
                    fnError:fnError
                },oDelegate);


            }
        },
        //done for save draft button not submit button
        _updateForm: function(oDelegate,data,formId,StatusID,bSyncCall,tableFormData,fn) {
          //sync update with etag handling in service wrapper
        	if (fn){
        	that = this;
        	that.fn = fn;
        	}
          if(bSyncCall){
            this.SERVICE.updateEntitySync = function(sCollectionName, aEntityId, oEntityData, oCallbacks, sETag) {

              this._asyncRequestStart();
              var mParameters = {};
              mParameters.context = null;
              mParameters.success = jQuery.proxy(function(oData, oResponse) {
                this._asyncRequestFinish();
                if (oCallbacks && oCallbacks.fnSuccess) {
                  oCallbacks.fnSuccess.call(this, oData, oResponse);
                }
              }, this);
              mParameters.error = jQuery.proxy(function(oError) {
                this._asyncRequestFinish(oError);
                if (oCallbacks && oCallbacks.fnError) {
                  oCallbacks.fnError.call(this, oError);
                }
              }, this);
              mParameters.async = false;
              if(sETag){
                mParameters.eTag = sETag;
              }
              var sEntityId = this._parseEntityIds(aEntityId);
              this.oServiceModel.update(sCollectionName + sEntityId, oEntityData, mParameters);
            }
          }
          //async etag update handling in service wrapper
          this.SERVICE.updateEntity = function(sCollectionName, aEntityId, oEntityData, oCallbacks, sETag) {

          this._asyncRequestStart();
          var mParameters = {};
          mParameters.context = null;
          mParameters.success = jQuery.proxy(function(oData, oResponse) {
            this._asyncRequestFinish();
            if (oCallbacks && oCallbacks.fnSuccess) {
              oCallbacks.fnSuccess.call(this, oData, oResponse);
            }
          }, this);
          mParameters.error = jQuery.proxy(function(oError) {
            this._asyncRequestFinish(oError);
            if (oCallbacks && oCallbacks.fnError) {
              oCallbacks.fnError.call(this, oError);
            }
          }, this);
          mParameters.async = true;
          if(sETag){
            mParameters.eTag = sETag;
          }
          var sEntityId = this._parseEntityIds(aEntityId);
          this.oServiceModel.update(sCollectionName + sEntityId, oEntityData, mParameters);
        }

            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
            	oDelegate.getView().byId("idFormSubmit").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormSave").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormValidate").setEnabled(true);
            //  ***********//call getEntity to get current timestamp and put in this.sEtag
               this._readExistingForms({FormBundleID : oDelegate.oCurrentFormBundle.FormBundleID,FormID : "1" },null,true);


/*               oDelegate.invoiceDialogOpen(STPformbundleid);
                 oDelegate.onStriaghtThroughProcessValidation();*/


               	STPformbundleid = oDelegate.oCurrentFormBundle.FormBundleID;
             //  	this._callInvoicesUpdatedForm(); ACASTANEDA 

               	if (flagIndicatorSTP == "X" )
                  {
                  oDelegate.invoiceDialogOpen(STPformbundleid);
                  }

/*               	else
                  {
                 	oDelegate.onStraightThroughNotSelected();
                 	payBillFlag = "";
                  }*/


/*              if (oData)

          {
                 	 if (oData.StraightThroughID == "X")
                    {
                    STPformbundleid = oDelegate.oCurrentFormBundle.FormBundleID;
                  oDelegate.invoiceDialogOpen(STPformbundleid);
                    oDelegate.onStriaghtThroughProcessValidation();
                    }

          }

              else
                {
                 	oDelegate.onStraightThroughNotSelected();
                 	payBillFlag = "";
                }*/

/*
                 if (oData.StraightThroughID == "X")
                 	{
                 	STPformbundleid = oDelegate.oCurrentFormBundle.FormBundleID;
                oDelegate.invoiceDialogOpen(STPformbundleid);
                 	oDelegate.onStriaghtThroughProcessValidation();
                 	}

                 else
                 	{
                 	oDelegate.onStraightThroughNotSelected();
                 	payBillFlag = "";
                 	}*/

                if(oData && oData.d.FormBundleID){
                    if(StatusID && StatusID.toLowerCase()==="submitted"){

                       	if (flagIndicatorSTP == "X" )
                      {
                          oDelegate.onFormSaved(oData.d.FormBundleID,StatusID);
                      }

                       	else
                          {
                          oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                          }

/*                      if (oData)
                      {
                          if (oData.StraightThroughID == "X")
                        {
                          oDelegate.onFormSaved(oData.d.FormBundleID,StatusID);
                        }

                          else
                        {
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                        }

                      }

                      else
                        {
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                        }*/

  /*                    if (oData.StraightThroughID == "X")
                        {
                          oDelegate.onFormSaved(oData.d.FormBundleID,StatusID);
                        }

                      else
                        {
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                        }*/
                        oDelegate.updateFormsData();


        // c5257470     oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                        //3.existing form submittedt successfully-generate formdata for submit, whole form non editable
        // c5257470     oDelegate.updateFormsData();

                        //  oDelegate.onFormSaved(oData.d.FormBundleID);
                        }else if(StatusID && StatusID.toLowerCase()==="draft"){
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SAVED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                        //4.existing form save draft successfully-only save data locally with flag bEdited false
                        oDelegate.updateFormsData();
                       /* var oOverlayContainer = new sap.ui.ux3.OverlayContainer({openButtonVisible:false}).addStyleClass("sapUmcHorizontalBeforeSpacingX4 " );
                        var overLayText = oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.FormBundleID]);
                        oOverlayContainer.addContent(new sap.ui.commons.TextView({text: overLayText}).addStyleClass("sapUmcSubsectionHeading" ).addStyleClass("sapUmcVerticalAfterSpacingX1" ).addStyleClass("sapUmcVerticalBeforeSpacingX2"
).addStyleClass("sapUmcHorizontalBeforeSpacingX4 " ));
                        oOverlayContainer.open();*/

                        }
                }else{
                    if(StatusID && StatusID.toLowerCase()==="submitted"){



                       	if (flagIndicatorSTP == "X" )
                      {
                          oDelegate.onFormSaved(formId,StatusID);
                      }

                       	else
                          {
                       		
                       	if(oDelegate.oCurrentFormBundle.FormBundleTypeID == "ZBPL") // ACASTANEDA ,se muestra mensaje satisfactorio en formulario plusvalia
                       		{
	                		var dialog = new sap.m.Dialog({
	        					title: '',
	        					type: 'Message',
	        						content: new sap.m.Text({
	        							text: sap.ui.getCore().getModel("i18n").getProperty("ZPLU.MSGSUCESS")
	        						}),
	        					beginButton: new sap.m.Button({
	        						text: 'OK',
	        						press: function () {
	        							dialog.close();
	        						}
	        					}),
	        					afterClose: function() {
	        						dialog.destroy();
	        					}
	        				})
	        				dialog.open();
                       		}
                          oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[formId]),formId,StatusID,tableFormData);
                          }


/*                      if (oData)
                      {

                          if (oData.StraightThroughID == "X")
                        {
                          oDelegate.onFormSaved(formId,StatusID);
                        }
                      else
                        {
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[formId]),formId,StatusID,tableFormData);
                        }
                      }

                      else
                        {
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[formId]),formId,StatusID,tableFormData);
                        }*/


/*                      if (oData.StraightThroughID == "X")
                    {
                      oDelegate.onFormSaved(formId,StatusID);
                    }
                  else
                    {
                    oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                    }*/
                    oDelegate.updateFormsData();


          // c5257470  oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[formId]),formId,StatusID,tableFormData);
          // c5257470  oDelegate.updateFormsData();
                    // oDelegate.onFormSaved(formId);
                    }else{
                      oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SAVED_SUCCESSFULLY",[formId]),formId,StatusID,tableFormData);
                      oDelegate.updateFormsData();
                    }
                }
            	if (that.fn){
            		that.fn();
                	}

            }, this);

            var fnError= jQuery.proxy(function(oData, oResponse) {
             	oDelegate.getView().byId("idFormSubmit").setEnabled(true); //change for incident ACASTANEDA	
            	oDelegate.getView().byId("idFormSave").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormValidate").setEnabled(true);
              //******if already submitted
              var oErrorBody = JSON.parse(oData.response.body);
              var oError = oErrorBody.error.innererror.errordetails[0];
              if(oError.code==="FMCA_MC_ODATA/025"){
                oDelegate.oCurrentFormBundle.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
                oDelegate.oCurrentFormBundle.StatusText = "Submitted";
                oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_CHANGE_NOT_POSSIBLE"));
                if(this._getEtagAlert(oDelegate)){

                        this.alertDialog.open();  }
                //oDelegate.onRouteMatched();
              }
                //  ***********//check status 412 here
              else if(oData.response.statusCode === "412"){
                  /*  this._readExistingForms({FormBundleID : oDelegate.oCurrentFormBundle.FormBundleID,FormID : "1" },null,true);
              if(this.sStatus === "SUBMITTED"){
                  oDelegate.oCurrentFormBundle.StatusID = sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT;
                  oDelegate.oCurrentFormBundle.StatusText = "Submitted";
                  oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, "Form has been submitted. Change is not possible.");
                  //if popup yes then,



               	}else{*/
                  oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oDelegate.getText("FORMS.FORM_UPDATED"));

             /*  	}*/
                if(this._getEtagAlert(oDelegate)){
                        this.alertDialog.open();  }
                 //oDelegate.onRouteMatched();
        }
              else if(StatusID && StatusID.toLowerCase()==="submitted"){
                body=JSON.parse(oData.response.body);
                errorDetails = body.error.innererror.errordetails;
                if(errorDetails && errorDetails[1] && errorDetails[1].message)
                oDelegate.onSubmitFailure(errorDetails[1].message);
                }
            }, this);

            var sFormsPath ="FormBundles";
            var oThis = this;
           if(oDelegate.amendOriginal){
             data.d.StatusID = "AMENDED";
           }
            if(bSyncCall){
                this.SERVICE.updateEntitySync(sFormsPath,["'"+formId+"'"], data,{
                    fnSuccess: fnSuccess,
                   fnError:fnError
                },oThis.sEtag);}
                else{
            this.SERVICE.updateEntity(sFormsPath,["'"+formId+"'"], data,{
                fnSuccess: fnSuccess,
               fnError:fnError
            },oThis.sEtag);}

        },
      _readFormBundleTypes: function(oDelegate) {

            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
            //generating all available icontabbarfilters data possible
            var oAvailableIconTabFiltersData = {};
              //fix start - form title

                if(!oDelegate.oCurrentFormBundle.FormBundleTypeDescription){
                  if(oData.results.length)
                  oDelegate.oCurrentFormBundle.FormBundleTypeDescription  = oData.results[0].FormBundleTypeDescription;

                }
              //fix end - form title

              //fix start -max instance


                $.each(oData.results, function( index, oFormBundleType ) {
                  if(!(oFormBundleType.MaximumInstances && parseInt(oFormBundleType.MaximumInstances))){
                    oFormBundleType.MaximumInstances = oDelegate.defaultMaxInstance;
                  }
                }
                );
                //fix end -max instance
                    $.each(oData.results, function( index, oFormBundleType ) {
                      oAvailableIconTabFiltersData[oFormBundleType.FormID] = jQuery.extend( true, {} ,oFormBundleType);
                      //oAvailableIconTabFiltersData[oFormBundleType.FormID].FormBundleID=oDelegate.oCurrentFormBundle.FormBundleID;
                      oAvailableIconTabFiltersData[oFormBundleType.FormID].icon="sap-icon://form";
                      //oAvailableIconTabFiltersData[oFormBundleType.FormID].StatusID=oDelegate.oCurrentFormBundle.StatusID;
                      //Below flag added to differentiate between a tab for form bundletype
                      oAvailableIconTabFiltersData[oFormBundleType.FormID].bFormBundleType=true;
                      });

                  if(oDelegate.oAvailableTableForms &&
                      oDelegate.oAvailableTableForms[oDelegate.oCurrentFormBundle.FormBundleTypeID]
                  &&
              oDelegate.oAvailableTableForms[oDelegate.oCurrentFormBundle.FormBundleTypeID].length
                  ){
                    for(var i = 0;i<oDelegate.oAvailableTableForms[oDelegate.oCurrentFormBundle.FormBundleTypeID].length;i++){
                          var oIconTabFilter={};
                          oIconTabFilter.FormDescription=oDelegate.oAvailableTableForms[oDelegate.oCurrentFormBundle.FormBundleTypeID][i].FormDescription;
                          oIconTabFilter.icon="sap-icon://list";
                          oIconTabFilter.FormID=oDelegate.oAvailableTableForms[oDelegate.oCurrentFormBundle.FormBundleTypeID][i].FormID;
                          oIconTabFilter.bTableForm=true;
                         // oIconTabFilter.FormBundleTypeID=oDelegate.oCurrentFormBundle.FormBundleTypeID;
                         // oIconTabFilter.PeriodID=oDelegate.oCurrentFormBundle.PeriodID;
                          //oIconTabFilter.FormBundleID=oDelegate.oCurrentFormBundle.FormBundleID;
                          //oIconTabFilter.StatusID=oDelegate.oCurrentFormBundle.StatusID;
                          oAvailableIconTabFiltersData[oIconTabFilter.FormID] = oIconTabFilter;
                     /*   oAvailableIconTabFiltersData[oIconTabFilter.FormID].bTableForm=true;*/
                          }

                  }

                    oIconTabFilter={};
                    oIconTabFilter.FormDescription=oDelegate.getText("FORMS.ATTACHMENTS");
                    oIconTabFilter.icon="sap-icon://attachment";
                    oIconTabFilter.FormID="attachments";
                    //oIconTabFilter.FormBundleTypeID=oDelegate.oCurrentFormBundle.FormBundleTypeID;
                    //oIconTabFilter.PeriodID=oDelegate.oCurrentFormBundle.PeriodID;
                   // oIconTabFilter.FormBundleID=oDelegate.oCurrentFormBundle.FormBundleID;
                    //oIconTabFilter.StatusID=oDelegate.oCurrentFormBundle.StatusID;
                    oAvailableIconTabFiltersData[oIconTabFilter.FormID] = oIconTabFilter;

                    oIconTabFilter={};
                    oIconTabFilter.FormDescription=oDelegate.getText("USER_PROFILE.SUBMIT");
                    oIconTabFilter.icon="sap-icon://paper-plane";
                    oIconTabFilter.FormID="submit";
                    //oIconTabFilter.FormBundleTypeID=oDelegate.oCurrentFormBundle.FormBundleTypeID;
                    //oIconTabFilter.PeriodID=oDelegate.oCurrentFormBundle.PeriodID;
                   // oIconTabFilter.FormBundleID=oDelegate.oCurrentFormBundle.FormBundleID;
                    //oIconTabFilter.StatusID=oDelegate.oCurrentFormBundle.StatusID;
                    oAvailableIconTabFiltersData[oIconTabFilter.FormID] = oIconTabFilter;

                    oIconTabFilter={};
                    oIconTabFilter.FormDescription=oDelegate.getText("FORMS.PAYMENT");
                    oIconTabFilter.icon="sap-icon://simple-payment";
                    oIconTabFilter.FormID="payment";
                    //oIconTabFilter.FormBundleTypeID=oDelegate.oCurrentFormBundle.FormBundleTypeID;
                    //oIconTabFilter.PeriodID=oDelegate.oCurrentFormBundle.PeriodID;
                   // oIconTabFilter.FormBundleID=oDelegate.oCurrentFormBundle.FormBundleID;
                    //oIconTabFilter.StatusID=oDelegate.oCurrentFormBundle.StatusID;
                    oAvailableIconTabFiltersData[oIconTabFilter.FormID] = oIconTabFilter;

                    oDelegate.onFormBundleTypesLoaded(oAvailableIconTabFiltersData);
            }, this);
            //fix - add form
           var fnError = $.proxy(function(){
             oDelegate.getRouter().myNavBack();
           },this);
                var sFormBundleTypesPath = "FormBundleTypes";
                if(oDelegate.bPeriodBased) {
                  this.SERVICE.read(sFormBundleTypesPath ,
[/*"$filter=FormBundleTypeID eq '"+oDelegate.oCurrentFormBundle.FormBundleTypeID+"' and "+"PeriodID eq '"+oDelegate.oCurrentFormBundle.PeriodID+"'",*/"$format=json",], false, {
                        fnSuccess: fnSuccess,
                        //fix - add form
                        fnError: fnError
                    },[],[{
                      name: 'FormBundleTypeID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(oDelegate.oCurrentFormBundle.FormBundleTypeID)
                    },
                    {
                      name: 'PeriodID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(oDelegate.oCurrentFormBundle.PeriodID)
                    }
                    ]);       }
            else if(oDelegate.bKeyDateBased){
              this.SERVICE.read(sFormBundleTypesPath , [/*"$filter=FormBundleTypeID eq '"+oDelegate.oCurrentFormBundle.FormBundleTypeID+"' and "+"KeyDate eq '"
                                                        +sap.umc.mobile.forms.js.utils.formatDateKey(oDelegate.oCurrentFormBundle.KeyDate)+"'",*/"$format=json",], false, {
                        fnSuccess: fnSuccess,
                        //fix - add form
                        fnError: fnError
                    },[],[{
                      name: 'FormBundleTypeID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(oDelegate.oCurrentFormBundle.FormBundleTypeID)
                    },
                    {
                      name: 'KeyDate',
                  operator: sap.ui.model.FilterOperator.EQ,
                  //fix - add form
                  value: sap.umc.mobile.forms.js.utils.formatDateKey(oDelegate.oCurrentFormBundle.KeyDate)
                    }
                    ]);	}
            else if(oDelegate.bNoTimeDependency){
              this.SERVICE.read(sFormBundleTypesPath , [/*"$filter=FormBundleTypeID eq '"+oDelegate.oCurrentFormBundle.FormBundleTypeID+"'",*/"$format=json",], false, {
                        fnSuccess: fnSuccess,
                        //fix - add form
                        fnError: fnError
                    },[],[{
                      name: 'FormBundleTypeID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(oDelegate.oCurrentFormBundle.FormBundleTypeID)
                    }
                    ]);	}

        },


        _readExistingForms: function(data,oCallBacks,bUpdateEtag){
          var sFormBundleTypesPath = "GetForms";

          var fnSuccess = jQuery.proxy(function(oData, oResponse) {

            STPformbundleid = oData.FormBundleID;

           // this._callInvoiceForm();//ACASTANEDA

            var eTag = oResponse.data.__batchResponses[0].headers.etag;
            this.sStatus = oData.StatusID;
            if(!bUpdateEtag){
            //set etag for currently form read, and if on moving to another icontab filter
        //and read formdata/ read forminstances returns a new etag prompt to refresh

    if(eTag && this.sEtag){
      if(!(eTag === this.sEtag)){
        //error - etag mismatch, pop for refresh of data

         oCallBacks.fnErrorEtag(oData, oResponse);
      }
      else{
        oCallBacks.fnSuccess(oData, oResponse);
      }


    }
    else if(eTag && !this.sEtag){
      this.sEtag = eTag;
       oCallBacks.fnSuccess(oData, oResponse);
    }
          }
            else{
              //only to update eTag after each update

              this.sEtag  = eTag;

            }

      }, this);
            this.SERVICE.read(sFormBundleTypesPath , ["FormBundleID="+"'"+data.FormBundleID+"'","FormID="+"'"+data.FormID+"'","$format=json"], false, {
                fnSuccess: fnSuccess
            });

        },
        _validateForm:function(oDelegate,data,bValidate,fnCallback,bCheckBeforeSubmitCall){
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
            	oDelegate.getView().byId("idFormSubmit").setEnabled(true); //change for incident ACASTANEDA	
            	oDelegate.getView().byId("idFormSave").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormValidate").setEnabled(true);
            	//oDelegate.getView().byId("idFormIconTabBar").setVisible(true);
                fnCallback(oData.MessageData,oData.FormData,bValidate,bCheckBeforeSubmitCall);
            }, this);
            

        		textStatus = "";  // ACASTANEDA Mostraba mensaje undefined cuando no se tenia estado
        	
            var fnError = jQuery.proxy(function(jqXHR, textStatus, errorThrown) {
            	oDelegate.getView().byId("idFormSubmit").setEnabled(true); //change for incident ACASTANEDA	
            	oDelegate.getView().byId("idFormSave").setEnabled(true); //change for incident ACASTANEDA
            	oDelegate.getView().byId("idFormValidate").setEnabled(true);
            	if (textStatus == undefined ){
            		textStatus = "";  // ACASTANEDA Mostraba mensaje undefined cuando no se tenia estado
            	}
            	
            	if (oDelegate.oCurrentFormBundle.FormBundleTypeID == 'ZCOP' || oDelegate.oCurrentFormBundle.FormBundleTypeID == 'ZICA' ){
            		//oDelegate.getView().byId("idFormIconTabBar").setVisible(false);
                	//oDelegate.getView().byId("idFormSubmit").setEnabled(false); 	
                	//oDelegate.getView().byId("idFormSave").setEnabled(false); 
                	//oDelegate.getView().byId("idFormValidate").setEnabled(false);
            		var a = JSON.parse(jqXHR.response.body);
            		if (a.error.code == "ZRENTAS/311" || a.error.code == "ZRENTAS/309"){
                	oDelegate.getRouter().backToHome();
            		}
            	}   	
                oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, textStatus);
            }, this);
            var sFormsPath = "FormBundleRules";
            this.SERVICE.createEntity(sFormsPath, data,{
                fnSuccess: fnSuccess,
                fnError:fnError
            },oDelegate);
        },

        _getAttachments: function(oDelegate,fnCallback) {
            var serviceUrl = this.SERVICE.getServiceUrl();
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                    $.each(oData.results, function( index, e ) { e.Url=serviceUrl+"/FormBundleAttachments('"+e.AttachmentID+"')/$value";
                    });
                    fnCallback(oData);
            }, this);

                var sFormBundleTypesPath = "FormBundleAttachments";
                this.SERVICE.read(sFormBundleTypesPath , [/*"$filter=FormBundleID eq '"+oDelegate.oCurrentFormBundle.FormBundleID+"'",*/"$format=json",], false, {
                    fnSuccess: fnSuccess
                },[],[{
              name: 'FormBundleID',
              operator: sap.ui.model.FilterOperator.EQ,
              value: encodeURIComponent(oDelegate.oCurrentFormBundle.FormBundleID)
            }]);
        },
        //c5221606
        _readPaymentMethodsForms: function(fnProviderCallBack) {
      var sBanksPath = this.getAccountPath() + "BankAccounts";
      var sCardsPath = this.getAccountPath() + "PaymentCards";
      /*var oBanks = null;
      var oCards = null;*/

      var oCardDeferred = jQuery.Deferred();
      var oBankDeferred = jQuery.Deferred();
      var fnCardsSuccess = jQuery.proxy(function(oData, oResponse) {
        oCardDeferred.resolve(oData);

        /*oCards = oData;*/
        /*
        oCards = oData;
        fnProviderCallBack(oBanks, oCards);
      */}, this);
      var fnBanksSuccess = jQuery.proxy(function(oData, oResponse) {

        oBankDeferred.resolve(oData);
        /*oBanks = oData;*/
        /*
        oBanks = oData;
        this.SERVICE.read(sCardsPath, ["$format=json", "$expand=PaymentCardType"], true, {
          fnSuccess: fnCardsSuccess
        });
      */}, this);

      this.SERVICE.read(sBanksPath, ["$format=json", "$expand=Bank"], true, {
        fnSuccess: fnBanksSuccess
      });

      this.SERVICE.read(sCardsPath, ["$format=json", "$expand=PaymentCardType"], true, {
        fnSuccess: fnCardsSuccess
      });

    jQuery.when(oBankDeferred,oCardDeferred).then(function(oBanks,oCards){
      fnProviderCallBack(oBanks, oCards);
    });
    },

        getFormBundlesForFilingObligation:function(data,fnCallback){
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                fnCallback(oData);
        }, this);

            var sFormBundles =this.getAccountPath()+"FormBundles";


            if(data.PeriodID) {
                this.SERVICE.read(sFormBundles , [/*"$filter=FormBundleTypeID eq '"+data.FormBundleTypeID+"' and PeriodID eq '"+data.PeriodID+"'",*/"$format=json",], false, {
                      fnSuccess: fnSuccess
                  },[],[{
                name: 'FormBundleTypeID',
              operator: sap.ui.model.FilterOperator.EQ,
              value: encodeURIComponent(data.FormBundleTypeID)
            },
            {
                name: 'PeriodID',
              operator: sap.ui.model.FilterOperator.EQ,
              value: encodeURIComponent(data.PeriodID)
            }]);

            }
        else if(data.KeyDate){
            this.SERVICE.read(sFormBundles ,
      [/*"$filter=FormBundleTypeID eq '"+data.FormBundleTypeID+"' and KeyDate eq '"+sap.umc.mobile.forms.js.utils.formatDateKey(data.KeyDate)+"'",*/"$format=json",], false, {
                      fnSuccess: fnSuccess
                  },[],[{
                  name: 'FormBundleTypeID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(data.FormBundleTypeID)
                },
                {
                  name: 'KeyDate',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(sap.umc.mobile.forms.js.utils.formatDateKey(data.KeyDate))
                },
                ]);
        }
        else {
            this.SERVICE.read(sFormBundles , [/*"$filter=FormBundleTypeID eq '"+data.FormBundleTypeID+"'",*/"$format=json",], false, {
                      fnSuccess: fnSuccess
                  },[],[{
                  name: 'FormBundleTypeID',
                  operator: sap.ui.model.FilterOperator.EQ,
                  value: encodeURIComponent(data.FormBundleTypeID)
                }]);
        }


        },

        formsFilterJSON:function(oDelegate){
            var filterJson={
                    "FormsFilter": [
                                          {
                                              "Id": "draft",
                                              "Name":sap.ui.getCore().getModel("i18n").getProperty("FORMS.DRAFT"),

                                          },
                                          {
                                              "Id": "submitted",
                                              "Name": sap.ui.getCore().getModel("i18n").getProperty("FORMS.SUBMITTED"),

                                          },]};
            var oModel = new sap.ui.model.json.JSONModel(filterJson);
            oDelegate.getView().setModel(oModel);
        },
        //c5221606
        _createPaymentByBankForForms: function(dExecution, sBankID, sAmount,sFormBundleId,sCurr, fnSuccess) {
      var oOneTimePayment = this._constructBasePaymentPayloadForForms(dExecution);
      oOneTimePayment.BankID = sBankID;
      oOneTimePayment.Amount = sAmount;
      oOneTimePayment.FormBundleID =sFormBundleId;
      oOneTimePayment.Currency = sCurr;
      //oOneTimePayment.PaymentDocumentItems.push(this._constructBaseInvoicePayload(sInvoiceID, sAmount));
      this._postPaymentOnAccounts(oOneTimePayment, fnSuccess);
    },
        //c5221606
    _postPaymentOnAccounts: function(oPayload, fnSuccess) {
      this.SERVICE.createEntity("PaymentOnAccounts", oPayload, {
        fnSuccess: fnSuccess
      });
    },
     //c5221606
    _constructBasePaymentPayloadForForms: function(dDate) {
      var oOneTimePayment = {

      };
      oOneTimePayment.AccountID = this.getAccountId();
      oOneTimePayment.BankID = "";
      oOneTimePayment.FormBundleID = "";
      oOneTimePayment.CardNumber = "";
      oOneTimePayment.CVC = "";
      oOneTimePayment.Amount = "0";




      //ask bout the below field
      oOneTimePayment.Currency = "";

      oOneTimePayment.EffectiveDate = dDate;
      oOneTimePayment.PaymentCardID = "";
      oOneTimePayment.ValidFrom = null;
      oOneTimePayment.ValidTo = null;
      oOneTimePayment.CardHolder = "";

      oOneTimePayment.PaymentCardTypeID = "";

      oOneTimePayment.DocumentID = "";
      //not needed to send these fields
      oOneTimePayment.RevenueTypeID = "";
      oOneTimePayment.ContractAccountID = "";
      oOneTimePayment.ContractObjectID = "";
      //ask
      oOneTimePayment.PeriodID = "";
      return oOneTimePayment;
    },

    _createPaymentByCardForForms: function(sCVC, dExecution, sPaymentCardID, sAmount, sFormBundleId,sCurr,oSelectedAccount,fnSuccess) {
      var oOneTimePayment = this._constructBasePaymentPayloadForForms(dExecution);
      oOneTimePayment.FormBundleID =sFormBundleId;
      oOneTimePayment.PaymentCardID = sPaymentCardID;
      oOneTimePayment.CVC = sCVC;
      oOneTimePayment.Amount = sAmount;
      oOneTimePayment.Currency = sCurr;

      oOneTimePayment.CardNumber = oSelectedAccount.CardNumber;
      oOneTimePayment.ValidFrom = oSelectedAccount.ValidFrom;
      oOneTimePayment.ValidTo = oSelectedAccount.ValidTo;
      oOneTimePayment.CardHolder = oSelectedAccount.Cardholder;
      oOneTimePayment.PaymentCardTypeID = oSelectedAccount.PaymentCardTypeID;




      //oOneTimePayment.PaymentDocumentItems.push(this._constructBaseInvoicePayload(sInvoiceID, sAmount));
      this._postPaymentOnAccounts(oOneTimePayment, fnSuccess);
    },
    //c5221606 for payment history
    _readPaymentHistory: function(oDelegate,sFormBundleId) {
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        var payments = this._sortPaymentHistory(oData.results);
        this.oInProcessPayments.setSizeLimit(payments.InProcess.results && payments.InProcess.results.length);
        this.oInProcessPayments.setData(payments.InProcess);
        this.oProcessedPayments.setSizeLimit(payments.Processed.results && payments.Processed.results.length);
        this.oProcessedPayments.setData(payments.Processed);
        oDelegate.oPaymentsHistoryController.onPaymentHistoryLoaded(this.oInProcessPayments, this.oProcessedPayments);
      }, this);
      fnError= jQuery.proxy(function(oData, oResponse) {
        oDelegate.oDeferredPaymentHistoryLoaded.reject();
        oDelegate.oFormBusyDialog.close();
        /*oDelegate.paymentBusyDialog.close();*/
      }, this);


      var sPath = this.getAccountPath() + "PaymentDocuments";
      //?$filter=FormBundleID eq '2510'
      this.SERVICE.read(sPath, [/*"$filter=FormBundleID eq '" + sFormBundleId + "'",*/ "$format=json"], false, {
        fnSuccess: fnSuccess,
        fnError:fnError
      },[],[{
          name: 'FormBundleID',
          operator: sap.ui.model.FilterOperator.EQ,
          value: encodeURIComponent(sFormBundleId)
        }]);
    },

    _deleteAttachment:function(oDelegate){

      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        oDelegate.getView().getController().oAttachmentsController._loadAttachments();


      }, this);
      var oData = oDelegate.getView().getModel("FileAttachments").getData();
      var aItems = jQuery.extend(true, {}, oData.results);
      var docId =oDelegate.sDocumentIdToDelete;
      this.SERVICE.removeEntity("/FormBundleAttachments", ["AttachmentID=\'" + docId + "\'"], {
        fnSuccess: fnSuccess
      });


    },


        //code for table form untouched
        _submitTableFormData: function (oDelegate,StatusID,NoFormData) {

            var formDataStr ="";
            if(((StatusID)?StatusID.toLowerCase():StatusID) !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                var CurrentFormNo="1";
                if(oDelegate.oCurrentFormBundle.CurrentFormNo){
                  CurrentFormNo=oDelegate.oCurrentFormBundle.CurrentFormNo;
                }
              //  obj.FormNo=FormNo;
                // oDelegate.oCurrentFormBundle.FormID;
           //     obj.FieldIndex="1";
                var filledData={};
                if(oDelegate.getView().getModel(oDelegate.oCurrentFormBundle.FormID+"Model"))
                     filledData = oDelegate.getView().getModel(oDelegate.oCurrentFormBundle.FormID+"Model").getData();

                var formData = [];
                $.each(filledData, function(key, value) {
                    var obj = {};
                    obj.CurrentFormNo=CurrentFormNo;
                    obj.FormID=oDelegate.oCurrentFormBundle.FormID;
                    obj.FieldIndex = (key+1).toString();
                    obj.TableForm='X';
                    var dataArr=[];
                    $.each(value, function(key, value) {
                        var objData = {};
                        objData.FieldName = key;
                        objData.FieldValue = value;
                        dataArr.push(objData);
                    });
                    obj.Data = dataArr;
                    formData.push(obj);
                });

                formDataStr= JSON.stringify(formData);
                if(NoFormData===true){
                    formDataStr="";
                }

            }


         //   var param = oDelegate.getRouter()._oCurrentParameters;
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
                        "FormData":formDataStr,
                        "AccountID":AccountID,
                        "RevenueType" : "UET",
                        "FormBundleTypeID":oDelegate.oCurrentFormBundle.FormBundleTypeID,
                       /* "PeriodID":oDelegate.oCurrentFormBundle.PeriodID,*/
                        "StatusID":StatusID,
                       }
                };
            if(oDelegate.bPeriodBased) {

          data.d.PeriodID = oDelegate.oCurrentFormBundle.PeriodID;
        }
        else if(oDelegate.bKeyDateBased){
          data.d.KeyDate = oDelegate.oCurrentFormBundle.KeyDate;
        }
            var tableFormData =filledData;
            if(oDelegate.oCurrentFormBundle.FormBundleID){
                this._updateForm(oDelegate, data,oDelegate.oCurrentFormBundle.FormBundleID,StatusID,tableFormData);
            }else{
                this._createForm(oDelegate, data,StatusID,tableFormData);
            }

        },


};