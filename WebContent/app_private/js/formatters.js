jQuery.sap.declare("sap.umc.mobile.private.app.js.formatters");


sap.umc.mobile.private.app.js.formatters = jQuery.extend(sap.umc.mobile.base.js.formatters, {
	budgetBillingRangeFormatter: function(oBBP) {
        if (oBBP) {
            var l = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(oBBP.LowerLimitAmount, oBBP.Currency);
            var u = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(oBBP.UpperLimitAmount, oBBP.Currency);
            return jQuery.sap.formatMessage(sap.umc.mobile.private.app.js.utils.getText("SERVICES.AMOUNT_RANGE"), [l, u]);
        }
    },
    
    formatDateWithNullCheck: function(date){
        if(date){
            //var oDate = sap.umc.mobile.private.app.js.formatters.dateFormatter(date);
            
            var oDate =  sap.umc.mobile.base.utils.formatDate(new Date(date));
            return oDate;
        }
        
    },
	coreDateFormatter: function(dDate) {
		if(dDate){
			 var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance();
	            return oDateFormat.format(dDate);
		}
       
    

},
    formatAttachmentIcon: function(sMimeType) {  
        if ( sMimeType == "application/vnd.ms-excel") {  
             return "sap-icon://excel-attachment";  
        } else {  
             return sap.ui.core.IconPool.getIconForMimeType(sMimeType);  
        }  
   }, 
   timeRemovalFormatter: function(date){
	 
	   if(Date.prototype.isPrototypeOf(date)){  
    	   date.setHours(0);
    	   date.setMinutes(0);
    	   date.setSeconds(0);
         
           return date;
       }
       
   },
});