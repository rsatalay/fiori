jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZCOP.fragments.V00000.ZCOPController");
sap.umc.mobile.forms.view.forms["ZCOP"].fragments.V00000["ZCOPController"]
= {
setView: function(oView) {
this._oView = oView;
this.setDefaultValues();
this.loadPeriodo();
this.RegionLoad();
	this.initializeOUSOVisible();
 	this.initializeSEGFIRMAVisible();
 	// VISIBILIDADES DIRECCIoN...
 	this.loadSi();
 	this.setValuesDireccion();
 	// FIN VISIBILIDAD DIRECCIoN.
 	
 	
},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;
},
setDefaultValues: function(){
this.FormID = "ZCOP";
},
setbEdited:function(bFlag){
var oController = this.getView().getController();
var oFilter = oController.getSelectedFilter();
var sCurrentFormNo = oFilter.data().CurrentFormNo;
var sKey = this.FormID;
if(oController.oAllFormsData[sKey] && oController.oAllFormsData[sKey][sCurrentFormNo])
oController.oAllFormsData[sKey][sCurrentFormNo]["bEdited"]=bFlag;
}, 



//INICIO FUNCIONES PARA DIRECCION



setValuesDireccion: function(){
	
	this.loadVia(this);   // Cargar Las vias .
	this.loadViaRural(this);   // Cargar Las vias Rural
	this.loadLetraVia(this); // Cargar las letras Via
	this.loadBis(this); // Cargar Bis
	this.loadSector(this); // Cargar Sector
	this.loadUnidad(this); // Cargar Unidad
	this.initializeDIRModel();
	this.initializeRURALVisible();
	this.initializeDIRVisible();
	this.initializeDIRVisible2();
	this.initializeVIAVisible();
},

//---------------INICIO METODOS PARA DIRECCIoN ---------------------------------------// 

