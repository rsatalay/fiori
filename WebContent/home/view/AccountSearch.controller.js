sap.umc.mobile.private.app.view.FullBaseController.extend("sap.umc.mobile.home.view.AccountSearch",{

	onInit: function() {
		
		sap.umc.mobile.private.app.view.FullBaseController.prototype.onInit.call(this);
		//To remove Back and home button in the  page
		this.oHeaderFooterHelper.getHeader().removeAllContentLeft();
	
		this._handleRouting();
	},
	_handleRouting: function() {
		this.getRouter().attachRouteMatched(function(oEvent) {
			var sNavigationName = oEvent.getParameter("name");
			if (sNavigationName === "accounts") {
	this.getAccounts();
			}
		}, this);
	},
	
	getAccounts:function(){
		var oAccounts = this.oApp.getDataProvider().getAccounts();
		this.getView().setModel(new sap.ui.model.json.JSONModel(oAccounts.getData()), "Accounts");
		
	
	},
	onSearch : function (oEvt) {
		 
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("FullName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}

		// update list binding
		var list = this.getView().byId("idAccountsList");
		var binding = list.getBinding("items");
		binding.filter(aFilters, "Application");
	},

	onListItemPress : function(evt) {
        var path = evt.getSource().oBindingContexts.Accounts.sPath;
        var m = evt.getSource().getModel("Accounts");
        var curr = m.getObject(path);
        this.oApp.getDataProvider()._oContextAccount.setData(curr);
		var oHomeComponent = this.getApp().getComponentFactory().getHome();
		oHomeComponent.getRouter().myNavTo("home", curr, true);
		
		
    },
    



});
