
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZCOP.ZCOPController");
sap.umc.mobile.forms.view.forms["ZCOP"]["ZCOPController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oZCOP
={
"A_01_FECHA_PRESENTACION":"",
"A_02_NO_FORMULARIO":"",
"A_03_PERIODO":"",
"A_04_ANIO":"",
"A_05_PRO_O_RAZON_SOCIAL":"",
"A_06_NUM_IDENTIDAD":"",
"A_07_NIT":"",
"A_08_DV":"",
"A_09_DIRECCION_AG_RETENEDOR":"",
"A_10_SOLICITUD_ACT_DIRAGRET":"",
"A_11_MUNICIPIO_AR":"",
"A_12_TELEFONO":"",
"A_13_DIRECCION_NOTIFICACION":"",
"A_14_SOLICITUD_ACT_DIRNOT":"",
"A_15_MUNICIPIO_NOT":"",
"A_16_CORREO_ELECTRONICO":"",
"A_17_BASE_RETENCION":"",
"A_18_VALOR_RETENCION":"",
"A_19_SANCION_EXTEMPORANEIDAD":"",
"A_20_OTRAS_SANCIONES":"",
"A_21_TOTAL_SALDO_CARGO":"",
"A_22_VALOR_PAG_RETENCIONES":"",
"A_23_INTERESES_MORA":"",
"A_24_VALOR_PAGAR_SANCIONES":"",
"A_25_TOTAL_A_PAGAR":"",
"A_26_CORRECCION":"",
"A_27_NUM_FORM_CORRIGE":"",
"A_28_ANIO_CORRECCION":"",
"A_29_PERIODO_CORRECCION":"",
"A_30_NOMBRE_DECLARANTE":"",
"A_31_CEDULA_DECLARANTE":"",
"A_32_FIRMA_CONTADOR":"",
"A_33_REVISOR_FISCAL":"",
"A_34_NOMBRE_CONT_FISC":"",
"A_35_NUMERO_CONT_FISC":"",
"A_36_TARJETA_PROF":"",
"A_37_NO_RESOLUCION":"",
"A_38_FECHA_RESOLUCION":"",
"A_39_EXISTE_DIFERENCIA":"",
"A_40_FECHA_VENCIMIENTO":"",
"A_41_LIQ_TOTAL_RET_EFECTUADAS":"",
"A_42_LIQ_TOTAL_SALDO_CARGO":"",
"A_43_LIQ_SAN_EXTEMPORANEIDAD":"",
"A_44_LIQ_INTERESES_MORA":"",
"A_45_LIQ_VALOR_A_PAGAR_RET":"",
"A_46_LIQ_TOTAL_PAGAR":"",
"A_47_LIQ_ZVALOR_PAGAR_SANC":"",
"A_48_EXISTE_VAL_DIF":"",
"A_49_FECHA_CREACION":"",
"A_50_FECHA_MAX_PRESTENCION":"",
"A_51_FECHA_VENCIMIENTO_PREST":"",
"A_52_LIQ_MAS_OTRO_SANCIONES":"",
"A_53_EMPLAZAMIENTO":"",
"A_54_FUENTE_CREACION":"",
};

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=false;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=true;
oController.aIconTabBarFilterSequence=["ZCOP","attachments"];//,"submit","payment"
oController.sFieldNameForPay= "A_01_FECHA_PRESENTACION";
oController.sFormIDForPayAmount="ZCOP";
oController.sFormNoForPayAmount="1";
oController.bNoFormDataOnSaveDraft = false;
oController.isPrepopulate= true;
oController.prePopulateRuleID="21";
oController.showSubmitBtnOnAllTabs=true;
oController.bNoFormDataOnSubmit = false;
oController.validateRuleID="01";
oController.checkBeforeSubmit=true;
oController.currency = "COP";
}};
