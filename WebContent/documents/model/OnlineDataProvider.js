/*global window */
jQuery.sap.declare("sap.umc.mobile.documents.model.OnlineDataProvider");
//jQuery.sap.require("sap.umc.mobile.private.app.js.utils");
sap.umc.mobile.documents.model.OnlineDataProvider = {
        
        loadCorrespondences:function(oDelegate, startDate, endDate){
            var fnSuccess = jQuery.proxy(function(oData, oResponse) {
                oDelegate.CorrespondencesModel.setData(oData);
            }, this);
       
                var sFormsPath = this.getAccountPath() + "Correspondences";
           /*     this.SERVICE.read(sFormsPath, ["$format=json","$expand=CorrespondenceTypes","$filter=CreatedDate le datetime'"+endDate+"' and "+"CreatedDate ge datetime'"+startDate+"'"], true, {
                    fnSuccess: fnSuccess
                });*/
               /* var sEndDate = "datetime'"+parseInt(endDate)+"'";
                var sStartDate = "datetime'"+parseInt(startDate)+"'";*/
                var sExpand = "$expand=CorrespondenceTypes";
                this.SERVICE.read(sFormsPath, ["$format=json",sExpand], true, {
                	fnSuccess: fnSuccess
        		}, [], [{
        			name: 'CreatedDate',
        			operator: sap.ui.model.FilterOperator.LE,
        			value: endDate
        		},
        		{
        			name: 'CreatedDate',
        			operator: sap.ui.model.FilterOperator.GE,
        			value: startDate
        			
        		}
        		]);
        }	
	
};