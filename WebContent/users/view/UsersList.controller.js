sap.umc.mobile.private.app.view.MasterBaseController.extend("sap.umc.mobile.users.view.UsersList", {

	onInit : function() {
	
			//sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);

		sap.umc.mobile.private.app.view.MasterBaseController.prototype.onInit.call(this);
		//Attach Router Matched method
		this._handleRouting();
		//fix-back button
		  sap.ui.getCore().getEventBus().subscribe("users", "dirty", $.proxy(function(oSelectedUser) {
				this.getDataProvider()._refreshUsersList(this);
			}, this));
		//To remove Back button in the master page
		//this.oHeaderFooterHelper.getHeader().removeContentLeft(this.oHeaderFooterHelper.getHeader().getContentLeft()[0])
	},
	
	//Data Provider Getter
    getDataProvider: function() {
        return sap.umc.mobile.users.model.DataProvider;
    },
    
    //Attach Routing Handler - Route Name "users"
	_handleRouting: function(){
		this.getRouter().attachRouteMatched(
				function(oEvent) {
					var sNavigationName = oEvent.getParameter("name");
					if (sNavigationName === "users") {
						
				/*		sap.ui.getCore().getEventBus().unsubscribe("navigation", "navTo", this.handleNavigationEvent,this);
		  				sap.ui.getCore().getEventBus().subscribe("navigation", "navTo", this.handleNavigationEvent,this);
		  	  */        
		      //start of merging handlenavigation method
						var data = this.getRouter().getLastRouteData();
					 	if(data){
					 		
						/*	if(data.stack[data.stack.length-1].route === "users"){*/
								   
						           
						         //  var param = data.stack[data.stack.length-1].parameters;
						         if(jQuery.isEmptyObject(data))
						           this.getDataProvider().loadUsers(this,true);
						           else
						       	this.getDataProvider().loadUsers(this,true,data);
						         
							
							/*}*/
						}
					 	//end of merging handlenavigation method
					
					}
				}, this);
	},
	
handleNavigationEvent:function(channel, event, data) {
	 var sNavigationName = data.route;
     if (sNavigationName === "users") {
    	
    	if(data){
	
				if(data.stack[data.stack.length-1].route === "users"){
					   
			           
			           var param = data.stack[data.stack.length-1].parameters;
			         if(jQuery.isEmptyObject(param))
			           this.getDataProvider().loadUsers(this,true);
			           else
			       	this.getDataProvider().loadUsers(this,true,param);
			         
				
				}
			}
    	
	
		
     }
   

    },
	
	//On Load of all the Users in the Master Page List
	onUsersLoaded:function(oUsers,oSelectedUser){
		
		/*if(this.getView().getModel("Users")){
			this.getView().getModel("Users").setData(oUsers.getData());
		}
		else{
			this.getView().setModel(oUsers, "Users");
		}*/
		this.getView().setModel(oUsers, "Users");
		if (sap.ui.getCore().getModel("device").getProperty("/isNoPhone")){
			this._setDefaultItemSelection(oSelectedUser);			
		}		
	
	},
	
	//To set initial/default selection of item in Master Page List
	_setDefaultItemSelection: function(oPreSelectedUser){
		//user fix 
		
		var oList = this.getView().byId("UsersList");
		if(oList.getItems().length){
			var oSelectedUser = {};
			if(oPreSelectedUser){
				for(var i = 0;i<oList.getItems().length;i++){
					var oListItem = oList.getItems()[i];
					if ( oListItem != undefined ){
						
						/*oListItem.addStyleClass("sapMLIBSelected");*/
						var oContext = oListItem.getBindingContext("Users");
						var oUser = oContext.getProperty(oContext.getPath());
						if(oPreSelectedUser.AliasID ==  oUser.AliasID){
							oSelectedUser = oUser;
							oList.setSelectedItem(oListItem, true);
						}
							
						
					}
				}
			}
			
			
			else{
				
				var oFirstItem = oList.getItems()[0];
				
				if ( oFirstItem != undefined ){
					oList.setSelectedItem(oFirstItem, true);
					var oContext = oFirstItem.getBindingContext("Users");
					oSelectedUser = oContext.getProperty(oContext.getPath());
					
				}
			}
			this.showDetail(oSelectedUser);
		}
		
		
	},
	
	//To show the Details of the item selected in Master in the Detail Page
	showDetail: function(oUser){
this.getDataProvider().oSelectedUser = oUser;
		var bReplace = sap.ui.getCore().getModel("device").getProperty("/isNoPhone");
		this.getRouter().myNavTo("userDetail", oUser, bReplace);
	},
	
	//Handles Item Press in Master Page
	handleListItemPress : function(oEvent){
		var oContext = oEvent.getParameter("listItem").getBindingContext("Users");
		var oSelectedUser = oContext.getProperty(oContext.getPath());
		this.showDetail(oSelectedUser);
	},

});