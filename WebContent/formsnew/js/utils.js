jQuery.sap.declare("sap.umc.mobile.forms.js.utils");

sap.umc.mobile.forms.js.utils = jQuery.extend(sap.umc.mobile.private.app.js.utils, {
  getFormattedText: function(sProperty, aArguments) {
    return jQuery.sap.formatMessage(sap.umc.mobile.base.utils.getText(sProperty), aArguments);
  },
  formatDateKey:function(sDate){
    if(Date.prototype.isPrototypeOf(sDate)){
      var sFormattedDate = "";
      sFormattedDate += sDate.getFullYear().toString()+"-";
    if((sDate.getMonth()+1)<10){
      sFormattedDate += "0"+(sDate.getMonth()+1).toString()+"-";
    }
    else
      {
      sFormattedDate += (sDate.getMonth()+1).toString()+"-";
      }
    if((sDate.getDate())<10){
      sFormattedDate += "0"+sDate.getDate().toString();
    }
    else
      {
      sFormattedDate += sDate.getDate().toString();
      }
return sFormattedDate+"T"+"00:00:00";}
   else{
     return  sDate;
   }

    },
  formatDateToObject : function(dateStr){
    formattedDate = new Date();
    if(dateStr != "00000000" || dateStr != ""){
      formattedDate = new Date(dateStr.substring(0,4),dateStr.substring(4,6) - 1,dateStr.substring(6));
      return formattedDate;
    }

  },

  invoiceFormatter: function(oInvoices) {
    if (jQuery.isEmptyObject(oInvoices.getData())) {
      return;
    }
    var aMonthNames = sap.umc.mobile.private.app.js.utils.getMonths();
    var dDate;
    var i;
    var iAmountPaid, iAmountDue, iAmountRemaining, sCurrency;
    for (i = 0; i < oInvoices.getData().results.length; i++) {
      iAmountDue = oInvoices.getData().results[i].AmountDue;
      iAmountPaid = oInvoices.getData().results[i].AmountPaid;
      iAmountRemaining = oInvoices.getData().results[i].AmountRemaining;
      sCurrency = oInvoices.getData().results[i].Currency;

      oInvoices.getData().results[i].FormatteDueDate = this.Date(oInvoices.getData().results[i].DueDate);
      //added for invoice date
      oInvoices.getData().results[i].FormattedInvoiceDate = this.Date(oInvoices.getData().results[i].InvoiceDate);
      dDate = new Date(oInvoices.getData().results[i].InvoiceDate);

      //oInvoices.getData().results[i].FormatteInvoiceDate = aMonthNames[dDate.getMonth()].Month + " " + dDate.getFullYear();
      //change above to below to get right date irrespective of the timezone
      oInvoices.getData().results[i].FormatteInvoiceDate = aMonthNames[dDate.getUTCMonth()].Month + " " + dDate.getUTCFullYear();
      oInvoices.getData().results[i].FormatteAmountDue = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(iAmountDue, sCurrency);
      oInvoices.getData().results[i].FormatteAmountPaid = sap.umc.mobile.private.app.js.formatters.amountWithCurrencyFormatter(iAmountPaid, sCurrency);
      oInvoices.getData().results[i].FormatteAmountRemaining = sap.umc.mobile.private.app.js.formatters.amountWithCurrencyFormatter(iAmountRemaining, sCurrency);
    }
    return oInvoices;
  },

  invoiceBillHistoryFormatter: function(oInvoices) {
    if (jQuery.isEmptyObject(oInvoices.getData())) {
      return;
    }
    var aMonthNames = sap.umc.mobile.private.app.js.utils.getMonths();
    var dDate;
    var i;
    var iTotalAmountDue = 0;
    for (i = 0; i < oInvoices.getData().results.length; i++) {
      oInvoices.getData().results[i].AmountDue = parseFloat(oInvoices.getData().results[i].AmountDue);

      dDate = new Date(oInvoices.getData().results[i].InvoiceDate);
      oInvoices.getData().results[i].FormatteInvoiceDate = aMonthNames[dDate.getMonth()].Month.slice(0, 3) + " "
          + dDate.getFullYear().toString().slice(2, 4);
      oInvoices.getData().results[i].FormatteAmountDue = sap.umc.mobile.private.app.js.formatters.amountWithoutCurrencyFormatter(oInvoices.getData().results[i].AmountDue, oInvoices.getData().results[i].Currency);
      iTotalAmountDue = iTotalAmountDue + parseFloat(oInvoices.getData().results[i].AmountDue);
    }
    if (i > 0) {
      iTotalAmountDue = parseFloat(iTotalAmountDue / i).toFixed(2);
    }
    return {
      Invoices: oInvoices,
      Average: iTotalAmountDue
    };
  },
  invoiceBillHistoryFormatter2: function(oInvoices, average) {
    if (jQuery.isEmptyObject(oInvoices.getData())) {
      return;
    }
    for ( var i = 0; i < oInvoices.getData().results.length; i++) {
      oInvoices.getData().results[i].average = parseFloat(average);
    }
    return oInvoices;
  },

  TickToDate: function(dDate) {
    var newDate = new Date();
    if (dDate) {
      newDate.setYear(dDate.getUTCFullYear());
      newDate.setMonth(dDate.getUTCMonth());
      newDate.setDate(dDate.getUTCDate());
      newDate.setHours(0);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      return newDate.toLocaleDateString();
    }
    return dDate;
  },
  FormattedDueDate: function(value) {
    return sap.ui.getCore().getModel("i18n").getProperty("INVOICE.DUE_DATE") + ": " + value;
  },

/*  formatDate: function(dateStr) {

    var formattedDate = null;
    if(!(dateStr === "00000000" || dateStr === "")){
      if(typeof(dateStr)==="string" && dateStr.length===8){
      formattedDate = new Date(dateStr.substring(0,4),dateStr.substring(4,6) - 1,dateStr.substring(6));
      if (Object.prototype.toString.call(formattedDate) === '[object Date]'
        && isFinite(formattedDate)
        ) {
        var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
            pattern: "MMMM yyyy d"
          });


        return oDateFormat.format(formattedDate);

      }
    }
    }

  return "";
},*/
formatDateObject: function(oDate) {

  var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
     /* pattern: "MMMM yyyy d"*/
      style:"long"
    }/*,new sap.ui.core.Locale("fr")*/);
  if (Object.prototype.toString.call(oDate) === '[object Date]'
      && isFinite(oDate)
      ) {



      return oDateFormat.format(oDate);

    }



return oDateFormat.format(new Date());
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
      //return sap.umc.mobile.private.app.js.formatters.dateFormatter(new Date(value));
      return sap.umc.mobile.base.utils.formatDate(new Date(value));
    } else {
      return value;
    }
  },


});