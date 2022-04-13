jQuery.sap.require("sap.umc.mobile.forms.view.forms.PaymentsController");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.PaymentsHistoryController");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.FormInstances");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.Attachments");
sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.forms.view.forms.UETForms.FullScreenForms", {
    onInit: function (oEvent) {
    	 	
    	this._handleRouting();
  	 // sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
		sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
      

        sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
        
       
    },
    getDataProvider: function() {
        return sap.umc.mobile.forms.model.DataProvider;
    },
    _handleRouting:function(){
    	
    	
    	this.getRouter().attachRouteMatched(function(oEvent) {
            var sNavigationName = oEvent.getParameter("name");
            if (sNavigationName === "UETForms") {
            	
            /*	  sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
  				sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
  	          
     */       
            }
        }, this);
    },	handleNavigationEvent:function(channel, event, data) {
    	
    	
    	 var sNavigationName = data.route;
         if (sNavigationName === "UETForms") {
		
		if(data){
	
				if(data.stack[data.stack.length-1].route === "UETForms"){
					   this._setDefaultValues();
			           
			           var param = data.stack[data.stack.length-1].parameters;
			           this.data=param;
			           this.hideAllButtons();
			           //commented for addForm
			          // this.getDataProvider().getFormBundleTypes(this);
			           //addForm
				     /*     
			           
				          if(this.data.bAddForm && this.data.bAddForm === "X"){
				        	   //addForm
					           this.getDataProvider().readSelectedFormBundleTypeOffline(this); 
				           }
				          else{*/
				        	  this.getDataProvider().getFormBundleTypes(this);
				          /*}*/
			           this.SUETInputFlag=false;
			           this.UNEMPLOYMENT_TAXInputFlag=false;
			           
			           this.setSelectedKeyBar();
			         
				
				}
			}
		//sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
		

         }

    },
    onAfterRendering:function(){
    	
    	
    },
