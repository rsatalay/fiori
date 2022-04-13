jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZIEP.fragments.V00000.ZIEPController");
sap.umc.mobile.forms.view.forms["ZIEP"].fragments.V00000["ZIEPController"]
= {
setView: function(oView) {
this._oView = oView;
this.setDefaultValues();
this.initializeOUSOVisible();
	this.initializeOTRASANVisible();
 	this.initializeExtVisible();
 	this.initializeINEXVisible();
 	this.initializeCORRVisible();
 	this.initializeRESPVisible();
 	this.initializeAGERETVisible();
 	this.initializeSEGFIRMAVisible();
 	this.loadPeriodo();
 	this.loadSi();
 	this.loadTipoEspect();
 	// VISIBILIDADES DIRECCION...
 	this.loadAutorizo();
 	this.setValuesDireccion();
 	// FIN VISIBILIDAD DIRECCION..
},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;
},
setDefaultValues: function(){
this.FormID = "ZIEP";

},

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

// ---------------INICIO METODOS PARA DIRECCION ---------------------------------------// 

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
	 });
		this.getView().setModel(oModel2, "ZDIRModel");
		this.getView().getModel("ZDIRModel").setProperty("/A_01_VIA","");		
		this.getView().getModel("ZDIRModel").setProperty("/A_02_NUMVIA","");
		this.getView().getModel("ZDIRModel").setProperty("/A_03_LETRAVIA","");
		this.getView().getModel("ZDIRModel").setProperty("/A_04_NUMSECVIA","");
		this.getView().getModel("ZDIRModel").setProperty("/A_05_LETRASECVIA","");
		this.getView().getModel("ZDIRModel").setProperty("/A_06_BISVIA","");
		this.getView().getModel("ZDIRModel").setProperty("/A_07_SECTORVIA","");
		this.getView().getModel("ZDIRModel").setProperty("/A_08_CRUCE","");
		this.getView().getModel("ZDIRModel").setProperty("/A_09_NUMCRUCE","");
		this.getView().getModel("ZDIRModel").setProperty("/A_10_LETRACRUCE","");
		this.getView().getModel("ZDIRModel").setProperty("/A_11_NUMSECCRUCE","");
	    this.getView().getModel("ZDIRModel").setProperty("/A_12_LETRASECCRUCE","");
		this.getView().getModel("ZDIRModel").setProperty("/A_13_BISCRUCE","");
		this.getView().getModel("ZDIRModel").setProperty("/A_14_SECTORCRUCE","");
		this.getView().getModel("ZDIRModel").setProperty("/A_15_ULTDIGPLACA","");
		this.getView().getModel("ZDIRModel").setProperty("/A_16_BLOQUE","");
		this.getView().getModel("ZDIRModel").setProperty("/A_17_PISO","");
		this.getView().getModel("ZDIRModel").setProperty("/A_18_UNIDAD","");
		this.getView().getModel("ZDIRModel").setProperty("/A_19_DESUNIDAD","");
		this.getView().getModel("ZDIRModel").setProperty("/A_25_DIRRURAL","");
		this.getView().getModel("ZDIRModel").setProperty("/A_26_DIRNUMRUR","");
		this.getView().getModel("ZDIRModel").setProperty("/A_28_DIRCONCATENATE","");		
		this.getView().getModel("ZDIRModel").setProperty("/A_29_DIRPANTALLA","");
},// ACASTANEDA
initializeRURALVisible:function(){
	var oRURALVisibleModel = this.getDataProvider().initializeRURALVisible();
	this.getView().setModel(oRURALVisibleModel,"RURALVisible"); 
},
//ACASTANEDA Visibilidad direccion No Rural
initializeDIRVisible:function(){
	var oDIRVisibleModel = this.getDataProvider().initializeDIRVisiblel();
	this.getView().setModel(oDIRVisibleModel,"DIRVisible"); 
	this.getView().getModel("DIRVisible").setProperty("/visible",true);},
	//ACASTANEDA Visibilidad variable cambio de direcciOn
	initializeDIRVisible2:function(){
		var oDIRVisibleModel2 = this.getDataProvider().initializeDIRVisiblel2();
		this.getView().setModel(oDIRVisibleModel2,"DIRVisible2"); 
		this.getView().getModel("DIRVisible2").setProperty("/visible",false);
},
initializeVIAVisible:function(){
	var oVIAVisibleModel = this.getDataProvider().initializeVIAVisiblel();
	this.getView().setModel(oVIAVisibleModel,"VIAVisible"); 
	this.getView().getModel("VIAVisible").setProperty("/visible",true);
	
},onPressNewAdress:function(){

	visible = this.getView().getModel("DIRVisible2").getProperty("/visible");
	if (visible == true)
	{	
		if (this.getView().getModel("ZDIRModel").getProperty("/A_28_DIRCONCATENATE") !== "")
			{
	    	that = this
	    	// this is required since there is no direct access to the box's icons like MessageBox.Icon.WARNING
	    	jQuery.sap.require("sap.ui.commons.MessageBox");

	    	// open a fully configured message box
	    	sap.ui.commons.MessageBox.show( sap.ui.getCore().getModel("i18n").getProperty("ZDIR.MENSAJE"),
	    			sap.ui.commons.MessageBox.Icon.WARNING,
	    			sap.ui.getCore().getModel("i18n").getProperty("ZDIR.TITMENSAJE"),
	    			[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
	    			jQuery.proxy(that.erase, that),
	    			sap.ui.commons.MessageBox.Action.YES);
	    			
			}else{

				this.getView().getModel("DIRVisible2").setProperty("/visible",false);	
			}
		
		;	

	}else {
		visible = this.getView().getModel("DIRVisible2").setProperty("/visible",true);				
	}

},
erase:function(that){
	
	if (that == "YES"){
	this.getView().getModel("ZDIRModel").setProperty("/A_01_VIA","");		
	this.getView().getModel("ZDIRModel").setProperty("/A_02_NUMVIA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_03_LETRAVIA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_04_NUMSECVIA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_05_LETRASECVIA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_06_BISVIA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_07_SECTORVIA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_08_CRUCE","");
	this.getView().getModel("ZDIRModel").setProperty("/A_09_NUMCRUCE","");
	this.getView().getModel("ZDIRModel").setProperty("/A_10_LETRACRUCE","");
	this.getView().getModel("ZDIRModel").setProperty("/A_11_NUMSECCRUCE","");
	    this.getView().getModel("ZDIRModel").setProperty("/A_12_LETRASECCRUCE","");
	this.getView().getModel("ZDIRModel").setProperty("/A_13_BISCRUCE","");
	this.getView().getModel("ZDIRModel").setProperty("/A_14_SECTORCRUCE","");
	this.getView().getModel("ZDIRModel").setProperty("/A_15_ULTDIGPLACA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_16_BLOQUE","");
	this.getView().getModel("ZDIRModel").setProperty("/A_17_PISO","");
	this.getView().getModel("ZDIRModel").setProperty("/A_18_UNIDAD","");
	this.getView().getModel("ZDIRModel").setProperty("/A_19_DESUNIDAD","");
	sap.ui.getCore().byId("_ZPLU_A_24_DIRECCIONCORREGIDA_inputZIEP").setValue("");
	this.getView().getModel("ZDIRModel").setProperty("/A_24_DIRECCIONCORREGIDA","");
	this.getView().getModel("ZDIRModel").setProperty("/A_25_DIRRURAL","");
	this.getView().getModel("ZDIRModel").setProperty("/A_25_DIRRURAL","");
	this.getView().getModel("ZDIRModel").setProperty("/A_26_DIRNUMRUR","");
	this.getView().getModel("ZDIRModel").setProperty("/A_28_DIRCONCATENATE","");
	this.getView().getModel("DIRVisible2").setProperty("/visible",false);	
 	this.getView().getModel("ZIEPModel").setProperty("//A_13_DIRECCION_NOTIFICACION","");
	}
},
onEraseAdress:function(){



			this.getView().getModel("ZDIRModel").setProperty("/A_01_VIA","");		
			this.getView().getModel("ZDIRModel").setProperty("/A_02_NUMVIA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_03_LETRAVIA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_04_NUMSECVIA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_05_LETRASECVIA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_06_BISVIA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_07_SECTORVIA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_08_CRUCE","");
			this.getView().getModel("ZDIRModel").setProperty("/A_09_NUMCRUCE","");
			this.getView().getModel("ZDIRModel").setProperty("/A_10_LETRACRUCE","");
			this.getView().getModel("ZDIRModel").setProperty("/A_11_NUMSECCRUCE","");
	  	    this.getView().getModel("ZDIRModel").setProperty("/A_12_LETRASECCRUCE","");
			this.getView().getModel("ZDIRModel").setProperty("/A_13_BISCRUCE","");
			this.getView().getModel("ZDIRModel").setProperty("/A_14_SECTORCRUCE","");
			this.getView().getModel("ZDIRModel").setProperty("/A_15_ULTDIGPLACA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_16_BLOQUE","");
			this.getView().getModel("ZDIRModel").setProperty("/A_17_PISO","");
			this.getView().getModel("ZDIRModel").setProperty("/A_18_UNIDAD","");
			this.getView().getModel("ZDIRModel").setProperty("/A_19_DESUNIDAD","");
			sap.ui.getCore().byId("_ZPLU_A_24_DIRECCIONCORREGIDA_inputZIEP").setValue("");
			this.getView().getModel("ZDIRModel").setProperty("/A_24_DIRECCIONCORREGIDA","");
			this.getView().getModel("ZDIRModel").setProperty("/A_25_DIRRURAL","");
			this.getView().getModel("ZDIRModel").setProperty("/A_25_DIRRURAL","");
			this.getView().getModel("ZDIRModel").setProperty("/A_26_DIRNUMRUR","");
			this.getView().getModel("ZDIRModel").setProperty("/A_28_DIRCONCATENATE","");	
	     	this.getView().getModel("ZIEPModel").setProperty("/A_13_DIRECCION_NOTIFICACION","");
		},
		onShowAdress:function(){
			if ( this.getView().getModel("ZDIRModel").getProperty("/A_28_DIRCONCATENATE") == ""){
				DirCod = this.getView().getModel("ZIEPModel").getProperty("/A_13_DIRECCION_NOTIFICACION");
			}else{
			var DirCod =  this.getView().getModel("ZDIRModel").getProperty("/A_28_DIRCONCATENATE");;
			}
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
					this.getView().getModel("ZIEPModel").setProperty("/A_13_DIRECCION_NOTIFICACION",odata.Dirint);					
					this.getView().getModel("ZDIRModel").setProperty("/A_29_DIRPANTALLA",odata.Dirint);
					sap.ui.getCore().byId("_ZIEP_A_13_DIRECCION_NOTIFICACION_input").setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("_ZIEP_A_13_DIRECCION_NOTIFICACION_input").setValueStateText("")
					
					
					omodel.setUseBatch(true);
				}.bind(this),  
				error:function(odata){
				}
			});},	
			onChangeDireccion:function(evt){
				// Si se modifica la direcciOn:
				// INICIO DATOS DE DIRECCION
				
				this.getView().getModel("ZIEPModel").setProperty("/A_13_DIRECCION_NOTIFICACION","");	
			var v = this.getView().getModel("ZDIRModel").getProperty("/A_01_VIA");

				if (v !== "R" && v !== "N"){
				if(v == ""){
					v = " ";
				}
						this.getView().getModel("RURALVisible").setProperty("/visible",false);	
						this.getView().getModel("DIRVisible").setProperty("/visible",true);
					
			var nv = this.getView().getModel("ZDIRModel").getProperty("/A_02_NUMVIA");
			if(nv == ""  || nv == "000" ){
				nv = "   ";
				this.getView().getModel("ZDIRModel").setProperty("/A_02_NUMVIA","   ")
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
			var l = this.getView().getModel("ZDIRModel").getProperty("/A_03_LETRAVIA");
			if(l == ""){
				l = " ";
			}
			var ns = this.getView().getModel("ZDIRModel").getProperty("/A_04_NUMSECVIA");
			if(ns == "" || ns == "00" ){
				ns = "  ";
				this.getView().getModel("ZDIRModel").setProperty("/A_04_NUMSECVIA","  ");
			}else {
				ns = ns.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					ns =  this.padStart("2","0",ns);
				}else{
					ns  = ns.padStart(2, "0");
				}*/

			}
			var ls = this.getView().getModel("ZDIRModel").getProperty("/A_05_LETRASECVIA");
			if(ls == ""){
				ls = " ";
			}
			var bis = this.getView().getModel("ZDIRModel").getProperty("/A_06_BISVIA");
			if(bis == ""){
				bis = " ";
			}
			var sg = this.getView().getModel("ZDIRModel").getProperty("/A_07_SECTORVIA");
			if(sg == ""){
				sg = " ";
			}
			var cr = this.getView().getModel("ZDIRModel").getProperty("/A_08_CRUCE");
			if(cr == ""){
				cr = " ";
			}
			var nc = this.getView().getModel("ZDIRModel").getProperty("/A_09_NUMCRUCE");
			if(nc == ""|| nc == "000" ){
				nc = "   ";
				this.getView().getModel("ZDIRModel").setProperty("/A_09_NUMCRUCE","   ");
			} else {
				nc = nc.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					nc =  this.padStart("3","0",nc);
				}else{
					nc  = nc.padStart(3, "0");
				}*/

			}

			var lc = this.getView().getModel("ZDIRModel").getProperty("/A_10_LETRACRUCE");
			if(lc == ""){
				lc = " ";

			}

			var nsc = this.getView().getModel("ZDIRModel").getProperty("/A_11_NUMSECCRUCE");
			if(nsc == "" || nsc == "00" ){
				nsc = "  ";
				this.getView().getModel("ZDIRModel").setProperty("/A_11_NUMSECCRUCE","  ");
			} else {
				nsc = nsc.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					nsc =  this.padStart("2","0",nsc);
				}else{
					nsc  = nsc.padStart(2, "0");
				}*/

			}

			var lsc = this.getView().getModel("ZDIRModel").getProperty("/A_12_LETRASECCRUCE");
			if(lsc  == ""){
				lsc = " ";
			}

			var bis2 = this.getView().getModel("ZDIRModel").getProperty("/A_13_BISCRUCE");
			if(bis2 == ""){
				bis2 = " ";
			}

			var sg2 = this.getView().getModel("ZDIRModel").getProperty("/A_14_SECTORCRUCE");
			if(sg2 == ""){
				sg2 = " ";
			}

			var udp = this.getView().getModel("ZDIRModel").getProperty("/A_15_ULTDIGPLACA");
			if(udp == "" || udp == "000" ){
				udp = " 00";
				this.getView().getModel("ZDIRModel").setProperty("/A_15_ULTDIGPLACA","   ");
			} else {
				udp = udp.replace(/_/g, " ");
				/* 
				if (!String.prototype.padStart) {
					udp =  this.padStart("3","0",udp);
				}else{
					udp  = udp.padStart(3, "0");
				} */

			}


			var blq = this.getView().getModel("ZDIRModel").getProperty("/A_16_BLOQUE");
			if(blq  == ""){
				blq = "   ";
			} else {
				blq = blq.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					blq =  this.padStart("3","0",blq);
				}else{
					blq  = blq.padStart(3, "0");
				}*/
			}

			var piso = this.getView().getModel("ZDIRModel").getProperty("/A_17_PISO");
			if(piso == ""){
				piso = "  ";
			} else {
				piso = piso.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					piso =  this.padStart("2","0",piso);
				}else{
					piso  = piso.padStart(2, "0");
				}*/
			}
			var un = this.getView().getModel("ZDIRModel").getProperty("/A_18_UNIDAD");
			if(un == "" || un == "00" ){
				un = "  ";
				this.getView().getModel("ZDIRModel").setProperty("/A_18_UNIDAD","  ");
			}else {
				un = un.replace(/_/g, " ");
				/*
				if (!String.prototype.padStart) {
					un =  this.padStart("2","0",un);
				}else{
					un  = un.padStart(2, "0");
				}*/
			}
			var tun = this.getView().getModel("ZDIRModel").getProperty("/A_19_DESUNIDAD");
			if(tun == ""){
				tun = " ";
			}
			var dir = v.charAt(0)  +  nv.charAt(0) +  nv.charAt(1)  +  nv.charAt(2) + l.substring(0,1) + ns.charAt(0) + ns.charAt(1) + ls.charAt(0) + bis.charAt(0) + sg.charAt(0) + cr.charAt(0) + nc.charAt(0) + nc.charAt(1)  + nc.charAt(2)  + lc.charAt(0) + nsc.charAt(0)+ nsc.charAt(1) + lsc.charAt(0) + bis2.charAt(0) + sg2.charAt(0) + udp.charAt(0)+ udp.charAt(1)+ udp.charAt(2) + 
			           blq.charAt(0) + blq.charAt(1) + blq.charAt(2) + piso.charAt(0) + piso.charAt(1) + un.charAt(0) + un.charAt(1) + tun.charAt(0); 
			console.log(dir);
			this.getView().getModel("ZDIRModel").setProperty("/A_28_DIRCONCATENATE",dir);
			//this.getView().getModel("ZIEPModel").setProperty("/A_13_DIRECCION_NOTIFICACION",dir);

				} else {		// En caso de que sea Rural o Nangos
					
					this.getView().getModel("RURALVisible").setProperty("/visible",true);
					this.getView().getModel("DIRVisible").setProperty("/visible",false);
					
					var str1 = "*"
					var str2 = this.getView().getModel("ZDIRModel").getProperty("/A_25_DIRRURAL");
					var str3 = this.getView().getModel("ZDIRModel").getProperty("/A_26_DIRNUMRUR");
					var str4 = str1.concat(str3," ",str2);
				
					this.getView().getModel("ZDIRModel").setProperty("/A_28_DIRCONCATENATE",str4);
			    // 	this.getView().getModel("ZIEPModel").setProperty("/A_13_DIRECCION_NOTIFICACION",str4);

					;
				};
				
				if (!sap.ui.getCore().byId("_ZIEP_A_13_DIRECCION_NOTIFICACION_input").mProperties.value == ""){
					sap.ui.getCore().byId("_ZIEP_A_13_DIRECCION_NOTIFICACION_input").setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("_ZIEP_A_13_DIRECCION_NOTIFICACION_input").setValueStateText("");
				}
			// FIN DATOS DE DIRECCION
			},		
			
			

