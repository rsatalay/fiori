jQuery.sap.declare("sap.umc.mobile.forms.js.utils");

sap.umc.mobile.forms.js.utils = jQuery.extend(sap.umc.mobile.private.app.js.utils, {
	formatDate: function(dateStr) {
		
		var formattedDate = null;
		if(!(dateStr === "00000000" || dateStr === "")){
			if(typeof(dateStr)==="string" && dateStr.length===8){
			formattedDate = new Date(dateStr.substring(0,4),dateStr.substring(4,6) - 1,dateStr.substring(6)); 
			if (Object.prototype.toString.call(formattedDate) === '[object Date]'
				&& isFinite(formattedDate)	
				) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					 /* pattern: "MMMM yyyy d"*/
					  style:"long"
					}/*,new sap.ui.core.Locale("fr")*/);
			

				return oDateFormat.format(formattedDate);
			
			}
		}
		} 
	
	return "";
},
   
    javascriptDate:function(str){
        if(str == ""){
            return;
        }
        else{
            var d = new Date(str);
            if ( Object.prototype.toString.call(d) === "[object Date]" ) {
                // it is a date
                if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
                  return;
                }
                else {
                  return d;
                }
              }
              else {
                return;
              }           
        }
        
    },
    //c5221606 added for payment tab
    Cvc: function(oKey) {
		if (oKey) {
			if (oKey === parseInt(oKey, 10)) {
				return false;
			}
			if (oKey.indexOf("card") >= 0) {
				return true;
			}
		}
		return false;
	},
	
	Price: function(value, currency) {
		return sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(value, currency);
	},
	Date: function(value) {
		if (value) {
			return sap.umc.mobile.private.app.js.formatters.dateFormatter(new Date(value));
		} else {
			return value;
		}
	},


});