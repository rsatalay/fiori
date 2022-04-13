jQuery.sap.declare("sap.umc.mobile.forms.view.AddFormDetailsController");

sap.umc.mobile.forms.view.AddFormDetailsController = {
	setView: function(oView) {
		this._oView = oView;
	},
	getView: function() {
		return this._oView;
	},
	getDataProvider: function() {
		return sap.umc.mobile.forms.model.DataProvider;
	},
	
	onFormBundleTypeChange:function(evt){
		 this.getView().getController().oAddFormDetailsDialog.getModel("formBundleTypesOffline").setProperty("/bFormPeriodSelected",false);; 
		 sap.ui.getCore().byId("idFormBundleTypeAvailablePeriod").setSelectedKey(null);
		 var oSource  = evt.getSource();
		 var sPath = oSource.getSelectedItem().oBindingContexts.formBundleTypesOffline.sPath;
		 var oModel = oSource.getSelectedItem().oBindingContexts.formBundleTypesOffline.getModel();
		
		 this.getView().getController().oSelectedObject =  jQuery.extend( true, {}, oModel.getObject(sPath));

		 if(this.getView().getController().oSelectedObject.KeyDate === ""){
		 this.getView().getController().oAddFormDetailsDialog.getModel("formBundleTypesOffline").setProperty("/bFormPeriodBased",false); 
		 var sKeyDate = new Date();
         sKeyDate = this.formatDateKey(sKeyDate);
         this.getView().getController().oSelectedObject.KeyDate = sKeyDate;
         this.getView().getController().oAddFormDetailsDialog.getModel("formBundleTypesOffline").setProperty("/bFormPeriodSelected",true); 
		
	}
	else if(this.getView().getController().oSelectedObject.AvailablePeriods){
	
		//deep copy of object to a variable - extending an empty object
		var oAvailablePeriodsCopy=jQuery.extend( true, {}, this.getView().getController().oSelectedObject.AvailablePeriods);

		var oAvailablePeriods = new sap.ui.model.json.JSONModel();
		oAvailablePeriods.setData(oAvailablePeriodsCopy);	
		oAvailablePeriods.oData.results.unshift({PeriodID:"-1",Description:""});
		this.getView().getController().oAddFormDetailsDialog.setModel(oAvailablePeriods,"AvailablePeriods"); 
		this.getView().getController().oAddFormDetailsDialog.getModel("formBundleTypesOffline").setProperty("/bFormPeriodBased",true); 
	
	}
	else {
		 this.getView().getController().oAddFormDetailsDialog.getModel("formBundleTypesOffline").setProperty("/bFormPeriodBased",false); 
		
	}
    },
  
	formatDateKey:function(sDate){
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
	 }},

	 onFormBundleTypePeriodChange:function(evt){
		
		 var oSource  = evt.getSource();
		   var sPath = oSource.getSelectedItem().oBindingContexts.AvailablePeriods.sPath;
		   var oModel = oSource.getSelectedItem().oBindingContexts.AvailablePeriods.getModel();
			var oSelectedPeriodObject = oModel.getObject(sPath);
			if(oSelectedPeriodObject.PeriodID !== "-1"){
				 this.getView().getController().oAddFormDetailsDialog.getModel("formBundleTypesOffline").setProperty("/bFormPeriodSelected",true); 
				 this.getView().getController().oSelectedObject.PeriodID = oSelectedPeriodObject.PeriodID;
			}
			else
				 this.getView().getController().oAddFormDetailsDialog.getModel("formBundleTypesOffline").setProperty("/bFormPeriodSelected",false); 
					
	 		
		 
	 }
	
	
}