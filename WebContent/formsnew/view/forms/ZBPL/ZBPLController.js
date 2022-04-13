
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.ZBPL.ZBPLController");
sap.umc.mobile.forms.view.forms["ZBPL"]["ZBPLController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oZPLU
={
"A_01_VIA":"",
"A_02_NUMVIA":"",
"A_03_LETRAVIA":"",
"A_04_NUMSECVIA":"",
"A_05_LETRASECVIA":"",
"A_06_BISVIA":"",
"A_07_SECTORVIA":"",
"A_08_CRUCE":"",
"A_09_NUMCRUCE":"",
"A_10_LETRACRUCE":"",
"A_11_NUMSECCRUCE":"",
"A_12_LETRASECCRUCE":"",
"A_13_BISCRUCE":"",
"A_14_SECTORCRUCE":"",
"A_15_ULTDIGPLACA":"",
"A_16_BLOQUE":"",
"A_17_PISO":"",
"A_18_UNIDAD":"",
"A_19_DESUNIDAD":"",
"A_20_REPRESENTANTE_LEGAL":"",
"A_21_EMAIL":"",
"A_22_DIRECCIONACTUAL":"",
"A_23_NIT_REPRESENTANTE":"",
"A_24_DIRECCIONCORREGIDA":"",
"A_25_DIRRURAL":"",
"A_26_DIRNUMRUR":"",
"A_27_TIPOPERS":"",
};
oController.oAvailableTableForms["ZBPL"]=[
{FormID:"Z_FORMTABLE_PLUSVALIA_II",
FormDescription: sap.ui.getCore().getModel("i18n").getProperty("ZPLU.MATRIC")}, ];

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=false;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=true;
oController.aIconTabBarFilterSequence=["ZPLU","Z_FORMTABLE_PLUSVALIA_II","attachments","submit"]; //"payment"
oController.sFieldNameForPay= "A_01_VIA";
oController.sFormIDForPayAmount="ZPLU";
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
