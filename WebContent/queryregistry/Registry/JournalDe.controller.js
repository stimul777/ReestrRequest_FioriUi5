sap.ui
	.controller(
		"queryregistry.Registry.JournalDe",
		{

		    createTable : function(tableId, oController, view,
			    typeTable) {

			var heightRow = 35;

			jQuery.sap.require("jquery.sap.storage");
			this.oStorage = jQuery.sap
				.storage(jQuery.sap.storage.Type.local);
			var check = this.oStorage.get("IDCheck");
			var link = this.oStorage.get("IDSystemLink");

			var refreshButton = new sap.m.Button(
				{
				    icon : "sap-icon://refresh",
				    tooltip : "Обновить",
				    press : function() {
					var oModel = new sap.ui.model.odata.v2.ODataModel(
						link, {
						    useBatch : false,
						    defaultUpdateMethod : "Put"
						});

					oTable.getModel().refresh(true);
					oTable.rerender();
				    }
				});
			refreshButton.addStyleClass("myRefreshButton");

			var numbersButton = new sap.m.Button({
			    icon : "sap-icon://approvals",
			    tooltip : "Номера запросов",
			    enabled : false,
			    press : function(oEvent) {

				// var idx = oTable.getSelectedIndex();
				var idx = oTable.getSelectedIndices();
				if (idx == -1)
				    return;
				var array = [];

				for (i = 0; i < idx.length; i++) {
				    var NumbersTrkorr = oTable
					    .getContextByIndex(idx[i])
					    .getObject().Trkorr;
				    array.push(NumbersTrkorr);
				}
				openNumbersTrkorrDialog(array);
			    },
			});

			var watchButton = new sap.m.Button({
			    icon : "sap-icon://display",
			    tooltip : "Просмотр",
			    enabled : false,
			    press : function() {
				// var idx = oTable.getSelectedIndex();
				var idx = oTable.getSelectedIndices();
				if (idx == -1)
				    return;

				var Trkorr = oTable.getContextByIndex(idx)
					.getObject().Trkorr;
				watch(Trkorr);
			    },
			});

			var historyButton = new sap.m.Button({
			    icon : "sap-icon://work-history",
			    tooltip : "История запроса",
			    enabled : false,
			    press : function() {
				// var idx = oTable.getSelectedIndex();
				var idx = oTable.getSelectedIndices();
				if (idx == -1)
				    return;

				var Trkorr = oTable.getContextByIndex(idx)
					.getObject().Trkorr;
				history(Trkorr);
			    },
			});
			
			function ConterTextJournal() {

				var listServer = sap.ui.getCore().byId("listServer");
				var listServerItems= listServer.getItems();

			    var oJsonModel = new sap.ui.model.json.JSONModel();
			    var aFltDET = [new sap.ui.model.Filter({
			     	  path: "StatusCode",
			     		operator: sap.ui.model.FilterOperator.EQ,
			     		value1: '02'
			   	}),
			   ];
			       
			       var aFltDETT = [new sap.ui.model.Filter({
			     	  path: "StatusCode",
			     		operator: sap.ui.model.FilterOperator.EQ,
			     		value1: '03'
			   	}),
			   ];
			       			       
			       
			       var oModel =  new sap.ui.model.odata.ODataModel(link,false);
			       oModel.read("/Query_registrySet", {
			     	  filters: aFltDET,
			     	  async:false,
			           success: function(oData, response) {
			         	  oJsonModel.setData(oData);
			            }
			       });
			       
			       var oJsonModelT = new sap.ui.model.json.JSONModel();
			       oModel.read("/Query_registrySet", {
			     	  filters: aFltDETT,
			     	  async:false,
			           success: function(oData, response) {
			         	  oJsonModelT.setData(oData);
			            }
			       });			       
			 	     
			       var aFltDE0 = [new sap.ui.model.Filter({
			       	  path: "StatusCode",
			       		operator: sap.ui.model.FilterOperator.EQ,
			       		value1: '01'
			     	}),
			     ];
			                          
			           var oJsonModelDE0 = new sap.ui.model.json.JSONModel();
			           oModel.read("/Query_registrySet", {
			         	  filters: aFltDE0,
			         	  async:false,
			               success: function(oData, response) {
			             	  oJsonModelDE0.setData(oData);
			                }
			           });
			           
		                  var aFltDEQ = [new sap.ui.model.Filter({
		                  	  path: "StatusCode",
		                  		operator: sap.ui.model.FilterOperator.EQ,
		                  		value1: '05'
		                	}),
		                ];
		                                     
		                      var oJsonModelDEQ = new sap.ui.model.json.JSONModel();
		                      oModel.read("/Query_registrySet", {
		                    	  filters: aFltDEQ,
		                    	  async:false,
		                          success: function(oData, response) {
		                        	  oJsonModelDEQ.setData(oData);
		                           }
		                      });
		                      
		                      var aFltDEQQ = [new sap.ui.model.Filter({
		                      	  path: "StatusCode",
		                      		operator: sap.ui.model.FilterOperator.EQ,
		                      		value1: '06'
		                    	}),
		                    ];
		                                         
		                          var oJsonModelDEQQ = new sap.ui.model.json.JSONModel();
		                          oModel.read("/Query_registrySet", {
		                        	  filters: aFltDEQQ,
		                        	  async:false,
		                              success: function(oData, response) {
		                            	  oJsonModelDEQQ.setData(oData);
		                               }
		                          });
			         	      	  
		                          var aFltDE1 = [new sap.ui.model.Filter({
		                          	  path: "StatusCode",
		                          		operator: sap.ui.model.FilterOperator.EQ,
		                          		value1: '08'
		                        	}),
		                        ];
		                                             
		                              var oJsonModelDE1 = new sap.ui.model.json.JSONModel();
		                              oModel.read("/Query_registrySet", {
		                            	  filters: aFltDE1,
		                            	  async:false,
		                                  success: function(oData, response) {
		                                	  oJsonModelDE1.setData(oData);
		                                   }
		                              });
		                              
		                              var aFltDE11 = [new sap.ui.model.Filter({
		                              	  path: "StatusCode",
		                              		operator: sap.ui.model.FilterOperator.EQ,
		                              		value1: '09'
		                            	}),
		                            ];
		                                                 
		                                  var oJsonModelDE11 = new sap.ui.model.json.JSONModel();
		                                  oModel.read("/Query_registrySet", {
		                                	  filters: aFltDE11,
		                                	  async:false,
		                                      success: function(oData, response) {
		                                    	  oJsonModelDE11.setData(oData);
		                                       }
		                                  });
		                                  
		                                  var aFltJournal = [new sap.ui.model.Filter({
		                                  	  path: "StatusCode",
		                                  		operator: sap.ui.model.FilterOperator.EQ,
		                                  		value1: '11'
		                                	}),
		                                ];
		                                                     
		                                      var oJsonModelJournal = new sap.ui.model.json.JSONModel();
		                                      oModel.read("/Query_registrySet", {
		                                    	  filters: aFltJournal,
		                                    	  async:false,
		                                          success: function(oData, response) {
		                                        	  oJsonModelJournal.setData(oData);
		                                           }
		                                      });
		                                      
		                                      
		                                      var aFltArchive = [new sap.ui.model.Filter({
		                                      	  path: "StatusCode",
		                                      		operator: sap.ui.model.FilterOperator.EQ,
		                                      		value1: '12'
		                                    	}),
		                                    ];
		                                                         
		                                          var oJsonModelArchive = new sap.ui.model.json.JSONModel();
		                                          oModel.read("/Query_registrySet", {
		                                        	  filters: aFltArchive,
		                                        	  async:false,
		                                              success: function(oData, response) {
		                                            	  oJsonModelArchive.setData(oData);
		                                               }
		                                          });
		                                  
		                                  
		                            	  var listNotBlockedobj=[];
		                            	  if(oJsonModelJournal.oData.results.length>0){
		                            		  oJsonModelJournal.oData.results.forEach(function(item, i, parseListModel){
		                            				if(item.Icon==""){
		                            					listNotBlockedobj.push(item);
		                            				} 
		                            		  });
		                            	  }  
			      
			      listServerItems[0].setTitle("DE0 "+"("+oJsonModelDE0.oData.results.length+")");
			      listServerItems[1].setTitle("DET "+"("+oJsonModel.oData.results.length+"/"+oJsonModelT.oData.results.length+")");
			      listServerItems[2].setTitle("DEQ "+"("+oJsonModelDEQ.oData.results.length+"/"+oJsonModelDEQQ.oData.results.length+")");
			      listServerItems[3].setTitle("DE1 "+"("+oJsonModelDE1.oData.results.length+"/"+oJsonModelDE11.oData.results.length+")");
			      listServerItems[4].setTitle("Журнал ошибок "+"("+listNotBlockedobj.length+")");
			      listServerItems[5].setTitle("Архив "+"("+oJsonModelArchive.oData.results.length+")");
			};

			var ErrorCorrection = new sap.m.Button({
			    icon : "sap-icon://activate",
			    text : "Ошибка исправлена",
			    enabled : false,
			    visible : false,
			    tooltip : "Принудительный перенос",
			    press : function() {
				// var idx = oTable.getSelectedIndex();
				var idx = oTable.getSelectedIndices();
				if (idx == -1)
				    return;

				var Trkorr = '';
				var Trkorrs = [];
				idx.forEach(function(item, i, idx) {
				    var usin = oTable.getContextByIndex(item)
					    .getObject();
				    if (Trkorr === "") {
					Trkorr = usin.Trkorr;
				    } else {
					Trkorr = Trkorr + ', ' + usin.Trkorr
				    }

				    Trkorrs.push(usin.Trkorr);
				});

				openErrorCorrectionDialog(Trkorrs, Trkorr);
			    },
			});

			ErrorCorrection.addStyleClass("myDoneButton");

			if (check == "true") {
			    ErrorCorrection.setVisible(true);
			}

			var searchBox = new sap.m.SearchField({
			    enabled : true,
			    visible : true,
			    maxLength : 0,
			    placeholder : "Текст для поиска...",
			    showMagnifier : true,
			    showRefreshButton : false,
			    width : "15rem",
			    search : function(oEvent) {
				Search(oEvent);
			    },

			});

			var LockButton = new sap.m.Button({
			    text : "Заблокировать",
			    icon : "sap-icon://locked",
			    enabled : false,
			    tooltip : "Заблокировано",
			    press : function() {
				// var idx = oTable.getSelectedIndex();
				/*
				 * var idx = oTable.getSelectedIndices(); if
				 * (idx == -1) return;
				 * 
				 * var Trkorr = oTable.getContextByIndex(idx)
				 * .getObject().Trkorr;
				 * 
				 * 
				 * var Trkorr = ''; var Trkorrs = [];
				 * idx.forEach(function(item, i, idx) { var usin =
				 * oTable.getContextByIndex(item) .getObject();
				 * if (Trkorr === "") { Trkorr = usin.Trkorr; }
				 * else { Trkorr = Trkorr + ', ' + usin.Trkorr }
				 * 
				 * Trkorrs.push(usin.Trkorr); });
				 * 
				 * Trkorrs.forEach(function(item, i, Trkorrs) {
				 */
				oLockTrkorr();
				// })
			    },
			}).addStyleClass("myErrorButton");

			var devToolBar = new sap.m.Toolbar({
			    busy : false, // boolean
			    busyIndicatorDelay : 1000, // int
			    visible : true, // boolean
			    active : false, // boolean
			    enabled : true, // boolean
			    design : sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign,
			    // since
			    // 1.16.8
			    content : [ refreshButton,
				    new sap.m.ToolbarSeparator(),
				    numbersButton,
				    new sap.m.ToolbarSeparator(), watchButton,
				    historyButton, ErrorCorrection, LockButton,
				    new sap.m.ToolbarSpacer(), searchBox ], // sap.ui.core.Control
			});

			var oTable = new sap.ui.table.Table(
				tableId,
				{
				    height : "100%",
				    rowHeight : heightRow,
				    visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Auto,
				    enableCellFilter : true,
				    enableCustomFilter : true,
				    selectionBehavior : sap.ui.table.SelectionBehavior.Row,
				    selectionMode : sap.ui.table.SelectionMode.MultiToggle,
				    enableCellFilter : true,
				    enableColumnReordering : true,
				    sort : function(oEvent) {
					oEvent.getSource().rerender();
				    },
				    enableSelectAll : true,
				    toolbar : [ devToolBar, ],

				});

			oTable.attachRowSelectionChange(function(oEvent) {

			    var quantitySelectedRows = oTable
				    .getSelectedIndices().length; // получаем
			    // длину
			    // массива
			    if (quantitySelectedRows > 1
				    || quantitySelectedRows == 0) {
				watchButton.setEnabled(false);
				historyButton.setEnabled(false);
				// ErrorCorrection.setEnabled(false);
			    } else {
				ErrorCorrection.setEnabled(true);
				watchButton.setEnabled(true);
				historyButton.setEnabled(true);

			    }
			    (quantitySelectedRows >= 1) ? numbersButton
				    .setEnabled(true) : numbersButton
				    .setEnabled(false);
			    (quantitySelectedRows >= 1) ? LockButton
				    .setEnabled(true) : LockButton
				    .setEnabled(false);
			});

			var oControl = new sap.ui.core.Icon({
			    src : "{Icon}",
			    color : "#cc0303!important;",
			});
			oTable.addColumn(new sap.ui.table.Column({
			    width : "35px",
			    template : oControl
			}));

			var oControl = new sap.ui.commons.TextField()
				.bindProperty("value", "Trkorr").setEditable(
					false); // short binding notation
			oTable.addColumn(new sap.ui.table.Column({
			    label : new sap.ui.commons.Label({
				text : "Номер"
			    }),
			    sortProperty : "Trkorr",
			    width : "100px",
			    template : oControl,
			}));

			// yyd номер оригинала запроса
			oControl = new sap.ui.commons.TextField().bindProperty("value", "Original_trkorr").setEditable(false); // short binding notation
			oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Номер оригинала"
			}),
			sortProperty: "Original_trkorr",
			width: "120px",
			template: oControl,
		}));

			// oControl = new sap.ui.commons.TextView({
			// text: {
			// path: "CreateDate",
			// type: 'sap.ui.model.type.Date',
			// formatOptions: {
			// source: {
			// pattern: 'yyyy-MM-ddTHH:mm:ss'
			// },
			// pattern: 'dd-MM-yyyy HH:mm:ss'
			// }
			// }
			//		
			// });

			jQuery.sap.require("sap.ui.core.format.DateFormat");
			oControl = new sap.ui.commons.TextView({
			    text : {
				path : "CreateDate",
				type : new sap.ui.model.type.DateTime({
				    pattern : "dd-MM-yyyy HH:mm:ss",
				    UTC : true
				})

			    }
			});

			oTable.addColumn(new sap.ui.table.Column({
			    label : new sap.ui.commons.Label({
				text : "Добавлен"
			    }),
			    sortProperty : "CreateDate",
			    width : "150px",
			    template : oControl
			}));

			var oGroupField = new sap.ui.commons.TextView()
				.bindProperty("text", {
				    parts : [ {
					path : "TuskNumber"
				    }, {
					path : "Version"
				    }, {
					path : "Description"
				    } ],

				    formatter : function(TuskNumber, Version,
					    Description) {

					return TuskNumber + "-" + Version
						+ ": " + Description;
				    }

				});
			oTable.addColumn(new sap.ui.table.Column({
			    label : "Описание",
			    template : oGroupField
			}));

			oControl = new sap.ui.commons.TextView({
			    text : "{Trfunction}"
			});
			oTable.addColumn(new sap.ui.table.Column({
			    label : new sap.ui.commons.Label({
				text : "Тип"
			    }),
			    sortProperty : "Trfunction",
			    width : "160px",
			    template : oControl
			}));

			oControl = new sap.ui.commons.TextView({
			    text : "{CreatorLogin}"
			});
			oTable.addColumn(new sap.ui.table.Column({
			    label : new sap.ui.commons.Label({
				text : "Добавил"
			    }),
			    sortProperty : "CreatorLogin",
			    width : "120px",
			    template : oControl
			}));

			oControl = new sap.ui.commons.TextView({
			    text : "{ErrorText}"
			});
			oTable.addColumn(new sap.ui.table.Column({
			    label : new sap.ui.commons.Label({
				text : "Ошибка"
			    }),
			    sortProperty : "ErrorText",
			    width : "30%",
			    template : oControl
			}));

			var oModel = new sap.ui.model.odata.v2.ODataModel(link,
				{
				    useBatch : false,
				    defaultUpdateMethod : "Put"
				});
			oModel.setSizeLimit(500);
			sap.ui.getCore().setModel(oModel);
			oTable.setModel(oModel);

			var oFilter = new sap.ui.model.Filter("StatusCode",
				sap.ui.model.FilterOperator.EQ, '11');

			oTable.bindRows("/Query_registrySet", undefined,
				undefined, [ oFilter ]);

			oTable
				.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
			oTable.setVisibleRowCount(calcRowCount());
			oTable
				.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);
			// oTable.bindRows("/Query_registrySet");
			oTable.placeAt("content");

			function calcRowCount() {
			    var height = document.documentElement.clientHeight - 243;// .style.height;
			    // height = height - 243;

			    return ~~(height / heightRow);
			}

			function openNumbersTrkorrDialog(array) {
			    var oNumbersTrkorrDialog = new sap.m.Dialog({
				title : "Номера запросов",
				textAlign : sap.ui.core.TextAlign.Center,
				// contentHeight: "300px",
				endButton : new sap.m.Button({
				    text : "Закрыть",
				    press : function() {
					oNumbersTrkorrDialog.close();
				    }
				})
			    });
			    for (var i = 0; i < array.length; i++) {

				var NumbersTrkorr = new sap.m.Text({
				    text : array[i] + "\n",
				}).addStyleClass("myNumbersRequests");

				oNumbersTrkorrDialog.addContent(NumbersTrkorr);
			    }
			    oNumbersTrkorrDialog.open();
			}
			function watch(Trkorr) {
			    var oUpdateDialog = new sap.m.Dialog({
				title : "Просмотр запроса " + Trkorr,
				endButton : new sap.m.Button({
				    text : "Закрыть",
				    press : function() {
					oUpdateDialog.close()
				    }
				})
			    });

			    var oTableWatch = new sap.ui.table.Table(
				    {
					visibleRowCount : 7,
					enableCellFilter : true,
					enableCustomFilter : true,
					selectionMode : sap.ui.table.SelectionMode.None,
					enableColumnReordering : true,
				    });

			    var oControl = new sap.m.Text({
				text : "{Parameter}"
			    }); // short binding notation
			    oTableWatch.addColumn(new sap.ui.table.Column({
				width : "30%",
				label : new sap.m.Label({
				    text : "Параметр"
				}),
				template : oControl
			    }));

			    oControl = new sap.m.Text({
				text : "{Value}"
			    }); // more verbose binding notationt
			    oTableWatch.addColumn(new sap.ui.table.Column({
				label : new sap.m.Label({
				    text : "Значение"
				}),
				template : oControl
			    }));

			    var oModelWatch = new sap.ui.model.odata.v2.ODataModel(
				    link, {
					useBatch : false,
					defaultUpdateMethod : "Put"
				    });
			    oModelWatch.setSizeLimit(500);
			    sap.ui.getCore().setModel(oModelWatch);
			    oTableWatch.setModel(oModelWatch);

			    var oFilterWatch = new sap.ui.model.Filter(
				    "Parameter",
				    sap.ui.model.FilterOperator.EQ, Trkorr);
			    oTableWatch.bindRows("/Watch_requestSet",
				    undefined, undefined, [ oFilterWatch ]);

			    var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				    {
					content : [ oTableWatch, ]
				    });

			    oUpdateDialog.addContent(oSimpleForm);
			    oUpdateDialog.open();

			}

			function history(Trkorr) {
			    var oUpdateDialog = new sap.m.Dialog({
				title : "История запроса " + Trkorr,
				endButton : new sap.m.Button({
				    text : "Закрыть",
				    press : function() {
					oUpdateDialog.close();
				    }
				})
			    });

			    var oTableWatch = new sap.ui.table.Table(
				    {
					visibleRowCount : 7,
					selectionMode : sap.ui.table.SelectionMode.None,
					enableColumnReordering : false,
				    });

			    var oControl = new sap.m.Text({
				text : {
				    path : "TimeOfAction",
				    type : new sap.ui.model.type.DateTime({
					pattern : "dd-MM-yyyy HH:mm:ss",
					UTC : true
				    })

				}
			    });
			    oTableWatch.addColumn(new sap.ui.table.Column({
				width : "30%",
				label : new sap.m.Label({
				    text : "Отметка времени"
				}),
				template : oControl
			    }));

			    oControl = new sap.m.Text({
				text : "{ActionUser}"
			    });
			    oTableWatch.addColumn(new sap.ui.table.Column({
				label : new sap.m.Label({
				    text : "Пользователь"
				}),
				template : oControl
			    }));

			    oControl = new sap.m.Text({
				text : "{ActionTxt}"
			    });
			    oTableWatch.addColumn(new sap.ui.table.Column({
				label : new sap.m.Label({
				    text : "Действие"
				}),
				template : oControl
			    }));

			    var oModelHistory = new sap.ui.model.odata.v2.ODataModel(
				    link, {
					useBatch : false,
					defaultUpdateMethod : "Put"
				    });
			    oModelHistory.setSizeLimit(500);
			    sap.ui.getCore().setModel(oModelHistory);
			    oTableWatch.setModel(oModelHistory);

			    var oFilterWatch = new sap.ui.model.Filter(
				    "Trkorr", sap.ui.model.FilterOperator.EQ,
				    Trkorr);
			    oTableWatch.bindRows("/HistorySet", undefined,
				    undefined, [ oFilterWatch ]);

			    var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				    {
					layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
					content : [ oTableWatch, ]
				    });

			    oUpdateDialog.addContent(oSimpleForm);
			    oUpdateDialog.open();

			}

			function Search(oEvent) {

			    var data = oEvent.getSource().getValue();
			    var oFilterSearch = new sap.ui.model.Filter(
				    "Trkorr", sap.ui.model.FilterOperator.EQ,
				    data);
			    var oFilterStatus = new sap.ui.model.Filter(
				    "StatusCode",
				    sap.ui.model.FilterOperator.EQ, '11');

			    var oFilterAll = new sap.ui.model.Filter([
				    oFilterSearch, oFilterStatus ], true);
			    oTable.bindRows("/Query_registrySet", undefined,
				    undefined, [ oFilterAll ]);
			    oTable
				    .setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
			    oTable.setVisibleRowCount(calcRowCount());
			    oTable
				    .setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);

			}

			function openErrorCorrectionDialog(Trkorrs, Trkorr) {
			    Trkorrs
				    .forEach(function(item, i, Trkorrs) {
					var oEntry = {};
					oEntry.Trkorr = item;
					oEntry.StatusCode = '11';

					sap.ui
						.getCore()
						.getModel()
						.update(
							"/Query_registrySet('"
								+ oEntry.Trkorr
								+ "')",
							oEntry,
							{
							    success : function() {
								var oModel = new sap.ui.model.odata.v2.ODataModel(
									link,
									{
									    useBatch : false,
									    defaultUpdateMethod : "Put"
									});
								oModel
									.setSizeLimit(500);
								sap.ui
									.getCore()
									.setModel(
										oModel);
								oTable
									.setModel(oModel);
								ConterTextJournal() ;
							    },
							    error : function() {
								jQuery.sap
									.require("sap.m.MessageBox");
								sap.m.MessageBox
									.error(
										"Ошибка при изменении статуса запроса!",
										{
										    title : "Ошибка"
										});
							    }
							});

				    });
			}
			;

			function oLockTrkorr() {

			    var array = [];

			    for (var i = 0; i < oTable.getSelectedIndices().length; i++) {
				array.push(oTable.getContextByIndex(
					oTable.getSelectedIndices()[i])
					.getObject().Trkorr);
			    }
			    ;

			    var oModelLockTrkorr = new sap.ui.model.odata.v2.ODataModel(
				    link,
				    {
					defaultUpdateMethod : sap.ui.model.odata.UpdateMethod.Put
				    });
			    oModelLockTrkorr.setRefreshAfterChange(false);
			    oModelLockTrkorr
				    .setDeferredGroups([ "LockTrkorr" ]);

			    var oEntry = {};
			    for (var index = 0; index < array.length; ++index) {
				oEntry.Trkorr = array[index];
				oEntry.Icon = "sap-icon://locked";

				oModelLockTrkorr.update("/Query_registrySet('"
					+ oEntry.Trkorr + "')", oEntry, {
				    groupId : "LockTrkorr"
				});

			    }
			    ;

			    oModelLockTrkorr
				    .submitChanges({
					groupId : "LockTrkorr",
					success : function() {
					    var oModel = new sap.ui.model.odata.v2.ODataModel(
						    link,
						    {
							// json: false,
							defaultUpdateMethod : "Put"
						    });
					    oModel.setSizeLimit(500);
					    sap.ui.getCore().setModel(oModel);
					    oTable.setModel(oModel);
					    ConterTextJournal() ;
					    EnabledButton();
					},
					error : function() {
					    jQuery.sap
						    .require("sap.m.MessageBox");
					    sap.m.MessageBox
						    .error(
							    "Произошла ошибка при смене статуса запроса!",
							    {
								title : "Ошибка"
							    });
					}
				    });

			    array = null;

			}

			function EnabledButton() {

			    numbersButton.setEnabled(false);
			    watchButton.setEnabled(false);
			    historyButton.setEnabled(false);
			    ErrorCorrection.setEnabled(false);
			    LockButton.setEnabled(false);

			}

			return oTable;
		    },

		});