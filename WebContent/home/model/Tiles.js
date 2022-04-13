jQuery.sap.declare("sap.umc.mobile.home.model.Tiles");

sap.umc.mobile.home.model.Tiles = {
	getTiles : function() {
		if(!this.oTiles){
			this.oTiles = this._buildTiles();
		}
		return this.oTiles;
	},

	_buildTiles: function(){
		var oTiles = {"TileCollection": []};
		(function(){		    
			  this.addFilingObligations = (function(){
                var oTile = {
                        "number": "",
                        "numberUnit": "",
                        "numberClass": "sapUmcTileNumber sapUmcGreyTextColor",
                        "numberUnitClass": "sapUmcTileNumberUnit sapUmcGreyTextColor",
                        "icon": "sap-icon://activities",
                        "info": sap.ui.getCore().getModel("i18n").getProperty("FILING_OBLIGATIONS.NOT_FILED"),
                        "title": sap.ui.getCore().getModel("i18n").getProperty("HOME.FILING_OBLIGATIONS")
                };
                this.TileCollection.push(oTile);
            }).call(this);  /*   */  // ACASTANEDA Se comenta para esconder Obligaciones Declar 105.        
            this.addForms= (function(){
                var oTile = {
                        "number": "",
                        "numberUnit": "",
                        "numberClass": "sapUmcTileNumber sapUmcGreyTextColor",
                        "numberUnitClass": "sapUmcTileNumberUnit sapUmcGreyTextColor",
                        "icon": "sap-icon://form",
                        "info": sap.ui.getCore().getModel("i18n").getProperty("FORMS.SUBMITTED"), // ACASTANEDA  106 Se visualiza formularios enviados FORMS.DRAFT
                        "title": sap.ui.getCore().getModel("i18n").getProperty("HOME.FORMS") // 
                };
                this.TileCollection.push(oTile);
            }).call(this);
			this.addAlerts = (function(){
				var oTile = {
						"number": "0",
						"numberUnit": "",
						"numberClass": "sapUmcTileNumber ",
						"numberUnitClass": "sapUmcTileNumberUnit ",
						"icon": "sap-icon://alert",
						"iconClass": "",
						"info": sap.ui.getCore().getModel("i18n").getProperty("HOME.ALERT_TITLE"),
						"title": sap.ui.getCore().getModel("i18n").getProperty("HOME.ALERT_TITLE")
				};
				this.TileCollection.push(oTile);
			}).call(this);
			this.addBalance = (function(){
				var oTile = {
						"number": 0,
						"numberUnit": "",
						"numberClass": "sapUmcTileNumber2 ",  // Se crea una nueva clase para modificar tamano de letra en valor total ACASTANEDA 108
						"numberUnitClass": "sapUmcTileNumberUnit ",
						"info": sap.ui.getCore().getModel("i18n").getProperty("HOME.CURRENT_BALANCE"),
						"title": sap.ui.getCore().getModel("i18n").getProperty("HOME.BILL_TITLE")
				};
				this.TileCollection.push(oTile);
			}).call(this);		
			this.addDocuments = (function(){
                var oTile = {
                        "icon": "sap-icon://documents",
                        "numberUnit": "",
                        "numberClass": "sapUmcTileNumber ",
                        "numberUnitClass": "sapUmcTileNumberUnit ",
                    //    "info": sap.ui.getCore().getModel("i18n").getProperty("HOME.UPDATE_PERSONAL_DATA"),
                        "title": sap.ui.getCore().getModel("i18n").getProperty("DOCUMENTS.TITLE")
                };
                this.TileCollection.push(oTile);
            }).call(this);
			this.addUsers = (function(){
				var oTile = {
						"icon": "sap-icon://group",
						"info": sap.ui.getCore().getModel("i18n").getProperty("HOME.USER_MANAGEMENT"),
						"title": sap.ui.getCore().getModel("i18n").getProperty("HOME.USERS")
				};
				this.TileCollection.push(oTile);
			}).call(this);
			this.addProfile = (function(){
				var oTile = {
						"icon": "sap-icon://person-placeholder",
						"info": sap.ui.getCore().getModel("i18n").getProperty("HOME.UPDATE_PERSONAL_DATA"),
						"title": sap.ui.getCore().getModel("i18n").getProperty("HOME.MY_PROFILE")
				};
				this.TileCollection.push(oTile);
			}).call(this);
			
			
		}).call(oTiles);
		return {"TileCollection" : oTiles.TileCollection};	
	}
};