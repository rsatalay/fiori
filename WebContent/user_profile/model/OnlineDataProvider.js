jQuery.sap.declare("sap.umc.mobile.user_profile.model.OnlineDataProvider");
sap.umc.mobile.user_profile.model.OnlineDataProvider = {

	_readAddresses: function(fnCallback) {
		this.ERP.read(this.getAccountPath() + "AccountAddresses", ["$format=json"], true, {
			fnSuccess: fnCallback
		});
	},
	_readBankAccounts: function(oDelegate) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oData.results = oData.results.reverse();
			this.oBankAccounts.setSizeLimit(oData.results && oData.results.length);
			this.oBankAccounts.setData(oData);
			if (oDelegate) {
				oDelegate.onBankAccountsLoaded(this.oBankAccounts);
			}
		}, this);
		this.ERP.read(this.getAccountPath() + "BankAccounts", ["$format=json", "$expand=Bank"], true, {
			fnSuccess: fnSuccess
		});
	},
	_readCardAccounts: function(oDelegate) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oData.results = oData.results.reverse();
			this.oCardAccounts.setSizeLimit(oData.results && oData.results.length);
			this.oCardAccounts.setData(oData);
			if (oDelegate) {
				oDelegate.onCardAccountsLoaded(this.oCardAccounts);
			}
		}, this);

		this.ERP.read(this.getAccountPath() + "PaymentCards", ["$format=json", "$expand=PaymentCardType"], true, {
			fnSuccess: fnSuccess
		});
	},
	_readAutoPaymentMethods: function(oDelegate, oDataProvider) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oData.results = oData.results.reverse();
			this.oAutoPaymentMethods.setData(oData);
			oDataProvider.ERP.read(oDataProvider.getAccountPath() + "PaymentCards", ["$format=json", "$expand=PaymentCardType"], true, {
				fnSuccess: jQuery.proxy(function(oData, oResponse) {
					oData.results = oData.results.reverse();
					for ( var i = 0; i < oData.results.length; i++) {
						oDataProvider.oAutoPaymentMethods.oData.results.push(oData.results[i]);
					}
					oDelegate.onAutoPaymentMethodsLoadedSuccess(oDataProvider.oAutoPaymentMethods);
				}, oDataProvider)
			});
		}, this);
		this.ERP.read(this.getAccountPath() + "BankAccounts", ["$format=json", "$expand=Bank"], true, {
			fnSuccess: fnSuccess
		});
	},
	_readCountries: function(oDelegate) {
		this.ERP.read("Countries", ["$format=json"], true, {
			fnSuccess: $.proxy(function(oData) {
				this.oCountries.setSizeLimit(oData.results && oData.results.length);
				this.oCountries.setData(oData);
				if (oDelegate) {
					oDelegate.onLoadCountryListSuccess(this.oCountries);
				}
			}, this)
		});
	},
	//batch-RAL
