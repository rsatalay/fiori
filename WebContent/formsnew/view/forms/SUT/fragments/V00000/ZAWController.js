jQuery.sap.declare("sap.umc.mobile.forms.view.forms.SUT.fragments.V00000.ZAWController");
sap.umc.mobile.forms.view.forms["SUT"].fragments.V00000["ZAWController"]
= {
setView: function(oView) {
this._oView = oView;
this.setDefaultValues();
},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;
},
setDefaultValues: function(){
this.FormID = "ZAW";
},
setbEdited:function(bFlag){
var oController = this.getView().getController();
var oFilter = oController.getSelectedFilter();
var sCurrentFormNo = oFilter.data().CurrentFormNo;
var sKey = this.FormID;
if(oController.oAllFormsData[sKey] && oController.oAllFormsData[sKey][sCurrentFormNo])
oController.oAllFormsData[sKey][sCurrentFormNo]["bEdited"]=bFlag;
},
onChange:function(evt){
var oSource = evt.getSource();
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
};
