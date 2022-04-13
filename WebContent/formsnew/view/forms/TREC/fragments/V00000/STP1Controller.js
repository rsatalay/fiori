jQuery.sap.declare("sap.umc.mobile.forms.view.forms.TREC.fragments.V00000.STP1Controller");
sap.umc.mobile.forms.view.forms["TREC"].fragments.V00000["STP1Controller"]
= {
setView: function(oView) {
this._oView = oView;
this.setDefaultValues();
},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;
},
setDefaultValues: function(){
this.FormID = "STP1";
},
setbEdited:function(bFlag){
var oController = this.getView().getController();
var oFilter = oController.getSelectedFilter();
var sCurrentFormNo = oFilter.data().CurrentFormNo;
var sKey = this.FormID;
if(oController.oAllFormsData[sKey] && oController.oAllFormsData[sKey][sCurrentFormNo])
oController.oAllFormsData[sKey][sCurrentFormNo]["bEdited"]=bFlag;
},
    handleUploadPress: function(oEvent) {
        var oThis = this;
        if (!oThis.fileUploader) {
            oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploaderSTP1", {
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
sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS,sap.umc.mobile.private.app.js.utils.getFormattedText("FORMS.FILE_NOT_SUPPORTED",[oEvent.getParameter("fileType"),sSupportedFileTypes]));
},

 uploadChange: function(evt) {

        var oThis = this;
        var formsID = this.FormID;
        var file = jQuery.sap.domById("fileUploaderSTP1-fu").files[0];
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


sap.ui.getCore().byId("_STP1_C_001_CATEGORY_input").setValue(json[0].Value);
sap.ui.getCore().byId("_STP1_C_002_SETCIT_input").setValue(json[1].Value);
sap.ui.getCore().byId("_STP1_C_003_SETSUT_input").setValue(json[2].Value);
sap.ui.getCore().byId("_STP1_C_004_SETMVT_input").setValue(json[3].Value);
sap.ui.getCore().byId("_STP1_C_005_SETPIT_input").setValue(json[4].Value);
sap.ui.getCore().byId("_STP1_C_010_TITLE_input").setValue(json[5].Value);
sap.ui.getCore().byId("_STP1_C_011_ACADTITLE1_input").setValue(json[6].Value);
sap.ui.getCore().byId("_STP1_C_012_FIRSTNAME_input").setValue(json[7].Value);
sap.ui.getCore().byId("_STP1_C_013_LASTNAME_input").setValue(json[8].Value);
sap.ui.getCore().byId("_STP1_C_014_BIRTHDATE_date").setValue(json[9].Value);
sap.ui.getCore().byId("_STP1_C_015_SEX_input").setValue(json[10].Value);
sap.ui.getCore().byId("_STP1_C_016_MARRIAGE_input").setValue(json[11].Value);
sap.ui.getCore().byId("_STP1_C_017_NATION_input").setValue(json[12].Value);
sap.ui.getCore().byId("_STP1_C_018_OCCUPATION_input").setValue(json[13].Value);
sap.ui.getCore().byId("_STP1_C_019_RELATIONSHIPS_input").setValue(json[14].Value);
sap.ui.getCore().byId("_STP1_C_020_STREET_input").setValue(json[15].Value);
sap.ui.getCore().byId("_STP1_C_021_HOUSENO_input").setValue(json[16].Value);
sap.ui.getCore().byId("_STP1_C_022_POSTCODE_input").setValue(json[17].Value);
sap.ui.getCore().byId("_STP1_C_023_CITY_input").setValue(json[18].Value);
sap.ui.getCore().byId("_STP1_C_024_COUNTRY_input").setValue(json[19].Value);
sap.ui.getCore().byId("_STP1_C_025_REGION_input").setValue(json[20].Value);
sap.ui.getCore().byId("_STP1_C_026_POBOX_input").setValue(json[21].Value);
sap.ui.getCore().byId("_STP1_C_027_POSTCODE2_input").setValue(json[22].Value);
sap.ui.getCore().byId("_STP1_C_028_TELEPHONE_input").setValue(json[23].Value);
sap.ui.getCore().byId("_STP1_C_029_TELEEXT_input").setValue(json[24].Value);
sap.ui.getCore().byId("_STP1_C_030_EMAIL_input").setValue(json[25].Value);
sap.ui.getCore().byId("_STP1_C_035_BANKLAND_input").setValue(json[26].Value);
sap.ui.getCore().byId("_STP1_C_036_BANKKEY_input").setValue(json[27].Value);
sap.ui.getCore().byId("_STP1_C_037_BANKACC_input").setValue(json[28].Value);
sap.ui.getCore().byId("_STP1_C_038_BANKNAME_input").setValue(json[29].Value);
sap.ui.getCore().byId("_STP1_C_039_NAMEAH_input").setValue(json[30].Value);
sap.ui.getCore().byId("_STP1_C_040_CCTYPE_input").setValue(json[31].Value);
sap.ui.getCore().byId("_STP1_C_041_CCNUMBER_input").setValue(json[32].Value);
sap.ui.getCore().byId("_STP1_C_042_CCVALIDITY_input").setValue(json[33].Value);
sap.ui.getCore().byId("_STP1_C_043_CCHOLDER_input").setValue(json[34].Value);
sap.ui.getCore().byId("_STP1_C_045_NAME1_input").setValue(json[35].Value);
sap.ui.getCore().byId("_STP1_C_046_NAME2_input").setValue(json[36].Value);
sap.ui.getCore().byId("_STP1_C_047_BUSINESS_input").setValue(json[37].Value);
sap.ui.getCore().byId("_STP1_C_048_WEBADDRESS_input").setValue(json[38].Value);
sap.ui.getCore().byId("_STP1_C_049_LEGALFORM_input").setValue(json[39].Value);
sap.ui.getCore().byId("_STP1_C_050_FOUNDATION_date").setValue(json[40].Value);
sap.ui.getCore().byId("_STP1_C_060_1RELSHIP_input").setValue(json[41].Value);
sap.ui.getCore().byId("_STP1_C_061_1RELVALFR_date").setValue(json[42].Value);
sap.ui.getCore().byId("_STP1_C_062_1RELVALTO_date").setValue(json[43].Value);
sap.ui.getCore().byId("_STP1_C_063_1RELNAME1_input").setValue(json[44].Value);
sap.ui.getCore().byId("_STP1_C_064_1RELNAME2_input").setValue(json[45].Value);
sap.ui.getCore().byId("_STP1_C_065_1RELIDTYPE_input").setValue(json[46].Value);
sap.ui.getCore().byId("_STP1_C_066_1RELIDNUM_input").setValue(json[47].Value);
sap.ui.getCore().byId("_STP1_C_067_1RELSTREET_input").setValue(json[48].Value);
sap.ui.getCore().byId("_STP1_C_068_1RELHOUSE_input").setValue(json[49].Value);
sap.ui.getCore().byId("_STP1_C_069_1RELPCODE_input").setValue(json[50].Value);
sap.ui.getCore().byId("_STP1_C_070_1RELCITY_input").setValue(json[51].Value);
sap.ui.getCore().byId("_STP1_C_071_1RELCTRY_input").setValue(json[52].Value);
sap.ui.getCore().byId("_STP1_C_072_1RELREG_input").setValue(json[53].Value);
sap.ui.getCore().byId("_STP1_C_073_1RELBPNATURE_input").setValue(json[54].Value);
sap.ui.getCore().byId("_STP1_C_074_1RELACTIVE_input").setValue(json[55].Value);
sap.ui.getCore().byId("_STP1_C_080_2RELSHIP_input").setValue(json[56].Value);
sap.ui.getCore().byId("_STP1_C_081_2RELVALFR_date").setValue(json[57].Value);
sap.ui.getCore().byId("_STP1_C_082_2RELVALTO_date").setValue(json[58].Value);
sap.ui.getCore().byId("_STP1_C_083_2RELNAME1_input").setValue(json[59].Value);
sap.ui.getCore().byId("_STP1_C_084_2RELNAME2_input").setValue(json[60].Value);
sap.ui.getCore().byId("_STP1_C_085_2RELIDTYPE_input").setValue(json[61].Value);
sap.ui.getCore().byId("_STP1_C_086_2RELIDNUM_input").setValue(json[62].Value);
sap.ui.getCore().byId("_STP1_C_087_2RELSTREET_input").setValue(json[63].Value);
sap.ui.getCore().byId("_STP1_C_088_2RELHOUSE_input").setValue(json[64].Value);
sap.ui.getCore().byId("_STP1_C_089_2RELPCODE_input").setValue(json[65].Value);
sap.ui.getCore().byId("_STP1_C_090_2RELCITY_input").setValue(json[66].Value);
sap.ui.getCore().byId("_STP1_C_091_2RELCTRY_input").setValue(json[67].Value);
sap.ui.getCore().byId("_STP1_C_092_2RELREG_input").setValue(json[68].Value);
sap.ui.getCore().byId("_STP1_C_093_2RELBPNATURE_input").setValue(json[69].Value);
sap.ui.getCore().byId("_STP1_C_094_2RELACTIVE_input").setValue(json[70].Value);
sap.ui.getCore().byId("_STP1_C_201_1REVTYPE_input").setValue(json[71].Value);
sap.ui.getCore().byId("_STP1_C_202_1TYPE_input").setValue(json[72].Value);
sap.ui.getCore().byId("_STP1_C_203_1SERIAL_input").setValue(json[73].Value);
sap.ui.getCore().byId("_STP1_C_204_1EMCLASS_input").setValue(json[74].Value);
sap.ui.getCore().byId("_STP1_C_205_1ENGINE_input").setValue(json[75].Value);
sap.ui.getCore().byId("_STP1_C_206_1VOLUME_input").setValue(json[76].Value);
sap.ui.getCore().byId("_STP1_C_207_1REGDATE_date").setValue(json[77].Value);
sap.ui.getCore().byId("_STP1_C_209_1EFT_input").setValue(json[78].Value);
sap.ui.getCore().byId("_STP1_C_210_1VEHICACTIVE_input").setValue(json[79].Value);
sap.ui.getCore().byId("_STP1_C_211_2REVTYPE_input").setValue(json[80].Value);
sap.ui.getCore().byId("_STP1_C_212_2TYPE_input").setValue(json[81].Value);
sap.ui.getCore().byId("_STP1_C_213_2SERIAL_input").setValue(json[82].Value);
sap.ui.getCore().byId("_STP1_C_214_2EMCLASS_input").setValue(json[83].Value);
sap.ui.getCore().byId("_STP1_C_215_2ENGINE_input").setValue(json[84].Value);
sap.ui.getCore().byId("_STP1_C_216_2VOLUME_input").setValue(json[85].Value);
sap.ui.getCore().byId("_STP1_C_217_2REGDATE_date").setValue(json[86].Value);
sap.ui.getCore().byId("_STP1_C_219_2EFT_input").setValue(json[87].Value);
sap.ui.getCore().byId("_STP1_C_220_2VEHICACTIVE_input").setValue(json[88].Value);
sap.ui.getCore().byId("_STP1_C_260_1NAMELOC_input").setValue(json[89].Value);
sap.ui.getCore().byId("_STP1_C_261_1STREET_input").setValue(json[90].Value);
sap.ui.getCore().byId("_STP1_C_262_1HOUSENO_input").setValue(json[91].Value);
sap.ui.getCore().byId("_STP1_C_263_1POSTCODE_input").setValue(json[92].Value);
sap.ui.getCore().byId("_STP1_C_264_1CITY_input").setValue(json[93].Value);
sap.ui.getCore().byId("_STP1_C_265_1COUNTRY_input").setValue(json[94].Value);
sap.ui.getCore().byId("_STP1_C_266_1REGION_input").setValue(json[95].Value);
sap.ui.getCore().byId("_STP1_C_275_1REVTYPCIT_input").setValue(json[96].Value);
sap.ui.getCore().byId("_STP1_C_276_1PERFRCIT_date").setValue(json[97].Value);
sap.ui.getCore().byId("_STP1_C_277_1PERTOCIT_date").setValue(json[98].Value);
sap.ui.getCore().byId("_STP1_C_278_1IDTYPECIT_input").setValue(json[99].Value);
sap.ui.getCore().byId("_STP1_C_279_1IDNUMCIT_input").setValue(json[100].Value);
sap.ui.getCore().byId("_STP1_C_285_1REVTYPSUT_input").setValue(json[101].Value);
sap.ui.getCore().byId("_STP1_C_286_1PERFRSUT_date").setValue(json[102].Value);
sap.ui.getCore().byId("_STP1_C_287_1PERTOSUT_date").setValue(json[103].Value);
sap.ui.getCore().byId("_STP1_C_288_1IDTYPESUT_input").setValue(json[104].Value);
sap.ui.getCore().byId("_STP1_C_289_1IDNUMSUT_input").setValue(json[105].Value);
sap.ui.getCore().byId("_STP1_C_300_2NAMELOC_input").setValue(json[106].Value);
sap.ui.getCore().byId("_STP1_C_301_2STREET_input").setValue(json[107].Value);
sap.ui.getCore().byId("_STP1_C_302_2HOUSENO_input").setValue(json[108].Value);
sap.ui.getCore().byId("_STP1_C_303_2POSTCODE_input").setValue(json[109].Value);
sap.ui.getCore().byId("_STP1_C_304_2CITY_input").setValue(json[110].Value);
sap.ui.getCore().byId("_STP1_C_305_2COUNTRY_input").setValue(json[111].Value);
sap.ui.getCore().byId("_STP1_C_306_2REGION_input").setValue(json[112].Value);
sap.ui.getCore().byId("_STP1_C_315_2REVTYPCIT_input").setValue(json[113].Value);
sap.ui.getCore().byId("_STP1_C_316_2PERFRCIT_date").setValue(json[114].Value);
sap.ui.getCore().byId("_STP1_C_317_2PERTOCIT_date").setValue(json[115].Value);
sap.ui.getCore().byId("_STP1_C_318_2IDTYPECIT_input").setValue(json[116].Value);
sap.ui.getCore().byId("_STP1_C_319_2IDNUMCIT_input").setValue(json[117].Value);
sap.ui.getCore().byId("_STP1_C_325_2REVTYPSUT_input").setValue(json[118].Value);
sap.ui.getCore().byId("_STP1_C_326_2PERFRSUT_date").setValue(json[119].Value);
sap.ui.getCore().byId("_STP1_C_327_2PERTOSUT_date").setValue(json[120].Value);
sap.ui.getCore().byId("_STP1_C_328_2IDTYPESUT_input").setValue(json[121].Value);
sap.ui.getCore().byId("_STP1_C_329_2IDNUMSUT_input").setValue(json[122].Value);
sap.ui.getCore().byId("_STP1_C_350_1REVTYPE_input").setValue(json[123].Value);
sap.ui.getCore().byId("_STP1_C_351_1IDTYPE_input").setValue(json[124].Value);
sap.ui.getCore().byId("_STP1_C_352_1IDNUM_input").setValue(json[125].Value);
sap.ui.getCore().byId("_STP1_C_353_1TAXCODE_input").setValue(json[126].Value);
sap.ui.getCore().byId("_STP1_C_354_1CHILD_input").setValue(json[127].Value);
sap.ui.getCore().byId("_STP1_C_355_1EXEMPT_input").setValue(json[128].Value);
sap.ui.getCore().byId("_STP1_C_356_1INCOME_input").setValue(json[129].Value);
sap.ui.getCore().byId("_STP1_C_357_1PERFRPIT_date").setValue(json[130].Value);
sap.ui.getCore().byId("_STP1_C_358_1PERTOPIT_date").setValue(json[131].Value);
sap.ui.getCore().byId("_STP1_C_359_1PITACTIVE_input").setValue(json[132].Value);
sap.ui.getCore().byId("_STP1_C_360_2REVTYPE_input").setValue(json[133].Value);
sap.ui.getCore().byId("_STP1_C_361_2IDTYPE_input").setValue(json[134].Value);
sap.ui.getCore().byId("_STP1_C_362_2IDNUM_input").setValue(json[135].Value);
sap.ui.getCore().byId("_STP1_C_363_2TAXCODE_input").setValue(json[136].Value);
sap.ui.getCore().byId("_STP1_C_364_2CHILD_input").setValue(json[137].Value);
sap.ui.getCore().byId("_STP1_C_365_2EXEMPT_input").setValue(json[138].Value);
sap.ui.getCore().byId("_STP1_C_366_2INCOME_input").setValue(json[139].Value);
sap.ui.getCore().byId("_STP1_C_367_2PERFRPIT_date").setValue(json[140].Value);
sap.ui.getCore().byId("_STP1_C_368_2PERTOPIT_date").setValue(json[141].Value);
sap.ui.getCore().byId("_STP1_C_369_2PITACTIVE_input").setValue(json[142].Value);

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

csvJSON:function(csv){
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
headers[i] = headers[i].replace(/\W/g,'_');
}
for (i = 1; i < lines.length; i++) {
var obj = {};
var currentline = lines[i].split(/,/g);
var headersLength = headers.length;
for (j = 0; j < headersLength; j++) {
obj[headers[j]] = decodeURIComponent(decodeURIComponent(currentline[j]));
if(obj[headers[j]]==="undefined"){
obj[headers[j]]="";
}
}
result.push(obj);
}
var resultLength = result.length;
for(var k=1;k<=resultLength;k++){
var lastObj = $(result).get(-1);
var bFlag = true;
for(var sProp in lastObj ){
if(!lastObj.hasOwnProperty(sProp)){
continue;
}
if(typeof lastObj[sProp] === "function"){
continue;
}
if(lastObj[sProp] === ""){
continue;
}
else{
bFlag = false;
break;
}
}
if(bFlag){
result.pop();
}
else{
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


doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_001_CATEGORY").getText()));
doc.text(140,40,sap.ui.getCore().byId("_STP1_C_001_CATEGORY_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_002_SETCIT").getText()));
doc.text(140,55,sap.ui.getCore().byId("_STP1_C_002_SETCIT_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_003_SETSUT").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_003_SETSUT_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_004_SETMVT").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_004_SETMVT_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_005_SETPIT").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_005_SETPIT_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_010_TITLE").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_010_TITLE_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_011_ACADTITLE1").getText()));
doc.text(140,130,sap.ui.getCore().byId("_STP1_C_011_ACADTITLE1_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_012_FIRSTNAME").getText()));
doc.text(140,145,sap.ui.getCore().byId("_STP1_C_012_FIRSTNAME_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_013_LASTNAME").getText()));
doc.text(140,160,sap.ui.getCore().byId("_STP1_C_013_LASTNAME_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_014_BIRTHDATE").getText()));
doc.text(140,175,this.dateformatter(sap.ui.getCore().byId("_STP1_C_014_BIRTHDATE_date").getValue()));
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_015_SEX").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_015_SEX_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_016_MARRIAGE").getText()));
doc.text(140,205,sap.ui.getCore().byId("_STP1_C_016_MARRIAGE_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_017_NATION").getText()));
doc.text(140,220,sap.ui.getCore().byId("_STP1_C_017_NATION_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_018_OCCUPATION").getText()));
doc.text(140,235,sap.ui.getCore().byId("_STP1_C_018_OCCUPATION_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_019_RELATIONSHIPS").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_019_RELATIONSHIPS_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_020_STREET").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_020_STREET_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_021_HOUSENO").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_021_HOUSENO_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_022_POSTCODE").getText()));
doc.text(140,40,sap.ui.getCore().byId("_STP1_C_022_POSTCODE_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_023_CITY").getText()));
doc.text(140,55,sap.ui.getCore().byId("_STP1_C_023_CITY_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_024_COUNTRY").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_024_COUNTRY_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_025_REGION").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_025_REGION_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_026_POBOX").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_026_POBOX_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_027_POSTCODE2").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_027_POSTCODE2_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_028_TELEPHONE").getText()));
doc.text(140,130,sap.ui.getCore().byId("_STP1_C_028_TELEPHONE_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_029_TELEEXT").getText()));
doc.text(140,145,sap.ui.getCore().byId("_STP1_C_029_TELEEXT_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_030_EMAIL").getText()));
doc.text(140,160,sap.ui.getCore().byId("_STP1_C_030_EMAIL_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_035_BANKLAND").getText()));
doc.text(140,175,sap.ui.getCore().byId("_STP1_C_035_BANKLAND_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_036_BANKKEY").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_036_BANKKEY_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_037_BANKACC").getText()));
doc.text(140,205,sap.ui.getCore().byId("_STP1_C_037_BANKACC_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_038_BANKNAME").getText()));
doc.text(140,220,sap.ui.getCore().byId("_STP1_C_038_BANKNAME_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_039_NAMEAH").getText()));
doc.text(140,235,sap.ui.getCore().byId("_STP1_C_039_NAMEAH_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_040_CCTYPE").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_040_CCTYPE_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_041_CCNUMBER").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_041_CCNUMBER_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_042_CCVALIDITY").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_042_CCVALIDITY_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_043_CCHOLDER").getText()));
doc.text(140,40,sap.ui.getCore().byId("_STP1_C_043_CCHOLDER_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_045_NAME1").getText()));
doc.text(140,55,sap.ui.getCore().byId("_STP1_C_045_NAME1_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_046_NAME2").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_046_NAME2_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_047_BUSINESS").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_047_BUSINESS_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_048_WEBADDRESS").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_048_WEBADDRESS_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_049_LEGALFORM").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_049_LEGALFORM_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_050_FOUNDATION").getText()));
doc.text(140,130,this.dateformatter(sap.ui.getCore().byId("_STP1_C_050_FOUNDATION_date").getValue()));
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_060_1RELSHIP").getText()));
doc.text(140,145,sap.ui.getCore().byId("_STP1_C_060_1RELSHIP_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_061_1RELVALFR").getText()));
doc.text(140,160,this.dateformatter(sap.ui.getCore().byId("_STP1_C_061_1RELVALFR_date").getValue()));
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_062_1RELVALTO").getText()));
doc.text(140,175,this.dateformatter(sap.ui.getCore().byId("_STP1_C_062_1RELVALTO_date").getValue()));
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_063_1RELNAME1").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_063_1RELNAME1_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_064_1RELNAME2").getText()));
doc.text(140,205,sap.ui.getCore().byId("_STP1_C_064_1RELNAME2_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_065_1RELIDTYPE").getText()));
doc.text(140,220,sap.ui.getCore().byId("_STP1_C_065_1RELIDTYPE_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_066_1RELIDNUM").getText()));
doc.text(140,235,sap.ui.getCore().byId("_STP1_C_066_1RELIDNUM_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_067_1RELSTREET").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_067_1RELSTREET_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_068_1RELHOUSE").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_068_1RELHOUSE_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_069_1RELPCODE").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_069_1RELPCODE_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_070_1RELCITY").getText()));
doc.text(140,40,sap.ui.getCore().byId("_STP1_C_070_1RELCITY_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_071_1RELCTRY").getText()));
doc.text(140,55,sap.ui.getCore().byId("_STP1_C_071_1RELCTRY_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_072_1RELREG").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_072_1RELREG_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_073_1RELBPNATURE").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_073_1RELBPNATURE_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_074_1RELACTIVE").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_074_1RELACTIVE_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_080_2RELSHIP").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_080_2RELSHIP_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_081_2RELVALFR").getText()));
doc.text(140,130,this.dateformatter(sap.ui.getCore().byId("_STP1_C_081_2RELVALFR_date").getValue()));
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_082_2RELVALTO").getText()));
doc.text(140,145,this.dateformatter(sap.ui.getCore().byId("_STP1_C_082_2RELVALTO_date").getValue()));
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_083_2RELNAME1").getText()));
doc.text(140,160,sap.ui.getCore().byId("_STP1_C_083_2RELNAME1_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_084_2RELNAME2").getText()));
doc.text(140,175,sap.ui.getCore().byId("_STP1_C_084_2RELNAME2_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_085_2RELIDTYPE").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_085_2RELIDTYPE_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_086_2RELIDNUM").getText()));
doc.text(140,205,sap.ui.getCore().byId("_STP1_C_086_2RELIDNUM_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_087_2RELSTREET").getText()));
doc.text(140,220,sap.ui.getCore().byId("_STP1_C_087_2RELSTREET_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_088_2RELHOUSE").getText()));
doc.text(140,235,sap.ui.getCore().byId("_STP1_C_088_2RELHOUSE_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_089_2RELPCODE").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_089_2RELPCODE_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_090_2RELCITY").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_090_2RELCITY_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_091_2RELCTRY").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_091_2RELCTRY_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_092_2RELREG").getText()));
doc.text(140,40,sap.ui.getCore().byId("_STP1_C_092_2RELREG_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_093_2RELBPNATURE").getText()));
doc.text(140,55,sap.ui.getCore().byId("_STP1_C_093_2RELBPNATURE_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_094_2RELACTIVE").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_094_2RELACTIVE_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_201_1REVTYPE").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_201_1REVTYPE_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_202_1TYPE").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_202_1TYPE_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_203_1SERIAL").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_203_1SERIAL_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_204_1EMCLASS").getText()));
doc.text(140,130,sap.ui.getCore().byId("_STP1_C_204_1EMCLASS_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_205_1ENGINE").getText()));
doc.text(140,145,sap.ui.getCore().byId("_STP1_C_205_1ENGINE_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_206_1VOLUME").getText()));
doc.text(140,160,sap.ui.getCore().byId("_STP1_C_206_1VOLUME_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_207_1REGDATE").getText()));
doc.text(140,175,this.dateformatter(sap.ui.getCore().byId("_STP1_C_207_1REGDATE_date").getValue()));
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_209_1EFT").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_209_1EFT_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_210_1VEHICACTIVE").getText()));
doc.text(140,205,sap.ui.getCore().byId("_STP1_C_210_1VEHICACTIVE_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_211_2REVTYPE").getText()));
doc.text(140,220,sap.ui.getCore().byId("_STP1_C_211_2REVTYPE_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_212_2TYPE").getText()));
doc.text(140,235,sap.ui.getCore().byId("_STP1_C_212_2TYPE_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_213_2SERIAL").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_213_2SERIAL_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_214_2EMCLASS").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_214_2EMCLASS_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_215_2ENGINE").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_215_2ENGINE_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_216_2VOLUME").getText()));
doc.text(140,40,sap.ui.getCore().byId("_STP1_C_216_2VOLUME_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_217_2REGDATE").getText()));
doc.text(140,55,this.dateformatter(sap.ui.getCore().byId("_STP1_C_217_2REGDATE_date").getValue()));
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_219_2EFT").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_219_2EFT_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_220_2VEHICACTIVE").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_220_2VEHICACTIVE_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_260_1NAMELOC").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_260_1NAMELOC_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_261_1STREET").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_261_1STREET_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_262_1HOUSENO").getText()));
doc.text(140,130,sap.ui.getCore().byId("_STP1_C_262_1HOUSENO_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_263_1POSTCODE").getText()));
doc.text(140,145,sap.ui.getCore().byId("_STP1_C_263_1POSTCODE_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_264_1CITY").getText()));
doc.text(140,160,sap.ui.getCore().byId("_STP1_C_264_1CITY_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_265_1COUNTRY").getText()));
doc.text(140,175,sap.ui.getCore().byId("_STP1_C_265_1COUNTRY_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_266_1REGION").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_266_1REGION_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_275_1REVTYPCIT").getText()));
doc.text(140,205,sap.ui.getCore().byId("_STP1_C_275_1REVTYPCIT_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_276_1PERFRCIT").getText()));
doc.text(140,220,this.dateformatter(sap.ui.getCore().byId("_STP1_C_276_1PERFRCIT_date").getValue()));
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_277_1PERTOCIT").getText()));
doc.text(140,235,this.dateformatter(sap.ui.getCore().byId("_STP1_C_277_1PERTOCIT_date").getValue()));
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_278_1IDTYPECIT").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_278_1IDTYPECIT_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_279_1IDNUMCIT").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_279_1IDNUMCIT_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_285_1REVTYPSUT").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_285_1REVTYPSUT_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_286_1PERFRSUT").getText()));
doc.text(140,40,this.dateformatter(sap.ui.getCore().byId("_STP1_C_286_1PERFRSUT_date").getValue()));
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_287_1PERTOSUT").getText()));
doc.text(140,55,this.dateformatter(sap.ui.getCore().byId("_STP1_C_287_1PERTOSUT_date").getValue()));
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_288_1IDTYPESUT").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_288_1IDTYPESUT_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_289_1IDNUMSUT").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_289_1IDNUMSUT_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_300_2NAMELOC").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_300_2NAMELOC_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_301_2STREET").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_301_2STREET_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_302_2HOUSENO").getText()));
doc.text(140,130,sap.ui.getCore().byId("_STP1_C_302_2HOUSENO_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_303_2POSTCODE").getText()));
doc.text(140,145,sap.ui.getCore().byId("_STP1_C_303_2POSTCODE_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_304_2CITY").getText()));
doc.text(140,160,sap.ui.getCore().byId("_STP1_C_304_2CITY_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_305_2COUNTRY").getText()));
doc.text(140,175,sap.ui.getCore().byId("_STP1_C_305_2COUNTRY_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_306_2REGION").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_306_2REGION_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_315_2REVTYPCIT").getText()));
doc.text(140,205,sap.ui.getCore().byId("_STP1_C_315_2REVTYPCIT_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_316_2PERFRCIT").getText()));
doc.text(140,220,this.dateformatter(sap.ui.getCore().byId("_STP1_C_316_2PERFRCIT_date").getValue()));
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_317_2PERTOCIT").getText()));
doc.text(140,235,this.dateformatter(sap.ui.getCore().byId("_STP1_C_317_2PERTOCIT_date").getValue()));
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_318_2IDTYPECIT").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_318_2IDTYPECIT_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_319_2IDNUMCIT").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_319_2IDNUMCIT_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_325_2REVTYPSUT").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_325_2REVTYPSUT_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_326_2PERFRSUT").getText()));
doc.text(140,40,this.dateformatter(sap.ui.getCore().byId("_STP1_C_326_2PERFRSUT_date").getValue()));
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_327_2PERTOSUT").getText()));
doc.text(140,55,this.dateformatter(sap.ui.getCore().byId("_STP1_C_327_2PERTOSUT_date").getValue()));
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_328_2IDTYPESUT").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_328_2IDTYPESUT_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_329_2IDNUMSUT").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_329_2IDNUMSUT_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_350_1REVTYPE").getText()));
doc.text(140,100,sap.ui.getCore().byId("_STP1_C_350_1REVTYPE_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_351_1IDTYPE").getText()));
doc.text(140,115,sap.ui.getCore().byId("_STP1_C_351_1IDTYPE_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_352_1IDNUM").getText()));
doc.text(140,130,sap.ui.getCore().byId("_STP1_C_352_1IDNUM_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("C_353_1TAXCODE").getText()));
doc.text(140,145,sap.ui.getCore().byId("_STP1_C_353_1TAXCODE_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("C_354_1CHILD").getText()));
doc.text(140,160,sap.ui.getCore().byId("_STP1_C_354_1CHILD_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("C_355_1EXEMPT").getText()));
doc.text(140,175,sap.ui.getCore().byId("_STP1_C_355_1EXEMPT_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("C_356_1INCOME").getText()));
doc.text(140,190,sap.ui.getCore().byId("_STP1_C_356_1INCOME_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("C_357_1PERFRPIT").getText()));
doc.text(140,205,this.dateformatter(sap.ui.getCore().byId("_STP1_C_357_1PERFRPIT_date").getValue()));
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("C_358_1PERTOPIT").getText()));
doc.text(140,220,this.dateformatter(sap.ui.getCore().byId("_STP1_C_358_1PERTOPIT_date").getValue()));
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("C_359_1PITACTIVE").getText()));
doc.text(140,235,sap.ui.getCore().byId("_STP1_C_359_1PITACTIVE_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("C_360_2REVTYPE").getText()));
doc.text(140,250,sap.ui.getCore().byId("_STP1_C_360_2REVTYPE_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("C_361_2IDTYPE").getText()));
doc.text(140,265,sap.ui.getCore().byId("_STP1_C_361_2IDTYPE_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("C_362_2IDNUM").getText()));
doc.text(140,280,sap.ui.getCore().byId("_STP1_C_362_2IDNUM_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("C_363_2TAXCODE").getText()));
doc.text(140,40,sap.ui.getCore().byId("_STP1_C_363_2TAXCODE_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("C_364_2CHILD").getText()));
doc.text(140,55,sap.ui.getCore().byId("_STP1_C_364_2CHILD_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("C_365_2EXEMPT").getText()));
doc.text(140,70,sap.ui.getCore().byId("_STP1_C_365_2EXEMPT_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("C_366_2INCOME").getText()));
doc.text(140,85,sap.ui.getCore().byId("_STP1_C_366_2INCOME_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("C_367_2PERFRPIT").getText()));
doc.text(140,100,this.dateformatter(sap.ui.getCore().byId("_STP1_C_367_2PERFRPIT_date").getValue()));
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("C_368_2PERTOPIT").getText()));
doc.text(140,115,this.dateformatter(sap.ui.getCore().byId("_STP1_C_368_2PERTOPIT_date").getValue()));
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("C_369_2PITACTIVE").getText()));
doc.text(140,130,sap.ui.getCore().byId("_STP1_C_369_2PITACTIVE_input").getValue());
doc.rect(138,124,45,10);

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
onChange:function(evt){
var oSource = evt.getSource();
if(sap.m.DatePicker.prototype.isPrototypeOf(oSource)){
if(evt.mParameters.valid===false){
oSource.setValueState(sap.ui.core.ValueState.Error);
var sMsg = sap.umc.mobile.private.app.js.utils.getFormattedText("FORMS.DATE_FORMAT",[oSource.getDisplayFormat()]);
oSource.setValueStateText(sMsg);
oSource.focus(true);
}
if(evt.mParameters.valid===true){
oSource.setValueState(sap.ui.core.ValueState.None);
oSource.setValueStateText("");
}
}
this.setbEdited(true);
},
};
