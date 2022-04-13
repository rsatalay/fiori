jQuery.sap.declare("sap.umc.mobile.home.model.OnlineDataProvider");
sap.umc.mobile.home.model.OnlineDataProvider = {
	_readHomeData: function(fnCallback){
		var oQueries = {
				/*				accountAlertCount:{
					entity: "AccountAlerts",
					relativeToAccount: true,
				//	params:["$format=json"],
					returnCount: true,
					returnSingleEntity: false
				}, */ //ACASTANEDA Ocultar llamado alertas en pantalla inicial ACASTANEDA
			 contractAccounts:{
					entity: "ContractAccounts",
					relativeToAccount: true,
					params:["$format=json", "$expand=ContractAccountBalance"],
					returnSingleEntity: true
				}, 
				filingObligationCount:{
                    entity: "FilingObligations",
                    relativeToAccount: true,
                    params:["$filter=FormBundleSubmitted%20eq%20%27%27%20%20and%20ClearingReason%20eq%20%27%27%20"],
                    returnCount: true,
                    returnSingleEntity: false
                },
                formsDraftCount:{
                    entity: "FormBundles",
                    relativeToAccount: true,
                    params:["$filter=StatusID%20eq%20%27Submitted%27%20"], // ACASTANEDA Se modifica el filtro ara no mostrar
                    													// borradores , sino enviados, el Fitro anterior
                    													// llevaba la palabra Draft en vez de Submitted RQ-106
                    returnCount: true,
                    returnSingleEntity: false
                }

		};
		var fnBatcher = (function(oQueries, oDataProvider){
			var aBatchOperations = [];
			var oService = oDataProvider.SERVICE;
			for (var key in oQueries) {
				var oQuery = oQueries[key];
				var sEntityPath = "";
				if(oQuery.relativeToAccount){
					sEntityPath += oDataProvider.getAccountPath();
				}
				sEntityPath += oQuery.entity;
				if(oQuery.returnCount){
					sEntityPath += "/$count";
					if(oQuery.params){
	                    sEntityPath += '?' + oQuery.params.join('&');
	                }
				}
				else if(oQuery.params){
					sEntityPath += '?' + oQuery.params.join('&');
				}
				var oBatchOperation = oService.createBatchOperation(sEntityPath, "GET");
				oBatchOperation.query = oQuery;
				aBatchOperations.push(oBatchOperation);
			}
			oService.addBatchReadOperations(aBatchOperations);
			var oCallbacks = {
					fnSuccess: jQuery.proxy(function(oData, oResponse, oContext) {
		//	var iCriticalAlertCount = oService.getBatchOperationByEntity(aBatchOperations, 
		//										oQueries.accountAlertCount.entity).result;
		//	var oContractAccounts = oData.__batchResponses[1].data.results;
			var oContractAccounts = oData.__batchResponses[0].data.results;
						var  iCriticalAlertCount = ""; // acastaneda	
			var iFilingObligationCount = oService.getBatchOperationByEntity(aBatchOperations, 
												oQueries.filingObligationCount.entity).result;
			var iFormsDraftCount = oService.getBatchOperationByEntity(aBatchOperations, 
												oQueries.formsDraftCount.entity).result;
						fnCallback(iCriticalAlertCount, oContractAccounts
								,iFilingObligationCount,iFormsDraftCount
								);
					}, this),
					fnError: jQuery.proxy(function(oData, oResponse, oContext) {
						sap.umc.mobile.Logger.debug("Home page data failed to load :(");
					}, this)
			};
			oService.submitBatch_NEW(oCallbacks, aBatchOperations);

		})(oQueries, this);

	},

};
