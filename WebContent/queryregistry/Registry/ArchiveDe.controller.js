sap.ui
	.controller(
		"queryregistry.Registry.ArchiveDe",
		{

		    createTable : function(tableId, oController, view,
			    typeTable) {

			var heightRow = 35;

			jQuery.sap.require("jquery.sap.storage");
			this.oStorage = jQuery.sap
				.storage(jQuery.sap.storage.Type.local);
			var link = this.oStorage.get("IDSystemLink");

			var refreshButton = new sap.m.Button(
				{
				    icon : "sap-icon://refresh",
				    tooltip : "Обновить",
				    press : function() {
					var oModel = new sap.ui.model.odata.v2.ODataModel(
						link, false);
					oModel.setSizeLimit(500);
					sap.ui.getCore().setModel(oModel);
					oTable.setModel(oModel);
					// oModel.refresh(true);
				    }
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
				    historyButton, new sap.m.ToolbarSpacer(),
				    searchBox ], // sap.ui.core.Control
			});

			var oTable = new sap.ui.table.Table(
				tableId,
				{
				    height : "100%",
				    rowHeight : heightRow,
				    visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Auto,
				    // visibleRowCount: 100,
				    enableCellFilter : true,
				    // enableCustomFilter: true,
				    selectionBehavior : sap.ui.table.SelectionBehavior.Row,
				    selectionMode : sap.ui.table.SelectionMode.MultiToggle,
				    enableColumnReordering : false,
				    enableSelectAll : true,
				    sort : function(oEvent) {
					oEvent.getSource().rerender();
				    },
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
			    } else {

				watchButton.setEnabled(true);
				historyButton.setEnabled(true);

			    }
			    (quantitySelectedRows >= 1) ? numbersButton
				    .setEnabled(true) : numbersButton
				    .setEnabled(false);
			});

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
			    // sorted: true,
			    sortProperty : "CreateDate",
			    // filterProperty: "CreateDate",
			    // filterOperator : "Contains",
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
			    // sorted: true,
			    // sortProperty: "text",
			    // filterProperty: "text",
			    // filterOperator : "Contains",
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
			    // id: "CreatorLogin",
			    label : new sap.ui.commons.Label({
				text : "Добавил"
			    }),
			    sortProperty : "CreatorLogin",
			    width : "120px",
			    template : oControl
			}));

			oControl = new sap.ui.commons.TextView({
			    text : "{ProdDate}"
			});
			oTable.addColumn(new sap.ui.table.Column({
			    label : new sap.ui.commons.Label({
				text : "Перенесен в прод"
			    }),
			    sortProperty : "ProdDate",
			    width : "150px",
			    template : oControl
			}));

			oControl = new sap.ui.commons.TextView({
			    text : {
				path : "ReleaseDate",
				type : new sap.ui.model.type.DateTime({
				    pattern : "dd-MM-yyyy HH:mm:ss",
				    UTC : true
				})

			    }
			});
			oTable.addColumn(new sap.ui.table.Column({
			    label : new sap.ui.commons.Label({
				text : "Релиз"
			    }),
			    sortProperty : "ReleaseDate",
			    width : "150px",
			    template : oControl
			}));

			var oModel = new sap.ui.model.odata.v2.ODataModel(link,
				{

				    useBatch : false,
				    defaultUpdateMethod : "Put"

				});

			sap.ui.getCore().setModel(oModel);
			oTable.setModel(oModel);

			var oFilter = new sap.ui.model.Filter("StatusCode",
				sap.ui.model.FilterOperator.EQ, '12');

			// var _oSorter = new
			// sap.ui.model.Sorter(this.getSortProperty(),
			// this.getSortOrder() ===
			// sap.ui.table.SortOrder.Descending);
			//
			// var aSorters = [];
			// aSorters.push(this._oSorter);

			// var oSorter = new sap.ui.model.Sorter( {
			// path : 'CreatorLogin',
			//			
			// });

			// oTable.bindRows({
			// path: "/Query_registrySet",
			// parameters: {
			// filter: [oFilter],
			// sorter: [oSorter]
			// }
			// }); // bind the table rows

			oTable.bindRows("/Query_registrySet", undefined,
				undefined, [ oFilter ]);

			oTable
				.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
			oTable.setVisibleRowCount(calcRowCount());
			oTable
				.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);
			// oTable.sort(oTable.getColumns()[2]);

			// oTable.getBinding("rows").sort(aSorters);
			// oTable.bindRows("/Query_registrySet");
			oTable.placeAt("content");

			function calcRowCount() {
			    var height = document.documentElement.clientHeight - 243;
			    // .style.height;
			    // height = height - 243;

			    return ~~(height / heightRow);
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
				    sap.ui.model.FilterOperator.EQ, '12');
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

			// oTable.sort(sap.ui.getCore( ).byId('CreatorLogin'),
			// sap.ui.table.SortOrder.Ascending);
			return oTable;
		    },

		});