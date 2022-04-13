jQuery.sap.declare("sap.umc.mobile.forms.view.forms.SUT.fragments.V00000.SSU1Controller");
sap.umc.mobile.forms.view.forms["SUT"].fragments.V00000["SSU1Controller"] = {
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
        this.FormID = "SSU1";
        //to check if code is present
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
            oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploaderSSU1", {
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
        var file = jQuery.sap.domById("fileUploaderSSU1-fu").files[0];
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

                          sap.ui.getCore().byId("_SSU1_A_F1_REG_ID1_input").setValue(json[0].Value);
                          sap.ui.getCore().byId("_SSU1_A_F2A_PERIODFROM1_input").setValue(json[1].Value);
                          sap.ui.getCore().byId("_SSU1_A_FA1_SALES_GROSS1_input").setValue(json[2].Value);
                          sap.ui.getCore().byId("_SSU1_A_FA2_SALES_EXMPT1_input").setValue(json[3].Value);
                          sap.ui.getCore().byId("_SSU1_A_FA3_SALES_TAX_AMT1_input").setValue(json[4].Value);
                          sap.ui.getCore().byId("_SSU1_A_FA4_SALES_TAX_COLL1_input").setValue(json[5].Value);
                          sap.ui.getCore().byId("_SSU1_A_FB3_TAX_PURCH_AMT1_input").setValue(json[6].Value);
                          sap.ui.getCore().byId("_SSU1_A_FB4_TAX_PURCH_COL1_input").setValue(json[7].Value);
                          sap.ui.getCore().byId("_SSU1_A_FC1_RENT_GROSS1_input").setValue(json[8].Value);
                          sap.ui.getCore().byId("_SSU1_A_FC2_RENT_EXMPT1_input").setValue(json[9].Value);
                          sap.ui.getCore().byId("_SSU1_A_FC3_RENT_TAX_AMT1_input").setValue(json[10].Value);
                          sap.ui.getCore().byId("_SSU1_A_FC4_RENT_TAX_COLL1_input").setValue(json[11].Value);
                          sap.ui.getCore().byId("_SSU1_A_FD1_FOOD_GROSS1_input").setValue(json[12].Value);
                          sap.ui.getCore().byId("_SSU1_A_FD2_FOOD_EXMPT1_input").setValue(json[13].Value);
                          sap.ui.getCore().byId("_SSU1_A_FD3_FOOD_TAX_AMT1_input").setValue(json[14].Value);
                          sap.ui.getCore().byId("_SSU1_A_FD4_FOOD_TAX_COLL1_input").setValue(json[15].Value);
                          sap.ui.getCore().byId("_SSU1_A_F5_TAX_COLL1_input").setValue(json[16].Value);
                          sap.ui.getCore().byId("_SSU1_A_F6_LAWFUL_DED1_input").setValue(json[17].Value);
                          sap.ui.getCore().byId("_SSU1_A_F7_TOTAL_TAX_DUE1_input").setValue(json[18].Value);
                          sap.ui.getCore().byId("_SSU1_A_F8_EST_TAX1_input").setValue(json[19].Value);
                          sap.ui.getCore().byId("_SSU1_A_F9_EST_TAX_DUE1_input").setValue(json[20].Value);
                          sap.ui.getCore().byId("_SSU1_A_F10_AMT_DUE1_input").setValue(json[21].Value);

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

    var FORMS_SALES_SERVICES = sap.ui.getCore().getModel("i18n").getProperty("FORMS.SALES_SERVICES") + ":";
    var FORMS_TAXABLE_PURCHASES = sap.ui.getCore().getModel("i18n").getProperty("FORMS.TAXABLE_PURCHASES") + ":";
    var FORMS_COMMERCIAL_RENTALS = sap.ui.getCore().getModel("i18n").getProperty("FORMS.COMMERCIAL_RENTALS") + ":";
    var FORMS_FOOD_BEVERAGE_VENDING = sap.ui.getCore().getModel("i18n").getProperty("FORMS.FOOD_BEVERAGE_VENDING") + ":";
    var FORMS_TAX_DUE = sap.ui.getCore().getModel("i18n").getProperty("FORMS.TAX_DUE") + ":";

    //Text value/dimension greater than rectangle

    doc.text(20, 40, this.lengthformatter(sap.ui.getCore().byId("A_F1_REG_ID1").getText()));
    doc.text(140, 40, sap.ui.getCore().byId("_SSU1_A_F1_REG_ID1_input").getValue());
    doc.rect(138,34,45,10);

    doc.text(20, 55, this.lengthformatter(sap.ui.getCore().byId("A_F2A_PERIODFROM1").getText()));
    doc.text(140, 55, sap.ui.getCore().byId("_SSU1_A_F2A_PERIODFROM1_input").getValue());
    doc.rect(138,49,45,10);

    doc.setFontSize(15);
    doc.text(20, 70, FORMS_SALES_SERVICES);

    doc.setFontSize(14);
    doc.text(20, 85, this.lengthformatter(sap.ui.getCore().byId("A_FA1_SALES_GROSS1").getText()));
    doc.text(140, 85, sap.ui.getCore().byId("_SSU1_A_FA1_SALES_GROSS1_input").getValue());
    doc.rect(138,79,45,10);

    doc.text(20, 100, this.lengthformatter(sap.ui.getCore().byId("A_FA2_SALES_EXMPT1").getText()));
    doc.text(140, 100, sap.ui.getCore().byId("_SSU1_A_FA2_SALES_EXMPT1_input").getValue());
    doc.rect(138,94,45,10);

    doc.text(20, 115, this.lengthformatter(sap.ui.getCore().byId("A_FA3_SALES_TAX_AMT1").getText()));
    doc.text(140, 115, sap.ui.getCore().byId("_SSU1_A_FA3_SALES_TAX_AMT1_input").getValue());
    doc.rect(138,109,45,10);

    doc.text(20, 130, this.lengthformatter(sap.ui.getCore().byId("A_FA4_SALES_TAX_COLL1").getText()));
    doc.text(140, 130, sap.ui.getCore().byId("_SSU1_A_FA4_SALES_TAX_COLL1_input").getValue());
    doc.rect(138,124,45,10);

    doc.setFontSize(15);
    doc.text(20, 145, FORMS_TAXABLE_PURCHASES);

    doc.setFontSize(14);
    doc.text(20, 160, this.lengthformatter(sap.ui.getCore().byId("A_FB3_TAX_PURCH_AMT1").getText()));
    doc.text(140, 160,  sap.ui.getCore().byId("_SSU1_A_FB3_TAX_PURCH_AMT1_input").getValue());
    doc.rect(138,154,45,10);

    doc.text(20, 175, this.lengthformatter(sap.ui.getCore().byId("A_FB4_TAX_PURCH_COL1").getText()));
    doc.text(140, 175, sap.ui.getCore().byId("_SSU1_A_FB4_TAX_PURCH_COL1_input").getValue());
    doc.rect(138,169,45,10);

    doc.setFontSize(15);
    doc.text(20, 190, FORMS_COMMERCIAL_RENTALS);

    doc.setFontSize(14);
    doc.text(20, 205, this.lengthformatter(sap.ui.getCore().byId("A_FC1_RENT_GROSS1").getText()));
    doc.text(140, 205, sap.ui.getCore().byId("_SSU1_A_FC1_RENT_GROSS1_input").getValue());
    doc.rect(138,199,45,10);

    doc.text(20, 220, this.lengthformatter(sap.ui.getCore().byId("A_FC2_RENT_EXMPT1").getText()));
    doc.text(140, 220, sap.ui.getCore().byId("_SSU1_A_FC2_RENT_EXMPT1_input").getValue());
    doc.rect(138,214,45,10);

    doc.text(20, 235, this.lengthformatter(sap.ui.getCore().byId("A_FC3_RENT_TAX_AMT1").getText()));
    doc.text(140, 235, sap.ui.getCore().byId("_SSU1_A_FC3_RENT_TAX_AMT1_input").getValue());
    doc.rect(138,229,45,10);

    doc.text(20, 250, this.lengthformatter(sap.ui.getCore().byId("A_FC4_RENT_TAX_COLL1").getText()));
    doc.text(140, 250, sap.ui.getCore().byId("_SSU1_A_FC4_RENT_TAX_COLL1_input").getValue());
    doc.rect(138,244,45,10);

    doc.setFontSize(15);
    doc.text(20, 265, FORMS_FOOD_BEVERAGE_VENDING);

    doc.setFontSize(14);
    doc.text(20, 280, this.lengthformatter(sap.ui.getCore().byId("A_FD1_FOOD_GROSS1").getText()));
    doc.text(140, 280, sap.ui.getCore().byId("_SSU1_A_FD1_FOOD_GROSS1_input").getValue());
    doc.rect(138,274,45,10);

    doc.addPage();
    doc.setLineWidth(0.5);

    doc.text(20, 40, this.lengthformatter(sap.ui.getCore().byId("A_FD2_FOOD_EXMPT1").getText()));
    doc.text(140, 40, sap.ui.getCore().byId("_SSU1_A_FD2_FOOD_EXMPT1_input").getValue());
    doc.rect(138,34,45,10);

    doc.text(20, 55, this.lengthformatter(sap.ui.getCore().byId("A_FD3_FOOD_TAX_AMT1").getText()));
    doc.text(140, 55, sap.ui.getCore().byId("_SSU1_A_FD3_FOOD_TAX_AMT1_input").getValue());
    doc.rect(138,49,45,10);

    doc.text(20, 70, this.lengthformatter(sap.ui.getCore().byId("A_FD4_FOOD_TAX_COLL1").getText()));
    doc.text(140, 70, sap.ui.getCore().byId("_SSU1_A_FD4_FOOD_TAX_COLL1_input").getValue());
    doc.rect(138,64,45,10);

    doc.setFontSize(15);
    doc.text(20, 85, FORMS_TAX_DUE);

    doc.setFontSize(14);
    doc.text(20, 100, this.lengthformatter(sap.ui.getCore().byId("A_F5_TAX_COLL1").getText()));
    doc.text(140, 100, sap.ui.getCore().byId("_SSU1_A_F5_TAX_COLL1_input").getValue());
    doc.rect(138,94,45,10);

    doc.text(20, 115, this.lengthformatter(sap.ui.getCore().byId("A_F6_LAWFUL_DED1").getText()));
    doc.text(140, 115, sap.ui.getCore().byId("_SSU1_A_F6_LAWFUL_DED1_input").getValue());
    doc.rect(138,109,45,10);

    doc.text(20, 130, this.lengthformatter(sap.ui.getCore().byId("A_F7_TOTAL_TAX_DUE1").getText()));
    doc.text(140, 130, sap.ui.getCore().byId("_SSU1_A_F7_TOTAL_TAX_DUE1_input").getValue());
    doc.rect(138,124,45,10);

    doc.text(20, 145, this.lengthformatter(sap.ui.getCore().byId("A_F8_EST_TAX1").getText()));
    doc.text(140, 145, sap.ui.getCore().byId("_SSU1_A_F8_EST_TAX1_input").getValue());
    doc.rect(138,139,45,10);

    doc.text(20, 160, this.lengthformatter(sap.ui.getCore().byId("A_F9_EST_TAX_DUE1").getText()));
    doc.text(140, 160, sap.ui.getCore().byId("_SSU1_A_F9_EST_TAX_DUE1_input").getValue());
    doc.rect(138,154,45,10);

    doc.text(20, 175, this.lengthformatter(sap.ui.getCore().byId("A_F10_AMT_DUE1").getText()));
    doc.text(140, 175, sap.ui.getCore().byId("_SSU1_A_F10_AMT_DUE1_input").getValue());
    doc.rect(138,169,45,10);

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