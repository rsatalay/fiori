jQuery.sap.declare("sap.umc.mobile.forms.view.forms.FormInstances");

sap.umc.mobile.forms.view.forms.FormInstances={
        
    setView: function(oView) {
        this._oView = oView;
    },
    getView: function() {
        return this._oView;
    },
    getDataProvider: function() {
        return sap.umc.mobile.forms.model.DataProvider;
    },    
    
   

	/*onExistingFormsLoaded:function(oFormsList,filter){
		 var parent = this.getView().oController;
		  var oIconTabFilterData = filter.data()[filter.getKey()];
		  
		 parent._addNavcontainer(filter, oFormsList);
		  
		*//*	*****************************/
		 /* if(oFormsList.getData().length && oIconTabFilterData.MaximumInstances > 1 ){
			  
			  //  navto list
				  var spageID =  "idpage"+filter.getKey()+"FormsList";
				  parent["o"+filter.getKey()+"NavCon"].to(spageID);
			
			  //FormListCount property will only be there when the maximum no of instances is more 
		        //than 1, else this property will  not be there
		        filter.data("FormsListCount",oFormsList.getData().length);
		        this.getView().setModel(oFormsList, "ExistingForms");
		        
		     
		        
		  }
		  else if(oFormsList.getData().length===1 && oIconTabFilterData.MaximumInstances === 1 ){
			 // navto form get form data and display
			  var spageID =  "idpage"+filter.getKey()+"Form";
			  parent["o"+filter.getKey()+"NavCon"].to(spageID);
			  filter.data().CurrentFormNo = "1";
			  parent.getFormData(filter);
		  } 
		  else if (!(oFormsList.getData().length)){
			  var spageID =  "idpage"+filter.getKey()+"Form";
			  parent["o"+filter.getKey()+"NavCon"].to(spageID);
			  parent.createNewLocalFormInstance(filter);
		  }*/
	     
		//commented below for time being
		//generate pick up all the forms that were created by addForm button and append to oFormsList
		  
		  
	/*	  if(!($.isEmptyObject(parent.oAllFormsData)))
		 var oFormInstances =  parent.oAllFormsData[oIconTabFilterData.FormID];
		  if(!($.isEmptyObject(oFormInstances))){
			  for(var formNo in oFormInstances){
					 
				  var oFormInstance = oFormInstances[formNo] ;
				  if(!($.isEmptyObject(oFormInstance))){
					  if(oFormInstance.bLocalInstance){
						  
						      oFormsList.getData().push({
						    	  
						    	      "FIELDINDEX": "",
						    		  "FORMID": oIconTabFilterData.FormID,
						    		  "FORMNO": formNo,
						    		  "FormDescription": oIconTabFilterData.FormDescription,
						    		  "PeriodID": oIconTabFilterData.PeriodID,
						    		  "TABLEFORM": "",
						    	  
						      })
					  }
					  
				  }
				  
				 }
			  
		  }*/
		//commented above for time being
		  
		  
		 
		
		
		/*************************/
	 
	    
        
        
        //handle button visibility later
   /*     if(filter.data().FormsListCount<parseInt(oIconTabFilterData.MaximumInstances)){            
            parent.getView().byId("addFormBtnSUT").setVisible(true);      
        }else{
            parent.getView().byId("addFormBtnSUT").setVisible(false);
        }
        if(((parent.oCurrentFormBundle.StatusID)? parent.oCurrentFormBundle.StatusID.toLowerCase() : parent.oCurrentFormBundle.StatusID ) === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
            parent.getView().byId("addFormBtnSUT").setVisible(false); 
            parent.getView().byId("submitSUT").setVisible(false);
        }else{
            if(filter.data().FormsListCount<parseInt(oIconTabFilterData.MaximumInstances)){          
                parent.getView().byId("addFormBtnSUT").setVisible(true);
            } else {
            parent.getView().byId("addFormBtnSUT").setVisible(false);
            }
        }
    },
    
*/
    _handleListItemPress:function(filter){
    	 var parent = this.getView().oController;
    	 var sKey = filter.getKey();
    	 parent.setDefaultValueState(sKey);
    	 var FilterData = filter.data();
    	 if(parent.oAllFormsData[sKey] && parent.oAllFormsData[sKey][FilterData.CurrentFormNo] && parent.oAllFormsData[sKey][FilterData.CurrentFormNo]["FormData"]){
    		parent.navToFormPage(filter);
    	 }else
    		 {
    		 parent.getFormData(filter);
    		 }
    	 
    },
    onListItemPress:function(evt){
    	 var path = evt.getSource().oBindingContexts.ExistingForms.sPath;
         var m = evt.getSource().getModel("ExistingForms");
         var curr = m.getObject(path);
         var parent = this.getView().oController;
       
         var filter= parent.getSelectedFilter();
       //  var oIconTabFilterData = filter.data()[filter.getKey()];
         filter.data("CurrentFormNo", curr.FORMNO);
    	
    	this._handleListItemPress(filter);
    	
    	/*
        var path = evt.getSource().oBindingContexts.ExistingForms.sPath;
        var m = evt.getSource().getModel("ExistingForms");
        var curr = m.getObject(path);
        var parent = this.getView().oController;
      //  parent.data.FormNo=curr.FORMNO;
        var filter= parent.getSelectedFilter();
        var oIconTabFilterData = filter.data()[filter.getKey()];
        //below commented as value is not set to data with belo
        filter.data().FormNo = curr.FORMNO;
        filter.data("CurrentFormNo", curr.FORMNO);
       
        if(filter){
            filter.removeAllContent();
            var sKey = filter.getKey();
            if (sKey === "SSU1") {
                if(parent.SSU1Form){
                    parent.SSU1Form.destroy();
                    parent.SSU1Form='';   
                }
            
            if (!parent["_"+oIconTabFilterData.FormID+"Fragment"]) {
            	parent["_"+oIconTabFilterData.FormID+"Fragment"]=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.SUTForms."+oIconTabFilterData.FormID, parent);
            	
            	
            
            }
            filter.addContent(parent["_"+oIconTabFilterData.FormID+"Fragment"]);
         
                //parent.SSU1Form=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.SUTForms.SSU1", parent);
                    //filter.addContent(parent.SSU1Form);
                    parent.showFormData(false,filter);
                    this.getView().byId("addFormBtnSUT").setVisible(false);
            }
        }
    */},
    
	
};
