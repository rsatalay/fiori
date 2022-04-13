/*global window */
jQuery.sap.declare("sap.umc.mobile.forms.model.OnlineDataProvider");
sap.umc.mobile.forms.model.OnlineDataProvider = {
		_readForms: function(oDelegate,status) {
			var fnSuccess = jQuery.proxy(function(oData, oResponse) {
				if (typeof oData.results != 'undefined' && oData.results instanceof Array ) {
				    this.oForms.setData(oData);
				    if (oDelegate != null) {
                        oDelegate.onFormsLoaded(this.oForms);
                    }
				}	
			}, this);
       
                var sFormsPath = this.getAccountPath() + "FormBundles";
                this.SERVICE.read(sFormsPath, ["$filter=StatusID eq '"+status+"'","$format=json","$expand=Period","$orderby=ReceiptDate asc"], true, {
                    fnSuccess: fnSuccess
                });
		},
		
		
		_readDisplayForm: function(oDelegate,data,status) {
		    
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                var a=jQuery.parseJSON(oData.FormData);               
                var enableData ={};
                if(((status)?status.toLowerCase():status) === sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT.toLowerCase()){
                    enableData["Enabled"]=true; 
                }else{
                    enableData["Enabled"]=false;
                }  
                var formData={};
                if(a.length){
                    var b=a[0].DATA; 
                    $.each(b, function( index, value ) { fieldname=value.FIELDNAME;
                    formData[value.FIELDNAME]=value.FIELDVALUE;
                    });  
                }                                 
                oDelegate.onDisplayformLoaded(formData);
            }, this);
            
            var sDisplayFormPath = "GetFormData";
            this.SERVICE.read(sDisplayFormPath , ["FormBundleID="+data.FormBundleID,"FormID="+data.FormID,"FormNo="+data.FormNo,"TableForm="+data.TableForm,"$format=json"], true, {
                fnSuccess: fnSuccess
            });
        },
        
       _readTableForm: function(oDelegate,data,status) {
            
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
                oDelegate.onDisplayformLoaded(formData,data.TableForm);  
            }, this);
            var sDisplayFormPath = "GetFormData";
            this.SERVICE.read(sDisplayFormPath , ["FormBundleID="+data.FormBundleID,"FormID="+data.FormID,"FormNo="+data.FormNo,"TableForm="+data.TableForm,"$format=json",], true, {
                fnSuccess: fnSuccess
            });
        },
        
        _readFormOnSubmitTab: function(oDelegate,data,isPaymentTab) {            
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                var a=jQuery.parseJSON(oData.FormData);
                var formData={};
                if(a.length){
                    var b=a[0].DATA; 
                    $.each(b, function( index, value ) { fieldname=value.FIELDNAME;
                    formData[value.FIELDNAME]=value.FIELDVALUE;
                    });
                    if(isPaymentTab){
                        oDelegate.setPaymentAmount(formData[oDelegate.fieldNameForPay],isPaymentTab);
                        
                    }else
                    if(formData[oDelegate.fieldNameForPay]){
                        oDelegate.taxPayableObjHeader.setTitle(oDelegate.getText("FORMS.TOTAL_PAYABLE")+" "+formData[oDelegate.fieldNameForPay]);
                    }  
                }
                //c5221606 to set 0 if the data for amount to be submitted in submit tab is not coming from backend
                else{
                	oDelegate.setPaymentAmount(0,isPaymentTab);
                	
                }
                
                     
            }, this);
            var fnError= jQuery.proxy(function(oData, oResponse) {
            	if(isPaymentTab)
            	oDelegate.oDeferredFormData.reject();
            	
            }, this);
            var sDisplayFormPath = "GetFormData";
            this.SERVICE.read(sDisplayFormPath , ["FormBundleID="+data.FormBundleID,"FormID="+data.FormID,"FormNo="+data.FormNo,"TableForm=''","$format=json",], true, {
                fnSuccess: fnSuccess,
                fnError:fnError
                
            });
        },
        
        _submitFormData: function (oDelegate,StatusID,NoFormData) {

            var arr=[];
            var dataArr=[];
            var obj = {};
            var formDataStr ="";
            if(((StatusID)?StatusID.toLowerCase():StatusID) !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                
                if(NoFormData==true){
                    formDataStr=""; 
                }else{
                    var FormNo="1";
                    if(oDelegate.data.FormNo){
                       FormNo=oDelegate.data.FormNo;
                    }
                    obj.FormNo=FormNo;
                    obj.FormId=oDelegate.data.FormID;
                    obj.FieldIndex="1";
                    var filledData={};
                    if(oDelegate.getView().getModel(obj.FormId+"Model"))
                    filledData = oDelegate.getView().getModel(obj.FormId+"Model").getData();
                    $.each(filledData, function(key, value) {
                        var objData = {};
                        objData.FieldName = key;
                        objData.FieldValue = value;
                        dataArr.push(objData);
                    });
                    obj.Data=dataArr; 
                    
                    arr.push(obj);  
                    formDataStr= JSON.stringify(arr);
                }
            }else{
                if(NoFormData==true){
                    formDataStr=""; 
                }
            }
            
            
         //   var param = oDelegate.getRouter()._oCurrentParameters;
            var formBundleId;
            if(oDelegate.data.FormBundleID){
                formBundleId=oDelegate.data.FormBundleID;
            }else{
                formBundleId="";
            }
            
            var AccountID=this.getContextAccountId();
            var data={
                    "d" :{
                        "FormBundleID":formBundleId,
                        "FormData":formDataStr,
                        "AccountID":AccountID,
                        "FormBundleTypeID":oDelegate.data.FormBundleTypeID,
                        "PeriodID":oDelegate.data.PeriodID,
                        "StatusID":StatusID,                     
                       }
                };
            
            
            if(oDelegate.data.FormBundleID){
                this._updateForm(oDelegate, data,oDelegate.data.FormBundleID,StatusID);
            }else{
                this._submitForm(oDelegate, data,StatusID);
            }
            
            


        },
        
        _submitTableFormData: function (oDelegate,StatusID,NoFormData) {           
            
            var formDataStr ="";
            if(((StatusID)?StatusID.toLowerCase():StatusID) !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                var FormNo="1";
                if(oDelegate.data.FormNo){
                   FormNo=oDelegate.data.FormNo;
                }
              //  obj.FormNo=FormNo;
                // oDelegate.data.FormID;
           //     obj.FieldIndex="1";
                var filledData={};
                if(oDelegate.getView().getModel(oDelegate.data.FormID+"Model"))
                     filledData = oDelegate.getView().getModel(oDelegate.data.FormID+"Model").getData();
                
                var formData = [];
                $.each(filledData, function(key, value) {
                    var obj = {};
                    obj.FormNo=FormNo;
                    obj.FormID=oDelegate.data.FormID;
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
            if(oDelegate.data.FormBundleID){
                formBundleId=oDelegate.data.FormBundleID;
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
                        "FormBundleTypeID":oDelegate.data.FormBundleTypeID,
                        "PeriodID":oDelegate.data.PeriodID,
                        "StatusID":StatusID,                     
                       }
                };           
            var tableFormData =filledData;
            if(oDelegate.data.FormBundleID){
                this._updateForm(oDelegate, data,oDelegate.data.FormBundleID,StatusID,tableFormData);
            }else{
                this._submitForm(oDelegate, data,StatusID,tableFormData);
            }

        },
        
        
        
        _submitForm: function(oDelegate,data,StatusID,tableFormData) {
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                if(oData && oData.FormBundleID){
                    if(StatusID && StatusID.toLowerCase()==="submitted"){
                    oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.FormBundleID]),oData.FormBundleID,StatusID,tableFormData);
                  //  oDelegate.onFormSaved(oData.d.FormBundleID);
                    //payment tab should be enabled c5221606
                    oDelegate.onFormBundleIdCreationSuccess();
                    }else if(StatusID && StatusID.toLowerCase()==="draft"){
                    oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SAVED_SUCCESSFULLY",[oData.FormBundleID]),oData.FormBundleID,StatusID,tableFormData); 
                  //payment tab should be enabled c5221606
                    oDelegate.onFormBundleIdCreationSuccess();
                    }
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
            this.SERVICE.createEntity(sFormsPath, data,{
                fnSuccess: fnSuccess
            },oDelegate);
            
        },
        
        _updateForm: function(oDelegate,data,formId,StatusID,tableFormData) {
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                if(oData && oData.d.FormBundleID){    
                    if(StatusID && StatusID.toLowerCase()==="submitted"){
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);
                      //  oDelegate.onFormSaved(oData.d.FormBundleID);
                        }else if(StatusID && StatusID.toLowerCase()==="draft"){
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SAVED_SUCCESSFULLY",[oData.d.FormBundleID]),oData.d.FormBundleID,StatusID,tableFormData);    
                        }
                }else{
                    if(StatusID && StatusID.toLowerCase()==="submitted"){
                    oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SUBMITTED_SUCCESSFULLY",[formId]),formId,StatusID,tableFormData);
                   // oDelegate.onFormSaved(formId);
                    }else{
                        oDelegate.openDialog(oDelegate.getFormattedText("FILING_OBLIGATIONS.FORM_SAVED_SUCCESSFULLY",[formId]),formId,StatusID,tableFormData);    
                    }
                }
            }, this);
            var fnError= jQuery.proxy(function(oData, oResponse) {
                if(StatusID && StatusID.toLowerCase()==="submitted"){
                body=JSON.parse(oData.response.body);
                errorDetails = body.error.innererror.errordetails;
                if(errorDetails && errorDetails[1].message)
                oDelegate.onSubmitFailure(errorDetails[1].message);
                }
            }, this);
            
            var sFormsPath ="FormBundles";
            this.SERVICE.updateEntity(sFormsPath,["'"+formId+"'"], data,{
                fnSuccess: fnSuccess,
               fnError:fnError
            },oDelegate);
            
        },
        
        
      _readFormBundleTypes: function(oDelegate) {
            
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
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
            }, this);
            
                var sFormBundleTypesPath = "FormBundleTypes";
                this.SERVICE.read(sFormBundleTypesPath , ["$filter=FormBundleTypeID eq '"+oDelegate.data.FormBundleTypeID+"' and "+"PeriodID eq '"+oDelegate.data.PeriodID+"'","$format=json",], false, {
                    fnSuccess: fnSuccess
                });
        },
        
        _readExistingForms: function(oDelegate,param){
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
             //   oDelegate.data.FormBundleID=oData.FormBundleID;
                var data=JSON.parse(oData.FormData);
                $.each(data, function( index, e ) {
                    e.PeriodID=param.PeriodID;
                    e.FormDescription= param.FormDescription;

                  });
                this.oFormsList.setData(data);
                oDelegate.onExistingFormsLoaded(this.oFormsList);        
              }, this);
            var sFormBundleTypesPath = "GetForms";
            this.SERVICE.read(sFormBundleTypesPath , ["FormBundleID="+"'"+param.FormBundleID+"'","FormID="+"'"+param.FormID+"'","$format=json"], false, {
                fnSuccess: fnSuccess
            });
    
        },
        
        _validateFormData:function(oDelegate,ruleID,validate,fnCallback,isSaveCall){
            
            var arr=[];
            var dataArr=[];
            var obj = {};
            var formDataStr="";
            
                var FormNo="1";
                if(oDelegate.data.FormNo){
                   FormNo=oDelegate.data.FormNo;
                }
                obj.FormNo=FormNo;
                obj.FormId=oDelegate.data.FormID;
                obj.FieldIndex="1";
            if(validate){
                var oData=[];
                if(oDelegate.getView().getModel(oDelegate.data.FormID+"Model"))
                oData=oDelegate.getView().getModel(oDelegate.data.FormID+"Model").getData();
                $.each(oData, function(key, value) {
                    var objData = {};
                    objData.FieldName = key;
                    objData.FieldValue = value;
                    dataArr.push(objData);
                });
                obj.Data=dataArr;
            }else{
                obj.Data=[];
            }
            arr.push(obj);  
            formDataStr= JSON.stringify(arr);
           
            var formBundleId;
            if(oDelegate.data.FormBundleID){
                formBundleId=oDelegate.data.FormBundleID;
            }else{
                formBundleId="";
            }
            
            var AccountID=this.getContextAccountId();
            var data={
                    "d" :{
                        "FormBundleID":formBundleId,
                        "FormData":formDataStr,
                        "AccountID":AccountID,
                        "RevenueType":oDelegate.data.RevenueType,
                        "FormBundleTypeID":oDelegate.data.FormBundleTypeID,
                        "FormProcess":"TAX_RETURN",
                        "PeriodID":oDelegate.data.PeriodID,
                        "RuleID" : ruleID
                }
                };
            
            this._validateForm(oDelegate,data,validate,fnCallback,isSaveCall);
            
        },
        
        _validateForm:function(oDelegate,data,validate,fnCallback,isSaveCall){
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                fnCallback(oData.MessageData,oData.FormData,validate,isSaveCall);
            }, this);
            
            var fnError = jQuery.proxy(function(jqXHR, textStatus, errorThrown) {
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
                this.SERVICE.read(sFormBundleTypesPath , ["$filter=FormBundleID eq '"+oDelegate.data.FormBundleID+"'","$format=json",], false, {
                    fnSuccess: fnSuccess
                });
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
            this.SERVICE.read(sFormBundles , ["$filter=FormBundleTypeID eq '"+data.FormBundleTypeID+"' and PeriodID eq '"+data.PeriodID+"'","$format=json",], false, {
                fnSuccess: fnSuccess
            });
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
				/*oDelegate.paymentBusyDialog.close();*/
			}, this);
				
				
			var sPath = this.getAccountPath() + "PaymentDocuments";
			//?$filter=FormBundleID eq '2510'
			this.SERVICE.read(sPath, ["$filter=FormBundleID eq '" + sFormBundleId + "'", "$format=json"], false, {
				fnSuccess: fnSuccess,
				fnError:fnError
			});
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
		
};