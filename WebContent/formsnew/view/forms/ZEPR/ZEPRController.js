
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZEPR.ZEPRController");
sap.umc.mobile.forms.view.forms["ZEPR"]["ZEPRController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oZEPR
={
"A_00_PRO_O_RAZON_SOCIAL_ZEPR":"",
"A_01_NUM_IDENTIDAD_ZEPR":"",
"A_02_CC_ZEPR":"",
"A_03_NIT_ZEPR":"",
"A_04_TI_ZEPR":"",
"A_05_CE_ZEPR":"",
"A_06_DV_ZEPR":"",
"A_07_DIR_AGENTE_RETENEDOR":"",
"A_08_SOL_ACTUALIZAR_DIR_AG":"",
"A_09_DIRECCION_NOTIFICACION":"",
"A_10_SOL_ACTUALIZAR_DIR_NT":"",
"A_11_TELEFONO":"",
"A_12_CORREO_ELECTRONICO":"",
"A_13_ENTIDAD_PUBLICA":"",
"A_14_PERSONA_NATURAL":"",
"A_15_PERSONA_JURIDICA":"",
"A_16_BASE_GRAVABLE":"",
"A_17_BG_RETENCION_HI":"",
"A_18_TOTAL_BASE_RETENCION":"",
"A_19_VAL_RET_ACT_EDUCATIVA":"",
"A_20_VAL_RET_HECHOS_IMPONIBLES":"",
"A_21_TOTAL_RET_EFECTUADAS":"",
"A_22_SAN_EXTEMPORANEIDAD":"",
"A_23_MAS_OTRO_SANCIONES":"",
"A_24_TOTAL_SALDO_CARGO":"",
"A_25_VALOR_A_PAGAR_RET":"",
"A_26_ZINTERESES_MORA":"",
"A_27_ZVALOR_PAGAR_SANCIONES":"",
"A_28_TOTAL_PAGAR":"",
"A_29_CORRECCION":"",
"A_30ANO_CORRECCION":"",
"A_31_DECLANUM":"",
"A_32_PERIODO_CORR":"",
"A_33_PERIODO":"",
"A_34_ANO":"",
"A_35_FECHA_VENCIMIENTO":"",
"A_36_FECHA_PRESENTACION":"",
"A_37_NOMBRE_DECLARANTE":"",
"A_38_NUMERO_DECLARANTE":"",
"A_39_FIRMA_CONTADOR":"",
"A_40_REVISOR_FISCAL":"",
"A_41_NOMBRE_CONT_FISC":"",
"A_42_NUMERO_CONT_FISC":"",
"A_43_TARJETA_PROF":"",
"A_44_NO_FORMULARIO":"",
"A_45_LIQ_TOTAL_BASE_RETENCION":"",
"A_46_LIQ_TOTAL_RET_EFECTUADAS":"",
"A_47_LIQ_TOTAL_SALDO_CARGO":"",
"A_48_LIQ_VALOR_A_PAGAR_RET":"",
"A_49_LIQ_ZVALOR_PAGAR_SANC":"",
"A_50_LIQ_TOTAL_PAGAR":"",
"A_51_LIQ_INTERESES_MORA":"",
"A_52_LIQ_SAN_EXTEMPORANEIDAD":"",
"A_53_NO_RESOLUCION":"",
"A_54_FECHA_RESOLUCION":"",
"A_55_EXISTE_DIFERENCIA":"",
"A_56_FECHA_VENCIMIENTO_PREST":"",
"A_57_LIQ_VAL_RET_ACT_EDUCATIVA":"",
"A_58_LIQ_VAL_RET_HECHOS_IMPON":"",
"A_59_LIQ_MAS_OTRO_SANCIONES":"",
"A_60_FECHA_MAX_PRESTENCION":"",
"A_61_FECHA_CREACION":"",
"A_62_EXISTE_VAL_DIF":"",
"A_63_EMPLAZAMIENTO":"",
"A_64_FUENTE_CREACION":"",
};

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=false;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=true;
oController.aIconTabBarFilterSequence=["ZEPR","attachments"]; //,"submit","payment"
oController.sFieldNameForPay= "A_00_PRO_O_RAZON_SOCIAL_ZEPR";
oController.sFormIDForPayAmount="ZEPR";
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
