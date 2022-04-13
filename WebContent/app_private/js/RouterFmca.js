 
sap.umc.mobile.Router.extend("sap.umc.mobile.RouterFmca",{
	 
	getLastRouteData :function(){ 
		return this.aHistory[this.aHistory.length-1].parameters;
		},
		
		myNavTo : function(sRoute, oParameters, bReplace) {
			//bReplace = (this.aHistory.length == 0) ? false : bReplace;
			//var oHistory = sap.ui.core.routing.History.getInstance().aHistory;
			//oHistory.aHistory
			
			if(bReplace && (this.aHistory.length > 0)){
				this.aHistory.pop();
			}
			var sHash = this.getURL(sRoute, oParameters);
			var oEntry = {"hash": sHash, "route": sRoute, "parameters":oParameters};
			this.aHistory.push(oEntry);
			sap.ui.getCore().getEventBus().publish("navigation", "navTo", { "route": sRoute, "replace": bReplace, "stack": this.aHistory});
			sap.ui.getCore().getEventBus().publish("session", "alive");
			this.navTo(sRoute, oParameters, bReplace);
		},
	 
 });