// FIN METODOS PARA DIRECCION ------------------------------------//.
setbEdited:function(bFlag){
var oController = this.getView().getController();
var oFilter = oController.getSelectedFilter();
var sCurrentFormNo = oFilter.data().CurrentFormNo;
var sKey = this.FormID;
if(oController.oAllFormsData[sKey] && oController.oAllFormsData[sKey][sCurrentFormNo])
oController.oAllFormsData[sKey][sCurrentFormNo]["bEdited"]=bFlag;
}, 
initializeRESPVisible:function(){
	var oRESPVisibleModel = this.getDataProvider().initializeRESPVisiblel();
	this.getView().setModel(oRESPVisibleModel,"RESPVisible"); 
	this.getView().getModel("RESPVisible").setProperty("/visible",false);
},
initializeAGERETVisible:function(){
	var oAGERETVisibleModel = this.getDataProvider().initializeAGERETVisiblel();
	this.getView().setModel(oAGERETVisibleModel,"AGERETVisible"); 
	this.getView().getModel("AGERETVisible").setProperty("/visible",false);
},
initializeOTRASANVisible:function(){
	var oOTRASANVisibleModel = this.getDataProvider().initializeOTRASANVisiblel();
	this.getView().setModel(oOTRASANVisibleModel,"OTRASANVisible"); 
	this.getView().getModel("OTRASANVisible").setProperty("/visible",false);
	
},initializeExtVisible:function(){
	var oEXTVisibleModel = this.getDataProvider().initializeExtVisible();
	this.getView().setModel(oEXTVisibleModel,"ExtVisible"); 
	this.getView().getModel("ExtVisible").setProperty("/visible",false);
	
},initializeCORRVisible:function(){
	var oCORRVisibleModel = this.getDataProvider().initializeCORRVisible();
	this.getView().setModel(oCORRVisibleModel,"CORRVisible"); 
	this.getView().getModel("CORRVisible").setProperty("/visible",false);
	
},initializeINEXVisible:function(){
	var oINEXVisibleModel = this.getDataProvider().initializeINEXVisible();
	this.getView().setModel(oINEXVisibleModel,"INEXVisible"); 
	this.getView().getModel("INEXVisible").setProperty("/visible",false);
	
},initializeSEGFIRMAVisible:function(){
	var oSEGFIRMAVisibleModel = this.getDataProvider().initializeSEGFIRMAVisible();
	this.getView().setModel(oSEGFIRMAVisibleModel,"SEGFIRMAVisible"); 
	this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);
},// ACASTANEDA

