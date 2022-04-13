
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZIEP.ZIEPController");
sap.umc.mobile.forms.view.forms["ZIEP"]["ZIEPController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oZIEP
={
"A_00_PRO_O_RAZON_SOCIAL":"",
"A_01_NUM_IDENTIDAD":"",
"A_02_CC":"",
"A_03_NIT":"",
"A_04_TI":"",
"A_05_CE":"",
"A_06_DV":"",
"A_07_REPRESENTANTE_LEGAL":"",
"A_08_CEDULA_RP":"",
"A_09_CC_RL":"",
"A_10_TI_RL":"",
"A_11_CE_RL":"",
"A_12_TELEFONO":"",
"A_13_DIRECCION_NOTIFICACION":"",
"A_14_CORREO_ELECTRONICO":"",
"A_15_AUTORIZO_EMAIL":"",
"A_16_NOMBRE_ESPECTACULO":"",
"A_17_LUGAR_REALIZACION":"",
"A_18_ACADEMICO":"",
"A_19_DEPORTIVO":"",
"A_20_RECREATIVO":"",
"A_21_OTROS_EPD":"",
"A_22_FECHA_INICIO_ESP":"",
"A_23_FECHA_FINAL_ESP":"",
"A_24_TOTAL_IMP_GRAVADOS":"",
"A_25_BASE_GRAVABLE":"",
"A_26_BG_SIS_RETENCION_FUENTE":"",
"A_27_IMP_MUN_ESP_PUBLICO":"",
"A_28_IMP_MUN_ESP_DEPORTE":"",
"A_29_RET_IMP_MUN_ESP_PUBLICO":"",
"A_30_RET_IMP_MUN_ESP_DEPORTE":"",
"A_31_TOTAL_IMPUESTOS":"",
"A_32_TOTAL_RETENCIONES":"",
"A_33_CUAL_OTRA":"",
"A_34_OTRA_SANCION":"",
"A_35_INEXACTITUD":"",
"A_36_SCORRECCION":"",
"A_37_EXTEMPORANEIDAD":"",
"A_38_VALOR_INEXACTITUD":"",
"A_39_VALOR_CORRECION":"",
"A_40_VALOR_EXTEMPORANEA":"",
"A_41_VALOR_OTRA":"",
"A_42_VALOR_SANCIONES":"",
"A_43_TOTAL_SALDO_CARGO":"",
"A_44_ZVALOR_A_PAGAR":"",
"A_45_ZVALOR_PAGAR_SANCIONES":"",
"A_46_ZINTERESES_MORA":"",
"A_47_TOTAL_PAGAR":"",
"A_48_NOMBRE_DECLARANTE":"",
"A_49_NUMERO_DECLARANTE":"",
"A_50_REVISOR_FISCAL":"",
"A_51_FIRMA_CONTADOR":"",
"A_52_NOMBRE_CONT_FISC":"",
"A_53_NUMERO_CONT_FISC":"",
"A_54_TARJETA_PROF":"",
"A_55_NO_FORMULARIO":"",
"A_56_RESPONSABLE":"",
"A_57_AGENTE_RETENEDOR":"",
"A_58_DECLAINICIAL":"",
"A_59_CORRECCION":"",
"A_60_DECLANUM":"",
"A_61_PERIODO":"",
"A_62_ANO":"",
"A_63_FECHA_VENCIMIENTO":"",
"A_64_FECHA_PRESENTACION":"",
"A_65_DIRECCION_ESTABLECIMIENTO":"",
"A_67_LIQ_BASE_GRAVABLE":"",
"A_68_LIQ_BG_SIS_RETENCION_FUEN":"",
"A_69_LIQ_IMP_MUN_ESP_PUBLICO":"",
"A_70_LIQ_IMP_MUN_ESP_DEPORTE":"",
"A_71_LIQ_RET_IMP_MUN_ESP_PUBLI":"",
"A_72_LIQ_RET_IMP_MUN_ESP_DEPOR":"",
"A_73_LIQ_TOTAL_IMPUESTOS":"",
"A_74_LIQ_TOTAL_RETENCIONES":"",
"A_75_LIQ_VALOR_INEXACTITUD":"",
"A_76_LIQ_VALOR_CORRECION":"",
"A_77_LIQ_VALOR_EXTEMPORANEA":"",
"A_78_LIQ_VALOR_SANCIONES":"",
"A_79_LIQ_TOTAL_SALDO_CARGO":"",
"A_80_LIQ_INTERESES_MORA":"",
"A_81_TOTAL_PAGAR":"",
"A_82_NO_RESOLUCION":"",
"A_83_FECHA_RESOLUCION":"",
"A_66_LIQ_TOTAL_IMP_GRAVADOS":"",
"A_84_EXISTE_DIFERENCIA":"",
"A_85_FECHA_VENCIMIENTO_PREST":"",
"A_86_FECHA_CREACION":"",
"A_88_EXISTE_VAL_DIF":"",
"A_89_LIQ_INT_MORA_DEP":"",
"A_90_LIQ_INT_MORA_ESP_PUB":"",
"A_91_LIQ_VALOR_A_PAGAR":"",
"A_92_FECHA_MAX_PRESTENCION":"",
"A_94_LIQ_VALOR_PAGAR_SANCIONES":"",
"A_95_EMPLAZAMIENTO":"",
"A_96_FUENTE_CREACION":"1",
};

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=false;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=true;
oController.aIconTabBarFilterSequence=["ZIEP","attachments"];//,"submit","payment"
oController.sFieldNameForPay= "A_00_PRO_O_RAZON_SOCIAL";
oController.sFormIDForPayAmount="ZIEP";
oController.sFormNoForPayAmount="1";
oController.bNoFormDataOnSaveDraft = false;
oController.isPrepopulate= true;
oController.prePopulateRuleID="21";
oController.showSubmitBtnOnAllTabs=true;
oController.aTableGroups  = {
"ZIEP":{
"DETALLE":{
"rows":0,
"fields":["A_D1_LOCALIDAD","A_D2_VALOR_BOLETA","A_D3_CANTIDAD_BOLETAS_VENDIDAS","A_D4_CANTIDAD_BOLETAS_CORTESIA","A_D5_TOTAL_INGRESOS_LOCALIDAD",],
"header":["12. LOCALIDAD","13. VALOR BOLETA","14. CANTIDAD DE BOLETAS VENDIDAS","15. CANTIDAD DE BOLETAS CORTESIA","16. TOTAL INGRESOS POR LOCALIDAD",],
},
},};
oController.bNoFormDataOnSubmit = false;
oController.validateRuleID="01";
oController.checkBeforeSubmit=true;
oController.currency = "EUR";
}};
