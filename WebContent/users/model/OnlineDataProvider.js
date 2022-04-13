/*global window */
jQuery.sap.declare("sap.umc.mobile.users.model.OnlineDataProvider");
sap.umc.mobile.users.model.OnlineDataProvider = {
    _refreshUsersList:function(oDelegate,oSelectedUser){

      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        this.oUsers = new sap.ui.model.json.JSONModel();
        if (oData.results) {
        //  this.oUsers.setSizeLimit(oData.results && oData.results.length);
          var obj = $.extend(true,{},oData);
          for(var i=0;i<obj.results.length;i++){
            obj.results[i].ValidFrom =  sap.umc.mobile.users.js.utils.formatUsersDate(obj.results[i].ValidFrom);
            obj.results[i].ValidTo =  sap.umc.mobile.users.js.utils.formatUsersDate(obj.results[i].ValidTo);
          }
          this.oUsers = new sap.ui.model.json.JSONModel();
          this.oUsers.setData(obj);
          //this.oUsers.setData(oData);
          oDelegate.getView().setModel(this.oUsers, "Users");
          /*if (sap.ui.getCore().getModel("device").getProperty("/isNoPhone")){
            this._setDefaultItemSelection(oSelectedUser);
          }
          */
          var oList = oDelegate.getView().byId("UsersList");

          var oPreSelectedUser = this.oSelectedUser;
          if(oList && oList.getItems().length){
            var oSelectedUser = {};
            if(oPreSelectedUser){
              for(var i = 0;i<oList.getItems().length;i++){
                var oListItem = oList.getItems()[i];
                if ( oListItem != undefined ){

                  /*oListItem.addStyleClass("sapMLIBSelected");*/
                  var oContext = oListItem.getBindingContext("Users");
                  var oUser = oContext.getProperty(oContext.getPath());
                  if(oPreSelectedUser.AliasID.toLowerCase() ===  oUser.AliasID.toLowerCase()){
                    oSelectedUser = oUser;
                    oList.setSelectedItem(oListItem, true);
                  }


                }
              }


            }
            }


        }
      }, this);
      //user fix
      var fnError = jQuery.proxy(function(oData, oResponse) {}, this);
      var sUsersPath = this.getAccountPath() + "Users";
      this.SERVICE.read(sUsersPath, ["$format=json","$expand=UserGroup"], false, {
        fnSuccess: fnSuccess,
        //user fix
        fnError:fnError
      });

    },
    _readUsers:function(oDelegate,oSelectedUser){

      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        if (oData.results) {
          this.oUsers.setSizeLimit(oData.results && oData.results.length);
          var obj = $.extend(true,{},oData);
          for(var i=0;i<obj.results.length;i++){
            obj.results[i].ValidFrom =  sap.umc.mobile.users.js.utils.formatUsersDate(obj.results[i].ValidFrom);
            obj.results[i].ValidTo =  sap.umc.mobile.users.js.utils.formatUsersDate(obj.results[i].ValidTo);
          }
          this.oUsers = new sap.ui.model.json.JSONModel();
          this.oUsers.setData(obj);
          /*this.oUsers.setData(oData);*/
          if (oDelegate) {
            oDelegate.onUsersLoaded(this.oUsers,oSelectedUser);
          }
        }
      }, this);
      //user fix
      var fnError = jQuery.proxy(function(oData, oResponse) {
        /*if (oData.results) {
          this.oUsers.setSizeLimit(oData.results && oData.results.length);
          this.oUsers.setData(oData);
          */
          if (oDelegate) {
            oDelegate.onUsersLoaded(this.oUsers,oSelectedUser);
          }
      /*  }*/
      }, this);
      var sUsersPath = this.getAccountPath() + "Users";
      this.SERVICE.read(sUsersPath, ["$format=json","$expand=UserGroup"], true, {
        fnSuccess: fnSuccess,
        //user fix
        fnError:fnError
      });

    },
    _loadUserGroups:function(oDelegate){

      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        if (oData.results) {


          if (oDelegate) {
            this._onUserGroupsLoadedSuccess(oDelegate,oData);
          }
        }
      }, this);

      var oParameter = {AccountID:this.getAccount().oData.AccountID};
      //function import 
      this.ERP.functionImport("GetUserGroups", sap.umc.mobile.private.app.Constants.HTTP_GET, 
          oParameter, true,{
        fnSuccess: fnSuccess
      });



    },

    //c5221606
    _createUser:function(oDelegate){
      var oUser = {};
      oUser=jQuery.extend( {}, oDelegate.getView().getModel("user").getData());
        ;

      /*var sValidFrom = this.formatDate(oUser.ValidFrom);
      var sValidFromSplitted = sValidFrom.split(".");
      var sValidFromSplittedFirst =sValidFromSplitted[0];
      var sValidTo = this.formatDate(oUser.ValidTo);
      var sValidToSplitted = sValidTo.split(".");
      var sValidToSplittedFirst =sValidToSplitted[0];*/
      oUser.ValidFrom = this.formatDate(oUser.ValidFrom);
      oUser.ValidTo = this.formatDate(oUser.ValidTo);
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        oDelegate.onCreateUserSuccess(/*oUser*/);
      }, oDelegate);
      /*var fnError = jQuery.proxy(function(oData,oResponse){
        if (oDelegate) {

          oDelegate._setDefaultValues();

        }

      },this);*/
      this.ERP.createEntity(this.getAccountPath() + "Users", oUser, {
        fnSuccess: fnSuccess,

      });

    },

    _loadUserAssignedPrivileges:function(oDelegate,oSelectedUser){
      var fnError = jQuery.proxy(function(oResponse) {
        this.oUserAssignedPrivileges.setData([]);

        if (oDelegate) {


    //   var errMsg  = JSON.parse(oResponse.response.body).error.message.value;
    //   oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,errMsg );
          oDelegate.onUserAssignedPrivilegesLoaded(this.oUserAssignedPrivileges);
                        }

    }, this);
      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        if (oData.results) {
          this.oUserAssignedPrivileges.setSizeLimit(oData.results && oData.results.length);

          var obj = $.extend(true,{},oData);
          for(var i=0;i<obj.results.length;i++){
            obj.results[i].ValidFrom =  sap.umc.mobile.users.js.utils.formatUsersDate(obj.results[i].ValidFrom);
            obj.results[i].ValidTo =  sap.umc.mobile.users.js.utils.formatUsersDate(obj.results[i].ValidTo);
          }
          ;
          this.oUserAssignedPrivileges.setData(obj);

          if (oDelegate) {
            oDelegate.onUserAssignedPrivilegesLoaded(this.oUserAssignedPrivileges);
          }
        }
      }, this);
       //batch-RAL
           /*    
                this.SERVICE.read(sFormsPath, ["$filter=AliasID eq '"+oSelectedUser.AliasID+"'"+" and AccountID eq '"+this.getAccountId()+"'","$format=json","$expand=UserPrivilege"], true, {
                    fnSuccess: fnSuccess,
                    fnError:fnError
                });*/
       var sFormsPath = "UserAssignedPrivileges";
                var sExpand = "$expand=UserPrivilege";
                this.SERVICE.read(sFormsPath, ["$format=json",sExpand], true, {
                  fnSuccess: fnSuccess,
                    fnError:fnError
            }, [], [{
              name: 'AliasID',
              operator: sap.ui.model.FilterOperator.EQ,
              value: encodeURIComponent(oSelectedUser.AliasID)
            },
            {
              name: 'AccountID',
              operator: sap.ui.model.FilterOperator.EQ,
              value: encodeURIComponent(this.getAccountId())
            }
            ]);



    },
    _loadUserPrivileges:function(oDelegate,oSelectedUser){

      var fnSuccess = jQuery.proxy(function(oData, oResponse) {
        if (oData.results) {
          this.oUserPrivileges.setSizeLimit(oData.results && oData.results.length);
          this.oUserPrivileges.setData(oData);

          if (oDelegate) {
            this._onUserPrivilegesLoaded(oDelegate);

          }
        }
      }, this);

      var fnError = jQuery.proxy(function(oResponse) {

        this.oUserPrivileges.setData([]);
          if (oDelegate) {
      //  var errMsg  = JSON.parse(oResponse.response.body).error.message.value;
      //  oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,errMsg );
          oDelegate.onUserPrivilegesLoaded(this.oUserPrivileges);
                            }

      }, this);

        /*this.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, this.getText("FORMS.ERROR_CHECK_SUCCESS"));
          */ 
        //batch-RAL
              /* 
                this.SERVICE.read(sFormsPath, ["$filter=UserGroupID eq '"+oSelectedUser.UserGroupID+"'","$format=json"], true, {
                    fnSuccess: fnSuccess,
                    fnError:fnError
          
                });*/
       var sFormsPath = "UserPrivileges";
                this.SERVICE.read(sFormsPath, ["$format=json"], true, {
                  fnSuccess: fnSuccess,
                    fnError:fnError
            }, [], [{
              name: 'UserGroupID',
              operator: sap.ui.model.FilterOperator.EQ,
              value: encodeURIComponent(oSelectedUser.UserGroupID)
            },

            ]);



    },

    _dateValidation:function(fromDate, toDate){

        if(fromDate<=toDate)
        return true;
        else 
        return false;
      },
    _createUserRolesPayload:function(oDelegate,oSelectedUser){

      var oUserPrivilegesTable = oDelegate.getView().byId("idUserPrivilegesTable");

    if(oUserPrivilegesTable.getSelectedItems().length == 0){return {};}

      var aPrvlgItem = [];
      for(var i=0;i<oUserPrivilegesTable.getSelectedItems().length;i++){
        var obj = {};
        var oModel = oUserPrivilegesTable.getSelectedItems()[i].oBindingContexts.UserPrivileges.getModel();
        var sPath = oUserPrivilegesTable.getSelectedItems()[i].oBindingContexts.UserPrivileges.sPath;
        var oUserPrvlg = oModel.getObject(sPath);
        obj={
            AccountID : this.getAccountId(),
            
             AliasID : oSelectedUser.AliasID,
             PrivilegeID  : oUserPrvlg.UserPrivilegeID
        };

        if(oUserPrvlg.ValidFrom && oUserPrvlg.ValidTo){
           
          if(this._dateValidation(oUserPrvlg.ValidFrom, oUserPrvlg.ValidTo)){
              //p
      /*    obj.ValidFrom = oUserPrvlg.ValidFrom.toISOString().split(".")[0]; 
              
              obj.ValidTo = oUserPrvlg.ValidTo.toISOString().split(".")[0];*/
         
            obj.ValidFrom = this.formatDate(oUserPrvlg.ValidFrom); 
                
                obj.ValidTo = this.formatDate(oUserPrvlg.ValidTo);
              }
          else{
            sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, 
                  sap.ui.getCore().getModel("i18n").getProperty("USER_PROFILE.DATE_VALIDATION_ERROR"));
            //oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,this.getText("USER_PROFILE.DATE_VALIDATION_ERROR"));
          return {};}

        }
        if(!oUserPrvlg.ValidFrom){
          sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, 
                sap.ui.getCore().getModel("i18n").getProperty("USER.VALID_FROM_DATE_VALIDATION_ERROR"));
          //oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,this.getText("USER.VALID_FROM_DATE_VALIDATION_ERROR")/*"Valid From Date not provided"*/ );
        return {};
        }

        if(!oUserPrvlg.ValidTo){
          sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, 
                sap.ui.getCore().getModel("i18n").getProperty("USER.VALID_TO_DATE_VALIDATION_ERROR"));
          //oDelegate.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR,this.getText("USER.VALID_TO_DATE_VALIDATION_ERROR")/*"Valid To Date not provided"*/ );
        return {};
        }
        aPrvlgItem.push(obj);

      }
      var oRoleCreation = jQuery.extend(true, {}, oDelegate.oSelectedUser);
      delete oRoleCreation["UserGroup"];
      oRoleCreation.UserAssignedPrivileges={};
      oRoleCreation.UserAssignedPrivileges =  aPrvlgItem;
      if(oRoleCreation.ValidFrom)
        oRoleCreation.ValidFrom = this.formatDate(oRoleCreation.ValidFrom); 
          //p
        //oRoleCreation.ValidFrom = oRoleCreation.ValidFrom.toISOString().split(".")[0];
      if(oRoleCreation.ValidTo)
        oRoleCreation.ValidTo = this.formatDate(oRoleCreation.ValidTo);
      //p
        //oRoleCreation.ValidTo = oRoleCreation.ValidTo.toISOString().split(".")[0];
      return oRoleCreation;






    },
    //c5221606
    _createUserRoles:function(oDelegate,oSelectedUser){

      var oRoleCreation = this._createUserRolesPayload(oDelegate,oSelectedUser);
      /*if(oDelegate.bUserDetailsChanged){
        var oUserUpdate = this._updateUserPayload(oDelegate,oSelectedUser);
      }*/
      var oThis = this;
      if(!(jQuery.isEmptyObject(oRoleCreation))&&oDelegate.bUserDetailsChanged){

        var oDeferredCreateRoleSuccess = jQuery.Deferred();
        var oDeferredUserUpdateSuccess = jQuery.Deferred();
        jQuery.when(oDeferredCreateRoleSuccess,oDeferredUserUpdateSuccess).then(jQuery.proxy(function(){
          sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, 
              sap.ui.getCore().getModel("i18n").getProperty("USER.ROLES_DETAILS_UPDATE_SUCCESS")
                /*"User Details and Roles have been updated sucessfully"*/);
          oDelegate.onUserUpdateSuccess();


        }, this), jQuery.proxy(function(){



          jQuery.when(oDeferredCreateRoleSuccess).then(jQuery.proxy(function(){
            sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, 
                sap.ui.getCore().getModel("i18n").getProperty("USER.ROLES_UPDATE_SUCCESS_USER_FAILED")
                  /*"User Roles have been updated sucessfully"*/);
            oDelegate.onUserUpdateSuccess();


          }, this));
      //
          jQuery.when(oDeferredUserUpdateSuccess).then(jQuery.proxy(function(){
            sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, 
                sap.ui.getCore().getModel("i18n").getProperty("USER.USER_DETAILS_UPDATE_SUCCESS_ROLES_FAILED")
                  /*"User Details have been updated sucessfully"*/);
            oDelegate.onUserUpdateSuccess();


          }, this));

          //

        }, this));
        var fnSuccess = jQuery.proxy(function(oData, oResponse) {
          //oDelegate.onCreateUserRolesSuccess(oData);
          oDeferredCreateRoleSuccess.resolve();
          var fnSuccessUserUpdate = jQuery.proxy(function(oData, oResponse) {
            oDeferredUserUpdateSuccess.resolve();

          }, oDelegate);
            var fnErrorUserUpdate = jQuery.proxy(function(oData, oResponse) {
              //oDelegate.onCancelUserAssignedPrivilegesPress(oData);
              oDeferredUserUpdateSuccess.reject();

            }, oDelegate);
             var sFormsPath ="Users";
                  oThis.SERVICE.updateEntity(sFormsPath,["'"+oDelegate.oSelectedUser.AliasID+"'"], oThis._updateUserPayload(oDelegate,oSelectedUser),{
                     fnSuccess: fnSuccessUserUpdate,
                        fnError:fnErrorUserUpdate
                  },oDelegate);


        }, oDelegate);
        var fnError = jQuery.proxy(function(oData, oResponse) {
          //oDelegate.onCancelUserAssignedPrivilegesPress(oData);
          oDeferredCreateRoleSuccess.reject();



          //oDelegate.onCreateUserRolesSuccess(oData);
          oDeferredCreateRoleSuccess.resolve();
          var fnSuccessUserUpdate = jQuery.proxy(function(oData, oResponse) {
            oDeferredUserUpdateSuccess.resolve();

          }, oDelegate);
            var fnErrorUserUpdate = jQuery.proxy(function(oData, oResponse) {
              //oDelegate.onCancelUserAssignedPrivilegesPress(oData);
              oDeferredUserUpdateSuccess.reject();

            }, oDelegate);
             var sFormsPath ="Users";
                  oThis.SERVICE.updateEntity(sFormsPath,["'"+oDelegate.oSelectedUser.AliasID+"'"], oThis._updateUserPayload(oDelegate,oSelectedUser),{
                     fnSuccess: fnSuccessUserUpdate,
                        fnError:fnErrorUserUpdate
                  },oDelegate);




        }, oDelegate);
        this.ERP.createEntity(this.getAccountPath() + "Users", oRoleCreation, {
          fnSuccess: fnSuccess,
          fnError: fnError

        });
      }

      /*var oUser = {};
      oUser=jQuery.extend( {}, oDelegate.getView().getModel("user").getData());
        ;

      var sValidFrom =oUser.ValidFrom.toISOString();
      var sValidFromSplitted = sValidFrom.split(".");
      var sValidFromSplittedFirst =sValidFromSplitted[0];
      var sValidTo =oUser.ValidTo.toISOString();
      var sValidToSplitted = sValidTo.split(".");
      var sValidToSplittedFirst =sValidToSplitted[0];
      oUser.ValidFrom = sValidFromSplittedFirst;
      oUser.ValidTo = sValidToSplittedFirst;*/
      else if(!(jQuery.isEmptyObject(oRoleCreation))){
        var fnSuccess = jQuery.proxy(function(oData, oResponse) {
          oDelegate.onCreateUserRolesSuccess(oData);

        }, oDelegate);
        var fnError = jQuery.proxy(function(oData, oResponse) {
          oDelegate.onCancelUserAssignedPrivilegesPress(oData);

        }, oDelegate);
        this.ERP.createEntity(this.getAccountPath() + "Users", oRoleCreation, {
          fnSuccess: fnSuccess,
           fnError:fnError
        });
      }
      else if(oDelegate.bUserDetailsChanged){
        var fnSuccessUserUpdate = jQuery.proxy(function(oData, oResponse) {
          sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, 
              sap.ui.getCore().getModel("i18n").getProperty("USER.USER_DETAILS_UPDATE_SUCCESS")
                /*"User Details have been updated sucessfully"*/);
        oDelegate.onUserUpdateSuccess(oData);

      }, oDelegate);
        var fnErrorUserUpdate = jQuery.proxy(function(oData, oResponse) {
          oDelegate.onCancelUserAssignedPrivilegesPress(oData);
          //oDelegate.onUserUpdateSuccess(oData);

        }, oDelegate);
         var sFormsPath ="Users";
              this.SERVICE.updateEntity(sFormsPath,["'"+oDelegate.oSelectedUser.AliasID+"'"], oThis._updateUserPayload(oDelegate,oSelectedUser),{
                  fnSuccess: fnSuccessUserUpdate,
                  fnError:fnErrorUserUpdate
                 
              },oDelegate);
              }


      /*var fnError = jQuery.proxy(function(oData,oResponse){
        if (oDelegate) {

          oDelegate._setDefaultValues();

        }

      },this);*/


    },
    _updateUserPayload:function(oDelegate,oSelectedUser){
      var oUpdatesUserPayload = {};

      oUpdatesUserPayload.AccountID = oDelegate.getView().getModel("user").oData.AccountID;
      oUpdatesUserPayload.FirstName= oDelegate.getView().getModel("user").oData.FirstName;
      oUpdatesUserPayload.LastName= oDelegate.getView().getModel("user").oData.LastName;
      if(oDelegate.getView().getModel("user").oData.ValidFrom)
      oUpdatesUserPayload.ValidFrom= this.formatDate(oDelegate.getView().getModel("user").oData.ValidFrom);
      else 
        oUpdatesUserPayload.ValidFrom= null;

      if(oDelegate.getView().getModel("user").oData.ValidTo)
      oUpdatesUserPayload.ValidTo= this.formatDate(oDelegate.getView().getModel("user").oData.ValidTo);
      else
        oUpdatesUserPayload.ValidTo= null;
      oUpdatesUserPayload.Email= oDelegate.getView().getModel("user").oData.Email;
      oUpdatesUserPayload.AliasID= oDelegate.getView().getModel("user").oData.AliasID;
      oUpdatesUserPayload.UserGroupID = oDelegate.getView().getModel("user").oData.UserGroupID;
      return oUpdatesUserPayload;
    },
    formatDate:function(sDate){

    //var sDate= sap.umc.mobile.users.js.utils.formatUsersDate(sDate);

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
         return  sDate;
       }
    },

};