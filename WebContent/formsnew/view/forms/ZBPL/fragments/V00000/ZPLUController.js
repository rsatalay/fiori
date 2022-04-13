jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZBPL.fragments.V00000.ZPLUController");
sap.umc.mobile.forms.view.forms["ZBPL"].fragments.V00000["ZPLUController"]
= {		
setView: function(oView) {
this._oView = oView;
this.setDefaultValues();
//this.initializeCDVisible();
//console.log("Ingres?");
//this.onDatosContSelect(this);
},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;
},
setDefaultValues: function(){
this.FormID = "ZPLU";
this._initLogo();
this.initializeCDVisible();
this.initializeRURALVisible();
this.initializeVIAVisible();
this.initializePJURVisible();
this.iniciarMatriculas()
this.loadVia(this);   // Cargar Las vias 
this.loadViaRural(this);   // Cargar Las vias Rural
this.loadLetraVia(this); // Cargar las letras Via
this.loadBis(this); // Cargar Bis
this.loadSector(this); // Cargar Sector
this.loadUnidad(this); // Cargar Unidad
this.iniciarVariableVacia();

//var oModel2 = new sap.ui.model.json.JSONModel({
//	STATUS: {}	});
//this.getView().setModel(oModel2, "Presave");
//this.getView().getModel("Presave").setProperty("/STATUS",0);
//sap.ui.getCore().byId("idCDCheckBox").setValue(false);
console.log("inicializacion formulario");

},	
_initLogo: function() {
	var oData = {};
		oData.LogoAlcaldia = "home/img/LogoAlcaldia.jpg";
	this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "Images");
},
setbEdited:function(bFlag){
var oController = this.getView().getController();
var oFilter = oController.getSelectedFilter();
var sCurrentFormNo = oFilter.data().CurrentFormNo;
var sKey = this.FormID;
if(oController.oAllFormsData[sKey] && oController.oAllFormsData[sKey][sCurrentFormNo])
oController.oAllFormsData[sKey][sCurrentFormNo]["bEdited"]=bFlag;
},  // Se inicializa variable de direcciOn vacIa
iniciarVariableVacia:function(){
	var oModelDir = new sap.ui.model.json.JSONModel({
		result: {}
		});
		this.getView().setModel(oModelDir, "Dir");
		this.getView().getModel("Dir").setProperty("/result","");


},// Al Iniciar formulario se muestra el Representante legal si es persona Juridica

onIniciarTipoPersona:function(){

	var tipoPersona = this.getView().getModel("ZPLUModel").getProperty("/A_27_TIPOPERS");
	if (tipoPersona == "PNAT"){
		this.getView().getModel("PJURVisible").setProperty("/visible",false);
	}else{
		this.getView().getModel("PJURVisible").setProperty("/visible",true);
	}
},


onCDSelected:function(evt){
	

console.log("Pueba");
this.getView().getModel("CDVisible").setProperty("/visible",evt.getSource().getSelected());

//When checked
if(evt.getSource().getSelected()){

	this.getView().getModel("CDVisible").setProperty("/visible",true);
	this.getView().getModel("RURALVisible").setProperty("/visible",false);
	this.getView().getModel("VIAVisible").setProperty("/visible",true);
}


//When unchecked
if(!(evt.getSource().getSelected())){

	this.getView().getModel("CDVisible").setProperty("/visible",false);
	this.getView().getModel("RURALVisible").setProperty("/visible",false);
	this.getView().getModel("VIAVisible").setProperty("/visible",false);
//this.getView().getModel(oController.FormID+"Model").setProperty("/C_275_1REVTYPCIT","0");
	   
}
},//To set visible-false for the Modify Address 
initializeCDVisible:function(){
	var oCDVisibleModel = this.getDataProvider().initializeCDVisible();
	this.getView().setModel(oCDVisibleModel,"CDVisible"); 
	this.getView().getModel("CDVisible").setProperty("/visible",true);
},
// ACASTANEDA
initializeRURALVisible:function(){
	var oRURALVisibleModel = this.getDataProvider().initializeRURALVisible();
	this.getView().setModel(oRURALVisibleModel,"RURALVisible"); 
},
//ACASTANEDA Visibilidad de persona Juridica
initializePJURVisible:function(){
	var oPJURVisibleModel = this.getDataProvider().initializePJURVisible();
	this.getView().setModel(oPJURVisibleModel,"PJURVisible"); 
},
// ACASTANEDA
initializeVIAVisible:function(){
	var oVIAVisibleModel = this.getDataProvider().initializeVIAVisiblel();
	this.getView().setModel(oVIAVisibleModel,"VIAVisible"); 
	this.getView().getModel("VIAVisible").setProperty("/visible",true);
},