/*	_readBanks: function(oDelegate, sCountryID) {
		this.ERP.read("Banks", ["$filter=CountryID eq '" + sCountryID + "'", "$format=json"], true, {
			fnSuccess: $.proxy(function(oData) {
				this.oBanks.setSizeLimit(oData.results && oData.results.length);
				this.oBanks.setData(oData);
				oDelegate.onLoadBankListSuccess(this.oBanks);
			}, this)
		});
	},*/
	_readBanks: function(oDelegate, sCountryID) {
		this.SERVICE.read("Banks", ["$format=json"], true, {
			fnSuccess: $.proxy(function(oData) {
				this.oBanks.setSizeLimit(oData.results && oData.results.length);
				this.oBanks.setData(oData);
				oDelegate.onLoadBankListSuccess(this.oBanks);
			}, this)
		}, {}, [{
			name: "CountryID",
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(sCountryID)
		}]);
	},

	_updateBankAccount: function(oDelegate, oBankAccount) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onSaveBankAccountSuccess();
			oDelegate.refreshBankAccounts();
		}, oDelegate);
		this.ERP.updateEntity("BankAccounts", ["BankAccountID=\'" + oBankAccount.BankAccountID + "\'", "AccountID=\'" + oBankAccount.AccountID + "\'"],
				oBankAccount, {
					fnSuccess: fnSuccess
				});
	},
	_updatePaymentCard: function(oDelegate, oCardAccountCopy) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onSavePaymentCardSuccess();
			oDelegate.refreshCardAccounts();
		}, oDelegate);
		this.ERP.updateEntity("PaymentCards", ["PaymentCardID=\'" + oCardAccountCopy.PaymentCardID + "\'",
				"AccountID=\'" + oCardAccountCopy.AccountID + "\'"], oCardAccountCopy, {
			fnSuccess: fnSuccess
		});
	},
	_deleteBankAccount: function(oDelegate, oBankAccount) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onDeleteBankAccountSuccess();
		}, oDelegate);
		this.ERP.removeEntity("/BankAccounts",
				["AccountID=\'" + oBankAccount.AccountID + "\'", "BankAccountID=\'" + oBankAccount.BankAccountID + "\'"], {
					fnSuccess: fnSuccess
				});
	},
	_deletePaymentCard: function(oDelegate, oCreditCard) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onDeletePaymentCardSuccess();
		}, oDelegate);
		this.ERP.removeEntity("/PaymentCards", ["AccountID=\'" + oCreditCard.AccountID + "\'", "PaymentCardID=\'" + oCreditCard.PaymentCardID + "\'"],
				{
					fnSuccess: fnSuccess
				});
	},
	_createBankAccount: function(oDelegate, oBankAccount) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onCreateBankAccountSuccess(oData);
		}, oDelegate);
		this.ERP.createEntity("BankAccounts", oBankAccount, {
			fnSuccess: fnSuccess
		});
	},
	_createCreditCard: function(oDelegate, oCardAccount) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onCreatePaymentCardSuccess(oData);
		}, oDelegate);
		this.ERP.createEntity("PaymentCards", oCardAccount, {
			fnSuccess: fnSuccess
		});
	},
	_readPaymentCardType: function(oDelegate) {
		this.ERP.read("PaymentCardTypes", ["$format=json"], true, {
			fnSuccess: $.proxy(function(oData) {
				if (oData.results) {
					this.oPaymentCardTypes.setSizeLimit(oData.results && oData.results.length);
					this.oPaymentCardTypes.setData(oData);
					oDelegate.onReadPaymentCardSuccess(this.oPaymentCardTypes);
				}
			}, this)
		});
	},
	_readBusinessAgreements: function(oDelegate) {
		this.ERP.read(this.getAccountPath() + "ContractAccounts", ["$format=json"/*, "$expand=ContractItems/Division"*/], true, {
			fnSuccess: $.proxy(function(oData) {
				if (oData.results) {
					this.oBusinessAgreements.setSizeLimit(oData.results && oData.results.length);
					this.oBusinessAgreements.setData(oData);
					oDelegate.onReadBusinessAgreementsSuccess(this.oBusinessAgreements);
				}
			}, this)
		});

	},
	_addChangedPaymentMethod: function(oBusinessAgreementCopy, batch) {
		batch.push(this.ERP.createBatchOperation("/ContractAccounts('" + oBusinessAgreementCopy.ContractAccountID + "')",
				sap.umc.mobile.private.app.Constants.HTTP_PUT, oBusinessAgreementCopy, null));
	},
	_submitBatchOperation: function(oDelegate, batch) {
		this.ERP.addBatchChangeOperations(batch);
		this.ERP.submitChangeBatch({
			fnSuccess: $.proxy(function(oData, response) {
				oDelegate.onBatchSubmitSuccess();
			}, this)
		}, true);
	},
	_refreshPersonalInfo: function(oDelegate) {
		this.oPersonalInfo = this.getAccount();
		this.ERP.read("AccountTitles", ["$format=json"], true, {
			fnSuccess: $.proxy(function(oData) {
				var sTitle = null;
				if (this.oPersonalInfo.getData().AccountTitleID === "") {
					sTitle = "";
				} else {
					for ( var i = 0; i < oData.results.length; i++) {
						if (this.oPersonalInfo.getData().AccountTitleID === oData.results[i].TitleID) {
							sTitle = oData.results[i].Description;
						}
					}
				}
				oDelegate.onRefreshPersonalInfoSuccess(this.oPersonalInfo, sTitle);
			}, this)
		});
	},
	_readContractAccounts: function(fnCallback) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			if (oData.results) {
				this.oContractAccounts.setSizeLimit(oData.results && oData.results.length);
				this.oContractAccounts.setData(oData);
				fnCallback(this.oContractAccounts);
			}
		}, this);
		this.SERVICE.read(this.getAccountPath() + this.oHelper.getContractAccountName(this.SERVICE), ["$format=json",
				"$expand=ContractAccountBalance,BillToAccountAddress"], true, {
			fnSuccess: fnSuccess
		});
	},
	/*	_updateContractAccounts: function() {
	 var fnSuccess = jQuery.proxy(function(oData, oResponse) {
	 if (oData.results) {
	 this.oContractAccounts.setSizeLimit(oData.results && oData.results.length);
	 this.oContractAccounts.setData(oData);
	 }
	 }, this);
	 this.SERVICE.read(this.getAccountPath() + this.oHelper.getContractAccountName(this.SERVICE), ["$format=json",
	 "$expand=ContractAccountBalance,BillToAccountAddress"], true, {
	 fnSuccess: fnSuccess
	 });
	 },*/
	_readContracts: function(oContractAccount,oDelegate) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			if (oData) {
				/*this.oRelationships.setData(oData.results);
				oDelegate.onRelationshipsLoadedSuccess(this.oRelationships);*/
				var oContracts = new sap.ui.model.json.JSONModel();
				/*please do not write the below commented code as this would restricts the length of the contract object fact list of each
				contract object and also of the lenth of the contract object list -(panel) to the value of oData.results.length*/
				//oContracts.setSizeLimit(oData.results && oData.results.length);
				oContracts.setData(oData.results);
				oContractAccount._Contracts = oContracts;
				oDelegate.onContractsLoaded(oContracts);
				
			}
		}, this);
		var sFormsPath = this.getAccountPath() + "ContractAccounts('" + oContractAccount.ContractAccountID + "')/"+"ContractObjects";
        this.SERVICE.read(sFormsPath, ["$format=json","$expand=ContractObjectFacts"], true, {
   			fnSuccess: fnSuccess
   		});
		                                                                                                                   			
		/*this.SERVICE.read("ContractAccounts('" + oContractAccount.ContractAccountID + "')/" + this.oHelper.getContractName(this.SERVICE), [
				"$format=json", "$expand=Division,Premise"], true, {
			fnSuccess: fnSuccess
		});*/
	},
	_readPaymentAccounts_M: function(fnCallBack) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			if (oData) {
				this.oBankAccounts.setSizeLimit(oData.BankAccounts.results && oData.BankAccounts.results.length);
				this.oBankAccounts.setData(oData.BankAccounts);
				this.oPaymentCards.setSizeLimit(oData.PaymentCards.results && oData.PaymentCards.results.length);
				this.oPaymentCards.setData(oData.PaymentCards);
				fnCallBack(this.oBankAccounts, this.oPaymentCards);
			}
		}, this);
		this.ERP.read(this.getAccountPath(), ["$format=json", "$expand=BankAccounts,PaymentCards"], true, {
			fnSuccess: fnSuccess
		});
	},
	_readPaymentCardTypes_M: function(fnCallback) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			if (oData.results) {
				this.oPaymentCardTypes.setSizeLimit(oData.results && oData.results.length);
				this.oPaymentCardTypes.setData(oData);
				fnCallback(this.oPaymentCardTypes);
			}
		}, this);
		this.ERP.read("PaymentCardTypes", ["$format=json"], true, {
			fnSuccess: fnSuccess
		});
	},

	_onReadCommunicationCategoriesSuccess: function(oData, oResponse) {
		if (oData.results) {
			var aData = [];
			for ( var i = 0; i < oData.results.length; i++) {
				this.SERVICE.read("GetAllowedCommunicationMethods", "CommunicationCategoryID='"
						+ encodeURIComponent(oData.results[i].CommunicationCategoryID) + "'", false, {
					fnSuccess: function(oCommunicationMethods) {
						aData.push(oCommunicationMethods.results);
					}
				});
			}
			this.oBillingMethods.setData(aData[1]);
			this.oOutageMethods.setData(aData[2]);
			this.oPersonalInfo = this.getAccount();
			this.fnPreferencesCallback(this.oCommunicationPreferences, this.oStandardAddress, this.oBillingMethods, this.oOutageMethods, this.oPersonalInfo);
		}
	},

	_onReadCommunicationPreferencesSuccess: function(oData, oResponse) {

		var fnSuccess = jQuery.proxy(function(oAccount, oResponse) {
			this.oStandardAddress.setData(oAccount);
			this.SERVICE.read("CommunicationCategories", ["$format=json"], true, {
				fnSuccess: jQuery.proxy(this._onReadCommunicationCategoriesSuccess, this)
			});
		});
		if (oData.results && oData.results.length) {
			this.oCommunicationPreferences.setSizeLimit(oData.results && oData.results.length);
			this.oCommunicationPreferences.setData(oData);
			if (oData.results[0].AddressID) {
				this.SERVICE
						.read(
								"/AccountAddresses(AccountID='" + oData.results[0].AccountID + "',AddressID='" + oData.results[0].AddressID + "')",
								["$format=json",
										"$expand=AccountAddressDependentEmails,AccountAddressDependentFaxes,AccountAddressDependentMobilePhones,AccountAddressDependentPhones"],
								true, {
									fnSuccess: jQuery.proxy(fnSuccess, this)
								});
			} else {
				this.SERVICE
						.read(
								this.getAccountPath() + "StandardAccountAddress",
								["$format=json",
										"$expand=AccountAddressDependentEmails,AccountAddressDependentFaxes,AccountAddressDependentMobilePhones,AccountAddressDependentPhones"],
								true, {
									fnSuccess: jQuery.proxy(fnSuccess, this)
								});
			}
		} else {
			// user does not have communication permissions but mimick the Object
			this.ERP
					.read(
							this.getAccountPath() + "ContractAccounts",
							["$format=json"],
							true,
							{
								fnSuccess: $
										.proxy(
												function(oData) {
													var oPreferences = {
														results: [{
															AccountID: this.getAccountId(),
															AddressID: "",
															CommunicationCategoryID: sap.umc.mobile.private.app.Constants.COMMUNICATION_PREFERENCES.GC_CAT_BILL_NOTIFICATION,
															CommunicationMethodID: sap.umc.mobile.private.app.Constants.COMMUNICATION_PREFERENCES.NOT_SET,
															ContractAccountID: oData.results[0].ContractAccountID
														}, {
															AccountID: this.getAccountId(),
															AddressID: "",
															CommunicationCategoryID: sap.umc.mobile.private.app.Constants.COMMUNICATION_PREFERENCES.GC_CAT_OUTAGE,
															CommunicationMethodID: sap.umc.mobile.private.app.Constants.COMMUNICATION_PREFERENCES.NOT_SET,
															ContractAccountID: oData.results[0].ContractAccountID
														}, {
															AccountID: this.getAccountId(),
															AddressID: "",
															CommunicationCategoryID: sap.umc.mobile.private.app.Constants.COMMUNICATION_PREFERENCES.GC_CAT_BILLING,
															CommunicationMethodID: sap.umc.mobile.private.app.Constants.COMMUNICATION_PREFERENCES.NOT_SET,
															ContractAccountID: oData.results[0].ContractAccountID
														}]
													};
													this.oCommunicationPreferences.setSizeLimit(oPreferences.results && oPreferences.results.length);
													this.oCommunicationPreferences.setData(oPreferences);
													this.fnPreferencesCallbackNotSet();
													this.SERVICE
															.read(
																	this.getAccountPath() + "StandardAccountAddress",
																	["$format=json",
																			"$expand=AccountAddressDependentEmails,AccountAddressDependentFaxes,AccountAddressDependentMobilePhones,AccountAddressDependentPhones"],
																	true, {
																		fnSuccess: jQuery.proxy(fnSuccess, this)
																	});
												}, this)
							});
		}
	},

	_readCommunicationPreferences: function(fnCallback) {
		this.SERVICE.read(this.getAccountPath() + "CommunicationPreferences", ["$format=json", "$expand=CommunicationCategory,CommunicationMethod"],
				true, {
					fnSuccess: jQuery.proxy(this._onReadCommunicationPreferencesSuccess, this)
				});
	},

	_readLanguageBatch: function(fnCallback) {
		var aBatchOperations = [];
		aBatchOperations.push(this.ERP.createBatchOperation("/Languages", sap.umc.mobile.private.app.Constants.HTTP_GET, null, []));
		aBatchOperations.push(this.ERP.createBatchOperation(this.getAccountPath() + "?$select=CorrespondenceLanguageISO,LanguageISO,AccountID,AccountTypeID", sap.umc.mobile.private.app.Constants.HTTP_GET, null, []));

		this.ERP.clearBatch();
		this.ERP.addBatchReadOperations(aBatchOperations);
		this.ERP.submitBatch({
			fnSuccess: fnCallback
		}, true);
	},

	_updateCommunicationPref: function(aPreferences, bIsPaperless, fnCallback) {
		/*var sContractAccountID = aPreferences.results[0].ContractAccountID;
		var sAccountID = aPreferences.results[0].AccountID;
		var sAddressID = aPreferences.results[0].AddressID;
		var oPreference = {
			ContractAccountID: sContractAccountID,
			CommunicationCategoryID: aPreferences.results[0].CommunicationCategoryID,
			CommunicationMethodID: aPreferences.results[0].CommunicationMethodID,
			AccountID: sAccountID,
			AddressID: sAddressID,
			DependentAccountCommPreferences: [
					{
						ContractAccountID: sContractAccountID,
						CommunicationCategoryID: aPreferences.results[2].CommunicationCategoryID,
						CommunicationMethodID: aPreferences.results[2].CommunicationMethodID,
						AccountID: sAccountID,
						AddressID: sAddressID
					}]
		};*/
	    var sContractAccountID = aPreferences.results[0].ContractAccountID;
        var sAccountID = aPreferences.results[0].AccountID;
        var sAddressID = aPreferences.results[0].AddressID;
        var sDependent = {};
        $.each(aPreferences.results,function(i,e){if(e.CommunicationCategoryID==="UMCB"){

                        sDependent.ContractAccountID= sContractAccountID;
                        sDependent.CommunicationCategoryID= e.CommunicationCategoryID;
                        //sDependent.CommunicationMethodID= e.CommunicationMethodID;
                        if(bIsPaperless){
                        	sDependent.CommunicationMethodID = "STND";
                        }
                        else{
                        	sDependent.CommunicationMethodID = "NONE";
                        }
                        sDependent.AccountID= sAccountID;
                        sDependent.AddressID= sAddressID;
                    
        }});
        var oPreference = {
            ContractAccountID: sContractAccountID,
            CommunicationCategoryID: aPreferences.results[0].CommunicationCategoryID,
            CommunicationMethodID: aPreferences.results[0].CommunicationMethodID,
            AccountID: sAccountID,
            AddressID: sAddressID,
            DependentAccountCommPreferences: [sDependent]
        };
		this.SERVICE.createEntity("CommunicationPreferences", oPreference, {
			fnSuccess: fnCallback
		});
	},
	// Pass preferened email and sms
	// Include updated correspondance language in the batch 
	_updateCommunicationPermissions: function(oAccountLanguage, fnCallback) {
		var aBatch = [];
		//Save Account Language if it has changed (passed as null if it has not changed)
		if (oAccountLanguage) {
			aBatch.push(this.ERP.createBatchOperation(this.getAccountPath(), sap.umc.mobile.private.app.Constants.HTTP_PUT, oAccountLanguage, null));
		}

		this.ERP.clearBatch();
		this.ERP.addBatchChangeOperations(aBatch);
		this.ERP.submitChangeBatch({
			fnSuccess: jQuery.proxy(function(oData) {
				this.oPermissions = [];
				fnCallback(oData);
			}, this)
		}, true);
	},

	_updateCorrespondenceLanguage: function(oAccount, fnCallback) {

	},

	// for hotoffers
	_readCommunicationChannels: function(fnCallback) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			if (oData.results) {
				this.oCommunicationChannels.setSizeLimit(oData.results && oData.results.length);
				this.oCommunicationChannels.setData(oData);
				fnCallback(this.oCommunicationChannels);
			}
		}, this);
		this.ERP.read("CommunicationChannels", ["$format=json"], true, {
			fnSuccess: fnSuccess
		});
	},

	_readCommunicationPermissions: function(fnCallback) {
		var fnSuccess = jQuery
				.proxy(
						function(oData, oResponse) {
							var CONSTANTS = sap.umc.mobile.private.app.Constants.COMMUNICATION_PERMISSIONS;
							if (oData.results) {
								this.oPermissions = oData.results;
								var oMap = {};
								var aPermissions = [];
								for ( var i = 0; i < oData.results.length; i++) {
									if (oMap[oData.results[i].CommunicationChannelID]) {
									} else {
										var oValue = oData.results[i];
										// only allows not empty, its given, its either sms or email
										if (oValue
												&& oValue.CommunicationPermissionStatusID === CONSTANTS.GIVEN
												&& (oValue.CommunicationChannelID === CONSTANTS.EMAIL || oValue.CommunicationChannelID === CONSTANTS.MOBILE || oValue.CommunicationChannelID === CONSTANTS.LETTER)) {
											oMap[oData.results[i].CommunicationChannelID] = oData.results[i];
											aPermissions.push(oData.results[i]);
										}
									}
								}
								// this.oCommunicationPermissions.setDefaultBindingMode("OneWay");
								this.oCommunicationPermissions.setData(aPermissions);
								fnCallback(this.oCommunicationPermissions);
							} else {
								this.oPermissions = [];
								// this.oCommunicationPermissions.setDefaultBindingMode("OneWay");
								this.oCommunicationPermissions.setData([]);
								fnCallback(this.oCommunicationPermissions);
							}

						}, this);
		this.ERP.read(this.getAccountPath() + "CommunicationPermissions",
				["$format=json", "$expand=CommunicationChannel,CommunicationPermissionStatus"], true, {
					fnSuccess: fnSuccess
				});
	},

	_readContactAddress: function(fnCallBack) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			if (oData && oData.AddressInfo) {
				fnCallBack(oData);
			}
		}, this);
		this.ERP.read(this.getAccountPath() + "StandardAccountAddress", ["$format=json"], true, {
			fnSuccess: fnSuccess
		});
	},
