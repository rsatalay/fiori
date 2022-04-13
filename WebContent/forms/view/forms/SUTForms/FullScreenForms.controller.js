jQuery.sap.require("sap.umc.mobile.forms.view.forms.PaymentsController");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.PaymentsHistoryController");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.FormInstances");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.Attachments");
sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.forms.view.forms.SUTForms.FullScreenForms", {
	onInit: function (oEvent) {
	/*	this.getView().addEventDelegate({
			   onBeforeShow: function(evt) {
				   
				      var context = evt.data;
				   }
				});
		*/
		
	   //  sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
			sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
			

		this._handleRouting();
	    sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
	   
	},
	 _handleRouting:function(){
	    	
	    	
	    	this.getRouter().attachRouteMatched(function(oEvent) {
	            var sNavigationName = oEvent.getParameter("name");
	            if (sNavigationName === "SUTForms") {
	           
	      /*     sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
				sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
	          
      */       
	            }
	        }, this);
	    },
		handleNavigationEvent:function(channel, event, data) { 
			
			 var sNavigationName = data.route;
	            if (sNavigationName === "SUTForms") {
			if(data){
			/*	for(var i=0;i<data.stack.length;i++){*/
					if(data.stack[data.stack.length-1].route === "SUTForms"){/*
						this.oSelectedUser = data.stack[data.stack.length-1].parameters;
						this._setElementVisiblity();
						this._setUsersModel(this.oSelectedUser);
						this._loadUserAssignedPrivileges(this.oSelectedUser);
					
					*/
						 this._setDefaultValues();
				           var param = data.stack[data.stack.length-1].parameters;
				           this.data=param;
				           this.hideAllButtons();
				         /*  //addForm
					          
				           
					          if(this.data.bAddForm && this.data.bAddForm === "X"){
					        	   //addForm
						           this.getDataProvider().readSelectedFormBundleTypeOffline(this); 
					           }
					          else{*/
					        	  this.getDataProvider().getFormBundleTypes(this);
					         /* } */
			               this.setSelectedKeyBar();	
					
					}
				}}
			//sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
			
		/*	}*/
	   
	},
	    setSelectedKeyBar:function(){
	    	
	    	
 		   var bar =this.getView().byId("idIconTabBarSUT");
 		   var items=bar.getItems();
 		   if(items){
 		       bar.setSelectedKey(items[0].getKey());
 		   }
 		  this.handleIconTabBarSelect();
 		     		   
 		
	    },
	    _setDefaultValues:function(){
	    	 //Form details
		    var form1 = "SSU1";
		    
		    // JSON for SSU1 form
		    this.oForm1DataNew ={
		                "A_F1_REG_ID1":"",
		                "A_FA1_SALES_GROSS1":"",
		                "A_FA2_SALES_EXMPT1":"",
		                "A_FA3_SALES_TAX_AMT1":"",
		                "A_FA4_SALES_TAX_COLL1":"",
		                "A_FB3_TAX_PURCH_AMT1":"",
		                "A_FB4_TAX_PURCH_COL1":"",
		                "A_FC1_RENT_GROSS1":"",
		                "A_FC2_RENT_EXMPT1":"",
		                "A_FC3_RENT_TAX_AMT1":"",
		                "A_FC4_RENT_TAX_COLL1":"",
		                "A_FD1_FOOD_GROSS1":"",
		                "A_FD2_FOOD_EXMPT1":"",
		                "A_FD3_FOOD_TAX_AMT1":"",
		                "A_FD4_FOOD_TAX_COLL1":"",
		                "A_F5_TAX_COLL1":"",
		                "A_F6_LAWFUL_DED1":"",
		                "A_F7_TOTAL_TAX_DUE1":"",
		                "A_F8_EST_TAX1":"",
		                "A_F9_EST_TAX_DUE1":"",
		                "A_F10_AMT_DUE1":"",
		        };
	        
		    this.oForm1Data=jQuery.extend( {}, this.oForm1DataNew);
			this.oSSU1Model = new sap.ui.model.json.JSONModel();
			this.oSSU1Model.setData(this.oForm1Data);
			this.getView().setModel(this.oSSU1Model,"SSU1Model");
	        
	        this.oFieldEnabled={ "Enabled":true};
	        
	        this.oEnabledModel = new sap.ui.model.json.JSONModel();
	        this.oEnabledModel.setData(this.oFieldEnabled);
	        this.getView().setModel(this.oEnabledModel,"EnabledModel");
	        
	        //PrePopulate form Data
	        this.isPrepopulate= false;
	        // Rule IDs
	        this.prePopulateRuleID="21";
	        this.validateRuleID="01";
	        
	        
	        // Tab Sequence 
	        this.tabSequence=[form1,"attachments","submit","payment"
	                          ];
	        
	        
	        //Field Name for Payment
	        this.fieldNameForPay= "A_F7_TOTAL_TAX_DUE1";
	        this.FormIDForPayAmount="SSU1";
	        this.FormNoForPayAmount="1";
	        
	        //Flag to indicate if the Form's Fields in JSON form has to be sent on save draft or submit.
	        //Initial value is true below, can be set to true or false before submit/save draft
	        this.bNoFormData=true;
	        
	        //Call check for error automatically before save draft
	        this.checkBeforeSubmit=false;
	        
	        //Show submit button on every tab in not submitted mode 
	        this.showSubmitBtnOnAllTabs=false;
	        
			
			var oThis = this;
			
		    //For message dialog fragment
		    this.msgFragment= null;
		    
		    //
		    this.SSU1InputFlag=false;
			
			/*this.oView.addEventDelegate({
	    		onAfterShow:function(evt){
	    		   var bar =oThis.getView().byId("idIconTabBarSUT");
	    		   var items=bar.getItems();
	    		   if(items){
	    		       bar.setSelectedKey(items[0].getKey());
	    		   }
	    		   oThis.handleIconTabBarSelect();
	    		     		   
	    		},  
	            onBeforeShow: function(evt) {
	                var param = oThis.getRouter()._oCurrentParameters;
	                oThis.data=param;
	                oThis.hideAllButtons();
	                oThis.getDataProvider().getFormBundleTypes(oThis);
	                
	               this.enable this.getView().getModel("EnabledModel").Enabled;
	             //   oThis.setFormTitle();
	            }
			});*/
			
			//c5221606
			
			 this.oPaymentHistoryVisible={ "InProcess":false,
			"Processed": false		 
			 };
		        
		        this.oPaymentHistoryVisibleModel = new sap.ui.model.json.JSONModel();
		        this.oPaymentHistoryVisibleModel.setData(this.oPaymentHistoryVisible);
		        this.getView().setModel(this.oPaymentHistoryVisibleModel,"PaymentHistoryVisible");
	    	
	    },
	setFormTitle:function(){
     
        var formTitle=this.getView().byId("FullScreenSUTTitle");
        if(this.data.FormBundleID && this.data.PeriodID && this.data.FormBundleTypeDescription){   
            formTitle.setText(this.getFormattedText("FORMS.FORM_NO_FOR_PERIOD",[this.data.FormBundleID,this.data.FormBundleTypeDescription,this.data.PeriodID]));
        }else if(this.data.FormBundleID && this.data.FormBundleTypeDescription){   
            formTitle.setText(this.getFormattedText("FORMS.FORM_NO_FORM_ID",[this.data.FormBundleID,this.data.FormBundleTypeDescription]));
        }else if (this.data.PeriodID && this.data.FormBundleTypeDescription){
            formTitle.setText(this.getFormattedText("FORMS.FORM_ID_FOR_PERIOD",[this.data.FormBundleTypeDescription,this.data.PeriodID]));
        }else if (this.data.FormBundleTypeDescription){
            formTitle.setText(this.data.FormBundleTypeDescription);   
        }
    },
	
	showFormData:function(addNewForm,formID,tableForm){

        var oThis=this;
        
        if(!this.data.StatusID){
            this.data.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT; 
        }
        var periodID = sap.ui.getCore().getElementById("SSU1PeriodID");
        if(periodID && this.data.PeriodID){
            periodID.setValue(this.data.PeriodID);
        }
        var oTableForm='';
        if(tableForm){
            oTableForm=tableForm;
        }
        oThis.hideAllButtons();
        if(oThis.data.FormBundleID && oThis.data.FormID && oThis.data.FormNo && !addNewForm){
            
            
            if(((oThis.data.StatusID)?oThis.data.StatusID.toLowerCase():oThis.data.StatusID) !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                oThis.oView.byId("saveSUT").setVisible(true);
                oThis.oView.byId("validateSUT").setVisible(true);
            }
            var reqData={
            FormBundleID:"'"+oThis.data.FormBundleID+"'",
            FormID:"'"+oThis.data.FormID+"'",
            FormNo:"'"+oThis.data.FormNo+"'",
            TableForm:"'"+oTableForm+"'",
            };
            
            oThis.getDataProvider().getDisplayFormData(oThis,reqData,oThis.data.StatusID);
        }else{
            oThis.oView.byId("saveSUT").setVisible(true);
            oThis.oView.byId("validateSUT").setVisible(true);
            oThis.oFieldEnabled ={                        
                    "Enabled":true  
            };
            oThis.oEnabledModel.setData(oThis.oFieldEnabled);
            this.oForm1Data=jQuery.extend( {}, this.oForm1DataNew);
            oThis.oSSU1Model.setData(this.oForm1Data);
            
            var FormNo="1";
            if(oThis.data.oFormsListCount){
                FormNo=parseInt(FormNo)+oThis.data.oFormsListCount;
                FormNo=FormNo.toString();
            }
            oThis.data.FormNo=FormNo;
        }     
    },
    
    onDisplayformLoaded:function(formData,enableData){
        if(this["o"+this.data.FormID+"Model"])
        this["o"+this.data.FormID+"Model"].setData(formData);
        if(enableData)
        this.oEnabledModel.setData(enableData);
    },
    
	
	hideAllButtons:function(){
	    if(this.showSubmitBtnOnAllTabs && this.data.StatusID && (this.data.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())){
	        this.oView.byId("submitSUT").setVisible(true);  
	    }else{
	        this.oView.byId("submitSUT").setVisible(false);
	    }	    
	    this.oView.byId("addFormBtnSUT").setVisible(false);        
        this.oView.byId("saveSUT").setVisible(false);
        this.oView.byId("validateSUT").setVisible(false);
        this.oView.byId("errorCountSUT").setVisible(false);
        this.oView.byId("FormPayBillSUT").setVisible(false);
	},
	
	onFormBundleTypesLoaded:function(oData){
	    var bar = this.getView().byId("idIconTabBarSUT");
	    bar.removeAllItems();
	    var oThis = this;
	    oThis.finalTabs=[]; 
	    $.each(this.tabSequence, function(index,e){
	        $.each(oData.results, function(indexIn,eIn){
	            if(e.toLowerCase()=== eIn.FormID.toLowerCase()){
	                oThis.finalTabs.push(eIn);
	            }
	        });
	    });
	    
        $.each(oThis.finalTabs, function(index,e){
            var tab = new sap.m.IconTabFilter({
               icon:e.icon,
               text:e.FormDescription,
               key:e.FormID,
               customData:[//first custom data for number of maximum Instances and second for min.
                           new sap.ui.core.CustomData({
                               key: "MaximumInstances",
                               value: e.MaximumInstances
                           }),
                           new sap.ui.core.CustomData({
                               key: "MinimumInstances",
                               value: e.MinimumInstances
                           })
                       ]
            });
            bar.addItem(tab);
            //enable/disable icontab filter payment on first load depending on status of form i.e., when a form bundle id exists
            if(e.FormID == "payment"){
            tab.setEnabled(e.FormBundleID?true:false);}

            if(index===0){
                //initial content 
                oThis.data.MaximumInstances=e.MaximumInstances;
                oThis.data.MinimumInstances=e.MinimumInstances;
                oThis.data.FormDescription=e.FormDescription;
                oThis.data.FormID=e.FormID;
                oThis.data.FormBundleTypeDescription=e.FormBundleTypeDescription;
                oThis.setFormTitle();
            }
            if(oThis.finalTabs.length!==(index+1)){
                var tabSepartor = new sap.m.IconTabSeparator({
                    icon:"sap-icon://open-command-field"
                }); 
                bar.addItem(tabSepartor);
            }
            
        });
	},
	
	SSU1OnChange:function(evt){
	    this.SSU1InputFlag= true;
	},
	

	/*handleCancelPress : function () {
	    this.getRouter().myNavBack();
	},
	
	onDisplayformLoaded : function(oDisplayForm) {
        this.getView().setModel(oDisplayForm);
    },*/

	handleSubmitPress : function(){
	    if(this.checkBeforeSubmit)
          this.getDataProvider().validateFormData(this,this.validateRuleID,true,jQuery.proxy(this.onValidateSuccess, this),true);
	    else{
	    	this.bNoFormData = false;
	    	this.getDataProvider().submitForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,this.bNoFormData);   	 

	    }
	      	},
	
	handleSavePress : function(){
		this.bNoFormData = false;
	    this.getDataProvider().submitForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT, this.bNoFormData);
    },
    
    
	getSelectedFilter:function(){
	    var bar = this.getView().byId("idIconTabBarSUT");
	        var selectedKey= bar.getSelectedKey();
	        var items= bar.getItems();
	        var filter;
	        $.each(items,function(index,e){
	            if(index%2==0){
	                if(e.getKey()===selectedKey){
	                    filter=e;
	                }
	            }
	            
	        });  
	    return filter;    
	},    
	    
	onFormSaved: function(FormBundleID,StatusID){
	    this.SSU1InputFlag=false;
	    this.data.FormBundleID=FormBundleID;
	    this.setFormTitle();
	    this.data.StatusID=StatusID;
        this.handleIconTabBarSelect();
	},    

	 openDialog: function (text,FormBundleID,StatusID) {
        this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, text);
        if(FormBundleID){
            this.onFormSaved(FormBundleID,StatusID);  
        }
        
      },
      
      onSubmitFailure:function(MessageData){
          var messageData=JSON.parse(MessageData);
          var sMessageToastMsg = "";
          if(messageData.length){
              var items=[];
              var oThis = this;
              $.each(messageData, function( index, value ) {
                  
                    /*  var col = new sap.m.CustomListItem({
                          content:[new sap.ui.core.Icon({
                              src: sap.ui.core.IconPool.getIconURI("error"),
                              color: sap.ui.core.IconColor.Critical,  //green
                              }).addStyleClass("sapFmcaErrorIcon"),new sap.m.Label({text:value.MESSAGETEXT}).addStyleClass("sapMSLITitleOnly")],
                         
                          type:"Navigation"
                          
                      });*/
            	  var col = oThis._getColumnListItem(value);
                      
                      if(value.FIELDNAME){
                          col.attachPress(function(){
                              
                              var bar = oThis.getView().byId("idIconTabBarSUT");
                              bar.setSelectedKey(value.FORMID);
                              oThis.handleIconTabBarSelect();
                              var filter= oThis.getSelectedFilter();
                              bar.removeAllContent(); //barObj.remove
                              filter.removeAllContent();
                              if(value.FORMID == "SSU1"){
                                  if(oThis.SSU1Form){
                                      oThis.SSU1Form.destroy();
                                      oThis.SSU1Form='';   
                                  }
                                  oThis.SSU1Form=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.SUTForms.SSU1", this);
                                  bar.addContent(oThis.SSU1Form);
                                  oThis.data.FormNo = value.FORMNO;
                                  oThis.showFormData(false,value.FORMID); 
                              }
                              var input = oThis._getFormControlFromFieldNameWithErrorValueState(value.FIELDNAME);
                              
                              
                              if (input){
                            	  switch(value.MESSAGETYPE) {
              					case "E":{
              						sMessageToastMsg = sap.ui.core.ValueState.Error;
              						 input.setValueState(sap.ui.core.ValueState.Error);
                                  break;
              					}
              					case "W":{
              if(sMessageToastMsg!==sap.ui.core.ValueState.Error){
              							
              							sMessageToastMsg = sap.ui.core.ValueState.Warning;
              						}
              						 input.setValueState(sap.ui.core.ValueState.Warning);
                                  break;
              					}	    
              					default:{
              						if(sMessageToastMsg!==sap.ui.core.ValueState.Error && sMessageToastMsg!==sap.ui.core.ValueState.Warning){
              							
              							sMessageToastMsg = oThis.getText("MESSAGE_CENTER.INFO");
              						}

              						 input.setValueState(sap.ui.core.ValueState.None);
              					}
                          	 	}
                            	  
                            	  
                            	  
                            	  
                            	  
                                 
                                  input.setValueStateText(value.MESSAGETEXT);
                               //   input.setTooltip(value.MESSAGETEXT);
                                  input.attachLiveChange(function(evt) {
                                  input.setValueState(sap.ui.core.ValueState.None);
                                  });
                                  input.focus(true);
                              } 
                          });
                      }
                      
                      
                      items.push(col);                    
                                
                });
              
              var bar =this.getView().byId("idIconTabBarSUT");
              bar.removeAllContent();
              this.data.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT;
                 if(bar.getSelectedKey()=="submit",items.length){
                     this.handleIconTabBarSelect();
                       bar.addContent(new sap.m.List({
                       headerText:this.getText("FORMS.ERROR_MESSAGES"),
                       items:[items]
                   }).addStyleClass("sapFmcaErrorMessages"));
               }
          }
          
      },  
      
    onValidateSuccess:function(MessageData,FormData,isValidate,isSaveCall){
        var messageData=[];
        if(MessageData)
        messageData = JSON.parse(MessageData);
        var formData=JSON.parse(FormData); 
        var oThis=this;
       
        var data = {};
        if(oThis["o"+oThis.data.FormID+"Model"]){
            data = oThis["o"+oThis.data.FormID+"Model"].getData();
            if(formData.length){
                $.each(formData[0].DATA, function( index, value ) {
                    data[value.FIELDNAME]=value.FIELDVALUE;                               
                    });             
                   oThis["o"+oThis.data.FormID+"Model"].setData(data) ;
            } 
        }
        
        
        if(messageData.length){
            var items=[];
            var sMessageToastMsg = "";
            $.each(messageData, function( index, value ) {
                if(value.FIELDNAME){
                    var input = oThis._getFormControlFromFieldNameWithErrorValueState(value.FIELDNAME);
                    
                    switch(value.MESSAGETYPE) {
					case "E":{
						sMessageToastMsg = sap.ui.core.ValueState.Error;
						 input.setValueState(sap.ui.core.ValueState.Error);
                    break;
					}
					case "W":{
if(sMessageToastMsg!==sap.ui.core.ValueState.Error){
							
							sMessageToastMsg = sap.ui.core.ValueState.Warning;
						}
						 input.setValueState(sap.ui.core.ValueState.Warning);
                    break;
					}	    
					default:{
						if(sMessageToastMsg!==sap.ui.core.ValueState.Error && sMessageToastMsg!==sap.ui.core.ValueState.Warning){
							
							sMessageToastMsg = oThis.getText("MESSAGE_CENTER.INFO");
						}

						 input.setValueState(sap.ui.core.ValueState.None);
					}
            	 	}
                   
                    input.setValueStateText(value.MESSAGETEXT);
                    //input.setTooltip(value.MESSAGETEXT);
                    input.attachLiveChange(function(evt) {
                    input.setValueState(sap.ui.core.ValueState.None);
                    });
                    if(index===0){
                        input.focus(true);
                    }
                    var col = oThis._getColumnListItem(value);/*new sap.m.CustomListItem({
                        content:[new sap.ui.core.Icon({
                            src: sap.ui.core.IconPool.getIconURI("error"),
                            color: sap.ui.core.IconColor.Critical,  //green
                            }).addStyleClass("sapFmcaErrorIcon"),new sap.m.Label({text:value.MESSAGETEXT})],
                        type:"Navigation",
                        press:function(){
                            input.focus(true);
                        }
                    });*/
                    items.push(col);                    
                }               
              });

             this.popover = new sap.m.Popover({
                 placement:sap.m.PlacementType.Top,
                 title:this.getText("FORMS.ERROR_MESSAGES"),
                 icon:"sap-icon://message-error",
                 contentWidth:"400px",      
             });
             
             this.popover.addContent(new sap.m.List({items:[items]}));
             
             if(!this.errorCountBtn){
            	 this.errorCountBtn=  oThis.getView().byId("errorCountSUT");
                 this.errorCountBtn.attachPress(function(){
                         oThis.popover.openBy(this);
                 });
            	 
             }
             
             this.errorCountBtn.setText(messageData.length);
             this.errorCountBtn.setVisible(true);
             
             var bar =this.getView().byId("idIconTabBarSUT");             
             bar.setSelectedKey(this.data.FormID);
             this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,sMessageToastMsg);
        }else{
            if(isValidate){
             this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, this.getText("FORMS.ERROR_CHECK_SUCCESS"));
            }
            this.errorCountBtn.setVisible(false);
        }  
        
        if(isSaveCall && !messageData.length){
        	this.bNoFormData = false;
            this.getDataProvider().submitForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,this.bNoFormData);
        }
        
      },
    //To create a columnList Item for the error list depending on the Error Type
      _getColumnListItem:function(value){
   	   var oIcon = null;
   	   switch(value.MESSAGETYPE) {
   	    case "E":
   	    	oIcon = new sap.ui.core.Icon({
   	    		src: sap.ui.core.IconPool.getIconURI("error"),
                   }).addStyleClass("sapFmcaErrorIcon");    
   	        break;
   	    case "W":
   	    		oIcon = new sap.ui.core.Icon({
                   src: sap.ui.core.IconPool.getIconURI("message-warning"),
               }).addStyleClass("sapFmcaWarningIcon");
   	        break;
   	    default:
   	    	oIcon = new sap.ui.core.Icon({
                   src: sap.ui.core.IconPool.getIconURI("message-information"),
                   color: sap.ui.core.IconColor.Default,
               }).addStyleClass("sapFmcaInfoIcon");
   	}   
   	   // oFieldNameControl- Contains the field's control
   	   var oFieldNameControl = this._getFormControlFromFieldNameWithErrorValueState(value.FIELDNAME);
	        
   	   return new sap.m.CustomListItem({
              content:[new sap.m.HBox({
              items:[oIcon, new sap.m.Text({text:value.MESSAGETEXT, width:"290px"})], width:"300px",alignItems:"Center"})],
              type:"Navigation",
              press:function(){
             	 if(oFieldNameControl) 
             	 oFieldNameControl.focus(true);
              }
          });
   	},
      
      //Get the control from the view depending on the binding path of value state model TregSTP1ValueStateModel
      _getFormControlFromFieldNameWithErrorValueState:function(sFieldName){
    	 return sap.ui.getCore().getElementById(this.data.FormID+"_"+sFieldName+"_input");
      },

      onDialogCloseBtn: function (oEvent) {
      if(this.msgFragment.isOpen()){
          this.msgFragment.destroyContent();
          this.msgFragment.close();         
         }
        
      },
      
      handleValidatePress: function(){
          this.getDataProvider().validateFormData(this,this.validateRuleID,true,jQuery.proxy(this.onValidateSuccess, this));
      },
      
      prePopulateFields: function(){
          this.getDataProvider().validateFormData(this,this.prePopulateRuleID,false,jQuery.proxy(this.onValidateSuccess, this));
      },
      
      
      
      onAddFormPress:function(evt){
         var filter=this.getSelectedFilter();
         if(filter){
             filter.removeAllContent();
             this.handleIconTabBarSelect(null,true);
         }
      },
      
      handleIconTabBarSelectWithFlag:function(oEvent){
          var oThis=this;
          var bar =oThis.getView().byId("idIconTabBarSUT");
          if(oThis.SSU1InputFlag===true){
             this.prevActiveTabKey=oThis.data.FormID;
             var saveBtn =new sap.m.Button({
                 text:oThis.getText("FORMS.SAVE_DRAFT"),
                 icon:"sap-icon://save",
                 press:function(evt){
                     oThis.handleSavePress();
                 //    oThis.handleIconTabBarSelect();
                     oThis.alertDialog.close(); 
                     
                 }
             });
             var cancelBtn = new sap.m.Button({
                 text:oThis.getText("FILING_OBLIGATIONS.CANCEL"),
                 press:function(){
                     bar.setSelectedKey(oThis.prevActiveTabKey);
                     oThis.alertDialog.close(); 
                 }    
             });
             var withoutSaveBtn = new sap.m.Button({
                 text:oThis.getText("FORMS.CONTINUE_WITHOUT_SAVE"),
                 press:function(){
                    // bar.setSelectedKey(oThis.prevActiveTabKey);
                     oThis.alertDialog.close();
                     oThis.SSU1InputFlag=false;
                     oThis.handleIconTabBarSelect();
                      
                 }    
             });
             this.alertDialog = new sap.m.Dialog({
                 title:this.getText("MESSAGE_CENTER.ALERT"),
                 content:[new sap.m.Text({text:"Are you sure you want to move entered data will be lost"})],
                 buttons:[saveBtn,withoutSaveBtn,cancelBtn]
             });
             this.alertDialog.open();
          }else{
              oThis.handleIconTabBarSelect(oEvent);
              
          }
      },
      
      handleIconTabBarSelect : function (evt,addNewForm) {// barObj
            var oThis = this;
            var bar = oThis.getView().byId("idIconTabBarSUT");
            var filter= oThis.getSelectedFilter();
            bar.removeAllContent(); //barObj.remove
            filter.removeAllContent();
            var sKey = bar.getSelectedKey();
            oThis.hideAllButtons();
            
            var newForm=false;
            if (typeof addNewForm !== 'undefined') {
                newForm=addNewForm;
            }
            
            if (sKey === "SSU1") {
                this.data.FormDescription=filter.getProperty("text");
                this.data.FormID=sKey;
                this.data.MaximumInstances=filter.getCustomData()[0].getValue();
                this.data.MinimumInstances=filter.getCustomData()[1].getValue();
                if(this.data.FormBundleID && !newForm && this.data.MaximumInstances > 1 ){
                    if (!this.formInstanceFragment) {
                        this.oFormInstancesController = sap.umc.mobile.forms.view.forms.FormInstances;
                        this.formInstanceFragment = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.FormInstances", this.oFormInstancesController);
                        this.oFormInstancesController.setView(this.getView());
                        
                    }
                    this.oFormInstancesController.read(this.data);
                    bar.addContent(this.formInstanceFragment);
                     
                }else if(this.data.FormBundleID && !newForm && this.data.MaximumInstances <= 1 ){
                    if(oThis.SSU1Form){
                        oThis.SSU1Form.destroy();
                        oThis.SSU1Form='';   
                    }
                    oThis.SSU1Form=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.SUTForms.SSU1", this);
                    bar.addContent(this.SSU1Form);
                    this.data.FormNo = 1;
                    this.showFormData(false,sKey);
                }                
                else{
                    if(oThis.SSU1Form){
                        oThis.SSU1Form.destroy();
                        oThis.SSU1Form='';   
                    }
                    oThis.SSU1Form=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.SUTForms.SSU1", this);
                    bar.addContent(this.SSU1Form);
                    this.showFormData(true,sKey);
                    if(this.isPrepopulate)
                    this.prePopulateFields();
                }
                
            }else if (sKey === "attachments") {
            	   this.oAttachmentsController = sap.umc.mobile.forms.view.forms.Attachments;
                   this.oAttachmentsController.setView(this.getView());
              if (!this.AttachmentsFragment) {
               
                  this.AttachmentsFragment = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.Attachments", this.oAttachmentsController);
          
              }
              bar.addContent(this.AttachmentsFragment);
              if(this.data && this.data.FormBundleID){
                  this.oAttachmentsController._loadAttachments();
                 /* if(((this.data.StatusID)?this.data.StatusID.toLowerCase():this.data.StatusID) === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                      this.oAttachmentsController.handleUploadBtn(false);
                  }else{
                      this.oAttachmentsController.handleUploadBtn(true);
                  }*/
              }else{
            	  this.bNoFormData = true;
                  this.getDataProvider().submitForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT,this.bNoFormData);
              }
              
              
          }   
          else if (sKey === "submit") {
              var data = {};
              this.amountText = "0";
              
              if(this.data.FormBundleID){
                  data.FormBundleID = "'"+this.data.FormBundleID+"'";
                  data.FormID="'"+this.FormIDForPayAmount+"'";
                  data.FormNo = "'"+this.FormNoForPayAmount+"'";
                  this.getDataProvider()._readFormOnSubmitTab(this,data,false);
              }
              
              this.taxPayableObjHeader = new sap.m.ObjectHeader({
                  title:this.getText("FORMS.TOTAL_PAYABLE")+" "+this.amountText,
              });
           
              bar.addContent(this.taxPayableObjHeader);
              
              var list = new sap.m.List();
              
              $.each(this.finalTabs, function(index,e){
                  if(e.FormID==="submit"){
                      return false;
                  }
                  var stdListItm= new sap.m.StandardListItem({
                     title:e.FormDescription,
                     icon:e.icon,
                     counter:0,
                     type:sap.m.ListType.Navigation,
                     press:function(evt){
                         var items=bar.getItems();
                         if(items){
                             bar.setSelectedKey(e.FormID);
                         }
                         oThis.handleIconTabBarSelect();
                     }
                  });
                  list.addItem(stdListItm); 
              });
              
              
              bar.addContent(list);
              
              if(((this.data.StatusID)?this.data.StatusID.toLowerCase():this.data.StatusID) === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
              }else{
                  this.oView.byId("submitSUT").setVisible(true);
              }
              
          } else if (sKey === "payment"){
        	  //sap.umc.mobile.base.js.utils.busydialog.requireBusyDialog({});
        	  if(!this.paymentBusyDialog){
        		  this.paymentBusyDialog = new sap.m.BusyDialog();
        	  }
        	
        	
        	  this.paymentBusyDialog.open();
        	setTimeout(function(){
        		oThis._populatePayments();
				},0);
        	/*setTimeout(function(){
        		oThis.paymentBusyDialog.close();
        	},1000);*/
        	//this.paymentBusyDialog.close();
        	//sap.umc.mobile.base.js.utils.busydialog.releaseBusyDialog();  
          }
          
      },
      
      
      _populatePayments: function(){
    	  
    	  var oThis = this;
          var bar = oThis.getView().byId("idIconTabBarSUT");
    	  
    	  if(this.data.FormBundleID) {
          this.oView.byId("FormPayBillSUT").setVisible(true);
          //dont put check on the controller always run the below code
          //do that the current instance of uet form is set as view
          this.oPaymentsController = sap.umc.mobile.forms.view.forms.PaymentsController;
          this.oPaymentsController.setView(this.getView());
          
          //always do check on fragment else multiple fragments will create n for all the fragments creted each time
          //multiple errors n multiple payments will happen
      		if (!this._paymentsFragment) {
                this._paymentsFragment = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.Payments", this.oPaymentsController);
                
                this._handlePayButton();  
            }
      		
      		
           //commented to stop always showing the payment block
            /*bar.addContent(this._paymentsFragment);*/
      		 this.oDeferredFormData = jQuery.Deferred();
             this.oDefferedBankAcountCard = jQuery.Deferred();
             this.oDefferedExistingAccountModelSet =  jQuery.Deferred();
             this.oDeferredPaymentHistoryLoaded = jQuery.Deferred();
             this.oDeferredFlagToLoadBankCard=  jQuery.Deferred();
             	 //handling service call and populating for pay bills
           
           	    var data = {};
                data.FormBundleID = "'"+this.data.FormBundleID+"'";
                data.FormID="'"+this.FormIDForPayAmount+"'";
                data.FormNo = "'"+this.FormNoForPayAmount+"'";
                //c5221606 to get data as is in submit tab we reuse submit tabs handling function _readFormOnSubmitTab which calls the service and the 
                //will fetch the tax to be paid field from the service response
                this.getDataProvider()._readFormOnSubmitTab(this,data,true);
            /*    ********************/
                //p
               
               
                //if(bPaymentTab){
              	  
              	  if(!this.oPaymentsController){
                        this.oPaymentsController = sap.umc.mobile.forms.view.forms.PaymentsController;
                    }
              	  
              	  jQuery.when(this.oDeferredFormData,this.oDeferredPaymentHistoryLoaded).then(function(oParameter){
              		oThis.requireBankCardLoad(oParameter);
              		   
              	  });
                 jQuery.when(this.oDeferredFlagToLoadBankCard).then(function(oParameter){
                	 oThis.oPaymentsController.read();
              		   
              	 });
              	  
                //} 
                
                
               /* ************************/
                this._hidecvcOnload();
           	 
              //dont put check on the controller always run the below code
                //do that the current instance of uet form is set as view
                this.oPaymentsHistoryController = sap.umc.mobile.forms.view.forms.PaymentsHistoryController;
                this.oPaymentsHistoryController.setView(this.getView());
              //payment history fragment creation
                //always do check on fragment else multiple fragments will create n for all the fragments creted each time
                //multiple errors n multiple payments will happen
    			if (!this._paymentsHistoryFragment) {

    				
    				this._paymentsHistoryFragment = sap.ui.xmlfragment(
    								"sap.umc.mobile.forms.view.forms.PaymentsHistory",
    								this.oPaymentsHistoryController);
    				

    			}
        		
    			this.getDataProvider().loadPaymentHistory(this,this.data.FormBundleID);
			
            
      }
             
            
    
          
      
      },
      //on payment method loaded sucessfully, load Payment history
      onPaymentMethodsLoaded:function(oExistingAccounts, sPaymentID){
    	  this.getView().setModel(oExistingAccounts, "existingAccounts");
  		if(sPaymentID){
  			this.getView().getModel("existingAccounts").setProperty("/selectedKey", sPaymentID);
  			//sap.ui.getCore().byId("idPaymentSelect").setSelectedKey("-3");
  		
  			
  		}
  		//when the model and changes are done to model existingAccounts set deffered to resolved 
  		 this.oDefferedExistingAccountModelSet.resolve();
    	  //for payment history	//handling service call and populating for payment history 
    	 // this.getDataProvider().loadPaymentHistory(this,this.data.FormBundleID);
  		
  	},
      
      //on success of payment history load, is length of processed and in process model exists then add the payment history fragment
      _addPayementHistoryFragment: function(){
    	  var oThis = this;
          var bar = oThis.getView().byId("idIconTabBarSUT");
          if( oThis.getView().getModel("existingAccounts").getProperty("/amount")>0){
        	  bar.addContent(oThis._paymentsFragment);}
        	 else{
        		 var oNoPaymentHBox = new sap.m.VBox();
        		/* <Label text="{i18n>INVOICE.PAYMENTDETAILS}"
 					class="sapUmcVerticalAfterSpacingX1 sapUmcSectionHeading sapUmcVerticalBeforeSpacingX2" />*/
        		 
        		 //var oHeadHBox = new sap.m.VBox().addStyleClass("sapUmcHeadingWrapperBottomLine");
        		 var sHead = new sap.m.Label({text:"{i18n>INVOICE.PAYMENTDETAILS}"}).addStyleClass("sapUmcSubsectionHeading  ")
        		 .addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
        		 //oHeadHBox.addItem(sHead);
        		 var oMsgHBox = new sap.m.VBox();
        		 var sMsg = new sap.m.Label({text:"{i18n>FORMS.NO_LIABILITIES}"}).addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
        		 oMsgHBox.addItem(sMsg);
        		
        		 oNoPaymentHBox.addItem(sHead).addItem(oMsgHBox);
        		 bar.addContent(oNoPaymentHBox); 
        	 } 
        if (oThis.data.FormBundleID){
			
			if (oThis.getView().getModel("PaymentHistoryVisible").getProperty(
					"/InProcess")
					|| oThis.getView().getModel("PaymentHistoryVisible")
							.getProperty("/Processed")) {
				bar.addContent(oThis._paymentsHistoryFragment);
				

			}
			/*else{
				bar.removeContent(this._paymentsHistoryFragment);
			}*/
		}
        oThis.paymentBusyDialog.close(); 
     
    	  },
      
    //call method to subtract value of amount from the in process n processed payments
      updatePaymentAmount: function(){
    	 
    	  var oThis = this;
    	  jQuery.when(this.oDeferredFormData,this.oDefferedBankAcountCard,this.oDefferedExistingAccountModelSet).then(function(){  
    		  var sAmount = oThis.getView().getModel("existingAccounts").getProperty("/amount");
    	    	 
        	  var oInProcessModel = oThis.getView().getModel("InProcessPayments");
        	  var oProcessedModel = oThis.getView().getModel("ProcessedPayments"); 
        	  var temp = 0;
    	  if(oInProcessModel.getData().results){
    		  $.each(oInProcessModel.getData().results, function(index,obj){
        		  temp+=parseFloat(obj.Amount);
              });
    		  }
    	  
    	  if(oProcessedModel.getData().results){
    		  $.each(oProcessedModel.getData().results, function(index,obj){
        		  temp+=parseFloat(obj.Amount);
              });
    	  }
    	  var sUpdatedAmount = sAmount-temp;
    	  oThis.getView().getModel("existingAccounts").setProperty("/amount",sUpdatedAmount);
    	  if(sUpdatedAmount>0){
    		  oThis.getView().getModel("existingAccounts").setProperty("/paymentEnabled",true);

    	  }else
    		  {
    		  oThis.getView().getModel("existingAccounts").setProperty("/paymentEnabled",false);

    		  
    		  }
    	  oThis._addPayementHistoryFragment();

    	   
    	  
          },function(){
        	  oThis.paymentBusyDialog.close(); 
          });
        	 
    	 
      },
      
      
      
      setPaymentAmount:function(amount,bPaymentTab){
    	  //intial values to be provided to payments tab on tab selection
          var oParameters = {};
          if(amount){
              oParameters.Amount = parseFloat(amount);
            }else{
              oParameters.Amount = 0;
            }
          oParameters.EnablePaymentAmount = true;
          this._setCurrency("EUR");
          oParameters.Currency  =   this._getCurrency();
          oParameters.PaymentID = "-3";
          oParameters.EnablePaymentAmount = true;
          if(bPaymentTab)
          this.oDeferredFormData.resolve(oParameters);
          //p
          /*if(bPaymentTab){
        	  
        	  if(!this.oPaymentsController){
                  this.oPaymentsController = sap.umc.mobile.forms.view.forms.PaymentsController;
              }
              this.oPaymentsController.read(oParameters);
        	  
          }*/
          
      },
      
      //c5221606
      _hidecvcOnload: function() {
  		var aControls = this._paymentsFragment.findAggregatedObjects();
  		var oCvcLabel = aControls[5];
  		var oCvcInput = aControls[6];
  		oCvcLabel.setVisible(false);
  		oCvcInput.setVisible(false);
  	},
  	//c5221606
  	_handlePayButton: function() {
		//this.getPayButton().setVisible(false);
		
		
			this.getPayButton().attachPress(null, this.oPaymentsController.onSubmitOneTimePayment, this.oPaymentsController);
		
		
	},
	getPayButton: function() {
		return this.getView().byId("FormPayBillSUT");
	},
	//c5221606
	/*to set and get currency in the variable this.currency*/
	_getCurrency: function() {
		return this.currency;
	},
	
	_setCurrency: function(sCurr) {
		
		this.currency = sCurr;
	},
