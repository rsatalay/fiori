jQuery.sap.require("sap.umc.mobile.forms.view.AddFormDetailsController");
jQuery.sap.require("sap.umc.mobile.forms.view.AddFormDetailsDialogController");
sap.umc.mobile.private.app.view.FullBaseController.extend(
        "sap.umc.mobile.forms.view.FormsList", {

            onInit : function() {
                // set explored app's demo model on this sample
                sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit
                        .call(this);
                this.getDataProvider().formsFilterJSON(this);
                this._handleRouting();
            },

            onExit : function() {
                if (this._oDialog) {
                    this._oDialog.destroy();
                }
            },

            handleViewSettingsDialogButtonPressed : function(oEvent) {
                if (!this._oDialog) {
                    this._oDialog = sap.ui.xmlfragment(
                            "sap.umc.mobile.forms.view.FilterDialog", this);
                }
                // toggle compact style
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(),
                        this._oDialog);
                this._oDialog.open();
            },

            handleConfirm : function(oEvent) {

                var oView = this.getView();
                var oTable = oView.byId("idProductsTable");

                var mParams = oEvent.getParameters();
                var oBinding = oTable.getBinding("items");

                // apply sorter to binding
                // (grouping comes before sorting)
                var aSorters = [];
                
                var sPath = mParams.sortItem.getKey();
                var bDescending = mParams.sortDescending;
                aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
                oBinding.sort(aSorters);

            },

            _handleRouting : function() {
                this.getRouter().attachRouteMatched(function(oEvent) {
                    var sNavigationName = oEvent.getParameter("name");
                    if (sNavigationName === "forms") {
                        var filterSelectedItem = this.oView.byId("filterForms");
                        filterSelectedItem.setSelectedKey("draft");
                        if(filterSelectedItem.getSelectedKey()=="draft"){
                            this.getDataProvider().loadForms(this, true,"draft");
                        }else{
                            this.getDataProvider().loadForms(this, true,"submitted");
                        }   
                    }
                }, this);
            },

            onFormsLoaded : function(oForms) {
                this.getView().setModel(oForms, "Forms");
            },

            onListItemPress : function(evt) {
                var path = evt.getSource().oBindingContexts.Forms.sPath;
                var m = evt.getSource().getModel("Forms");
                var curr = m.getObject(path);
                var oFormsComponent = this.getApp().getComponentFactory().getForms();
                oFormsComponent.getRouter().myNavTo(curr.FormBundleTypeID+"Forms", curr, false); 
            },
            
            filterForms: function(evt){
                if(evt.mParameters.selectedItem.getKey()=="draft"){
                    this.getDataProvider().loadForms(this, true,"draft");
                }else if(evt.mParameters.selectedItem.getKey()=="submitted"){
                    this.getDataProvider().loadForms(this, true,"submitted");
                } 
            },
            //addform c5221606 
            handleAddForm: function(evt){
            	//call fragment to add in pop up-add form details
        		if(!this.oAddFormDetails){
        			this.oAddFormDetailsController = sap.umc.mobile.forms.view.AddFormDetailsController;
        			
        		 this.oAddFormDetails =sap.ui.xmlfragment("sap.umc.mobile.forms.view.AddFormDetails", this.oAddFormDetailsController);
        		 this.oAddFormDetailsController.setView(this.getView());
        		 
        		}
           	 if (!this.oAddFormDetailsDialog) {
    			 
    			 this.oAddFormDetailsDialogController = sap.umc.mobile.forms.view.AddFormDetailsDialogController;
    				
    			 
    			 this.oAddFormDetailsDialog =sap.ui.xmlfragment("sap.umc.mobile.forms.view.AddFormDetailsDialog", this.oAddFormDetailsDialogController);
    			 this.oAddFormDetailsDialogController.setView(this.getView());
    			 this.oAddFormDetailsDialog.addContent(this.oAddFormDetails);
    			 
    			 
    		}
        	 this._setDialogDefaultValues();
            	  },
     //addForm
     _setDialogDefaultValues:function(){
    	 var oThis = this;
    	 this.oSelectedObject = {};
    	 sap.ui.getCore().byId("idFormBundleTypeAvailablePeriod").setSelectedKey(null);
    	 sap.ui.getCore().byId("idFormBundleType").setSelectedKey(null);
    	
    
    	 this.getDataProvider().getFormBundleTypesOffline(this).attachRequestCompleted(function(oResponse){
    		 var oFormBundleTypesOffline = new sap.ui.model.json.JSONModel();
    		var oFormBundleTypes=jQuery.extend( {}, oResponse.oSource.getData());
 			
 			oFormBundleTypes.results.unshift({FormBundleTypeID:"-1",FormBundleTypeDescription:""})
 			oFormBundleTypesOffline.setData(oFormBundleTypes);	
 			oFormBundleTypesOffline.setProperty("/bFormPeriodBased",false);
 			oFormBundleTypesOffline.setProperty("/bFormPeriodSelected",false);
 			
 			oThis.oAddFormDetailsDialog.setModel(oFormBundleTypesOffline,"formBundleTypesOffline"); 
 			
 		});
    	 	
    	
    	 oThis.oAddFormDetailsDialog.open();
     },

	
        });