//batch-RAL
	/*_readRegions: function(oDelegate, sCountryID) {
		var fnSuccess = jQuery.proxy(function(oData) {
			if (oData) {
				oDelegate.onRegionsLoaded(oData);
			}
		}, this);
		this.ERP.read("Regions", ["$filter=CountryID eq '" + sCountryID + "'", "$format=json"], true, {
			fnSuccess: fnSuccess
		});
	},
*/
	_readRegions: function(oDelegate, sCountryID) {
		var fnSuccess = jQuery.proxy(function(oData) {
			if (oData) {
				oDelegate.onRegionsLoaded(oData);
			}
		}, this);
		this.SERVICE.read("Regions", ["$format=json"], true, {
			fnSuccess: fnSuccess
		}, [], [{
			name: 'CountryID',
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(sCountryID)
		}]);
	},
	_updateContactAddress: function(oDelegate, oContactAddress) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onSaveContactAddressSuccess();
			// oDelegate.refreshBankAccounts();
		}, oDelegate);
		this.ERP.updateEntity("AccountAddresses",
				["AccountID=\'" + oContactAddress.AccountID + "\'", "AddressID=\'" + oContactAddress.AddressID + "\'"], oContactAddress, {
					fnSuccess: fnSuccess
				});
	},

	_getReadContactPhonesOperation: function() {
		return this.ERP.createBatchOperation(this.getAccountPath() + "StandardAccountAddress/AccountAddressDependentPhones",
				sap.umc.mobile.private.app.Constants.HTTP_GET, null, ["$format=json"]);
	},

	_getReadContactMobilePhonesOperation: function() {
		return this.ERP.createBatchOperation(this.getAccountPath() + "StandardAccountAddress/AccountAddressDependentMobilePhones",
				sap.umc.mobile.private.app.Constants.HTTP_GET, null, ["$format=json"]);
	},

	_getReadContactEmailsOperation: function() {
		return this.ERP.createBatchOperation(this.getAccountPath() + "StandardAccountAddress/AccountAddressDependentEmails",
				sap.umc.mobile.private.app.Constants.HTTP_GET, null, ["$format=json"]);
	},

	_readContactPhonesAndEmails: function(oDelegate) {
		//		var aBatchOperations = [];
		//		aBatchOperations.push(this._getReadContactPhonesOperation());
		//		aBatchOperations.push(this._getReadContactMobilePhonesOperation());
		//		aBatchOperations.push(this._getReadContactEmailsOperation());
		//		this.ERP.clearBatch();
		//		this.ERP.addBatchReadOperations(aBatchOperations);

		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onContactPhonesAndEmailsLoaded(oData);
		});

		var oCallbacks = {
			fnSuccess: fnSuccess
		};

		this.ERP.read(this.getAccountPath() + "StandardAccountAddress", ["$format=json",
				"$expand=AccountAddressDependentPhones,AccountAddressDependentMobilePhones,AccountAddressDependentEmails"], true, oCallbacks);

		//		(this.getAccountPath() + "CommunicationPermissions",
		//				["$format=json", "$expand=CommunicationChannel,CommunicationPermissionStatus"], true, {
		//					fnSuccess: fnSuccess
		//				});		

	},

	_getUpdateContactEmailOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentEmails(AccountID=\'" + oData.AccountID + "\',AddressID=\'" + oData.AddressID
				+ "\',SequenceNo=\'" + oData.SequenceNo + "\')", "PUT", oData, ["$format=json"]);
	},

	_getCreateContactEmailOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentEmails", "POST", oData, ["$format=json"]);
	},

	_getDeleteContactEmailOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentEmails(AccountID=\'" + oData.AccountID + "\',AddressID=\'" + oData.AddressID
				+ "\',SequenceNo=\'" + oData.SequenceNo + "\')", "DELETE", oData, ["$format=json"]);
	},

	_getUpdateContactHomePhoneOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentPhones(AccountID=\'" + oData.AccountID + "\',AddressID=\'" + oData.AddressID
				+ "\',SequenceNo=\'" + oData.SequenceNo + "\')", "PUT", oData, ["$format=json"]);
	},

	_getCreateContactHomePhoneOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentPhones", "POST", oData, ["$format=json"]);
	},

	_getDeleteContactHomePhoneOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentPhones(AccountID=\'" + oData.AccountID + "\',AddressID=\'" + oData.AddressID
				+ "\',SequenceNo=\'" + oData.SequenceNo + "\')", "DELETE", oData, ["$format=json"]);
	},

	_getUpdateContactMobilePhoneOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentMobilePhones(AccountID=\'" + oData.AccountID + "\',AddressID=\'"
				+ oData.AddressID + "\',SequenceNo=\'" + oData.SequenceNo + "\')", "PUT", oData, ["$format=json"]);
	},

	_getCreateContactMobilePhoneOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentMobilePhones", "POST", oData, ["$format=json"]);
	},

	_getDeleteContactMobilePhoneOperation: function(oData) {
		return this.ERP.createBatchOperation("/AccountAddressDependentMobilePhones(AccountID=\'" + oData.AccountID + "\',AddressID=\'"
				+ oData.AddressID + "\',SequenceNo=\'" + oData.SequenceNo + "\')", "DELETE", oData, ["$format=json"]);
	},

	_updateContactPhonesAndEmails: function(oDelegate, oContactData) {
		var aBatchOperations = [];
		var oContactPhonesAndEmails = $.extend(true, {}, oContactData);

		if (oContactPhonesAndEmails.emails && oContactPhonesAndEmails.emails.change) {
			for ( var i = 0; i < oContactPhonesAndEmails.emails.change.length; i++) {
				aBatchOperations.push(this._getUpdateContactEmailOperation(oContactPhonesAndEmails.emails.change[i]));
			}
		}

		if (oContactPhonesAndEmails.emails && oContactPhonesAndEmails.emails.add) {
			for ( var i = 0; i < oContactPhonesAndEmails.emails.add.length; i++) {
				oContactPhonesAndEmails.emails.add[i].SequenceNo = "";
				aBatchOperations.push(this._getCreateContactEmailOperation(oContactPhonesAndEmails.emails.add[i]));
			}
		}

		if (oContactPhonesAndEmails.emails && oContactPhonesAndEmails.emails.remove) {
			for ( var i = 0; i < oContactPhonesAndEmails.emails.remove.length; i++) {
				aBatchOperations.push(this._getDeleteContactEmailOperation(oContactPhonesAndEmails.emails.remove[i]));
			}
		}

		if (oContactPhonesAndEmails.homePhones && oContactPhonesAndEmails.homePhones.change) {
			for ( var i = 0; i < oContactPhonesAndEmails.homePhones.change.length; i++) {
				if (oContactPhonesAndEmails.homePhones.change[i].StandardFlag) {
					oContactPhonesAndEmails.homePhones.change[i].PhoneType = "1";
				} else {
					oContactPhonesAndEmails.homePhones.change[i].PhoneType = "";
				}
				aBatchOperations.push(this._getUpdateContactHomePhoneOperation(oContactPhonesAndEmails.homePhones.change[i]));
			}
		}

		if (oContactPhonesAndEmails.homePhones && oContactPhonesAndEmails.homePhones.add) {
			for ( var i = 0; i < oContactPhonesAndEmails.homePhones.add.length; i++) {
				oContactPhonesAndEmails.homePhones.add[i].SequenceNo = "";
				if (oContactPhonesAndEmails.homePhones.add[i].StandardFlag) {
					oContactPhonesAndEmails.homePhones.add[i].PhoneType = "1";
				} else {
					oContactPhonesAndEmails.homePhones.add[i].PhoneType = "";
				}
				aBatchOperations.push(this._getCreateContactHomePhoneOperation(oContactPhonesAndEmails.homePhones.add[i]));
			}
		}

		if (oContactPhonesAndEmails.homePhones && oContactPhonesAndEmails.homePhones.remove) {
			for ( var i = 0; i < oContactPhonesAndEmails.homePhones.remove.length; i++) {
				aBatchOperations.push(this._getDeleteContactHomePhoneOperation(oContactPhonesAndEmails.homePhones.remove[i]));
			}
		}

		if (oContactPhonesAndEmails.mobilePhones && oContactPhonesAndEmails.mobilePhones.change) {
			for ( var i = 0; i < oContactPhonesAndEmails.mobilePhones.change.length; i++) {
				if (oContactPhonesAndEmails.mobilePhones.change[i].StandardFlag) {
					oContactPhonesAndEmails.mobilePhones.change[i].PhoneType = "3";
				} else {
					oContactPhonesAndEmails.mobilePhones.change[i].PhoneType = "2";
				}
				aBatchOperations.push(this._getUpdateContactMobilePhoneOperation(oContactPhonesAndEmails.mobilePhones.change[i]));
			}
		}

		if (oContactPhonesAndEmails.mobilePhones && oContactPhonesAndEmails.mobilePhones.add) {
			for ( var i = 0; i < oContactPhonesAndEmails.mobilePhones.add.length; i++) {
				oContactPhonesAndEmails.mobilePhones.add[i].SequenceNo = "";
				if (oContactPhonesAndEmails.mobilePhones.add[i].StandardFlag) {
					oContactPhonesAndEmails.mobilePhones.add[i].PhoneType = "3";
				} else {
					oContactPhonesAndEmails.mobilePhones.add[i].PhoneType = "2";
				}
				aBatchOperations.push(this._getCreateContactMobilePhoneOperation(oContactPhonesAndEmails.mobilePhones.add[i]));
			}
		}

		if (oContactPhonesAndEmails.mobilePhones && oContactPhonesAndEmails.mobilePhones.remove) {
			for ( var i = 0; i < oContactPhonesAndEmails.mobilePhones.remove.length; i++) {
				aBatchOperations.push(this._getDeleteContactMobilePhoneOperation(oContactPhonesAndEmails.mobilePhones.remove[i]));
			}
		}

		this.ERP.clearBatch();
		this.ERP.addBatchChangeOperations(aBatchOperations);

		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onContactPhonesAndEmailsUpdated();
		});

		var oCallbacks = {
			fnSuccess: fnSuccess
		};

		if (aBatchOperations.length) {
			this.ERP.submitChangeBatch(oCallbacks, true);
		} else {
			oDelegate._initializeContactPhonesAndEmailsModels();
		}
	},

	_createInteractionRecord: function(fnCallback, oIRData) {
		/*InteractionRecords changed to AccountContacts*/
		this.ERP.createEntity("AccountContacts", oIRData, {
			fnSuccess: fnCallback
		});
	},

	_sendChangeNameRequest: function(fnCallback, oChangeNameData) {
		this.ERP.functionImport("RequestChange", sap.umc.mobile.private.app.Constants.HTTP_POST, oChangeNameData, true, {
			fnSuccess: fnCallback
		});
	},
	//****
	_readBillingAddresses: function(fnCallback) {
		this.ERP.read(this.getAccountPath() + "AccountAddresses", ["$format=json"], true, {
			fnSuccess: fnCallback
		});
	},
	_readBillingAddressCountries: function(fnCallback) {
		this.ERP.read("Countries", ["$format=json"], true, {
			fnSuccess: fnCallback
		});
	},
	//batch-RAL
