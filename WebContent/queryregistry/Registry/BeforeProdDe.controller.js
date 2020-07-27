sap.ui
	.controller(
		"queryregistry.Registry.BeforeProdDe",
		{

		    /**
		     * Called when a controller is instantiated and its View
		     * controls (if available) are already created. Can be used
		     * to modify the View before it is displayed, to bind event
		     * handlers and do other one-time initialization.
		     * 
		     * @memberOf queryregistry.Registry.BeforeProdSl
		     */

		    createTestTable : function(tableId, oController, view,
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
				    press : function refresh() {

					var oModel = new sap.ui.model.odata.v2.ODataModel(
						link, {

						    useBatch : false,
						    defaultUpdateMethod : "Put"

						});

					oTable.getModel().refresh(true);
					oTable.rerender();
					ConterTextQ();
				    },
				});
			refreshButton.addStyleClass("myRefreshButton");

			var numbersButton = new sap.m.Button({

			    icon : "sap-icon://approvals",
			    tooltip : "Номера запросов",
			    enabled : false,
			    press : function() {

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
			
			function ConterTextQ() {

				var listServer = sap.ui.getCore().byId("listServer");
				var listServerItems= listServer.getItems();
				var tabBar= sap.ui.getCore().byId("TabBar");
			    var itemsBar = tabBar.getItems();
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
		                          
		                          var aFltDEQQQ = [new sap.ui.model.Filter({
		                          	  path: "StatusCode",
		                          		operator: sap.ui.model.FilterOperator.EQ,
		                          		value1: '07'
		                        	}),
		                        ];
		                                             
		                              var oJsonModelDEQQQ = new sap.ui.model.json.JSONModel();
		                              oModel.read("/Query_registrySet", {
		                            	  filters: aFltDEQQQ,
		                            	  async:false,
		                                  success: function(oData, response) {
		                                	  oJsonModelDEQQQ.setData(oData);
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
		                                  
			      itemsBar[0].setText("К переносу в DEQ "+ "("+oJsonModelDEQ.oData.results.length+")");
			      itemsBar[1].setText("Перенос в DEQ одобрен "+ "("+oJsonModelDEQQ.oData.results.length+")");
			      itemsBar[2].setText("в DEQ "+ "("+oJsonModelDEQQQ.oData.results.length+")");
			      
			      listServerItems[0].setTitle("DE0 "+"("+oJsonModelDE0.oData.results.length+")");
			      listServerItems[1].setTitle("DET "+"("+oJsonModel.oData.results.length+"/"+oJsonModelT.oData.results.length+")");
			      listServerItems[2].setTitle("DEQ "+"("+oJsonModelDEQ.oData.results.length+"/"+oJsonModelDEQQ.oData.results.length+")");
			      listServerItems[3].setTitle("DE1 "+"("+oJsonModelDE1.oData.results.length+"/"+oJsonModelDE11.oData.results.length+")");
			      listServerItems[4].setTitle("Журнал ошибок "+"("+listNotBlockedobj.length+")");
			      listServerItems[5].setTitle("Архив "+"("+oJsonModelArchive.oData.results.length+")");
			}
			

			var buttons = [];

			if (typeTable == 'for') {

			    var doneButton = new sap.m.Button({

				icon : "sap-icon://sys-enter-2",
				tooltip : "Одобрен к переносу в предпрод",
				enabled : false,
				visible : false,
				press : function() {
				    pushApprove();
				},

			    });
			    doneButton.addStyleClass("myDoneButton");

			    if (check == "true") {

				doneButton.setVisible(true);

			    }
			    buttons.push(doneButton);

			}

			if (typeTable == 'approve') {

			    var errorButtonUnlock = new sap.m.Button({

				icon : "sap-icon://sys-cancel-2",
				tooltip : "Ошибка при деблокировании",
				enabled : false,
				press : function() {

				    // var idx = oTable.getSelectedIndex();
				    var idx = oTable.getSelectedIndices();
				    if (idx == -1)
					return;
				    var Trkorr = oTable.getContextByIndex(idx)
					    .getObject().Trkorr;
				    errorUnlocking(Trkorr);

				},
			    });
			    errorButtonUnlock.addStyleClass("myErrorButton");

			}

			if (typeTable == 'into') {

			    var errorButton = new sap.m.Button({

				icon : "sap-icon://sys-cancel-2",
				enabled : false,
				tooltip : "Предпрод не пройден",
				press : function() {

				    // var idx = oTable.getSelectedIndex();
				    var idx = oTable.getSelectedIndices();
				    if (idx == -1)
					return;
				    var Trkorr = oTable.getContextByIndex(idx)
					    .getObject().Trkorr;
				    oTestFail(Trkorr);

				},
			    });
			    errorButton.addStyleClass("myErrorButton");
			    buttons.push(errorButton);

			    var notMigrationButton = new sap.m.Button({

				icon : "sap-icon://locked",
				enabled : false,
				tooltip : "Не переносить в прод",
				press : function() {

				    // var idx = oTable.getSelectedIndex();
				    /*
				     * var idx = oTable.getSelectedIndices(); if
				     * (idx == -1) return; var Trkorr =
				     * oTable.getContextByIndex(idx)
				     * .getObject().Trkorr;
				     */

				    var idx = oTable.getSelectedIndices();
				    if (idx == -1)
					return;

				    var Trkorr = '';
				    var Trkorrs = [];
				    idx.forEach(function(item, i, idx) {
					var usin = oTable.getContextByIndex(
						item).getObject();
					if (Trkorr === "") {
					    Trkorr = usin.Trkorr;
					} else {
					    Trkorr = Trkorr + ', '
						    + usin.Trkorr
					}

					Trkorrs.push(usin.Trkorr);
				    });

				    oDontPush(Trkorrs, Trkorr);

				},
			    });
			    notMigrationButton.addStyleClass("myErrorButton");
			    buttons.push(notMigrationButton);

			    var passTest = new sap.m.Button({

				icon : "sap-icon://sys-enter-2",
				tooltip : "Прошел предпрод",
				enabled : false,
				press : function() {

				    // var idx = oTable.getSelectedIndex();
				    var idx = oTable.getSelectedIndices();
				    if (idx == -1)
					return;
				    var Trkorr = {};
				    Trkorr = oTable.getContextByIndex(idx)
					    .getObject();
				    openPushDialog(Trkorr);
				},

			    });
			    passTest.addStyleClass("myDoneButton");
			    buttons.push(passTest);

			}

			var forceButton = new sap.m.Button({

			    icon : "sap-icon://alert",
			    enabled : false,
			    visible : false,
			    tooltip : "Принудительный перенос",
			    press : function() {

				// var idx = oTable.getSelectedIndex();
				var idx = oTable.getSelectedIndices();
				if (idx == -1)
				    return;
				// var Trkorr =
				// oTable.getContextByIndex(idx).getObject().Trkorr;
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

				openForceDialog(Trkorrs, Trkorr);
			    },

			});
			forceButton.addStyleClass("myAlertButton");

			if (check == "true") {

			    forceButton.setVisible(true);

			}
			buttons.push(forceButton);

			var searchBox = new sap.m.SearchField({
			    Id : "search",
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

			var TestToolBar = new sap.m.Toolbar({

			    busy : false, // boolean
			    busyIndicatorDelay : 1000, // int
			    visible : true, // boolean
			    active : false, // boolean
			    enabled : true, // boolean
			    design : sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign,
			    // since 1.16.8
			    content : [

			    refreshButton, new sap.m.ToolbarSeparator(),
				    numbersButton,
				    new sap.m.ToolbarSeparator(), watchButton,
				    historyButton, new sap.m.ToolbarSeparator()

			    ], // sap.ui.core.Control
			});

			for (var i = 0; i < buttons.length; i++) {

			    var item = buttons[i];
			    TestToolBar.addContent(item);

			}

			TestToolBar.addContent(new sap.m.ToolbarSpacer());
			TestToolBar.addContent(searchBox);

			var oTable = new sap.ui.table.Table(
				tableId,
				{

				    height : "100%",
				    rowHeight : heightRow,
				    visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Auto,
				    selectionBehavior : sap.ui.table.SelectionBehavior.Row,
				    selectionMode : sap.ui.table.SelectionMode.MultiToggle,
				    enableColumnReordering : true,
				    sort : function(oEvent) {
					oEvent.getSource().rerender();
				    },

				    toolbar : [

				    TestToolBar,

				    ],
				});

			// var check = this.oStorage.get("IDCheck");

			oTable.attachRowSelectionChange(function(oEvent) {

			    var quantitySelectedRows = oTable
				    .getSelectedIndices().length; // получаем
			    // длину
			    // массива
			    (quantitySelectedRows >= 1) ? numbersButton
				    .setEnabled(true) : numbersButton
				    .setEnabled(false);

			    switch (typeTable) {

			    case 'for':

				if (quantitySelectedRows > 1
					|| quantitySelectedRows == 0) {

				    watchButton.setEnabled(false);
				    historyButton.setEnabled(false);
				    if (quantitySelectedRows == 0) {

					doneButton.setEnabled(false);

				    } else {

					doneButton.setEnabled(true);

				    }
				    // forceButton.setEnabled(false);

				} else {

				    watchButton.setEnabled(true);
				    historyButton.setEnabled(true);
				    doneButton.setEnabled(true);
				    forceButton.setEnabled(true);

				}

				break;

			    case 'approve':

				if (quantitySelectedRows > 1
					|| quantitySelectedRows == 0) {

				    watchButton.setEnabled(false);
				    historyButton.setEnabled(false);
				    errorButtonUnlock.setEnabled(false);
				    // forceButton.setEnabled(false);

				} else {

				    watchButton.setEnabled(true);
				    historyButton.setEnabled(true);
				    errorButtonUnlock.setEnabled(true);
				    forceButton.setEnabled(true);

				}

				break;

			    case 'into':

				if (quantitySelectedRows > 1
					|| quantitySelectedRows == 0) {

				    watchButton.setEnabled(false);
				    historyButton.setEnabled(false);
				    passTest.setEnabled(false);
				    errorButton.setEnabled(false);
				    // notMigrationButton.setEnabled(false);
				    // forceButton.setEnabled(false);

				} else {

				    watchButton.setEnabled(true);
				    historyButton.setEnabled(true);
				    passTest.setEnabled(true);
				    errorButton.setEnabled(true);
				    notMigrationButton.setEnabled(true);
				    forceButton.setEnabled(true);

				}

				break;

			    }
			});

			if (typeTable == 'into') {
			    // new sap.ui.commons.Image ---- для
			    // пользовательских изображений

			    var oControl = new sap.ui.core.Icon({

				src : "{Icon}",
				color : "#cc0303!important;",

			    });
			    oTable.addColumn(new sap.ui.table.Column({

				width : "35px",
				template : oControl
			    }));

			}

			var oControl = new sap.ui.commons.TextField()
				.bindProperty("value", "Trkorr").setEditable(
					false); // short binding notation
			oTable.addColumn(new sap.ui.table.Column({
			    sortProperty : "Trkorr",
			    label : new sap.ui.commons.Label({
				text : "Номер"
			    }),
			    width : "100px",
			    template : oControl

			}));

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
			    sortProperty : "CreateDate",
			    label : new sap.ui.commons.Label({
				text : "Добавлен"
			    }),
			    width : "150px",
			    template : oControl

			}));

			var oGroupField = new sap.ui.commons.TextView()
				.bindProperty("text", {

				    parts : [

				    {
					path : "TuskNumber"
				    }, {
					path : "Version"
				    }, {
					path : "Description"
				    }

				    ],

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
			    sortProperty : "Trfunction",
			    width : "13%",
			    label : new sap.ui.commons.Label({
				text : "Тип"
			    }),
			    template : oControl

			}));

			oControl = new sap.ui.commons.TextView({
			    text : "{CreatorLogin}"
			});
			oTable.addColumn(new sap.ui.table.Column({
			    sortProperty : "CreatorLogin",
			    label : new sap.ui.commons.Label({
				text : "Добавил"
			    }),
			    width : "13%",
			    template : oControl

			}));

			if (typeTable == 'into') {

			    oControl = new sap.ui.commons.TextView({
				text : "{TestComment}"
			    });
			    oTable.addColumn(new sap.ui.table.Column({
				sortProperty : "TestComment",
				label : new sap.ui.commons.Label({
				    text : "Ком. к тестированию"
				}),
				width : "13%",
				template : oControl

			    }));
			    oControl = new sap.ui.commons.TextView({
				text : "{WikiLink}"
			    });
			    oTable.addColumn(new sap.ui.table.Column({
				sortProperty : "WikiLink",
				label : new sap.ui.commons.Label({
				    text : "Ссылка на WIKI"
				}),
				width : "13%",
				template : oControl

			    }));

			    oControl = new sap.ui.commons.TextView({
				text : "{SpecLink}"
			    });
			    oTable.addColumn(new sap.ui.table.Column({
				sortProperty : "SpecLink",
				width : "0px",
				flexible : false,
				template : oControl

			    }));
			}

			var oModel = new sap.ui.model.odata.v2.ODataModel(link,
				{

				    useBatch : false,
				    defaultUpdateMethod : "Put"

				});
			oModel.setSizeLimit(500);
			sap.ui.getCore().setModel(oModel);
			oTable.setModel(oModel);

			var oFilterInTest = new sap.ui.model.Filter(
				"StatusCode", sap.ui.model.FilterOperator.EQ,
				'05');
			var oFilterTestApprove = new sap.ui.model.Filter(
				"StatusCode", sap.ui.model.FilterOperator.EQ,
				'06');
			var oFilterTest = new sap.ui.model.Filter("StatusCode",
				sap.ui.model.FilterOperator.EQ, '07');

			switch (typeTable) {

			case 'for':
			    oTable.bindRows("/Query_registrySet", undefined,
				    undefined, [ oFilterInTest ]);
			    break;

			case 'approve':
			    oTable.bindRows("/Query_registrySet", undefined,
				    undefined, [ oFilterTestApprove ]);
			    break;

			case 'into':
			    oTable.bindRows("/Query_registrySet", undefined,
				    undefined, [ oFilterTest ]);
			    break;

			}

			oTable
				.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
			oTable.setVisibleRowCount(calcRowCount());
			oTable
				.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);

			// oTable.bindRows("/Query_registrySet",undefined,undefined,
			// [oFilter]);

			// oTable.bindRows("/Query_registrySet");
			oTable.placeAt("content");

			function calcRowCount() {
			    var height = document.documentElement.clientHeight - 243;// .style.height;
			    // height = height - 243;

			    return ~~(height / heightRow);
			}

			function pushApprove() {

			    var array = [];

			    for (var i = 0; i < oTable.getSelectedIndices().length; i++) {

				array.push(oTable.getContextByIndex(
					oTable.getSelectedIndices()[i])
					.getObject().Trkorr);

			    }
			    ;

			    var oModelApproveBeforeProd = new sap.ui.model.odata.v2.ODataModel(
				    link,
				    {

					defaultUpdateMethod : sap.ui.model.odata.UpdateMethod.Put

				    });

			    var oEntry = {};
			    for (var index = 0; index < array.length; ++index) {

				oEntry.Trkorr = array[index];
				oEntry.StatusCode = "06";
				
				oModelApproveBeforeProd.update(
					"/Query_registrySet('" + oEntry.Trkorr
						+ "')", oEntry);
			
			    };
		

			    oModelApproveBeforeProd
				    .submitChanges({

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

			    oModelApproveBeforeProd
				    .attachRequestCompleted(function() {

					var oModel = new sap.ui.model.odata.v2.ODataModel(
						link, {

						    useBatch : false,
						    defaultUpdateMethod : "Put"

						});
					oModel.setSizeLimit(500);
					sap.ui.getCore().setModel(oModel);
					oTable.setModel(oModel);
					   ConterTextQ();
				    });

			    array = null;
			 
			}
			;

			function openDeleteDialog(Trkorr) {

			    var oDeleteDialog = new sap.ui.commons.Dialog();
			    oDeleteDialog.setTitle("Удаление запроса");
			    var oText = new sap.ui.commons.TextView({
				text : "Вы уверены что хотите удалить запрос?"
			    });
			    oDeleteDialog.addContent(oText);
			    oDeleteDialog
				    .addButton(

				    new sap.ui.commons.Button(
					    {

						text : "Да",
						press : function() {

						    sap.ui
							    .getCore()
							    .getModel()
							    .remove(
								    "/Query_registrySet('"
									    + Trkorr
									    + "')",
								    null,
								    function() {

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
									oDeleteDialog
										.close();
									ConterTextQ();

								    },
								    function() {

									oDeleteDialog
										.close();
									jQuery.sap
										.require("sap.m.MessageBox");
									sap.m.MessageBox
										.error(
											"Произошла ошибка при удалении запроса!",
											{

											    title : "Ошибка"
											});

								    });
						}
					    }));
			    oDeleteDialog.open();

			}

			function openNumbersTrkorrDialog(array) {

			    var oNumbersTrkorrDialog = new sap.m.Dialog({

				title : "Номера запросов",
				textAlign : sap.ui.core.TextAlign.Center,
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

					content : [

					oTableWatch,

					]
				    });

			    oUpdateDialog.addContent(oSimpleForm);
			    oUpdateDialog.open();

			}

			function openPushDialog(Trkorr) {

			    var oPushDialog = new sap.m.Dialog({

				title : "Аудит запроса " + Trkorr.Trkorr

			    });

			    var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				    {

					content : [

					new sap.m.Label({
					    text : "Комментарий к тестировнию",
					}), new sap.m.TextArea({

					    value : Trkorr.TestComment,
					    required : true,
					    cols : 60,

					}),

					new sap.m.Label({
					    text : "Ссылка WIKI",
					}), new sap.m.TextArea({

					    value : Trkorr.WikiLink,
					    required : true,
					    cols : 60,

					}),

					new sap.m.Label({
					    text : "Ссылка Спецификации",
					}), new sap.m.TextArea({

					    value : Trkorr.SpecLink,
					    required : true,
					    cols : 60,

					}), ]

				    });
			    oPushDialog.addContent(oSimpleForm);
			    oPushDialog
				    .addButton(

				    new sap.m.Button(
					    {

						text : "Сохранить",
						press : function() {

						    var content = oSimpleForm
							    .getContent();
						    for ( var i in content) {

							var control = content[i];
							if (control.getValue) {

							    if (control
								    .getValue() === "") {

								control
									.setValueState(sap.ui.core.ValueState.Error);
								return;

							    } else {

								control
									.setValueState(sap.ui.core.ValueState.None);

							    }
							}
						    }
						    var oEntry = {};
						    oEntry.Trkorr = Trkorr.Trkorr;
						    oEntry.StatusCode = "08";
						    oEntry.TestComment = content[1]
							    .getValue();
						    oEntry.WikiLink = content[3]
							    .getValue();
						    oEntry.SpecLink = content[5]
							    .getValue();

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
									    oPushDialog
										    .close();
									    ConterTextQ();

									},
									error : function() {

									    oPushDialog
										    .close();
									    ConterTextQ();
									    jQuery.sap
										    .require("sap.m.MessageBox");
									    sap.m.MessageBox
										    .error(
											    "Ошибка при деблокировании! Смотрите журнал ошибок",
											    {

												title : "Ошибка"
											    });

									}
								    });
						}
					    }));
			    oPushDialog.addButton(

			    new sap.m.Button({

				text : "Закрыть",
				press : function() {

				    oPushDialog.close();

				}
			    }))
			    oPushDialog.open();

			}
			;

			function openForceDialog(Trkorrs, Trkorr) {

			    var TrkorrValue = "";
			    TrkorrValue = Trkorr;

			    var oForceDialog = new sap.m.Dialog({

				title : "Принудительный перенос запроса "
					+ Trkorr

			    });

			    var oComboBox = new sap.ui.commons.ComboBox();
			    oComboBox.setModel(oModel);

			    var itemTemplate = new sap.ui.core.ListItem({

				key : "{Id}",
				text : "{Text}",

			    });

			    oComboBox
				    .bindItems("/Status_codeSet", itemTemplate);

			    var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				    {

					width : "400px",
					content : [

					new sap.ui.commons.Label({
					    text : "Запрос",
					}), new sap.ui.commons.TextView({

					    text : TrkorrValue,
					    editable : false,

					}),

					new sap.ui.commons.Label({
					    text : "Статус запроса",
					}), oComboBox,

					]

				    });
			    oForceDialog.addContent(oSimpleForm);
			    oForceDialog
				    .addButton(new sap.m.Button(
					    {

						text : "Сохранить",
						press : function() {

						    var content = oSimpleForm
							    .getContent();
						    for ( var i in content) {

							var control = content[i];
							if (control.getValue) {

							    if (control
								    .getValue() === "") {

								control
									.setValueState(sap.ui.core.ValueState.Error);
								return;

							    } else {

								control
									.setValueState(sap.ui.core.ValueState.None);

							    }
							}
						    }

						    Trkorrs
							    .forEach(function(
								    item, i,
								    Trkorrs) {
								var oEntry = {};
								oEntry.Trkorr = item;
								oEntry.StatusCode = oComboBox
									.getSelectedKey();

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
											oTable
												.setModel(oModel);
											oForceDialog
												.close();
											ConterTextQ();
											sap.m.MessageToast
												.show("Запрос "
													+ TrkorrValue
													+ " принудительно перенесен!")
													ConterTextQ();

										    },
										    error : function() {

											oForceDialog
												.close();
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
							    });
						}
					    }));
			    oForceDialog.addButton(new sap.m.Button({

				text : "Отмена",
				press : function() {

				    oForceDialog.close();

				}
			    }))
			    oForceDialog.open();

			}
			;

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
					content : [

					oTableWatch,

					]

				    });

			    oUpdateDialog.addContent(oSimpleForm);
			    oUpdateDialog.open();

			}

			function errorUnlocking(Trkorr) {

			    var oEntry = {};
			    oEntry.Trkorr = Trkorr;
			    oEntry.StatusCode = "errorUnlocking";

			    sap.ui
				    .getCore()
				    .getModel()
				    .update(
					    "/Query_registrySet('"
						    + oEntry.Trkorr + "')",
					    oEntry,
					    null,
					    function() {

						var oModel = new sap.ui.model.odata.v2.ODataModel(
							link,
							{

							    useBatch : false,
							    defaultUpdateMethod : "Put"

							});
						oModel.setSizeLimit(500);
						sap.ui.getCore().setModel(
							oModel);
						oTable.setModel(oModel);

					    },
					    function() {

						jQuery.sap
							.require("sap.m.MessageBox");
						sap.m.MessageBox
							.error(
								"Произошла ошибка при смене статуса запроса!",
								{

								    title : "Ошибка"
								});

					    });
			}

			function oTestFail(Trkorr) {

			    var oEntry = {};
			    oEntry.Trkorr = Trkorr;
			    oEntry.Icon = "sap-icon://sys-cancel-2";
			    sap.ui
				    .getCore()
				    .getModel()
				    .update(
					    "/Query_registrySet('"
						    + oEntry.Trkorr + "')",
					    oEntry,
					    null,
					    function() {

						var oModel = new sap.ui.model.odata.v2.ODataModel(
							link,
							{

							    useBatch : false,
							    defaultUpdateMethod : "Put"

							});
						oModel.setSizeLimit(500);
						sap.ui.getCore().setModel(
							oModel);
						oTable.setModel(oModel);

					    },
					    function() {

						jQuery.sap
							.require("sap.m.MessageBox");
						sap.m.MessageBox
							.error(
								"Произошла ошибка при смене статуса запроса!",
								{

								    title : "Ошибка"
								});

					    });
			}

			function oDontPush(Trkorrs, Trkorr) {

			    Trkorrs
				    .forEach(function(item, i, Trkorrs) {
					var oEntry = {};
					oEntry.Trkorr = item;
					oEntry.Icon = "sap-icon://locked";
					sap.ui
						.getCore()
						.getModel()
						.update(
							"/Query_registrySet('"
								+ oEntry.Trkorr
								+ "')",
							oEntry,
							null,
							function() {

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
								ConterTextQ();

							},
							function() {

							    jQuery.sap
								    .require("sap.m.MessageBox");
							    sap.m.MessageBox
								    .error(
									    "Произошла ошибка при смене статуса запроса!",
									    {

										title : "Ошибка"
									    });

							});
				    })
			}

			function Search(oEvent) {

			    var data = oEvent.getSource().getValue();
			    var oFilterSearch = new sap.ui.model.Filter(
				    "Trkorr", sap.ui.model.FilterOperator.EQ,
				    data);

			    switch (typeTable) {

			    case 'for':
				var oFilterStatus = new sap.ui.model.Filter(
					"StatusCode",
					sap.ui.model.FilterOperator.EQ, '05');
				break;

			    case 'approve':
				var oFilterStatus = new sap.ui.model.Filter(
					"StatusCode",
					sap.ui.model.FilterOperator.EQ, '06');
				break;

			    case 'into':
				var oFilterStatus = new sap.ui.model.Filter(
					"StatusCode",
					sap.ui.model.FilterOperator.EQ, '07');
				break;

			    }

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

			return oTable;

		    },

		/**
		 * Similar to onAfterRendering, but this hook is invoked before
		 * the controller's View is re-rendered (NOT before the first
		 * rendering! onInit() is used for that one!).
		 * 
		 * @memberOf queryregistry.Registry.BeforeProdSl
		 */
		// onBeforeRendering: function() {
		//
		// },
		/**
		 * Called when the View has been rendered (so its HTML is part
		 * of the document). Post-rendering manipulations of the HTML
		 * could be done here. This hook is the same one that SAPUI5
		 * controls get after being rendered.
		 * 
		 * @memberOf queryregistry.Registry.BeforeProdSl
		 */
		 changeBar:function(){
			 jQuery.sap.require("jquery.sap.storage");
				this.oStorage = jQuery.sap
					.storage(jQuery.sap.storage.Type.local);
			 var link = this.oStorage.get("IDSystemLink");
			 var oModel =  new sap.ui.model.odata.ODataModel(link,false);
				var tabBar= sap.ui.getCore().byId("TabBar");
			    var itemsBar = tabBar.getItems();
			    var oJsonModel = new sap.ui.model.json.JSONModel();
			    


			           
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
		                          
		                          var aFltDEQQQ = [new sap.ui.model.Filter({
		                          	  path: "StatusCode",
		                          		operator: sap.ui.model.FilterOperator.EQ,
		                          		value1: '07'
		                        	}),
		                        ];
		                                             
		                              var oJsonModelDEQQQ = new sap.ui.model.json.JSONModel();
		                              oModel.read("/Query_registrySet", {
		                            	  filters: aFltDEQQQ,
		                            	  async:false,
		                                  success: function(oData, response) {
		                                	  oJsonModelDEQQQ.setData(oData);
		                                   }
		                              });
			         	      	  
		                             
			      itemsBar[0].setText("К переносу в DEQ "+ "("+oJsonModelDEQ.oData.results.length+")");
			      itemsBar[1].setText("Перенос в DEQ одобрен "+ "("+oJsonModelDEQQ.oData.results.length+")");
			      itemsBar[2].setText("в DEQ "+ "("+oJsonModelDEQQQ.oData.results.length+")");
		 },
		 onInit: function() {
			 this.changeBar();

		 },
		/**
		 * Called when the Controller is destroyed. Use this one to free
		 * resources and finalize activities.
		 * 
		 * @memberOf queryregistry.Registry.BeforeProdSl
		 */
		// onExit: function() {
		//
		// }
		});