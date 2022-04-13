
jQuery.sap.declare("sap.umc.mobile.forms.view.forms.TREC.TRECController");
sap.umc.mobile.forms.view.forms["TREC"]["TRECController"]
= {
setView: function(oView) {
this._oView = oView;},
getView: function() {
return this._oView;},
getDataProvider: function() {
return sap.umc.mobile.forms.model.DataProvider;},
init:function(){
var oController = this.getView().getController();

oController.oSTP1
={
"C_001_CATEGORY":"",
"C_002_SETCIT":"",
"C_003_SETSUT":"",
"C_004_SETMVT":"",
"C_005_SETPIT":"",
"C_010_TITLE":"",
"C_011_ACADTITLE1":"",
"C_012_FIRSTNAME":"",
"C_013_LASTNAME":"",
"C_014_BIRTHDATE":"",
"C_015_SEX":"",
"C_016_MARRIAGE":"",
"C_017_NATION":"",
"C_018_OCCUPATION":"",
"C_019_RELATIONSHIPS":"",
"C_020_STREET":"",
"C_021_HOUSENO":"",
"C_022_POSTCODE":"",
"C_023_CITY":"",
"C_024_COUNTRY":"",
"C_025_REGION":"",
"C_026_POBOX":"",
"C_027_POSTCODE2":"",
"C_028_TELEPHONE":"",
"C_029_TELEEXT":"",
"C_030_EMAIL":"",
"C_035_BANKLAND":"",
"C_036_BANKKEY":"",
"C_037_BANKACC":"",
"C_038_BANKNAME":"",
"C_039_NAMEAH":"",
"C_040_CCTYPE":"",
"C_041_CCNUMBER":"",
"C_042_CCVALIDITY":"",
"C_043_CCHOLDER":"",
"C_045_NAME1":"",
"C_046_NAME2":"",
"C_047_BUSINESS":"",
"C_048_WEBADDRESS":"",
"C_049_LEGALFORM":"",
"C_050_FOUNDATION":"",
"C_060_1RELSHIP":"",
"C_061_1RELVALFR":"",
"C_062_1RELVALTO":"",
"C_063_1RELNAME1":"",
"C_064_1RELNAME2":"",
"C_065_1RELIDTYPE":"",
"C_066_1RELIDNUM":"",
"C_067_1RELSTREET":"",
"C_068_1RELHOUSE":"",
"C_069_1RELPCODE":"",
"C_070_1RELCITY":"",
"C_071_1RELCTRY":"",
"C_072_1RELREG":"",
"C_073_1RELBPNATURE":"",
"C_074_1RELACTIVE":"",
"C_080_2RELSHIP":"",
"C_081_2RELVALFR":"",
"C_082_2RELVALTO":"",
"C_083_2RELNAME1":"",
"C_084_2RELNAME2":"",
"C_085_2RELIDTYPE":"",
"C_086_2RELIDNUM":"",
"C_087_2RELSTREET":"",
"C_088_2RELHOUSE":"",
"C_089_2RELPCODE":"",
"C_090_2RELCITY":"",
"C_091_2RELCTRY":"",
"C_092_2RELREG":"",
"C_093_2RELBPNATURE":"",
"C_094_2RELACTIVE":"",
"C_201_1REVTYPE":"",
"C_202_1TYPE":"",
"C_203_1SERIAL":"",
"C_204_1EMCLASS":"",
"C_205_1ENGINE":"",
"C_206_1VOLUME":"",
"C_207_1REGDATE":"",
"C_209_1EFT":"",
"C_210_1VEHICACTIVE":"",
"C_211_2REVTYPE":"",
"C_212_2TYPE":"",
"C_213_2SERIAL":"",
"C_214_2EMCLASS":"",
"C_215_2ENGINE":"",
"C_216_2VOLUME":"",
"C_217_2REGDATE":"",
"C_219_2EFT":"",
"C_220_2VEHICACTIVE":"",
"C_260_1NAMELOC":"",
"C_261_1STREET":"",
"C_262_1HOUSENO":"",
"C_263_1POSTCODE":"",
"C_264_1CITY":"",
"C_265_1COUNTRY":"",
"C_266_1REGION":"",
"C_275_1REVTYPCIT":"",
"C_276_1PERFRCIT":"",
"C_277_1PERTOCIT":"",
"C_278_1IDTYPECIT":"",
"C_279_1IDNUMCIT":"",
"C_285_1REVTYPSUT":"",
"C_286_1PERFRSUT":"",
"C_287_1PERTOSUT":"",
"C_288_1IDTYPESUT":"",
"C_289_1IDNUMSUT":"",
"C_300_2NAMELOC":"",
"C_301_2STREET":"",
"C_302_2HOUSENO":"",
"C_303_2POSTCODE":"",
"C_304_2CITY":"",
"C_305_2COUNTRY":"",
"C_306_2REGION":"",
"C_315_2REVTYPCIT":"",
"C_316_2PERFRCIT":"",
"C_317_2PERTOCIT":"",
"C_318_2IDTYPECIT":"",
"C_319_2IDNUMCIT":"",
"C_325_2REVTYPSUT":"",
"C_326_2PERFRSUT":"",
"C_327_2PERTOSUT":"",
"C_328_2IDTYPESUT":"",
"C_329_2IDNUMSUT":"",
"C_350_1REVTYPE":"",
"C_351_1IDTYPE":"",
"C_352_1IDNUM":"",
"C_353_1TAXCODE":"",
"C_354_1CHILD":"",
"C_355_1EXEMPT":"",
"C_356_1INCOME":"",
"C_357_1PERFRPIT":"",
"C_358_1PERTOPIT":"",
"C_359_1PITACTIVE":"",
"C_360_2REVTYPE":"",
"C_361_2IDTYPE":"",
"C_362_2IDNUM":"",
"C_363_2TAXCODE":"",
"C_364_2CHILD":"",
"C_365_2EXEMPT":"",
"C_366_2INCOME":"",
"C_367_2PERFRPIT":"",
"C_368_2PERTOPIT":"",
"C_369_2PITACTIVE":"",
};

},
customize: function(){
var oController = this.getView().getController();
oController.bPeriodBased=false;
oController.bKeyDateBased=false;
oController.bNoTimeDependency=true;
oController.aIconTabBarFilterSequence=["STP1","attachments","submit","payment"];
oController.sFieldNameForPay= "C_001_CATEGORY";
oController.sFormIDForPayAmount="STP1";
oController.sFormNoForPayAmount="1";
oController.bNoFormDataOnSaveDraft = false;
oController.isPrepopulate= false;
oController.prePopulateRuleID="";
oController.showSubmitBtnOnAllTabs=true;
oController.bNoFormDataOnSubmit = false;
oController.validateRuleID="01";
oController.checkBeforeSubmit=false;
oController.currency = "EUR";
}};