onBeforeRendering:function(){
    	
    	
    },
    setSelectedKeyBar:function(){
    	
    	oThis = this;
    	 var bar =oThis.getView().byId("idIconTabBarUET");
        var items=bar.getItems();
        if(items){
            bar.setSelectedKey(items[0].getKey());
        }
        oThis.handleIconTabBarSelect();
    	
    },
    _setDefaultValues:function(){
    	 //Form details
        var form1="SUET";
        var form2 = "UNEMPLOYMENT_TAX";
        
        // Model for SUET form
        this.oForm1DataNew ={
                "A_F1_QENDING":"",
                "A_F2_DUEDATE":"",
                "A_F3_PENALTYAFTERDUEDATE":"",
                "A_F4_ACCNUMBER":"",
                "A_F5_TAXRATE":"",
                "A_F6_FEIN":"",
                "A_F10_1STMONTH":"",
                "A_F10_2NDMONTH":"",
                "A_F10_3RDMONTH":"",
                "A_F11_GROSSWAGESTHISQUATER":"",
                "A_F12_WAGESPAIDEXCAMOUNT":"",
                "A_F13_TAXABLEWAGESTHISQ":"",
                "A_F14_TAXDUE":"",
                "A_F15_PENALTYDUE":"",
                "A_F16_INTERESTDUE":"",
                "A_F17_TOTALDUE":"",
                "A_F20_DOEMSTIC":""

            };
        this.oForm1Data=jQuery.extend( {}, this.oForm1DataNew);
        this.oSUETModel = new sap.ui.model.json.JSONModel();
        this.oSUETModel.setData(this.oForm1Data);
        this.getView().setModel(this.oSUETModel,"SUETModel");
        
        
        //Model for UNEMPLOYMENT_TAX form
        this.oForm2DataNew ={
                "TAX_NUMBER":"",
                "FIRST_NAME":"",
                "MAIN_NAME":"",
                "TOTAL_WAGES":"",
                "TAXABLE_WAGES":""
        };
        
        this.oForm2Data=jQuery.extend( {}, this.oForm2DataNew);
        this.oUNEMPLOYMENT_TAXModel = new sap.ui.model.json.JSONModel();
        this.oUNEMPLOYMENT_TAXModel.setData([]);
        this.tableRowsLimit = 1000;
        this.oUNEMPLOYMENT_TAXModel.setSizeLimit(this.tableRowsLimit);
        this.getView().setModel(this.oUNEMPLOYMENT_TAXModel,"UNEMPLOYMENT_TAXModel");
        
        this.oFieldEnabled={ "Enabled":true};
        
        this.oEnabledModel = new sap.ui.model.json.JSONModel();
        this.oEnabledModel.setData(this.oFieldEnabled);
        this.getView().setModel(this.oEnabledModel,"EnabledModel");
        
        this.oTableFieldEditable={ "Editable":true};
       
        this.oTableEdiatbleRowModel = new sap.ui.model.json.JSONModel();
        this.oTableEdiatbleRowModel.setData(this.oTableFieldEditable);
        this.getView().setModel(this.oTableEdiatbleRowModel,"TableRowsEditModel");
        
        //Flag to indicate if the Form's Fields json has to be blank or needs to be sent
        this.bNoFormData=true;
        //Prepopulate Form Data
        this.isPrepopulate = false;
        // Rule IDs
        this.prePopulateRuleID="21";
        this.validateRuleID="01";
        
        
        // Tab Sequence 
        this.tabSequence=[form2,form1,"attachments","submit","payment"
                          ];
        
        
        //Field Name for Payment
        this.fieldNameForPay= "A_F17_TOTALDUE";
        this.FormIDForPayAmount="SUET";
        this.FormNoForPayAmount="1";
        
        
        //Call check for error automatically before save draft
        this.checkBeforeSubmit=false;
        
        //Show submit button on every tab in not submitted mode 
        this.showSubmitBtnOnAllTabs=false;
        
        
        var oThis = this;
        
        //For message dialog fragment
        this.msgFragment= null;
        
        //
        this.SUETInputFlag=false;
        this.UNEMPLOYMENT_TAXInputFlag=false;
        
   /*     this.oView.addEventDelegate({
            onAfterShow:function(evt){
               var bar =oThis.getView().byId("idIconTabBarUET");
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
                oThis.SUETInputFlag=false;
                oThis.UNEMPLOYMENT_TAXInputFlag=false;
                
             //   oThis.setFormTitle();
            }
        });*/	

		 this.oPaymentHistoryVisible={ "InProcess":false,
		"Processed": false		 
		 };
	        
	        this.oPaymentHistoryVisibleModel = new sap.ui.model.json.JSONModel();
	        this.oPaymentHistoryVisibleModel.setData(this.oPaymentHistoryVisible);
	        this.getView().setModel(this.oPaymentHistoryVisibleModel,"PaymentHistoryVisible");
    	
    },
    setFormTitle:function(){
        var oThis=this;
        var formTitle=oThis.getView().byId("FullScreenUETTitle");
        if(oThis.data.FormBundleID && oThis.data.PeriodID && oThis.data.FormBundleTypeDescription){   
            formTitle.setText(oThis.getFormattedText("FORMS.FORM_NO_FOR_PERIOD",[oThis.data.FormBundleID,oThis.data.FormBundleTypeDescription,oThis.data.PeriodID]));
        }else if(oThis.data.FormBundleID && oThis.data.FormBundleTypeDescription){   
            formTitle.setText(oThis.getFormattedText("FORMS.FORM_NO_FORM_ID",[oThis.data.FormBundleID,oThis.data.FormBundleTypeDescription]));
        }else if (oThis.data.PeriodID && oThis.data.FormBundleTypeDescription){
            formTitle.setText(oThis.getFormattedText("FORMS.FORM_ID_FOR_PERIOD",[oThis.data.FormBundleTypeDescription,oThis.data.PeriodID]));
        }else if (oThis.data.FormBundleTypeDescription){
            formTitle.setText(oThis.data.FormBundleTypeDescription);   
        }/*else if (oThis.data.PeriodID && oThis.data.FormDescription){
        	formTitle.setText(oThis.getFormattedText("FORMS.FORM_ID_FOR_PERIOD",[oThis.data.FormDescription,oThis.data.PeriodID]));
          
        }*/
        else{
        	
        	formTitle.setText("");
        }
    },
    

    showFormData:function(addNewForm,tableForm){
        var oThis=this;
        if(!oThis.data.StatusID){
            oThis.data.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT; 
        }
        var periodID = sap.ui.getCore().getElementById("SUETPeriodID");
        if(periodID && oThis.data.PeriodID){
            periodID.setValue(oThis.data.PeriodID);
        }
        oThis.hideAllButtons();
        var FormNo="0001";
        if(!oThis.data.FormNo){
           oThis.data.FormNo=FormNo;
        }
        if(oThis.data.FormBundleID && oThis.data.FormID && oThis.data.FormNo && tableForm){
            
            
            if(((oThis.data.StatusID)?oThis.data.StatusID.toLowerCase():oThis.data.StatusID) !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                oThis.oView.byId("saveTableFormUET").setVisible(true);
                
            }
            var reqData={
            FormBundleID:"'"+oThis.data.FormBundleID+"'",
            FormID:"'"+oThis.data.FormID+"'",
            FormNo:"'"+oThis.data.FormNo+"'",
            TableForm:"'"+tableForm+"'",
            };
            sap.umc.mobile.base.utils.busydialog.requireBusyDialog({});
            oThis.getDataProvider()._readTableForm(oThis,reqData,oThis.data.StatusID);
        }else if(oThis.data.FormBundleID && oThis.data.FormID && oThis.data.FormNo && !tableForm){
            
            
            if(((oThis.data.StatusID)?oThis.data.StatusID.toLowerCase():oThis.data.StatusID) !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                oThis.oView.byId("saveUET").setVisible(true);
                   //oThis.oView.byId("validateUET").setVisible(true);
            }
            var reqData={
            FormBundleID:"'"+oThis.data.FormBundleID+"'",
            FormID:"'"+oThis.data.FormID+"'",
            FormNo:"'"+oThis.data.FormNo+"'",
            TableForm:"'"+tableForm+"'",
            };
            
            oThis.getDataProvider().getDisplayFormData(oThis,reqData,oThis.data.StatusID);
        }else if(tableForm){
            oThis.oView.byId("saveTableFormUET").setVisible(true);
            oThis.oUNEMPLOYMENT_TAXModel.setData([]);
        }else{
            oThis.oView.byId("saveUET").setVisible(true);
           //oThis.oView.byId("validateUET").setVisible(true);
            oThis.oFieldEnabled ={                        
                    "Enabled":true  
            };
            oThis.oEnabledModel.setData(oThis.oFieldEnabled);
            this.oForm1Data=jQuery.extend( {}, this.oForm1DataNew);
            oThis.oSUETModel.setData(this.oForm1Data);
            
            var FormNo="1";
            if(oThis.data.oFormsListCount){
                FormNo=parseInt(FormNo)+oThis.data.oFormsListCount;
                FormNo=FormNo.toString();
            }
            oThis.data.FormNo=FormNo;
        }     
    },
    
    onDisplayformLoaded:function(formData,isTableForm){
        this["o"+this.data.FormID+"Model"].setData(formData);
        /*var oThis = this;*/
    	if(!isTableForm){
    		sap.ui.getCore().byId("DP1").setDateValue(sap.umc.mobile.forms.js.utils.javascriptDate(oThis["o"+oThis.data.FormID+"Model"].oData.A_F2_DUEDATE));
    		sap.ui.getCore().byId("DP2").setDateValue(sap.umc.mobile.forms.js.utils.javascriptDate(oThis["o"+oThis.data.FormID+"Model"].oData.A_F3_PENALTYAFTERDUEDATE));}
    		/* this.getView().getModel("SUETModel").oData.A_F3_PENALTYAFTERDUEDATE = this.formatDate(sap.ui.getCore().byId("DP2").getDateValue());

    		oThis["o"+oThis.data.FormID+"Model"].refresh();
    		oThis["o"+oThis.data.FormID+"Model"].updateBindings();*/
		
        
       
        if(isTableForm){
            this.savedTableFormData=JSON.parse(JSON.stringify(formData));
            sap.umc.mobile.base.utils.busydialog.releaseBusyDialog();
        }
            
        
    },
    
    
    hideAllButtons:function(){
        if(this.showSubmitBtnOnAllTabs && this.data.StatusID && (this.data.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())){
            this.oView.byId("submitUET").setVisible(true);  
        }else{
            this.oView.byId("submitUET").setVisible(false);
        }       
        this.oView.byId("addFormBtnUET").setVisible(false);        
        this.oView.byId("saveUET").setVisible(false);
        this.oView.byId("validateUET").setVisible(false);
        this.oView.byId("errorCountUET").setVisible(false);
        this.oView.byId("FormPayBillUET").setVisible(false);
        this.oView.byId("saveTableFormUET").setVisible(false);
        
    },
    
    onFormBundleTypesLoaded:function(oData){
        var bar = this.getView().byId("idIconTabBarUET");
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

            if(index===1){
                //initial content 
                oThis.data.MaximumInstances=e.MaximumInstances;
                oThis.data.MinimumInstances=e.MinimumInstances;
                oThis.data.FormDescription=e.FormDescription;
                oThis.data.FormID=e.FormID;
                if(e.FormBundleTypeDescription)
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
    
    SUETOnChange:function(evt){
        this.SUETInputFlag= true;
    },
    onDP2change:function(evt){
        
        
        this.SUETOnChange();
        
        this.getView().getModel("SUETModel").oData.A_F3_PENALTYAFTERDUEDATE = this.formatDate(sap.ui.getCore().byId("DP2").getDateValue());
    },
onDP1change:function(evt){
        
        
        this.SUETOnChange();
        
        this.getView().getModel("SUETModel").oData.A_F2_DUEDATE = this.formatDate(sap.ui.getCore().byId("DP1").getDateValue());
    },
    formatDate:function(sDate){
    	if(Date.prototype.isPrototypeOf(sDate)){  
			var sFormattedDate = "";
			sFormattedDate += sDate.getFullYear().toString()+"-";
		if((sDate.getMonth()+1)<10){
			sFormattedDate += "0"+(sDate.getMonth()+1).toString()+"-";
		}
		else
			{
			sFormattedDate += (sDate.getMonth()+1).toString()+"-";
			}
		if((sDate.getDate())<10){
			sFormattedDate += "0"+sDate.getDate().toString();
		}
		else
			{
			sFormattedDate += sDate.getDate().toString();
			}
return sFormattedDate+"T"+"00:00:00";}
	 else{
		 return	 sDate;
	 }
    	
    	/*
    	 if(Date.prototype.isPrototypeOf(sDate)){
		var sLocalDateTemp = sDate.toLocaleDateString();
		
		var sLocalDate= "";
		
		for(var i =0;i<sLocalDateTemp.length;i++){
			if(!(sLocalDateTemp.charCodeAt(i)===8206)){
				
				sLocalDate += sLocalDateTemp.charAt(i);
				
			}
			
		}
		var sSplitDate =  sLocalDate.split("/");
		var sFormattedDate = sSplitDate[2]+"-";
		if(sSplitDate[0].length ==1 ){
		sFormattedDate += "0"+sSplitDate[0]+"-";	
		}
		else{
			sFormattedDate += sSplitDate[0]+"-";	
		}
		if(sSplitDate[1].length ==1 ){
			sFormattedDate += "0"+sSplitDate[1];	
			}
			else{
				sFormattedDate += sSplitDate[1];	
			}
		
		//time
		sLocalTime= sDate.toTimeString();
		sSplitTime =  sLocalTime.split(" ");
		
		return sFormattedDate+"T"+"00:00:00";}
    	 else{
    		 return	 sDate;
    	 }
	*/},
    UNEMPLOYMENT_TAXOnChange:function(){
        this.UNEMPLOYMENT_TAXInputFlag= true;
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
        	  this.bNoFormData=false;
            this.getDataProvider().submitForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,this.bNoFormData); }
    },
    
    handleSavePress : function(){
    	this.bNoFormData=false;
        this.getDataProvider().submitForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT,this.bNoFormData);                
    },
    
    handleTableFormSave:function(){
        this.getDataProvider()._submitTableFormData(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT);
        
    },
        
    getSelectedFilter:function(){
        var bar = this.getView().byId("idIconTabBarUET");
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
        this.SUETInputFlag=false;
        this.UNEMPLOYMENT_TAXInputFlag=false;
        this.data.FormBundleID=FormBundleID;
        this.setFormTitle();
        this.data.StatusID=StatusID;
        this.handleIconTabBarSelect();
    },    

    openDialog: function (text,FormBundleID,StatusID,tableFormData) {
        this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, text);
        if(tableFormData){
           this.savedTableFormData=JSON.parse(JSON.stringify(tableFormData));
        	//this.savedTableFormData=[];
        }
        if(FormBundleID){
            this.onFormSaved(FormBundleID,StatusID);  
        }
        
      },
      
    onValidateSuccess:function(MessageData,FormData,isValidate,isSaveCall){
        var messageData=[];
        if(MessageData)
        messageData = JSON.parse(MessageData);
        var formData=JSON.parse(FormData); 
        var oThis=this;
         //this.errorCountBtn=  oThis.getView().byId("errorCountUET");
        if(oThis.data.FormID==="SUET"){
            var data = oThis.oSUETModel.getData();
            if(formData.length){
                $.each(formData[0].DATA, function( index, value ) {
                    data[value.FIELDNAME]=value.FIELDVALUE;                               
                    });             
                   oThis.oSUETModel.setData(data) ;
            } 
        }else if(oThis.data.FormID==="UNEMPLOYMENT_TAX"){            
            if(formData.length){
                var data = oThis.oUNEMPLOYMENT_TAXModel.getData();
                $.each(formData[0].DATA, function( index, value ) {
                    data[value.FIELDNAME]=value.FIELDVALUE;                               
                    });                
                   oThis.oUNEMPLOYMENT_TAXModel.setData(data) ;
            } 
        }
        
        
        if(messageData.length){
            var items=[];
            var sMessageToastMsg = "";
            $.each(messageData, function( index, value ) {
                if(value.FIELDNAME){
                   // var input = sap.ui.getCore().getElementById(oThis.data.FormID+"_"+value.FIELDNAME+"_input");
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
                    //input.setValueState(sap.ui.core.ValueState.Error);
                    input.setValueStateText(value.MESSAGETEXT);
                    //input.setTooltip(value.MESSAGETEXT);
                    /*input.attachBrowserEvent("click", function() {
                        input.setValueState(sap.ui.core.ValueState.None);
                        
                    });*/
                    input.attachLiveChange(function(evt) {
                    input.setValueState(sap.ui.core.ValueState.None);
                    });
                    if(index===0){
                        input.focus(true);
                    }
                    var col = oThis._getColumnListItem(value);
                    	/*new sap.m.CustomListItem({
                        content:[new sap.m.Label({text:value.MESSAGETEXT}).addStyleClass("sapUmcHorizontalAfterSpacingX1 sapUmcHorizontalBeforeSpacingX1")],
                        type:"Navigation",
                        press:function(){
                            input.focus(true);
                        }
                    });*/
                    items.push(col);                    
                }else{
                    var col = new sap.m.CustomListItem({
                        content:[new sap.m.Label({text:value.MESSAGETEXT}).addStyleClass("sapUmcHorizontalAfterSpacingX1 sapUmcHorizontalBeforeSpacingX1")],
                        type:"Navigation",
                        press:function(){
                            
                        }
                    });
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
            	 this.errorCountBtn=  oThis.getView().byId("errorCountUET");		
                 this.errorCountBtn.attachPress(function(){		
                         oThis.popover.openBy(this);		
                 });		
            	 		
             }
             this.errorCountBtn.setText(messageData.length);
           /*  this.errorCountBtn.attachPress(function(){
                     popover.openBy(this);
             });*/
             this.errorCountBtn.setVisible(true);
             
             var bar =this.getView().byId("idIconTabBarUET");             
             bar.setSelectedKey(this.data.FormID);
             this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,sMessageToastMsg);
        }else{
            if(isValidate){
             this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, this.getText("FORMS.ERROR_CHECK_SUCCESS"));
            }
            this.errorCountBtn.setVisible(false);
        }  
        
        if(isSaveCall && !messageData.length){
        	this.bNoFormData=false;
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
                              
                              var bar = oThis.getView().byId("idIconTabBarUET");
                              bar.setSelectedKey(value.FORMID);
                              oThis.handleIconTabBarSelect();
                              var filter= oThis.getSelectedFilter();
                              bar.removeAllContent(); //barObj.remove
                              filter.removeAllContent();
                              if(value.FORMID == "SUET"){
                                  if(!oThis.SUETForm){
                                      oThis.SUETForm=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.UETForms.SUET", this);
                                  }
                                  bar.addContent(oThis.SUETForm);
                                  oThis.data.FormNo = value.FORMNO;
                                  oThis.showFormData(false,value.FORMID); 
                              }
                             /* var input = sap.ui.getCore().getElementById(oThis.data.FormID+"_"+value.FIELDNAME+"_input");
                             */ 
                              var input = oThis._getFormControlFromFieldNameWithErrorValueState(value.FIELDNAME);
                              if (input){ switch(value.MESSAGETYPE) {
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
                                  
                                  //input.setValueState(sap.ui.core.ValueState.Error);
                                  input.setValueStateText(value.MESSAGETEXT);
                                  //input.setTooltip(value.MESSAGETEXT);
                                  input.attachLiveChange(function(evt) {
                                  input.setValueState(sap.ui.core.ValueState.None);
                                  });
                                  input.focus(true);
                              }
                          });
                      }
                      
                      
                      items.push(col);                    
                               
                });
              
              var bar =this.getView().byId("idIconTabBarUET");
              bar.removeAllContent();
              this.data.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT;
                 if(bar && bar.getSelectedKey()=="submit" && items.length){
                   bar.addContent(new sap.m.List({
                       headerText:this.getText("FORMS.ERROR_MESSAGES"),
                       items:[items]
                   }).addStyleClass("sapFmcaErrorMessages"));
               }
          }
          
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
      
          var bar =oThis.getView().byId("idIconTabBarUET");
          if(!oThis.data.FormBundleID){  
              if(this.oUNEMPLOYMENT_TAXModel.oData.length>0){
                  oThis.UNEMPLOYMENT_TAXInputFlag=true;
              }
              
          }else{
               
              if(!(JSON.stringify(this.oUNEMPLOYMENT_TAXModel.oData) === JSON.stringify(this.savedTableFormData)))
                  oThis.UNEMPLOYMENT_TAXInputFlag=true;
              else
                  oThis.UNEMPLOYMENT_TAXInputFlag=false;
          }
          if(oThis.SUETInputFlag===true || oThis.UNEMPLOYMENT_TAXInputFlag===true){
             this.prevActiveTabKey=oThis.data.FormID;
             var saveBtn =new sap.m.Button({
                 text:oThis.getText("FORMS.SAVE_DRAFT"),
                 icon:"sap-icon://save",
                 press:function(evt){
                     //oThis.handleSavePress();
                	 //p
                	 //oThis.oUNEMPLOYMENT_TAXModel.setData([]);
                	if(oThis.UNEMPLOYMENT_TAXInputFlag===true)
                	 {oThis.handleTableFormSave();
                	 oThis.UNEMPLOYMENT_TAXInputFlag=false;
                	 }
                	if(oThis.SUETInputFlag===true)
                	{ oThis.handleSavePress();
                	oThis.SUETInputFlag=false;
                	}
                 //    oThis.handleIconTabBarSelect();
                     oThis.alertDialog.close(); 
                     
                 }
             });
             var withoutSaveBtn = new sap.m.Button({
                 text:oThis.getText("FORMS.CONTINUE_WITHOUT_SAVE"),
                 press:function(){
                    // bar.setSelectedKey(oThis.prevActiveTabKey);
                     oThis.alertDialog.close();
                     oThis.UNEMPLOYMENT_TAXInputFlag=false;
                     oThis.SUETInputFlag= false;
                     //p
                     oThis.oUNEMPLOYMENT_TAXModel.setData(oThis.savedTableFormData);
                     oThis.handleIconTabBarSelect();
                     
                      
                 }    
             });
             var cancelBtn = new sap.m.Button({
                 text:oThis.getText("FILING_OBLIGATIONS.CANCEL"),
                 press:function(){
                     bar.setSelectedKey(oThis.prevActiveTabKey);
                     oThis.alertDialog.close(); 
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
            var bar = oThis.getView().byId("idIconTabBarUET");
            var filter= oThis.getSelectedFilter();
            bar.removeAllContent(); //barObj.remove
            filter.removeAllContent();
            var sKey = bar.getSelectedKey();
            oThis.hideAllButtons();
            
            var newForm=false;
            if (typeof addNewForm !== 'undefined') {
                newForm=addNewForm;
            }
            
            if (sKey === "SUET") {
                this.data.FormDescription=filter.getProperty("text");
                this.data.FormID=sKey;
                this.data.MaximumInstances=filter.getCustomData()[0].getValue();
                this.data.MinimumInstances=filter.getCustomData()[1].getValue();
                if(this.data.FormBundleID && !newForm && (this.data.MaximumInstances>1)){
                    if (!this.formInstanceFragment) {
                        this.oFormInstancesController = sap.umc.mobile.forms.view.forms.FormInstances;
                        this.formInstanceFragment = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.FormInstances", this.oFormInstancesController);
                        this.oFormInstancesController.setView(this.getView());
                        
                    }
                    this.oFormInstancesController.read(this.data);
                    bar.addContent(this.formInstanceFragment);
                     
                }else{
                    if(!this.SUETForm){
                        this.SUETForm=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.UETForms.SUET", this);
                    }
                    bar.addContent(this.SUETForm);
                    this.showFormData(true,'');
                    if(this.isPrepopulate)
                    this.prePopulateFields();
                }
                
            }else if (sKey === "UNEMPLOYMENT_TAX") {
            	this.oUNEMPLOYMENT_TAXModel.setData([]);
                this.data.FormDescription=filter.getProperty("text");
                this.data.FormID=sKey;
                this.data.MaximumInstances=filter.getCustomData()[0].getValue();
                this.data.MinimumInstances=filter.getCustomData()[1].getValue();
                
                if(!this.UNEMPLOYMENT_TAXTable){
                    this.UNEMPLOYMENT_TAXTable=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.UETForms.UNEMPLOYMENT_TAX", this);
                    var table=sap.ui.getCore().byId("UnemploymentTaxTable");
                    /*var editBtn=sap.ui.getCore().byId("editToggleBtn");
                    editBtn.setPressed(false);*/
                    /*var fnOld = sap.ui.core.FocusHandler.prototype.restoreFocus;
                    var tableId = "UnemploymentTaxTable";
                    
                    sap.ui.core.FocusHandler.prototype.restoreFocus = function(oControlFocusInfo){
                        var info = this.oLastFocusedControlInfo;
                    if (sap.ui.getCore().byId(this.oLastFocusedControlInfo.id) && sap.ui.getCore().byId(this.oLastFocusedControlInfo.id).getDomRef() !== null){
                        fnOld(this.oLastFocusedControlInfo);
                    }else{
                        var id = info.id;
                        var arr =id.split("clone");
                        arr[1]= parseInt(arr[1])+1;
                        var newId = arr[0]+"clone"+arr[1];
                        if(sap.ui.getCore().byId(newId)&& sap.ui.getCore().byId(newId).getParent() && sap.ui.getCore().byId(newId).getParent().getParent() && sap.ui.getCore().byId(newId).getParent().getParent().getId()==tableId){
                            sap.ui.getCore().byId(newId).focus(true);
                        }else{
                            fnOld(info);
                        }
                        info.id=newId;
                        info.info.id = newId;
                        info.focusref = $("#"+newId +" input")[0]; 
                       // sap.ui.getCore().byId(newId).focus(true);
                        info.control=sap.ui.getCore().byId(newId);
                        fnOld.apply(this,info);
                      }
                   };*/
                    
                    
                    /*table.attachUpdateFinished(function(evt){
                        var selectedItems=table.getSelectedItems();
                        var editBtn=sap.ui.getCore().byId("editToggleBtn");
                        if(editBtn.getPressed()){
                            $.each(selectedItems,function(i,e){
                                var cells = e.getCells();
                                $.each(cells,function(index,input){
                                    input.setEditable(true);
                                });
                            }); 
                        }
                    });*/

                }
                bar.addContent(this.UNEMPLOYMENT_TAXTable);
                var editBtn=sap.ui.getCore().byId("editToggleBtn");
                editBtn.setPressed(false);
                this.showFormData(sKey,'X');
                
                
                
            }else if (sKey === "attachments") {
                this.oAttachmentsController = sap.umc.mobile.forms.view.forms.Attachments;
                this.oAttachmentsController.setView(this.getView());
              if (!this.AttachmentsFragment) {
              
                  this.AttachmentsFragment = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.Attachments", this.oAttachmentsController);
             
              }
              bar.addContent(this.AttachmentsFragment);
                         
              if(this.data && this.data.FormBundleID){
                  this.oAttachmentsController._loadAttachments();
                  /*if(((this.data.StatusID)?this.data.StatusID.toLowerCase():this.data.StatusID) === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                      this.oAttachmentsController.handleUploadBtn(false);
                  }else{
                      this.oAttachmentsController.handleUploadBtn(true);
                  } */
              }else{
            	  this.bNoFormData=true;
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
                  this.oView.byId("submitUET").setVisible(true);
              }
              
          } 
          else if (sKey === "payment"){
        	  
        	  if(!this.paymentBusyDialog){
        		  this.paymentBusyDialog = new sap.m.BusyDialog();
        	  }
        	
        	
        	  this.paymentBusyDialog.open();
        	setTimeout(function(){
        		oThis._populatePayments();
				},0);
          }
            /*else if (sKey === "payment"){
              this.oView.byId("FormPayBillUET").setVisible(true);
              
              //add payment fragment
              
              this.getApp().getComponents().getInvoice();
              if (!this._paymentsFragment) {
                  this.oPaymentsController = sap.umc.mobile.invoice.view.PaymentsController;
                  this._paymentsFragment = sap.ui.xmlfragment("sap.umc.mobile.invoice.view.Payments", this.oPaymentsController);
                  this.oPaymentsController.setView(this.getView());
                  this.oView.byId("FormPayBillUET").attachPress(null, this.oPaymentsController.onSubmitOneTimePayment, this.oPaymentsController);
              }
         //     var oParameters = {};
            //  oParameters.Amount = this.amountText.getText();
              if(this.data.FormBundleID){
                  var data = {};
                  data.FormBundleID = "'"+this.data.FormBundleID+"'";
                  data.FormID="'"+this.FormIDForPayAmount+"'";
                  data.FormNo = "'"+this.FormNoForPayAmount+"'";
                  this.getDataProvider()._readFormOnSubmitTab(this,data,true);
              }
             //oParameters.Amount=100;
           //   var sCurrency = this.getView().getModel("invoice").getProperty("/Currency");
            //  oParameters.Amount = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(oParameters.Amount, sCurrency);
            //  oParameters.EnablePaymentAmount = true;
         //     this._hidecvcOnload();
         //     this.oPaymentsController.read(oParameters);
             // this._addContentView(this._paymentsFragment);
              bar.addContent(this._paymentsFragment);
              
          }*/
          
      },
      
     _populatePayments: function(){
    	  
    	  var oThis = this;
          var bar = oThis.getView().byId("idIconTabBarUET");
    	  
    	  if(this.data.FormBundleID) {
          this.oView.byId("FormPayBillUET").setVisible(true);
          //dont put check on the controller always run the below code
          //do that the current instance of uet form is set as view
          this.oPaymentsController = sap.umc.mobile.forms.view.forms.PaymentsController;
          this.oPaymentsController.setView(this.getView());
          
          //always do check on fragment else multiple fragments will create n for all the fragments creted each time
          //multiple errors n multiple payments will happen
          //also handle paybutton shouuld run only once otherwise multiple will get attached
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
                
                this._hidecvcOnload();
              //dont put check on the controller always run the below code
                //do that the current instance of uet form is set as view
                this.oPaymentsHistoryController = sap.umc.mobile.forms.view.forms.PaymentsHistoryController;
                this.oPaymentsHistoryController.setView(this.getView());
                
              //payment history fragment creation
              //always do check on fragment else multiple fragments will create n for all the fragments creted each time
                //multiple errors n multiple payments will happen
    			if (!this._paymentsHistoryFragment) {

    				
    				this._paymentsHistoryFragment = sap.ui
    						.xmlfragment(
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
        var bar = oThis.getView().byId("idIconTabBarUET");
        if( oThis.getView().getModel("existingAccounts").getProperty("/amount")>0){
      	  bar.addContent(oThis._paymentsFragment);}
      	 else{
      		 var oNoPaymentHBox = new sap.m.VBox();
      		/* <Label text="{i18n>INVOICE.PAYMENTDETAILS}"
					class="sapUmcVerticalAfterSpacingX1 sapUmcSectionHeading sapUmcVerticalBeforeSpacingX2" />*/
      		 
      		 //var oHeadHBox = new sap.m.VBox().addStyleClass("sapUmcHeadingWrapperBottomLine");
      		 var sHead = new sap.m.Label({text:"{i18n>INVOICE.PAYMENTDETAILS}"}).addStyleClass("sapUmcSubsectionHeading")
      		 .addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
      		// oHeadHBox.addItem(sHead);
      		 var oMsgHBox = new sap.m.VBox();
      		 var sMsg = new sap.m.Label({text:"{i18n>FORMS.NO_LIABILITIES}"}).addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
      		 oMsgHBox.addItem(sMsg);
      		
      		 oNoPaymentHBox.addItem(sHead).addItem(oMsgHBox);
      		 bar.addContent(oNoPaymentHBox); 
      	 } 
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
      this.paymentBusyDialog.close();
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
     /* setPaymentAmount:function(amount){
          var oParameters = {};
          if(amount){
              oParameters.Amount = parseFloat(amount);
            }else{
              oParameters.Amount = 0;
            }
          oParameters.EnablePaymentAmount = true;
          if(this.oPaymentsController){
              this.oPaymentsController = sap.umc.mobile.invoice.view.PaymentsController;
          }
          this.oPaymentsController.read(oParameters);
      },*/
    
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
      /*  if(bPaymentTab){
      	  
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
		
		/*if (this._paymentsFragment) {*/
			this.getPayButton().attachPress(null, this.oPaymentsController.onSubmitOneTimePayment, this.oPaymentsController);
		/*}*/
		
	},
	getPayButton: function() {
		return this.getView().byId("FormPayBillUET");
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
		
		
		 var bar = this.getView().byId("idIconTabBarUET");
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
		
		
		var oUETIconTabBar = this.getView().byId("idIconTabBarUET");
		var oUETIconTabBarItems =  oUETIconTabBar.getItems();
		  $.each(oUETIconTabBarItems, function(index,oUETIconTabFilter){
            if(typeof(oUETIconTabFilter.getKey)=="function" && oUETIconTabFilter.getKey()==="payment"){
          	  //enabling the payment tab
          	  oUETIconTabFilter.setEnabled(true);
            }
        });
		
	},
      
      rerenderTable:function(){
          var table=sap.ui.getCore().byId("UnemploymentTaxTable");
          table.rerender();
      },
            
      editRowsPress:function(evt){
          sap.umc.mobile.base.utils.busydialog.requireBusyDialog({});
          var table=sap.ui.getCore().byId("UnemploymentTaxTable");
          
          var s = evt.getSource();
          var selectedItems;
          if(s.getPressed()){
           //   table.setGrowing(false);
              selectedItems=table.getSelectedItems();
              
          }else{
           //   table.setGrowing(true);
              selectedItems=table.getItems();
          }
          $.each(selectedItems,function(i,e){
              var cells = e.getCells();
              $.each(cells,function(index,input){
                  input.setEditable(s.getPressed());
                  input.attachChange(function(event){event.preventDefault();});
              });
          });
          sap.umc.mobile.base.utils.busydialog.releaseBusyDialog();
          
      },
      duplicateRowsPress:function(){
          var table=sap.ui.getCore().byId("UnemploymentTaxTable");
          var selectedItems=table.getSelectedItems();
          if((table.getItems().length+selectedItems.length)>this.tableRowsLimit){
        	   this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,this.getFormattedText("FORMS.TABLE_LIMIT",[this.tableRowsLimit]));
          }
        	  else{
          var m = this.oUNEMPLOYMENT_TAXModel;
        
          $.each(selectedItems,function(i,e){
              var sPath = e.oBindingContexts.UNEMPLOYMENT_TAXModel.sPath;
             // var obj = m.getObject(sPath);
              var obj = jQuery.extend( {}, m.getObject(sPath));
              m.oData.unshift(obj);
              
          });
          m.refresh();
          table.removeSelections(true);
          }
      //    this.rerenderTable();
      },
      
      deleteRowsPress:function(){
          var table=sap.ui.getCore().byId("UnemploymentTaxTable");
          var m = this.oUNEMPLOYMENT_TAXModel;
          var selectedItems=table.getSelectedItems();          
          if(table.isAllSelectableSelected()){
              $.each(selectedItems.reverse(),function(i,e){
                  var sPath = e.oBindingContexts.UNEMPLOYMENT_TAXModel.sPath;
                  e.setSelected(false);
                  m.oData.splice(sPath.split("/")[1],1);   
               });
              m.oData=[];
          }else {
              $.each(selectedItems.reverse(),function(i,e){
                  var sPath = e.oBindingContexts.UNEMPLOYMENT_TAXModel.sPath;
                  e.setSelected(false);
                  m.oData.splice(sPath.split("/")[1],1);   
               });
          }      
          m.refresh();
        //  this.rerenderTable();
      },
      
      addRowPress:function(){
          var table=sap.ui.getCore().byId("UnemploymentTaxTable");
          var length = table.getItems().length;
          if(length <= (this.tableRowsLimit-1)){
          var m = this.oUNEMPLOYMENT_TAXModel;
          this.oForm2Data=jQuery.extend( {}, this.oForm2DataNew);
          m.oData.unshift(this.oForm2Data);
          m.refresh();
         // var editBtn=sap.ui.getCore().byId("editToggleBtn");
        //  editBtn.setPressed(true);
          table.removeSelections(true);
          var firstItem=table.getItems()[0];
          firstItem.setSelected(true);
          var cells = firstItem.getCells();
          $.each(cells,function(index,input){
              input.setEditable(true);
          });}
          else{
            this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,this.getFormattedText("FORMS.TABLE_LIMIT",[this.tableRowsLimit]));
  
          }

               
      },

      
      csvJSON:function(csv){
          
          var i;
          var j;
          //this could be changed to replace with just "'"
          var input = csv.replace(/\"\"/g, encodeURIComponent('"'));
          //split on " to create an odds in quotes
          var quotesAndValues = input.split(/\"/g);
          var escapedInput;

          var quotesAndValuesLength = quotesAndValues.length;
          //encode the odd positions as these should be treated as one value
          //and need to ignore , 
          for (i = 1; i < quotesAndValuesLength; i = i + 2) {
              quotesAndValues[i] = encodeURIComponent(quotesAndValues[i]);
          }
          //join together the newly escaped values with no gaps
          escapedInput = quotesAndValues.join("");
          //split at new lines to get each row
          var lines = escapedInput.split(/\r\n|\n/g);

          var result = [];
          //split index 0 at , to get headers
          var headers = lines[0].split(/,/g);
          var headersLength = headers.length;
          for (i = 0; i < headersLength; i++) {
              //Headers will be JS objects so replace special char with safe _
              headers[i] = headers[i].replace(/\W/g, '_');
          }

          for (i = 1; i < lines.length; i++) {

              var obj = {};
              //splitat , to get values
              var currentline = lines[i].split(/,/g);
              var headersLength = headers.length;
              for (j = 0; j < headersLength; j++) {
                  //double decode
                  //first: decodes the quoted values , % etc
                  //second: decodes the double quotes that were escaped at the start as %22 (%2522)
                  //this may not be performant 
                  obj[headers[j]] = decodeURIComponent(decodeURIComponent(currentline[j]));
                  if(obj[headers[j]]==="undefined"){
                      obj[headers[j]]="";
                  }
                  
              }

              result.push(obj);

          }
          var resultLength = result.length;
          for(var k=1;k<=resultLength;k++){
          var lastObj = $(result).get(-1);
          if(lastObj.FIRST_NAME===""&&lastObj.MAIN_NAME===""&&lastObj.TAXABLE_WAGES===""&&lastObj.TOTAL_WAGES===""&&lastObj.TAX_NUMBER===""){
             result.pop();
          }
          else{
             break;
         }
         }
          return result;
        },
      
        uploadChange:function(evt){
            var oThis = this;
            var file = jQuery.sap.domById("fileUploader-fu").files[0];
            if(file){
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                  // Great success! All the File APIs are supported.
                    var reader = new FileReader();
                    
                    reader.onload = (function(theFile) {
                      return function(e) {
                        var json = oThis.csvJSON(e.target.result);
                        var table=sap.ui.getCore().byId("UnemploymentTaxTable");
                          var length = table.getItems().length;

                        if((json.length+length)>oThis.tableRowsLimit){
                            oThis.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,oThis.getFormattedText("FORMS.TABLE_LIMIT",[oThis.tableRowsLimit]));
                        }
                        else{
                        var m = oThis.oUNEMPLOYMENT_TAXModel;
                        $.each(json,function(i,e){m.oData.push(e);});
                        m.refresh();
                        oThis.rerenderTable();}
                        
                      };
                    })(file);
      
                    reader.readAsText(file);
                } else {
                    this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.umc.mobile.private.app.Constants.MESSAGE_ERROR);
                }
            }
        },
      handleTypeMissmatch: function(oEvent) {
          var aFileTypes = oEvent.getSource().getFileType();
          $.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value;});
          var sSupportedFileTypes = aFileTypes.join(", ");
          this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,this.getFormattedText("FORMS.FILE_NOT_SUPPORTED",[oEvent.getParameter("fileType"),sSupportedFileTypes]));
        },
        
      handleUploadPress: function(oEvent) {

            var oThis = this;
            if(!oThis.fileUploader){
                oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploader",{
                    width:"400px",
                    tooltip:oThis.getText("DOCUMENTS.SELECT_FILE"),
                    typeMissmatch:function(oEvent){
                        oThis.handleTypeMissmatch(oEvent);
                    },
                    fileType:"csv"
                 });
            }

            this.uploadBtn = new sap.m.Button({
                icon:"sap-icon://upload",
                text:oThis.getText("DOCUMENTS.UPLOAD"),
                press:function(){
                   // var oFileUploader = sap.ui.getCore().byId("fileUploader");
                    if(oThis.fileUploader.getValue()) {
                       oThis.uploadChange();
                       if(oThis.uploadDialog.isOpen())
                       oThis.uploadDialog.close();
                    }
                }
            });
            
            this.dialogCloseBtn = new sap.m.Button({
               text:oThis.getText("FILING_OBLIGATIONS.CANCEL"),
               press:function(evt){
                  if(oThis.uploadDialog && oThis.uploadDialog.isOpen()){
                      oThis.uploadDialog.close();
                  } 
               }
            });
            
            if(!this.uploadDialog){
                this.uploadDialog = new sap.m.Dialog({
                    title:this.getText("DOCUMENTS.SELECT_FILE"),
                    content:[oThis.fileUploader],
                    buttons:[this.uploadBtn,this.dialogCloseBtn]
                });
            }
            this.uploadDialog.open();
            
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
      		  
      		 oThis.getView().byId("FormPayBillUET").setVisible(false);
      		 // oThis.getView().getModel("existingAccounts").setProperty("/paymentEnabled",false);
      		  this.oDeferredFlagToLoadBankCard.reject();
      		  var bar = oThis.getView().byId("idIconTabBarUET");
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