iniciarMatriculas:function(){
		var bp = this.getDataProvider().getAccount().oData.AccountID;
		//this.getView().getModel("Z2ICModel").getProperty("/A_004_ANOGRAV");

		
		var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
		this.getView().setModel(omodel,"ZODATA_MCF_SRV");  // Van una sola vez en la aplicaciOn 
		var oModelMatriculas = new sap.ui.model.json.JSONModel({
			results: []
			});
			this.getView().setModel(oModelMatriculas, "MatriculaPlu");
		this.getView().getModel("ZODATA_MCF_SRV").read("/MatriculasPlusvaliaSet",{
			filters: [new sap.ui.model.Filter({
			      path: "Partner",
			      operator: sap.ui.model.FilterOperator.EQ,
			      value1: bp
			     })],
			success:function(odata){
				this.getView().getModel("MatriculaPlu").setProperty("/results",odata.results);

			}.bind(this),  
			error:function(odata){

			}
		});
		
		 	 
},


//  CARGA DE ODATAS con informaci?n de la direcci?n
loadVia:function(){
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"ViaOdata");
	var oModelVia = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelVia, "Via");
	this.getView().getModel("ViaOdata").read("/ViasSet",{
		success:function(odata){
			this.getView().getModel("Via").setProperty("/results",odata.results);
		}.bind(this),  
		error:function(odata){
		}
	});
},
loadViaRural:function(){
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"ViaRuralOdata");
	var oModelViaRural = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelViaRural, "ViaRural");
	this.getView().getModel("ViaRuralOdata").read("/ViaRuralSet",{
		success:function(odata){
			this.getView().getModel("ViaRural").setProperty("/results",odata.results);
		}.bind(this),  
		error:function(odata){
		}
	});
},