//CARGA DE ODATAS con informaci?n de la direcci?n
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
loadSi:function(){
	var oModelSi = new sap.ui.model.json.JSONModel({
		results: [{"View": "SI", "Value": "X"},{"View": "NO", "Value": "" }]
		});
		this.getView().setModel(oModelSi, "Si");	 
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
	this.getView().setModel(omodel,"Sector2Odata");
	var oModelSector = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelSector, "Sector2");
	this.getView().getModel("Sector2Odata").read("/SectorSet",{
		success:function(odata){
			this.getView().getModel("Sector2").setProperty("/results",odata.results);
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

initializeDIRModel: function(){

	 var oModel = new sap.ui.model.json.JSONModel({
		A_01_VIA: {},
		A_02_NUMVIA: {},
		A_03_LETRAVIA: {},
		A_04_NUMSECVIA: {},
		A_05_LETRASECVIA: {},
		A_06_BISVIA: {},
		A_07_SECTORVIA: {},
		A_08_CRUCE: {},
		A_09_NUMCRUCE: {},
		A_10_LETRACRUCE: {},
		A_11_NUMSECCRUCE: {},
		A_12_LETRASECCRUCE: {},
		A_13_BISCRUCE: {},
		A_14_SECTORCRUCE: {},
		A_15_ULTDIGPLACA: {},
		A_16_BLOQUE: {},
		A_17_PISO: {},
		A_18_UNIDAD: {},
		A_19_DESUNIDAD: {},
		A_25_DIRRURAL: {},
		A_26_DIRNUMRUR: {},	
		A_28_DIRCONCATENATE: {},
		A_29_DIRPANTALLA: {},
	 });
		this.getView().setModel(oModel, "ZDIRModel");
		
		 var oModel2 = new sap.ui.model.json.JSONModel({
				A_01_VIA: {},
				A_02_NUMVIA: {},
				A_03_LETRAVIA: {},
				A_04_NUMSECVIA: {},
				A_05_LETRASECVIA: {},
				A_06_BISVIA: {},
				A_07_SECTORVIA: {},
				A_08_CRUCE: {},
				A_09_NUMCRUCE: {},
				A_10_LETRACRUCE: {},
				A_11_NUMSECCRUCE: {},
				A_12_LETRASECCRUCE: {},
				A_13_BISCRUCE: {},
				A_14_SECTORCRUCE: {},
				A_15_ULTDIGPLACA: {},
				A_16_BLOQUE: {},
				A_17_PISO: {},
				A_18_UNIDAD: {},
				A_19_DESUNIDAD: {},
				A_25_DIRRURAL: {},
				A_26_DIRNUMRUR: {},	
				A_28_DIRCONCATENATE: {},
				A_29_DIRPANTALLA: {},
			 });
				this.getView().setModel(oModel2, "ZDIRModel2");		
				this.iniciarModelo("ZDIRModel2");
				this.iniciarModelo("ZDIRModel");

},
iniciarModelo: function(model){
	this.getView().getModel(model).setProperty("/A_01_VIA","");		
	this.getView().getModel(model).setProperty("/A_02_NUMVIA","");
	this.getView().getModel(model).setProperty("/A_03_LETRAVIA","");
	this.getView().getModel(model).setProperty("/A_04_NUMSECVIA","");
	this.getView().getModel(model).setProperty("/A_05_LETRASECVIA","");
	this.getView().getModel(model).setProperty("/A_06_BISVIA","");
	this.getView().getModel(model).setProperty("/A_07_SECTORVIA","");
	this.getView().getModel(model).setProperty("/A_08_CRUCE","");
	this.getView().getModel(model).setProperty("/A_09_NUMCRUCE","");
	this.getView().getModel(model).setProperty("/A_10_LETRACRUCE","");
	this.getView().getModel(model).setProperty("/A_11_NUMSECCRUCE","");
	this.getView().getModel(model).setProperty("/A_12_LETRASECCRUCE","");
	this.getView().getModel(model).setProperty("/A_13_BISCRUCE","");
	this.getView().getModel(model).setProperty("/A_14_SECTORCRUCE","");
	this.getView().getModel(model).setProperty("/A_15_ULTDIGPLACA","");
	this.getView().getModel(model).setProperty("/A_16_BLOQUE","");
	this.getView().getModel(model).setProperty("/A_17_PISO","");
	this.getView().getModel(model).setProperty("/A_18_UNIDAD","");
	this.getView().getModel(model).setProperty("/A_19_DESUNIDAD","");
	this.getView().getModel(model).setProperty("/A_25_DIRRURAL","");
	this.getView().getModel(model).setProperty("/A_26_DIRNUMRUR","");
	this.getView().getModel(model).setProperty("/A_28_DIRCONCATENATE","");		
	this.getView().getModel(model).setProperty("/A_29_DIRPANTALLA","");
},
//ACASTANEDA
initializeRURALVisible:function(){
	var oRURALVisibleModel = this.getDataProvider().initializeRURALVisible();
	this.getView().setModel(oRURALVisibleModel,"RURALVisible"); 
	var oRURALVisibleModel = this.getDataProvider().initializeRURALVisible();
	this.getView().setModel(oRURALVisibleModel,"RURAL2Visible"); 
},
//ACASTANEDA Visibilidad direccion No Rural
initializeDIRVisible:function(){
	var oDIRVisibleModel = this.getDataProvider().initializeDIRVisiblel();
	this.getView().setModel(oDIRVisibleModel,"DIRVisible"); 
	this.getView().getModel("DIRVisible").setProperty("/visible",true);
	
	var oDIRVisibleModel = this.getDataProvider().initializeDIRVisiblel();
	this.getView().setModel(oDIRVisibleModel,"DIR2Visible"); 
	this.getView().getModel("DIR2Visible").setProperty("/visible",true);
},
	//ACASTANEDA Visibilidad variable cambio de direccion
	initializeDIRVisible2:function(){
		var oDIRVisibleModel2 = this.getDataProvider().initializeDIRVisiblel2();
		this.getView().setModel(oDIRVisibleModel2,"DIRVisible2"); 
		this.getView().getModel("DIRVisible2").setProperty("/visible",false);
		
		var oDIRVisibleModel2 = this.getDataProvider().initializeDIRVisiblel2();	
		this.getView().setModel(oDIRVisibleModel2,"DIR2Visible2"); 
		this.getView().getModel("DIR2Visible2").setProperty("/visible",false);
		
},
initializeVIAVisible:function(){
	var oVIAVisibleModel = this.getDataProvider().initializeVIAVisiblel();
	this.getView().setModel(oVIAVisibleModel,"VIAVisible"); 
	this.getView().getModel("VIAVisible").setProperty("/visible",true);
	
	var oVIAVisibleModel = this.getDataProvider().initializeVIAVisiblel();
	this.getView().setModel(oVIAVisibleModel,"VIA2Visible"); 
	this.getView().getModel("VIA2Visible").setProperty("/visible",true);
	
},onChangeNewAdress:function(evt){
	
	if (evt.mParameters.id == "_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input")
		{
		var model = "ZDIRModel";
		var visibility = "DIRVisible2";

		}
	else{
		var model = "ZDIRModel2";
		var visibility = "DIR2Visible2";
	}
	visible = this.getView().getModel(visibility).getProperty("/visible");
	if (visible == true)
	{	
		if (this.getView().getModel(model).getProperty("/A_28_DIRCONCATENATE") !== "")
			{
	    	that = this
	    	// this is required since there is no direct access to the box's icons like MessageBox.Icon.WARNING
	    	jQuery.sap.require("sap.ui.commons.MessageBox");

	    	// open a fully configured message box
	    	sap.ui.commons.MessageBox.show(sap.ui.getCore().getModel("i18n").getProperty("ZDIR.MENSAJE"),
	    			sap.ui.commons.MessageBox.Icon.WARNING,
	    			sap.ui.getCore().getModel("i18n").getProperty("ZDIR.TITMENSAJE"),
	    			[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
	    			jQuery.proxy(that.erase, that, model),
	    			sap.ui.commons.MessageBox.Action.YES);
	    			
			}else{

				this.getView().getModel(visibility).setProperty("/visible",false);	
				if (model == "ZDIRModel")
				{
			this.getView().getModel("ZCOPModel").setProperty("/A_10_SOLICITUD_ACT_DIRAGRET","");
			 sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setSelected(false);}
			else{
				this.getView().getModel("ZCOPModel").setProperty("/A_14_SOLICITUD_ACT_DIRNOT","");	
				 sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setSelected(false);
			}
				
			}
		
		;	

	}else {
		visible = this.getView().getModel(visibility).setProperty("/visible",true);	
		if (model == "ZDIRModel")
			{
		this.getView().getModel("ZCOPModel").setProperty("/A_10_SOLICITUD_ACT_DIRAGRET","X");
		 sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setSelected(true);}
		else{
			this.getView().getModel("ZCOPModel").setProperty("/A_14_SOLICITUD_ACT_DIRNOT","X");	
			 sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setSelected(true);
		}
		
	}

},
erase:function(model, that){
	
	if (that == "YES"){
	this.getView().getModel(model).setProperty("/A_01_VIA","");		
	this.getView().getModel(model).setProperty("/A_02_NUMVIA","");
	this.getView().getModel(model).setProperty("/A_03_LETRAVIA","");
	this.getView().getModel(model).setProperty("/A_04_NUMSECVIA","");
	this.getView().getModel(model).setProperty("/A_05_LETRASECVIA","");
	this.getView().getModel(model).setProperty("/A_06_BISVIA","");
	this.getView().getModel(model).setProperty("/A_07_SECTORVIA","");
	this.getView().getModel(model).setProperty("/A_08_CRUCE","");
	this.getView().getModel(model).setProperty("/A_09_NUMCRUCE","");
	this.getView().getModel(model).setProperty("/A_10_LETRACRUCE","");
	this.getView().getModel(model).setProperty("/A_11_NUMSECCRUCE","");
	this.getView().getModel(model).setProperty("/A_12_LETRASECCRUCE","");
	this.getView().getModel(model).setProperty("/A_13_BISCRUCE","");
	this.getView().getModel(model).setProperty("/A_14_SECTORCRUCE","");
	this.getView().getModel(model).setProperty("/A_15_ULTDIGPLACA","");
	this.getView().getModel(model).setProperty("/A_16_BLOQUE","");
	this.getView().getModel(model).setProperty("/A_17_PISO","");
	this.getView().getModel(model).setProperty("/A_18_UNIDAD","");
	this.getView().getModel(model).setProperty("/A_19_DESUNIDAD","");

	this.getView().getModel(model).setProperty("/A_24_DIRECCIONCORREGIDA","");
	this.getView().getModel(model).setProperty("/A_25_DIRRURAL","");
	this.getView().getModel(model).setProperty("/A_25_DIRRURAL","");
	this.getView().getModel(model).setProperty("/A_26_DIRNUMRUR","");
	this.getView().getModel(model).setProperty("/A_28_DIRCONCATENATE","");

	
	if (model == "ZDIRModel2"){
	this.getView().getModel("ZCOPModel").setProperty("/A_13_DIRECCION_NOTIFICACION","");
	sap.ui.getCore().byId("_ZDIR_A_24_DIRECCIONCORREGIDA_inputZCOP2").setValue("");
	this.getView().getModel("DIR2Visible2").setProperty("/visible",false);
	this.getView().getModel("ZCOPModel").setProperty("/A_14_SOLICITUD_ACT_DIRNOT","");
	}
	else 
	{
		this.getView().getModel("ZCOPModel").setProperty("/A_09_DIRECCION_AG_RETENEDOR","");	
		sap.ui.getCore().byId("_ZDIR_A_24_DIRECCIONCORREGIDA_inputZCOP1").setValue("");
		this.getView().getModel("DIRVisible2").setProperty("/visible",false);
		this.getView().getModel("ZCOPModel").setProperty("/A_10_SOLICITUD_ACT_DIRAGRET","");
	}
		
	
	}else{
		if (model == "ZDIRModel")
		{
	this.getView().getModel("ZCOPModel").setProperty("/A_10_SOLICITUD_ACT_DIRAGRET","X");
	 sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setSelected(true);}
	else{
		this.getView().getModel("ZCOPModel").setProperty("/A_14_SOLICITUD_ACT_DIRNOT","X");	
		 sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setSelected(true);
	}
	
	}
},
onEraseAdress:function(evt){


	if (evt.mParameters.id == "EraseButAgenZCOP")
	{
	var model = "ZDIRModel";
	var visibility = "DIRVisible2";

	}
else{
	var model = "ZDIRModel2";
	var visibility = "DIR2Visible2";
}
	
			this.getView().getModel(model).setProperty("/A_01_VIA","");		
			this.getView().getModel(model).setProperty("/A_02_NUMVIA","");
			this.getView().getModel(model).setProperty("/A_03_LETRAVIA","");
			this.getView().getModel(model).setProperty("/A_04_NUMSECVIA","");
			this.getView().getModel(model).setProperty("/A_05_LETRASECVIA","");
			this.getView().getModel(model).setProperty("/A_06_BISVIA","");
			this.getView().getModel(model).setProperty("/A_07_SECTORVIA","");
			this.getView().getModel(model).setProperty("/A_08_CRUCE","");
			this.getView().getModel(model).setProperty("/A_09_NUMCRUCE","");
			this.getView().getModel(model).setProperty("/A_10_LETRACRUCE","");
			this.getView().getModel(model).setProperty("/A_11_NUMSECCRUCE","");
	  	    this.getView().getModel(model).setProperty("/A_12_LETRASECCRUCE","");
			this.getView().getModel(model).setProperty("/A_13_BISCRUCE","");
			this.getView().getModel(model).setProperty("/A_14_SECTORCRUCE","");
			this.getView().getModel(model).setProperty("/A_15_ULTDIGPLACA","");
			this.getView().getModel(model).setProperty("/A_16_BLOQUE","");
			this.getView().getModel(model).setProperty("/A_17_PISO","");
			this.getView().getModel(model).setProperty("/A_18_UNIDAD","");
			this.getView().getModel(model).setProperty("/A_19_DESUNIDAD","");

			this.getView().getModel(model).setProperty("/A_24_DIRECCIONCORREGIDA","");
			this.getView().getModel(model).setProperty("/A_25_DIRRURAL","");
			this.getView().getModel(model).setProperty("/A_25_DIRRURAL","");
			this.getView().getModel(model).setProperty("/A_26_DIRNUMRUR","");
			this.getView().getModel(model).setProperty("/A_28_DIRCONCATENATE","");	
			
			if (model == "ZDIRModel2"){
			 	this.getView().getModel("ZCOPModel").setProperty("/A_13_DIRECCION_NOTIFICACION","");
			 	sap.ui.getCore().byId("_ZDIR_A_24_DIRECCIONCORREGIDA_inputZCOP2").setValue("");
				}
				else 
			 	{
					this.getView().getModel("ZCOPModel").setProperty("/A_09_DIRECCION_AG_RETENEDOR","");	
					sap.ui.getCore().byId("_ZDIR_A_24_DIRECCIONCORREGIDA_inputZCOP1").setValue("");
			 	}
			
			
		},
		onShowAdress:function(evt){

			if (evt.mParameters.id == "VerifyButAgenZCOP")
			{
			var model = "ZDIRModel";
			var visibility = "DIRVisible2";
			var direc = "/A_09_DIRECCION_AG_RETENEDOR";

			}
		else{
			var model = "ZDIRModel2";
			var visibility = "DIR2Visible2";
			var direc = "/A_13_DIRECCION_NOTIFICACION";
		}
				
			
			
			if ( this.getView().getModel(model).getProperty("/A_28_DIRCONCATENATE") == ""){	
				var DirCod = this.getView().getModel("ZCOPModel").getProperty(direc);
			}else{
				var DirCod = this.getView().getModel(model).getProperty("/A_28_DIRCONCATENATE");
			}
			
			
			var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_PRIVATE_SRV/");
			omodel.setUseBatch(false);
			this.getView().setModel(omodel,"DirOdata");
			var oModelDir = new sap.ui.model.json.JSONModel({
				result: {}
				});
				this.getView().setModel(oModelDir, "Dir");
		    var that = this;
		    
		    if (model == "ZDIRModel")
		    	{
			this.getView().getModel("DirOdata").read("/DireccionSet('"+ DirCod +"')",{
			
				success:function(odata){
					this.getView().getModel("Dir").setProperty("/result",odata.Dirint);
					this.getView().getModel("ZDIRModel").setProperty("/A_29_DIRPANTALLA",odata.Dirint);
		//			sap.ui.getCore().byId("_ZDIR_A_24_DIRECCIONCORREGIDA_inputZCOP1").setValue(odata.Dirint);
					this.getView().getModel("ZCOPModel").setProperty("/A_09_DIRECCION_AG_RETENEDOR",odata.Dirint);
					sap.ui.getCore().byId("_ZCOP_A_09_DIRECCION_AG_RETENEDOR_input").setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("_ZCOP_A_09_DIRECCION_AG_RETENEDOR_input").setValueStateText("")
					omodel.setUseBatch(true);
				}.bind(this),  
				error:function(odata){
				}
			});
		    	}else{
					this.getView().getModel("DirOdata").read("/DireccionSet('"+ DirCod +"')",{
						
						success:function(odata){
							this.getView().getModel("Dir").setProperty("/result",odata.Dirint);
							this.getView().getModel("ZDIRModel2").setProperty("/A_29_DIRPANTALLA",odata.Dirint);
						//	sap.ui.getCore().byId("_ZDIR_A_24_DIRECCIONCORREGIDA_inputZCOP2").setValue(odata.Dirint);
							this.getView().getModel("ZCOPModel").setProperty("/A_13_DIRECCION_NOTIFICACION",odata.Dirint);
							sap.ui.getCore().byId("_ZCOP_A_13_DIRECCION_NOTIFICACION_input").setValueState(sap.ui.core.ValueState.None);
							sap.ui.getCore().byId("_ZCOP_A_13_DIRECCION_NOTIFICACION_input").setValueStateText("")							
							omodel.setUseBatch(true);
						}.bind(this),  
						error:function(odata){
						}
					});    		
		   
		    	}
			
		
		
		},	onChangeDireccion2:function(evt){
			this.updateDireccion("ZDIRModel2");
		},
			onChangeDireccion:function(evt){
				this.updateDireccion("ZDIRModel");
			},
		updateDireccion:function(model){
				// Si se modifica la direccion:
				// INICIO DATOS DE DIRECCIoN
			
			if (model == "ZDIRModel"){
				var visibilityRural = "RURALVisible";
				var visibilityDir = "DIRVisible";				
				this.getView().getModel("ZCOPModel").setProperty("/A_09_DIRECCION_AG_RETENEDOR",odata.Dirint);

			}else{
				var visibilityRural = "RURAL2Visible";
				var visibilityDir = "DIR2Visible";
				this.getView().getModel("ZCOPModel").setProperty("/A_13_DIRECCION_NOTIFICACION",odata.Dirint);
			}
			var v = this.getView().getModel(model).getProperty("/A_01_VIA");

				if (v !== "R" && v !== "N"){
				if(v == ""){
					v = " ";
				}
						this.getView().getModel(visibilityRural).setProperty("/visible",false);	
						this.getView().getModel(visibilityDir).setProperty("/visible",true);
					
			var nv = this.getView().getModel(model).getProperty("/A_02_NUMVIA");
			if(nv == ""  || nv == "000" ){
				nv = "   ";
				this.getView().getModel(model).setProperty("/A_02_NUMVIA","   ")
			}else 

				{
				nv = nv.replace(/_/g, " ");
				/* 
				if (!String.prototype.padStart) {
					nv =  this.padStart("3","0",nv);
				}else{
					nv  = nv.padStart(3, "0");
				}*/

			}
			var l = this.getView().getModel(model).getProperty("/A_03_LETRAVIA");
			if(l == ""){
				l = " ";
			}
			var ns = this.getView().getModel(model).getProperty("/A_04_NUMSECVIA");
			if(ns == "" || ns == "00" ){
				ns = "  ";
				this.getView().getModel(model).setProperty("/A_04_NUMSECVIA","  ");
			}else {
				ns = ns.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					ns =  this.padStart("2","0",ns);
				}else{
					ns  = ns.padStart(2, "0");
				} */

			}
			var ls = this.getView().getModel(model).getProperty("/A_05_LETRASECVIA");
			if(ls == ""){
				ls = " ";
			}
			var bis = this.getView().getModel(model).getProperty("/A_06_BISVIA");
			if(bis == ""){
				bis = " ";
			}
			var sg = this.getView().getModel(model).getProperty("/A_07_SECTORVIA");
			if(sg == ""){
				sg = " ";
			}
			var cr = this.getView().getModel(model).getProperty("/A_08_CRUCE");
			if(cr == ""){
				cr = " ";
			}
			var nc = this.getView().getModel(model).getProperty("/A_09_NUMCRUCE");
			if(nc == ""|| nc == "000" ){
				nc = "   ";
				this.getView().getModel(model).setProperty("/A_09_NUMCRUCE","   ");
			} else {
				nc = nc.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					nc =  this.padStart("3","0",nc);
				}else{
					nc  = nc.padStart(3, "0");
				} */

			}

			var lc = this.getView().getModel(model).getProperty("/A_10_LETRACRUCE");
			if(lc == ""){
				lc = " ";

			}

			var nsc = this.getView().getModel(model).getProperty("/A_11_NUMSECCRUCE");
			if(nsc == "" || nsc == "00" ){
				nsc = "  ";
				this.getView().getModel(model).setProperty("/A_11_NUMSECCRUCE","  ");
			} else {
				nsc = nsc.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					nsc =  this.padStart("2","0",nsc);
				}else{
					nsc  = nsc.padStart(2, "0");
				}*/

			}

			var lsc = this.getView().getModel(model).getProperty("/A_12_LETRASECCRUCE");
			if(lsc  == ""){
				lsc = " ";
			}

			var bis2 = this.getView().getModel(model).getProperty("/A_13_BISCRUCE");
			if(bis2 == ""){
				bis2 = " ";
			}

			var sg2 = this.getView().getModel(model).getProperty("/A_14_SECTORCRUCE");
			if(sg2 == ""){
				sg2 = " ";
			}

			var udp = this.getView().getModel(model).getProperty("/A_15_ULTDIGPLACA");
			if(udp == "" || udp == "000" ){
				udp = "   ";
				this.getView().getModel(model).setProperty("/A_15_ULTDIGPLACA","   ");
			} else {
				udp = udp.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					udp =  this.padStart("3","0",udp);
				}else{
					udp  = udp.padStart(3, "0");
				} */

			}


			var blq = this.getView().getModel(model).getProperty("/A_16_BLOQUE");
			if(blq  == ""){
				blq = "   ";
			} else {
				blq = blq.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					blq =  this.padStart("3","0",blq);
				}else{
					blq  = blq.padStart(3, "0");
				} */
			}

			var piso = this.getView().getModel(model).getProperty("/A_17_PISO");
			if(piso == ""){
				piso = "  ";
			} else {
				piso = piso.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					piso =  this.padStart("2","0",piso);
				}else{
					piso  = piso.padStart(2, "0");
				} */
			}
			var un = this.getView().getModel(model).getProperty("/A_18_UNIDAD");
			if(un == "" || un == "00" ){
				un = "  ";
				this.getView().getModel(model).setProperty("/A_18_UNIDAD","  ");
			}else {
				un = un.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					un =  this.padStart("2","0",un);
				}else{
					un  = un.padStart(2, "0");
				} */
			}
			var tun = this.getView().getModel(model).getProperty("/A_19_DESUNIDAD");
			if(tun == ""){
				tun = " ";
			}
			var dir = v.charAt(0)  +  nv.charAt(0) +  nv.charAt(1)  +  nv.charAt(2) + l.substring(0,1) + ns.charAt(0) + ns.charAt(1) + ls.charAt(0) + bis.charAt(0) + sg.charAt(0) + cr.charAt(0) + nc.charAt(0) + nc.charAt(1)  + nc.charAt(2)  + lc.charAt(0) + nsc.charAt(0)+ nsc.charAt(1) + lsc.charAt(0) + bis2.charAt(0) + sg2.charAt(0) + udp.charAt(0)+ udp.charAt(1)+ udp.charAt(2) + 
			          blq.charAt(0) + blq.charAt(1) + blq.charAt(2) + piso.charAt(0) + piso.charAt(1) + un.charAt(0) + un.charAt(1) + tun.charAt(0); 
			console.log(dir);
			this.getView().getModel(model).setProperty("/A_28_DIRCONCATENATE",dir);
			/* 
			if (model == "ZDIRModel" ){
				
				this.getView().getModel("ZCOPModel").setProperty("/A_09_DIRECCION_AG_RETENEDOR",dir);	
			}else{
				this.getView().getModel("ZCOPModel").setProperty("/A_13_DIRECCION_NOTIFICACION",dir);
			}
*/

				} else {		// En caso de que sea Rural o Nangos
					
					this.getView().getModel(visibilityRural).setProperty("/visible",true);
					this.getView().getModel(visibilityDir).setProperty("/visible",false);
					
					var str1 = "*"
					var str2 = this.getView().getModel(model).getProperty("/A_25_DIRRURAL");
					var str3 = this.getView().getModel(model).getProperty("/A_26_DIRNUMRUR");
					var str4 = str1.concat(str3," ",str2);
				
					this.getView().getModel(model).setProperty("/A_28_DIRCONCATENATE",str4);
					/* 
					if (model == "ZDIRModel" ){
			     	this.getView().getModel("ZCOPModel").setProperty("/A_09_DIRECCION_AG_RETENEDOR",str4);
					}else{
						this.getView().getModel("ZCOPModel").setProperty("/A_13_DIRECCION_NOTIFICACION",str4);	
					} */
					;
				};
				if (model == "ZDIRModel" ){
				if (!sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").mProperties.value == ""){
					sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setValueStateText("");
				}
				}else if(!sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").mProperties.value == ""){
					sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setValueStateText("");		
				}
			// FIN DATOS DE DIRECCIoN
			},		
			
			

