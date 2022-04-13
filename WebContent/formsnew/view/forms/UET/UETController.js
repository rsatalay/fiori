
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.UET.UETController");
sap.umc.mobile.forms.view.forms["UET"]["UETController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oSUET={ "A_F1_QENDING":"",
        "A_F2_DUEDATE":"",
        "A_F3_PENALTYAFTERDUEDATE":"",
        "A_F4_ACCNUMBER":"",
        "A_F5_TAXRATE":"",
        "A_F6_FEIN":"",
        "A_F10_1STMONTH":"",
        "A_F10_2NDMONTH":"",
        "A_F10_3RDMONTH":"",
        "A_F11_GROSSWAGESTHISQUATER":"",
        "A_F12_WAGESPAIDEXCAMOUNT":"",
        "A_F13_TAXABLEWAGESTHISQ":"",
        "A_F14_TAXDUE":"",
        "A_F15_PENALTYDUE":"",
        "A_F16_INTERESTDUE":"",
        "A_F17_TOTALDUE":"",
        "A_F20_DOEMSTIC":""
        };
oController.oAvailableTableForms["UET"]=[
{FormID:"UNEMPLOYMENT_TAX",
FormDescription:"Unemployment Tax - Schedule"}, ];

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=true;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=false;
oController.aIconTabBarFilterSequence=["UNEMPLOYMENT_TAX","SUET","attachments","submit","payment"];
oController.sFieldNameForPay= "A_F17_TOTALDUE";
oController.sFormIDForPayAmount="SUET";
oController.sFormNoForPayAmount="1";
oController.bNoFormDataOnSaveDraft = false;
oController.isPrepopulate= false;
oController.prePopulateRuleID="21";
oController.showSubmitBtnOnAllTabs=true;
oController.bNoFormDataOnSubmit = false;
oController.validateRuleID="01";
oController.checkBeforeSubmit=false;
oController.currency = "EUR";
}};