loadLetraVia:function(){
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"LetraViaOdata");
	var oModelLetraVia = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelLetraVia, "LetraVia");
	this.getView().getModel("LetraViaOdata").read("/LetraViaSet",{
		success:function(odata){
			this.getView().getModel("LetraVia").setProperty("/results",odata.results);
		}.bind(this),  
		error:function(odata){
		}
	});
},loadBis:function(){  // Load Bis
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"BisOdata");
	var oModelBis = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelBis, "Bis");
	this.getView().getModel("BisOdata").read("/BisSet",{
		success:function(odata){
			this.getView().getModel("Bis").setProperty("/results",odata.results);
		}.bind(this),  
		error:function(odata){
		}
	});
},loadSector:function(){  // Load Bis
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"SectorOdata");
	var oModelSector = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelSector, "Sector");
	this.getView().getModel("SectorOdata").read("/SectorSet",{
		success:function(odata){
			this.getView().getModel("Sector").setProperty("/results",odata.results);
		}.bind(this),  
		error:function(odata){
		}
	});
},loadUnidad:function(){  // Load Bis
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	this.getView().setModel(omodel,"UnidadOdata");
	var oModelUnidad = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelUnidad, "Unidad");
	this.getView().getModel("UnidadOdata").read("/UnidadSet",{
		success:function(odata){
			this.getView().getModel("Unidad").setProperty("/results",odata.results);
		}.bind(this),  
		error:function(odata){
		}
	});
},

    handleUploadPress: function(oEvent) {
        var oThis = this;
        if (!oThis.fileUploader) {
            oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploaderZPLU", {
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
        var file = jQuery.sap.domById("fileUploaderZPLU-fu").files[0];
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


sap.ui.getCore().byId("_ZPLU_A_01_VIA_input").setValue(json[0].Value);
sap.ui.getCore().byId("_ZPLU_A_02_NUMVIA_input").setValue(json[1].Value);
sap.ui.getCore().byId("_ZPLU_A_03_LETRAVIA_input").setValue(json[2].Value);
sap.ui.getCore().byId("_ZPLU_A_04_NUMSECVIA_input").setValue(json[3].Value);
sap.ui.getCore().byId("_ZPLU_A_05_LETRASECVIA_input").setValue(json[4].Value);
sap.ui.getCore().byId("_ZPLU_A_06_BISVIA_input").setValue(json[5].Value);
sap.ui.getCore().byId("_ZPLU_A_07_SECTORVIA_input").setValue(json[6].Value);
sap.ui.getCore().byId("_ZPLU_A_08_CRUCE_input").setValue(json[7].Value);
sap.ui.getCore().byId("_ZPLU_A_09_NUMCRUCE_input").setValue(json[8].Value);
sap.ui.getCore().byId("_ZPLU_A_10_LETRACRUCE_input").setValue(json[9].Value);
sap.ui.getCore().byId("_ZPLU_A_11_NUMSECCRUCE_input").setValue(json[10].Value);
sap.ui.getCore().byId("_ZPLU_A_12_LETRASECCRUCE_input").setValue(json[11].Value);
sap.ui.getCore().byId("_ZPLU_A_13_BISCRUCE_input").setValue(json[12].Value);
sap.ui.getCore().byId("_ZPLU_A_14_SECTORCRUCE_input").setValue(json[13].Value);
sap.ui.getCore().byId("_ZPLU_A_15_ULTDIGPLACA_input").setValue(json[14].Value);
sap.ui.getCore().byId("_ZPLU_A_16_BLOQUE_input").setValue(json[15].Value);
sap.ui.getCore().byId("_ZPLU_A_17_PISO_input").setValue(json[16].Value);
sap.ui.getCore().byId("_ZPLU_A_18_UNIDAD_input").setValue(json[17].Value);
sap.ui.getCore().byId("_ZPLU_A_19_DESUNIDAD_input").setValue(json[18].Value);
sap.ui.getCore().byId("_ZPLU_A_20_REPRESENTANTE_LEGAL_input").setValue(json[19].Value);
sap.ui.getCore().byId("_ZPLU_A_21_EMAIL_input").setValue(json[20].Value);
sap.ui.getCore().byId("_ZPLU_A_22_DIRECCIONACTUAL_input").setValue(json[21].Value);
sap.ui.getCore().byId("_ZPLU_A_23_NIT_REPRESENTANTE_input").setValue(json[22].Value);
sap.ui.getCore().byId("_ZPLU_A_24_DIRECCIONCORREGIDA_input").setValue(json[23].Value);
sap.ui.getCore().byId("_ZPLU_A_25_DIRRURAL_input").setValue(json[24].Value);
sap.ui.getCore().byId("_ZPLU_A_26_DIRNUMRUR_input").setValue(json[25].Value);
sap.ui.getCore().byId("_ZPLU_A_27_TIPOPERS_input").setValue(json[26].Value);


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


doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_01_VIA").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZPLU_A_01_VIA_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_02_NUMVIA").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZPLU_A_02_NUMVIA_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_03_LETRAVIA").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZPLU_A_03_LETRAVIA_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_04_NUMSECVIA").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZPLU_A_04_NUMSECVIA_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_05_LETRASECVIA").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZPLU_A_05_LETRASECVIA_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_06_BISVIA").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZPLU_A_06_BISVIA_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_07_SECTORVIA").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZPLU_A_07_SECTORVIA_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_08_CRUCE").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZPLU_A_08_CRUCE_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_09_NUMCRUCE").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZPLU_A_09_NUMCRUCE_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_10_LETRACRUCE").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZPLU_A_10_LETRACRUCE_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_11_NUMSECCRUCE").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZPLU_A_11_NUMSECCRUCE_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_12_LETRASECCRUCE").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZPLU_A_12_LETRASECCRUCE_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_13_BISCRUCE").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZPLU_A_13_BISCRUCE_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_14_SECTORCRUCE").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZPLU_A_14_SECTORCRUCE_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_15_ULTDIGPLACA").getText()));
doc.text(140,250,sap.ui.getCore().byId("_ZPLU_A_15_ULTDIGPLACA_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_16_BLOQUE").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZPLU_A_16_BLOQUE_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_17_PISO").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZPLU_A_17_PISO_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_18_UNIDAD").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZPLU_A_18_UNIDAD_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_19_DESUNIDAD").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZPLU_A_19_DESUNIDAD_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_20_REPRESENTANTE_LEGAL").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZPLU_A_20_REPRESENTANTE_LEGAL_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_21_EMAIL").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZPLU_A_21_EMAIL_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_22_DIRECCIONACTUAL").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZPLU_A_22_DIRECCIONACTUAL_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_23_NIT_REPRESENTANTE").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZPLU_A_23_NIT_REPRESENTANTE_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_24_DIRECCIONCORREGIDA").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZPLU_A_24_DIRECCIONCORREGIDA_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_25_DIRRURAL").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZPLU_A_25_DIRRURAL_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_26_DIRNUMRUR").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZPLU_A_26_DIRNUMRUR_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_27_TIPOPERS").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZPLU_A_27_TIPOPERS_input").getValue());
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
     
     padStart:function(targetLength,padString,value){

	        if (value.length > targetLength) {
	            return value;
	        }
	        else {
	            targetLength = targetLength-value.length;
	            if (targetLength > padString.length) {
	                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
	            }
	            return padString.slice(0,targetLength) + value;
	        }
     },