//FIN METODOS PARA DIRECCIoN ------------------------------------//.
			validateEmail:function()

			  {

			  var email = this.getView().getModel("ZCOPModel").getProperty("/A_16_CORREO_ELECTRONICO");

			  var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

			    if (!mailregex.test(email)) {

			      alert(email + " No es un Email valido");

					this.getView().getModel("ZCOPModel").setProperty("/A_16_CORREO_ELECTRONICO","");
			        }

			  },
			
initializeOUSOVisible:function(){
	var oOUSOVisibleModel = this.getDataProvider().initializeOUSOVisiblel();
	this.getView().setModel(oOUSOVisibleModel,"OUSOVisible"); 
	this.getView().getModel("OUSOVisible").setProperty("/visible",false);
	
}, initializeSEGFIRMAVisible:function(){
	var oSEGFIRMAVisibleModel = this.getDataProvider().initializeSEGFIRMAVisible();
	this.getView().setModel(oSEGFIRMAVisibleModel,"SEGFIRMAVisible"); 
	this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);
},
loadPeriodo:function(){
	var oModelPeriodo = new sap.ui.model.json.JSONModel({
		results: [{"Number": 1},{"Number": 2},{"Number": 3},{"Number": 4},{"Number": 5},{"Number": 6},{"Number": 7},{"Number": 8},{"Number": 9},{"Number": 10},{"Number": 11},{"Number": 12}]
		});
		this.getView().setModel(oModelPeriodo, "Periodo");	 
},
//Logica para CARGAR MUNICIPIOS
RegionLoad:function(){
	
	var region = '76';		
	var pais = 'CO';

	
	var omodel=new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZODATA_MCF_SRV/");
	this.getView().setModel(omodel,"ZODATA_MCF_SRV");  // Van una sola vez en la aplicacion 
	var oModelCiudades = new sap.ui.model.json.JSONModel({
		results: []
		});
		this.getView().setModel(oModelCiudades, "Ciudades");
	this.getView().getModel("ZODATA_MCF_SRV").read("/CiudadSet",{
		filters: [new sap.ui.model.Filter({
		      path: "Country",
		      operator: sap.ui.model.FilterOperator.EQ,
		      value1: pais
		     }),new sap.ui.model.Filter({
			      path: "Region",
			      operator: sap.ui.model.FilterOperator.EQ,
			      value1: region
			     })],
		success:function(odata){
			this.getView().getModel("Ciudades").setProperty("/results",odata.results);
 
		}.bind(this),  
		error:function(odata){

		}
	});
	
	
},
InciarCheckBox:function(){
	
	// ORIGEN MCF
	this.getView().getModel("ZCOPModel").setProperty("/A_54_FUENTE_CREACION","1");

	
	if (this.getView().getModel("ZCOPModel").getProperty("/A_28_ANIO_CORRECCION") == "0000"){
		this.getView().getModel("ZCOPModel").setProperty("/A_28_ANIO_CORRECCION","")
	}
	// Emplazada...
	if (this.getView().getModel("ZCOPModel").getProperty("/A_53_EMPLAZAMIENTO") == ""){
		 sap.ui.getCore().byId("_ZCOP_A_53_EMPLAZAMIENTO_input").setValue("NO");
	} else if (this.getView().getModel("ZCOPModel").getProperty("/A_53_EMPLAZAMIENTO") == "X"){
		 sap.ui.getCore().byId("_ZCOP_A_53_EMPLAZAMIENTO_input").setValue("SI");
	}
	
	
	 // Iniciar municipios.
	
	if (this.getView().getModel("ZCOPModel").getProperty("/A_11_MUNICIPIO_AR") !== ""){
		sap.ui.getCore().byId("_ZCOP_A_11_MUNICIPIO_AR_input").setValue(this.getView().getModel("ZCOPModel").getProperty("/A_11_MUNICIPIO_AR"));
	}
	
	if (this.getView().getModel("ZCOPModel").getProperty("/A_15_MUNICIPIO_NOT") !== ""){
		sap.ui.getCore().byId("_ZCOP_A_15_MUNICIPIO_NOT_input").setValue(this.getView().getModel("ZCOPModel").getProperty("/A_15_MUNICIPIO_NOT"));
	}
	// inicializar Tipo ID 
	if (this.getView().getModel("ZCOPModel").getProperty("/A_07_NIT") == "X")
	{	 sap.ui.getCore().byId("_ZCOP_A_07_NIT_input").setSelected(true);
	}
	else{
		 sap.ui.getCore().byId("_ZCOP_A_07_NIT_input").setSelected(false);
	}
	
	

	if (this.getView().getModel("ZCOPModel").getProperty("/A_13_DIRECCION_NOTIFICACION") !== ""){
		var a = this.getView().getModel("ZCOPModel").getProperty("/A_13_DIRECCION_NOTIFICACION").substring(0,2);
		if (a !== 'AV' && a !== 'CL'&& a !== 'DG'&& a !== 'CR'&& a !== 'PJ'&& a !== 'TV')
		{	var Evento = []; Evento.mParameters = [] ; Evento.mParameters.id = [];  //
			Evento.mParameters.id = "VerifyButNotZCOP";
			this.onShowAdress(Evento);
		}
	};
	
	
	if (this.getView().getModel("ZCOPModel").getProperty("/A_09_DIRECCION_AG_RETENEDOR") !== ""){
		var a = this.getView().getModel("ZCOPModel").getProperty("/A_09_DIRECCION_AG_RETENEDOR").substring(0,2);
		if (a !== 'AV' && a !== 'CL'&& a !== 'DG'&& a !== 'CR'&& a !== 'PJ'&& a !== 'TV')
		{	var Evento = []; Evento.mParameters = [] ; Evento.mParameters.id = [];
		Evento.mParameters.id = "VerifyButAgenZCOP";
			this.onShowAdress(Evento);
		}
	};
	
	
	// inicializar correccion
	if (this.getView().getModel("ZCOPModel").getProperty("/A_26_CORRECCION") == "X")
	{	 sap.ui.getCore().byId("_ZCOP_A_26_CORRECCION_input").setSelected(true);
	this.getView().getModel("OUSOVisible").setProperty("/visible",true);}
	else{
		 sap.ui.getCore().byId("_ZCOP_A_26_CORRECCION_input").setSelected(false);
	}
	
	
	//SEGUNDA FIRMA
	if   (this.getView().getModel("ZCOPModel").getProperty("/A_32_FIRMA_CONTADOR") == "X"){
		 sap.ui.getCore().byId("_ZCOP_A_32_FIRMA_CONTADOR_input").setSelected(true);
		 sap.ui.getCore().byId("_ZCOP_A_33_REVISOR_FISCAL_input").setSelected(false);
		 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);
	}
	else if (this.getView().getModel("ZCOPModel").getProperty("/A_33_REVISOR_FISCAL") == "X"){
		 sap.ui.getCore().byId("_ZCOP_A_32_FIRMA_CONTADOR_input").setSelected(false);
		 sap.ui.getCore().byId("_ZCOP_A_33_REVISOR_FISCAL_input").setSelected(true);
		 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);
	}
	else {
		 sap.ui.getCore().byId("_ZCOP_A_32_FIRMA_CONTADOR_input").setSelected(false);
		 sap.ui.getCore().byId("_ZCOP_A_33_REVISOR_FISCAL_input").setSelected(false);
		 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);

	}
	
	// INICIAR ACTUALIZAR DIRECCICONES..
	
	if (this.getView().getModel("ZCOPModel").getProperty("/A_14_SOLICITUD_ACT_DIRNOT") == "X")
	{	 sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setSelected(true);}
	else{
		 sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setSelected(false);
	}
	if (this.getView().getModel("ZCOPModel").getProperty("/A_10_SOLICITUD_ACT_DIRAGRET") == "X")
	{	 sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setSelected(true);}
	else{
		 sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setSelected(false);
	}
		 
},