//on sucess of pay bill
	onPaymentSuccess:function(){
		//call services and set data again on payment success
		
		
		 var bar = this.getView().byId("idIconTabBarSUT");
	/*    bar.removeAllItems();*/
	    bar.removeAllContent();
	    this.paymentBusyDialog.open();
	    oThis= this;
    	setTimeout(function(){
    		oThis._populatePayments();
			},0);
	},
	
	//on success of creation of form bundle id payment tab should be enabled.
	onFormBundleIdCreationSuccess:function(){
		
		
		var oSUTIconTabBar = this.getView().byId("idIconTabBarSUT");
		var oSUTIconTabBarItems =  oSUTIconTabBar.getItems();
		  $.each(oSUTIconTabBarItems, function(index,oSUTIconTabFilter){
              if(typeof(oSUTIconTabFilter.getKey)=="function" && oSUTIconTabFilter.getKey()==="payment"){
            	  //enabling the payment tab
            	  oSUTIconTabFilter.setEnabled(true);
              }
          });
		
	},
	requireBankCardLoad:function(oParameter){
		oThis = this;
		// var sAmount = oThis.getView().getModel("existingAccounts").getProperty("/amount");
		 var sAmount = oParameter.Amount;
   	  var oInProcessModel = oThis.getView().getModel("InProcessPayments");
   	  var oProcessedModel = oThis.getView().getModel("ProcessedPayments"); 
   	  var temp = 0;
	  if(oInProcessModel.getData().results){
		  $.each(oInProcessModel.getData().results, function(index,obj){
   		  temp+=parseFloat(obj.Amount);
         });
		  }
	  
	  if(oProcessedModel.getData().results){
		  $.each(oProcessedModel.getData().results, function(index,obj){
   		  temp+=parseFloat(obj.Amount);
         });
	  }
	  var sUpdatedAmount = sAmount-temp;
	 // oThis.getView().getModel("existingAccounts").setProperty("/amount",sUpdatedAmount);
	  if(sUpdatedAmount>0){
		  //oThis.getView().getModel("existingAccounts").setProperty("/paymentEnabled",true);
		  this.oDeferredFlagToLoadBankCard.resolve();
	  }else
		  {
		  
		 oThis.getView().byId("FormPayBillSUT").setVisible(false);
		 // oThis.getView().getModel("existingAccounts").setProperty("/paymentEnabled",false);
		  this.oDeferredFlagToLoadBankCard.reject();
		  var bar = oThis.getView().byId("idIconTabBarSUT");
		  var oNoPaymentHBox = new sap.m.VBox();
  		/* <Label text="{i18n>INVOICE.PAYMENTDETAILS}"
				class="sapUmcVerticalAfterSpacingX1 sapUmcSectionHeading sapUmcVerticalBeforeSpacingX2" />*/
  		 
  		 //var oHeadHBox = new sap.m.VBox().addStyleClass("sapUmcHeadingWrapperBottomLine");
  		 var sHead = new sap.m.Label({text:"{i18n>INVOICE.PAYMENTDETAILS}"}).addStyleClass("sapUmcSubsectionHeading  ")
  		 .addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
  		 //oHeadHBox.addItem(sHead);
  		 var oMsgHBox = new sap.m.VBox();
  		 var sMsg = new sap.m.Label({text:"{i18n>FORMS.NO_LIABILITIES}"}).addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
  		 oMsgHBox.addItem(sMsg);
  		
  		 oNoPaymentHBox.addItem(sHead).addItem(oMsgHBox);
  		 bar.addContent(oNoPaymentHBox);
  		 
  		/* ******payment history to be added*/
		 
		 if (this.data.FormBundleID){
				
				if (this.getView().getModel("PaymentHistoryVisible").getProperty(
						"/InProcess")
						|| this.getView().getModel("PaymentHistoryVisible")
								.getProperty("/Processed")) {
					bar.addContent(this._paymentsHistoryFragment);
					

				}
				/*else{
					bar.removeContent(this._paymentsHistoryFragment);
				}*/
			}
		 
		/* *****dialog close*/
		  this.paymentBusyDialog.close();
		  
		  }

	}

});
