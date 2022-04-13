sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.home.view.Home",{
	_TILES_MODEL_NAME: "tiles",
	onInit: function() {
		var sThemeId = sap.umc.mobile.base.utils.getCookie("theme");
		if (sThemeId) {
			sap.ui.getCore().applyTheme(sThemeId);
		}
		sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
		this.getDataProvider().loadTiles(jQuery.proxy(this.onTilesLoaded, this));
		this._handleCarousel();
		this._decideMultipleAccounts(); 
		this._handleRouting();
	},
	_handleRouting: function() {
		this.getRouter().attachRouteMatched(function(oEvent) {
			var sNavigationName = oEvent.getParameter("name");
			if (sNavigationName === "home") {
				this._loadHomeData();
			}
		}, this);
	},
	_loadHomeData: function(){
		var fnCallback = jQuery.proxy(this.onHomeDataLoaded, this);
		this.getDataProvider().loadHomeData(fnCallback);
		
	},
	_decideMultipleAccounts: function() {
		if(sap.ui.getCore().getModel("settings").getProperty("/bIsMultipleAccounts") && !(sap.ui.getCore().getModel("settings").getProperty("/bIsAgent"))){
			var oAccounts = this.oApp.getDataProvider().getAccounts();
			this.getView().setModel(new sap.ui.model.json.JSONModel(oAccounts.getData()), "Accounts");
			this._oAccountActionSheet = new sap.ui.xmlfragment("sap.umc.mobile.home.view.AccountSelectActionSheet", this);
			var aAccounts = this.getView().getModel("Accounts").getData();
			for ( var i = 0; i < aAccounts.length; i++) {

				var oButton = new sap.m.Button({
					text: aAccounts[i].FullName,
				})
				var fnExecute = jQuery.proxy(function(oEvent, oAccount){
					var oContextAccount = this.oApp.getDataProvider().getContextAccount()
					if(oContextAccount.getData().AccountID != oAccount.AccountID){
						this.oApp.getDataProvider().changeContextAccount(oAccount.AccountID);	
						this._loadHomeData();
					}
					
				}, this);
				oButton.attachPress(aAccounts[i], fnExecute);
				this._oAccountActionSheet.addButton(oButton);
			}
			
			this.getView().addDependent(this._oAccountActionSheet);
		}		
	},
	onTilesLoaded: function(oTiles) {
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(oTiles);
		this.getView().setModel(oModel, this._TILES_MODEL_NAME);
		this._refreshTiles();
	},
    
	onCriticalAlertCountLoaded: function(iCriticalAlertCount) {
		var oAlertTileData = this._getTileData(this._getTileTitles()._ALERTS);
		oAlertTileData.number = iCriticalAlertCount;
		if (iCriticalAlertCount > 0) {
			oAlertTileData.numberClass = "sapUmcTileNumber sapUmcRedTextColor";
			oAlertTileData.numberUnitClass = "sapUmcTileNumberUnit sapUmcRedTextColor";
			oAlertTileData.iconClass = "sapUmcIconRed";
		} else {
			oAlertTileData.numberClass = "sapUmcTileNumber sapUmcGreyTextColor";
			oAlertTileData.numberUnitClass = "sapUmcTileNumberUnit sapUmcGreyTextColor";
		}

	},
	onContractAccountsLoaded: function(oContractAccounts) {
		var oBillTileData = this._getTileData(this._getTileTitles()._BILLS);
		var dTotalAccountBalance = parseFloat(0);
		//to use currency formatter
		if (oContractAccounts instanceof Array) {
			if (oContractAccounts.length > 0) {
				oBillTileData.numberUnit = oContractAccounts[0].ContractAccountBalance.Currency;
				for ( var i = 0; i < oContractAccounts.length; i++) {
					dTotalAccountBalance += parseFloat(oContractAccounts[i].ContractAccountBalance.CurrentBalance);
				}
			}
		} else {
			oBillTileData.numberUnit = oContractAccounts.ContractAccountBalance.Currency;
			dTotalAccountBalance = parseFloat(oContractAccounts.ContractAccountBalance.CurrentBalance);
		}
		//Get proper number with decimal places according to currency (2 for USD, EUR. 0 for JPY etc), this returns a string without currency attached
		oBillTileData.number = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(dTotalAccountBalance,
				oBillTileData.numberUnit);

		if (dTotalAccountBalance > 0) {
			oBillTileData.numberClass = "sapUmcTileNumber sapUmcRedTextColor";
			oBillTileData.numberUnitClass = "sapUmcTileNumberUnit sapUmcRedTextColor";
		} else {
			oBillTileData.numberClass = "sapUmcTileNumber sapUmcGreenTextColor";
			oBillTileData.numberUnitClass = "sapUmcTileNumberUnit sapUmcGreenTextColor";
		}
	},
	
	onFilingObligationCountLoaded: function(iFilingObligationCount) {
        var oFilingObligationData = this._getTileData(this._getTileTitles()._FILING_OBLIGATIONS);
        oFilingObligationData.number = iFilingObligationCount;
        if (iFilingObligationCount > 0) {
            oFilingObligationData.numberClass = "sapUmcTileNumber sapUmcBlackTextColor";
         //   oFilingObligationData.numberUnitClass = "sapUmcTileNumberUnit sapUmcRedTextColor";
           // oFilingObligationData.iconClass = "sapUmcIconRed";
        } else {
            oFilingObligationData.numberClass = "sapUmcTileNumber sapUmcGreyTextColor";
            oFilingObligationData.numberUnitClass = "sapUmcTileNumberUnit sapUmcGreyTextColor";
        }

    },
    
    onFormsDraftCountLoaded: function(iFormsDraftCount) {
        var oFormsDraftData = this._getTileData(this._getTileTitles()._FORMS);
        oFormsDraftData.number = iFormsDraftCount;
        if (iFormsDraftCount > 0) {
            oFormsDraftData.numberClass = "sapUmcTileNumber sapUmcBlackTextColor";
          //  oFormsDraftData.numberUnitClass = "sapUmcTileNumberUnit sapUmcWhiteTextColor";
         //   oFormsDraftData.iconClass = "sapUmcIconRed";
        } else {
            oFormsDraftData.numberClass = "sapUmcTileNumber sapUmcGreyTextColor";
            oFormsDraftData.numberUnitClass = "sapUmcTileNumberUnit sapUmcGreyTextColor";
        }

    },
	
	_refreshTiles: function(){
		this.getView().getModel(this._TILES_MODEL_NAME).refresh();
		var oTilesContainer = this.getView().byId("tileContainer");
		var aTiles = oTilesContainer.getTiles();
		for ( var i = 0; i < aTiles.length; i++) {
			var oCurrentTile = aTiles[i];
			var sCssNumber = oCurrentTile.getCustomData()[0].getValue("Number");
			var sCssNumberUnit = oCurrentTile.getCustomData()[1].getValue("Unit");
			if (oCurrentTile.getCustomData()[2].getValue("Icon")) {
				var oIcon = oCurrentTile.findAggregatedObjects()[0].findAggregatedObjects()[1].findAggregatedObjects()[1]
						.findAggregatedObjects()[1];
				oIcon.addStyleClass(oCurrentTile.getCustomData()[2].getValue("Icon")+"");
			}
			var oVbox = oCurrentTile.findAggregatedObjects()[0];
			var oVbox2 = oVbox.findAggregatedObjects()[1];
			var oHbox = oVbox2.findAggregatedObjects()[1];
			var oHbox2 = oHbox.findAggregatedObjects()[0];
			var oNumber = oHbox2.findAggregatedObjects()[0];
			var oNumberUnit = oHbox2.findAggregatedObjects()[1];
			oNumber.addStyleClass(sCssNumber+"");
			oNumberUnit.addStyleClass(sCssNumberUnit+"");
		}
	},
	onHomeDataLoaded: function(iCriticalAlertCount, oContractAccounts,iFilingObligationCount,iFormsDraftCount){
		
		this.onCriticalAlertCountLoaded(iCriticalAlertCount);
		this.onContractAccountsLoaded(oContractAccounts); //ACASTANEDA Ocultar llamado a carga inicial de Facturacion ACASTANEDA
		this.onFilingObligationCountLoaded(iFilingObligationCount);   //ACASTANEDA Se comenta para esconder Declar. Oblig.
		this.onFormsDraftCountLoaded(iFormsDraftCount);
		if(sap.ui.getCore().getModel("settings").getProperty("/bIsMultipleAccounts") && !(sap.ui.getCore().getModel("settings").getProperty("/bIsAgent"))){
	          var label= this.getView().byId("businessParterName");
	          label.setText(this.getFormattedText("HOME.ON_BEHALF_OF",[sap.ui.getCore().getModel("settings").getProperty("/UserFirstName"),this.getDataProvider().getAccount().getData().FullName]));  
		}else{
		  this.getView().setModel(this.getDataProvider().getAccount(), "personalInformation");
		}
		this._refreshTiles();
		
	},
	_handleCarousel: function() {
		var oSettings = sap.ui.getCore().getModel("settings").getData();
		var oData = {};
		if (oSettings.language === "en") {
			oData.Private1Url = "home/img/carousel1.jpg";
			oData.Private2Url = "home/img/carousel2.jpg";
		} else if (oSettings.language === "de") {
			oData.Private1Url = "home/img/carousel1de.jpg";
			oData.Private2Url = "home/img/carousel2de.jpg";
		} else {
			oData.Private1Url = "home/img/carousel1.jpg";
			oData.Private2Url = "home/img/carousel2.jpg";
		}
		this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "Images");
		var oCarousel =this.getView().byId("homeCarousel")
		return setInterval(function() {
			//oCarousel.next();
		}, 5000);
	},
	_getTileTitles: function() {
		return {
		    _FILING_OBLIGATIONS: this.getText("HOME.FILING_OBLIGATIONS"), // Se esconde ACASTANEDA para Decl. Obl.
            _FORMS: this.getText("HOME.FORMS"),
			_BILLS: this.getText("HOME.BILL_TITLE"),
			_ALERTS: this.getText("HOME.ALERT_TITLE"),
			_PROFILE: this.getText("HOME.MY_PROFILE"),
			_DOCUMENTS:this.getText("DOCUMENTS.TITLE"),
			_USERS:this.getText("HOME.USERS")
		};
	},
	tilePressed: function(oEvent) {
		var oControl = oEvent.getSource().getContent().getItems()[0];
		switch (oControl.getText()) {
		    case this._getTileTitles()._FILING_OBLIGATIONS:
                var oFilingObligationsComponent = this.getApp().getComponentFactory().getFilingObligations();
                oFilingObligationsComponent.sSourceTileTitle = this.getText("HOME.FILING_OBLIGATIONS");
                oFilingObligationsComponent.getRouter().myNavTo("filingObligations", {}, false);
                break;
            case this._getTileTitles()._FORMS:
                var oFormsComponent = this.getApp().getComponentFactory().getForms();
                oFormsComponent.sSourceTileTitle = this.getText("HOME.FORMS");
                oFormsComponent.getRouter().myNavTo("forms", {}, false); 
                break;
			case this._getTileTitles()._BILLS:
				var oInvoiceComponent = this.getApp().getComponentFactory().getInvoice();
				oInvoiceComponent.getRouter().myNavTo("balance", {}, false);
				break;
			case this._getTileTitles()._ALERTS:
				var oAlertComponent = this.getApp().getComponentFactory().getMessageCenter();
				oAlertComponent.getRouter().myNavTo("messageCenter", {
					Type: "Al"
				}, false);
				break;
			case this._getTileTitles()._PROFILE:
				var oUserProfileComponent = sap.ui.getCore().getComponent("AppComponent").getComponentFactory().getUserProfile();
				oUserProfileComponent.getRouter().myNavTo("userProfile", {}, false);
				break;
			case this._getTileTitles()._DOCUMENTS:
                var oDocumentsComponent =  this.getApp().getComponentFactory().getDocuments();
                oDocumentsComponent.getRouter().myNavTo("documents", {}, false);
                break;	
			case this._getTileTitles()._USERS:
				var oUsersComponent =  this.getApp().getComponentFactory().getUsers();
				oUsersComponent.getRouter().myNavTo("users", {}, false);
            break;
				
		}
	},
	handleAccountTogglePress: function(oEvent) {
		var oButton = oEvent.getSource();
		jQuery.sap.delayedCall(0, this, function() {
			oButton.setPressed(false);
			this._oAccountActionSheet.openBy(oButton);
		});
	},
	onExit: function() {
		sap.umc.mobile.Logger.info("exit");
		if (this._oPopover) {
			this._oPopover.destroy();
		}
	},
	handlePopoverPress: function(oEvent) {
		this.getPopover().openBy(oEvent.getSource());
	},
	_getTile: function(sTileTitle) {
		var oTileContainer = this.getView().byId("tileContainer");
		var aTiles = oTileContainer.getTiles();
		for ( var i = 0; i < aTiles.length; i++) {
			if (aTiles[i].getContent().getItems()[0].getText() === sTileTitle) {
				return aTiles[i];
			}
		}
		return undefined;
	},
	_getTileData: function(sTileTitle) {
		var aTileModels = this.getView().getModel(this._TILES_MODEL_NAME).getData().TileCollection;
		for ( var i in aTileModels) {
			if (aTileModels[i].title === sTileTitle) {
				return aTileModels[i];
			}
		}
	},
	_initHeader: function() {
		sap.umc.mobile.private.app.view.FullBaseController.prototype._initHeader.call(this);
		var sSrc = jQuery.sap.getModulePath("sap.umc.mobile.home") + "/img/SAPLogo.gif";
	//	this.oHeaderFooterHelper.addHeaderImage(sSrc, "left", 1);
		
	},
	_initFooter: function() {
		sap.umc.mobile.private.app.view.FullBaseController.prototype._initFooter.call(this);
		// this.oHeaderFooterHelper.addContactusButton(); ACASTANEDA Se comenta para no mostrar el contactenos
	}
});
