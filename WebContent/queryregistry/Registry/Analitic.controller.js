sap.ui
		.controller(
				"queryregistry.Registry.Analitic",
				{

					onInit : function() {

						jQuery.sap.require("jquery.sap.storage");
						this.oStorage = jQuery.sap
								.storage(jQuery.sap.storage.Type.local);
						var link = this.oStorage.get("IDSystemLink");

						var oModel = new sap.ui.model.odata.v2.ODataModel(link,
								false);
						oModel.setSizeLimit(500);
						sap.ui.getCore().setModel(oModel);
						

						var MBox = sap.ui.getCore().byId("MBox");
						MBox.setModel(oModel);
						MBox.bindItems({
							path : "/PersInfoSet",
							template : new sap.ui.core.ListItem({
								key : "{Uname}",
								text : "{FullName}",
							}),
						});

						MBox.attachSelectionFinish(function(oControlEvent) {
							var arrayPersEmail = [];
							var items = MBox.getSelectedKeys();
// if (items !== null) {
// sap.ui.getCore().byId("DRS2")
// .setDateValue(null);
// sap.ui.getCore().byId("DRS2")
// .setSecondDateValue(null)
// }

						})
					},

					createTable : function(tableId, oController, view,
							typeTable) {

						jQuery.sap.require("jquery.sap.storage");
						this.oStorage = jQuery.sap
								.storage(jQuery.sap.storage.Type.local);
						var link = this.oStorage.get("IDSystemLink");

						var Table = sap.ui.getCore().byId(tableId);

						if (typeof (Table) == "undefined") {
							var oTable = new sap.ui.table.Table(
									tableId,
									{
										height : "100%",
										rowHeight : 35,
										visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Auto,
										selectionBehavior : sap.ui.table.SelectionBehavior.Row,
										selectionMode : sap.ui.table.SelectionMode.None,
										 sort: function(oEvent){
									        	oEvent.getSource().rerender( );
									        },
										enableColumnReordering : false,
										extension: [
											new sap.m.Text({
												text: "Перенесено в T",
											}
													),
													new sap.m.Text({
														text: "Перенесено в Q",
													}
															),
															new sap.m.Text({
																text: "Перенесено в продуктив",
															}
																	)
										]
									});

							var oControl = new sap.ui.commons.TextView({
								text : "{Creatername}"
							});
							oTable.addColumn(new sap.ui.table.Column({
								label : new sap.ui.commons.Label({
									text : "Сотрудник"
								}),
								sortProperty : "Creatername",
								width : "20%",
								template : oControl,
							}));
							
							
							jQuery.sap.require("sap.ui.core.format.DateFormat");	
							oControl = new sap.ui.commons.TextView({
								text: {
								path: "Createdate1",
								type: new sap.ui.model.type.DateTime({
								pattern: "dd-MM-yyyy",
								UTC: true })

								}
							});
							
							
							oTable.addColumn(new sap.ui.table.Column({
								label : new sap.ui.commons.Label({
									text : "Дата c"
								}),
								width : "8%",
								template : oControl,
							}));
							
							jQuery.sap.require("sap.ui.core.format.DateFormat");	
							oControl = new sap.ui.commons.TextView({
								text: {
								path: "Enddate1",
								type: new sap.ui.model.type.DateTime({
								pattern: "dd-MM-yyyy",
								UTC: true })

								}
							});
						
							oTable.addColumn(new sap.ui.table.Column({
								label : new sap.ui.commons.Label({
									text : "Дата по"
								}),
								width : "8%",
								template : oControl,
							}));
							
							

//							var oControl = new sap.ui.commons.TextView({
//								text : "{Create}"
//							});
//							oTable.addColumn(new sap.ui.table.Column({
//								label : new sap.ui.commons.Label({
//									text : "Всего создано"
//								}),
//								sortProperty : "Create",
//								width : "5%",
//								template : oControl,
//							}));
							
							

							oControl = new sap.m.FlexBox(
									{
										height : "1rem",
										width : "100%",
										items : [ new sap.suite.ui.microchart.StackedBarMicroChart(
												{
													size : "Responsive",
													maxValue : "{MaxValue}",
													// precision : 0,
													bars : [
															new sap.suite.ui.microchart.StackedBarMicroChartBar(
																	{
//																		valueColor: "rgb(182, 217, 87)",
																		value : "{StatT}"
																	}),
															new sap.suite.ui.microchart.StackedBarMicroChartBar(
																	{
																		// valueColor
																		// :
																		// "Neutral",
//																		valueColor: "rgb(250, 195, 100)",
																		value : "{StatQ}"
																	}),
															new sap.suite.ui.microchart.StackedBarMicroChartBar(
																	{
																		// valueColor
																		// :
																		// "Good",
//																		valueColor: "rgb(92, 186, 230)",
																		value : "{Stat1}"
																	}) ]
												}) ]

									})

							oTable.addColumn(new sap.ui.table.Column({
								label : new sap.ui.commons.Label({
									text : "Запросы"
								}),
								width : "64%",
								template : oControl,
							}));
						} else {
							
							oTable = Table;

						}
						;

						var oModel = new sap.ui.model.odata.v2.ODataModel(link,
								false);

						sap.ui.getCore().setModel(oModel);
						
						oTable.setModel(oModel);
						
						oModel.attachRequestCompleted(function(oEvent) {
							busyDialogLoad.close()
						});
						//		
						var drs1 = sap.ui.getCore().byId("DRS1");
						var drs2 = sap.ui.getCore().byId("DRS2");

						var oFilterDate1 = new sap.ui.model.Filter(
								"Createdate1", sap.ui.model.FilterOperator.EQ,
								drs1.getDateValue());
						var oFilterDate2 = new sap.ui.model.Filter("Enddate1",
								sap.ui.model.FilterOperator.EQ, drs1
										.getSecondDateValue());

						var oFilterDate3 = new sap.ui.model.Filter(
								"Createdate2", sap.ui.model.FilterOperator.EQ,
								drs2.getDateValue());
						var oFilterDate4 = new sap.ui.model.Filter("Enddate2",
								sap.ui.model.FilterOperator.EQ, drs2
										.getSecondDateValue());

						var MBox = sap.ui.getCore().byId("MBox");
						var strPersEmail = '';
						var arrayPersEmail = [];
						var items = MBox.getSelectedKeys();

						for (var i = 0; i < items.length; i++) {
							var item = items[i];
							arrayPersEmail.push(item);
							strPersEmail += arrayPersEmail[i] + " ";
						}

						var pers = new sap.ui.model.Filter("FILTERSOTR",
								sap.ui.model.FilterOperator.EQ, strPersEmail);

						oTable.bindRows("/STATSet", undefined, undefined, [
								oFilterDate1, oFilterDate2, oFilterDate3,
								oFilterDate4, pers ]);
						
						
						
						
						oTable.getExtension()[0].addStyleClass("myColorT");
						oTable.getExtension()[1].addStyleClass("myColorQ");
						oTable.getExtension()[2].addStyleClass("myColor1");
						

						this.getView().getContent()[0].addContent(oTable);
// this.getView().rerender();

					}

				});