onSelectCorreccion: function(evt){
	 if (evt.getParameters("selected").selected){
		  this.getView().getModel("ZCOPModel").setProperty("/A_26_CORRECCION","X"); 
		  this.getView().getModel("OUSOVisible").setProperty("/visible",true);
	 }else {
		 this.getView().getModel("ZCOPModel").setProperty("/A_26_CORRECCION",""); 
		 this.getView().getModel("OUSOVisible").setProperty("/visible",false);
		 this.getView().getModel("ZCOPModel").setProperty("/A_29_PERIODO_CORRECCION",""); 
		 this.getView().getModel("ZCOPModel").setProperty("/A_28_ANIO_CORRECCION",""); 
		 this.getView().getModel("ZCOPModel").setProperty("/A_27_NUM_FORM_CORRIGE",""); 
	 }
},

onSelectSegundaFirma:function(evt){

	 if( evt.mParameters.id == "_ZCOP_A_32_FIRMA_CONTADOR_input"){ // cedula de ciudadania
		 
		 if (evt.getParameters("selected").selected){
			 	this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);
			   this.getView().getModel("ZCOPModel").setProperty("/A_32_FIRMA_CONTADOR","X"); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_33_REVISOR_FISCAL",""); 
				 sap.ui.getCore().byId("_ZCOP_A_33_REVISOR_FISCAL_input").setSelected(false);
		 }else{
			 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);
			   this.getView().getModel("ZCOPModel").setProperty("/A_32_FIRMA_CONTADOR",""); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_34_NOMBRE_CONT_FISC",""); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_35_NUMERO_CONT_FISC",""); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_36_TARJETA_PROF",""); 
			   
		 }
		 	
	 }else if (evt.mParameters.id == "_ZCOP_A_33_REVISOR_FISCAL_input"){

		 if (evt.getParameters("selected").selected){
			  this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);   
			   this.getView().getModel("ZCOPModel").setProperty("/A_32_FIRMA_CONTADOR",""); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_33_REVISOR_FISCAL","X"); 
				 sap.ui.getCore().byId("_ZCOP_A_32_FIRMA_CONTADOR_input").setSelected(false);
		 }else{
			 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);   
			   this.getView().getModel("ZCOPModel").setProperty("/A_33_REVISOR_FISCAL",""); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_34_NOMBRE_CONT_FISC",""); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_35_NUMERO_CONT_FISC",""); 
			   this.getView().getModel("ZCOPModel").setProperty("/A_36_TARJETA_PROF",""); 
		 }
		 
} 
}, 
VerificarGuardarBorrador:function(){
	  var name = this.getView().getModel("ZCOPModel").getProperty("/A_05_PRO_O_RAZON_SOCIAL");
	  var phone  = this.getView().getModel("ZCOPModel").getProperty("/A_12_TELEFONO");
	  var tipoId = this.getView().getModel("ZCOPModel").getProperty("/A_07_NIT") ;
	  var email = this.getView().getModel("ZCOPModel").getProperty("/A_16_CORREO_ELECTRONICO") ;
	  var numero = this.getView().getModel("ZCOPModel").getProperty("/A_06_NUM_IDENTIDAD");
	  var dv = this.getView().getModel("ZCOPModel").getProperty("/A_08_DV");
	  if (name == "" || phone == "" || tipoId == "" || numero == "" || dv == "" || email == "")
		  {
		  return "X";
		  }
	  else 
		  {
		  return " ";
		  }
},
    handleUploadPress: function(oEvent) {
        var oThis = this;
        if (!oThis.fileUploader) {
            oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploaderZCOP", {
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
        var file = jQuery.sap.domById("fileUploaderZCOP-fu").files[0];
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


sap.ui.getCore().byId("_ZCOP_A_01_FECHA_PRESENTACION_date").setValue(json[0].Value);
sap.ui.getCore().byId("_ZCOP_A_02_NO_FORMULARIO_input").setValue(json[1].Value);
sap.ui.getCore().byId("_ZCOP_A_03_PERIODO_input").setValue(json[2].Value);
sap.ui.getCore().byId("_ZCOP_A_04_ANIO_input").setValue(json[3].Value);
sap.ui.getCore().byId("_ZCOP_A_05_PRO_O_RAZON_SOCIAL_input").setValue(json[4].Value);
sap.ui.getCore().byId("_ZCOP_A_06_NUM_IDENTIDAD_input").setValue(json[5].Value);
sap.ui.getCore().byId("_ZCOP_A_07_NIT_input").setValue(json[6].Value);
sap.ui.getCore().byId("_ZCOP_A_08_DV_input").setValue(json[7].Value);
sap.ui.getCore().byId("_ZCOP_A_09_DIRECCION_AG_RETENEDOR_input").setValue(json[8].Value);
sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").setValue(json[9].Value);
sap.ui.getCore().byId("_ZCOP_A_11_MUNICIPIO_AR_input").setValue(json[10].Value);
sap.ui.getCore().byId("_ZCOP_A_12_TELEFONO_input").setValue(json[11].Value);
sap.ui.getCore().byId("_ZCOP_A_13_DIRECCION_NOTIFICACION_input").setValue(json[12].Value);
sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").setValue(json[13].Value);
sap.ui.getCore().byId("_ZCOP_A_15_MUNICIPIO_NOT_input").setValue(json[14].Value);
sap.ui.getCore().byId("_ZCOP_A_16_CORREO_ELECTRONICO_input").setValue(json[15].Value);
sap.ui.getCore().byId("_ZCOP_A_17_BASE_RETENCION_input").setValue(json[16].Value);
sap.ui.getCore().byId("_ZCOP_A_18_VALOR_RETENCION_input").setValue(json[17].Value);
sap.ui.getCore().byId("_ZCOP_A_19_SANCION_EXTEMPORANEIDAD_input").setValue(json[18].Value);
sap.ui.getCore().byId("_ZCOP_A_20_OTRAS_SANCIONES_input").setValue(json[19].Value);
sap.ui.getCore().byId("_ZCOP_A_21_TOTAL_SALDO_CARGO_input").setValue(json[20].Value);
sap.ui.getCore().byId("_ZCOP_A_22_VALOR_PAG_RETENCIONES_input").setValue(json[21].Value);
sap.ui.getCore().byId("_ZCOP_A_23_INTERESES_MORA_input").setValue(json[22].Value);
sap.ui.getCore().byId("_ZCOP_A_24_VALOR_PAGAR_SANCIONES_input").setValue(json[23].Value);
sap.ui.getCore().byId("_ZCOP_A_25_TOTAL_A_PAGAR_input").setValue(json[24].Value);
sap.ui.getCore().byId("_ZCOP_A_26_CORRECCION_input").setValue(json[25].Value);
sap.ui.getCore().byId("_ZCOP_A_27_NUM_FORM_CORRIGE_input").setValue(json[26].Value);
sap.ui.getCore().byId("_ZCOP_A_28_ANIO_CORRECCION_input").setValue(json[27].Value);
sap.ui.getCore().byId("_ZCOP_A_29_PERIODO_CORRECCION_input").setValue(json[28].Value);
sap.ui.getCore().byId("_ZCOP_A_30_NOMBRE_DECLARANTE_input").setValue(json[29].Value);
sap.ui.getCore().byId("_ZCOP_A_31_CEDULA_DECLARANTE_input").setValue(json[30].Value);
sap.ui.getCore().byId("_ZCOP_A_32_FIRMA_CONTADOR_input").setValue(json[31].Value);
sap.ui.getCore().byId("_ZCOP_A_33_REVISOR_FISCAL_input").setValue(json[32].Value);
sap.ui.getCore().byId("_ZCOP_A_34_NOMBRE_CONT_FISC_input").setValue(json[33].Value);
sap.ui.getCore().byId("_ZCOP_A_35_NUMERO_CONT_FISC_input").setValue(json[34].Value);
sap.ui.getCore().byId("_ZCOP_A_36_TARJETA_PROF_input").setValue(json[35].Value);
sap.ui.getCore().byId("_ZCOP_A_37_NO_RESOLUCION_input").setValue(json[36].Value);
sap.ui.getCore().byId("_ZCOP_A_38_FECHA_RESOLUCION_date").setValue(json[37].Value);
sap.ui.getCore().byId("_ZCOP_A_39_EXISTE_DIFERENCIA_input").setValue(json[38].Value);
sap.ui.getCore().byId("_ZCOP_A_40_FECHA_VENCIMIENTO_date").setValue(json[39].Value);
sap.ui.getCore().byId("_ZCOP_A_41_LIQ_TOTAL_RET_EFECTUADAS_input").setValue(json[40].Value);
sap.ui.getCore().byId("_ZCOP_A_42_LIQ_TOTAL_SALDO_CARGO_input").setValue(json[41].Value);
sap.ui.getCore().byId("_ZCOP_A_43_LIQ_SAN_EXTEMPORANEIDAD_input").setValue(json[42].Value);
sap.ui.getCore().byId("_ZCOP_A_44_LIQ_INTERESES_MORA_input").setValue(json[43].Value);
sap.ui.getCore().byId("_ZCOP_A_45_LIQ_VALOR_A_PAGAR_RET_input").setValue(json[44].Value);
sap.ui.getCore().byId("_ZCOP_A_46_LIQ_TOTAL_PAGAR_input").setValue(json[45].Value);
sap.ui.getCore().byId("_ZCOP_A_47_LIQ_ZVALOR_PAGAR_SANC_input").setValue(json[46].Value);
sap.ui.getCore().byId("_ZCOP_A_48_EXISTE_VAL_DIF_input").setValue(json[47].Value);
sap.ui.getCore().byId("_ZCOP_A_49_FECHA_CREACION_date").setValue(json[48].Value);
sap.ui.getCore().byId("_ZCOP_A_50_FECHA_MAX_PRESTENCION_date").setValue(json[49].Value);
sap.ui.getCore().byId("_ZCOP_A_51_FECHA_VENCIMIENTO_PREST_date").setValue(json[50].Value);
sap.ui.getCore().byId("_ZCOP_A_52_LIQ_MAS_OTRO_SANCIONES_input").setValue(json[51].Value);
sap.ui.getCore().byId("_ZCOP_A_53_EMPLAZAMIENTO_input").setValue(json[52].Value);
sap.ui.getCore().byId("_ZCOP_A_54_FUENTE_CREACION_input").setValue(json[53].Value);

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


doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_01_FECHA_PRESENTACION").getText()));
doc.text(140,40,this.dateformatter(sap.ui.getCore().byId("_ZCOP_A_01_FECHA_PRESENTACION_date").getValue()));
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_02_NO_FORMULARIO").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZCOP_A_02_NO_FORMULARIO_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_03_PERIODO").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZCOP_A_03_PERIODO_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_04_ANIO").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZCOP_A_04_ANIO_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_05_PRO_O_RAZON_SOCIAL").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZCOP_A_05_PRO_O_RAZON_SOCIAL_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_06_NUM_IDENTIDAD").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZCOP_A_06_NUM_IDENTIDAD_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_07_NIT").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZCOP_A_07_NIT_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_08_DV").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZCOP_A_08_DV_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_09_DIRECCION_AG_RETENEDOR").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZCOP_A_09_DIRECCION_AG_RETENEDOR_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_10_SOLICITUD_ACT_DIRAGRET").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZCOP_A_10_SOLICITUD_ACT_DIRAGRET_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_11_MUNICIPIO_AR").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZCOP_A_11_MUNICIPIO_AR_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_12_TELEFONO").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZCOP_A_12_TELEFONO_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_13_DIRECCION_NOTIFICACION").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZCOP_A_13_DIRECCION_NOTIFICACION_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_14_SOLICITUD_ACT_DIRNOT").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZCOP_A_14_SOLICITUD_ACT_DIRNOT_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_15_MUNICIPIO_NOT").getText()));
doc.text(140,250,sap.ui.getCore().byId("_ZCOP_A_15_MUNICIPIO_NOT_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_16_CORREO_ELECTRONICO").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZCOP_A_16_CORREO_ELECTRONICO_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_17_BASE_RETENCION").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZCOP_A_17_BASE_RETENCION_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_18_VALOR_RETENCION").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZCOP_A_18_VALOR_RETENCION_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_19_SANCION_EXTEMPORANEIDAD").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZCOP_A_19_SANCION_EXTEMPORANEIDAD_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_20_OTRAS_SANCIONES").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZCOP_A_20_OTRAS_SANCIONES_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_21_TOTAL_SALDO_CARGO").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZCOP_A_21_TOTAL_SALDO_CARGO_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_22_VALOR_PAG_RETENCIONES").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZCOP_A_22_VALOR_PAG_RETENCIONES_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_23_INTERESES_MORA").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZCOP_A_23_INTERESES_MORA_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_24_VALOR_PAGAR_SANCIONES").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZCOP_A_24_VALOR_PAGAR_SANCIONES_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_25_TOTAL_A_PAGAR").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZCOP_A_25_TOTAL_A_PAGAR_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_26_CORRECCION").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZCOP_A_26_CORRECCION_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_27_NUM_FORM_CORRIGE").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZCOP_A_27_NUM_FORM_CORRIGE_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_28_ANIO_CORRECCION").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZCOP_A_28_ANIO_CORRECCION_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_29_PERIODO_CORRECCION").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZCOP_A_29_PERIODO_CORRECCION_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_30_NOMBRE_DECLARANTE").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZCOP_A_30_NOMBRE_DECLARANTE_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_31_CEDULA_DECLARANTE").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZCOP_A_31_CEDULA_DECLARANTE_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_32_FIRMA_CONTADOR").getText()));
doc.text(140,250,sap.ui.getCore().byId("_ZCOP_A_32_FIRMA_CONTADOR_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_33_REVISOR_FISCAL").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZCOP_A_33_REVISOR_FISCAL_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_34_NOMBRE_CONT_FISC").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZCOP_A_34_NOMBRE_CONT_FISC_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_35_NUMERO_CONT_FISC").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZCOP_A_35_NUMERO_CONT_FISC_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_36_TARJETA_PROF").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZCOP_A_36_TARJETA_PROF_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_37_NO_RESOLUCION").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZCOP_A_37_NO_RESOLUCION_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_38_FECHA_RESOLUCION").getText()));
doc.text(140,85,this.dateformatter(sap.ui.getCore().byId("_ZCOP_A_38_FECHA_RESOLUCION_date").getValue()));
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_39_EXISTE_DIFERENCIA").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZCOP_A_39_EXISTE_DIFERENCIA_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_40_FECHA_VENCIMIENTO").getText()));
doc.text(140,115,this.dateformatter(sap.ui.getCore().byId("_ZCOP_A_40_FECHA_VENCIMIENTO_date").getValue()));
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_41_LIQ_TOTAL_RET_EFECTUADAS").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZCOP_A_41_LIQ_TOTAL_RET_EFECTUADAS_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_42_LIQ_TOTAL_SALDO_CARGO").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZCOP_A_42_LIQ_TOTAL_SALDO_CARGO_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_43_LIQ_SAN_EXTEMPORANEIDAD").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZCOP_A_43_LIQ_SAN_EXTEMPORANEIDAD_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_44_LIQ_INTERESES_MORA").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZCOP_A_44_LIQ_INTERESES_MORA_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_45_LIQ_VALOR_A_PAGAR_RET").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZCOP_A_45_LIQ_VALOR_A_PAGAR_RET_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_46_LIQ_TOTAL_PAGAR").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZCOP_A_46_LIQ_TOTAL_PAGAR_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_47_LIQ_ZVALOR_PAGAR_SANC").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZCOP_A_47_LIQ_ZVALOR_PAGAR_SANC_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_48_EXISTE_VAL_DIF").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZCOP_A_48_EXISTE_VAL_DIF_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_49_FECHA_CREACION").getText()));
doc.text(140,250,this.dateformatter(sap.ui.getCore().byId("_ZCOP_A_49_FECHA_CREACION_date").getValue()));
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_50_FECHA_MAX_PRESTENCION").getText()));
doc.text(140,265,this.dateformatter(sap.ui.getCore().byId("_ZCOP_A_50_FECHA_MAX_PRESTENCION_date").getValue()));
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_51_FECHA_VENCIMIENTO_PREST").getText()));
doc.text(140,280,this.dateformatter(sap.ui.getCore().byId("_ZCOP_A_51_FECHA_VENCIMIENTO_PREST_date").getValue()));
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_52_LIQ_MAS_OTRO_SANCIONES").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZCOP_A_52_LIQ_MAS_OTRO_SANCIONES_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_53_EMPLAZAMIENTO").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZCOP_A_53_EMPLAZAMIENTO_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_54_FUENTE_CREACION").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZCOP_A_54_FUENTE_CREACION_input").getValue());
doc.rect(138,64,45,10);
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
if(sap.m.DatePicker.prototype.isPrototypeOf(oSource) || sap.m.ComboBox.prototype.isPrototypeOf(oSource)){
if(evt.mParameters.valid===false){
oSource.setValueState(sap.ui.core.ValueState.Error);
var sMsg = sap.umc.mobile.private.app.js.utils.getFormattedText("FORMS.DATE_FORMAT",[oSource.getDisplayFormat()]);
oSource.setValueStateText(sMsg);
oSource.focus(true);
}
if(evt.mParameters.valid===true  || evt.mParameters.newValue !== ""){
oSource.setValueState(sap.ui.core.ValueState.None);
oSource.setValueStateText("");
}
}
this.setbEdited(true);
},

