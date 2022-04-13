jQuery.sap.require("sap.umc.mobile.forms.view.forms.PaymentsController");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.PaymentsHistoryController");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.FormInstances");
jQuery.sap.require("sap.umc.mobile.forms.view.forms.Attachments");

var paymentnavigate = "";
var paymentflag = "";
var payBillFlag = "";

sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.forms.view.forms.FullScreenForms", {
	onInit: function (oEvent) {
		//have an option to either view any of the 2 amend buttons available - "Edit - which keeps the original FB
		//or Amend - which creates a new form
		paymentnavigate = this;
		this.AmendButton = false;
		this.EditButton = false;  // Se modifica a False para no permitir editar formularios ACASTANEDA
		this.customiseAmendButton();
		this.setFlagVisibility();
		//c5257470 STP
		sap.ui.getCore().getEventBus().subscribe("navigation", "back", $.proxy(function(channel, event, data) {
			//back button fix for forms
			if(data.stack[data.stack.length-1].route === "form" )
				this.navBackToFormTab = true;
		}, this));

		//end of back button fix for forms
		this.oIconTabBar = this.getView().byId("idFormIconTabBar");
		//  sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
		this._handleRouting();
		sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);

		//model for enabling/disabling form fields
		this.oFieldEnabled={"Enabled":true};
		this.oEnabledModel = new sap.ui.model.json.JSONModel();
		this.oEnabledModel.setData(this.oFieldEnabled);
		this.getView().setModel(this.oEnabledModel,"EnabledModel");

		//if the maximum instance is not provide from backend use the default
		this.defaultMaxInstance = "9999";
		//all available table forms of all form bundle type
		this.oAvailableTableForms = {};
		payBillFlag = "";
		paymentflag = "";

	},
	pressTablaFormICA:function(){
		
		a = this.getView().byId("idFormIconTabBar");
		a.setSelectedKey("Z_FORMTABLE_ICA");
		a.fireSelect();	

	},	pressFormularioFormICA:function(){
		
		a = this.getView().byId("idFormIconTabBar");
		a.setSelectedKey("Z2IC");
		a.fireSelect();	

	},
	customiseAmendButton:function(){
		var oFooter = this.getView().getContent()[0].getFooter();
		var oThis = this;
		
		if(this.EditButton){
			if(!this.oEditButton)
			{this.oEditButton = new sap.m.Button("idFormAmendOriginal", {
				text: oThis.getText("{i18n>USER_PROFILE.EDIT}"),

				press:$.proxy(function(){oThis.amendFormOriginal(); },oThis),
				visible:false
			}).addStyleClass("sapUmcBtnWhiteTextColor").addStyleClass("sapUmcBtnBorderLeft") ;}
			oFooter.addContentRight(this.oEditButton);
		} 
		if(this.AmendButton){
			if(!this.oAmendButton){
				this.oAmendButton = new sap.m.Button("idFormAmend", {
					text:oThis.getText("{i18n>FORMS.AMEND}"),
					press:$.proxy(function(){oThis.amendForm(); },oThis),
					visible:false
				}).addStyleClass("sapUmcBtnWhiteTextColor").addStyleClass("sapUmcBtnBorderLeft") ;
			}
			oFooter.addContentRight(this.oAmendButton);
		}

	},

	setFlagVisibility: function(){

		this.getView().byId("idIconStraightThroughProcess").setVisible(false);
	},

	_handleRouting:function(){

		this.getRouter().attachRouteMatched(function(oEvent) {
			var sNavigationName = oEvent.getParameter("name");
			//   var sFormScenarioController = "_"+"ZPLU"+"Controller";
			// console.log(sFormScenarioController);
			if (sNavigationName === "form") {

				// this[sFormScenarioController].initializeCDVisible();

				
				this.onRouteMatched();
			}
		}, this);
	},
	onRouteMatched:function(){

		this.getView().byId("idIconStraightThroughProcess").setVisible(false);

		if (payBillFlag == "X")
		{

			this.getView().byId("idFormPayBillInvoice").setVisible(false);// ACASTANEDA Se modifica visibilidad por false

			if (paymentflag == "X")
			{
				this.getView().byId("idFormPayBillInvoice").setText(sap.ui.getCore().getModel("i18n").getProperty("INVOICE.DETAILS"));
			}
		}

		var oThis = this;
		if(this.navBackToFormTab){
			this.navBackToFormTab = null;
			var oIconTabFilterControl = oThis.getSelectedFilter();
			if(oIconTabFilterControl){
				var sKey = oIconTabFilterControl.getKey();
				//handle refresh of drop down with new account added
				if(sKey==="payment" && oIconTabFilterControl.getEnabled()){
					oThis._populatePayments();
				}
			}
			return;
		}
		//start of merge handleNavigationEvent code
		var data = oThis.getRouter().getLastRouteData();
		if(data){
			//if(data.stack[data.stack.length-1].route === "form"){
			//etag for current form
			this.getDataProvider().sEtag = "";
			oThis.oCurrentFormBundle = {};
			oThis.oCurrentFormBundle =  data;
			if(!oThis.oCurrentFormBundle.StatusID){
				oThis.oCurrentFormBundle.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT;
			}
			try{ oThis._setDefaultValues();
			if (oThis.bPeriodBased){

			}
			if (oThis.bKeyDateBased){
				if(!oThis.oCurrentFormBundle.KeyDate)
					oThis.oCurrentFormBundle.KeyDate = oThis.getKeyDate();

			}
			if (oThis.bNoTimeDependency){

			}
			oThis.getDataProvider().getFormBundleTypes(oThis);
			oThis._setDefaultSelectedKeyBar();
			//initial load of form check if the form fields have to be enabled/disabled
			oThis._enableFormFields();
			oThis._enablePaymentTab();
			oThis._setVisibleAmendButton();
			/*   var oIconTabFilterControl = oThis.getSelectedFilter();
                  if(oIconTabFilterControl){
                    var sKey = oIconTabFilterControl.getKey();
                    if(sKey==="payment" && oIconTabFilterControl.getEnabled()){
                      oThis._populatePayments();
                    }
                  }*/
			}
			catch(err){
				oThis.getRouter().backToHome();
				if(oThis.oFormBusyDialog)
					oThis.oFormBusyDialog.close();
				oThis.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, oThis.getText("FILING_OBLIGATIONS.NO_VIEW"));
			}
			//  }
		}

		//end of merge handleNavigationEvent code
		//start of fix - new payment card/bank added in payment tab new payment card should reflect in dop down
		/*  var oIconTabFilterControl = oThis.getSelectedFilter();
          if(oIconTabFilterControl){
            var sKey = oIconTabFilterControl.getKey();
              if(sKey==="payment" && oIconTabFilterControl.getEnabled()){
                oThis._populatePayments();
              }
          }*/
		//end of fix - new payment card/bank added in payment tab new payment card should reflect in dop down

	},
	/*  handleNavigationEvent:function(channel, event, data) {
      var sNavigationName = data.route;
          if (sNavigationName === "form") {
      if(data){
            if(data.stack[data.stack.length-1].route === "form"){
            this.oCurrentFormBundle = {};
               this.oCurrentFormBundle =  data.stack[data.stack.length-1].parameters;
               if(!this.oCurrentFormBundle.StatusID){
                      this.oCurrentFormBundle.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT;
                  }
              try{ this._setDefaultValues();
                if (this.bPeriodBased){

              }
              if (this.bKeyDateBased){
                if(!this.oCurrentFormBundle.KeyDate)
                this.oCurrentFormBundle.KeyDate = this.getKeyDate();

              }
              if (this.bNoTimeDependency){

              }
                   this.getDataProvider().getFormBundleTypes(this);
                   this._setDefaultSelectedKeyBar();
                   //initial load of form check if the form fields have to be enabled/disabled
                   this._enableFormFields();
                   this._enablePaymentTab();
                   this._setVisibleAmendButton();}
            catch(err){
              this.getRouter().backToHome();
              if(this.oFormBusyDialog)
              this.oFormBusyDialog.close();
               this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, this.getText("FILING_OBLIGATIONS.NO_VIEW"));
            }
            }
        }}
  },*/
	getKeyDate: function() {
		return new Date();
	},
	_enablePaymentTab:function(){
		var oFilter = this.getFilterByKey("payment");
		if(oFilter){
			oFilter.setEnabled((this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
			)?true:false);
		}
	},
	_setVisibleAmendButton:function(){
		if(this.oAmendButton){
			this.oAmendButton.setVisible((this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
			)?true:false);
			var oFilter = this.getSelectedFilter();
			if(oFilter && oFilter.getKey()==="payment"){
				this.oAmendButton.setVisible(false);
			}
		}
		//do the same for amend original button
		if(this.oEditButton){
			this.oEditButton.setVisible((this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
			)?true:false);
			var oFilter = this.getSelectedFilter();
			if(oFilter && oFilter.getKey()==="payment"){
				this.oEditButton.setVisible(false);
			}
		}
	},
	_setDefaultSelectedKeyBar:function(){
		var items=this.oIconTabBar.getItems();
		if(items.length){
			this.oIconTabBar.setSelectedKey(items[0].getKey());
			this.oIconTabBar.fireSelect();
		}
	},
	_enableFormFields:function(){
		if(((this.getView().getController().oCurrentFormBundle.StatusID)?this.getView().getController().oCurrentFormBundle.StatusID.toLowerCase():this.getView().getController().oCurrentFormBundle.StatusID) ===
			sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
			this._setFieldsEnable(false);
			if (this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"){
				this.getView().getModel("OUSOVisible").setProperty("/visible",false);
				this.getView().getModel("DIRVisible2").setProperty("/visible",false);
				this.getView().getModel("DIRVisible").setProperty("/visible",false);
				this.getView().getModel("VIAVisible").setProperty("/visible",false);
				this.getView().getModel("RURALVisible").setProperty("/visible",false);
				this.getView().getModel("AGERETVisible").setProperty("/visible",false);
				this.getView().getModel("RESPVisible").setProperty("/visible",false);
				this.getView().getModel("ExtVisible").setProperty("/visible",false);
				this.getView().getModel("CORRVisible").setProperty("/visible",false);
				this.getView().getModel("INEXVisible").setProperty("/visible",false);
				this.getView().getModel("OTRASANVisible").setProperty("/visible",false);
				this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);
			}
			else if (this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP"){
				this.getView().getModel("DIRVisible2").setProperty("/visible",false);
				this.getView().getModel("DIR2Visible2").setProperty("/visible",false);
				this.getView().getModel("OUSOVisible").setProperty("/visible",false);
				this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);				
			}
			else if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA" ){
				this.getView().getModel("OUSOVisible").setProperty("/visible",false);
				this.getView().getModel("DIRVisible2").setProperty("/visible",false);
				this.getView().getModel("ExtVisible").setProperty("/visible",false);
				this.getView().getModel("CORRVisible").setProperty("/visible",false);
				this.getView().getModel("INEXVisible").setProperty("/visible",false);
				this.getView().getModel("OTRASANVisible").setProperty("/visible",false);
				this.getView().getModel("FIRMADECLVisible").setProperty("/visible",false);
				this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);
			} 
		}else{
			this._setFieldsEnable(true);
		}
	},
	_setFieldsEnable:function(bEnable){
		if(this.getView().getModel("EnabledModel")){
			this.getView().getModel("EnabledModel").setData({ "Enabled":bEnable});
		}
	},
	_setDefaultValues:function(){
		this.prevIconTabFilter = null;
		this.prevIconTabFilterKey = "";
		this.prevIconTabFilterFormNo = "";
		this.currentIconTabFilter = null;
		this.currentIconTabFilterKey = "";
		this.currentIconTabFilterFormNo = "";
		this.oIconTabBar.removeAllItems();
		//all forms data
		this.oAllFormsData ={};
		this.oAllFormsList ={};
		this.oFinalIconTabBarFiltersData={};
		var sControllerPath = this.oCurrentFormBundle.FormBundleTypeID+"."+this.oCurrentFormBundle.FormBundleTypeID+"Controller";
		var sController = "o"+this.oCurrentFormBundle.FormBundleTypeID+"Controller";
		/*     try{*/
		if(!this[sController]){

			jQuery.sap.require("sap.umc.mobile.forms.view.forms."+sControllerPath);


			this[sController]=sap.umc.mobile.forms.view.forms[this.oCurrentFormBundle.FormBundleTypeID][this.oCurrentFormBundle.FormBundleTypeID+"Controller"];
			this[sController].setView(this.getView());
			this[sController].init();
		}
		this[sController].customize();

		//For message dialog fragment
		this.msgFragment= null;

		this.oPaymentHistoryVisible={ "InProcess":false,
				"Processed": false
		};

		this.oPaymentHistoryVisibleModel = new sap.ui.model.json.JSONModel();
		this.oPaymentHistoryVisibleModel.setData(this.oPaymentHistoryVisible);
		this.getView().setModel(this.oPaymentHistoryVisibleModel,"PaymentHistoryVisible");


		this.amendFormBundleID = "";
		this.amendOriginal = false;


		/* }
        catch(err){
    this.getRouter().backToHome();
    if(this.oFormBusyDialog)
    this.oFormBusyDialog.close();
     this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, this.getText("FILING_OBLIGATIONS.NO_VIEW"));
  }*/

	},
	amendForm:function(){
		this.getDataProvider().sEtag = "";
		this.amendFormBundleID = this.oCurrentFormBundle.FormBundleID;
		this.oCurrentFormBundle.FormBundleID = "";
		this.oCurrentFormBundle.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT;
		this._enableFormFields();
		this._enablePaymentTab();
		if(this.oAmendButton)
			this.oAmendButton.setVisible(false);

		//make the existing form data(if existing for the already opened form) in the local array to edited true so that
		// if you submit all the data is picked
		if(!($.isEmptyObject(this.oAllFormsData))){
			for(var formID in this.oAllFormsData){
				var oForms = this.oAllFormsData[formID];
				if(!($.isEmptyObject(oForms))){
					for(var formNo in oForms){
						var oFormIstance = oForms[formNo];
						if(!($.isEmptyObject(oFormIstance))){
							oFormIstance.bEdited = true;
						}
					}
				}
			}
		}

		//change title
		this.setFormTitle();
		//trigger filter selection so tha the desired buttons show up
		var sKey = this.getSelectedFilter().getKey();
		this.oIconTabBar.setSelectedKey(sKey);
		this.oIconTabBar.fireSelect();
	},
	setFormTitle:function(){
		var formTitle=this.getView().byId("FullScreenTitle");
		formTitle.setText("");

		if(this.bPeriodBased){
			if(this.amendFormBundleID){
				formTitle.setText(this.getFormattedText("FORMS.FORM_ID_FOR_PERIOD",[this.oCurrentFormBundle.FormBundleTypeDescription,this.oCurrentFormBundle.PeriodID]));
			}
			else if(this.oCurrentFormBundle.FormBundleID && this.oCurrentFormBundle.PeriodID && this.oCurrentFormBundle.FormBundleTypeDescription){
				if (this.oCurrentFormBundle.Period !== undefined) // Para formularios ya enviados.
				{
				formTitle.setText(this.getFormattedText("FORMS.FORM_NO_FOR_PERIOD",[this.oCurrentFormBundle.FormBundleID,this.oCurrentFormBundle.FormBundleTypeDescription,this.oCurrentFormBundle.Period.Description]));
				} else{
					var periodo = this.oCurrentFormBundle.AvailablePeriods.results.find(per => per.PeriodID === this.oCurrentFormBundle.PeriodID );
					formTitle.setText(this.getFormattedText("FORMS.FORM_NO_FOR_PERIOD",[this.oCurrentFormBundle.FormBundleID,this.oCurrentFormBundle.FormBundleTypeDescription,periodo.Description]));
					
				}
			}else if(this.oCurrentFormBundle.FormBundleID && this.oCurrentFormBundle.FormBundleTypeDescription){
				formTitle.setText(this.getFormattedText("FORMS.FORM_NO_FORM_ID",[this.oCurrentFormBundle.FormBundleID,this.oCurrentFormBundle.FormBundleTypeDescription]));
			}else if (this.oCurrentFormBundle.PeriodID && this.oCurrentFormBundle.FormBundleTypeDescription){
				
				if (this.oCurrentFormBundle.AvailablePeriods !== undefined){
				var periodo = this.oCurrentFormBundle.AvailablePeriods.results.find(per => per.PeriodID === this.oCurrentFormBundle.PeriodID );
				formTitle.setText(this.getFormattedText("FORMS.FORM_ID_FOR_PERIOD",[this.oCurrentFormBundle.FormBundleTypeDescription,periodo.Description]));
			} else{
				var periodo = this.oCurrentFormBundle.Period.Description;
				formTitle.setText(this.getFormattedText("FORMS.FORM_ID_FOR_PERIOD",[this.oCurrentFormBundle.FormBundleTypeDescription,periodo]));
			}
			}else if (this.oCurrentFormBundle.FormBundleTypeDescription){
				formTitle.setText(this.oCurrentFormBundle.FormBundleTypeDescription);
			}

		}
		else if(this.bKeyDateBased || this.bNoTimeDependency){

			if(this.amendFormBundleID){
				formTitle.setText(this.oCurrentFormBundle.FormBundleTypeDescription);
			}
			else if(this.oCurrentFormBundle.FormBundleID && this.oCurrentFormBundle.FormBundleTypeDescription){
				formTitle.setText(this.getFormattedText("FORMS.FORM_NO_FORM_ID",[this.oCurrentFormBundle.FormBundleID,this.oCurrentFormBundle.FormBundleTypeDescription]));
			}
			else if (this.oCurrentFormBundle.FormBundleTypeDescription){
				formTitle.setText(this.oCurrentFormBundle.FormBundleTypeDescription);
			}
		}
	},
	// odata Contingencia Firma Fisica
	odataFirmaFisica: function(){
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"ZODATA_MCF_SRV");  // Van una sola vez en la aplicacion 
	var oModelConstantes = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelConstantes, "Constantes");
	this.getView().getModel("ZODATA_MCF_SRV").read("/ConstantesSet",{
		filters: [new sap.ui.model.Filter({
		      path: "Const",
		      operator: sap.ui.model.FilterOperator.EQ,
		      value1: "IC_FIRMA FISICA"
		     })],
		success:function(odata){
			 this.getView().getModel("Constantes").setProperty("/results",odata.results);
			 constante = this.getView().getModel("Constantes").getProperty("/results");
			if (constante[0].Valor == "SI"){
	
				if (this.getView().getModel("Z2ICModel").oData.A_104_FIRMA_DIGITAL_URL == "")
					{
						this.getView().byId("idImprimirReciboSinFirmar").setVisible(true);
						this.getView().byId("idImprimirReciboFirmado").setVisible(false);
						this.getView().byId("idFirmar").setVisible(true);
					}else{
						this.getView().byId("idImprimirReciboSinFirmar").setVisible(false);
						this.getView().byId("idImprimirReciboFirmado").setVisible(true);
						this.getView().byId("idFirmar").setVisible(false);						
					}
			}else{
				
				if (this.getView().getModel("Z2ICModel").oData.A_104_FIRMA_DIGITAL_URL == "")
				{
					this.getView().byId("idImprimirReciboSinFirmar").setVisible(false);
					this.getView().byId("idImprimirReciboFirmado").setVisible(false);
					this.getView().byId("idFirmar").setVisible(true);
				}else{
					this.getView().byId("idImprimirReciboSinFirmar").setVisible(false);
					this.getView().byId("idImprimirReciboFirmado").setVisible(true);
					this.getView().byId("idFirmar").setVisible(false);						
				}
			} ;
		}.bind(this),  
		error:function(odata){
			this.getView().byId("idImprimirReciboSinFirmar").setVisible(false);
		}
	});},
	_hideAllButtons:function(){
		this.oView.byId("idFormSubmit").setVisible(false);
		this.oView.byId("idFormBackToList").setVisible(false);
		this.oView.byId("idFormAdd").setVisible(false);
		this.oView.byId("idFormSave").setVisible(false);
		this.oView.byId("idFormValidate").setVisible(false);
		this.oView.byId("idFormErrorCount").setVisible(false);
		this.oView.byId("idFormPayBill").setVisible(false);
		this.getView().byId("idFormPayBillInvoice").setVisible(false);
		this.getView().byId("idImprimirReciboFirmado").setVisible(false);
		this.getView().byId("idImprimirReciboSinFirmar").setVisible(false);		
		this.getView().byId("idFirmar").setVisible(false);


		if (this.oCurrentFormBundle.StatusID == "SUBMITTED")
		{	
			/* if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA")
			{
		 	this.odataFirmaFisica(); // Se verifica estatus de la variable de contingencia para firma fisica.
			}else */
				
				if (this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" || this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"  || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP" || this.oCurrentFormBundle.FormBundleTypeID == "ZICA") // Mostrar formulario sin firmar ( no aplica firma electronica)
			{
				this.getView().byId("idImprimirReciboSinFirmar").setVisible(true);
			}
		
			if (payBillFlag == "X")
			{
				this.getView().byId("idFormPayBillInvoice").setVisible(false);  // acastaneda se modifica visivbilidad por false
				if (paymentflag == "X")
				{
					this.getView().byId("idFormPayBillInvoice").setText(sap.ui.getCore().getModel("i18n").getProperty("INVOICE.DETAILS"));
				}
			}
		}


		//  this.getView().byId("idIconStraightThroughProcess").setVisible(false);

	},
	onFormBundleTypesLoaded:function(oAvailableIconTabFiltersData){
		var oThis = this;
		this.setFormTitle();
		var aIconTabBarFiltersDataFinal=[];
		$.each(this.aIconTabBarFilterSequence, function(index,sIconTabBarFilterKey){
			if(oAvailableIconTabFiltersData[sIconTabBarFilterKey])
				aIconTabBarFiltersDataFinal.push(oAvailableIconTabFiltersData[sIconTabBarFilterKey]);
			oThis.oFinalIconTabBarFiltersData[sIconTabBarFilterKey] = $.extend(true,{},oAvailableIconTabFiltersData[sIconTabBarFilterKey]);
		});
		$.each(aIconTabBarFiltersDataFinal, function(index,oIconTabFilterData){
			var oIconTabFilterControl = oThis._createIconTabFilterControl(oIconTabFilterData);
			oThis.oIconTabBar.addItem(oIconTabFilterControl);
			if(aIconTabBarFiltersDataFinal.length!==(index+1)){
				var oIconTabSepartor = new sap.m.IconTabSeparator({
					icon:"sap-icon://open-command-field"
				});
				oThis.oIconTabBar.addItem(oIconTabSepartor);
			}
		});
	},
	updateFormsData:function(){
		if(!($.isEmptyObject(this.oAllFormsData))){
			for (var formID in this.oAllFormsData){
				var oFormInstances = this.oAllFormsData[formID];
				if(!($.isEmptyObject(oFormInstances))){
					for (var formNo in oFormInstances){
						var oFormInstance = oFormInstances[formNo];
						if(oFormInstance["bEdited"]){
							oFormInstance["bEdited"] = false;
						}
					}
				}
			}
		}
	},
	_createIconTabFilterControl:function(oIconTabFilterData){
		var oIconTabFilterControl = new sap.m.IconTabFilter({
			tooltip:oIconTabFilterData.FormDescription,
		//	icon:oIconTabFilterData.icon, ACASTANEDA 
			text:oIconTabFilterData.FormDescription,
			key:oIconTabFilterData.FormID,
		});
		this._addIconTabFilterControlCustomData(oIconTabFilterData,oIconTabFilterControl);
		return oIconTabFilterControl;
	},
	_addIconTabFilterControlCustomData:function(oIconTabFilterData,oIconTabFilterControl){
		//add custom Data only if the filter is for a form bundle type
		if(oIconTabFilterData.bFormBundleType){
			oIconTabFilterControl.addCustomData( new sap.ui.core.CustomData({
				key: "CurrentFormNo",
				value: "1"
			}));
		}
	},
	_addInitialIconTabFilterContent:function(oIconTabFilterControl){
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()];

		if(oIconTabFilterData.bFormBundleType)
		{
			/*  var sSuccess =*/ this._addInitialFormContent(oIconTabFilterControl);
			//to add only the initial content to icontab filters
			/*  return  sSuccess;*/
		}
		if(oIconTabFilterData.bTableForm)
		{
			//to add only the initial content to icontab filters
			this._addInitialTableFormContent(oIconTabFilterControl);
		}
		switch(oIconTabFilterData.FormID){
		case "attachments":{
			break;
		}
		case "submit":{
			break;
		}
		case "payment":{
			this._addInitialPaymentIconTabFilterContent(oIconTabFilterControl);
			break;
		}
		}
	},
	_addInitialTableFormContent:function(oIconTabFilterControl){
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()];
		var sController = "_"+oIconTabFilterData.FormID+"Controller";
		try{
			jQuery.sap.require("sap.umc.mobile.forms.view.forms."+this.oCurrentFormBundle.FormBundleTypeID+".fragments."+oIconTabFilterData.FormID+"Controller");


			this[sController]=sap.umc.mobile.forms.view.forms[this.oCurrentFormBundle.FormBundleTypeID]["fragments"][oIconTabFilterData.FormID+"Controller"];
			this[sController].setView(this.getView());
			if (!this["_"+oIconTabFilterData.FormID+"Fragment"]) {
				this["_"+oIconTabFilterData.FormID+"Fragment"]=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms."+this.oCurrentFormBundle.FormBundleTypeID+".fragments."+oIconTabFilterData.FormID, this[sController]);
			}
			oIconTabFilterControl.addContent(this["_"+oIconTabFilterData.FormID+"Fragment"]);
			var sFormNo = "1";
			if(!(this.oAllFormsData[oIconTabFilterData.FormID]))
				this.oAllFormsData[oIconTabFilterData.FormID]  = {};
			if(!(this.oAllFormsData[oIconTabFilterData.FormID][sFormNo]))
				this.oAllFormsData[oIconTabFilterData.FormID][sFormNo] = {};
			this.oAllFormsData[oIconTabFilterData.FormID][sFormNo]["FormData"] = [];
			this.oAllFormsData[oIconTabFilterData.FormID][sFormNo]["bEdited"] = false;

			if(this.oCurrentFormBundle.FormBundleID)
				this.getFormData(oIconTabFilterControl);
			else{this._createTableFormModel(oIconTabFilterData.FormID);}
		}
		catch(err){
			this.getRouter().backToHome();
			this.oFormBusyDialog.close();
			this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, this.getText("FILING_OBLIGATIONS.NO_VIEW"));
		}
	},
	_addAttachmentIconTabFilterContent:function(oIconTabFilterControl){
		if(!this.oCurrentFormBundle.FormBundleID){
			//Modificacion ACASTANEDA Se muestra un mensaje de error cuando se intenta anexar documentos y no se ha guardo borrador
	    	  var textShow = "Para adjuntar documento, primero debe guardar el formulario como borrador";
				var dialog = new sap.m.Dialog({
					title: 'Error',
					type: 'Message',
					state: 'Error',
					content: new sap.m.Text({
						text: textShow
					}),
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							dialog.close();
							dialog.destroy();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
			
		}else{
		this.oAttachmentsController = sap.umc.mobile.forms.view.forms.Attachments;
		this.oAttachmentsController.setView(this.getView());
		if(this.getView().getModel("FileAttachments"))
			this.getView().getModel("FileAttachments").setData([]);

		oThis = this;
		if (!this._AttachmentsFragment) {
			this._AttachmentsFragment = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.Attachments", this.oAttachmentsController);

			
			sap.ui.getCore().byId("AttachmentUploader")._oFileUploader.attachBrowserEvent("click", function(event){
				if(!oThis.oCurrentFormBundle.FormBundleID){
					oThis.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,
							oThis.getText("FORMS.BEFORE_FILE_UPLOAD")    );
				}
			})

			
			;
		}
		oIconTabFilterControl.addContent(this._AttachmentsFragment);

		if(this.oCurrentFormBundle && this.oCurrentFormBundle.FormBundleID){
			this.oAttachmentsController._loadAttachments();

		}
	}
	},
	_addSubmitIconTabFilterContent:function(oIconTabFilterControl){
		var oThis = this;
		var amountText = "0";

		//new controls instance created each time whenever a new filter content is formed
		this.oTaxPayableObjHeader = new sap.m.ObjectHeader({
		});
		//set amount to 0 by default
		//   this.oTaxPayableObjHeader.setTitle(this.getText("FORMS.TOTAL_PAYABLE")+" "+amountText);
		oIconTabFilterControl.addContent(this.oTaxPayableObjHeader);

		var oList = new sap.m.List();

		$.each(this.oFinalIconTabBarFiltersData, function(index,oIconTabBarFilterData){
			if(oIconTabBarFilterData.FormID==="submit"){
				return false;
			}
			var oStdListItm= new sap.m.StandardListItem({
				title:oIconTabBarFilterData.FormDescription,
			//	icon:oIconTabBarFilterData.icon, ACASTANEDA
				counter:0,
				type:sap.m.ListType.Navigation,
				press:function(evt){
					var oItems=oThis.oIconTabBar.getItems();
					if(oItems){
						oThis.oIconTabBar.setSelectedKey(oIconTabBarFilterData.FormID);
						oThis.oIconTabBar.fireSelect();
					}

				}
			});
			oList.addItem(oStdListItm);
		});
		oIconTabFilterControl.addContent(oList);
	},
	_addInitialPaymentIconTabFilterContent:function(oIconTabFilterData, oIconTabFilterControl){

	},
	_addNavcontainer:function(oFilter, oFormsList){
		var sKey = oFilter.getKey();

		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];

		//add controller to fragment
		var sController = "_"+oIconTabFilterData.FormID+"Controller";
		try{
			jQuery.sap.require("sap.umc.mobile.forms.view.forms."+this.oCurrentFormBundle.FormBundleTypeID+".fragments."+"V"+oIconTabFilterData.FormVersion+"."+oIconTabFilterData.FormID+"Controller");
			//always create a navcon and add the forms page in it and if
			//condition oIconTabFilterData.MaximumInstances > 1 then add the formslist page to navcon as well
			this["o"+oIconTabFilterData.FormID+"NavCon"]=new sap.m.NavContainer().addStyleClass("sapFmcaMNav");
			oFilter.addContent(this["o"+oIconTabFilterData.FormID+"NavCon"]);
			this[sController]=sap.umc.mobile.forms.view.forms[this.oCurrentFormBundle.FormBundleTypeID]["fragments"]["V"+oIconTabFilterData.FormVersion][oIconTabFilterData.FormID+"Controller"];
			this[sController].setView(this.getView());
			//forms page has to always be there in navcon
			if (!this["_"+oIconTabFilterData.FormID+"Fragment"]) {
				this["_"+oIconTabFilterData.FormID+"Fragment"]=sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms."+this.oCurrentFormBundle.FormBundleTypeID+".fragments."+"V"+oIconTabFilterData.FormVersion+"."+oIconTabFilterData.FormID,
						this[sController]);
			}
		}
		catch(err){
			this.getRouter().backToHome();
			this.oFormBusyDialog.close();
			this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, this.getText("FILING_OBLIGATIONS.NO_VIEW"));
			return false;

		}




		var sFormPage = "oPage"+oIconTabFilterData.FormID+"Form";
		if(!this[sFormPage]){
			this[sFormPage] = new sap.m.Page({
				content:this["_"+oIconTabFilterData.FormID+"Fragment"],
				showHeader:false,
				enableScrolling:false,
				height:"100%"
			});
			/******************start of table in standard form*************/

			var aTables = {};
			if(this.aTableGroups && this.aTableGroups[oIconTabFilterData.FormID])
				aTables = this.aTableGroups[oIconTabFilterData.FormID];
			for(var tableName in aTables){
				var sPanelHeading = tableName;
				var sTablePanel = oIconTabFilterData.FormID+"_"+tableName+"_panel";

				if(!this[sTablePanel])
					this[sTablePanel] = this.createFormScenarioTablePanel(sPanelHeading);
				var sTable = oIconTabFilterData.FormID+"_"+tableName+"_table";

				if(!this[sTable])
					this[sTable] = this.createFormScenarioTable(sTable,aTables[tableName])
					if (sFormPage == "oPageZIEPForm"){ // Para Espectaculos Publicos se agrega la tabla en el container BLiqPrivada
						sap.ui.getCore().getElementById("BLiqPrivada").addContent(this[sTablePanel].addContent(this[sTable]));
					}else if (sFormPage == "oPageZ2ICForm"){
						sap.ui.getCore().getElementById("CActGrav").addContent(this[sTablePanel].addContent(this[sTable]));
					}
					else{
				this[sFormPage].addContent(this[sTablePanel].addContent(this[sTable]));
					}
			}


			/*****************end of table in standard form*************/
			this["o"+oIconTabFilterData.FormID+"NavCon"].addPage(this[sFormPage]);
		}
		else{
			this["o"+oIconTabFilterData.FormID+"NavCon"].addPage(this[sFormPage]);
		}
		//formsList Page will needed to be added if max instnace is more than one
		var sMaxIns = parseInt(oIconTabFilterData.MaximumInstances);
		if(sMaxIns > 1 ){
			this.oFormInstancesController = sap.umc.mobile.forms.view.forms.FormInstances;
			this.oFormInstancesController.setView(this.getView());
			if (!this["formInstanceFragment"+oIconTabFilterData.FormID]) {
				this["formInstanceFragment"+oIconTabFilterData.FormID] = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.FormInstances", this.oFormInstancesController);
			}
			var sFormsListPage = "oPage"+oIconTabFilterData.FormID+"FormsList";
			if(!this[sFormsListPage]){

				this[sFormsListPage] = new sap.m.Page({content:this["formInstanceFragment"+oIconTabFilterData.FormID],
					showHeader:false,
					enableScrolling:false,
					height:"100%"
				});
				this["o"+oIconTabFilterData.FormID+"NavCon"].addPage(this[sFormsListPage]);
			}
			else{
				this["o"+oIconTabFilterData.FormID+"NavCon"].addPage(this[sFormsListPage]);
			}
			if(oFormsList && oFormsList.length){
				this.oAllFormsList[oIconTabFilterData.FormID] = oFormsList;
			}
		}
		//after navcontainer and its pages are created always create the model
		this._createFormBundleTypeModel(oIconTabFilterData.FormID);
		this.setDefaultValueState(oIconTabFilterData.FormID);

		//indicator that error list has been pressed
		if(!(this.bErrorListItemSelected)){
			this._handleInitialNavigation(oFilter, oFormsList);
		}
		else
		{
			if(this.oAllFormsData[sKey] && this.oAllFormsData[sKey][oFilter.data().CurrentFormNo] && this.oAllFormsData[sKey][oFilter.data().CurrentFormNo]["FormData"]){
				this.navToFormPage(oFilter);
			}else
			{
				if(this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID)
					this.getFormData(oFilter);
			}
			this.bErrorListItemSelected = false;
		}
		
		
	},
	_handleInitialNavigation:function(oFilter, oFormsList){
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[oFilter.getKey()];
		var sMaxIns = parseInt(oIconTabFilterData.MaximumInstances);
		if(sMaxIns > 1 && oFormsList && oFormsList.length){
			this.navToFormsListPage(oFilter);
		}
		else if(sMaxIns > 1 && oFormsList && oFormsList.length===0)
		{
			var sFormNo = parseInt(oFormsList.length + 1).toString();
			this._addLocalFormListItem(oIconTabFilterData,sFormNo);
			this._addLocalFormData(oFilter);
			this.navToFormPage(oFilter);
		}
		else if(sMaxIns === 1 && (this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID) && oFormsList && oFormsList.length===1){
			var sKey = oFilter.getKey();
			var oFilter = this.getFilterByKey(sKey);
			var oFilterData = oFilter.data();

			//as get formdata will run only once after the creation of below
			//as the current form in display is in consideration hence this.getSelectedFilter()
			var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];
			var sCurrentFormNo= oFilterData.CurrentFormNo;

			if(this.oAllFormsData[oIconTabFilterData.FormID] && this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]
			&& this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]["FormData"]
			){this.navToFormPage(oFilter);}
			else
				this.getFormData(oFilter);
		}
		else if(sMaxIns === 1 && (this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID) && oFormsList && oFormsList.length===0){
			this._addLocalFormData(oFilter);
			this.navToFormPage(oFilter);

		}
		else if(sMaxIns === 1 && !(this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID)){
			this._addLocalFormData(oFilter);
			this.navToFormPage(oFilter);

		}
		else if(sMaxIns > 1 && !(this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID)){
			var sFormNo = "1";
			this._addLocalFormListItem(oIconTabFilterData,sFormNo);
			this._addLocalFormData(oFilter);
			this.navToFormPage(oFilter);

		}
	},
	_addLocalFormData:function(oFilter){
		var sKey = oFilter.getKey();
		//filterdata
		// var oIconTabFilterData = oFilter.data()[sKey];
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];
		var sCurrentFormNo= oFilter.data().CurrentFormNo;
		if(!(this.oAllFormsData[oIconTabFilterData.FormID]))
			this.oAllFormsData[oIconTabFilterData.FormID]={};
		if(!(this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]))
			this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]={};
		if(!this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]["FormData"])
			this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]["FormData"]=jQuery.extend( true, {},this["o"+sKey]);

		this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]["bEdited"]=false;
		//this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]["bLocalInstance"]=true;

		if(this.isPrepopulate){
			this.prePopulateFields();
		}


	},
	onExistingFormsLoaded:function(oFormsList,filter){
		/*var sSuccess = */this._addNavcontainer(filter, oFormsList);
		/*return sSuccess;*/
		if (this.currentIconTabFilterKey == "ZPLU"){
	        this["_ZPLUController"].onIniciarTipoPersona();
			};
	},
	readExistingForms: function(oIconTabFilterControl) {

		/* var sSuccess =*/ this.getDataProvider().getExistingForms(this,oIconTabFilterControl);
		/* return sSuccess;*/
	},
	_addInitialFormContent:function(oIconTabFilterControl){
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()];
		if(this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID)
		{
			/*var sSuccess =*/  this.readExistingForms(oIconTabFilterControl);
			/*return sSuccess;*/
		}
		else{
			/*  var sSuccess = */ this._addNavcontainer(oIconTabFilterControl);
			/*  return sSuccess;*/
		}
	},
	_addLocalFormListItem:function(oIconTabFilterData,sFormNo){
		var data = {
				"FIELDINDEX": "",
				"FORMID": oIconTabFilterData.FormID,
				"FORMNO": sFormNo,
				"FormDescription": oIconTabFilterData.FormDescription,
				"TABLEFORM": "",
		};
		if(this.bPeriodBased) {
			data.PeriodID = this.oCurrentFormBundle.PeriodID;
		}
		else if(this.bKeyDateBased){
			data.KeyDate = this.oCurrentFormBundle.KeyDate;
		}
		var sFormsListPage = "oPage"+oIconTabFilterData.FormID+"FormsList";
		var oTempData = jQuery.extend( {},data);
		var aTemp = [];

		if(this.oAllFormsList[oIconTabFilterData.FormID]
		&& this.oAllFormsList[oIconTabFilterData.FormID].length){
			this.oAllFormsList[oIconTabFilterData.FormID].push(oTempData);
		}
		else{
			aTemp.push(oTempData);
			this.oAllFormsList[oIconTabFilterData.FormID] = aTemp;
		}
		this.getFilterByKey(oIconTabFilterData.FormID).data("FormsListCount",this.oAllFormsList[oIconTabFilterData.FormID].length);
	},
	//start of table form
	onTableFormDataLoaded:function(oIconTabFilterControl,oData){
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
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()];
		var sFormNo = "1";
		//this["o"+oIconTabFilterData.FormID+"_TableItems"] = formData;
		if(!(this.oAllFormsData[oIconTabFilterData.FormID]))
			this.oAllFormsData[oIconTabFilterData.FormID]  = {};
		if(!(this.oAllFormsData[oIconTabFilterData.FormID][sFormNo]))
			this.oAllFormsData[oIconTabFilterData.FormID][sFormNo] = {};
		this.oAllFormsData[oIconTabFilterData.FormID][sFormNo]["FormData"] = formData;
		this.oAllFormsData[oIconTabFilterData.FormID][sFormNo]["bEdited"] = false;
		this._createTableFormModel(oIconTabFilterData.FormID);
	},
	_createTableFormModel:function(sFormID){
		var obj = {};
		var sFormNo = "1";
		if(this.oAllFormsData[sFormID] && this.oAllFormsData[sFormID][sFormNo] && this.oAllFormsData[sFormID][sFormNo]["FormData"]){
			obj = this.oAllFormsData[sFormID][sFormNo]["FormData"];}
		var oModel = new sap.ui.model.json.JSONModel();
		var sController = "_"+sFormID+"Controller";
		oModel.setSizeLimit(this[sController].TableRowsLimit);
		oModel.setData(obj);
		this.getView().setModel(oModel,sFormID+"Model");
	},
	//end of table form
	getFormData:function(oFilter){
		//local form instance data does not exist so for the first time the call has to go to backend
		this.getDataProvider().getFormData(this,oFilter/*,this.oCurrentFormBundle.StatusID commented for time being*/);
	},
	_addInitialFormDataBeforeShow:function(oIconTabFilterControl,bTableForm){
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()];
		if(!bTableForm){
			//if Form Bundle Type is period based then all form scenarios will also be period based
			var oPeriodID = sap.ui.getCore().getElementById("_"+oIconTabFilterData.FormID+"PeriodID");
			if(oPeriodID && this.oCurrentFormBundle.PeriodID){
				oPeriodID.setValue(this.oCurrentFormBundle.PeriodID);
			}
			//if key date based
			var oKeyDate = sap.ui.getCore().getElementById("_"+oIconTabFilterData.FormID+"KeyDate");
			if(oKeyDate && this.oCurrentFormBundle.KeyDate){
				oKeyDate.setDateValue(this.oCurrentFormBundle.KeyDate);
			}
		}
	},
	_formBeforeShow:function(oIconTabFilterControl,data,bTableForm){
		this._addInitialFormDataBeforeShow(oIconTabFilterControl, bTableForm);
	},
	_formsListBeforeShow:function(oIconTabFilterControl,data){

	},
	displayFormList:function(oIconTabFilterControl){
		var sFormsListPage =  "oPage"+oIconTabFilterControl.getKey()+"FormsList";
		var oFormListData = {};
		oFormListData.results = [];
		$.extend(true,oFormListData.results,this.oAllFormsList[oIconTabFilterControl.getKey()]);
		if(oFormListData){

			oIconTabFilterControl.data("FormsListCount",oFormListData.results.length);
			this.oFormsList = new sap.ui.model.json.JSONModel();
			this.oFormsList.setData(oFormListData);

			if(this[sFormsListPage]){
				this[sFormsListPage].setModel(this.oFormsList, "ExistingForms");
				this[sFormsListPage].getModel("ExistingForms").refresh();

			}
		}
		//handle buttons
		var sKey = oIconTabFilterControl.getKey();
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];
		var sMaxIns = parseInt(oIconTabFilterData.MaximumInstances);

		this._hideAllButtons();
		if(sMaxIns > 1 ){
			if(oIconTabFilterControl.data().FormsListCount &&
					oIconTabFilterControl.data().FormsListCount<sMaxIns &&
					this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
			){
				this.oView.byId("idFormAdd").setVisible(true);
			}
		}
	},
	displayFormData:function(formData/*,enableData*/){
		//each time data for form is set handle flags
		var currentSelectedFilter = this.getSelectedFilter();
		var oFormModel = this.getView().getModel(this.oFinalIconTabBarFiltersData[currentSelectedFilter.getKey()].FormID+"Model");
		if(oFormModel)
			oFormModel.setData(formData);
	},
	navToFormPage:function(oIconTabFilterControl){
		var formData;//give arrays path
		var sKey = oIconTabFilterControl.getKey();

		var oFilterData = oIconTabFilterControl.data();
		//as get formdata will run only once after the creation of below
		//as the current form in display is in consideration hence this.getSelectedFilter()
		//filterdata
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];
		var sCurrentFormNo= oFilterData.CurrentFormNo;
		//to show the form no in the icon tab filter
		this.setIconTabFilterCount(oIconTabFilterControl);
		//  oIconTabFilterControl.setCount(parseInt(sCurrentFormNo));
		//handle buttons
		this._hideAllButtons();
		
		// MODIFICACIoN ACASTANEDA 
		// LoGICA MOSTRAR BOToNES IMPRIMI FORMULARIO DE ICA SIN FIRMAR, FIRMADO Y LLAMAR FIRMADO 22.04.2019.
		if (this.oCurrentFormBundle.StatusID == "SUBMITTED")
		{	/* 
			if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA")
			{
		 	this.odataFirmaFisica(); // Se verifica estatus de la variable de contingencia para firma fisica.
			}
		else 
			*/
			if (this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" || this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"  || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP" || this.oCurrentFormBundle.FormBundleTypeID == "ZICA") // Mostrar formulario sin firmar ( no aplica firma electronica)
		{
			this.getView().byId("idImprimirReciboSinFirmar").setVisible(true);
		}
		}
		
		// FIN MODIFICACIoN ACASTANEDA 22.04.2019
		if(this.prevIconTabFilter && this.currentIconTabFilter ){

			/*var prevIconTabFilterKey = this.prevIconTabFilter.getKey();
            var currentIconTabFilterKey = this.currentIconTabFilter.getKey();*/
			if(this.bErrorListItemSelected
					&& this.prevIconTabFilterKey === this.currentIconTabFilterKey
					&& this.prevIconTabFilterFormNo === this.currentIconTabFilterFormNo

			)	{
				this.oView.byId("idFormErrorCount").setVisible(true);
			}
		}
		var sMaxIns = parseInt(oIconTabFilterData.MaximumInstances);

		if(sMaxIns > 1 ){
			this.oView.byId("idFormBackToList").setVisible(true);
		}
		if(this.oCurrentFormBundle.StatusID &&
				(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
		){ if  (this.oCurrentFormBundle.FormBundleTypeID == "ZICA" || this.oCurrentFormBundle.FormBundleTypeID == "ZIEP" || this.oCurrentFormBundle.FormBundleTypeID == "ZEPR"  || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP"){ 
			this.oView.byId("idFormValidate").setVisible(true);  // ACASTANEDA se modifica paravisualizar boton verificar en formulario de ICA
			}else{
				this.oView.byId("idFormValidate").setVisible(false);  // ACASTANEDA se modifica para no visualizar boton verificar
								
			}
		}
		if(this.oCurrentFormBundle.StatusID &&
				(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
		){  this.oView.byId("idFormSave").setVisible(true);
		}
		if(this.oCurrentFormBundle.StatusID &&
				(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()) &&
				this.showSubmitBtnOnAllTabs
		){  this.oView.byId("idFormSubmit").setVisible(true); 
		}
		//amend original
		if(this.amendOriginal){
			this.oView.byId("idFormSave").setVisible(false);
		}

		//nav to form page
		var sFormPage = "oPage"+oIconTabFilterControl.getKey()+"Form";
		this["o"+oIconTabFilterControl.getKey()+"NavCon"].to(this[sFormPage].getId());
		//prefil period id or key dae
		this._formBeforeShow(oIconTabFilterControl);
		formData = this.oAllFormsData[oIconTabFilterData.FormID][sCurrentFormNo]["FormData"]
		this.displayFormData(formData);
		/**********table in standard form*/
		this.createFormScenarioTableRows(oIconTabFilterControl);
		
		//acastaNeda 
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
			 this["_Z2ICController"].ModifyActividadesModelfromZ2IC();
			 this["_Z2ICController"].TipoId();
			 this["_Z2ICController"].InciarCheckBox();
		};
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"){
			 this["_ZIEPController"].InciarCheckBox(this.oCurrentFormBundle.StatusID);
		};
		
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZEPR"){
			 this["_ZEPRController"].InciarCheckBox();
		}
		
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZCOP"){
			 this["_ZCOPController"].InciarCheckBox();
		}
	},  
	navToFormsListPage:function(oIconTabFilterControl){
		//to show the form no to blank in the icon tab filter
		this.setIconTabFilterCount(oIconTabFilterControl,true);
		//oIconTabFilterControl.setCount("");
		var sKey = oIconTabFilterControl.getKey();
		//nav to forms list
		var sFormsListPage = "oPage"+sKey+"FormsList";
		this["o"+sKey+"NavCon"].to(this[sFormsListPage].getId());

		this.displayFormList(oIconTabFilterControl);
	},
	setIconTabFilterCount:function(oIconTabFilterControl,bSetBlank){
		var sKey = oIconTabFilterControl.getKey();
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];
		if(oIconTabFilterData.bFormBundleType){

			if(bSetBlank){
				oIconTabFilterControl.setCount("");
			}
			else{
				var sMaxIns = parseInt(oIconTabFilterData.MaximumInstances);
				var sCurrentFormNo= oIconTabFilterControl.data().CurrentFormNo;

				if(sMaxIns>1){
					oIconTabFilterControl.setCount(parseInt(sCurrentFormNo));
				}
				else{
					oIconTabFilterControl.setCount("");
				}
			}
		}
	},
	generateFormDataJSON:function(oData){
		var a=jQuery.parseJSON(oData.FormData);
		var formData={};
		if(a.length){
			var b=a[0].DATA;
			$.each(b, function( index, value ) { fieldname=value.FIELDNAME;
			formData[value.FIELDNAME]=value.FIELDVALUE;
			});
		}
		return formData;
	},
	onFormDataLoaded:function(oFilter,oData){
		var formData={};
		formData = this.generateFormDataJSON(oData);

		var sKey = oFilter.getKey();
		var oFilterData = oFilter.data();
		var sCurrentFormNo= oFilterData.CurrentFormNo;

		this.saveFormDataLocally(sKey,sCurrentFormNo,formData);
		this.saveFormScenarioTableDataLocally(sKey,sCurrentFormNo,oData);
		this.navToFormPage(oFilter);

	},
	saveFormDataLocally:function(sFormID,sFormNo,formData){

		if(!(this.oAllFormsData[sFormID]))
			this.oAllFormsData[sFormID]={};
		if(!(this.oAllFormsData[sFormID][sFormNo]))
			this.oAllFormsData[sFormID][sFormNo]={};
		if(!($.isEmptyObject(formData))){
			this.oAllFormsData[sFormID][sFormNo]["FormData"]=jQuery.extend( true, {},this["o"+sFormID]);
			for(var field in formData)
			{
				if(this["o"+sFormID].hasOwnProperty(field))
					this.oAllFormsData[sFormID][sFormNo]["FormData"][field] = formData[field];
			}
		}
		if(!this.amendFormBundleID){
			this.oAllFormsData[sFormID][sFormNo]["bEdited"]=false;
		}
		else{
			this.oAllFormsData[sFormID][sFormNo]["bEdited"]=true;
		}
	},
	backToFormsList:function(){
		//set the form instance to default 1
		var oSelectedFilter = this.getSelectedFilter();
		oSelectedFilter.data("CurrentFormNo","1");
		this.navToFormsListPage(oSelectedFilter);
	},
	_createFormBundleTypeModel:function(sFormID){
		var obj = {};
		obj = this["o"+sFormID];
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(obj);
		this.getView().setModel(oModel,sFormID+"Model");
	},
	onIconTabBarSelect:function(evt){
		var oThis = this;
		if(!this.oFormBusyDialog ){
			this.oFormBusyDialog = new sap.m.BusyDialog();
		}
		this.oFormBusyDialog.open();
		oThis.handleIconTabBarSelect();

	},
	handleIconTabBarSelect:function(evt){
		var oIconTabFilterControl = this.getSelectedFilter();
		this.prevIconTabFilter = this.currentIconTabFilter;
		var sKey = this.oIconTabBar.getSelectedKey();
		this.setFlagVisibility();
		//filterdata
		// var oIconTabFilterData = oIconTabFilterControl.data()[sKey];
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];
		var oThis = this;
		if(this.prevIconTabFilter){
			this.prevIconTabFilterKey = this.currentIconTabFilterKey;
			this.prevIconTabFilterFormNo = this.currentIconTabFilterFormNo;
			//set icon tab filter of previous tab filetr to blanlk
			this.setIconTabFilterCount(this.prevIconTabFilter,true);


		}
		this.currentIconTabFilter = oIconTabFilterControl;
		this.currentIconTabFilterKey = oIconTabFilterControl.getKey();
		this.currentIconTabFilterFormNo = oIconTabFilterControl.data().CurrentFormNo;

		//handle buttons for tabs containing standard forms
		if(oIconTabFilterData.bFormBundleType){

			if(this["o"+sKey+"NavCon"]){

				if(this["o"+sKey+"NavCon"].getCurrentPage().sId === this["oPage"+sKey+"Form"].getId()){

					var sMaxIns = parseInt(oIconTabFilterData.MaximumInstances);
					this._hideAllButtons();
					if(sMaxIns > 1 ){
						this.oView.byId("idFormBackToList").setVisible(true);
					}
					if(this.oCurrentFormBundle.StatusID &&
							(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
					){
						if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA" || this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"  || this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP"){
							this.oView.byId("idFormValidate").setVisible(true);  // ACASTANEDA se modifica para no visualizar boton verificar
							
						}else{	this.oView.byId("idFormValidate").setVisible(false);  // ACASTANEDA se modifica para no visualizar boton verificar
						}
					}
					if(this.oCurrentFormBundle.StatusID &&
							(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
					){
						this.oView.byId("idFormSave").setVisible(true);
					}
					if(this.oCurrentFormBundle.StatusID &&
							(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()) &&
							this.showSubmitBtnOnAllTabs
					){
						this.oView.byId("idFormSubmit").setVisible(true); 
					}

					//amend original
					if(this.amendOriginal){
						this.oView.byId("idFormSave").setVisible(false);
					}

				}
				if(this["oPage"+sKey+"FormsList"] && this["o"+sKey+"NavCon"].getCurrentPage().sId === this["oPage"+sKey+"FormsList"].getId()){
					//handle buttons
					var sMaxIns = parseInt(oIconTabFilterData.MaximumInstances);
					this._hideAllButtons();
					if(sMaxIns > 1 ){
						if(oIconTabFilterControl.data().FormsListCount &&
								oIconTabFilterControl.data().FormsListCount<sMaxIns &&
								this.oCurrentFormBundle.StatusID &&
								(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
						){
							this.oView.byId("idFormAdd").setVisible(true);
						}
					}
				}
			}
		}
		//handle buttons for tabs containing table forms
		if(oIconTabFilterData.bTableForm){

			this._hideAllButtons();
			if(this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
			){
				this.oView.byId("idFormSave").setVisible(true);
				 if  (this.oCurrentFormBundle.FormBundleTypeID == "ZICA" || this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"  || this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP"){ 
				this.oView.byId("idFormValidate").setVisible(true);  // ACASTANEDA se modifica para no visualizar boton verificar
				 }else{
						this.oView.byId("idFormValidate").setVisible(false);  // ACASTANEDA se modifica para no visualizar boton verificar	 
				 }
				 }
			if(this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()) && this.showSubmitBtnOnAllTabs){
				this.oView.byId("idFormSubmit").setVisible(true); 
			}
			//amend original
			if(this.amendOriginal){
				this.oView.byId("idFormSave").setVisible(false);
			}
		}
		//if its the first time we are selecting the icon tab filter we should enter content in it
		if(oIconTabFilterControl && oIconTabFilterControl.getContent().length===0 ){
			/*var sSuccess =*/ this._addInitialIconTabFilterContent(oIconTabFilterControl);
			/*if (sSuccess === false){
        return;
      }*/
		}
		else if(this.bErrorListItemSelected && oIconTabFilterData.bFormBundleType){
			if(this.oAllFormsData[sKey] && this.oAllFormsData[sKey][oIconTabFilterControl.data().CurrentFormNo] && this.oAllFormsData[sKey][oIconTabFilterControl.data().CurrentFormNo]["FormData"]){
				this.navToFormPage(oIconTabFilterControl);
			}else
			{
				if(this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID)
					this.getFormData(oIconTabFilterControl);
			}
		}
		//to refresh forms model on each show of form/and also set default velue state and table creation aswell
		if(oIconTabFilterControl && oIconTabFilterData.bFormBundleType){
			var sKeyModel = oIconTabFilterControl.getKey();
			if(this.getView().getModel(sKeyModel+"Model"))
			{
				this.getView().getModel(sKeyModel+"Model").refresh();
			}
			//create new form scenario of tables
			this.createFormScenarioTableRows(oIconTabFilterControl);
			if(!this.bErrorListItemSelected){
				this.setDefaultValueState(oIconTabFilterControl.getKey());
			}
			else if(this.prevIconTabFilter && this.currentIconTabFilter ){
				if(!(this.prevIconTabFilter
						&& this.currentIconTabFilter

						&& this.prevIconTabFilterKey === this.currentIconTabFilterKey
						&& this.prevIconTabFilterFormNo === this.currentIconTabFilterFormNo
				)){
					this.setDefaultValueState(oIconTabFilterControl.getKey());
				}
			}
			if(this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
			){
				if(parseInt(oIconTabFilterData.MaximumInstances) > 1 ){
					var sKey = oIconTabFilterControl.getKey();
					if(this.oAllFormsList[sKey]){
						if( this.oAllFormsList[sKey].length === 0 ||
								this.oAllFormsList[sKey].length === 1
						)
						{
							oIconTabFilterControl.data("CurrentFormNo","1");

							if(this["o"+oIconTabFilterData.FormID+"NavCon"].getCurrentPage().sId !== this["oPage"+oIconTabFilterData.FormID+"Form"].getId()){
								this.oFormInstancesController._handleListItemPress(oIconTabFilterControl);}

							this.oView.byId("idFormBackToList").setVisible(false);}
					}
				}
			}
		}

		if(this.bErrorListItemSelected && oIconTabFilterData.bFormBundleType){
			this.bErrorListItemSelected = false;
		}

		if(oIconTabFilterData.bTableForm){
			var sController = "_"+oIconTabFilterData.FormID+"Controller";
			this[sController].setTableFormButtonsEnabled(this.oCurrentFormBundle.StatusID);
			this[sController].setTableFormMode(this.oCurrentFormBundle.StatusID);
			this[sController].setDefaultTableState();
			if (sController == "_Z_FORMTABLE_ICAController"){
			this[sController].eliminarCerosActividades();
			this.getView().getModel("Z_FORMTABLE_ICAModel").refresh(true);
			};
		}
		switch(sKey){
		case "attachments":{
			this._hideAllButtons();
			this.setFlagVisibility();
			oIconTabFilterControl.removeAllContent();
			this._addAttachmentIconTabFilterContent(oIconTabFilterControl);
			break;
		}
		case "submit":{
			this._hideAllButtons();
			this.setFlagVisibility();
			//handle buttons
			if(this.oCurrentFormBundle.StatusID &&
					(this.oCurrentFormBundle.StatusID.toLowerCase() !== sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
			){
				this.oView.byId("idFormSubmit").setVisible(true);  
			}
			oIconTabFilterControl.removeAllContent();
			this._addSubmitIconTabFilterContent(oIconTabFilterControl);
			var data = {};
			var   sTableForm = "";
			this.amountText = "0";
			if(this.oAllFormsData[this.sFormIDForPayAmount] &&
					this.oAllFormsData[this.sFormIDForPayAmount][this.sFormNoForPayAmount] &&
					this.oAllFormsData[this.sFormIDForPayAmount][this.sFormNoForPayAmount]["FormData"]){
				this.populateSubmitTabFilter(this.oAllFormsData[this.sFormIDForPayAmount][this.sFormNoForPayAmount]["FormData"]);
			}
			else if(this.oCurrentFormBundle.FormBundleID || this.amendFormBundleID) {
				if(this.amendFormBundleID){
					data.FormBundleID = "'"+this.amendFormBundleID+"'";
				}
				else if(this.oCurrentFormBundle.FormBundleID){
					data.FormBundleID = "'"+this.oCurrentFormBundle.FormBundleID+"'";
				}
				data.FormID="'"+this.sFormIDForPayAmount+"'";
				data.CurrentFormNo = "'"+this.sFormNoForPayAmount+"'";
				data.TableForm = "'"+sTableForm+"'";
				this.getDataProvider().readFormOnSubmitTab(this,data,false,jQuery.proxy(this.populateSubmitTabFilter, this));
			}
			if(((this.oCurrentFormBundle.StatusID)?this.oCurrentFormBundle.StatusID.toLowerCase():this.oCurrentFormBundle.StatusID) === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase()){
			}else{
				this.oView.byId("idFormSubmit").setVisible(true);  
			}
			break;
		}
		case "payment":{
			this._hideAllButtons();
			this.setFlagVisibility();
			oThis._populatePayments();
			break;
		}
		}
		//set count if u r navigating by icontabfilter tab press
		if(oIconTabFilterData.bFormBundleType &&
				this["o"+oIconTabFilterData.FormID+"NavCon"] &&  this["o"+oIconTabFilterData.FormID+"NavCon"].getCurrentPage()
				&& this["o"+oIconTabFilterData.FormID+"NavCon"].getCurrentPage().sId === this["oPage"+oIconTabFilterData.FormID+"Form"].getId()){
			this.setIconTabFilterCount(oIconTabFilterControl);
		}
		this._setVisibleAmendButton();
		if(sKey && sKey !== "payment"){
			this.oFormBusyDialog.close();
		}

	},
	setDefaultValueState:function(sFormID){
		for(sFieldName in this["o"+sFormID]){
			var oControl = this._getFormControlFromFieldName(sFieldName, sFormID);
			if(oControl && typeof(oControl.setValueState)==="function")
				oControl.setValueState(sap.ui.core.ValueState.None);
		}
		var oTableGroupDetails = {};

		if(this.aTableGroups && this.aTableGroups[sFormID])
			oTableGroupDetails =  this.aTableGroups[sFormID];
		for(var sTableGroup in oTableGroupDetails ){
			//handle table header valuestate
			var sTableName = sFormID+"_"+sTableGroup+"_table";
			if(this[sTableName] ){
				this.setDefualtFormScenarioTableHeaderState(this[sTableName]);}}

	},
	populateSubmitTabFilter:function(formData,isPaymentTab){
		if(!($.isEmptyObject(formData))){
			if(isPaymentTab){
				this.setPaymentAmount(formData[this.sFieldNameForPay],isPaymentTab);
			}else if(formData.hasOwnProperty(this.sFieldNameForPay)){

				//   if(formData[this.sFieldNameForPay])
				//     this.oTaxPayableObjHeader.setTitle(this.getText("FORMS.TOTAL_PAYABLE")+" "+formData[this.sFieldNameForPay]);
				//   else
				//   this.oTaxPayableObjHeader.setTitle(this.getText("FORMS.TOTAL_PAYABLE")+" "+"0");
				// Acastaneda, se comenta para no mostrar el valor a pagar en plusvalia 17-07-2018	   		
			}
		}
		//to set 0 if the data for amount to be submitted in submit tab is not coming from backend
		else{
			this.setPaymentAmount(0,isPaymentTab);
		}
	},
	getFilterByKey:function(selectedKey){
		var items= this.oIconTabBar.getItems();
		var filter;
		$.each(items,function(index,item){
			if(typeof(item.getKey)==="function"){
				if(item.getKey()===selectedKey){
					filter=item;
				}
			}
		});
		return filter;
	},
	getSelectedFilter:function(){
		var  selectedKey= this.oIconTabBar.getSelectedKey();
		return this.getFilterByKey(selectedKey);
	},

	handleValidatePress: function(){
		// Para formulario de ICA se guardan los datos de tabla Actividades en Z2ICModel
		
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
			 this["_Z2ICController"].ModifyActividadesZ2ICfromTable();
		};		
		
		var that = this;
		
		if( this.oCurrentFormBundle.FormBundleTypeID == "ZBPL")
			{
	      this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT, this.bNoFormDataOnSaveDraft,false,function(){
	    	  that.VerificarForm(that);  // Se envia la funcion para que sea llamada al momento de responder el servicio de guardado
	    
	      });    
	
			} else{
	      
		  this.getDataProvider().validateFormData(this,this.validateRuleID,true,jQuery.proxy(this.onFormBundleRulesCallSuccess, this));
			}
			},
	
	VerificarForm: function(that){
		that.getDataProvider().validateFormData(that,that.validateRuleID,true,jQuery.proxy(that.onFormBundleRulesCallSuccess, that));
	},
	onFormBundleRulesCallSuccess:function(MessageData,FormData,isValidate,isCheckBeforeSubmitCall){
		var messageData=[];
		if(MessageData)
			messageData = JSON.parse(MessageData);
		var formData=JSON.parse(FormData);
		var oThis=this;
		var oFilter = this.getSelectedFilter();
		var sCurrentFormID = oFilter.getKey();
		var sCurrentFormNo = oFilter.data().CurrentFormNo;
		//0.condition :- formdata is always populated, the formdata ovverides the existing filled data
		//of the current form in display, so it shud not be a check before submit call
		//according to vinod if there is messade data existing formdata shud not populate
		//only when msg data is 0 length then only it shud populate the formdata
		
		if(formData.length){
			//populate all the form datas even they come for a different form different from the one sent in payload
			$.each(formData,function(ind,oFormData){
				//if($.inArray(oFormData.FORMID,oAvailableTableForms)>-1 && oFormData.DATA.length){
				var sFormID = oFormData.FORMID;
				if($.inArray(sFormID,oThis.aIconTabBarFilterSequence)>-1 && oFormData.DATA.length){
					var sFormNo = oFormData.FORMNO;
					sFormNo = parseInt(sFormNo);
					sFormNo = sFormNo.toString();

					var oForm = {};
					oForm.FormNo = sFormNo;
					oForm.FormID = sFormID;
					//for formdata coming from callFormbundleRulesCall for standard form
					if(parseInt(oFormData.FIELDINDEX)===1){

						if(!(oThis.oAllFormsData[sFormID]
						&& oThis.oAllFormsData[sFormID][sFormNo]
						&& oThis.oAllFormsData[sFormID][sFormNo]["FormData"]
						)){
							//getFormDataOnValidation - is used in the case
							// for eg. we do not open a form so we would not have the
							//form locally (not table form). and if the form bundles rules send a
							// error that form den 1st we need to get the form dtaa and den
							//make changes to the formdata according to the formdata sent by the form
							//bundle rules call
							if(isValidate && oThis.oCurrentFormBundle.FormBundleID)//it should not get formdata for a fresh form meant for prepopulation
								oThis.getDataProvider().getFormDataOnValidation(oThis,oForm);
						}
						if(!oThis.oAllFormsData[sFormID])
							oThis.oAllFormsData[sFormID] = {};
						if(!oThis.oAllFormsData[sFormID][sFormNo])
							oThis.oAllFormsData[sFormID][sFormNo] = {};
						if(!oThis.oAllFormsData[sFormID][sFormNo]["FormData"])
							oThis.oAllFormsData[sFormID][sFormNo]["FormData"] = {};
						if(oThis.oAllFormsData[sFormID][sFormNo]["FormData"])
						{
							//handles formdata for form, it shud be fieldindex 1
							if(oFormData.DATA.length){
								$.each(oFormData.DATA, function( index, value ) {
									if(oThis["o"+sFormID].hasOwnProperty(value.FIELDNAME)){
										oThis.oAllFormsData[sFormID][sFormNo]["FormData"][value.FIELDNAME]=value.FIELDVALUE;
										if(isValidate)//as if it prepopulate then its actually not edited mode
											oThis.oAllFormsData[sFormID][sFormNo]["bEdited"]=true;
									}});
							}
						}
					}
					//for formdata coming from callFormbundleRulesCall for form scenario tables
					//handle fieldindex 1 to n for table fields
					if(!(oThis.oAllFormsData[sFormID]
					&& oThis.oAllFormsData[sFormID][sFormNo]
					&& oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"])){
						//getFormDataOnValidation - is used in the case
						// for eg. we do not open a form so we would not have the
						//form locally (not table form). and if the form bundles rules send a
						// error that form den 1st we need to get the form dtaa and den
						//make changes to the formdata according to the formdata sent by the form
						//bundle rules call
						if(isValidate && oThis.oCurrentFormBundle.FormBundleID)//it should not get formdata for a fresh form meant for prepopulation
							oThis.getDataProvider().getFormDataOnValidation(oThis,oForm);
					}
					var fldIndx = 1;// parseInt(oFormData.FIELDINDEX); Modificaion ACASTANEDA Cargar tabla correctamente..
					var ultimaColomn = 0;
					//handles formdata for form, it shud be fieldindex 1
					if(!oThis.oAllFormsData[sFormID])
						oThis.oAllFormsData[sFormID] = {};
					if(!oThis.oAllFormsData[sFormID][sFormNo])
						oThis.oAllFormsData[sFormID][sFormNo]={};
					if(!oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"])
						oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"]={};

					if(oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"])
					{ if(oFormData.DATA.length){
						$.each(oFormData.DATA, function( index, value ) {
							//find which table and table row does the fieldname belong to
							//loop throught the header object and search the table name
							var oHeaderDetails = {};
							if(oThis.aTableGroups && oThis.aTableGroups[sFormID])
								oHeaderDetails = oThis.aTableGroups[sFormID];
							var columnIndx = null;
							var sTabName = null;
							var sFieldName = value.FIELDNAME;
							for(var sTableName in oHeaderDetails){
								var indx = $.inArray(sFieldName,oHeaderDetails[sTableName].fields);
								if(indx>-1){
									columnIndx = indx;
									sTabName = sTableName;
									break;
								}
							}
							if(sTabName && !isNaN(columnIndx)){
								// Modificacion ACASTANEDA , se modifica el Index para cargar todas Posiciones de la tabla 
								if (ultimaColomn != columnIndx){
									fldIndx = 1;
								}		
								// Fin modificacion Acastaneda
								if(!oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"][sTabName])
									oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"][sTabName] = [];
								if(!oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"][sTabName][fldIndx-1]){
									var tempArr = [];
									tempArr[columnIndx] = value.FIELDVALUE;
									oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"][sTabName][fldIndx-1] = tempArr;
								}
								else{
									oThis.oAllFormsData[sFormID][sFormNo]["TableGroups"][sTabName][fldIndx-1][columnIndx] = value.FIELDVALUE;
								}
								if(isValidate)//as if it prepopulate then its actually not edited mode
									oThis.oAllFormsData[sFormID][sFormNo]["bEdited"]=true;
								
						
								fldIndx = fldIndx + 1;
								ultimaColomn = columnIndx;

								
							}
						});
					}
					}
				}
			});
//			if not on submit tab form data shud change and reflect on ui
			if(this.getView().getModel(this.oIconTabBar.getSelectedKey()+"Model"))
			{
				this.getView().getModel(this.oIconTabBar.getSelectedKey()+"Model").refresh();

				/*handle form scenario tables*/
			}
			this.createFormScenarioTableRows(oFilter);
		}
		//1.condition :-if messageData exists and it is not a check before submit call
		//den the present displayed form is the one in consideration
		if(!isCheckBeforeSubmitCall)
		{this._populateErrorButtonList(MessageData,isValidate);
		}
		//2.condition :-if messageData exists and it is a check before submit call
		//den we would be on submit tab, hence the errors should display as a list
		//in the submit tab filter --- i am not going to populate the formdata, as currently only the
		//msg data is dispaly is handled
		if(isCheckBeforeSubmitCall && messageData.length)
		{this.onSubmitFailure(MessageData);
		}
		//3. condiition :-if there is no messageData for validation/check before submit
		//and it is a check before submit call the go ahead and submit the formData we get from the form bundle rules call here
		if(isCheckBeforeSubmitCall && !messageData.length){
			
			this.verificarDiferencias();
			 //bla bla bla
			}

		
		// ACASTANEDA  Se llama la funcion de muestra de Representante Legal para formulario ZPLU
		if (this.currentIconTabFilterKey == "ZPLU"){
        this["_ZPLUController"].onIniciarTipoPersona();
		};
		
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
			 this["_Z2ICController"].ModifyActividadesModelfromZ2IC();
		}
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA" && isValidate == false){ // Unicamente se carga en el momento de la precarga de datos, no al llamar verificar
			 this["_Z2ICController"].InciarCheckBox();
			 this["_Z2ICController"].TipoId();
		};
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZIEP" && isValidate == false){
			 this["_ZIEPController"].InciarCheckBox(this.oCurrentFormBundle.StatusID);
		};
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" && isValidate == false){
			 this["_ZEPRController"].InciarCheckBox();
		};		
		
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZCOP"  && isValidate == false){
			 this["_ZCOPController"].InciarCheckBox();
		}
		
		
	},
	
	verificarDiferencias:function(){
		// PARA ICA SE DEBE MOSTRAR UN MENSAJE DE CONFIRMACIoN ANTES DE ENVIAR EL SUBMIT
		// EN CASO QUE LA VARIABLE A_127_EXISTE_DIFERENCIA  == "X".
		
		if( this.oCurrentFormBundle.FormBundleTypeID == "ZICA" || this.oCurrentFormBundle.FormBundleTypeID == "ZIEP" || this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" ||  this.oCurrentFormBundle.FormBundleTypeID == "ZCOP" ){
			if(this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
				var diferencia = this["_Z2ICController"].getView().getModel("Z2ICModel").getProperty("/A_131_EXISTE_VAL_DIF");
			}else if (this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"){
				var diferencia = this["_ZIEPController"].getView().getModel("ZIEPModel").getProperty("/A_88_EXISTE_VAL_DIF");
			}else if (this.oCurrentFormBundle.FormBundleTypeID == "ZEPR"){
				var diferencia = this["_ZEPRController"].getView().getModel("ZEPRModel").getProperty("/A_62_EXISTE_VAL_DIF");
			}else if (this.oCurrentFormBundle.FormBundleTypeID == "ZCOP"){
				var diferencia = this["_ZCOPController"].getView().getModel("ZCOPModel").getProperty("/A_48_EXISTE_VAL_DIF");
			}
			if (diferencia == "X")
				{
				that = this;
				
		    	// this is required since there is no direct access to the box's icons like MessageBox.Icon.WARNING
		    	jQuery.sap.require("sap.ui.commons.MessageBox");
		    	
		    	// open a fully configured message box
		    	sap.ui.commons.MessageBox.show("Existen diferencias entre los valores digitados y los valores calculados, desea revisar antes de enviar?",
		    			sap.ui.commons.MessageBox.Icon.WARNING,
		    			"DIFERENCIAS ENTRE VALORES DIGITADOS Y CALCULADOS",
		    			[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
		    			jQuery.proxy(that.procesarFormulario, that),
		    			sap.ui.commons.MessageBox.Action.YES);
		    	
		    	
				}else{
					this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,this.bNoFormDataOnSubmit);						
				} 
		}else{
		this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,this.bNoFormDataOnSubmit);
		}
	},
	
	procesarFormulario:function(that){
		if (that == "NO")
		{
			that = this;
			that.getDataProvider().processForm(that,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,that.bNoFormDataOnSubmit);						
			
		}
	},
	
	_populateErrorButtonList:function(MessageData,isValidate){
		var messageData=[];
		if(MessageData)
			messageData = JSON.parse(MessageData);

		var sMessageToastMsg = "";
		var sMessageToastMsgFinal = "";
		if(messageData.length){
			var items=[];
			var oThis = this;
			$.each(messageData, function( index, value ) {


				switch(value.MESSAGETYPE) {
				case "E":{
					sMessageToastMsgFinal = sap.ui.core.ValueState.Error;

					break;
				}
				case "W":{
					if(sMessageToastMsgFinal!==sap.ui.core.ValueState.Error){

						sMessageToastMsgFinal = oThis.getText("MESSAGE_CENTER.WARNING");
					}

					break;
				}
				default:{
					if(sMessageToastMsgFinal!==sap.ui.core.ValueState.Error && sMessageToastMsgFinal!==oThis.getText("MESSAGE_CENTER.WARNING")){

						sMessageToastMsgFinal = oThis.getText("MESSAGE_CENTER.INFO");
					}
				}
				}
				var col = oThis._getColumnListItem(value);
				if(value.FIELDNAME && value.FORMID && value.FORMNO){
					var sFormID = value.FORMID;
					var sFormNo = value.FORMNO;
					sFormNo = parseInt(sFormNo);
					sFormNo = sFormNo.toString();
					var oIconTabFilter = oThis.getFilterByKey(sFormID);
					var oIconTabFilterData = oThis.oFinalIconTabBarFiltersData[sFormID];
					var oControl = oThis._getFormControlFromFieldName(value.FIELDNAME,value.FORMID);

					if(oThis.getSelectedFilter().getKey() === sFormID &&
							oThis.getSelectedFilter().data().CurrentFormNo ===  sFormNo
					)
					{
						if (oControl && typeof(oControl.setValueState)==="function"){
							switch(value.MESSAGETYPE) {
							case "E":{
								oControl.setValueState(sap.ui.core.ValueState.Error);
								break;
							}
							case "W":{
								oControl.setValueState(sap.ui.core.ValueState.Warning);
								break;
							}
							default:{
								oControl.setValueState(sap.ui.core.ValueState.None);
							}
							}
							oControl.setValueStateText(value.MESSAGETEXT);

							if (oControl.attachLiveChange){ // Se agrega la restriccion ya que existen tipos de campos que no tienen este Metodo ACASTANEDA 20/10/2018
							oControl.attachLiveChange(function(evt) {
								oControl.setValueState(sap.ui.core.ValueState.None);
							})};
						}
						//handle form scenario table header color background
						if(!oControl){
							//find the table name to which the field belongs and also which column index
							var oHeaderDetails = {};
							if( oThis.aTableGroups && oThis.aTableGroups[sFormID])
								oHeaderDetails = oThis.aTableGroups[sFormID];
							var columnIndx = null;
							var sTabName = null;
							var sFieldName = value.FIELDNAME;
							for(var sTableName in oHeaderDetails){
								var indx = $.inArray(sFieldName,oHeaderDetails[sTableName].fields);
								if(indx>-1){
									columnIndx = indx;
									sTabName = sTableName;
									break;
								}
							}

							if(sTabName && !isNaN(columnIndx)){
								if(oThis[sFormID+"_"+sTabName+"_table"]){
									if(value.MESSAGETYPE ==="E")
										oThis[sFormID+"_"+sTabName+"_table"].getColumns()[columnIndx].getHeader().addStyleClass("highlightTableColumnError");
									if(value.MESSAGETYPE ==="W")
										oThis[sFormID+"_"+sTabName+"_table"].getColumns()[columnIndx].getHeader().addStyleClass("highlightTableColumnWarning");
								}
							}
						}
					}
					col.attachPress(function(){
						//indicator for the error list item has been selected whether submit tab error list item or that of the error button
						oThis.bErrorListItemSelected = true;
						if(oIconTabFilterData && oIconTabFilterData.bFormBundleType){
							oIconTabFilter.data("CurrentFormNo",sFormNo);
							oThis.oIconTabBar.setSelectedKey(sFormID);
							oThis.oIconTabBar.fireSelect();
							var oControl = null;
							oControl = oThis._getFormControlFromFieldName(value.FIELDNAME,value.FORMID);

							if (oControl && typeof(oControl.setValueState)==="function"){
								switch(value.MESSAGETYPE) {
								case "E":{
									sMessageToastMsg = sap.ui.core.ValueState.Error;
									oControl.setValueState(sap.ui.core.ValueState.Error);
									break;
								}
								case "W":{
									if(sMessageToastMsg!==sap.ui.core.ValueState.Error){

										sMessageToastMsg = oThis.getText("MESSAGE_CENTER.WARNING");
									}
									oControl.setValueState(sap.ui.core.ValueState.Warning);
									break;
								}
								default:{
									if(sMessageToastMsg!==sap.ui.core.ValueState.Error && sMessageToastMsg!==oThis.getText("MESSAGE_CENTER.WARNING")){

										sMessageToastMsg = oThis.getText("MESSAGE_CENTER.INFO");
									}

									oControl.setValueState(sap.ui.core.ValueState.None);
								}
								}
								oControl.setValueStateText(value.MESSAGETEXT);

								oControl.attachLiveChange(function(evt) {
									oControl.setValueState(sap.ui.core.ValueState.None);
								});
								oControl.focus(true);
								jQuery.sap.delayedCall(200, this, function() {
									oControl.focus(true);
								});
							}
							//handle form scenario table header color background
							if(!oControl){
								//find the table name to which the field belongs and also which column index
								var oHeaderDetails = {};
								if(oThis.aTableGroups && oThis.aTableGroups[sFormID])
									oHeaderDetails = oThis.aTableGroups[sFormID];
								var columnIndx = null;
								var sTabName = null;
								var sFieldName = value.FIELDNAME;
								for(var sTableName in oHeaderDetails){
									var indx = $.inArray(sFieldName,oHeaderDetails[sTableName].fields);
									if(indx>-1){
										columnIndx = indx;
										sTabName = sTableName;
										break;
									}
								}
								if(sTabName && !isNaN(columnIndx)){
									if(oThis[sFormID+"_"+sTabName+"_table"]){
										if(value.MESSAGETYPE ==="E")
											oThis[sFormID+"_"+sTabName+"_table"].getColumns()[columnIndx].getHeader().addStyleClass("highlightTableColumnError");
										if(value.MESSAGETYPE ==="W")
											oThis[sFormID+"_"+sTabName+"_table"].getColumns()[columnIndx].getHeader().addStyleClass("highlightTableColumnWarning");
									}
								}
							}
						}
						else{
							oThis.bErrorListItemSelected = false;
						}
					});
				}
				items.push(col);

			});

			if(items.length>0){
				this.popover = new sap.m.Popover({
					placement:sap.m.PlacementType.Top,
					title:this.getText("FORMS.ERROR_MESSAGES"),
					icon:"sap-icon://message-error",
					contentWidth:"400px",
				});

				this.popover.addContent(new sap.m.List({items:[items]}));

				if(!this.errorCountBtn){
					this.errorCountBtn=  oThis.getView().byId("idFormErrorCount");
					this.errorCountBtn.attachPress(function(){
						oThis.popover.openBy(this);
					});

				}

				this.errorCountBtn.setText(items.length);
				this.errorCountBtn.setVisible(true);

				var bar =this.oIconTabBar;
				this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,sMessageToastMsgFinal);
			}
			else{
				if(isValidate){
					this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, this.getText("FORMS.ERROR_CHECK_SUCCESS"));
				}
			}
		} else{
			if(isValidate){
				this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, this.getText("FORMS.ERROR_CHECK_SUCCESS"));
			}
			if(this.errorCountBtn)
				this.errorCountBtn.setVisible(false);
		} //idFormErrorCount

		return sMessageToastMsgFinal;
	},
	onAddFormPress:function(evt){

		var filter=this.getSelectedFilter();
		//change the form no
		var count =  filter.data().FormsListCount + 1;
		var sFormNo =  count.toString();
		filter.data("CurrentFormNo",sFormNo);
		//filterdata
		//var oIconTabFilterData = filter.data()[filter.getKey()];
		var oIconTabFilterData = this.oFinalIconTabBarFiltersData[filter.getKey()];

		this._addLocalFormListItem(oIconTabFilterData,sFormNo);
		this._addLocalFormData(filter);
		this.navToFormPage(filter);


	},


	handleSubmitPress : function(){

		if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
			 this["_Z2ICController"].ModifyActividadesZ2ICfromTable();
		};
	      var that = this;
	      
	      if (this.oCurrentFormBundle.FormBundleTypeID == "ZIEP" || this.oCurrentFormBundle.FormBundleTypeID == "ZEPR"  || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP" || this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
	    	  
	          if(this.checkBeforeSubmit)
	              this.getDataProvider().validateFormData(this,this.validateRuleID,true,jQuery.proxy(this.onFormBundleRulesCallSuccess, this),this.checkBeforeSubmit);
	          else{
	            this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,this.bNoFormDataOnSubmit);
	            }
	          
	      }else{ // Para plusvalia se guarda borrador antes de enviar..
	      this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT, this.bNoFormDataOnSaveDraft,false,function(){
	    	  that.GrabarForm(that);  // Se envia la funcion para que sea llamada al momento de responder el servicio de guardado
	      });    
	      }
	     // setTimeout(this.GrabarForm, 2500, this);

	}
	,	   
	GrabarForm : function(that){
		if(that.checkBeforeSubmit)
	that.getDataProvider().validateFormData(that,that.validateRuleID,true,jQuery.proxy(that.onFormBundleRulesCallSuccess, that),that.checkBeforeSubmit);
		else{
	        that.getDataProvider().processForm(that,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,that.bNoFormDataOnSubmit);
	        } 
	},
	enviar : function(that){
		if(this.checkBeforeSubmit){
			this.getDataProvider().validateFormData(this,this.validateRuleID,true,jQuery.proxy(this.onFormBundleRulesCallSuccess, this),this.checkBeforeSubmit);
		}
		else{
			this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,this.bNoFormDataOnSubmit);
		}
	},          

	handleSavePress : function(){
		// Para formulario de ICA se guardan los datos de tabla Actividades en Z2ICModel
		
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
			 this["_Z2ICController"].ModifyActividadesZ2ICfromTable();
		};
		
		if (this.oCurrentFormBundle.FormBundleTypeID == "ZIEP" || this.oCurrentFormBundle.FormBundleTypeID == "ZCOP" ||  this.oCurrentFormBundle.FormBundleTypeID == "ZEPR" ||  this.oCurrentFormBundle.FormBundleTypeID == "ZICA" ){
			var controller = "_" + this.aIconTabBarFilterSequence[0] +"Controller";
			var a = this[controller].VerificarGuardarBorrador();
			if (a !== "X")
				this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT, this.bNoFormDataOnSaveDraft,false);
			else{
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.error(
						sap.ui.getCore().getModel("i18n").getProperty("FORMS.MENSAJE1") ,
						{
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);	
			}
		}else{
			this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT, this.bNoFormDataOnSaveDraft,false);
		}
		
		
	}, soloGrabar:  function(){
	    //processForm based on status - save draft/submit

		this.getDataProvider().processForm(this,sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT, this.bNoFormDataOnSaveDraft);
		this.getView().getModel("Presave").setProperty("/STATUS",1);
		
	},    
	openDialog: function (text,FormBundleID,StatusID) {
		this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, text);
		if(FormBundleID){
			this.onFormSaved(FormBundleID,StatusID);
			
		}
	},

	onStraightThroughProcess: function () {
		console.log("onStraightThroughProcess")
		this.getRouter().myNavTo("invoiceListForm", {}, false);
		paymentflag = "";
		payBillFlag = "X";


	},

	handlePayBillInvoicePress: function () {

//		this.getRouter().myNavTo("invoiceListForm", {}, false);
		this.getDataProvider().checkInvoices(this, true);

	},

	onStraightThroughNotSelected: function() {

		var iconSTP = this.getView().byId("idIconStraightThroughProcess");
		console.log("onStraightThroughNotSelected")
		iconSTP.setVisible(false); // se Modifica ACASTANEDA 
		this.getView().byId("idFormPayBillInvoice").setVisible(false);

	},

	onStriaghtThroughProcessValidation: function() {

		this.getDataProvider().checkInvoices(this, true);

	},

	onPaymentCompleted: function() {

		paymentflag = "X";

	},

	formSTPButtonDetermine: function() {

		payBillFlag = "X";

		this.getView().byId("idFormPayBillInvoice").setVisible(false);  // ACASTANEDA Se modifica visibilidad por false

	},

	formSTPButtonDetermineText: function() {

		paymentflag = "X";

		this.getView().byId("idFormPayBillInvoice").setVisible(false);// ACASTANEDA Se modifica visibilidad por false
		this.getView().byId("idFormPayBillInvoice").setText(sap.ui.getCore().getModel("i18n").getProperty("INVOICE.DETAILS"));

	},


	invoiceDialogOpen: function(FormbundleID) {


		var formmessage = sap.ui.getCore().getModel("i18n").getProperty("FILING_OBLIGATIONS.FORM_LIST");
		var processedmessage = sap.ui.getCore().getModel("i18n").getProperty("FORM.PROCESSED");
		var dialogmsg = formmessage + ": " +FormbundleID +" " +processedmessage;

		sap.m.MessageToast.show(dialogmsg, {
			duration: 4000
		});

	},



	handleIconStraightThroughProcess: function(oEvent) {

		/*     	var oMessageTemplate = new sap.m.MessagePopoverItem({
        type: '{type}',
        title: '{title}',
        description: '{description}',
        counter: '{counter}'
      });

      var oMessagePopover = new sap.m.MessagePopover({
        items: {
          path: '/',
          contentWidth:'400px',
          template: oMessageTemplate
        }
      });

      var aMockMessages = [{
      type: 'Information',
      title: 'Return not assessed immediately',
      description: messageSTP,
      counter: 1
    }];

      var oModel = new sap.ui.model.json.JSONModel();
    oModel.setData(aMockMessages);
    oMessagePopover.setModel(oModel);
    oMessagePopover.openBy(oEvent.getSource());*/

		/*  sap.m.MessageToast.show(messageSTP, {
    duration: 4000,
    width: "20em"
  });*/
		/*        var oMessagePopoverItem = new sap.m.MessagePopoverItem({
          type: 'Information',
      title: messageSTPTitle,
      description: messageSTP,
      subtitle: 'Invoice assessment',
      counter: 1
        });

        var oMessagePopover = new sap.m.MessagePopover({
              items:[oMessagePopoverItem]
          });*/

		var messageSTP = sap.ui.getCore().getModel("i18n").getProperty("STRAIGHT_THROUGH_PROCESS");

		var popover = new sap.m.Popover({
			placement:sap.m.PlacementType.Top,
			title:this.getText("FORMS.ERROR_MESSAGES"),
			icon:"sap-icon://message-information",
			contentWidth:"400px",
		});

		var oIcon = new sap.ui.core.Icon({
			src: sap.ui.core.IconPool.getIconURI("message-information"),
			color: sap.ui.core.IconColor.Default,
		}).addStyleClass("sapFmcaInfoIcon");


		var STPitem = new sap.m.CustomListItem({
			content:[new sap.m.HBox({
				items:[oIcon, new sap.m.Text({text:messageSTP, width:"290px"})], width:"300px",alignItems:"Center"})]
		});

		popover.addContent(new sap.m.List({items:[STPitem]}));

		popover.openBy(oEvent.getSource());
	},

	//have to handle this diff for successs n failure
	onFormSaved: function(FormBundleID,StatusID){
		if(this.amendFormBundleID){  this.amendFormBundleID = "";
		if(this.oAmendButton)
			this.oAmendButton.setVisible(false);
		}
		//for amend original
		if(this.amendOriginal){
			this.amendOriginal = false;
			if(this.oEditButton){
				this.oEditButton.setVisible(false);
			}

		}
		this.oCurrentFormBundle.FormBundleID=FormBundleID;
		this.setFormTitle();
		this.oCurrentFormBundle.StatusID=StatusID;
		this._enableFormFields();
		this._enablePaymentTab();

		var oIconTabFilterControl = this.getSelectedFilter();
		//to set default valuestate on save draft/submit
		if(oIconTabFilterControl && this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()]["bFormBundleType"]){
			var sKey = oIconTabFilterControl.getKey();
			this.setDefaultValueState(sKey);

			if(this.getView().getModel(sKey+"Model"))
			{
				this.getView().getModel(sKey+"Model").refresh();
			}
		}
		if(this.oCurrentFormBundle.StatusID &&
				(this.oCurrentFormBundle.StatusID.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT.toLowerCase())
		)
		{ this.oView.byId("idFormErrorCount").setVisible(false); }

		//handle button on submit
		if(this.oCurrentFormBundle.StatusID &&
				(this.oCurrentFormBundle.StatusID.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
		)
		{
			this._hideAllButtons();
			if(oIconTabFilterControl && this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()]["bFormBundleType"]){
				var sMaxIns = parseInt(this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()].MaximumInstances);
				if(sMaxIns > 1 && oIconTabFilterControl.data().FormsListCount && oIconTabFilterControl.data().FormsListCount>1){
					this.oView.byId("idFormBackToList").setVisible(true);
				}}
			this._setVisibleAmendButton();

			///handle table header buttons
			if(oIconTabFilterControl && this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()]["bTableForm"]){
				var sController = "_"+oIconTabFilterControl.getKey()+"Controller";
				this[sController].setTableFormButtonsEnabled(this.oCurrentFormBundle.StatusID);
				this[sController].setTableFormMode(this.oCurrentFormBundle.StatusID);
			}
		}
		///handle table header buttons
		if(oIconTabFilterControl && this.oFinalIconTabBarFiltersData[oIconTabFilterControl.getKey()]["bTableForm"]){
			var sController = "_"+oIconTabFilterControl.getKey()+"Controller";
			this[sController].setDefaultTableState();
		}

	},
	onSubmitFailure:function(MessageData){
		var sMessageToastMsg = "";
		var items=[];
		var oThis = this;
		if(this.getSelectedFilter().getKey()==="submit")
		{ var messageData=JSON.parse(MessageData);
		if(messageData.length){
			sMessageToastMsg =  this._populateErrorButtonList(MessageData,true); // Se agrega linea para que muestre mensajes de error en pestaNa Submitt (ACASTANEDA)
			$.each(messageData, function( index, value ) {
				var col = oThis._getColumnListItem(value);
				if(value.FIELDNAME){
					col.attachPress(function(){
						oThis.bErrorListItemSelected = true;
						var sFormNo = value.FORMNO;
						sFormNo = parseInt(sFormNo);
						sFormNo = sFormNo.toString();
						var sFormID = value.FORMID;
						var oIconTabFilter = oThis.getFilterByKey(sFormID);
						var oIconTabFilterData =  oThis.oFinalIconTabBarFiltersData[sFormID];
						if(oIconTabFilterData.bFormBundleType){
							oIconTabFilter.data("CurrentFormNo",sFormNo);
							oThis.oIconTabBar.setSelectedKey(sFormID);
							oThis.oIconTabBar.fireSelect();

							var oControl = oThis._getFormControlFromFieldName(value.FIELDNAME,value.FORMID);
							if (oControl && typeof(oControl.setValueState)==="function"){
								switch(value.MESSAGETYPE) {
								case "E":{
									sMessageToastMsg = sap.ui.core.ValueState.Error;
									oControl.setValueState(sap.ui.core.ValueState.Error);
									break;
								}
								case "W":{
									if(sMessageToastMsg!==sap.ui.core.ValueState.Error){

										sMessageToastMsg = oThis.getText("MESSAGE_CENTER.WARNING");
									}
									oControl.setValueState(sap.ui.core.ValueState.Warning);
									break;
								}
								default:{
									if(sMessageToastMsg!==sap.ui.core.ValueState.Error && sMessageToastMsg!==oThis.getText("MESSAGE_CENTER.WARNING")){

										sMessageToastMsg = oThis.getText("MESSAGE_CENTER.INFO");
									}
									oControl.setValueState(sap.ui.core.ValueState.None);
								}
								}
								oControl.setValueStateText(value.MESSAGETEXT);
								oControl.attachLiveChange(function(evt) {
									oControl.setValueState(sap.ui.core.ValueState.None);
								});
								oControl.focus(true);

								jQuery.sap.delayedCall(200, this, function() {
									oControl.focus(true);
								});
							}
							//if control does not exist
							//handle form scenario table header color background
							if(!oControl){
								//find the table name to which the field belongs and also which column index
								var oHeaderDetails = {};
								if(oThis.aTableGroups && oThis.aTableGroups[sFormID])
									oHeaderDetails = oThis.aTableGroups[sFormID];
								var columnIndx = null;
								var sTabName = null;
								var sFieldName = value.FIELDNAME;
								for(var sTableName in oHeaderDetails){
									var indx = $.inArray(sFieldName,oHeaderDetails[sTableName].fields);
									if(indx>-1){
										columnIndx = indx;
										sTabName = sTableName;
										break;
									}
								}
								if(sTabName && !isNaN(columnIndx)){
									if(oThis[sFormID+"_"+sTabName+"_table"]){
										if(value.MESSAGETYPE ==="E")
											oThis[sFormID+"_"+sTabName+"_table"].getColumns()[columnIndx].getHeader().addStyleClass("highlightTableColumnError");
										if(value.MESSAGETYPE ==="W")
											oThis[sFormID+"_"+sTabName+"_table"].getColumns()[columnIndx].getHeader().addStyleClass("highlightTableColumnWarning");
									}
								}
							}
						}

					});
					switch(value.MESSAGETYPE) {
					case "E":{
						sMessageToastMsg = sap.ui.core.ValueState.Error;

						break;
					}
					case "W":{
						if(sMessageToastMsg!==sap.ui.core.ValueState.Error){

							sMessageToastMsg = oThis.getText("MESSAGE_CENTER.WARNING");
						}
						break;
					}
					default:{
						if(sMessageToastMsg!==sap.ui.core.ValueState.Error && sMessageToastMsg!==oThis.getText("MESSAGE_CENTER.WARNING")){

							sMessageToastMsg = oThis.getText("MESSAGE_CENTER.INFO");
						}
					}
					}
				}
				items.push(col);
			});
			this.oCurrentFormBundle.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT;
			this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,sMessageToastMsg);
		}
		}
		else{
			sMessageToastMsg =  this._populateErrorButtonList(MessageData,true);
		}
		if(sMessageToastMsg===oThis.getText("MESSAGE_CENTER.WARNING") ||sMessageToastMsg===this.getText("MESSAGE_CENTER.INFO"))
		{
			this.alertContinueSubmission(items);
		}
		else if(sMessageToastMsg===sap.ui.core.ValueState.Error && this.getSelectedFilter().getKey()==="submit" && items.length){
			var oIconTabBarFilterSubmit = oThis.getFilterByKey("submit");
			oIconTabBarFilterSubmit.removeAllContent();
			oIconTabBarFilterSubmit.addContent(new sap.m.List({
				headerText:oThis.getText("FORMS.ERROR_MESSAGES"),
				items:[items]
			}).addStyleClass("sapFmcaErrorMessages"));
		}
	},
	alertContinueSubmission:function(items){

		var oThis = this;
		var okBtn =new sap.m.Button({
			text:oThis.getText("APP.OK"),
			press:function(evt){
				//the below call was made synchronous true for update/create bcos
				//after processing the form(create/update) if the creation is asynchronous
				//the fnsuccess of process form (craete/update) will not not run first but the code immediately below
				//the below code  oThis.getDataProvider().processForm(oThis,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,oThis.bNoFormDataOnSubmit,true);
				//ie,if(oThis.oIconTabBar.getSelectedKey()=="submit"){
				//oThis.oIconTabBar.setSelectedKey("submit");
				//oThis.oIconTabBar.fireSelect();}
				// oThis.alertDialog.close();
				//will trigger and till den the ocurrentformbundle.statusID wud not have been
				//changed to submit, so the expected changes in fireselect for status submit
				//will not reflect
				oThis.alertDialog.close();
				oThis.verificarDiferencias();
				
				//oThis.getDataProvider().processForm(oThis,sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT,oThis.bNoFormDataOnSubmit);
				if(oThis.oIconTabBar.getSelectedKey()=="submit"){
					oThis.oIconTabBar.setSelectedKey("submit");
					oThis.oIconTabBar.fireSelect();}

			}
		});
		var cancelBtn = new sap.m.Button({
			text:oThis.getText("FILING_OBLIGATIONS.CANCEL"),
			press:function(){
				oThis.alertDialog.close();
				if(oThis.oIconTabBar.getSelectedKey()=="submit",items.length){
					var oIconTabBarFilterSubmit = oThis.getFilterByKey("submit");
					oIconTabBarFilterSubmit.removeAllContent();
					oIconTabBarFilterSubmit.addContent(new sap.m.List({
						headerText:oThis.getText("FORMS.ERROR_MESSAGES"),
						items:[items]
					}).addStyleClass("sapFmcaErrorMessages"));
				}
			}
		});
		this.alertDialog = new sap.m.Dialog({
			title:this.getText("MESSAGE_CENTER.ALERT"),
			content:[new sap.m.Text({text:oThis.getText("FORMS.WARNING_ON_SUBMIT")})],
			buttons:[okBtn,cancelBtn]
		});
		this.alertDialog.open();
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
		return new sap.m.CustomListItem({
			content:[new sap.m.HBox({
				items:[oIcon, new sap.m.Text({text:value.MESSAGETEXT, width:"290px"})], width:"300px",alignItems:"Center"})],
				type:"Navigation",
				press:function(){
				}
		});
	},

	//Get the control from the view depending on id
	_getFormControlFromFieldName:function(sFieldName,sFormID){
		if(sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_date"))
			return sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_date");

		else if(sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_input"))
			return sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_input");


		else if(sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_combobox"))
			return sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_combobox");


		else if(sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_checkbox"))
			return sap.ui.getCore().getElementById("_"+sFormID+"_"+sFieldName+"_checkbox");
	},
	onDialogCloseBtn: function (oEvent) {
		if(this.msgFragment.isOpen()){
			this.msgFragment.destroyContent();
			this.msgFragment.close();
		}

	},
	prePopulateFields: function(){
		this.getDataProvider().prePopulateFields(this,this.prePopulateRuleID,this.isPrepopulate,jQuery.proxy(this.onFormBundleRulesCallSuccess, this));
	},

	isDirty:function(){

		if(!($.isEmptyObject(this.oAllFormsData))){
			for(var formID in this.oAllFormsData){
				var oForms = this.oAllFormsData[formID];
				if(!($.isEmptyObject(oForms))){
					for(var formNo in oForms){
						var oFormIstance = oForms[formNo];
						if(!($.isEmptyObject(oFormIstance))){
							if(oFormIstance.bEdited === true){
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	},
	/* **********payment code starts**********/
	_populatePayments: function(){
		this.getSelectedFilter().removeAllContent();
		var oThis = this;

		if(this.oCurrentFormBundle.FormBundleID) {
			this.oView.byId("idFormPayBill").setVisible(true);
			//dont put check on the controller always run the below code
			//do this so that the current instance of suet form is set as view
			this.oPaymentsController = sap.umc.mobile.forms.view.forms.PaymentsController;
			this.oPaymentsController.setView(this.getView());
			//always do check on fragment else multiple fragments will create n for all the fragments creted each time
			//multiple errors n multiple payments will happen
			if (!this._paymentsFragment) {
				this._paymentsFragment = sap.ui.xmlfragment("sap.umc.mobile.forms.view.forms.Payments", this.oPaymentsController);
				this._handlePayButton();
			}
			this.oDeferredFormData = jQuery.Deferred();
			this.oDefferedBankAcountCard = jQuery.Deferred();
			this.oDefferedExistingAccountModelSet =  jQuery.Deferred();
			this.oDeferredPaymentHistoryLoaded = jQuery.Deferred();
			this.oDeferredFlagToLoadBankCard=  jQuery.Deferred();
			//handling service call and populating for pay bills
			var sTableForm = "";
			var data = {};
			data.FormBundleID = "'"+this.oCurrentFormBundle.FormBundleID+"'";
			data.FormID="'"+this.sFormIDForPayAmount+"'";
			data.CurrentFormNo = "'"+this.sFormNoForPayAmount+"'";
			data.TableForm = "'"+sTableForm+"'";
			//to get data as is in submit tab we reuse submit tabs handling function _readFormOnSubmitTab which calls the service and the
			//will fetch the tax to be paid field from the service response
			if(this.oAllFormsData[this.sFormIDForPayAmount] &&
					this.oAllFormsData[this.sFormIDForPayAmount][this.sFormNoForPayAmount] &&
					this.oAllFormsData[this.sFormIDForPayAmount][this.sFormNoForPayAmount]["FormData"]){
				this.populateSubmitTabFilter(this.oAllFormsData[this.sFormIDForPayAmount][this.sFormNoForPayAmount]["FormData"],true);
			}
			else if(this.oCurrentFormBundle.FormBundleID){
				this.getDataProvider().readFormOnSubmitTab(this,data,true,jQuery.proxy(this.populateSubmitTabFilter, this));
			}
			if(!this.oPaymentsController){
				this.oPaymentsController = sap.umc.mobile.forms.view.forms.PaymentsController;
			}
			jQuery.when(this.oDeferredFormData,this.oDeferredPaymentHistoryLoaded).then(function(oParameter){
				oThis.requireBankCardLoad(oParameter);
			});
			jQuery.when(this.oDeferredFlagToLoadBankCard).then(function(oParameter){
				oThis.oPaymentsController.read();
			});

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
			this.getDataProvider().loadPaymentHistory(this,this.oCurrentFormBundle.FormBundleID);
		}
	},
	//on payment method loaded sucessfully, load Payment history
	onPaymentMethodsLoaded:function(oExistingAccounts, sPaymentID){
		this.getView().setModel(oExistingAccounts, "existingAccounts");
		if(sPaymentID){
			this.getView().getModel("existingAccounts").setProperty("/selectedKey", sPaymentID);
		}
		//when the model and changes are done to model existingAccounts set deffered to resolved
		this.oDefferedExistingAccountModelSet.resolve();
	},
	//on success of payment history load, is length of processed and in process model exists then add the payment history fragment
	_addPayementHistoryFragment: function(){
		var oThis = this;
		var oIconTabFilter = this.getSelectedFilter();
		if( oThis.getView().getModel("existingAccounts").getProperty("/amount")>0){
			oIconTabFilter.addContent(oThis._paymentsFragment);}
		else{
			var oNoPaymentHBox = new sap.m.VBox();
			var sHead = new sap.m.Label({text:"{i18n>INVOICE.PAYMENTDETAILS}"}).addStyleClass("sapUmcSubsectionHeading  ")
			.addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
			var oMsgHBox = new sap.m.VBox();
			var sMsg = new sap.m.Label({text:"{i18n>FORMS.NO_LIABILITIES}"}).addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
			oMsgHBox.addItem(sMsg);

			oNoPaymentHBox.addItem(sHead).addItem(oMsgHBox);
			oIconTabFilter.addContent(oNoPaymentHBox);
		}
		if (oThis.oCurrentFormBundle.FormBundleID){
			if (oThis.getView().getModel("PaymentHistoryVisible").getProperty(
			"/InProcess")
			|| oThis.getView().getModel("PaymentHistoryVisible")
			.getProperty("/Processed")) {
				oIconTabFilter.addContent(oThis._paymentsHistoryFragment);
			}
		}
		this.oFormBusyDialog.close();
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
		},function(){});
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

		oParameters.Currency  =   this._getCurrency();
		oParameters.PaymentID = "-3";
		oParameters.EnablePaymentAmount = true;
		if(bPaymentTab)
			this.oDeferredFormData.resolve(oParameters);
	},
	_hidecvcOnload: function() {
		var aControls = this._paymentsFragment.findAggregatedObjects();
		var oCvcLabel = aControls[5];
		var oCvcInput = aControls[6];
		oCvcLabel.setVisible(false);
		oCvcInput.setVisible(false);
	},
	_handlePayButton: function() {
		this.getPayButton().attachPress(null, this.oPaymentsController.onSubmitOneTimePayment, this.oPaymentsController);
	},
	getPayButton: function() {
		return this.getView().byId("idFormPayBill");
	},
	/*to set and get currency in the variable this.currency*/
	_getCurrency: function() {
		return this.currency;
	},
	//on sucess of pay bill
	onPaymentSuccess:function(){
		//call services and set data again on payment success
		var oIconTabFilter = this.getSelectedFilter();
		oIconTabFilter.removeAllContent();
		oThis= this;
		setTimeout(function(){
			oThis._populatePayments();
		},0);
	},
	requireBankCardLoad:function(oParameter){
		oThis = this;

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

		if(sUpdatedAmount>0){

			this.oDeferredFlagToLoadBankCard.resolve();
		}else
		{
			oThis.getView().byId("idFormPayBill").setVisible(false);
			this.oDeferredFlagToLoadBankCard.reject();

			var oIconTabFilter = oThis.getSelectedFilter();
			var oNoPaymentHBox = new sap.m.VBox();
			var sHead = new sap.m.Label({text:"{i18n>INVOICE.PAYMENTDETAILS}"}).addStyleClass("sapUmcSubsectionHeading  ")
			.addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");

			var oMsgHBox = new sap.m.VBox();
			var sMsg = new sap.m.Label({text:"{i18n>FORMS.NO_LIABILITIES}"}).addStyleClass("sapUmcVerticalAfterSpacingX1").addStyleClass("sapUmcVerticalBeforeSpacingX2");
			oMsgHBox.addItem(sMsg);

			oNoPaymentHBox.addItem(sHead).addItem(oMsgHBox);
			oIconTabFilter.addContent(oNoPaymentHBox);
			/* ******payment history to be added*/
			if (this.oCurrentFormBundle.FormBundleID){
				if (this.getView().getModel("PaymentHistoryVisible").getProperty(
				"/InProcess")
				|| this.getView().getModel("PaymentHistoryVisible")
				.getProperty("/Processed")) {
					oIconTabFilter.addContent(this._paymentsHistoryFragment);
				}
			}
			this.oFormBusyDialog.close();
		}
	},
	/***********payment code ends** ********/

	/*******form in standard form creation and functionality************/
	onAddRowFormScenarioTable:function(oTable, fila){
		//add columnlistitem
		var tempColumnListItem = this.createColumnListItem();
		for(var j=0;j<oTable.getColumns().length;j++){
			var a = this.createCell("",this.oCurrentFormBundle.FormBundleTypeID,j,fila,oTable.getItems().length) // ACASTANEDA
			tempColumnListItem.addCell(a);
		}
		oTable.addItem(tempColumnListItem);
		//add data in oAllFormsData
		var sKey = this.getSelectedFilter().getKey();
		var sCurrFormNo = this.getSelectedFilter().data().CurrentFormNo;
		var sTableId = oTable.getId();
		var arr = sTableId.split("_");
		arr.shift();
		arr.pop();
		var sTableName = arr.join("_");
		if(!(this.oAllFormsData[sKey]))
			this.oAllFormsData[sKey]={};
		if(!(this.oAllFormsData[sKey][sCurrFormNo]))
			this.oAllFormsData[sKey][sCurrFormNo]={};
		if(!(this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"]))
			this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"]={};

		var arr = [];
		var len = this.aTableGroups[sKey][sTableName].fields.length;
		for(var i = 0;i<len;i++){
			arr.push("");
		}

		if(this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName]
		&& this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName].length){


			this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName].push(arr);
		}
		else{
			this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName] = [];
			this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName].push(arr);
		}
		//change bEdited to true
		if(this.oAllFormsData[sKey] && this.oAllFormsData[sKey][sCurrFormNo])
			this.oAllFormsData[sKey][sCurrFormNo]["bEdited"]=true;
	} ,
	createFormScenarioTablePanel:function(sPanelHeading){
		var oToolBar = new sap.m.Toolbar();
		
		if(this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"){
			oToolBar.addContent(new sap.m.Title({text:"{i18n>ZIEP.TABLENAME}"}));
			}
			else if(this.oCurrentFormBundle.FormBundleTypeID == "ZICA"){
				oToolBar.addContent(new sap.m.Title({text:"{i18n>Z2IC.TABLENAME}"}));	
			} 
		else{
			oToolBar.addContent(new sap.m.Title({text:sPanelHeading}));
		}
		oToolBar.addContent(new sap.m.ToolbarSpacer());

		
		//Boton UPLOAD Para formulario espectaculos publicos. acastaneda
		if(this.oCurrentFormBundle.FormBundleTypeID == "ZIEP"){
			var oUploadButton = new sap.m.Button(
					{text:"{i18n>DOCUMENTS.UPLOAD}",
						icon : "sap-icon://upload",
						visible:"{EnabledModel>/Enabled}",
						press :[ function(evt)
							{
						//	var sPanelId =  evt.getSource().data().parentPanelId;
						//	var oPanel = sap.ui.getCore().byId(sPanelId);
						//	var oTable = oPanel.getContent()[0];
						//	if(oTable){
								this.handleUploadPress(evt);
						//	}
							},this]

					});
			oToolBar.addContent(oUploadButton);
			
		}
		
		
		var oAddButton = new sap.m.Button(
				{text:"{i18n>USER_PROFILE.ADD}",
					icon : "sap-icon://add",
					visible:"{EnabledModel>/Enabled}",
					press :[ function(evt)
						{
						var sPanelId =  evt.getSource().data().parentPanelId;
						var oPanel = sap.ui.getCore().byId(sPanelId);
						var oTable = oPanel.getContent()[0];
						if(oTable){
							this.onAddRowFormScenarioTable(oTable);
						}
						},this]

				});
		oToolBar.addContent(oAddButton);
		var oDeleteButton = new sap.m.Button(
				{ text:"{i18n>USER_PROFILE.DELETE}",
					icon : "sap-icon://delete",
					visible:"{EnabledModel>/Enabled}",
					press : [ function(evt)
						{
						var sPanelId =  evt.getSource().data().parentPanelId;
						var oPanel = sap.ui.getCore().byId(sPanelId);
						var oTable = oPanel.getContent()[0];
						if(oTable){
							var oSelectedItems = oTable.getSelectedItems();
							
							if (oSelectedItems[0].mAggregations.cells[0].mProperties.value == "ACTIVIDAD 1 (PRINCIPAL)") // Para ICA , no se permite eliminar la primera columna
							{
								this.mostrarPopUp(sap.ui.getCore().getModel("i18n").getProperty("FORMS.NODELETEACT1") )
							}	
							else{
							var sKey = this.getSelectedFilter().getKey();
							var sCurrFormNo = this.getSelectedFilter().data().CurrentFormNo;
							var sTableId = oTable.getId();
							var arr = sTableId.split("_");
							arr.shift();
							arr.pop();
							var sTableName = arr.join("_");
							for(var i=0;i<oSelectedItems.length;i++){
								//remove row from table
								//remove data from oAllFormsData array
								var aTableItems = oTable.getItems();
								var rowIndx = $.inArray(oSelectedItems[i],aTableItems);
								this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName].splice(rowIndx,1);
								oTable.removeItem(oSelectedItems[i]);
							}
							//change bEdited to true
							if(this.oAllFormsData[sKey] && this.oAllFormsData[sKey][sCurrFormNo])
								this.oAllFormsData[sKey][sCurrFormNo]["bEdited"]=true;
						}
						}
						},this]
				});
		oToolBar.addContent(oDeleteButton);
		
		var oPanel = new sap.m.Panel({
			expandable:true ,expanded:true, width:"auto" ,
			headerToolbar:[oToolBar],
			expand:[function(evt){
				var oPanel = evt.getSource();
				var aPanelHeaderToolbarContent= oPanel.getHeaderToolbar().getContent();
				for(var i = 0;i<aPanelHeaderToolbarContent.length;i++){
					if(aPanelHeaderToolbarContent[i] && sap.m.Button.prototype.isPrototypeOf(aPanelHeaderToolbarContent[i])){
						aPanelHeaderToolbarContent[i].setEnabled(oPanel.getExpanded());
					}
				}
			},this]
		}).addStyleClass("sapUiSmallMarginTop");
		oAddButton.data({parentPanelId:oPanel.getId()});
		oDeleteButton.data({parentPanelId:oPanel.getId()});
		if(oPanel.getExpanded()){
			oDeleteButton.setEnabled(true);
			oAddButton.setEnabled(true);
		}
		else{oDeleteButton.setEnabled(false);
		oAddButton.setEnabled(false);
		}
		return oPanel;
	},
	// To Create Dynamically Columns
	createColumn : function(strColumnHeader){
		var objColumn = new sap.m.Column({header : new sap.m.Text({text : strColumnHeader})});
		return objColumn;
	},
	// To Create Dynamically Column List Item
	createColumnListItem : function(/*guid*/){
		var objColumnListItem = new sap.m.ColumnListItem(

				{vAlign:"Middle"}
		);
		return objColumnListItem;
	},
	// To Create Dynamically Cells
	createCell : function(sVal,form,id,fila,NoFilas){
		//var objCell = new sap.m.Text({text: strText});
		var type = "Text";
		if (form == "ZICA"  && id == 1){
			
				if (sVal !== undefined){
					sVal = sVal.replace(/^0+/, '');
				}
				// Crear comboBox para Codigo de Actividad
				var Lositems = new sap.ui.core.Item({path: 'ActividadesICA>/results',sorter: { path: 'text' }})
				var objCell = new sap.m.ComboBox({value: sVal, selectionChange:[function(evt){this.onFormScenarioCellChange(evt);},this],enabled:"{EnabledModel>/Enabled}",items: Lositems,showSecondaryValues:true, filterSecondaryValues:true}) 
				var it = new sap.ui.core.ListItem({key:"{ActividadesICA>CodAct}",  text:"{ActividadesICA>CodAct}", additionalText:"{ActividadesICA>Descrip}"})
				
				objCell.bindItems({ 
		  		path: "ActividadesICA>/results", 
		  		template: it, 
		  		sorter: { path: 'text' },
		  		templateShareable:false
		  		}); 
				return objCell;
		}else if (form == "ZIEP"  && id == 0){
			var enab = "{EnabledModel>/Enabled}"
			var objCell = new sap.m.Input({value: sVal,change:[function(evt){
				this.onFormScenarioCellChange(evt);

			},this],
			enabled:enab,type: type,
			liveChange: [function(oEvent) {
			    var input = oEvent.getSource();
			   input.setValue(input.getValue().toUpperCase());
			   this.onFormScenarioCellChange(oEvent);
			},this] 
			});		
		}else if (form == "ZIEP"  && (id == 1 || id == 2 || id == 3)){
			var enab = "{EnabledModel>/Enabled}"
				var objCell = new sap.m.Input({value: sVal,change:[function(evt){
					this.onFormScenarioCellChange(evt);

				},this],
				enabled:enab,type: type,
				liveChange: [function(oEvent) {
				    var input = oEvent.getSource();
				    var sText = input.getValue();
					if (sText.includes(".") || sText.includes(",")  || sText.includes("-"))
					{
				    alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.PUNTOS"));
				    input.setValue("");
					}else if (isNaN(sText)){
						alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.NUMBER"));
						input.setValue("");
					}
				   this.onFormScenarioCellChange(oEvent);
				},this] 
				});		
			}
		else if (form == "ZICA"  && (id == 2 )){
				var enab = "{EnabledModel>/Enabled}"
					var objCell = new sap.m.Input({value: sVal,change:[function(evt){
						this.onFormScenarioCellChange(evt);

					},this],
					enabled:enab,type: type,
					liveChange: [function(oEvent) {
					    var input = oEvent.getSource();
					    var sText = input.getValue();
						if (sText.includes(".") || sText.includes(",")  || sText.includes("-"))
						{
					    alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.PUNTOS"));
					    input.setValue("");
						}else if (isNaN(sText)){
							alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.NUMBER"));
							input.setValue("");
						}
					   this.onFormScenarioCellChange(oEvent);
					},this] 
					});		
				}
		else {
			if (form == "ZICA"  && ( id == 0 || id == 3 || id == 4 ) ){
				if  (id == 0)
					{
					if (fila == undefined){
						var filas = NoFilas + 1;
						sVal = "ACTIVIDAD " + filas;
					}else if(fila == 0){
						sVal = "ACTIVIDAD 1 (PRINCIPAL)";
					} else {
						fila = fila + 1;
						sVal = "ACTIVIDAD " + fila;
					}
					}
			var enab = false;
			}else if (form == "ZICA"  &&  id == 2){
				type = 'Number';
				var enab = "{EnabledModel>/Enabled}";
				}
			else if (form == "ZIEP"  &&  id == 4){
				type = 'Number';
				var enab = false;
				}
			else {
			var enab = "{EnabledModel>/Enabled}";
			}
			var objCell = new sap.m.Input({value: sVal,change:[function(evt){
				this.onFormScenarioCellChange(evt);

			},this],
			enabled:enab,type: type,
			/*
			liveChange: function(oEvent) {
			    var input = oEvent.getSource();
			    input.setValue(input.getValue().toUpperCase());
			} */
			});			
		}


		return objCell;
	},
	onFormScenarioCellChange:function(evt){
		var sTableId = evt.getSource().getParent().getTable().getId();
		var sKey = this.getSelectedFilter().getKey();
		var sCurrFormNo = this.getSelectedFilter().data().CurrentFormNo;
		var arr = sTableId.split("_");
		var oSrc = evt.getSource();
		var oCurrItem = oSrc.getParent();
		var aCellsOfCurrItems = oCurrItem.getCells();
		if(arr[0]===sKey){
			arr.shift();
			arr.pop();
			var sTableName = arr.join("_");
			var oTable =  evt.getSource().getParent().getTable();
			var aTableItems = oTable.getItems();
			var rowIndx = $.inArray(oCurrItem,aTableItems);
			var colIndx = $.inArray(oSrc,aCellsOfCurrItems);
			if(!(this.oAllFormsData[sKey]))
				this.oAllFormsData[sKey]={};
			if(!(this.oAllFormsData[sKey][sCurrFormNo]))
				this.oAllFormsData[sKey][sCurrFormNo]={};
			if(!(this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"]))
				this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"]={};
			if(this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName]
			&&
			this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName].length){

				var oCurrTableData = this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName];
				oCurrTableData[rowIndx][colIndx] = oSrc.getValue();
			}
			else{
				this.oAllFormsData[sKey][sCurrFormNo]["TableGroups"][sTableName]=[];

			}
		}
		//change bEdited to true as change in cell value
		if(this.oAllFormsData[sKey] && this.oAllFormsData[sKey][sCurrFormNo])
			this.oAllFormsData[sKey][sCurrFormNo]["bEdited"]=true;
	},
	createFormScenarioTable: function(sId,oTableDetails){
		var oTable = new sap.m.Table({ 
			id:sId,
			mode:"MultiSelect" ,
		});
		for(var i=0;i<oTableDetails.header.length;i++){
			oTable.addColumn(this.createColumn(oTableDetails.header[i]));
		}
		return oTable;
	},      saveFormScenarioTableDataLocally:function(sFormID,sFormNo,oData){
		var formDataArr = [];
		if(!($.isEmptyObject(oData))){

			formDataArr = JSON.parse(oData.FormData);}

		if(!(this.oAllFormsData[sFormID]))
			this.oAllFormsData[sFormID]={};
		if(!(this.oAllFormsData[sFormID][sFormNo]))
			this.oAllFormsData[sFormID][sFormNo]={};
		if(!(this.oAllFormsData[sFormID][sFormNo]["TableGroups"]))
			this.oAllFormsData[sFormID][sFormNo]["TableGroups"]={};

		var oFormScenarioTablesDetails = {};
		if(this.aTableGroups && this.aTableGroups[sFormID])
			oFormScenarioTablesDetails = this.aTableGroups[sFormID];
		for(var sTableGroup in oFormScenarioTablesDetails){
			var aTableGroupFields = oFormScenarioTablesDetails[sTableGroup].fields;
			this.oAllFormsData[sFormID][sFormNo]["TableGroups"][sTableGroup]=[];
			for(var i=0;i<formDataArr.length;i++){
				var dataArrForFieldIndex = formDataArr[i].DATA;
				var arr = [];
				for(var j=0;j<dataArrForFieldIndex.length;j++){
					var fieldName = dataArrForFieldIndex[j].FIELDNAME;
					var indx = $.inArray(fieldName,aTableGroupFields);
					if(indx>-1){
						arr[indx] = dataArrForFieldIndex[j].FIELDVALUE;
					}
				}
				if(arr.length){
					for(var k=0;k<aTableGroupFields.length;k++){
						if(!arr[k]){
							arr[k] = "";
						}
					}
					this.oAllFormsData[sFormID][sFormNo]["TableGroups"][sTableGroup].push(arr);
				}

			}

		}
	},
	setTablePanelExpanded:function(oPanel){
		oPanel.setExpanded(true);
	},
	setDefualtFormScenarioTableHeaderState:function(oTable)
	{var aCol = oTable.getColumns();
	for(var i=0;i<aCol.length;i++){
		aCol[i].getHeader().removeStyleClass("highlightTableColumnError");
		aCol[i].getHeader().removeStyleClass("highlightTableColumnWarning");
	}
	},
	createFormScenarioTableRows:function(oIconTabFilterControl){
		var sKey = oIconTabFilterControl.getKey();
		//var oIconTabFilterData = this.oFinalIconTabBarFiltersData[sKey];
		var oFilterData = oIconTabFilterControl.data();
		var sCurrentFormNo= oFilterData.CurrentFormNo;
		var oTableGroupDetails =  {};
		if(this.aTableGroups && this.aTableGroups[sKey])
			oTableGroupDetails = this.aTableGroups[sKey];

		for(var sTableGroup in oTableGroupDetails ){
			var sPanelTableName = sKey+"_"+sTableGroup+"_panel";
			if(this[sPanelTableName]){
				this.setTablePanelExpanded(this[sPanelTableName]);
			}

			var sTableName = sKey+"_"+sTableGroup+"_table";
			if(this[sTableName] /*&& this[sTableName].getItems().length*/){
				//this.setDefualtFormScenarioTableHeaderState(this[sTableName]);
				this[sTableName].removeAllItems();

				var tableData = [];
				if(this.oAllFormsData[sKey] &&
						this.oAllFormsData[sKey][sCurrentFormNo]&&
						this.oAllFormsData[sKey][sCurrentFormNo]["TableGroups"] && this.oAllFormsData[sKey][sCurrentFormNo]["TableGroups"][sTableGroup])
					tableData = this.oAllFormsData[sKey][sCurrentFormNo]["TableGroups"][sTableGroup];
				if(tableData.length){
					for(var i=0;i<tableData.length;i++){
						var tempColumnListItem = this.createColumnListItem();
						for(var j=0;j<oTableGroupDetails[sTableGroup].header.length;j++){
							if(tableData[i][j])
								tempColumnListItem.addCell(this.createCell(tableData[i][j],this.oCurrentFormBundle.FormBundleTypeID,j,i,tableData.length)); // ACASTANEDA
							else
								tempColumnListItem.addCell(this.createCell("",this.oCurrentFormBundle.FormBundleTypeID,j,i,tableData.length)); // ACASTANEDA


						}
						this[sTableName].addItem(tempColumnListItem);
					}

				}
				/*check if the no of rows is < defaults rows in json if less add*/
				var itemLen = this[sTableName].getItems().length;
				var len = oTableGroupDetails[sTableGroup].rows;
				if(itemLen<len){
					for(var i = 0;i<len-itemLen;i++)
						this.onAddRowFormScenarioTable(this[sTableName],i);
				}
			}
		}
	},
	amendFormOriginal:function(){
		this.oCurrentFormBundle.StatusID=sap.umc.mobile.private.app.Constants.FORM_STATUS.DRAFT;
		//trigger filter selection so tha the desired buttons show up
		this.amendOriginal = true;
		var sKey = this.getSelectedFilter().getKey();
		this.oIconTabBar.setSelectedKey(sKey);
		this.oIconTabBar.fireSelect();

		this.getView().byId("idIconStraightThroughProcess").setVisible(false);

		//Comments Need to put same in handleicontabbarselect as well or in getselectedfilter

		this._setFieldsEnable(true);
		if(this.oAmendButton)
			this.oAmendButton.setVisible(false);
		if(this.oEditButton)
			this.oEditButton.setVisible(false);



	},
	handleViewPDFButton:function(){  // Funcion para imprimir PDF 
		console.log("Imprimir PDF");
        window.open(this.getDataProvider().SERVICE.getServiceUrl() + "/Correspondences('" + "FORM" + this.oCurrentFormBundle.FormBundleID + "')/$value", '_parent', 'location=no,toolbar=yes');
	},	
	handleFirmar:function(){  // Funcion para imprimir PDF 
		

		that = this;
		this.showBusyIndicator(0);
		var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
		this.getView().setModel(omodel,"ZODATA_MCF_SRV");  // Van una sola vez en la aplicacion 
		var oModelFirma = new sap.ui.model.json.JSONModel({
			results: []
			});
			this.getView().setModel(oModelFirma, "Firma");
		this.getView().getModel("ZODATA_MCF_SRV").read("/FirmaElectronicaPlaceToPaySet",{
			filters: [new sap.ui.model.Filter({
			      path: "Fbnum",
			      operator: sap.ui.model.FilterOperator.EQ,
			      value1: this.oCurrentFormBundle.FormBundleID
			     }), new sap.ui.model.Filter({
				      path: "Taxpayer",
				      operator: sap.ui.model.FilterOperator.EQ,
				      value1: this.oCurrentFormBundle.AccountID
				     })],
			success:function(odata){
				this.hideBusyIndicator();
				sap.m.URLHelper.redirect("https://www.placetopay.com/web/", false);
		        
			}.bind(this),  
			error:function(odata){
				that.hideBusyIndicator();
				var error = JSON.parse(odata.responseText);
				var textShow = error.error.message.value;
				var dialog = new sap.m.Dialog({
					title: 'Error',
					type: 'Message',
					state: 'Error',
					content: new sap.m.Text({
						text: textShow
					}),
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							dialog.close();
							dialog.destroy();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
			}
		});
		
		
	},
	mostrarPopUp: function(textShow){
		
		var dialog = new sap.m.Dialog({
			title: 'Error',
			type: 'Message',
			state: 'Error',
			content: new sap.m.Text({
				text: textShow
			}),
			beginButton: new sap.m.Button({
				text: 'OK',
				press: function () {
					dialog.close();
					dialog.destroy();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});

		dialog.open();
	},
	
	showBusyIndicator: function (iDelay) {
		if (iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);
		} else {
			sap.ui.core.BusyIndicator.show(0);
		}
	},
	hideBusyIndicator: function () {
		sap.ui.core.BusyIndicator.hide();
	},  // FUNCION PARA CARGAR ARCHIVO CSV EN FORMULARIO ESPECTACULOS PUBLICOS ACASTANEDA 8/7/19
	handleUploadPress: function(oEvent) {
	    var oThis = this;
	    if (!oThis.fileUploader) {
	        oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploader", {
	            width: "400px",
	            tooltip: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.SELECT_FILE"),
	            typeMissmatch: function(oEvent) {
	                oThis.handleTypeMissmatch(oEvent);
	            },
	            fileType: "csv"
	        });
	    }
	    if (!this.uploadDialog) {
	        this.uploadBtn = new sap.m.Button({
	            icon: "sap-icon://upload",
	            text: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.UPLOAD"),
	            press: function() {
	                if (oThis.fileUploader.getValue()) {
	                    oThis.uploadChange();
	                    if (oThis.uploadDialog.isOpen())
	                        oThis.uploadDialog.close();
	                }
	            }
	        });
	        this.dialogCloseBtn = new sap.m.Button({
	            text: sap.umc.mobile.private.app.js.utils.getText("FILING_OBLIGATIONS.CANCEL"),
	            press: function(evt) {
	                if (oThis.uploadDialog && oThis.uploadDialog.isOpen()) {
	                    oThis.uploadDialog.close();
	                }
	            }
	        });
	        
	        this.uploadImage = new sap.m.Image({
	        	src: "app_private/img/csv.jpg",
	        	width: "70%"
	        });
	        
	        this.uploadText = new sap.m.Text({
	        	text: sap.ui.getCore().getModel("i18n").getProperty("ZEPR.UPLOAD1") 
	        });
	        
	        this.uploadText3 = new sap.m.Text({
	        	text: sap.ui.getCore().getModel("i18n").getProperty("ZEPR.UPLOAD2") 
	        });
	        
	        this.uploadDialog = new sap.m.Dialog({
	            title: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.SELECT_FILE"),
	            content: [this.uploadText, this.uploadImage,this.uploadText3,this.fileUploader],
	            buttons: [this.uploadBtn, this.dialogCloseBtn]
	        });
	    }
	    this.uploadDialog.open();
	},
    uploadChange: function(evt) {

        var templength = 0;
           var oThis = this;
           var file = jQuery.sap.domById("fileUploader-fu").files[0];
           if (file) {
               if (window.File && window.FileReader && window.FileList && window.Blob) {
                   var reader = new FileReader();
                   reader.onload = (function(theFile) {
                       return function(e) {

                           var json = oThis.csvJSON(e.target.result);
                         
                           
                        //  var oTable = oThis["ZIEP_DETALLE_table"];
                           
                        var noNum = false
                   		
                   		for(var i=0;i<json.length;i++){
                       		var tempColumnListItem = oThis.createColumnListItem();
                       		var arr = [];
                       		
                       		for(var j=0;j<oThis["ZIEP_DETALLE_table"].getColumns().length;j++){
                       			if (j == "0"){
                           			value = json[i].LOCALIDAD;
                           			value = value.toUpperCase();
                       			}else if (j == "1"){
                       				if ( isNaN(json[i].VALORBOLETA))
                   					{
                   					value = "";
                   					noNum = true;
                   					}else{
                   						value = json[i].VALORBOLETA;
                   					}
                       				
                       			}else if (j == "2"){
                       				if ( isNaN(json[i].NOTOTALBOLETA))
                       					{
                       					value = "";
                       					noNum = true;
                       					}else{
                       				value = json[i].NOTOTALBOLETA;
                       					}
                       			}else if (j == "3"){
                       				if ( isNaN(json[i].NOBOLETACORTESIA))
                   					{
                   					value = "";
                   					noNum = true;
                   					}else{
                   						value = json[i].NOBOLETACORTESIA;
                   					}
                       				
                       			}else if (j == "4"){
                       				if ( isNaN(json[i].TOTAL))
                   					{
                   					value = "";
                   					noNum = true;
                   					}else{
                           				value = json[i].TOTAL ;
                   					}
                       				}
                       			
                       			tempColumnListItem.addCell(oThis.createCell(value));
                       			arr.push(value); 

                       		}		
                       		

                       		oThis["ZIEP_DETALLE_table"].addItem(tempColumnListItem);
                       		
                       		if (oThis.oAllFormsData["ZIEP"]["1"]["TableGroups"]  == undefined || oThis.oAllFormsData["ZIEP"]["1"]["TableGroups"]["DETALLE"] == undefined){
                       			oThis.oAllFormsData["ZIEP"]["1"]["TableGroups"]={};
                       			oThis.oAllFormsData["ZIEP"]["1"]["TableGroups"]["DETALLE"]=[];
                       		}
                       		oThis.oAllFormsData["ZIEP"]["1"]["TableGroups"]["DETALLE"].push(arr);
                   		}
                   		
                   		if (noNum){
                       		sap.umc.mobile.private.app.js.utils.displayMessageDialog("error",sap.ui.getCore().getModel("i18n").getProperty("FORM.MSGCARCESP"));
                       		}
                       			
                       			
                   		
                   		oThis.uploadDialog.close();
                       
                       };
                   })(file);
                   reader.readAsText(file);
               } else {
                   sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.umc.mobile.private.app.Constants.MESSAGE_ERROR);
               }
           }
       }
	,csvJSON:function(csv){
    	   var i;
    	   var j;
    	   var input = csv.replace(/\"\"/g, encodeURIComponent('"'));
    	   var quotesAndValues = input.split(/\"/g);
    	   var escapedInput;
    	   var quotesAndValuesLength = quotesAndValues.length;
    	   for (i = 1; i < quotesAndValuesLength; i = i + 2) {
    	   quotesAndValues[i] = encodeURIComponent(quotesAndValues[i]);
    	   }
    	   escapedInput = quotesAndValues.join("");
    	   var lines = escapedInput.split(/\r\n|\n/g);
    	   var result = [];
    	   var headers = lines[0].split(/,/g);
    	   var headersLength = headers.length;
    	   for (i = 0; i < headersLength; i++) {
    	   headers[i] = headers[i].replace(/\W/g,'_');
    	   }
    	   for (i = 1; i < lines.length; i++) {
    	   var obj = {};
    	   var currentline = lines[i].split(/,/g);
    	   var headersLength = headers.length;
    	   for (j = 0; j < headersLength; j++) {
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
    	   var bFlag = true;
    	   for(var sProp in lastObj ){
    	   if(!lastObj.hasOwnProperty(sProp)){
    	   continue;
    	   }
    	   if(typeof lastObj[sProp] === "function"){
    	   continue;
    	   }
    	   if(lastObj[sProp] === ""){
    	   continue;
    	   }
    	   else{
    	   bFlag = false;
    	   break;
    	   }
    	   }
    	   if(bFlag){
    	   result.pop();
    	   }
    	   else{
    	   break;
    	   }
    	   }
    	   return result;
    	   },    handleTypeMissmatch: function(oEvent) {
    	        var aFileTypes = oEvent.getSource().getFileType();
    	        $.each(aFileTypes, function(key, value) {
    	            aFileTypes[key] = "*." + value;
    	        });
    	        var sSupportedFileTypes = aFileTypes.join(", ");
    	sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,sap.umc.mobile.private.app.js.utils.getFormattedText("FORMS.FILE_NOT_SUPPORTED",[oEvent.getParameter("fileType"),sSupportedFileTypes]));
    	},
       	
});