onChangeOTRASancion:function(evt){
	 if( evt.getParameters("selected").selected == true){
		 this.getView().getModel("OTRASANVisible").setProperty("/visible",true);	
	     this.getView().getModel("ZIEPModel").setProperty("/A_34_OTRA_SANCION","X"); 		 	
 }else{
	 this.getView().getModel("ZIEPModel").setProperty("/A_33_CUAL_OTRA","");
	 this.getView().getModel("OTRASANVisible").setProperty("/visible",false);
	 this.getView().getModel("ZIEPModel").setProperty("/A_41_VALOR_OTRA","");
	 this.getView().getModel("ZIEPModel").setProperty("/A_34_OTRA_SANCION","");
 }	    	 
},
loadPeriodo:function(){
	var oModelPeriodo = new sap.ui.model.json.JSONModel({
		results: [{"Number": 1},{"Number": 2},{"Number": 3},{"Number": 4},{"Number": 5},{"Number": 6},{"Number": 7},{"Number": 8},{"Number": 9},{"Number": 10},{"Number": 11},{"Number": 12}]
		});
		this.getView().setModel(oModelPeriodo, "Periodo");	 
},
loadSi:function(){
	var oModelSi = new sap.ui.model.json.JSONModel({
		results: [{"View": "SI", "Value": "X"},{"View": "NO", "Value": "" }]
		});
		this.getView().setModel(oModelSi, "Si");	 
},
loadTipoEspect:function(){
	var oModelTipoEspec = new sap.ui.model.json.JSONModel({
		results: [{"Value": "TEATRO MUNICIPAL"},{"Value": "TEATRO JORGE ISAAC"},{"Value": "Otro"},{"Value": ""}]
		});
		this.getView().setModel(oModelTipoEspec, "TipoEspec");	 
},
onChangeTipoEspec:function(evt){
	
 this.onChange(evt)
	
if(	evt.mParameters.newValue == "Otro"){
	
	var that = this;
	//POP UP PARA DIGITAR VALOR
	var textoPopUp = sap.ui.getCore().getModel("i18n").getProperty("ZIEP.TTA_17_LUGAR_REALIZACION") ;
	var dialog = new sap.m.Dialog({
		title: sap.ui.getCore().getModel("i18n").getProperty("ZIEP.TTLUGREA"),
		type: 'Message',
		content: [
			new sap.m.Label({ text: textoPopUp, labelFor: 'submitDialogTextarea'}),
			new sap.m.TextArea('submitDialogTextarea', {
				liveChange: function(oEvent) {
				    var input = oEvent.getSource();
				    input.setValue(input.getValue().toUpperCase());
					var sText = oEvent.getParameter('value');
					var parent = oEvent.getSource().getParent();
					var desicion = false;
					
					if (sText == "")
						{
						desicion = false;
						}
						else {
							desicion = true;
						}
					parent.getBeginButton().setEnabled(desicion);
				},
				width: '100%',
				placeholder: textoPopUp,
			})
		],
		beginButton: new sap.m.Button({
			text: 'Aceptar',
			enabled: false,
			press: function () {
				that.AgregarValorTipoId(sap.ui.getCore().byId('submitDialogTextarea').getValue());
				//var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
				dialog.close();
			}
		}),
		endButton: new sap.m.Button({
			text: 'Cancelar',
			press: function () {
				sap.ui.getCore().byId("_ZIEP_A_17_LUGAR_REALIZACION_input").setValue("");
				that.getView().getModel("ZIEPModel").setProperty("/A_17_LUGAR_REALIZACION","");
				
				dialog.close();
			}
		}),
		afterClose: function() {
			dialog.destroy();
		}
	});

	dialog.open();
	
}
},
AgregarValorTipoId:function(valor){
	
	this.getView().getModel("TipoEspec").oData.results.push({Value:valor});
	var values = this.getView().getModel("TipoEspec").oData.results;
	this.getView().getModel("TipoEspec").setProperty("/results",values);
	sap.ui.getCore().byId("_ZIEP_A_17_LUGAR_REALIZACION_input").setValue(valor);
	this.getView().getModel("ZIEPModel").setProperty("/A_17_LUGAR_REALIZACION",valor);
},
onChangeFecha:function(evt){
	

	this.onChange(evt);
	
	
	if(this.getView().getModel("ZIEPModel").getProperty("/A_22_FECHA_INICIO_ESP") !== "00000000" &&  this.getView().getModel("ZIEPModel").getProperty("/A_22_FECHA_INICIO_ESP") !== "" && this.getView().getModel("ZIEPModel").getProperty("/A_23_FECHA_FINAL_ESP") !== "00000000" &&  this.getView().getModel("ZIEPModel").getProperty("/A_23_FECHA_FINAL_ESP") !== ""  ){
		
		
		if (this.getView().getModel("ZIEPModel").getProperty("/A_22_FECHA_INICIO_ESP") >  this.getView().getModel("ZIEPModel").getProperty("/A_23_FECHA_FINAL_ESP")){
		      alert(sap.ui.getCore().getModel("i18n").getProperty("ZIEP.MSJFINICIOFIN"));

				this.getView().getModel("ZIEPModel").setProperty("/A_22_FECHA_INICIO_ESP","");
				this.getView().getModel("ZIEPModel").setProperty("/A_23_FECHA_FINAL_ESP","");
		} else {
			  var fechaDia = new Date();
			  var Mes = fechaDia.getMonth() + 1;
			  var ano = fechaDia.getFullYear();
			  var dia = fechaDia.getDate();
			  
			  var FechaDiaAMD =  ano.toString() + Mes.toString() + dia.toString();
			  
			  if (this.getView().getModel("ZIEPModel").getProperty("/A_23_FECHA_FINAL_ESP") > FechaDiaAMD ){
				  alert(sap.ui.getCore().getModel("i18n").getProperty("ZIEP.MSJFINES"));
				  this.getView().getModel("ZIEPModel").setProperty("/A_22_FECHA_INICIO_ESP","");
				  this.getView().getModel("ZIEPModel").setProperty("/A_23_FECHA_FINAL_ESP","");
			  }
		}
	}
}
,
loadAutorizo:function(){
	var oModelAutorizo = new sap.ui.model.json.JSONModel({
		results: [{"letter": "X", "User":"SI"},{"letter": " ", "User":"NO"}]
		});
		this.getView().setModel(oModelAutorizo, "Autorizo");	 
},
onChangeExt:function(evt){
	 if( evt.getParameters("selected").selected == true){
		 this.getView().getModel("ExtVisible").setProperty("/visible",true);	
	     this.getView().getModel("ZIEPModel").setProperty("/A_37_EXTEMPORANEIDAD","X"); 	

 }else{
	 this.getView().getModel("ZIEPModel").setProperty("/A_37_EXTEMPORANEIDAD","");
	 this.getView().getModel("ExtVisible").setProperty("/visible",false);
	 this.getView().getModel("ZIEPModel").setProperty("/A_40_VALOR_EXTEMPORANEA","")
     this.getView().getModel("ZIEPModel").setProperty("/A_95_EMPLAZAMIENTO","");
	 sap.ui.getCore().byId("_ZIEP_A_95_EMPLAZAMIENTO_input").setValue("NO");
 }	
	 
},onChangeCORR:function(evt){
	 if( evt.getParameters("selected").selected == true){
		 this.getView().getModel("CORRVisible").setProperty("/visible",true);	
	     this.getView().getModel("ZIEPModel").setProperty("/A_36_SCORRECCION","X"); 	

 }else{
	 this.getView().getModel("ZIEPModel").setProperty("/A_36_SCORRECCION","");
	 this.getView().getModel("CORRVisible").setProperty("/visible",false);
	 this.getView().getModel("ZIEPModel").setProperty("/A_39_VALOR_CORRECION","")
 }	
	 
},onChangeINEX:function(evt){
	 if( evt.getParameters("selected").selected == true){
		 this.getView().getModel("INEXVisible").setProperty("/visible",true);	
	     this.getView().getModel("ZIEPModel").setProperty("/A_35_INEXACTITUD","X"); 	

 }else{
	 this.getView().getModel("ZIEPModel").setProperty("/A_35_INEXACTITUD","");
	 this.getView().getModel("INEXVisible").setProperty("/visible",false);
	 this.getView().getModel("ZIEPModel").setProperty("/A_38_VALOR_INEXACTITUD","")
 }	
	 
},