//	_readBillingAddressRegions: function(sCountryID, fnCallback) {
//		this.ERP.read("Regions", ["$filter=CountryID eq '" + sCountryID + "'", "$format=json"], true, {
//			fnSuccess: fnCallback
//		});
//	},
	_readBillingAddressRegions: function(sCountryID, fnCallback) {
		this.SERVICE.read("Regions", ["$format=json"], true, {
			fnSuccess: fnCallback
		}, [], [{
			name: 'CountryID',
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(sCountryID)
		}]);
	},
	_createAddress: function(oAddressData, fnCallback) {
		this.ERP.createEntity(this.getAccountPath() + "AccountAddresses", oAddressData, {
			fnSuccess: fnCallback
		});
	},
	_readBusinessAgreement: function(oDelegate, sBusinessAgreementID) {
		this.ERP.read(this.getAccountPath() + "BusinessAgreements(BusinessAgreementID=\'" + sBusinessAgreementID + "\')", ["$format=json"], true, {
			fnSuccess: $.proxy(function(oData) {
				if (oData) {				
					oDelegate.onReadBusinessAgreementSuccess(oData.BillToAccountAddressID);
				}
			}, this)
		});
	},
	_readRelationships: function(oDelegate) {
	var fnSuccess = jQuery.proxy(function(oData, oResponse) {
		
		this.oRelationships.setData(oData.results);
		oDelegate.onRelationshipsLoadedSuccess(this.oRelationships);
	
	}, this);
	this.ERP.read(this.getAccountPath() + "AccountRelationships", ["$format=json", "$expand=AccountRelationshipType"], true, {
		fnSuccess: fnSuccess
	});},
	_removeRelationship: function(oDelegate, oRelationship) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onRemoveRelationshipSuccess();
		}, oDelegate);
		
		var a =oRelationship.ValidFrom.toISOString();
		var e = a.split(".");
		var sValidFrom ="datetime'"+oRelationship.ValidFrom.toISOString().split(".")[0]+"'";
		var c =oRelationship.ValidTo.toISOString();
		var f = c.split(".");
		var sValidTo ="datetime'"+oRelationship.ValidTo.toISOString().split(".")[0]+"'";
		this.SERVICE.removeEntity("/AccountRelationships", ["AccountID=\'" + encodeURIComponent(oRelationship.AccountID) + "\'",
		                                                    "RelationshipID=\'" + encodeURIComponent(oRelationship.RelationshipID) + "\'",
		                                                    "RelatedAccountID=\'" + encodeURIComponent(oRelationship.RelatedAccountID) + "\'",
		                                                    "AccountRelationshipTypeID=\'" + encodeURIComponent(oRelationship.AccountRelationshipTypeID) + "\'",
		                                                    "DifferentiationValue=\'" + encodeURIComponent(oRelationship.DifferentiationValue) + "\'",
		                                                    "ValidFrom=" + encodeURIComponent(sValidFrom) ,
		                                                    "ValidTo=" + encodeURIComponent(sValidTo) ], {
			fnSuccess: fnSuccess
		});
	},
	//remove relationship and then read relations in batch call
	/*_removeRelationship: function(oDelegate, oRelationship) {
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onRemoveRelationshipSuccess();
		}, oDelegate);
		var fnError = jQuery.proxy(function(oData, oResponse) {
			alert("error")
		}, oDelegate);
		
		var a =oRelationship.ValidFrom.toISOString();
		var e = a.split(".");
		var sValidFrom ="datetime\'"+oRelationship.ValidFrom.toISOString().split(".")[0]+"\'";
	
		var c =oRelationship.ValidTo.toISOString();
		var f = c.split(".");
		var sValidTo ="datetime\'"+oRelationship.ValidTo.toISOString().split(".")[0]+"\'";
		
		
		var obj = {};
		obj.AccountID = oRelationship.AccountID;
		obj.RelationshipID = oRelationship.RelationshipID;
		obj.RelatedAccountID = oRelationship.RelatedAccountID;
		obj.AccountRelationshipTypeID = oRelationship.AccountRelationshipTypeID;
		obj.DifferentiationValue = oRelationship.DifferentiationValue;
		obj.ValidFrom = sValidFrom;
		obj.ValidTo= sValidTo;
var aBatchOperations = [];
var aBatchOperationsDelete = [];	


var sEntityId = this.SERVICE._parseEntityIds(["AccountID=\'" + encodeURIComponent(oRelationship.AccountID) + "\'",
                                              "RelationshipID=\'" + encodeURIComponent(oRelationship.RelationshipID) + "\'",
                                              "RelatedAccountID=\'" + encodeURIComponent(oRelationship.RelatedAccountID) + "\'",
                                              "AccountRelationshipTypeID=\'" + encodeURIComponent(oRelationship.AccountRelationshipTypeID) + "\'",
                                              "DifferentiationValue=\'" + encodeURIComponent(oRelationship.DifferentiationValue) + "\'",
                                              "ValidFrom=" + encodeURIComponent(sValidFrom) ,
                                              "ValidTo=" + encodeURIComponent(sValidTo) ]);
		aBatchOperationsDelete.push(this.SERVICE.createBatchOperation("/AccountRelationships" + sEntityId,sap.umc.mobile.private.app.Constants.HTTP_DELETE, null, []));
		aBatchOperations.push(this.SERVICE.createBatchOperation(this.getAccountPath() + "AccountRelationships"+ "?$format=json&$expand=AccountRelationshipType", sap.umc.mobile.private.app.Constants.HTTP_GET, null, []));
	
		this.SERVICE.clearBatch();
		this.SERVICE.oServiceModel.addBatchChangeOperations(aBatchOperationsDelete);
		this.SERVICE.oServiceModel.addBatchReadOperations(aBatchOperations);
		var mParameters = {};
	
		mParameters.fnSuccess = fnSuccess;
		mParameters.bAsync = true;
		mParameters.fnError = fnError;
		this.SERVICE.oServiceModel.setUseBatch(true);
		this.SERVICE.oServiceModel.submitBatch(
				fnSuccess,true);
	
		
		
	},*/
	
	_searchRelations: function(oDelegate, oParameter) {
		//batch-RAL
	/*	
		fnSuccess = jQuery.proxy(function(oData, oResponse) {
			this._onSearchRelationsSuccess(oData,oDelegate);
			
		}, this);
	
		
		this.ERP.read("BusinessDirectories?$filter=City eq \'" + oParameter.City + "\'and Country eq \'"
				 + oParameter.Country + "\'and HouseNo eq \'"+ oParameter.HouseNo + "\'and PostlCod1 eq \'"
				 + oParameter.PostalCode + "\'and Street eq \'"+ oParameter.Street + "\'" 
				 ,oFilterParams,true,{
			fnSuccess: fnSuccess
		});*/
		
		this.ERP.read("BusinessDirectories", ["$format=json"], true, {
			fnSuccess: $.proxy(function(oData) {
				this._onSearchRelationsSuccess(oData,oDelegate);
				}, this)
		}, {}, [{
			name: "City",
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(oParameter.City)
		},
		{
			name: "Country",
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(oParameter.Country)
		},
		{
			name: "HouseNo",
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(oParameter.HouseNo)
		},
		{
			name: "PostlCod1",
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(oParameter.PostalCode)
		},
		{
			name: "Street",
			operator: sap.ui.model.FilterOperator.EQ,
			value: encodeURIComponent(oParameter.Street)
		},
		
		]);


		
	},
	
	
	
	//c5221606
	_createRelationship:function(oDelegate){
		 
		var oRelations = {};
		oRelations=jQuery.extend( {}, oDelegate.getView().getModel("relationshipDetails").getData());
			;
	/*	var sValidFrom =oRelations.ValidFrom.toISOString();
		var sValidFromSplitted = sValidFrom.split(".");
		var sValidFromSplittedFirst =sValidFromSplitted[0];
		var sValidTo =oRelations.ValidTo.toISOString();
		var sValidToSplitted = sValidTo.split(".");
		var sValidToSplittedFirst =sValidToSplitted[0];*/
		oRelations.ValidFrom = this.formatDate(oRelations.ValidFrom);
		oRelations.ValidTo = this.formatDate(oRelations.ValidTo);
		var fnSuccess = jQuery.proxy(function(oData, oResponse) {
			oDelegate.onCreateRelationSuccess(oData);
		}, oDelegate);
		this.ERP.createEntity(this.getAccountPath() + "AccountRelationships", oRelations, {
			fnSuccess: fnSuccess
		});
		
	},
	_readCountriesForFilter:function(oDelegate){
		fnSuccess= jQuery.proxy(function(oData, oResponse){
			this._onCountriesLoadedForFliter(oDelegate,oData);
			
		},this);
		this.ERP.read("Countries", ["$format=json"], true, {
			fnSuccess:fnSuccess
		});
	},
	formatDate:function(sDate){
		if(Date.prototype.isPrototypeOf(sDate)){  
			var sFormattedDate = "";
			sFormattedDate += sDate.getFullYear().toString()+"-";
		if((sDate.getMonth()+1)<10){
			sFormattedDate += "0"+(sDate.getMonth()+1).toString()+"-";
		}
		else
			{
			sFormattedDate += (sDate.getMonth()+1).toString()+"-";
			}
		if((sDate.getDate())<10){
			sFormattedDate += "0"+sDate.getDate().toString();
		}
		else
			{
			sFormattedDate += sDate.getDate().toString();
			}
return sFormattedDate+"T"+"00:00:00";}
	 else{
		 return	 sDate;
	 }
		
		/*
		
		 if(Date.prototype.isPrototypeOf(sDate)){  
		var sLocalDateTemp = sDate.toLocaleDateString();
		
		var sLocalDate= "";
		
		for(var i =0;i<sLocalDateTemp.length;i++){
			if(!(sLocalDateTemp.charCodeAt(i)===8206)){
				
				sLocalDate += sLocalDateTemp.charAt(i);
				
			}
			
		}
		var sSplitDate =  sLocalDate.split("/");
		var sFormattedDate = sSplitDate[2]+"-";
		if(sSplitDate[0].length ==1 ){
		sFormattedDate += "0"+sSplitDate[0]+"-";	
		}
		else{
			sFormattedDate += sSplitDate[0]+"-";	
		}
		if(sSplitDate[1].length ==1 ){
			sFormattedDate += "0"+sSplitDate[1];	
			}
			else{
				sFormattedDate += sSplitDate[1];	
			}
		
		//time
		sLocalTime= sDate.toTimeString();
		sSplitTime =  sLocalTime.split(" ");
		
		return sFormattedDate+"T"+"00:00:00";
		 }
		 else{
    		 return	 sDate;
    	 }	 
	*/},
	
	
}
