var clicks=0;
var count=0;
var count1=0;
var num=0;
var div=0;
var limit = 500;
var label="";

jQuery.sap.declare("sap.umc.mobile.forms.view.forms.UET.fragments.UNEMPLOYMENT_TAXController");
sap.umc.mobile.forms.view.forms["UET"].fragments["UNEMPLOYMENT_TAXController"] = {


    setView: function(oView) {
        this._oView = oView;
        this.setDefaultValues();
    },
    getView: function() {
        return this._oView;
    },
    getDataProvider: function() {
        return sap.umc.mobile.forms.model.DataProvider;
    },
    setDefaultValues: function() {
        this.FormID = "UNEMPLOYMENT_TAX";
        this.clicks = 0;
        this.count = 0;
        this.count1 = 0;
        this.num = 0;
        this.div = 0;
       // var limit = 1000;

        this.TableRowsLimit = 1000000000;
        this["o" + this.FormID] = {
            "TAX_NUMBER": "",
            "FIRST_NAME": "",
            "MAIN_NAME": "",
            "TOTAL_WAGES": "",
            "TAXABLE_WAGES": "",
        };

    },
    setbEdited: function(bFlag) {
        var sTableId = this.FormID;
        var sFormNo = "1";
        this.getView().getController().oAllFormsData[sTableId][sFormNo]["bEdited"] = bFlag;

    },

    rerenderTable: function(table) {
        table.rerender();
    },
    getTable: function() {
        var sTableId = "_" + this.FormID + "_table";
        var table = sap.ui.getCore().byId(sTableId);
        return table;
    },
    setDefaultTableState: function() {
        var table = this.getTable();
        var sTableId = this.FormID;
        var sId = "_" + sTableId + "_EditToggleBtn";
        var oToglButn = sap.ui.getCore().byId(sId);
        clicks=0;
        count=0;
        count1=0;
        num=0;
        div=0;
        sap.ui.getCore().byId("back").setEnabled(false);
        sap.ui.getCore().byId("forward").setEnabled(false);
        sap.ui.getCore().byId("first").setEnabled(false);
        sap.ui.getCore().byId("last").setEnabled(false);
        var selectedItems;
        oToglButn.setPressed(false);
        oToglButn.setEnabled(false);
        table.removeSelections();
      var table1 = this.getTable();
        var items1 = table1.getItems();
        if (oToglButn.getPressed()) {
            selectedItems = table.getSelectedItems();
        } else {
            selectedItems = table.getItems();
        }
        $.each(selectedItems, function(i, e) {
            var cells = e.getCells();
            $.each(cells, function(index, input) {
                input.setEditable(oToglButn.getPressed());
                input.attachChange(function(event) {
                    event.preventDefault();
                });
            });
        });

        var sTableModel = sTableId + "Model";
        var m = this.getView().getModel(sTableModel);
        label = m.oData.length;
        sap.ui.getCore().byId("Label1").setText(label);
        if (m.oData.length > limit )

        {

     	    sap.ui.getCore().byId("forward").setEnabled(true);
     	    sap.ui.getCore().byId("first").setEnabled(true);
     	    sap.ui.getCore().byId("last").setEnabled(true);
            var tabledata1 = [];
            var tabledata2 = [];
            var temporary1 = [];
            var temp1 = [];


          for (var f=0;f<m.oData.length;f++)
        {
            temporary1[f] = m.oData[f];
        }

            for (var f=0;f<m.oData.length;f++)
              {
              tabledata1[f] = m.oData[f];
              }

            for (var f=0;f<tabledata1.length;f++)
          {
              tabledata2[f] = tabledata1[f];
          }

            for (var g=0;g<limit;g++)
          {
              temp1[g] = tabledata2[g];
          }



            $.each(tabledata1, function(i, e) {
              m.oData.pop(e);
            });

               $.each(temp1, function(i, e) {
                   m.oData.push(e);
               });


               m.refresh();
               this.rerenderTable(table);


               $.each(temp1, function(i, e) {
                   m.oData.pop(e);
               });


               $.each(temporary1, function(i, e) {
                   m.oData.push(e);
                });


          }

    },
    setTableFormButtonsEnabled: function(oStatusId) {
        var bEnabled = ((oStatusId &&
            (oStatusId.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
        ) ? false : true);
        var obj = {};
        obj.enabled = bEnabled;
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(obj);
        var sKey = this.FormID;
        this.getView().setModel(oModel, "TableFormButtonsEnabled");
        sap.ui.getCore().byId("_" + sKey + "_EditToggleBtn").setEnabled(false);
    },
    setTableFormMode: function(oStatusId) {
        var sMode = ((oStatusId &&
            (oStatusId.toLowerCase() === sap.umc.mobile.private.app.Constants.FORM_STATUS.SUBMIT.toLowerCase())
        ) ? "None" : "MultiSelect");
        var sTableFormId = "_" + this.FormID + "_table";
        sap.ui.getCore().byId(sTableFormId).setMode(sMode);
    },
    handleUploadPress: function(oEvent) {
        var oThis = this;
        if (!oThis.fileUploader) {
            oThis.fileUploader = new sap.ui.unified.FileUploader("fileUploader", {
                width: "400px",
                tooltip: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.SELECT_FILE"),
                typeMissmatch: function(oEvent) {
                    oThis.handleTypeMissmatch(oEvent);
                },
                fileType: "csv"
            });
        }
        if (!this.uploadDialog) {
            this.uploadBtn = new sap.m.Button({
                icon: "sap-icon://upload",
                text: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.UPLOAD"),
                press: function() {
                    if (oThis.fileUploader.getValue()) {
                        oThis.uploadChange();
                        if (oThis.uploadDialog.isOpen())
                            oThis.uploadDialog.close();
                    }
                }
            });
            this.dialogCloseBtn = new sap.m.Button({
                text: sap.umc.mobile.private.app.js.utils.getText("FILING_OBLIGATIONS.CANCEL"),
                press: function(evt) {
                    if (oThis.uploadDialog && oThis.uploadDialog.isOpen()) {
                        oThis.uploadDialog.close();
                    }
                }
            });
            this.uploadDialog = new sap.m.Dialog({
                title: sap.umc.mobile.private.app.js.utils.getText("DOCUMENTS.SELECT_FILE"),
                content: [this.fileUploader],
                buttons: [this.uploadBtn, this.dialogCloseBtn]
            });
        }
        this.uploadDialog.open();
    },
    handleTypeMissmatch: function(oEvent) {
        var aFileTypes = oEvent.getSource().getFileType();
        $.each(aFileTypes, function(key, value) {
            aFileTypes[key] = "*." + value;
        });
        var sSupportedFileTypes = aFileTypes.join(", ");
        sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_SUCCESS, sap.umc.mobile.private.app.js.utils.getFormattedText("FORMS.FILE_NOT_SUPPORTED", [oEvent.getParameter("fileType"),
sSupportedFileTypes]));
    },
    uploadChange: function(evt) {

      var templength = 0;
        var oThis = this;
        var file = jQuery.sap.domById("fileUploader-fu").files[0];
        if (file) {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {

                        var json = oThis.csvJSON(e.target.result);
                        var sTableId = oThis.FormID;
                        var table = oThis.getTable();
                        var length = table.getItems().length;

                        var tempz = length + json.length;
                        label = tempz;
                        sap.ui.getCore().byId("Label1").setText(label);


                          if (length < limit)
                            {


                          if(json.length + length > limit)
                            {


                         	    sap.ui.getCore().byId("first").setEnabled(true);
                         	    sap.ui.getCore().byId("last").setEnabled(true);
                              sap.ui.getCore().byId("forward").setEnabled(true);
                            templength = limit - length;

                            var indx= [];
                              for (var i=0;i<templength;i++)
                                {
                                  indx[i]=json[i];

                                }
                               var sTableModel = sTableId + "Model";
                                     var m = oThis.getView().getModel(sTableModel);

                                     $.each(indx, function(i, e) {
                                         m.oData.push(e);

                                     });


                                     m.refresh();
                                     oThis.rerenderTable(table);


                                     $.each(indx, function(i, e) {
                                         m.oData.pop(e);
                                     });


                                     $.each(json, function(i, e) {
                                         m.oData.push(e);
                                     });

                            }

                          else {


                            var sTableModel = sTableId + "Model";
                            var m = oThis.getView().getModel(sTableModel);
                            $.each(json, function(i, e) {
                                m.oData.push(e);
                            });
                            m.refresh();
                            oThis.rerenderTable(table);
                            }

                            }

                          else if ( length = limit )

                            {

                            sap.ui.getCore().byId("first").setEnabled(true);
                         	    sap.ui.getCore().byId("last").setEnabled(true);
                              sap.ui.getCore().byId("forward").setEnabled(true);


                            var sTableModel = sTableId + "Model";
                                 var m = oThis.getView().getModel(sTableModel);
                                 $.each(json, function(i, e) {
                                     m.oData.push(e);
                                 });


                            }

                          else
                            {

                              var sTableModel = sTableId + "Model";
                                  var m = oThis.getView().getModel(sTableModel);
                                  $.each(json, function(i, e) {
                                      m.oData.push(e);
                                  });

                            }

                    };
                })(file);
                reader.readAsText(file);
            } else {
                sap.umc.mobile.private.app.js.utils.displayMessageDialog(sap.umc.mobile.private.app.Constants.MESSAGE_ERROR, sap.umc.mobile.private.app.Constants.MESSAGE_ERROR);
            }
        }
        this.setbEdited(true);

    },


    onPressBack: function()

    {

     	var oThis = this;
      var sTableId = oThis.FormID;
        var sTableModel = sTableId + "Model";
      var m = oThis.getView().getModel(sTableModel)
      var table = oThis.getTable();
      var tabledata = [];

    //Addition latest
      count = m.oData.length;
      count1 = count - limit;
    //End addition

      for(var g=0;g<m.oData.length;g++)
        {
        tabledata[g] = m.oData[g];
        }


      var tempdata = [];

      for (var r=0;r<tabledata.length;r++)
        {
        tempdata[r] = tabledata[r];
        }


         	clicks -= 1;
      if(clicks <= 0)
      {
        num = 0;
      }
      else{
       num = clicks * limit;
      }


      if(num < count1)
      {

          sap.ui.getCore().byId("forward").setEnabled(true);
      }
      if(num === 0)
      {
        sap.ui.getCore().byId("back").setEnabled(false);

      }


        var temp = [];
        var temporary = [];
        var i=0;
        for (var j=num;j<num+limit;j++)

          {

          temp[i] = tabledata[j];
          i = i+1;
          }


        var z = 0;
        for (j=0;j<count;j++)

        {
        temporary[j] = tabledata[z];
        z = z + 1;

        }

        $.each(tabledata, function(i, e) {
          m.oData.pop(e);
        });

           $.each(temp, function(i, e) {
               m.oData.push(e);
           });


           m.refresh();
           oThis.rerenderTable(table);


           $.each(temp, function(i, e) {
               m.oData.pop(e);
           });


           $.each(temporary, function(i, e) {
               m.oData.push(e);
            });

    },

    onPressForward: function()

    {

     	var oThis = this;
      var sTableId = oThis.FormID;
        var sTableModel = sTableId + "Model";
      var m = oThis.getView().getModel(sTableModel);
      var table = oThis.getTable();
      var tabledata = [];

      for(var g=0;g<m.oData.length;g++)
    {
    tabledata[g] = m.oData[g];
    }

      var tempdata = [];

      for (var r=0;r<tabledata.length;r++)
    {
    tempdata[r] = tabledata[r];
    }

      count = m.oData.length;
      count1 = count - limit;
      var div1 = 0;
      div1 = count/limit;
      div = Math.floor(div1);

    if(clicks < 0)
    {
     clicks = 0;
     clicks += 1;
    }
    else{
       clicks += 1;
    }

    num = clicks * limit;

      if((count1 - num) <= 0)
      {
        sap.ui.getCore().byId("forward").setEnabled(false);
      }
      if(num >= limit)
      {
        sap.ui.getCore().byId("back").setEnabled(true);
      }

      var temp = [];
      var temporary = [];
      var i=0;

      if(div!= clicks)
      {
      for (j=num;j<num+limit;j++)

        {

        temp[i] = tempdata[j];
        i = i+1;
        }
      }

      else
      {
        for (j=num;j<m.oData.length;j++)

        {

        temp[i] = tempdata[j];
        i = i+1;
        }

      }

    var z = 0;
      for (j=0;j<count;j++)

        {
        temporary[j] = tabledata[z];
        z = z + 1;

        }

     	$.each(tabledata, function(i, e) {
        m.oData.pop(e);
     	});

         $.each(temp, function(i, e) {
             m.oData.push(e);
         });


         m.refresh();
         oThis.rerenderTable(table);


         $.each(temp, function(i, e) {
             m.oData.pop(e);
         });


         $.each(temporary, function(i, e) {
             m.oData.push(e);
         });

    },


    onPressFirst: function()
    {

      clicks = 0;
      sap.ui.getCore().byId("forward").setEnabled(true);
      sap.ui.getCore().byId("back").setEnabled(false);
     	var oThis = this;
      var sTableId = oThis.FormID;
        var sTableModel = sTableId + "Model";
      var m = oThis.getView().getModel(sTableModel);
      var table = oThis.getTable();
      var tabledata = [];
      var tempdata = [];
      var temp = [];
      var temporary = [];

      for (var w=0;w<m.oData.length;w++)
        {
          tabledata[w] = m.oData[w];
        }

      for (var z=0;z<m.oData.length;z++)
      {
        temporary[z] = m.oData[z];
      }

      for (var j=0;j<tabledata.length;j++)
        {
          tempdata[j] = tabledata[j];
        }

      for (var k=0;k<limit;k++)
        {
          temp[k] = tempdata[k];
        }


     	$.each(tabledata, function(i, e) {
        m.oData.pop(e);
     	});

         $.each(temp, function(i, e) {
             m.oData.push(e);
         });


         m.refresh();
         oThis.rerenderTable(table);


         $.each(temp, function(i, e) {
             m.oData.pop(e);
         });


         $.each(temporary, function(i, e) {
             m.oData.push(e);
         });

    },

    onPressLast: function()
    {


      sap.ui.getCore().byId("forward").setEnabled(false);
      sap.ui.getCore().byId("back").setEnabled(true);
     	var oThis = this;
      var sTableId = oThis.FormID;
        var sTableModel = sTableId + "Model";
      var m = oThis.getView().getModel(sTableModel);
      var table = oThis.getTable();
      var tabledata = [];
      var tempdata = [];
      var temp = [];
      var temporary = [];

      var div1 = 0;
      var div2 = 0;
      count = m.oData.length;
      var div5 = 0;
      div5 = count % limit;

      if (div5 == 0)
        {

          div1 = count/limit;
          clicks = div1 - 1;

        }

      else
        {
          div1 = count/limit;
          div2 = Math.floor(div1);
          clicks = div2;

        }


      for (var w=0;w<m.oData.length;w++)
        {
          tabledata[w] = m.oData[w];
        }

      for (var z=0;z<m.oData.length;z++)
      {
        temporary[z] = m.oData[z];
      }

      for (var j=0;j<tabledata.length;j++)
        {
          tempdata[j] = tabledata[j];
        }

       var p=0;

       var templength = 0;
       templength = m.oData.length % limit;

       if(templength === 0)
         {

      for (var k=m.oData.length-limit;k<m.oData.length;k++)
        {
          temp[p] = tempdata[k];
          p = p + 1;
        }

         }

       else
         {

            for (var k=m.oData.length-templength;k<m.oData.length;k++)
            {
              temp[p] = tempdata[k];
              p = p + 1;
            }

         }


     	$.each(tabledata, function(i, e) {
        m.oData.pop(e);
     	});

         $.each(temp, function(i, e) {
             m.oData.push(e);
         });


         m.refresh();
         oThis.rerenderTable(table);


         $.each(temp, function(i, e) {
             m.oData.pop(e);
         });


         $.each(temporary, function(i, e) {
             m.oData.push(e);
         });

    },


    csvJSON: function(csv) {
        var i;
        var j;
        var input = csv.replace(/\"\"/g, encodeURIComponent('"'));
        var quotesAndValues = input.split(/\"/g);
        var escapedInput;
        var quotesAndValuesLength = quotesAndValues.length;
        for (i = 1; i < quotesAndValuesLength; i = i + 2) {
            quotesAndValues[i] = encodeURIComponent(quotesAndValues[i]);
        }
        escapedInput = quotesAndValues.join("");
        var lines = escapedInput.split(/\r\n|\n/g);
        var result = [];
        var headers = lines[0].split(/,/g);
        var headersLength = headers.length;
        for (i = 0; i < headersLength; i++) {
            headers[i] = headers[i].replace(/\W/g, '_');
        }
        for (i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(/,/g);
            var headersLength = headers.length;
            for (j = 0; j < headersLength; j++) {
                obj[headers[j]] = decodeURIComponent(decodeURIComponent(currentline[j]));
                if (obj[headers[j]] === "undefined") {
                    obj[headers[j]] = "";
                }
            }
            result.push(obj);
        }
        var resultLength = result.length;
        for (var k = 1; k <= resultLength; k++) {
            var lastObj = $(result).get(-1);
            var bFlag = true;
            for (var sProp in lastObj) {
                if (!lastObj.hasOwnProperty(sProp)) {
                    continue;
                }
                if (typeof lastObj[sProp] === "function") {
                    continue;
                }
                if (lastObj[sProp] === "") {
                    continue;
                } else {
                    bFlag = false;
                    break;
                }
            }
            if (bFlag) {
                result.pop();
            } else {
                break;
            }
        }
        return result;
    },

    addRowPress: function() {
        var table = this.getTable();
        var length = table.getItems().length;
        var sTableId = this.FormID;
        var indx = [];
        var selectedItems = table.getSelectedItems();
        $.each(selectedItems, function(i, e) {
            indx.push(table.indexOfItem(e));
        });



            var sTableModel = sTableId + "Model";
            var oModel = this.getView().getModel(sTableModel);
            var tempr1 = oModel.oData.length;
            var tempr2 = tempr1 + 1;

            label = tempr2;
            sap.ui.getCore().byId("Label1").setText(label);

            if (clicks == 0)

          {


            if (tempr1 < limit)
              {

                oModel.oData.unshift(jQuery.extend({}, this["o" + sTableId]));
                oModel.refresh();
              }

             if (tempr1 == limit)

              {

              sap.ui.getCore().byId("forward").setEnabled(true);
         	    sap.ui.getCore().byId("first").setEnabled(true);
         	    sap.ui.getCore().byId("last").setEnabled(true);

                oModel.oData.unshift(jQuery.extend({}, this["o" + sTableId]));

                var tabledata1 = [];
                var tabledata2 = [];
                var temporary1 = [];
                var temp1 = [];


              for (var f=0;f<oModel.oData.length;f++)
            {
                temporary1[f] = oModel.oData[f];
            }

                for (var f=0;f<oModel.oData.length;f++)
                  {
                  tabledata1[f] = oModel.oData[f];
                  }

                for (var f=0;f<tabledata1.length;f++)
              {
                  tabledata2[f] = tabledata1[f];
              }

                for (var g=0;g<limit;g++)
              {
                  temp1[g] = tabledata2[g];
              }



                $.each(tabledata1, function(i, e) {
                  oModel.oData.pop(e);
                });

                   $.each(temp1, function(i, e) {
                     oModel.oData.push(e);
                   });


                   oModel.refresh();
                   this.rerenderTable(table);


                   $.each(temp1, function(i, e) {
                     oModel.oData.pop(e);
                   });


                   $.each(temporary1, function(i, e) {
                     oModel.oData.push(e);
                    });


              }

             if (tempr1 > limit && clicks == 0)

               {

               oModel.oData.unshift(jQuery.extend({}, this["o" + sTableId]));


                 var tabledata1 = [];
                 var tabledata2 = [];
                 var temporary1 = [];
                 var temp1 = [];


              for (var f=0;f<oModel.oData.length;f++)
            {
                temporary1[f] = oModel.oData[f];
            }

                for (var f=0;f<oModel.oData.length;f++)
                  {
                  tabledata1[f] = oModel.oData[f];
                  }

                for (var f=0;f<tabledata1.length;f++)
              {
                  tabledata2[f] = tabledata1[f];
              }

                for (var g=0;g<limit;g++)
              {
                  temp1[g] = tabledata2[g];
              }



                $.each(tabledata1, function(i, e) {
                  oModel.oData.pop(e);
                });

         	         $.each(temp1, function(i, e) {
                     oModel.oData.push(e);
         	         });


         	         oModel.refresh();
         	         this.rerenderTable(table);


         	         $.each(temp1, function(i, e) {
                     oModel.oData.pop(e);
         	         });


         	         $.each(temporary1, function(i, e) {
                     oModel.oData.push(e);
         	         	});


               }


    }

            else {

              var temp3 = tempr1 - 1;
              var temp4 = temp3/limit;
              var temp5 = Math.floor(temp4);
          var temp6 = limit * clicks;
          var temp7 = tempr1 - temp6;



            if (temp5 == clicks)
              {

                if (temp7 == limit)

                  {

                    sap.ui.getCore().byId("forward").setEnabled(true);
                        sap.ui.getCore().byId("first").setEnabled(true);
                        sap.ui.getCore().byId("last").setEnabled(true);

                          var obj = jQuery.extend({}, this["o" + sTableId]);
                          oModel.oData.splice(temp6,0,obj);

                          var tabledata1 = [];
                          var tabledata2 = [];
                          var temporary1 = [];
                          var temp1 = [];


                        for (var f=0;f<oModel.oData.length;f++)
                      {
                          temporary1[f] = oModel.oData[f];
                      }

                          for (var f=0;f<oModel.oData.length;f++)
                            {
                            tabledata1[f] = oModel.oData[f];
                            }

                          for (var f=0;f<tabledata1.length;f++)
                        {
                            tabledata2[f] = tabledata1[f];
                        }

                          var x=0;
                          for (var g=temp6;g<temp6+limit;g++)
                        {
                            temp1[x] = tabledata2[g];
                            x = x + 1;
                        }


                          $.each(tabledata1, function(i, e) {
                            oModel.oData.pop(e);
                          });

                             $.each(temp1, function(i, e) {
                               oModel.oData.push(e);
                             });


                             oModel.refresh();
                             this.rerenderTable(table);


                             $.each(temp1, function(i, e) {
                               oModel.oData.pop(e);
                             });


                             $.each(temporary1, function(i, e) {
                               oModel.oData.push(e);
                              });

                    }

                if (temp7 < limit)

                  {

                          var obj = jQuery.extend({}, this["o" + sTableId]);
                          oModel.oData.splice(temp6,0,obj);

                          var tabledata1 = [];
                          var tabledata2 = [];
                          var temporary1 = [];
                          var temp1 = [];


                        for (var f=0;f<oModel.oData.length;f++)
                      {
                          temporary1[f] = oModel.oData[f];
                      }

                          for (var f=0;f<oModel.oData.length;f++)
                            {
                            tabledata1[f] = oModel.oData[f];
                            }

                          for (var f=0;f<tabledata1.length;f++)
                        {
                            tabledata2[f] = tabledata1[f];
                        }

                          var x=0;
                          for (var g=temp6;g<oModel.oData.length;g++)
                        {
                            temp1[x] = tabledata2[g];
                            x = x + 1;
                        }

                          $.each(tabledata1, function(i, e) {
                            oModel.oData.pop(e);
                          });

                             $.each(temp1, function(i, e) {
                               oModel.oData.push(e);
                             });


                             oModel.refresh();
                             this.rerenderTable(table);


                             $.each(temp1, function(i, e) {
                               oModel.oData.pop(e);
                             });


                             $.each(temporary1, function(i, e) {
                               oModel.oData.push(e);
                              });
                  }
              }

            if (temp5 > clicks)

              {

                      var obj = jQuery.extend({}, this["o" + sTableId]);
                      oModel.oData.splice(temp6,0,obj);

                      var tabledata1 = [];
                      var tabledata2 = [];
                      var temporary1 = [];
                      var temp1 = [];


                    for (var f=0;f<oModel.oData.length;f++)
                  {
                      temporary1[f] = oModel.oData[f];
                  }

                      for (var f=0;f<oModel.oData.length;f++)
                        {
                        tabledata1[f] = oModel.oData[f];
                        }

                      for (var f=0;f<tabledata1.length;f++)
                    {
                        tabledata2[f] = tabledata1[f];
                    }

                      var x=0;
                      for (var g=temp6;g<temp6+limit;g++)
                    {
                        temp1[x] = tabledata2[g];
                        x = x + 1;
                    }

                      $.each(tabledata1, function(i, e) {
                        oModel.oData.pop(e);
                      });

                         $.each(temp1, function(i, e) {
                           oModel.oData.push(e);
                         });


                         oModel.refresh();
                         this.rerenderTable(table);


                         $.each(temp1, function(i, e) {
                           oModel.oData.pop(e);
                         });


                         $.each(temporary1, function(i, e) {
                           oModel.oData.push(e);
                          });


              }
            }

            table.removeSelections(true);
            var oItems = table.getItems();
            var firstItem = table.getItems()[0];
            firstItem.setSelected(true);
            for (var i = 0; i < indx.length; i++) {
                table.setSelectedItem(oItems[indx[i] + 1]);
            }
            var oToglButn = sap.ui.getCore().byId("_" + sTableId + "_EditToggleBtn");
            oToglButn.setEnabled(true);
            oToglButn.setPressed(true);
            var finalSelectedItems = table.getSelectedItems();
            $.each(finalSelectedItems, function(ind, oItem) {
                var aCells = oItem.getCells();
                $.each(aCells, function(index, input) {
                    input.setEditable(true);
                    input.attachChange(function(event) {
                        event.preventDefault();
                    });
                });
            });

        this.setbEdited(true);
    },
    editRowsPress: function(evt) {
        sap.umc.mobile.base.utils.busydialog.requireBusyDialog({});
        var table = this.getTable();
        var oSrc = evt.getSource();
        var selectedItems;
        if (oSrc.getPressed()) {
            selectedItems = table.getSelectedItems();
        } else {
            selectedItems = table.getItems();
        }
        $.each(selectedItems, function(ind, oItem) {
            var aCells = oItem.getCells();
            $.each(aCells, function(index, input) {
                input.setEditable(oSrc.getPressed());
                input.attachChange(function(event) {
                    event.preventDefault();
                });
            });
        });
        sap.umc.mobile.base.utils.busydialog.releaseBusyDialog();
        this.setbEdited(true);
    },
    onTableItemSelect: function(evt) {
        var table = evt.getSource();
        var selectedItems = table.getSelectedItems();
        var sTableId = this.FormID;
        var oToglButn = sap.ui.getCore().byId("_" + sTableId + "_EditToggleBtn");
        if (selectedItems.length) {
            oToglButn.setEnabled(true);
        } else {
            oToglButn.setEnabled(false);
            oToglButn.setPressed(false);
        }
        var oItems;
        oItems = table.getItems();
        if (oToglButn.getPressed()) {
            for (var i = 0; i < oItems.length; i++) {
                if ($.inArray(oItems[i], selectedItems) > -1) {
                    var cells = oItems[i].getCells();
                    $.each(cells, function(index, input) {
                        input.setEditable(true);
                        input.attachChange(function(event) {
                            event.preventDefault();
                        });
                    });
                } else {
                    var cells = oItems[i].getCells();
                    $.each(cells, function(index, input) {
                        input.setEditable(false);
                        input.attachChange(function(event) {
                            event.preventDefault();
                        });
                    });
                }
            }
        } else {
            for (var i = 0; i < oItems.length; i++) {
                var cells = oItems[i].getCells();
                $.each(cells, function(index, input) {
                    input.setEditable(false);
                    input.attachChange(function(event) {
                        event.preventDefault();
                    });
                });
            }
        }
    },
    deleteRowsPress: function() {
        var table = this.getTable();
        var sTableId = this.FormID;
        var sTableModel = sTableId + "Model";
        var oModel = this.getView().getModel(sTableModel);
        var selectedItems = table.getSelectedItems();
        if (table.isAllSelectableSelected()) {
          var lengthtable = oModel.oData.length;

/*          var tempzl = lengthtable - limit;
            label = tempr1;
            sap.ui.getCore().byId("Label1").setText(label);*/

          if ( clicks == 0)
            {

            $.each(selectedItems.reverse(), function(ind, oItem) {
                var sPath = oItem.oBindingContexts[sTableModel].sPath;
                oItem.setSelected(false);
                oModel.oData.splice(sPath.split("/")[1], 1);
            });

            var lengthtable1 = oModel.oData.length;


            label = lengthtable1;
            sap.ui.getCore().byId("Label1").setText(label);

              if (lengthtable1 <= limit)
                {
              sap.ui.getCore().byId("back").setEnabled(false);
             	    sap.ui.getCore().byId("forward").setEnabled(false);
             	    sap.ui.getCore().byId("first").setEnabled(false);
             	    sap.ui.getCore().byId("last").setEnabled(false);
                }
            }

          else
            {
            var lengthtab = lengthtable - 1;
            var divtemp = lengthtab/limit;
            var divtemp1 = Math.floor(divtemp);

              if ( divtemp1 == clicks)

                {

                var ind2 = clicks * limit;
                var spath2 = lengthtable - 1;
                      $.each(selectedItems.reverse(), function(ind2, oItem) {

                          oItem.setSelected(false);
                          oModel.oData.splice(spath2, 1);
                          spath2 = spath2 - 1;
                      });

                      var temporaryz = oModel.oData.length;
                      label = temporaryz;
                      sap.ui.getCore().byId("Label1").setText(label);

                }

              else

              {

                var temp1 = clicks + 1;
                var ind1 = clicks * limit;
                var spath1 = temp1 * limit;
                spath1 = spath1 - 1;

                      $.each(selectedItems.reverse(), function(ind1, oItem) {

                          oItem.setSelected(false);
                          oModel.oData.splice(spath1, 1);
                          spath1 = spath1 - 1;
                      });

                      var temporaryz = oModel.oData.length;
                      label = temporaryz;
                      sap.ui.getCore().byId("Label1").setText(label);

              }

            }

            if ( clicks != 0)

              {

              clicks = clicks - 1;

                if ( clicks == 0)

                  {

                  sap.ui.getCore().byId("back").setEnabled(false);

                  var lengthtable6 = oModel.oData.length;

                      if (lengthtable6 <= limit)

                        {

                  sap.ui.getCore().byId("back").setEnabled(false);
                 	    sap.ui.getCore().byId("forward").setEnabled(false);
                 	    sap.ui.getCore().byId("first").setEnabled(false);
                 	    sap.ui.getCore().byId("last").setEnabled(false);
                        }

                  }

              }


        } else {

          if ( clicks == 0)
            {

            $.each(selectedItems.reverse(), function(ind, oItem) {
                var sPath = oItem.oBindingContexts[sTableModel].sPath;
                oItem.setSelected(false);
                oModel.oData.splice(sPath.split("/")[1], 1);
            });

                var lengthtable2 = oModel.oData.length;

              label = lengthtable2;
              sap.ui.getCore().byId("Label1").setText(label);

              if (lengthtable2 <= limit)
                {
              sap.ui.getCore().byId("back").setEnabled(false);
             	    sap.ui.getCore().byId("forward").setEnabled(false);
             	    sap.ui.getCore().byId("first").setEnabled(false);
             	    sap.ui.getCore().byId("last").setEnabled(false);
                }

            }

          else
            {

            var ind3 = clicks * limit;
            var sPath3 = 0;
            var sPath4 = 0;
            var sTemp = clicks * limit;
            $.each(selectedItems.reverse(), function(ind3, oItem) {

                    var sPath = oItem.oBindingContexts[sTableModel].sPath;
                    oItem.setSelected(false);
                    sPath3 = sPath.split("/")[1];
                    sPath4 = (+sTemp + +sPath3);
                    oModel.oData.splice(sPath4, 1);
                });


                var lengthtable3 = oModel.oData.length;

              label = lengthtable3;
              sap.ui.getCore().byId("Label1").setText(label);

              if (lengthtable3 <= limit)
                {
              sap.ui.getCore().byId("back").setEnabled(false);
             	    sap.ui.getCore().byId("forward").setEnabled(false);
             	    sap.ui.getCore().byId("first").setEnabled(false);
             	    sap.ui.getCore().byId("last").setEnabled(false);
                }

            }

        }

        //End of deletion and beging of pagination

        if (clicks == 0)

          {
            var tempr1 = oModel.oData.length;

            if(tempr1 > limit)
              {

                    var tabledata1 = [];
                    var tabledata2 = [];
                    var temporary1 = [];
                    var temp1 = [];


                  for (var f=0;f<oModel.oData.length;f++)
                {
                    temporary1[f] = oModel.oData[f];
                }

                    for (var f=0;f<oModel.oData.length;f++)
                      {
                      tabledata1[f] = oModel.oData[f];
                      }

                    for (var f=0;f<tabledata1.length;f++)
                  {
                      tabledata2[f] = tabledata1[f];
                  }

                    for (var g=0;g<limit;g++)
                  {
                      temp1[g] = tabledata2[g];
                  }



                    $.each(tabledata1, function(i, e) {
                      oModel.oData.pop(e);
                    });

                       $.each(temp1, function(i, e) {
                         oModel.oData.push(e);
                       });


                       oModel.refresh();
                       this.rerenderTable(table);


                       $.each(temp1, function(i, e) {
                         oModel.oData.pop(e);
                       });


                       $.each(temporary1, function(i, e) {
                         oModel.oData.push(e);
                        });
                       this.setbEdited(true);

              }

            else {

                  oModel.refresh();
                  this.setbEdited(true);

            }
          }

        else

          {
          var tempr2 = oModel.oData.length;

          var tempr3 = clicks * limit;

          if ( tempr2 - tempr3 > limit)

            {

                var tabledata1 = [];
                var tabledata2 = [];
                var temporary1 = [];
                var temp1 = [];


              for (var f=0;f<oModel.oData.length;f++)
            {
                temporary1[f] = oModel.oData[f];
            }

                for (var f=0;f<oModel.oData.length;f++)
                  {
                  tabledata1[f] = oModel.oData[f];
                  }

                for (var f=0;f<tabledata1.length;f++)
              {
                  tabledata2[f] = tabledata1[f];
              }

                var z=0;
                for (var g=tempr3;g<tempr3+limit;g++)
              {
                  temp1[z] = tabledata2[g];
                  z = z + 1;
              }



                $.each(tabledata1, function(i, e) {
                  oModel.oData.pop(e);
                });

                   $.each(temp1, function(i, e) {
                     oModel.oData.push(e);
                   });


                   oModel.refresh();
                   this.rerenderTable(table);


                   $.each(temp1, function(i, e) {
                     oModel.oData.pop(e);
                   });


                   $.each(temporary1, function(i, e) {
                     oModel.oData.push(e);
                    });
                   this.setbEdited(true);


            }

          else
            {

         	    sap.ui.getCore().byId("forward").setEnabled(false);

                var tabledata1 = [];
                var tabledata2 = [];
                var temporary1 = [];
                var temp1 = [];


              for (var f=0;f<oModel.oData.length;f++)
            {
                temporary1[f] = oModel.oData[f];
            }

                for (var f=0;f<oModel.oData.length;f++)
                  {
                  tabledata1[f] = oModel.oData[f];
                  }

                for (var f=0;f<tabledata1.length;f++)
              {
                  tabledata2[f] = tabledata1[f];
              }

                var y=0;
                for (var g=tempr3;g<tempr2;g++)
              {
                  temp1[y] = tabledata2[g];
                  y = y + 1;
              }



                $.each(tabledata1, function(i, e) {
                  oModel.oData.pop(e);
                });

                   $.each(temp1, function(i, e) {
                     oModel.oData.push(e);
                   });


                   oModel.refresh();
                   this.rerenderTable(table);


                   $.each(temp1, function(i, e) {
                     oModel.oData.pop(e);
                   });


                   $.each(temporary1, function(i, e) {
                     oModel.oData.push(e);
                    });
                   this.setbEdited(true);


            }

          }

    },
    duplicateRowsPress: function() {
        var oTable = this.getTable();
        var oThis = this;
        var selectedItems = oTable.getSelectedItems();
        var indx = [];


            var sTableId = this.FormID;
            var sTableModel = sTableId + "Model";
            var oModel = this.getView().getModel(sTableModel);
            var arr = [];
            var oToglButn = sap.ui.getCore().byId("_" + sTableId + "_EditToggleBtn");
            var tempmain = oModel.oData.length;

            if (tempmain <= limit)

              {

                $.each(selectedItems, function(ind, oItem) {
                    var table = oThis.getTable();
                    indx.push(table.indexOfItem(oItem));
                    var sPath = oItem.oBindingContexts[sTableModel].sPath;
                    var obj = jQuery.extend(true, {}, oModel.getObject(sPath));
                    arr.push(obj);
                });

              var temp2 = tempmain + arr.length;


              label = temp2;
              sap.ui.getCore().byId("Label1").setText(label);

                if(temp2 <= limit)
                  {
                        for (var i = 0; i < arr.length; i++)
                          {
                            oModel.oData.unshift(arr[i]);
                          }
                        oModel.refresh();

                  }

                else
                  {

                  sap.ui.getCore().byId("forward").setEnabled(true);
                 	    sap.ui.getCore().byId("first").setEnabled(true);
                 	    sap.ui.getCore().byId("last").setEnabled(true);

                        for (var i = 0; i < arr.length; i++)
                      {
                        oModel.oData.unshift(arr[i]);
                      }

                        var tabledata1 = [];
                        var tabledata2 = [];
                        var temporary1 = [];
                        var temp1 = [];


                      for (var f=0;f<oModel.oData.length;f++)
                    {
                        temporary1[f] = oModel.oData[f];
                    }

                        for (var f=0;f<oModel.oData.length;f++)
                          {
                          tabledata1[f] = oModel.oData[f];
                          }

                        for (var f=0;f<tabledata1.length;f++)
                      {
                          tabledata2[f] = tabledata1[f];
                      }

                        for (var g=0;g<limit;g++)
                      {
                          temp1[g] = tabledata2[g];
                      }



                        $.each(tabledata1, function(i, e) {
                          oModel.oData.pop(e);
                        });

                           $.each(temp1, function(i, e) {
                             oModel.oData.push(e);
                           });


                           oModel.refresh();
                           this.rerenderTable(oTable);


                           $.each(temp1, function(i, e) {
                             oModel.oData.pop(e);
                           });


                           $.each(temporary1, function(i, e) {
                             oModel.oData.push(e);
                            });

                  }

              }

            else {

              var temp3 = tempmain - 1;
              var temp4 = temp3/limit;
              var temp5 = Math.floor(temp4);
          var temp6 = limit * clicks;
          var temp7 = tempmain - temp6;


              if (temp5 == clicks)

                {

                    $.each(selectedItems, function(ind, oItem) {
                        var table = oThis.getTable();
                        indx.push(table.indexOfItem(oItem));
                        var sPath = oItem.oBindingContexts[sTableModel].sPath;
                        var spathtemp = sPath.split("/")[1];
                        var spathtemp1 = (+spathtemp + +temp6);
                        var sPathfinal = "/"+spathtemp1;
                        var obj = jQuery.extend(true, {}, oModel.getObject(sPathfinal));
                        arr.push(obj);
                    });

                  var templabel = tempmain + arr.length;
                  label = templabel;
                  sap.ui.getCore().byId("Label1").setText(label);


                    var temp8 = temp7 + arr.length;


                  if (temp8 <= limit)

                    {

                              for (var i = 0; i < arr.length; i++)
                            {
                              oModel.oData.splice(temp6,0,arr[i]);
                            }

                            var tabledata1 = [];
                            var tabledata2 = [];
                            var temporary1 = [];
                            var temp1 = [];


                          for (var f=0;f<oModel.oData.length;f++)
                        {
                            temporary1[f] = oModel.oData[f];
                        }

                            for (var f=0;f<oModel.oData.length;f++)
                              {
                              tabledata1[f] = oModel.oData[f];
                              }

                            for (var f=0;f<tabledata1.length;f++)
                          {
                              tabledata2[f] = tabledata1[f];
                          }

                            var z=0;
                            for (var g=temp6;g<tempmain;g++)
                          {
                              temp1[z] = tabledata2[g];
                              z = z + 1;
                          }



                            $.each(tabledata1, function(i, e) {
                              oModel.oData.pop(e);
                            });

                               $.each(temp1, function(i, e) {
                                 oModel.oData.push(e);
                               });


                               oModel.refresh();
                               this.rerenderTable(oTable);


                               $.each(temp1, function(i, e) {
                                 oModel.oData.pop(e);
                               });


                               $.each(temporary1, function(i, e) {
                                 oModel.oData.push(e);
                                });

                    }

                  else

                    {

                    sap.ui.getCore().byId("forward").setEnabled(true);
                     	    sap.ui.getCore().byId("first").setEnabled(true);
                     	    sap.ui.getCore().byId("last").setEnabled(true);


                              for (var i = 0; i < arr.length; i++)
                            {
                                oModel.oData.splice(temp6,0,arr[i]);
                            }


                            var tabledata1 = [];
                            var tabledata2 = [];
                            var temporary1 = [];
                            var temp1 = [];


                          for (var f=0;f<oModel.oData.length;f++)
                        {
                            temporary1[f] = oModel.oData[f];
                        }

                            for (var f=0;f<oModel.oData.length;f++)
                              {
                              tabledata1[f] = oModel.oData[f];
                              }

                            for (var f=0;f<tabledata1.length;f++)
                          {
                              tabledata2[f] = tabledata1[f];
                          }
                            var y = 0;
                            for (var g=temp6;g<temp6+limit;g++)
                          {
                              temp1[y] = tabledata2[g];
                              y = y + 1;
                          }


                            $.each(tabledata1, function(i, e) {
                              oModel.oData.pop(e);
                            });

                               $.each(temp1, function(i, e) {
                                 oModel.oData.push(e);
                               });


                               oModel.refresh();
                               this.rerenderTable(oTable);


                               $.each(temp1, function(i, e) {
                                 oModel.oData.pop(e);
                               });


                               $.each(temporary1, function(i, e) {
                                 oModel.oData.push(e);
                                });

                    }

                }


              if (temp5 > clicks)

                {

                    $.each(selectedItems, function(ind, oItem) {
                        var table = oThis.getTable();
                        indx.push(table.indexOfItem(oItem));
                        var sPath = oItem.oBindingContexts[sTableModel].sPath;
                        var spathtemp = sPath.split("/")[1];
                        var spathtemp1 = (+spathtemp + +temp6);
                        var sPathfinal = "/"+spathtemp1;
                        var obj = jQuery.extend(true, {}, oModel.getObject(sPathfinal));
                        arr.push(obj);
                    });

                  var templabel = tempmain + arr.length;
                  label = templabel;
                  sap.ui.getCore().byId("Label1").setText(label);


                    for (var i = 0; i < arr.length; i++)
                  {
                      oModel.oData.splice(temp6,0,arr[i]);
                  }


                var tabledata1 = [];
                var tabledata2 = [];
                var temporary1 = [];
                var temp1 = [];


              for (var f=0;f<oModel.oData.length;f++)
            {
                temporary1[f] = oModel.oData[f];
            }

                for (var f=0;f<oModel.oData.length;f++)
                  {
                  tabledata1[f] = oModel.oData[f];
                  }

                for (var f=0;f<tabledata1.length;f++)
              {
                  tabledata2[f] = tabledata1[f];
              }
                var y = 0;
                for (var g=temp6;g<temp6+limit;g++)
              {
                  temp1[y] = tabledata2[g];
                  y = y + 1;
              }


                $.each(tabledata1, function(i, e) {
                  oModel.oData.pop(e);
                });

                   $.each(temp1, function(i, e) {
                     oModel.oData.push(e);
                   });


                   oModel.refresh();
                   this.rerenderTable(oTable);


                   $.each(temp1, function(i, e) {
                     oModel.oData.pop(e);
                   });


                   $.each(temporary1, function(i, e) {
                     oModel.oData.push(e);
                    });

                }

            }

            oTable.removeSelections(true);
            var oitems = oTable.getItems();
            for (var i = 0; i < indx.length; i++) {
                oTable.setSelectedItem(oitems[indx[i] + selectedItems.length]);
            }
            if (oToglButn.getPressed()) {
                for (var i = 0; i < selectedItems.length; i++) {
                    oTable.setSelectedItem(oitems[i]);
                }
                var finalSelecteItems = oTable.getSelectedItems();
                $.each(finalSelecteItems, function(i, e) {
                    var cells = e.getCells();
                    $.each(cells, function(index, input) {
                        input.setEditable(true);
                        input.attachChange(function(event) {
                            event.preventDefault();
                        });
                    });
                });
            }

        this.setbEdited(true);
    },
};