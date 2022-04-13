jQuery.sap.declare("sap.umc.mobile.forms.view.forms.Attachments");

sap.umc.mobile.forms.view.forms.Attachments={
        
    setView: function(oView) {
        this._oView = oView;
    },
    getView: function() {
        return this._oView;
    },
    getDataProvider: function() {
        return sap.umc.mobile.forms.model.DataProvider;
    },   
    
    handleUploadBtn:function(uploadEnable){
       /* var oData = this._oView.getModel('FileAttachments').getData();
        oData.uploadEnabled = uploadEnable;*/
       //this.getView().getModel("FileAttachments").setProperty('/uploadEnabled',uploadEnable);
    	
    	var oUploadCollection = this.getView().getController().AttachmentsFragment;
    	oUploadCollection.setUploadEnabled(uploadEnable);
    	
    },
    
    onUploadComplete: function(oEvent) {
        if (oEvent.mParameters.files[0].status === 201) {
 this._loadAttachments();
 
          /*var oData = this.getView().getModel('FileAttachments').getData();
          var oItem = {};
          var sUploadedFile = oEvent.getParameters().getParameter("fileName");
          // at the moment parameter fileName is not set in IE9
          if (!sUploadedFile) {
            var aUploadedFile = (oEvent.getParameters().getSource().getProperty("value")).split(/\" "/);
            sUploadedFile = aUploadedFile[0];
          }
          var nDocId = jQuery.now(); // generate Id
          oItem = {
               //   "contributor" : "You",
                  "AttachmentId" : nDocId.toString(),
                  "FileName" : sUploadedFile,
                  "MimeType" : "",
                  "thumbnailUrl" : "",
                  "Url":oEvent.getParameters().getParameter("headers").location+"/$value",
                };
          var parent = this.getView().oController;
          oData.results.unshift(oItem);
          this.getView().getModel("FileAttachments").setData(oData);*/
 			var parent = this.getView().oController;
          parent.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, parent.getText("FORMS.ATTACHMENT_UPLOAD"));
        }
        else{
        	oEvent.oSource.aItems = [];
        	this._loadAttachments();
        	var xmlDoc = $.parseXML( oEvent.getParameter("mParameters").responseRaw );
            var $error = $( xmlDoc ).find("errordetail");
            var $errorMessage =  $error.children("message");
            var parent = this.getView().oController;
            
            parent.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, $errorMessage.text());
            
           
           
        }
      },
    onChange: function(oEvent) {
        var oUploadCollection = oEvent.getSource();
        
        var _sUrl = this.getDataProvider().SERVICE.getServiceUrl() + "/FormBundleAttachments" ;
        
        oUploadCollection.setUploadUrl(_sUrl);
        
        var sToken = this.getDataProvider().SERVICE.oServiceModel.oHeaders["x-csrf-token"];
        var oHeaderParameter = new sap.m.UploadCollectionParameter({
            name: "x-csrf-token",
            value: sToken
        });
        var parent = this.getView().oController;
        var sSlug = "Description="+oEvent.getParameters().getParameter("files")[0].name+";FileName='"+oEvent.getParameters().getParameter("files")[0].name+"';DocumentCategory='GENI';FormBundleID='"+parent.data.FormBundleID+"'";
        var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
          name : "slug",
          value : sSlug
        });

        oUploadCollection.addHeaderParameter(oHeaderParameter);
        oUploadCollection.addHeaderParameter(oCustomerHeaderSlug);
        
      },
    _loadAttachments: function(){
        var parent = this.getView().oController;
        var fnCallback = jQuery.proxy(function(oAttachments) {
        	
        	/* if(this.getView().getModel("FileAttachments")){
        		 
        		 if(oAttachments.results.length == 0){
        			//fix to clear all rows in uploader - when the first element is uploaded with error
            		 //the row stays back with error 
            		 //so below added to set uploader rows empty completely
        			 
        			 var oUploadCollection = this.getView().getController().AttachmentsFragment;
        			 oUploadCollection._clearList();
        			 oUploadCollection._getNumberOfAttachmentsLabel().setText("Attachments (0)");
        			
        		 }
        		 else{
        			 this.getView().getModel("FileAttachments").setData(oAttachments); 
        		 }
        		 
        		 
        	 }
        	 else{
        		 this.oAttachments = new sap.ui.model.json.JSONModel();
                 this.oAttachments.setData(oAttachments);
                 this.getView().setModel(this.oAttachments, "FileAttachments");
        		 
        	 }*/
        	//create  a new model each time else the uploading error file will get stuck when its not the 1st file uploaded
        	if(oAttachments.results.length == 0){
        		
   			 
        		this.oAttachments = new sap.ui.model.json.JSONModel();
                this.oAttachments.setData(oAttachments);
                this.getView().setModel(this.oAttachments, "FileAttachments");
                
              //fix to clear all rows in uploader - when the first element is uploaded with error
          		 //the row stays back with error 
          		 //so below added to set uploader rows empty completely
           		var oUploadCollection = this.getView().getController().AttachmentsFragment;
      			 /*oUploadCollection._clearList();
      			 oUploadCollection._getNumberOfAttachmentsLabel().setText("Attachments (0)");*/
           		
        	}
        	else{
            this.oAttachments = new sap.ui.model.json.JSONModel();
            this.oAttachments.setData(oAttachments);
            this.getView().setModel(this.oAttachments, "FileAttachments");}
            if(((this.getView().getController().data.StatusID)?this.getView().getController().data.StatusID.toLowerCase():this.getView().getController().data.StatusID) === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
                this.handleUploadBtn(false);
            }else{
                this.handleUploadBtn(true);
            }
        }, this);
        this.getDataProvider().getAttachments(parent, fnCallback);
    },
    onFileDelete:function(oEvent){
  
		this.sDocumentIdToDelete = oEvent.getParameter("documentId");
		this.getDataProvider().deleteAttachment(this);
		    },
	
};