onChangePeriodo:function(evt){
	 
	this.onChange(evt);
	
	// Se verifica que el periodo y ano seleccionado no sea futuro.
	
	if (this.getView().getModel("ZCOPModel").getProperty("/A_04_ANIO") !== "" && this.getView().getModel("ZCOPModel").getProperty("/A_04_ANIO") !== "0000" && this.getView().getModel("ZCOPModel").getProperty("/A_03_PERIODO") !== ""){
		
		  var fechaDia = new Date();
		  var Mes = fechaDia.getMonth() + 1;
		  var ano = fechaDia.getFullYear();
		  if (this.getView().getModel("ZCOPModel").getProperty("/A_04_ANIO") > ano)
			  { 
		      alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.DIFPERIODO"));
		      this.getView().getModel("ZCOPModel").setProperty("/A_04_ANIO","");
		      this.getView().getModel("ZCOPModel").setProperty("/A_03_PERIODO","");
			  }
		  else if (this.getView().getModel("ZCOPModel").getProperty("/A_04_ANIO") == ano){
				  			  
				 if( this.getView().getModel("ZCOPModel").getProperty("/A_03_PERIODO") > Mes){
			  alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.DIFPERIODO"));
		      this.getView().getModel("ZCOPModel").setProperty("/A_04_ANIO","");
		      this.getView().getModel("ZCOPModel").setProperty("/A_03_PERIODO","");			  
				 }
		  }
		}
	},onLiveChangeUpper: function(oEvent) {

	    var input = oEvent.getSource();

	    input.setValue(input.getValue().toUpperCase());
	}

};
