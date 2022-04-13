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
    
    read: function(data) {
        this.getDataProvider().getExistingForms(this,data);
    },

	onExistingFormsLoaded:function(oFormsList){
	    var parent = this.getView().oController;
	    parent.data.oFormsListCount=oFormsList.getData().length;
        this.getView().setModel(oFormsList, "ExistingForms");
        if(parent.data.oFormsListCount<parseInt(parent.data.MaximumInstances)){            
            parent.getView().byId("addFormBtnSUT").setVisible(true);      
        }else{
            parent.getView().byId("addFormBtnSUT").setVisible(false);
        }
        if(((parent.data.StatusID)? parent.data.StatusID.toLowerCase() : parent.data.StatusID ) === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
            parent.getView().byId("addFormBtnSUT").setVisible(false); 
            parent.getView().byId("submitSUT").setVisible(false);
        }else{
            if(parent.data.oFormsListCount<parseInt(parent.data.MaximumInstances)){          
                parent.getView().byId("addFormBtnSUT").setVisible(true);
            } else {
            parent.getView().byId("addFormBtnSUT").setVisible(false);
            }
        }
    },
    

    
    onListItemPress:function(evt){
        var path = evt.getSource().oBindingContexts.ExistingForms.sPath;
        var m = evt.getSource().getModel("ExistingForms");
        var curr = m.getObject(path);
        var parent = this.getView().oController;
        parent.data.FormNo=curr.FORMNO;
        var filter= parent.getSelectedFilter();
        if(filter){
            filter.removeAllContent();
            var sKey = filter.getKey();
            if (sKey === "SSU1") {
                if(parent.SSU1Form){
                    parent.SSU1Form.destroy();
                    parent.SSU1Form='';   
                }
                parent.SSU1Form=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.SUTForms.SSU1", parent);
                    filter.addContent(parent.SSU1Form);
                    parent.showFormData(false,sKey);
                    this.getView().byId("addFormBtnSUT").setVisible(false);
            }
        }
    },
    
	
};
