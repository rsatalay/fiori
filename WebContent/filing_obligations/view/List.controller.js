sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.filing_obligations.view.List", {

	onInit: function () {
	    sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
        this._handleRouting();
        /*var oThis=this;*/
        var filterJson={
                "FilingObligationFilters": [
                                      {
                                          "Id": "notFiled",
                                          "Name":sap.ui.getCore().getModel("i18n").getProperty("FILING_OBLIGATIONS.NOT_FILED"),
                                          
                                      },
                                      {
                                          "Id": "all",
                                          "Name": sap.ui.getCore().getModel("i18n").getProperty("USER_PROFILE.ALL"),
                                          
                                      },]};
        this.oModel = new sap.ui.model.json.JSONModel(filterJson);
        this.getView().setModel(this.oModel);
        this.msgFiledFragment=null;
		    },

	    onExit : function () {
	      if (this._oDialog) {
	        this._oDialog.destroy();
	      }
	    },

	    handleViewSettingsDialogButtonPressed: function (oEvent) {
	      if (!this._oDialog) {
	        this._oDialog = sap.ui.xmlfragment("sap.umc.mobile.filing_obligations.view.FilterDialog", this);
	      }
	      // toggle compact style
	      jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
	      this._oDialog.open();
	      this._oDialog.mAggregations.sortItems[0].setText(sap.ui.getCore().getModel("i18n").getProperty("FILING_OBLIGATIONS.DUE_DATE"));
	      this._oDialog.mAggregations.sortItems[1].setText(sap.ui.getCore().getModel("i18n").getProperty("FILING_OBLIGATIONS.PERIOD"));
	      this._oDialog.mAggregations.sortItems[2].setText(sap.ui.getCore().getModel("i18n").getProperty("FILING_OBLIGATIONS.REVENUE_TYPE"));
	      this._oDialog.mAggregations.sortItems[3].setText(sap.ui.getCore().getModel("i18n").getProperty("FILING_OBLIGATIONS.RECEIPT_DATE"));
	    },

	    handleConfirm: function(oEvent) {
	      var oView = this.getView();
	      var oTable = oView.byId("idFilingObligationsTable");

	      var mParams = oEvent.getParameters();
	      var oBinding = oTable.getBinding("items");

	      var aSorters = [];
	      
	      var sPath = mParams.sortItem.getKey();
	      var bDescending = mParams.sortDescending;
	      aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
	      oBinding.sort(aSorters);

	    },
	
	_handleRouting: function(){
        this.getRouter().attachRouteMatched(
                function(oEvent) {
                    var sNavigationName = oEvent.getParameter("name");      
                    if (sNavigationName === "filingObligations") {
                        var filterSelectedItem = this.oView.byId("filingObligationFilter");
                        filterSelectedItem.setSelectedKey("notFiled");
                        if(filterSelectedItem.getSelectedKey()=="all"){
                            this.getDataProvider().loadFilingObligations(this, true,false);
                        }else{
                            this.getDataProvider().loadFilingObligations(this, true,true);
                        }
                        
                    }
                }, this);
    },
    
    filterFileObligations: function(evt){
        if(evt.mParameters.selectedItem.getKey()=="notFiled"){
            this.getDataProvider().loadFilingObligations(this, true,true);
        }else if(evt.mParameters.selectedItem.getKey()=="all"){
            this.getDataProvider().loadFilingObligations(this, true);
        } 
    },
    
    onFilingObligationsLoaded: function(oFilingObligations){
        this.getView().setModel(oFilingObligations, "FilingObligations");
        /*if (sap.ui.getCore().getModel("device").getProperty("/isNoPhone")){
            this._setDefaultItemSelection();            
        }   */    
    },
    
    openFiledMsgDialog: function (oList) {
        if (!this.msgFiledFragment) {
            this.msgFiledFragment= sap.ui.xmlfragment("sap.umc.mobile.filing_obligations.view.MsgDialog",this);
          this.getView().addDependent(this.msgFiledFragment);
        }
        
        this.oFormBundleList = new sap.ui.model.json.JSONModel();
        this.oFormBundleList.setData(oList);
        this.getView().setModel(this.oFormBundleList, "FormBundleList");        
        this.msgFiledFragment.open();
      },

      

      onDialogCloseButton: function (oEvent) {
          if(this.msgFiledFragment.isOpen()){
             // this.msgFiledFragment.destroyContent();
              this.msgFiledFragment.close();
          }  
      },
      
      handleFormBundlePress:function(evt){
          var path = evt.mParameters.listItem.oBindingContexts.FormBundleList.sPath;
          var m = evt.getSource().getModel("FormBundleList");
          var oItemData = m.getObject(path);
          var oFormsComponent = sap.ui.getCore().getComponent("Forms");
          if (!oFormsComponent) {
              oFormsComponent = this.getApp().getComponentFactory().getForms();
          }
          //pat-comp
          var route="form";
          if( this.checkRouteAvailability(oFormsComponent,route)){
              oFormsComponent.getRouter().myNavTo(route, oItemData, false);
          }
          
          //oFormsComponent.getRouter().myNavTo("FormBundle", oItemData, false);
          this.msgFiledFragment.close();
      },
      
      checkRouteAvailability: function(oComponent,oRoute){
          var routes = oComponent.getRouter()._oRoutes;
          if(routes && routes[oRoute]){
              return true;  
          }else{
              this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, this.getText("FILING_OBLIGATIONS.NO_VIEW"));
              return false;
          }
      },
         
      onListItemPress: function (evt) {
        var path = evt.getSource().oBindingContexts.FilingObligations.sPath;
        var m = evt.getSource().getModel("FilingObligations");
        var clickedItemData = m.getObject(path);
      //  if(true){
        
        /*if(clickedItemData.FormBundleSubmitted == '' && clickedItemData.ClearingReason==''){
            //oFormsComponent.getRouter().myNavTo("FormBundle", clickedItemData, false); 
          //  oFormsComponent.getRouter().myNavTo(clickedItemData.FormBundleTypeID+"FullScreen", clickedItemData, false);
            var route = clickedItemData.FormBundleTypeID+"Forms";
            if(this.checkRouteAvailability(oFormsComponent,route)){
                oFormsComponent.getRouter().myNavTo(route, clickedItemData, false);  
            }
            
        }else*/
        this.getFormComponent(clickedItemData);
      },
      getFormComponent: function (clickedItemData) 
      {var oFormsComponent = sap.ui.getCore().getComponent("Forms");
      if (!oFormsComponent) {
          oFormsComponent = this.getApp().getComponentFactory().getForms();
      }
          var fnCallback = jQuery.proxy(function(oList) {
              if(oList.results.length>1){
                  this.openFiledMsgDialog(oList);
              }else if(oList.results.length==1){
            	  //pat-comp
                  var route = "form";
                  if(this.checkRouteAvailability(oFormsComponent,route)){
                      oFormsComponent.getRouter().myNavTo(route, oList.results[0], false); 
                  }
                  
                 // oFormsComponent.getRouter().myNavTo("FormBundle", oList.results[0], false);  
              }
              else if(oList.results.length<1){
                  //oFormsComponent.getRouter().myNavTo("FormBundle", clickedItemData, false); 
                  //  oFormsComponent.getRouter().myNavTo(clickedItemData.FormBundleTypeID+"FullScreen", clickedItemData, false);
            	  //pat-comp
                    var route = "form";
                    if(this.checkRouteAvailability(oFormsComponent,route)){
                        oFormsComponent.getRouter().myNavTo(route, clickedItemData, false);  
                    }
              }
          }, this);
          oFormsComponent.getDataProvider().getFormBundlesForFilingObligation(clickedItemData,fnCallback);
          
      },
});