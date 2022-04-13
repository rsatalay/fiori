sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.documents.view.List", {

  onInit: function () {
      sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
      
      var d = new Date(); // today!
      var x = 365; // go back 365 days!
      d.setDate(d.getDate() - x);
      this.byId("DP1").setDateValue(d);
      this.byId("DP2").setDateValue(new Date());
      this.CorrespondencesModel = new sap.ui.model.json.JSONModel();
      this.getView().setModel(this.CorrespondencesModel,"CorrespondencesModel");
        this._handleRouting();
        
        },

     
  _handleRouting: function(){
        this.getRouter().attachRouteMatched(
                function(oEvent) {
                    var sNavigationName = oEvent.getParameter("name");      
                    if (sNavigationName === "documents") {
                        this._loadCorrespondences();
                    }
                }, this);
    },
    
    handleItemPress:function(evt){
        var path = evt.getSource().oBindingContexts.CorrespondencesModel.sPath;
        var m = evt.getSource().getModel("CorrespondencesModel");
        var oItemData = m.getObject(path);
        /*var _sUrl = this.getDataProvider().SERVICE.getServiceUrl()+"/Correspondences('"+oItemData.DocumentID+"')/$value";        
        window.location.href = _sUrl;*/
        window.open(this.getDataProvider().SERVICE.getServiceUrl() + "/Correspondences('" + oItemData.DocumentID + "')/$value", '_parent', 'location=no,toolbar=yes');
        
    },


        handleViewSettingsDialogButtonPressed : function(oEvent) {
        if (!this._oDialog) {
            this._oDialog = sap.ui.xmlfragment(
                    "sap.umc.mobile.documents.view.FilterDialog", this);
        }
        // toggle compact style
        jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(),
                this._oDialog);
        this._oDialog.open();
        this._oDialog.mAggregations.sortItems[0].setText(sap.ui.getCore().getModel("i18n").getProperty("DOCUMENTS.CREATE_DATE"));
    },

    handleConfirm : function(oEvent) {

        var oView = this.getView();
        var oTable = oView.byId("documentsTable");

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



    
    _loadCorrespondences:function(){
        var startDate=this.byId("DP1").getDateValue();
        var endDate=this.byId("DP2").getDateValue();
       /* startDate.setHours(15);
        endDate.setHours(15);
        startDate= startDate.toISOString().split(".")[0];
        endDate= endDate.toISOString().split(".")[0];*/
        startDate= this.formatDate(startDate);
        endDate= this.formatDate(endDate);
        this.getDataProvider().loadCorrespondences(this,startDate,endDate);
    },
    
    handleSubmitPress:function(){
        this._loadCorrespondences();
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
     return  sDate;
   }
  },
    
    
   
});