initializeOUSOVisible:function(){
	var oOUSOVisibleModel = this.getDataProvider().initializeOUSOVisiblel();
	this.getView().setModel(oOUSOVisibleModel,"OUSOVisible"); 
	this.getView().getModel("OUSOVisible").setProperty("/visible",false);
	
},      InciarCheckBox:function(status){
	
	// ORIGEN MCF
	this.getView().getModel("ZIEPModel").setProperty("/A_96_FUENTE_CREACION","1");
	
	// Emplazada...
	if (this.getView().getModel("ZIEPModel").getProperty("/A_95_EMPLAZAMIENTO") == ""){
		 sap.ui.getCore().byId("_ZIEP_A_95_EMPLAZAMIENTO_input").setValue("NO");
	} else if (this.getView().getModel("ZIEPModel").getProperty("/A_95_EMPLAZAMIENTO") == "X"){
		 sap.ui.getCore().byId("_ZIEP_A_95_EMPLAZAMIENTO_input").setValue("SI");
	}
	
	
	// VISUALIZAR DIRECCIoN DE NOTIFICACIoN..
	
	if (this.getView().getModel("ZIEPModel").getProperty("/A_13_DIRECCION_NOTIFICACION") !== ""){
		var a = this.getView().getModel("ZIEPModel").getProperty("/A_13_DIRECCION_NOTIFICACION").substring(0,2);
		if (a !== 'AV' && a !== 'CL'&& a !== 'DG'&& a !== 'CR'&& a !== 'PJ'&& a !== 'TV')
		{
			this.onShowAdress();
		}
	};

	//  INICIAR TIPO DE IDENTIFICACION..
	if (this.getView().getModel("ZIEPModel").getProperty("/A_02_CC") == "X")
		{ sap.ui.getCore().byId("_ZIEP_A_02_CC_input").setSelected(true);}
	else if (this.getView().getModel("ZIEPModel").getProperty("/A_03_NIT") == "X")
		{ sap.ui.getCore().byId("_ZIEP_A_03_NIT_input").setSelected(true);}
	else if (this.getView().getModel("ZIEPModel").getProperty("/A_04_TI") == "X") {
		 sap.ui.getCore().byId("_ZIEP_A_04_TI_input").setSelected(true);
	} else if (this.getView().getModel("ZIEPModel").getProperty("/A_05_CE") == "X") {
		 sap.ui.getCore().byId("_ZIEP_A_05_CE_input").setSelected(true);
	}
	
	
	 //OPCION DE USO:
	 if (this.getView().getModel("ZIEPModel").getProperty("/A_59_CORRECCION") == "X")
		 {
		 sap.ui.getCore().byId("opcionUso_input3ZIEP").setSelected(true);
		 if (status == "DRAFT"){
     	this.getView().getModel("OUSOVisible").setProperty("/visible",true);  }  
		 }
	 else if (this.getView().getModel("ZIEPModel").getProperty("/A_58_DECLAINICIAL") == "X")
		 {
		 sap.ui.getCore().byId("opcionUso_input1ZIEP").setSelected(true);
	     	this.getView().getModel("OUSOVisible").setProperty("/visible",false);    
		 }
	 else {
		 this.getView().getModel("ZIEPModel").setProperty("/A_58_DECLAINICIAL","X");
	     sap.ui.getCore().byId("opcionUso_input1ZIEP").setSelected(true);
	 }

	 
	 
	 //CLASE DECLARANTE:
	 if (this.getView().getModel("ZIEPModel").getProperty("/A_57_AGENTE_RETENEDOR") == "X")
		 {
		 if (status == "DRAFT"){
		 this.getView().getModel("AGERETVisible").setProperty("/visible",false);
		 this.getView().getModel("RESPVisible").setProperty("/visible",true);
		 }
		 sap.ui.getCore().byId("claseDeclarante_input3ZIEP").setSelected(true); 
		 }
	 else if (this.getView().getModel("ZIEPModel").getProperty("/A_56_RESPONSABLE") == "X")
		 {
		 sap.ui.getCore().byId("claseDeclarante_input1ZIEP").setSelected(true);  
		 if (status == "DRAFT"){
		 this.getView().getModel("AGERETVisible").setProperty("/visible",true);
		 this.getView().getModel("RESPVisible").setProperty("/visible",false);
		 }
		 }	 
	 else{
		 this.getView().getModel("ZIEPModel").setProperty("/A_56_RESPONSABLE","X");
		 sap.ui.getCore().byId("claseDeclarante_input1ZIEP").setSelected(true); 
		 this.getView().getModel("AGERETVisible").setProperty("/visible",true);
		 this.getView().getModel("RESPVisible").setProperty("/visible",false);
	 }
	 
	    // SANCIONES
	    // VERSION SE PUEDE SELECCIONAR VARIOS TIPOS DE SANCION

			 if( this.getView().getModel("ZIEPModel").getProperty("/A_37_EXTEMPORANEIDAD") == "X"){
				 	sap.ui.getCore().byId("_ZIEP_A_37_EXTEMPORANEIDAD_input").setProperty("selected",true);	
				 	 if (status == "DRAFT"){
				 	this.getView().getModel("ExtVisible").setProperty("/visible",true);}
	 	  } else {
			 	sap.ui.getCore().byId("_ZIEP_A_37_EXTEMPORANEIDAD_input").setProperty("selected",false);
			 	this.getView().getModel("ExtVisible").setProperty("/visible",false);
	 	  }
			 
			 if ( this.getView().getModel("ZIEPModel").getProperty("/A_36_SCORRECCION") == "X") {
				 
			    sap.ui.getCore().byId("_ZIEP_A_36_SCORRECCION_input").setProperty("selected",true); 
			    if (status == "DRAFT"){
				 this.getView().getModel("CORRVisible").setProperty("/visible",true);}
		  }	else {
			  sap.ui.getCore().byId("_ZIEP_A_36_SCORRECCION_input").setProperty("selected",false); 
			  this.getView().getModel("CORRVisible").setProperty("/visible",false);
		  }
			 if ( this.getView().getModel("ZIEPModel").getProperty("/A_35_INEXACTITUD") == "X") {
			 	sap.ui.getCore().byId("_ZIEP_A_35_INEXACTITUD_input").setProperty("selected",true);
			 	 if (status == "DRAFT"){
			 	this.getView().getModel("INEXVisible").setProperty("/visible",true);}
	 	  }	else {
	 		 sap.ui.getCore().byId("_ZIEP_A_35_INEXACTITUD_input").setProperty("selected",false); 
	 		this.getView().getModel("INEXVisible").setProperty("/visible",false);
	 	  }
			 if ( this.getView().getModel("ZIEPModel").getProperty("/A_34_OTRA_SANCION") == "X") {
			 	sap.ui.getCore().byId("_ZIEP_A_34_OTRA_SANCION_input").setProperty("selected",true); 
			 	 if (status == "DRAFT"){
			 	this.getView().getModel("OTRASANVisible").setProperty("/visible",true);}
	 	  } else {
			 	sap.ui.getCore().byId("_ZIEP_A_34_OTRA_SANCION_input").setProperty("selected",false);
			 	this.getView().getModel("OTRASANVisible").setProperty("/visible",false);
	 	  }
			
			 
			 // TIPO IDENTIFICACION REPRESENTANTE LEGAL
			 
			if   (this.getView().getModel("ZIEPModel").getProperty("/A_09_CC_RL") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").setSelected(true);
				 sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").setSelected(false);
			}
			else if  ( this.getView().getModel("ZIEPModel").getProperty("/A_10_TI_RL") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").setSelected(true);
			}
			else if  ( this.getView().getModel("ZIEPModel").getProperty("/A_11_CE_RL") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").setSelected(true);
				 sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").setSelected(false);
			}
			else {
				 sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").setSelected(true);
				 sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").setSelected(false);
				 this.getView().getModel("ZIEPModel").setProperty("/A_09_CC_RL","X");
				 this.getView().getModel("ZIEPModel").setProperty("/A_10_TI_RL","");
				 this.getView().getModel("ZIEPModel").setProperty("/A_11_CE_RL","");
			}
			
			//TIPO DE EVENTO ACADEMICO, DEPORTIVO, RECREATIVO, OTROS.
			
			if   (this.getView().getModel("ZIEPModel").getProperty("/A_18_ACADEMICO") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").setSelected(true);

			} else{
				 sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").setSelected(false);
			}
			
			if  ( this.getView().getModel("ZIEPModel").getProperty("/A_19_DEPORTIVO") == "X"){

				 sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").setSelected(true);

			}else{
				sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").setSelected(false);
			}
			 if  ( this.getView().getModel("ZIEPModel").getProperty("/A_20_RECREATIVO") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").setSelected(true);

			}else{
				 sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").setSelected(false);
			}
			 
			 if  ( this.getView().getModel("ZIEPModel").getProperty("/A_21_OTROS_EPD") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").setSelected(true);
			} else{
				 sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").setSelected(false);
			}

			
			
			//SEGUNDA FIRMA
			if   (this.getView().getModel("ZIEPModel").getProperty("/A_51_FIRMA_CONTADOR") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_51_FIRMA_CONTADOR_input").setSelected(true);
				 sap.ui.getCore().byId("_ZIEP_A_50_REVISOR_FISCAL_input").setSelected(false);
				 if (status == "DRAFT"){
				 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);}
			}
			else if (this.getView().getModel("ZIEPModel").getProperty("/A_50_REVISOR_FISCAL") == "X"){
				 sap.ui.getCore().byId("_ZIEP_A_51_FIRMA_CONTADOR_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_50_REVISOR_FISCAL_input").setSelected(true);
				 if (status == "DRAFT"){
				 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);}
			}
			else {
				 sap.ui.getCore().byId("_ZIEP_A_51_FIRMA_CONTADOR_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_50_REVISOR_FISCAL_input").setSelected(false);
				 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);

			}
			
			// DIRECCION DEL ESPECTACULO
			var valorDirEsp = this.getView().getModel("ZIEPModel").getProperty("/A_17_LUGAR_REALIZACION");
			if   (valorDirEsp !== ""){
				this.getView().getModel("TipoEspec").oData.results.push({Value:valorDirEsp});
				var values = this.getView().getModel("TipoEspec").oData.results;
				this.getView().getModel("TipoEspec").setProperty("/results",values);
				sap.ui.getCore().byId("_ZIEP_A_17_LUGAR_REALIZACION_input").setValue(valorDirEsp);
				this.getView().getModel("ZIEPModel").setProperty("/A_17_LUGAR_REALIZACION",valorDirEsp);
			}	
			
},
onSelectIDRep:function(evt){

	 if( evt.mParameters.id == "_ZIEP_A_09_CC_RL_input"){ // cedula de ciudadania
		 
		 if (evt.getParameters("selected").selected){
			   this.getView().getModel("ZIEPModel").setProperty("/A_09_CC_RL","X"); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_10_TI_RL",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_11_CE_RL",""); 
				 sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").setSelected(false);
		 }else{
			   this.getView().getModel("ZIEPModel").setProperty("/A_09_CC_RL","");
			   this.getView().getModel("ZIEPModel").setProperty("/A_08_CEDULA_RP","");
		 }
		 	
	 }else if (evt.mParameters.id == "_ZIEP_A_10_TI_RL_input"){

		 if (evt.getParameters("selected").selected){
			   this.getView().getModel("ZIEPModel").setProperty("/A_09_CC_RL",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_10_TI_RL","X"); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_11_CE_RL",""); 
				 sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").setSelected(false);
		 }else{
			   this.getView().getModel("ZIEPModel").setProperty("/A_10_TI_RL",""); 		
			   this.getView().getModel("ZIEPModel").setProperty("/A_08_CEDULA_RP",""); 	
		 }
		 
 } else if (evt.mParameters.id == "_ZIEP_A_11_CE_RL_input"){
	 
	 if (evt.getParameters("selected").selected){
		   this.getView().getModel("ZIEPModel").setProperty("/A_09_CC_RL",""); 
		   this.getView().getModel("ZIEPModel").setProperty("/A_10_TI_RL",""); 
		   this.getView().getModel("ZIEPModel").setProperty("/A_11_CE_RL","X"); 
			 sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").setSelected(false);
			 sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").setSelected(false);
	 }else{
		   this.getView().getModel("ZIEPModel").setProperty("/A_11_CE_RL",""); 		 
	 }
	 
 }
} , onSelectTipoEspec:function(evt){
	
	

	 if( evt.mParameters.id == "_ZIEP_A_18_ACADEMICO_input"){ // cedula de ciudadania
		 
		 if (evt.getParameters("selected").selected){
			   this.getView().getModel("ZIEPModel").setProperty("/A_18_ACADEMICO","X");
			   if (this.getView().getModel("ZIEPModel").getProperty("/A_57_AGENTE_RETENEDOR") !== "X"){
			   this.getView().getModel("ZIEPModel").setProperty("/A_19_DEPORTIVO",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_20_RECREATIVO",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_21_OTROS_EPD",""); 
				 sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").setSelected(false);}
		 }else{
			   this.getView().getModel("ZIEPModel").setProperty("/A_18_ACADEMICO",""); 		 
		 }
		 	
	 }else if (evt.mParameters.id == "_ZIEP_A_19_DEPORTIVO_input"){

		 if (evt.getParameters("selected").selected){
			    
			   this.getView().getModel("ZIEPModel").setProperty("/A_19_DEPORTIVO","X");
			   
			   if (this.getView().getModel("ZIEPModel").getProperty("/A_57_AGENTE_RETENEDOR") !== "X"){
				   this.getView().getModel("ZIEPModel").setProperty("/A_18_ACADEMICO","");
			   this.getView().getModel("ZIEPModel").setProperty("/A_20_RECREATIVO",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_21_OTROS_EPD",""); 
				 sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").setSelected(false);
				 sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").setSelected(false);
			   }
		 }else{
			   this.getView().getModel("ZIEPModel").setProperty("/A_19_DEPORTIVO",""); 		 
		 }
		 
} else if (evt.mParameters.id == "_ZIEP_A_20_RECREATIVO_input"){
	 
	 if (evt.getParameters("selected").selected){
		   this.getView().getModel("ZIEPModel").setProperty("/A_20_RECREATIVO","X");
		 if (this.getView().getModel("ZIEPModel").getProperty("/A_57_AGENTE_RETENEDOR") !== "X"){
		   this.getView().getModel("ZIEPModel").setProperty("/A_18_ACADEMICO",""); 
		   this.getView().getModel("ZIEPModel").setProperty("/A_19_DEPORTIVO",""); 
		   this.getView().getModel("ZIEPModel").setProperty("/A_21_OTROS_EPD",""); 
			 sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").setSelected(false);
			 sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").setSelected(false);
			 sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").setSelected(false);
		 }
	 }else{
		   this.getView().getModel("ZIEPModel").setProperty("/A_20_RECREATIVO",""); 		 
	 }
	 
} else if (evt.mParameters.id == "_ZIEP_A_21_OTROS_EPD_input"){
	
	 if (evt.getParameters("selected").selected){
		   this.getView().getModel("ZIEPModel").setProperty("/A_21_OTROS_EPD","X");
		 if (this.getView().getModel("ZIEPModel").getProperty("/A_57_AGENTE_RETENEDOR") !== "X"){

		   this.getView().getModel("ZIEPModel").setProperty("/A_18_ACADEMICO",""); 
		   this.getView().getModel("ZIEPModel").setProperty("/A_19_DEPORTIVO",""); 
		   this.getView().getModel("ZIEPModel").setProperty("/A_20_RECREATIVO",""); 
			 sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").setSelected(false);
			 sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").setSelected(false);
			 sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").setSelected(false); }
	 }else{
		   this.getView().getModel("ZIEPModel").setProperty("/A_21_OTROS_EPD",""); 		 
	 }

}
	 
	 
} , onSelectSegundaFirma:function(evt){

	 if( evt.mParameters.id == "_ZIEP_A_51_FIRMA_CONTADOR_input"){ // cedula de ciudadania
		 
		 if (evt.getParameters("selected").selected){
			 	this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);
			   this.getView().getModel("ZIEPModel").setProperty("/A_51_FIRMA_CONTADOR","X"); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_50_REVISOR_FISCAL",""); 
				 sap.ui.getCore().byId("_ZIEP_A_50_REVISOR_FISCAL_input").setSelected(false);
		 }else{
			 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);
			   this.getView().getModel("ZIEPModel").setProperty("/A_51_FIRMA_CONTADOR",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_52_NOMBRE_CONT_FISC",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_53_NUMERO_CONT_FISC",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_54_TARJETA_PROF",""); 
			   
		 }
		 	
	 }else if (evt.mParameters.id == "_ZIEP_A_50_REVISOR_FISCAL_input"){

		 if (evt.getParameters("selected").selected){
			  this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",true);   
			   this.getView().getModel("ZIEPModel").setProperty("/A_51_FIRMA_CONTADOR",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_50_REVISOR_FISCAL","X"); 
				 sap.ui.getCore().byId("_ZIEP_A_51_FIRMA_CONTADOR_input").setSelected(false);
		 }else{
			 this.getView().getModel("SEGFIRMAVisible").setProperty("/visible",false);   
			   this.getView().getModel("ZIEPModel").setProperty("/A_50_REVISOR_FISCAL",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_52_NOMBRE_CONT_FISC",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_53_NUMERO_CONT_FISC",""); 
			   this.getView().getModel("ZIEPModel").setProperty("/A_54_TARJETA_PROF",""); 
		 }
		 
} 
}
    ,handleUploadPress: function(oEvent) {
        var oThis = this;
        if (!oThis.fileUploader) {
            oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploaderZIEP", {
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
        var file = jQuery.sap.domById("fileUploaderZIEP-fu").files[0];
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


sap.ui.getCore().byId("_ZIEP_A_00_PRO_O_RAZON_SOCIAL_input").setValue(json[0].Value);
sap.ui.getCore().byId("_ZIEP_A_01_NUM_IDENTIDAD_input").setValue(json[1].Value);
sap.ui.getCore().byId("_ZIEP_A_02_CC_input").setValue(json[2].Value);
sap.ui.getCore().byId("_ZIEP_A_03_NIT_input").setValue(json[3].Value);
sap.ui.getCore().byId("_ZIEP_A_04_TI_input").setValue(json[4].Value);
sap.ui.getCore().byId("_ZIEP_A_05_CE_input").setValue(json[5].Value);
sap.ui.getCore().byId("_ZIEP_A_06_DV_input").setValue(json[6].Value);
sap.ui.getCore().byId("_ZIEP_A_07_REPRESENTANTE_LEGAL_input").setValue(json[7].Value);
sap.ui.getCore().byId("_ZIEP_A_08_CEDULA_RP_input").setValue(json[8].Value);
sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").setValue(json[9].Value);
sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").setValue(json[10].Value);
sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").setValue(json[11].Value);
sap.ui.getCore().byId("_ZIEP_A_12_TELEFONO_input").setValue(json[12].Value);
sap.ui.getCore().byId("_ZIEP_A_13_DIRECCION_NOTIFICACION_input").setValue(json[13].Value);
sap.ui.getCore().byId("_ZIEP_A_14_CORREO_ELECTRONICO_input").setValue(json[14].Value);
sap.ui.getCore().byId("_ZIEP_A_15_AUTORIZO_EMAIL_input").setValue(json[15].Value);
sap.ui.getCore().byId("_ZIEP_A_16_NOMBRE_ESPECTACULO_input").setValue(json[16].Value);
sap.ui.getCore().byId("_ZIEP_A_17_LUGAR_REALIZACION_input").setValue(json[17].Value);
sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").setValue(json[18].Value);
sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").setValue(json[19].Value);
sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").setValue(json[20].Value);
sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").setValue(json[21].Value);
sap.ui.getCore().byId("_ZIEP_A_22_FECHA_INICIO_ESP_date").setValue(json[22].Value);
sap.ui.getCore().byId("_ZIEP_A_23_FECHA_FINAL_ESP_date").setValue(json[23].Value);
sap.ui.getCore().byId("_ZIEP_A_24_TOTAL_IMP_GRAVADOS_input").setValue(json[24].Value);
sap.ui.getCore().byId("_ZIEP_A_25_BASE_GRAVABLE_input").setValue(json[25].Value);
sap.ui.getCore().byId("_ZIEP_A_26_BG_SIS_RETENCION_FUENTE_input").setValue(json[26].Value);
sap.ui.getCore().byId("_ZIEP_A_27_IMP_MUN_ESP_PUBLICO_input").setValue(json[27].Value);
sap.ui.getCore().byId("_ZIEP_A_28_IMP_MUN_ESP_DEPORTE_input").setValue(json[28].Value);
sap.ui.getCore().byId("_ZIEP_A_29_RET_IMP_MUN_ESP_PUBLICO_input").setValue(json[29].Value);
sap.ui.getCore().byId("_ZIEP_A_30_RET_IMP_MUN_ESP_DEPORTE_input").setValue(json[30].Value);
sap.ui.getCore().byId("_ZIEP_A_31_TOTAL_IMPUESTOS_input").setValue(json[31].Value);
sap.ui.getCore().byId("_ZIEP_A_32_TOTAL_RETENCIONES_input").setValue(json[32].Value);
sap.ui.getCore().byId("_ZIEP_A_33_CUAL_OTRA_input").setValue(json[33].Value);
sap.ui.getCore().byId("_ZIEP_A_34_OTRA_SANCION_input").setValue(json[34].Value);
sap.ui.getCore().byId("_ZIEP_A_35_INEXACTITUD_input").setValue(json[35].Value);
sap.ui.getCore().byId("_ZIEP_A_36_SCORRECCION_input").setValue(json[36].Value);
sap.ui.getCore().byId("_ZIEP_A_37_EXTEMPORANEIDAD_input").setValue(json[37].Value);
sap.ui.getCore().byId("_ZIEP_A_38_VALOR_INEXACTITUD_input").setValue(json[38].Value);
sap.ui.getCore().byId("_ZIEP_A_39_VALOR_CORRECION_input").setValue(json[39].Value);
sap.ui.getCore().byId("_ZIEP_A_40_VALOR_EXTEMPORANEA_input").setValue(json[40].Value);
sap.ui.getCore().byId("_ZIEP_A_41_VALOR_OTRA_input").setValue(json[41].Value);
sap.ui.getCore().byId("_ZIEP_A_42_VALOR_SANCIONES_input").setValue(json[42].Value);
sap.ui.getCore().byId("_ZIEP_A_43_TOTAL_SALDO_CARGO_input").setValue(json[43].Value);
sap.ui.getCore().byId("_ZIEP_A_44_ZVALOR_A_PAGAR_input").setValue(json[44].Value);
sap.ui.getCore().byId("_ZIEP_A_45_ZVALOR_PAGAR_SANCIONES_input").setValue(json[45].Value);
sap.ui.getCore().byId("_ZIEP_A_46_ZINTERESES_MORA_input").setValue(json[46].Value);
sap.ui.getCore().byId("_ZIEP_A_47_TOTAL_PAGAR_input").setValue(json[47].Value);
sap.ui.getCore().byId("_ZIEP_A_48_NOMBRE_DECLARANTE_input").setValue(json[48].Value);
sap.ui.getCore().byId("_ZIEP_A_49_NUMERO_DECLARANTE_input").setValue(json[49].Value);
sap.ui.getCore().byId("_ZIEP_A_50_REVISOR_FISCAL_input").setValue(json[50].Value);
sap.ui.getCore().byId("_ZIEP_A_51_FIRMA_CONTADOR_input").setValue(json[51].Value);
sap.ui.getCore().byId("_ZIEP_A_52_NOMBRE_CONT_FISC_input").setValue(json[52].Value);
sap.ui.getCore().byId("_ZIEP_A_53_NUMERO_CONT_FISC_input").setValue(json[53].Value);
sap.ui.getCore().byId("_ZIEP_A_54_TARJETA_PROF_input").setValue(json[54].Value);
sap.ui.getCore().byId("_ZIEP_A_55_NO_FORMULARIO_input").setValue(json[55].Value);
sap.ui.getCore().byId("_ZIEP_A_56_RESPONSABLE_input").setValue(json[56].Value);
sap.ui.getCore().byId("_ZIEP_A_57_AGENTE_RETENEDOR_input").setValue(json[57].Value);
sap.ui.getCore().byId("_ZIEP_A_58_DECLAINICIAL_input").setValue(json[58].Value);
sap.ui.getCore().byId("_ZIEP_A_59_CORRECCION_input").setValue(json[59].Value);
sap.ui.getCore().byId("_ZIEP_A_60_DECLANUM_input").setValue(json[60].Value);
sap.ui.getCore().byId("_ZIEP_A_61_PERIODO_input").setValue(json[61].Value);
sap.ui.getCore().byId("_ZIEP_A_62_ANO_input").setValue(json[62].Value);
sap.ui.getCore().byId("_ZIEP_A_63_FECHA_VENCIMIENTO_date").setValue(json[63].Value);
sap.ui.getCore().byId("_ZIEP_A_64_FECHA_PRESENTACION_date").setValue(json[64].Value);
sap.ui.getCore().byId("_ZIEP_A_65_DIRECCION_ESTABLECIMIENTO_input").setValue(json[65].Value);
sap.ui.getCore().byId("_ZIEP_A_67_LIQ_BASE_GRAVABLE_input").setValue(json[66].Value);
sap.ui.getCore().byId("_ZIEP_A_68_LIQ_BG_SIS_RETENCION_FUEN_input").setValue(json[67].Value);
sap.ui.getCore().byId("_ZIEP_A_69_LIQ_IMP_MUN_ESP_PUBLICO_input").setValue(json[68].Value);
sap.ui.getCore().byId("_ZIEP_A_70_LIQ_IMP_MUN_ESP_DEPORTE_input").setValue(json[69].Value);
sap.ui.getCore().byId("_ZIEP_A_71_LIQ_RET_IMP_MUN_ESP_PUBLI_input").setValue(json[70].Value);
sap.ui.getCore().byId("_ZIEP_A_72_LIQ_RET_IMP_MUN_ESP_DEPOR_input").setValue(json[71].Value);
sap.ui.getCore().byId("_ZIEP_A_73_LIQ_TOTAL_IMPUESTOS_input").setValue(json[72].Value);
sap.ui.getCore().byId("_ZIEP_A_74_LIQ_TOTAL_RETENCIONES_input").setValue(json[73].Value);
sap.ui.getCore().byId("_ZIEP_A_75_LIQ_VALOR_INEXACTITUD_input").setValue(json[74].Value);
sap.ui.getCore().byId("_ZIEP_A_76_LIQ_VALOR_CORRECION_input").setValue(json[75].Value);
sap.ui.getCore().byId("_ZIEP_A_77_LIQ_VALOR_EXTEMPORANEA_input").setValue(json[76].Value);
sap.ui.getCore().byId("_ZIEP_A_78_LIQ_VALOR_SANCIONES_input").setValue(json[77].Value);
sap.ui.getCore().byId("_ZIEP_A_79_LIQ_TOTAL_SALDO_CARGO_input").setValue(json[78].Value);
sap.ui.getCore().byId("_ZIEP_A_80_LIQ_INTERESES_MORA_input").setValue(json[79].Value);
sap.ui.getCore().byId("_ZIEP_A_81_TOTAL_PAGAR_input").setValue(json[80].Value);
sap.ui.getCore().byId("_ZIEP_A_82_NO_RESOLUCION_input").setValue(json[81].Value);
sap.ui.getCore().byId("_ZIEP_A_83_FECHA_RESOLUCION_date").setValue(json[82].Value);
sap.ui.getCore().byId("_ZIEP_A_66_LIQ_TOTAL_IMP_GRAVADOS_input").setValue(json[83].Value);
sap.ui.getCore().byId("_ZIEP_A_84_EXISTE_DIFERENCIA_input").setValue(json[84].Value);
sap.ui.getCore().byId("_ZIEP_A_85_FECHA_VENCIMIENTO_PREST_date").setValue(json[85].Value);
sap.ui.getCore().byId("_ZIEP_A_86_FECHA_CREACION_date").setValue(json[86].Value);
sap.ui.getCore().byId("_ZIEP_A_88_EXISTE_VAL_DIF_input").setValue(json[87].Value);
sap.ui.getCore().byId("_ZIEP_A_89_LIQ_INT_MORA_DEP_input").setValue(json[88].Value);
sap.ui.getCore().byId("_ZIEP_A_90_LIQ_INT_MORA_ESP_PUB_input").setValue(json[89].Value);
sap.ui.getCore().byId("_ZIEP_A_91_LIQ_VALOR_A_PAGAR_input").setValue(json[90].Value);
sap.ui.getCore().byId("_ZIEP_A_92_FECHA_MAX_PRESTENCION_date").setValue(json[91].Value);
sap.ui.getCore().byId("_ZIEP_A_94_LIQ_VALOR_PAGAR_SANCIONES_input").setValue(json[92].Value);
sap.ui.getCore().byId("_ZIEP_A_95_EMPLAZAMIENTO_input").setValue(json[93].Value);
sap.ui.getCore().byId("_ZIEP_A_96_FUENTE_CREACION_input").setValue(json[94].Value);

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


doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_00_PRO_O_RAZON_SOCIAL").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZIEP_A_00_PRO_O_RAZON_SOCIAL_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_01_NUM_IDENTIDAD").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZIEP_A_01_NUM_IDENTIDAD_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_02_CC").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZIEP_A_02_CC_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_03_NIT").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZIEP_A_03_NIT_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_04_TI").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZIEP_A_04_TI_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_05_CE").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZIEP_A_05_CE_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_06_DV").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZIEP_A_06_DV_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_07_REPRESENTANTE_LEGAL").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZIEP_A_07_REPRESENTANTE_LEGAL_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_08_CEDULA_RP").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZIEP_A_08_CEDULA_RP_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_09_CC_RL").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZIEP_A_09_CC_RL_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_10_TI_RL").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZIEP_A_10_TI_RL_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_11_CE_RL").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZIEP_A_11_CE_RL_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_12_TELEFONO").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZIEP_A_12_TELEFONO_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_13_DIRECCION_NOTIFICACION").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZIEP_A_13_DIRECCION_NOTIFICACION_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_14_CORREO_ELECTRONICO").getText()));
doc.text(140,250,sap.ui.getCore().byId("_ZIEP_A_14_CORREO_ELECTRONICO_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_15_AUTORIZO_EMAIL").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZIEP_A_15_AUTORIZO_EMAIL_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_16_NOMBRE_ESPECTACULO").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZIEP_A_16_NOMBRE_ESPECTACULO_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_17_LUGAR_REALIZACION").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZIEP_A_17_LUGAR_REALIZACION_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_18_ACADEMICO").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_19_DEPORTIVO").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_20_RECREATIVO").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_21_OTROS_EPD").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_22_FECHA_INICIO_ESP").getText()));
doc.text(140,115,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_22_FECHA_INICIO_ESP_date").getValue()));
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_23_FECHA_FINAL_ESP").getText()));
doc.text(140,130,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_23_FECHA_FINAL_ESP_date").getValue()));
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_24_TOTAL_IMP_GRAVADOS").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZIEP_A_24_TOTAL_IMP_GRAVADOS_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_25_BASE_GRAVABLE").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZIEP_A_25_BASE_GRAVABLE_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_26_BG_SIS_RETENCION_FUENTE").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZIEP_A_26_BG_SIS_RETENCION_FUENTE_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_27_IMP_MUN_ESP_PUBLICO").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZIEP_A_27_IMP_MUN_ESP_PUBLICO_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_28_IMP_MUN_ESP_DEPORTE").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZIEP_A_28_IMP_MUN_ESP_DEPORTE_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_29_RET_IMP_MUN_ESP_PUBLICO").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZIEP_A_29_RET_IMP_MUN_ESP_PUBLICO_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_30_RET_IMP_MUN_ESP_DEPORTE").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZIEP_A_30_RET_IMP_MUN_ESP_DEPORTE_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_31_TOTAL_IMPUESTOS").getText()));
doc.text(140,250,sap.ui.getCore().byId("_ZIEP_A_31_TOTAL_IMPUESTOS_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_32_TOTAL_RETENCIONES").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZIEP_A_32_TOTAL_RETENCIONES_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_33_CUAL_OTRA").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZIEP_A_33_CUAL_OTRA_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_34_OTRA_SANCION").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZIEP_A_34_OTRA_SANCION_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_35_INEXACTITUD").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZIEP_A_35_INEXACTITUD_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_36_SCORRECCION").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZIEP_A_36_SCORRECCION_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_37_EXTEMPORANEIDAD").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZIEP_A_37_EXTEMPORANEIDAD_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_38_VALOR_INEXACTITUD").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZIEP_A_38_VALOR_INEXACTITUD_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_39_VALOR_CORRECION").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZIEP_A_39_VALOR_CORRECION_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_40_VALOR_EXTEMPORANEA").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZIEP_A_40_VALOR_EXTEMPORANEA_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_41_VALOR_OTRA").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZIEP_A_41_VALOR_OTRA_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_42_VALOR_SANCIONES").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZIEP_A_42_VALOR_SANCIONES_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_43_TOTAL_SALDO_CARGO").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZIEP_A_43_TOTAL_SALDO_CARGO_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_44_ZVALOR_A_PAGAR").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZIEP_A_44_ZVALOR_A_PAGAR_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_45_ZVALOR_PAGAR_SANCIONES").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZIEP_A_45_ZVALOR_PAGAR_SANCIONES_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_46_ZINTERESES_MORA").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZIEP_A_46_ZINTERESES_MORA_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_47_TOTAL_PAGAR").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZIEP_A_47_TOTAL_PAGAR_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_48_NOMBRE_DECLARANTE").getText()));
doc.text(140,250,sap.ui.getCore().byId("_ZIEP_A_48_NOMBRE_DECLARANTE_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_49_NUMERO_DECLARANTE").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZIEP_A_49_NUMERO_DECLARANTE_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_50_REVISOR_FISCAL").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZIEP_A_50_REVISOR_FISCAL_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_51_FIRMA_CONTADOR").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZIEP_A_51_FIRMA_CONTADOR_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_52_NOMBRE_CONT_FISC").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZIEP_A_52_NOMBRE_CONT_FISC_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_53_NUMERO_CONT_FISC").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZIEP_A_53_NUMERO_CONT_FISC_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_54_TARJETA_PROF").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZIEP_A_54_TARJETA_PROF_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_55_NO_FORMULARIO").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZIEP_A_55_NO_FORMULARIO_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_56_RESPONSABLE").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZIEP_A_56_RESPONSABLE_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_57_AGENTE_RETENEDOR").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZIEP_A_57_AGENTE_RETENEDOR_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_58_DECLAINICIAL").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZIEP_A_58_DECLAINICIAL_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_59_CORRECCION").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZIEP_A_59_CORRECCION_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_60_DECLANUM").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZIEP_A_60_DECLANUM_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_61_PERIODO").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZIEP_A_61_PERIODO_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_62_ANO").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZIEP_A_62_ANO_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_63_FECHA_VENCIMIENTO").getText()));
doc.text(140,220,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_63_FECHA_VENCIMIENTO_date").getValue()));
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_64_FECHA_PRESENTACION").getText()));
doc.text(140,235,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_64_FECHA_PRESENTACION_date").getValue()));
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_65_DIRECCION_ESTABLECIMIENTO").getText()));
doc.text(140,250,sap.ui.getCore().byId("_ZIEP_A_65_DIRECCION_ESTABLECIMIENTO_input").getValue());
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_67_LIQ_BASE_GRAVABLE").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZIEP_A_67_LIQ_BASE_GRAVABLE_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_68_LIQ_BG_SIS_RETENCION_FUEN").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZIEP_A_68_LIQ_BG_SIS_RETENCION_FUEN_input").getValue());
doc.rect(138,274,45,10);

doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_69_LIQ_IMP_MUN_ESP_PUBLICO").getText()));
doc.text(140,40,sap.ui.getCore().byId("_ZIEP_A_69_LIQ_IMP_MUN_ESP_PUBLICO_input").getValue());
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_70_LIQ_IMP_MUN_ESP_DEPORTE").getText()));
doc.text(140,55,sap.ui.getCore().byId("_ZIEP_A_70_LIQ_IMP_MUN_ESP_DEPORTE_input").getValue());
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_71_LIQ_RET_IMP_MUN_ESP_PUBLI").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZIEP_A_71_LIQ_RET_IMP_MUN_ESP_PUBLI_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_72_LIQ_RET_IMP_MUN_ESP_DEPOR").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZIEP_A_72_LIQ_RET_IMP_MUN_ESP_DEPOR_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_73_LIQ_TOTAL_IMPUESTOS").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZIEP_A_73_LIQ_TOTAL_IMPUESTOS_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_74_LIQ_TOTAL_RETENCIONES").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZIEP_A_74_LIQ_TOTAL_RETENCIONES_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_75_LIQ_VALOR_INEXACTITUD").getText()));
doc.text(140,130,sap.ui.getCore().byId("_ZIEP_A_75_LIQ_VALOR_INEXACTITUD_input").getValue());
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_76_LIQ_VALOR_CORRECION").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZIEP_A_76_LIQ_VALOR_CORRECION_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_77_LIQ_VALOR_EXTEMPORANEA").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZIEP_A_77_LIQ_VALOR_EXTEMPORANEA_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_78_LIQ_VALOR_SANCIONES").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZIEP_A_78_LIQ_VALOR_SANCIONES_input").getValue());
doc.rect(138,169,45,10);
doc.text(20,190, this.lengthformatter(sap.ui.getCore().byId("A_79_LIQ_TOTAL_SALDO_CARGO").getText()));
doc.text(140,190,sap.ui.getCore().byId("_ZIEP_A_79_LIQ_TOTAL_SALDO_CARGO_input").getValue());
doc.rect(138,184,45,10);
doc.text(20,205, this.lengthformatter(sap.ui.getCore().byId("A_80_LIQ_INTERESES_MORA").getText()));
doc.text(140,205,sap.ui.getCore().byId("_ZIEP_A_80_LIQ_INTERESES_MORA_input").getValue());
doc.rect(138,199,45,10);
doc.text(20,220, this.lengthformatter(sap.ui.getCore().byId("A_81_TOTAL_PAGAR").getText()));
doc.text(140,220,sap.ui.getCore().byId("_ZIEP_A_81_TOTAL_PAGAR_input").getValue());
doc.rect(138,214,45,10);
doc.text(20,235, this.lengthformatter(sap.ui.getCore().byId("A_82_NO_RESOLUCION").getText()));
doc.text(140,235,sap.ui.getCore().byId("_ZIEP_A_82_NO_RESOLUCION_input").getValue());
doc.rect(138,229,45,10);
doc.text(20,250, this.lengthformatter(sap.ui.getCore().byId("A_83_FECHA_RESOLUCION").getText()));
doc.text(140,250,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_83_FECHA_RESOLUCION_date").getValue()));
doc.rect(138,244,45,10);
doc.text(20,265, this.lengthformatter(sap.ui.getCore().byId("A_66_LIQ_TOTAL_IMP_GRAVADOS").getText()));
doc.text(140,265,sap.ui.getCore().byId("_ZIEP_A_66_LIQ_TOTAL_IMP_GRAVADOS_input").getValue());
doc.rect(138,259,45,10);
doc.text(20,280, this.lengthformatter(sap.ui.getCore().byId("A_84_EXISTE_DIFERENCIA").getText()));
doc.text(140,280,sap.ui.getCore().byId("_ZIEP_A_84_EXISTE_DIFERENCIA_input").getValue());
doc.rect(138,274,45,10);
doc.addPage();
doc.setLineWidth(0.5);
doc.text(20,40, this.lengthformatter(sap.ui.getCore().byId("A_85_FECHA_VENCIMIENTO_PREST").getText()));
doc.text(140,40,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_85_FECHA_VENCIMIENTO_PREST_date").getValue()));
doc.rect(138,34,45,10);
doc.text(20,55, this.lengthformatter(sap.ui.getCore().byId("A_86_FECHA_CREACION").getText()));
doc.text(140,55,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_86_FECHA_CREACION_date").getValue()));
doc.rect(138,49,45,10);
doc.text(20,70, this.lengthformatter(sap.ui.getCore().byId("A_88_EXISTE_VAL_DIF").getText()));
doc.text(140,70,sap.ui.getCore().byId("_ZIEP_A_88_EXISTE_VAL_DIF_input").getValue());
doc.rect(138,64,45,10);
doc.text(20,85, this.lengthformatter(sap.ui.getCore().byId("A_89_LIQ_INT_MORA_DEP").getText()));
doc.text(140,85,sap.ui.getCore().byId("_ZIEP_A_89_LIQ_INT_MORA_DEP_input").getValue());
doc.rect(138,79,45,10);
doc.text(20,100, this.lengthformatter(sap.ui.getCore().byId("A_90_LIQ_INT_MORA_ESP_PUB").getText()));
doc.text(140,100,sap.ui.getCore().byId("_ZIEP_A_90_LIQ_INT_MORA_ESP_PUB_input").getValue());
doc.rect(138,94,45,10);
doc.text(20,115, this.lengthformatter(sap.ui.getCore().byId("A_91_LIQ_VALOR_A_PAGAR").getText()));
doc.text(140,115,sap.ui.getCore().byId("_ZIEP_A_91_LIQ_VALOR_A_PAGAR_input").getValue());
doc.rect(138,109,45,10);
doc.text(20,130, this.lengthformatter(sap.ui.getCore().byId("A_92_FECHA_MAX_PRESTENCION").getText()));
doc.text(140,130,this.dateformatter(sap.ui.getCore().byId("_ZIEP_A_92_FECHA_MAX_PRESTENCION_date").getValue()));
doc.rect(138,124,45,10);
doc.text(20,145, this.lengthformatter(sap.ui.getCore().byId("A_94_LIQ_VALOR_PAGAR_SANCIONES").getText()));
doc.text(140,145,sap.ui.getCore().byId("_ZIEP_A_94_LIQ_VALOR_PAGAR_SANCIONES_input").getValue());
doc.rect(138,139,45,10);
doc.text(20,160, this.lengthformatter(sap.ui.getCore().byId("A_95_EMPLAZAMIENTO").getText()));
doc.text(140,160,sap.ui.getCore().byId("_ZIEP_A_95_EMPLAZAMIENTO_input").getValue());
doc.rect(138,154,45,10);
doc.text(20,175, this.lengthformatter(sap.ui.getCore().byId("A_96_FUENTE_CREACION").getText()));
doc.text(140,175,sap.ui.getCore().byId("_ZIEP_A_96_FUENTE_CREACION_input").getValue());
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
     
     opcionUsoSelect:function(evt){
    		var oSelectedIndex = evt.getParameter("selectedIndex");  
    		var oRadioButtonSrc = evt.getSource().getAggregation("buttons");  
    		var oSelectedRadioText = oRadioButtonSrc[oSelectedIndex].getText();

    		if (oSelectedRadioText == sap.ui.getCore().getModel("i18n").getProperty("ZIEP.CORRECCION")){
    			
    			this.getView().getModel("OUSOVisible").setProperty("/visible",true);
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_59_CORRECCION","X");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_58_DECLAINICIAL","");
    		} else if (oSelectedRadioText == sap.ui.getCore().getModel("i18n").getProperty("ZIEP.DECINICIAL")){

    	    	this.getView().getModel("ZIEPModel").setProperty("/A_59_CORRECCION","");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_58_DECLAINICIAL","X");
    			this.getView().getModel("OUSOVisible").setProperty("/visible",false);	
    			this.getView().getModel("ZIEPModel").setProperty("/A_60_DECLANUM","");
    		}
    	},
    	claseDeclaranteSelect:function(evt){
    		var oSelectedIndex = evt.getParameter("selectedIndex");  
    		var oRadioButtonSrc = evt.getSource().getAggregation("buttons");  
    		var oSelectedRadioText = oRadioButtonSrc[oSelectedIndex].getText();

    		if (oSelectedRadioText == "Agente Retenedor"){
    			
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_57_AGENTE_RETENEDOR","X");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_56_RESPONSABLE","");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_25_BASE_GRAVABLE",""); //18
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_67_LIQ_BASE_GRAVABLE");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_27_IMP_MUN_ESP_PUBLICO",""); //20
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_69_LIQ_IMP_MUN_ESP_PUBLICO");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_28_IMP_MUN_ESP_DEPORTE",""); //21
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_70_LIQ_IMP_MUN_ESP_DEPORTE");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_31_TOTAL_IMPUESTOS",""); //24
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_73_LIQ_TOTAL_IMPUESTOS","");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_22_FECHA_INICIO_ESP","");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_23_FECHA_FINAL_ESP","");
				sap.ui.getCore().byId("_ZIEP_A_22_FECHA_INICIO_ESP_date").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("_ZIEP_A_22_FECHA_INICIO_ESP_date").setValueStateText("")	
				sap.ui.getCore().byId("_ZIEP_A_23_FECHA_FINAL_ESP_date").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("_ZIEP_A_23_FECHA_FINAL_ESP_date").setValueStateText("")	
    			 this.getView().getModel("AGERETVisible").setProperty("/visible",false);
    			 this.getView().getModel("RESPVisible").setProperty("/visible",true);
    		} else if (oSelectedRadioText == "Responsable"){
    			
                this.getView().getModel("ZIEPModel").setProperty("/A_18_ACADEMICO",""); 
    		  	this.getView().getModel("ZIEPModel").setProperty("/A_19_DEPORTIVO",""); 
    			this.getView().getModel("ZIEPModel").setProperty("/A_20_RECREATIVO",""); 
    			this.getView().getModel("ZIEPModel").setProperty("/A_21_OTROS_EPD",""); 
    			sap.ui.getCore().byId("_ZIEP_A_19_DEPORTIVO_input").setSelected(false);
    			sap.ui.getCore().byId("_ZIEP_A_20_RECREATIVO_input").setSelected(false);
    			sap.ui.getCore().byId("_ZIEP_A_21_OTROS_EPD_input").setSelected(false);
    			sap.ui.getCore().byId("_ZIEP_A_18_ACADEMICO_input").setSelected(false);
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_56_RESPONSABLE","X");
    			this.getView().getModel("ZIEPModel").setProperty("/A_57_AGENTE_RETENEDOR","");	
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_26_BG_SIS_RETENCION_FUENTE",""); //19
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_68_LIQ_BG_SIS_RETENCION_FUEN");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_29_RET_IMP_MUN_ESP_PUBLICO",""); //
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_71_LIQ_RET_IMP_MUN_ESP_PUBLI");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_30_RET_IMP_MUN_ESP_DEPORTE",""); //23
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_72_LIQ_RET_IMP_MUN_ESP_DEPOR");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_32_TOTAL_RETENCIONES",""); //25
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_74_LIQ_TOTAL_RETENCIONES","");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_82_NO_RESOLUCION","");
    	     	this.getView().getModel("ZIEPModel").setProperty("/A_83_FECHA_RESOLUCION","");
    			 this.getView().getModel("AGERETVisible").setProperty("/visible",true);
    			 this.getView().getModel("RESPVisible").setProperty("/visible",false);
    		}
    	},   	
		validateEmail:function()

		  {

		  var email = this.getView().getModel("ZIEPModel").getProperty("/A_14_CORREO_ELECTRONICO");

		  var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

		    if (!mailregex.test(email)) {

		      alert(email + " No es un Email valido");

				this.getView().getModel("ZIEPModel").setProperty("/A_14_CORREO_ELECTRONICO","");
		        }

		  },
		  
		  VerificarGuardarBorrador:function(){
			  var name = this.getView().getModel("ZIEPModel").getProperty("/A_00_PRO_O_RAZON_SOCIA");
			  var phone  = this.getView().getModel("ZIEPModel").getProperty("/A_12_TELEFONO");
			  var tipoId = this.getView().getModel("ZIEPModel").getProperty("/A_02_CC") + this.getView().getModel("ZIEPModel").getProperty("/A_03_NIT") + this.getView().getModel("ZIEPModel").getProperty("/A_04_TI") +this.getView().getModel("ZIEPModel").getProperty("/A_05_CE");
			  var numero = this.getView().getModel("ZIEPModel").getProperty("/A_01_NUM_IDENTIDAD");
			  var dv = this.getView().getModel("ZIEPModel").getProperty("/A_06_DV");
			  if (name == "" || phone == "" || tipoId == "" || numero == "" || dv == "")
				  {
				  return "X";
				  }
			  else 
				  {
				  return " ";
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
if(evt.mParameters.valid===true || evt.mParameters.newValue !== ""){
oSource.setValueState(sap.ui.core.ValueState.None);
oSource.setValueStateText("");
}
}
this.setbEdited(true);
},
onChangePeriodo:function(evt){
	 
	this.onChange(evt);
	
	// Se verifica que el periodo y ano seleccionado no sea futuro.
	
	if (this.getView().getModel("ZIEPModel").getProperty("/A_62_ANO") !== "" && this.getView().getModel("ZIEPModel").getProperty("/A_62_ANO") !== "0000"  && this.getView().getModel("ZIEPModel").getProperty("/A_61_PERIODO") !== ""){
		
		  var fechaDia = new Date();
		  var Mes = fechaDia.getMonth() + 1;
		  var ano = fechaDia.getFullYear();
		  if (this.getView().getModel("ZIEPModel").getProperty("/A_62_ANO") > ano)
			  {
		      alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.DIFPERIODO"));
		      this.getView().getModel("ZIEPModel").setProperty("/A_62_ANO","");
		      this.getView().getModel("ZIEPModel").setProperty("/A_61_PERIODO","");
			  }
		  else if (this.getView().getModel("ZIEPModel").getProperty("/A_62_ANO") == ano){
			  if (this.getView().getModel("ZIEPModel").getProperty("/A_61_PERIODO") > Mes){
			  alert(sap.ui.getCore().getModel("i18n").getProperty("FORMS.DIFPERIODO"));
		      this.getView().getModel("ZIEPModel").setProperty("/A_62_ANO","");
		      this.getView().getModel("ZIEPModel").setProperty("/A_61_PERIODO","");			
		      }  
		  }
		}
	},
	
	onLiveChangeUpper: function(oEvent) {

	    var input = oEvent.getSource();

	    input.setValue(input.getValue().toUpperCase());
	}
	


};
