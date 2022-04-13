jQuery.sap.declare("sap.umc.mobile.forms.view.forms.UET.fragments.V00000.SUETController");
sap.umc.mobile.forms.view.forms["UET"].fragments.V00000["SUETController"] = {
    setView: function(oView) {
        this._oView = oView;
        this.setDefaultValues();
    },
    getView: function() {
        return this._oView;
    },
    getDataProvider: function() {
        return sap.umc.mobile.forms.model.DataProvider;
    },
    setDefaultValues: function() {
        this.FormID = "SUET";
    },
    setbEdited: function(bFlag) {
        var oController = this.getView().getController();
        var oFilter = oController.getSelectedFilter();
        var sCurrentFormNo = oFilter.data().CurrentFormNo;
        var sKey = this.FormID;
        if (oController.oAllFormsData[sKey] && oController.oAllFormsData[sKey][sCurrentFormNo])
            oController.oAllFormsData[sKey][sCurrentFormNo]["bEdited"] = bFlag;
    },

    handleUploadPress: function(oEvent) {
        var oThis = this;
        if (!oThis.fileUploader) {
            oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploaderSUET", {
                width: "400px",
                tooltip: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.SELECT_FILE"),
                typeMissmatch: function(oEvent) {
                    oThis.handleTypeMissmatch(oEvent);
                },
                fileType: "csv"
            });
        }
        if (!this.uploadDialog) {
            this.uploadBtn = new sap.m.Button({
                icon: "sap-icon://upload",
                text: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.UPLOAD"),
                press: function() {
                    if (oThis.fileUploader.getValue()) {
                        oThis.uploadChange();
                        if (oThis.uploadDialog.isOpen())
                            oThis.uploadDialog.close();
                    }
                }
            });
            this.dialogCloseBtn = new sap.m.Button({
                text: sap.umc.mobile.private.app.js.utils.getText("FILING_OBLIGATIONS.CANCEL"),
                press: function(evt) {
                    if (oThis.uploadDialog && oThis.uploadDialog.isOpen()) {
                        oThis.uploadDialog.close();
                    }
                }
            });

            this.textField = new sap.m.Text({
              text: sap.ui.getCore().getModel("i18n").getProperty("DATE_VALIDATION.MESSAGE")
            });
            this.vBox = new sap.m.VBox({
              items: [this.fileUploader,this.textField]
            });

            this.uploadDialog = new sap.m.Dialog({
                title: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.SELECT_FILE"),
                content: [this.vBox],
                buttons: [this.uploadBtn, this.dialogCloseBtn]
            });
        }
        this.uploadDialog.open();
    },

    handleTypeMissmatch: function(oEvent) {
        var aFileTypes = oEvent.getSource().getFileType();
        $.each(aFileTypes, function(key, value) {
            aFileTypes[key] = "*." + value;
        });
        var sSupportedFileTypes = aFileTypes.join(", ");
        sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, sap.umc.mobile.private.app.js.utils.getFormattedText("FORMS.FILE_NOT_SUPPORTED", [oEvent.getParameter("fileType"),
sSupportedFileTypes]));
    },

 uploadChange: function(evt) {

        var oThis = this;
        var formsID = this.FormID;
        var file = jQuery.sap.domById("fileUploaderSUET-fu").files[0];
        if (file) {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {

                        var json = oThis.csvJSON(e.target.result);

                          if (json[0].Value == null)
                            {

                            var excelvalidation = sap.ui.getCore().getModel("i18n").getProperty("EXCEL.VALIDATION_FAIL");
                            sap.m.MessageToast.show(excelvalidation, {
                                duration: 4000,
                                width: "20em"
                              });
                            }

                          else
                            {

                      sap.ui.getCore().byId("_SUET_A_F1_QENDING_input").setValue(json[0].Value);
                      sap.ui.getCore().byId("_SUET_A_F2_DUEDATE_date").setValue(json[1].Value);
                      sap.ui.getCore().byId("_SUET_A_F3_PENALTYAFTERDUEDATE_date").setValue(json[2].Value);
                      sap.ui.getCore().byId("_SUET_A_F5_TAXRATE_input").setValue(json[3].Value);
                      sap.ui.getCore().byId("_SUET_A_F4_ACCNUMBER_input").setValue(json[4].Value);
                      sap.ui.getCore().byId("_SUET_A_F10_1STMONTH_input").setValue(json[5].Value);
                      sap.ui.getCore().byId("_SUET_A_F10_2NDMONTH_input").setValue(json[6].Value);
                      sap.ui.getCore().byId("_SUET_A_F10_3RDMONTH_input").setValue(json[7].Value);
                      sap.ui.getCore().byId("_SUET_A_F11_GROSSWAGESTHISQUATER_input").setValue(json[8].Value);
                      sap.ui.getCore().byId("_SUET_A_F12_WAGESPAIDEXCAMOUNT_input").setValue(json[9].Value);
                      sap.ui.getCore().byId("_SUET_A_F13_TAXABLEWAGESTHISQ_input").setValue(json[10].Value);
                      sap.ui.getCore().byId("_SUET_A_F14_TAXDUE_input").setValue(json[11].Value);
                      sap.ui.getCore().byId("_SUET_A_F15_PENALTYDUE_input").setValue(json[12].Value);
                      sap.ui.getCore().byId("_SUET_A_F16_INTERESTDUE_input").setValue(json[13].Value);
                      sap.ui.getCore().byId("_SUET_A_F17_TOTALDUE_input").setValue(json[14].Value);

                            var excelsuccess = sap.ui.getCore().getModel("i18n").getProperty("EXCEL.SUCCESS");
                            sap.m.MessageToast.show(excelsuccess);

                            }

                    };
                })(file);
                reader.readAsText(file);
            } else {
                sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.umc.mobile.private.app.Constants.MESSAGE_ERROR);
            }
        }
        this.setbEdited(true);

    },

    csvJSON: function(csv) {
        var i;
        var j;
        var input = csv.replace(/\"\"/g, encodeURIComponent('"'));
        var quotesAndValues = input.split(/\"/g);
        var escapedInput;
        var quotesAndValuesLength = quotesAndValues.length;
        for (i = 1; i < quotesAndValuesLength; i = i + 2) {
            quotesAndValues[i] = encodeURIComponent(quotesAndValues[i]);
        }
        escapedInput = quotesAndValues.join("");
        var lines = escapedInput.split(/\r\n|\n/g);
        var result = [];
        var headers = lines[0].split(/,/g);
        var headersLength = headers.length;
        for (i = 0; i < headersLength; i++) {
            headers[i] = headers[i].replace(/\W/g, '_');
        }
        for (i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(/,/g);
            var headersLength = headers.length;
            for (j = 0; j < headersLength; j++) {
                obj[headers[j]] = decodeURIComponent(decodeURIComponent(currentline[j]));
                if (obj[headers[j]] === "undefined") {
                    obj[headers[j]] = "";
                }
            }
            result.push(obj);
        }
        var resultLength = result.length;
        for (var k = 1; k <= resultLength; k++) {
            var lastObj = $(result).get(-1);
            var bFlag = true;
            for (var sProp in lastObj) {
                if (!lastObj.hasOwnProperty(sProp)) {
                    continue;
                }
                if (typeof lastObj[sProp] === "function") {
                    continue;
                }
                if (lastObj[sProp] === "") {
                    continue;
                } else {
                    bFlag = false;
                    break;
                }
            }
            if (bFlag) {
                result.pop();
            } else {
                break;
            }
        }
        return result;
    },



    handlePdfPress: function(evt) {

      var titleform = this.lengthtitleformatter(this.getView().byId("FullScreenTitle").getText());
      var doc = new jsPDF();
      doc.setFontSize(18);
    doc.text(20, 23, titleform);
    doc.setLineWidth(0.5);
    doc.line(19,24,195,24);
    doc.setFontSize(14);

    var FORMS_HEADERS_DATA = sap.ui.getCore().getModel("i18n").getProperty("FORMS.HEADERS_DATA") + ":";
    var FORMS_NUMBER_FTES = sap.ui.getCore().getModel("i18n").getProperty("FORMS.NUMBER_FTES") + ":";
    var FORMS_TAX_DATA = sap.ui.getCore().getModel("i18n").getProperty("FORMS.TAX_DATA") + ":";

    //Text value/dimension greater than rectangle

    doc.setFontSize(15);
    doc.text(20, 40, FORMS_HEADERS_DATA);

    doc.setFontSize(14);
    doc.text(20, 55, this.lengthformatter(sap.ui.getCore().byId("A_F1_QENDING").getText()));
    doc.text(140, 55, sap.ui.getCore().byId("_SUET_A_F1_QENDING_input").getValue());
    doc.rect(138,49,45,10);

    doc.text(20, 70, this.lengthformatter(sap.ui.getCore().byId("A_F2_DUEDATE").getText()));
    doc.text(140,70, this.dateformatter(sap.ui.getCore().byId("_SUET_A_F2_DUEDATE_date").getValue()));
    doc.rect(138,64,45,10);

    doc.text(20, 85, this.lengthformatter(sap.ui.getCore().byId("A_F3_PENALTYAFTERDUEDATE").getText()));
    doc.text(140, 85, this.dateformatter(sap.ui.getCore().byId("_SUET_A_F3_PENALTYAFTERDUEDATE_date").getValue()));
    doc.rect(138,79,45,10);

    doc.text(20, 100, this.lengthformatter(sap.ui.getCore().byId("A_F5_TAXRATE").getText()));
    doc.text(140, 100, sap.ui.getCore().byId("_SUET_A_F5_TAXRATE_input").getValue());
    doc.rect(138,94,45,10);

    doc.text(20, 115, this.lengthformatter(sap.ui.getCore().byId("A_F4_ACCNUMBER").getText()));
    doc.text(140, 115, sap.ui.getCore().byId("_SUET_A_F4_ACCNUMBER_input").getValue());
    doc.rect(138,109,45,10);

    doc.setFontSize(15);
    doc.text(20, 130, FORMS_NUMBER_FTES);

    doc.setFontSize(14);
    doc.text(20, 145, this.lengthformatter(sap.ui.getCore().byId("A_F10_1STMONTH").getText()));
    doc.text(140, 145,  sap.ui.getCore().byId("_SUET_A_F10_1STMONTH_input").getValue());
    doc.rect(138,139,45,10);

    doc.text(20, 160, this.lengthformatter(sap.ui.getCore().byId("A_F10_2NDMONTH").getText()));
    doc.text(140, 160,  sap.ui.getCore().byId("_SUET_A_F10_2NDMONTH_input").getValue());
    doc.rect(138,154,45,10);

    doc.text(20, 175, this.lengthformatter(sap.ui.getCore().byId("A_F10_3RDMONTH").getText()));
    doc.text(140, 175, sap.ui.getCore().byId("_SUET_A_F10_3RDMONTH_input").getValue());
    doc.rect(138,169,45,10);

    doc.setFontSize(15);
    doc.text(20, 190, FORMS_TAX_DATA);

    doc.setFontSize(14);
    doc.text(20, 205, this.lengthformatter(sap.ui.getCore().byId("A_F11_GROSSWAGESTHISQUATER").getText()));
    doc.text(140, 205, sap.ui.getCore().byId("_SUET_A_F11_GROSSWAGESTHISQUATER_input").getValue());
    doc.rect(138,199,45,10);

    doc.text(20, 220, this.lengthformatter(sap.ui.getCore().byId("A_F12_WAGESPAIDEXCAMOUNT").getText()));
    doc.text(140, 220, sap.ui.getCore().byId("_SUET_A_F12_WAGESPAIDEXCAMOUNT_input").getValue());
    doc.rect(138,214,45,10);

    doc.text(20, 235, this.lengthformatter(sap.ui.getCore().byId("A_F13_TAXABLEWAGESTHISQ").getText()));
    doc.text(140, 235, sap.ui.getCore().byId("_SUET_A_F13_TAXABLEWAGESTHISQ_input").getValue());
    doc.rect(138,229,45,10);

    doc.text(20, 250, this.lengthformatter(sap.ui.getCore().byId("A_F14_TAXDUE").getText()));
    doc.text(140, 250, sap.ui.getCore().byId("_SUET_A_F14_TAXDUE_input").getValue());
    doc.rect(138,244,45,10);

    doc.text(20, 265, this.lengthformatter(sap.ui.getCore().byId("A_F15_PENALTYDUE").getText()));
    doc.text(140, 265, sap.ui.getCore().byId("_SUET_A_F15_PENALTYDUE_input").getValue());
    doc.rect(138,259,45,10);

    doc.text(20, 280, this.lengthformatter(sap.ui.getCore().byId("A_F16_INTERESTDUE").getText()));
    doc.text(140, 280, sap.ui.getCore().byId("_SUET_A_F16_INTERESTDUE_input").getValue());
    doc.rect(138,274,45,10);

    doc.addPage();
    doc.setLineWidth(0.5);

    doc.text(20, 40, this.lengthformatter(sap.ui.getCore().byId("A_F17_TOTALDUE").getText()));
    doc.text(140, 40, sap.ui.getCore().byId("_SUET_A_F17_TOTALDUE_input").getValue());
    doc.rect(138,34,45,10);

      doc.save("Form.pdf");

      },

      dateformatter: function(date)
      {

        if (date.length != 8)
          {
            return date;
          }

        else
          {

        var value = date;
        var day=value.slice(6,8);
        var month=value.slice(4,6);
        var year=value.slice(0,4);
        var finalvalue = day+ "." +month+ "." +year;
        return finalvalue;

          }

      },

      lengthtitleformatter: function(string)
      {

        if(string.length <= 55)

          {
          return string;
          }

        else
          {
          var value = string;
          var finalvalue = value.slice(0,55);
          return finalvalue;
          }

      },

      lengthformatter: function(string)
      {

        if(string.length <= 49)
          {
          return string;
          }

        else
          {
          var value = string;
          var finalvalue = value.slice(0,49);
          return finalvalue;
          }

      },

    onChange: function(evt) {
        var oSource = evt.getSource();
        if (sap.m.DatePicker.prototype.isPrototypeOf(oSource)) {
            if (evt.mParameters.valid === false) {
                oSource.setValueState(sap.ui.core.ValueState.Error);
                var sMsg = sap.umc.mobile.private.app.js.utils.getFormattedText("FORMS.DATE_FORMAT", [oSource.getDisplayFormat()]);
                oSource.setValueStateText(sMsg);
                oSource.focus(true);
            }
            if (evt.mParameters.valid === true) {
                oSource.setValueState(sap.ui.core.ValueState.None);
                oSource.setValueStateText("");
            }
        }
        this.setbEdited(true);
    },
};