
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZICA.ZICAController");
sap.umc.mobile.forms.view.forms["ZICA"]["ZICAController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oZ2IC
={
"A_001_MUNODIS":"",
"A_002_DEPART":"",
"A_003_FECHAMP":"",
"A_004_ANOGRAV":"",
"A_006_ID_NUMBER":"",
"A_007_DECLANUM":"",
"A_008_FECHACD":"",
"A_010_DIRNOTF":"",
"A_011_MUN_DIRNOTF":"",
"A_012_DEP_DIRNOTF":"",
"A_013_TELEFONO":"",
"A_014_EMAIL":"",
"A_015_NOESTABTS":"",
"A_016_CLASIFICACION":"",
"A_017_TIOYEPTP":"",
"A_018_MIOYEM":"",
"A_019_TIOYEM":"",
"A_020_MIPDRD":"",
"A_021_MIPE":"",
"A_022_MIPVDAC":"",
"A_023_MIOAESAING":"",
"A_024_MIOAEMD":"",
"A_025_TOTALIG":"",
"A_026_TOTALIGAG":"",
"A_027_TOTALIMPUESTO":"",
"A_028_IMPUESTOLEY":"",
"A_029_TOTALIMPIYC":"",
"A_030_IMPUESTOAYT":"",
"A_031_PAGOUCASF":"",
"A_032_STASABOMBERIL":"",
"A_033_STASASEGURIDAD":"",
"A_034_TOTALIMPCARGO":"",
"A_035_MVEOISING":"",
"A_036_MENOSRETENCIONES":"",
"A_037_MENOSAUTORETENC":"",
"A_038_MENOSALANOANT":"",
"A_039_ANTICIPOANOSIG":"",
"A_040_MENOSSALAFAVOR":"",
"A_041_TOSALGOACARGO":"",
"A_042_TOSALGOAFAVOR":"",
"A_043_VALORAPAGAR":"",
"A_044_DESCPAGO":"",
"A_045_INTERESESMORA":"",
"A_046_TOTALAPAGAR":"",
"A_047_LIQUIPAGOVOL":"",
"A_048_TOPAGOVOL":"",
"A_049_DESTINOAPORTEVOL":"",
"A_050_DECLAINICIAL":"",
"A_051_SOLOPAGO":"",
"A_58_CORRECCION":"",
"A_57_DV":"",
"A_59_CONSO_UTEMPORAL":"",
"A_60_ACT_PATRIMONIO":"",
"A_61_CC":"",
"A_62_NIT":"",
"A_63_TT":"",
"A_64_CE":"",
"A_65_EXTEMPORANEIDAD":"",
"A_66_SCORRECCION":"",
"A_67_INEXACTITUD":"",
"A_68_OTRA":"",
"A_69_CUAL_OTRA":"",
"A_70_VALOR_SANCIONES":"",
"A_071_R1_ACTIVGRAVADAS":"",
"A_072_R1_CODIGO":"",
"A_073_R1_ING_GRAVADOS":"",
"A_074_R1_TARIFA":"",
"A_075_R1_IMPUESTO":"",
"A_076_R2_ACTIVGRAVADAS":"",
"A_077_R2_CODIGO":"",
"A_078_R2_ING_GRAVADOS":"",
"A_079_R2_TARIFA":"",
"A_080_R2_IMPUESTO":"",
"A_081_R3_ACTIVGRAVADAS":"",
"A_082_R3_CODIGO":"",
"A_083_R3_ING_GRAVADOS":"",
"A_084_R3_TARIFA":"",
"A_085_R3_IMPUESTO":"",
"A_086_NOMORS":"",
"A_087_FECHAPRESENTACION":"",
"A_088_FIRMA_DECLARANTE":"",
"A_089_NOMBRE_DECLARANTE":"",
"A_090_CC_DECLARANTE":"",
"A_091_CE_DECLARANTE":"",
"A_092_TI_DECLARANTE":"",
"A_093_NUMERO_DECLARANTE":"",
"A_094_FIRMA_CONTADOR":"",
"A_095_REVISOR_FISCAL":"",
"A_096_NOMBRE_CONT_FISC":"",
"A_097_CC_CONT_FISC":"",
"A_098_CE_CONT_FISC":"",
"A_099_NUMERO_CONT_FISC":"",
"A_100_ANUAL":"",
"A_101_TARJETA_PROF":"",
"A_101_PRESENTADA":"",
"A_102_NO_FORMULARIO":"",
"A_103_VENCIMIENTO_CORRESPON":"",
"A_104_FIRMA_DIGITAL_URL":"",
"A_105_REQUEST_ID_FD":"",
"A_106_FIRMA_DIGITAL":"",
"A_107_STATUS":"",
"A_108_LIQ_TOTALIMPIYC":"",
"A_109_LIQ_IMPUESTOAYT":"",
"A_110_LIQ_TOTALIMPCARGO":"",
"A_111_LIQ_TOSALGOACARGO":"",
"A_112_LIQ_TOSALGOAFAVOR":"",
"A_113_LIQ_INTERESESMORA":"",
"A_114_LIQ_TOTALAPAGAR":"",
"A_115_LIQ_TOPAGOVOL":"",
"A_116_LIQ_VALSACEXTEMPO":"",
"A_117_LIQ_VALSANCORREC":"",
"A_118_LIQ_VALSANINEXAT":"",
"A_119_LIQ_VALSANOTRA":"",
"A_120_VALSACEXTEMPO":"",
"A_121_VALSANCORREC":"",
"A_122_VALSANINEXAT":"",
"A_123_LIQ_VALOR_SANCIONES":"",
"A_124_LIQ_TOTALIMPUESTO":"",
"A_125_LIQ_TOTALIGAG":"",
"A_126_LIQ_TOTALIG":"",
"A_127_EXISTE_DIFERENCIA":"",
"A_128_LIQ_TIOYEM":"",
"A_129_FECHA_CREACION":"",
"A_130_FECHA_PRESENTACION":"",
"A_131_EXISTE_VAL_DIF":"",
"A_132_RES_AVI":"",
"A_133_VALOR_DISMINUYE":"",
"A_134_LIQ_PAGOUCASF":"",
"A_134_LIQ_VALORAPAGAR":"",
"A_135_AUMENTO_SALDO_FAVOR":"",
"A_136_INTERES_ICA":"",
"A_137_INTERES_AYT":"",
"A_138_INTERES_PAGO_UNIDADES":"",
"A_139_LIQ_INTERES_ICA":"",
"A_140_LIQ_INTERES_AYT":"",
"A_141_LIQ_INTERES_PAGO_UNI":"",
"A_142_DIG_BASE_INTERES_ICA":"",
"A_143_DIG_BASE_INTERES_AYT":"",
"A_144_DIG_BASE_INTERES_PU":"",
"DEP_AUX":"",
"MUN_AUX":"",
};
oController.oAvailableTableForms["ZICA"]=[
{FormID:"Z_FORMTABLE_ICA",
FormDescription:"Actividades ICA"}, ];

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=true;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=true;
oController.aIconTabBarFilterSequence=["Z2IC","attachments"];//"Z_FORMTABLE_ICA" , "attachments","submit","payment"
oController.sFieldNameForPay= "A_001_MUNODIS";
oController.sFormIDForPayAmount="Z2IC";
oController.sFormNoForPayAmount="1";
oController.bNoFormDataOnSaveDraft = false;
oController.isPrepopulate= true;
oController.prePopulateRuleID="21";
oController.showSubmitBtnOnAllTabs=true;
oController.aTableGroups  = {
"Z2IC":{
	"DETALLE":{
	"rows":1,
	"fields":["A_DI_ACTIVIDAD","A_D2_CODIGO_ACT","A_D3_VALOR_INGRESOS","A_D4_TARIFA","A_D5_IMPUESTO",],
	"header":["ACTIVIDADES GRAVADAS","CODIGO","INGRESOS GRAVADOS","TARIFAS (POR MIL)","IMPUESTO",], //.
	},
	},};
oController.bNoFormDataOnSubmit = false;
oController.validateRuleID="01";
oController.checkBeforeSubmit=true;
oController.currency = "EUR";
}};
