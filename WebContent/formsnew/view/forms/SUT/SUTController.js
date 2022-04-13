
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.SUT.SUTController");
sap.umc.mobile.forms.view.forms["SUT"]["SUTController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oSSU1={
        "A_F1_REG_ID1":"",
        "A_F2A_PERIODFROM1":"",
        "A_FA1_SALES_GROSS1":"",
        "A_FA2_SALES_EXMPT1":"",
        "A_FA3_SALES_TAX_AMT1":"",
        "A_FA4_SALES_TAX_COLL1":"",
        "A_FB3_TAX_PURCH_AMT1":"",
        "A_FB4_TAX_PURCH_COL1":"",
        "A_FC1_RENT_GROSS1":"",
        "A_FC2_RENT_EXMPT1":"",
        "A_FC3_RENT_TAX_AMT1":"",
        "A_FC4_RENT_TAX_COLL1":"",
        "A_FD1_FOOD_GROSS1":"",
        "A_FD2_FOOD_EXMPT1":"",
        "A_FD3_FOOD_TAX_AMT1":"",
        "A_FD4_FOOD_TAX_COLL1":"",
        "A_F5_TAX_COLL1":"",
        "A_F6_LAWFUL_DED1":"",
        "A_F7_TOTAL_TAX_DUE1":"",
        "A_F8_EST_TAX1":"",
        "A_F9_EST_TAX_DUE1":"",
        "A_F10_AMT_DUE1":"",
        };
oController.oZAW
={
"A_FIELD1":"",
"A_FIELD2":"",
"A_FIELD3":"",
};

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=true;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=false;
oController.aIconTabBarFilterSequence=["SSU1",/*"ZAW",*/"attachments","submit","payment"];
oController.sFieldNameForPay= "A_F7_TOTAL_TAX_DUE1";
oController.sFormIDForPayAmount="SSU1";
oController.sFormNoForPayAmount="1";
oController.bNoFormDataOnSaveDraft = false;
oController.isPrepopulate= false;
oController.prePopulateRuleID="21";
oController.showSubmitBtnOnAllTabs=true;
oController.aTableGroups  = {
"ZAW":{
"TABLE1":{
"rows":5,
"fields":["A_FIELD4","A_FIELD5",],
"header":["A_FIELD4","A_FIELD5",],
},
"TABLE3":{
"rows":5,
"fields":["A_FIELD6","A_FIELD7","A_FIELD8","A_FIELD9",],
"header":["A_FIELD6","A_FIELD7","A_FIELD8","A_FIELD9",],
},
},};
oController.bNoFormDataOnSubmit = false;
oController.validateRuleID="01";
oController.checkBeforeSubmit=false;
oController.currency = "EUR";
}};