onChange:function(evt){
		
var oSource = evt.getSource();


var v = this.getView().getModel("ZPLUModel").getProperty("/A_01_VIA");

	if (v !== "R" && v !== "N"){
	if(v == ""){
		v = " ";
	}
			this.getView().getModel("RURALVisible").setProperty("/visible",false);	
			this.getView().getModel("CDVisible").setProperty("/visible",true);
		
var nv = this.getView().getModel("ZPLUModel").getProperty("/A_02_NUMVIA");
if(nv == ""  || nv == "000" ){
	nv = "   ";
	this.getView().getModel("ZPLUModel").setProperty("/A_02_NUMVIA","   ")
}else 

	{
	nv = nv.replace(/_/g, "");
	if (!String.prototype.padStart) {
		nv =  this.padStart("3","0",nv);
	}else{
		nv  = nv.padStart(3, "0");
	}

}
var l = this.getView().getModel("ZPLUModel").getProperty("/A_03_LETRAVIA");
if(l == ""){
	l = " ";
}
var ns = this.getView().getModel("ZPLUModel").getProperty("/A_04_NUMSECVIA");
if(ns == "" || ns == "00" ){
	ns = "  ";
	this.getView().getModel("ZPLUModel").setProperty("/A_04_NUMSECVIA","  ");
}else {
	ns = ns.replace(/_/g, "");
	if (!String.prototype.padStart) {
		ns =  this.padStart("2","0",ns);
	}else{
		ns  = ns.padStart(2, "0");
	}
	

}
var ls = this.getView().getModel("ZPLUModel").getProperty("/A_05_LETRASECVIA");
if(ls == ""){
	ls = " ";
}
var bis = this.getView().getModel("ZPLUModel").getProperty("/A_06_BISVIA");
if(bis == ""){
	bis = " ";
}
var sg = this.getView().getModel("ZPLUModel").getProperty("/A_07_SECTORVIA");
if(sg == ""){
	sg = " ";
}
var cr = this.getView().getModel("ZPLUModel").getProperty("/A_08_CRUCE");
if(cr == ""){
	cr = " ";
}
var nc = this.getView().getModel("ZPLUModel").getProperty("/A_09_NUMCRUCE");
if(nc == ""|| nc == "000" ){
	nc = "   ";
	this.getView().getModel("ZPLUModel").setProperty("/A_09_NUMCRUCE","   ");
} else {
	nc = nc.replace(/_/g, "");
	if (!String.prototype.padStart) {
		nc =  this.padStart("3","0",nc);
	}else{
		nc  = nc.padStart(3, "0");
	}

}

var lc = this.getView().getModel("ZPLUModel").getProperty("/A_10_LETRACRUCE");
if(lc == ""){
	lc = " ";

}

var nsc = this.getView().getModel("ZPLUModel").getProperty("/A_11_NUMSECCRUCE");
if(nsc == "" || nsc == "00" ){
	nsc = "  ";
	this.getView().getModel("ZPLUModel").setProperty("/A_11_NUMSECCRUCE","  ");
} else {
	nsc = nsc.replace(/_/g, "");
	if (!String.prototype.padStart) {
		nsc =  this.padStart("2","0",nsc);
	}else{
		nsc  = nsc.padStart(2, "0");
	}

}

var lsc = this.getView().getModel("ZPLUModel").getProperty("/A_12_LETRASECCRUCE");
if(lsc  == ""){
	lsc = " ";
}

var bis2 = this.getView().getModel("ZPLUModel").getProperty("/A_13_BISCRUCE");
if(bis2 == ""){
	bis2 = " ";
}

var sg2 = this.getView().getModel("ZPLUModel").getProperty("/A_14_SECTORCRUCE");
if(sg2 == ""){
	sg2 = " ";
}

var udp = this.getView().getModel("ZPLUModel").getProperty("/A_15_ULTDIGPLACA");
if(udp == "" || udp == "000" ){
	udp = "   ";
	this.getView().getModel("ZPLUModel").setProperty("/A_15_ULTDIGPLACA","   ");
} else {
	udp = udp.replace(/_/g, "");
	if (!String.prototype.padStart) {
		udp =  this.padStart("3","0",udp);
	}else{
		udp = udp.padStart(3, "0");
	}

}


var blq = this.getView().getModel("ZPLUModel").getProperty("/A_16_BLOQUE");
if(blq  == ""){
	blq = "   ";
} else {
	blq = blq.replace(/_/g, "");
	if (!String.prototype.padStart) {
		blq =  this.padStart("3","0",blq);
	}else{
		blq  = blq.padStart(3, "0");
	}

}

var piso = this.getView().getModel("ZPLUModel").getProperty("/A_17_PISO");
if(piso == ""){
	piso = "  ";
} else {
	piso = piso.replace(/_/g, "");
	if (!String.prototype.padStart) {
		piso =  this.padStart("2","0",piso);
	}else{
		piso  = piso.padStart(2, "0");
	}

}
var un = this.getView().getModel("ZPLUModel").getProperty("/A_18_UNIDAD");
if(un == "" || un == "00" ){
	un = "  ";
	this.getView().getModel("ZPLUModel").setProperty("/A_18_UNIDAD","  ");
}else {
	un = un.replace(/_/g, "");
	if (!String.prototype.padStart) {
		un =  this.padStart("2","0",un);
	}else{
		un  = un.padStart(2, "0");
	}

}
var tun = this.getView().getModel("ZPLUModel").getProperty("/A_19_DESUNIDAD");
if(tun == ""){
	tun = " ";
}
var dir = v.charAt(0)  +  nv.charAt(0) +  nv.charAt(1)  +  nv.charAt(2) + l.substring(0,1) + ns.charAt(0) + ns.charAt(1) + ls.charAt(0) + bis.charAt(0) + sg.charAt(0) + cr.charAt(0) + nc.charAt(0) + nc.charAt(1)  + nc.charAt(2)  + lc.charAt(0) + nsc.charAt(0)+ nsc.charAt(1) + lsc.charAt(0) + bis2.charAt(0) + sg2.charAt(0) + udp.charAt(0)+ udp.charAt(1)+ udp.charAt(2) + 
          blq.charAt(0) + blq.charAt(1) + blq.charAt(2) + piso.charAt(0) + piso.charAt(1) + un.charAt(0) + un.charAt(1) + tun.charAt(0); 
console.log(dir);
this.getView().getModel("ZPLUModel").setProperty("/A_24_DIRECCIONCORREGIDA",dir);
	} else {		// En caso de que sea Rural o Nangos
		
		this.getView().getModel("RURALVisible").setProperty("/visible",true);
		this.getView().getModel("CDVisible").setProperty("/visible",false);
		
		var str1 = "*"
		var str2 = this.getView().getModel("ZPLUModel").getProperty("/A_25_DIRRURAL");
		var str3 = this.getView().getModel("ZPLUModel").getProperty("/A_26_DIRNUMRUR");
		var str4 = str1.concat(str3," ",str2);
	
		this.getView().getModel("ZPLUModel").setProperty("/A_24_DIRECCIONCORREGIDA",str4);

		
		;
	};

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

onShowAdress:function(){
	var DirCod = this.getView().getModel("ZPLUModel").getProperty("/A_24_DIRECCIONCORREGIDA");
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
	omodel.setUseBatch(false);
	this.getView().setModel(omodel,"DirOdata");
	var oModelDir = new sap.ui.model.json.JSONModel({
		result: {}
		});
		this.getView().setModel(oModelDir, "Dir");
    var that = this;
	this.getView().getModel("DirOdata").read("/DireccionSet('"+ DirCod +"')",{
	
		success:function(odata){
			this.getView().getModel("Dir").setProperty("/result",odata.Dirint);
			console.log(odata.Dirint);
			omodel.setUseBatch(true);
		}.bind(this),  
		error:function(odata){
		}
	});},onEraseAdress:function(){

/*
		this.getView().getModel("ZPLUModel").setProperty("/A_24_DIRECCIONCORREGIDA","");
		sap.ui.getCore().byId("_ZPLU_A_02_NUMVIA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_03_LETRAVIA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_04_NUMSECVIA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_05_LETRASECVIA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_06_BISVIA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_07_SECTORVIA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_08_CRUCE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_09_NUMCRUCE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_10_LETRACRUCE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_11_NUMSECCRUCE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_12_LETRASECCRUCE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_13_BISCRUCE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_14_SECTORCRUCE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_15_ULTDIGPLACA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_16_BLOQUE_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_17_PISO_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_18_UNIDAD_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_19_DESUNIDAD_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_24_DIRECCIONCORREGIDA_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_25_DIRRURAL_input").setValue("");
		sap.ui.getCore().byId("_ZPLU_A_26_DIRNUMRUR_input").setValue("");	
		sap.ui.getCore().byId("_ZPLU_A_26_DIRNUMRUR_input").setValue(""); */

		this.getView().getModel("ZPLUModel").setProperty("/A_01_VIA","");		
		this.getView().getModel("ZPLUModel").setProperty("/A_02_NUMVIA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_03_LETRAVIA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_04_NUMSECVIA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_05_LETRASECVIA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_06_BISVIA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_07_SECTORVIA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_08_CRUCE","");
		this.getView().getModel("ZPLUModel").setProperty("/A_09_NUMCRUCE","");
		this.getView().getModel("ZPLUModel").setProperty("/A_10_LETRACRUCE","");
		this.getView().getModel("ZPLUModel").setProperty("/A_11_NUMSECCRUCE","");
  	    this.getView().getModel("ZPLUModel").setProperty("/A_12_LETRASECCRUCE","");
		this.getView().getModel("ZPLUModel").setProperty("/A_13_BISCRUCE","");
		this.getView().getModel("ZPLUModel").setProperty("/A_14_SECTORCRUCE","");
		this.getView().getModel("ZPLUModel").setProperty("/A_15_ULTDIGPLACA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_16_BLOQUE","");
		this.getView().getModel("ZPLUModel").setProperty("/A_17_PISO","");
		this.getView().getModel("ZPLUModel").setProperty("/A_18_UNIDAD","");
		this.getView().getModel("ZPLUModel").setProperty("/A_19_DESUNIDAD","");
		sap.ui.getCore().byId("_ZPLU_A_24_DIRECCIONCORREGIDA_input").setValue("");
		this.getView().getModel("ZPLUModel").setProperty("/A_24_DIRECCIONCORREGIDA","");
		this.getView().getModel("ZPLUModel").setProperty("/A_25_DIRRURAL","");
		this.getView().getModel("ZPLUModel").setProperty("/A_25_DIRRURAL","");
		this.getView().getModel("ZPLUModel").setProperty("/A_26_DIRNUMRUR","");

	},	
	validateEmail:function()

	  {

	  var email = this.getView().getModel("ZPLUModel").getProperty("/A_21_EMAIL");

	  var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

	    if (!mailregex.test(email)) {

	      alert(email + " No es un Email valido");

			this.getView().getModel("ZPLUModel").setProperty("/A_21_EMAIL","");
	        }

	  },
	
};

