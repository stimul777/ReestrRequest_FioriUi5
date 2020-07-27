sap.ui
	.controller(
		"queryregistry.Registry.DevelopDe",
		{

		    /**
		     * Called when a controller is instantiated and its View
		     * controls (if available) are already created. Can be used
		     * to modify the View before it is displayed, to bind event
		     * handlers and do other one-time initialization.
		     * 
		     * @memberOf queryregistry.Registry.DevelopSl
		     */

			// "idNew",
			createTable: function (tableId, oController, view,
				typeTable) {
				// view.setHeight("100%");

				var heightRow = 35;

				jQuery.sap.require("jquery.sap.storage");
				this.oStorage = jQuery.sap
					.storage(jQuery.sap.storage.Type.local);
				var check = this.oStorage.get("IDCheck");
				var link = this.oStorage.get("IDSystemLink");

				busyDialog = new sap.m.BusyDialog({

					text: "Загрузка данных...",
					showCancelButton: false

				});

				var refreshButton = new sap.m.Button(
					{

						icon: "sap-icon://refresh",
						tooltip: "Обновить",
						press: function () {

							var oModel = new sap.ui.model.odata.v2.ODataModel(
								link, {

								useBatch: false,
								defaultUpdateMethod: "Put"

							});
							oTable.getModel().refresh(true);
							oTable.rerender();
							// oModel.setSizeLimit(500);
							// sap.ui.getCore().setModel(oModel);
							// oTable.setModel(oModel);
							ConterText0();
						}
					});
				refreshButton.addStyleClass("myRefreshButton");


				var addButton = new sap.m.Button({
					icon: "sap-icon://add",
					text: "Добавить",
					tooltip: "Добавить",
					title: "Добавить",
					press: function () {
						busyDialog.open();
						openCreateDialog();

					}
				});

				var editButton = new sap.m.Button({

					icon: "sap-icon://edit",
					text: "Изменить",
					tooltip: "Изменить",
					enabled: false,
					press: function () {

						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						var Trkorr = {};
						Trkorr = oTable.getContextByIndex(idx)
							.getObject();
						openUpdateDialog(Trkorr);
					},

				});

				var deleteButton = new sap.m.Button({

					icon: "sap-icon://decline",
					text: "Удалить",
					tooltip: "Удалить запрос",
					enabled: false,
					press: function () {
						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						var ReleaseType = oTable.getContextByIndex(idx).getObject().Trkorr;
						openDeleteDialog(ReleaseType);

					},

				});

				var numbersButton = new sap.m.Button({

					icon: "sap-icon://approvals",
					tooltip: "Номера запросов",
					enabled: false,
					press: function () {

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

					icon: "sap-icon://display",
					tooltip: "Просмотр",
					enabled: false,
					press: function () {

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

					icon: "sap-icon://work-history",
					tooltip: "История запроса",
					enabled: false,
					press: function () {

						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						var Trkorr = oTable.getContextByIndex(idx)
							.getObject().Trkorr;
						history(Trkorr);

					},
				});

				function ConterText0() {

					var listServer = sap.ui.getCore().byId("listServer");
					var listServerItems = listServer.getItems();
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
// START фильтр по системе ландшафтра 22.01.2020 yydevlyashovvv
					var aFltSysName = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '03'
					}),
					];
// END
					var oModel = new sap.ui.model.odata.ODataModel(link, false);


					// START фильтр по системе ландшафтра 22.01.2020 yydevlyashov
					oModel.read("/GetCopyableRequests", {
						// filters: aFltSysName,
						async: false,
						success: function (oData, response) {
							oJsonModel.setData(oData);
						}
					});
					// END

					oModel.read("/Query_registrySet", {
						filters: aFltDET,
						async: false,
						success: function (oData, response) {
							oJsonModel.setData(oData);
						}
					});

					var oJsonModelT = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDETT,
						async: false,
						success: function (oData, response) {
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
						async: false,
						success: function (oData, response) {
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
						async: false,
						success: function (oData, response) {
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
						async: false,
						success: function (oData, response) {
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
						async: false,
						success: function (oData, response) {
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
						async: false,
						success: function (oData, response) {
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
						async: false,
						success: function (oData, response) {
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
						async: false,
						success: function (oData, response) {
							oJsonModelArchive.setData(oData);
						}
					});


					var listNotBlockedobj = [];
					if (oJsonModelJournal.oData.results.length > 0) {
						oJsonModelJournal.oData.results.forEach(function (item, i, parseListModel) {
							if (item.Icon == "") {
								listNotBlockedobj.push(item);
							}
						});
					}

					listServerItems[0].setTitle("DE0 " + "(" + oJsonModelDE0.oData.results.length + ")");
					listServerItems[1].setTitle("DET " + "(" + oJsonModel.oData.results.length + "/" + oJsonModelT.oData.results.length + ")");
					listServerItems[2].setTitle("DEQ " + "(" + oJsonModelDEQ.oData.results.length + "/" + oJsonModelDEQQ.oData.results.length + ")");
					listServerItems[3].setTitle("DE1 " + "(" + oJsonModelDE1.oData.results.length + "/" + oJsonModelDE11.oData.results.length + ")");
					listServerItems[4].setTitle("Журнал ошибок " + "(" + listNotBlockedobj.length + ")");
					listServerItems[5].setTitle("Архив " + "(" + oJsonModelArchive.length + ")");
				}

				var doneButton = new sap.m.Button({

					icon: "sap-icon://sys-enter-2",
					tooltip: "Готов к тесту",
					// type: sap.m.ButtonType.Accept,
					enabled: false,
					press: function () {
						push();

					},
				});
				doneButton.addStyleClass("myDoneButton");

				var forceButton = new sap.m.Button({

					icon: "sap-icon://alert",
					enabled: false,
					visible: false,
					tooltip: "Принудительный перенос",
					press: function () {
						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						// var Trkorr =
						// oTable.getContextByIndex(idx).getObject().Trkorr
						var Trkorr = '';
						var Trkorrs = [];
						idx.forEach(function (item, i, idx) {
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

				var searchBox = new sap.m.SearchField({

					enabled: true,
					visible: true,
					maxLength: 0,
					placeholder: "Текст для поиска...",
					showRefreshButton: false,
					width: "15rem",
					search: function (oEvent) {

						Search(oEvent);

					},
				});

				var devToolBar = new sap.m.Toolbar({

					busy: false, // boolean
					busyIndicatorDelay: 1, // int
					visible: true, // boolean
					active: false, // boolean
					enabled: true, // boolean
					design: sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign,
					// since
					// 1.16.8
					content: [

						refreshButton, new sap.m.ToolbarSeparator(),
						addButton, editButton, deleteButton,
						new sap.m.ToolbarSeparator(),
						numbersButton,
						new sap.m.ToolbarSeparator(), watchButton,
						historyButton,
						new sap.m.ToolbarSeparator(), doneButton,
						forceButton, new sap.m.ToolbarSpacer(),
						searchBox

					], // sap.ui.core.Control
				});

				var oTable = new sap.ui.table.Table(
					tableId,
					{

						height: "100%",
						rowHeight: heightRow,
						visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
						selectionBehavior: sap.ui.table.SelectionBehavior.Row,
						selectionMode: sap.ui.table.SelectionMode.MultiToggle,
						enableColumnReordering: true,
						enableSelectAll: true,
						sort: function (oEvent) {
							oEvent.getSource().rerender();
						},
						toolbar: [

							devToolBar,

						],
					});

				var check = this.oStorage.get("IDCheck");

				if (check == "false") {

					deleteButton.setVisible(false);

				}

				oTable.attachRowSelectionChange(function (oEvent) {

					var quantitySelectedRows = oTable
						.getSelectedIndices().length; // получаем
					// длину
					// массива
					if (quantitySelectedRows > 1
						|| quantitySelectedRows == 0) {

						if (quantitySelectedRows == 0) {

							doneButton.setEnabled(false);

						} else {

							doneButton.setEnabled(true);

						}
						editButton.setEnabled(false);
						watchButton.setEnabled(false);
						historyButton.setEnabled(false);
						deleteButton.setEnabled(false);
						// forceButton.setEnabled(false);

					} else {

						if (check == "false") {

							deleteButton.setVisible(false);
							// forceButton.setEnabled(false);

						} else {

							editButton.setEnabled(true);
							deleteButton.setEnabled(true);
							forceButton.setEnabled(true);

						}
						doneButton.setEnabled(true);
						editButton.setEnabled(true);
						watchButton.setEnabled(true);
						historyButton.setEnabled(true);
						forceButton.setEnabled(true);

					}
					// (quantitySelectedRows >= 1 )?
					// deleteButton.setEnabled(true):
					// deleteButton.setEnabled(false);
					(quantitySelectedRows >= 1) ? numbersButton
						.setEnabled(true) : numbersButton
							.setEnabled(false);

				});

				// var oTableUsers = new
				// sap.ui.table.Table("oTableUsers");

				var oControl = new sap.ui.commons.TextField()
					.bindProperty("value", "Trkorr").setEditable(
						false); // short binding notation
				oTable.addColumn(new sap.ui.table.Column({

					label: new sap.ui.commons.Label({
						text: "Номер"
					}),
					sortProperty: "Trkorr",
					width: "100px",
					template: oControl,

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
				
				oControl = new sap.ui.commons.TextView({

					text: {

						path: "CreateDate",
						type: new sap.ui.model.type.DateTime({

							pattern: "dd-MM-yyyy HH:mm:ss",
							UTC: true

						})
					}
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "CreateDate",
					label: new sap.ui.commons.Label({
						text: "Добавлен"
					}),
					width: "150px",
					template: oControl

				}));

				var oGroupField = new sap.ui.commons.TextView()
					.bindProperty("text", {

						parts: [

							{
								path: "TuskNumber"
							}, {
								path: "Version"
							}, {
								path: "Description"
							}

						],

						formatter: function (TuskNumber, Version,
							Description) {

							return TuskNumber + "-" + Version
								+ ": " + Description;

						}

					});
				oTable.addColumn(new sap.ui.table.Column({

					label: "Описание",
					template: oGroupField

				}));

				oControl = new sap.ui.commons.TextView({
					text: "{Trfunction}"
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "Trfunction",
					width: "160px",
					label: new sap.ui.commons.Label({
						text: "Тип"
					}),
					template: oControl

				}));

				oControl = new sap.ui.commons.TextView({
					text: "{CreatorLogin}"
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "CreatorLogin",
					width: "120px",
					label: new sap.ui.commons.Label({
						text: "Добавил"
					}),
					template: oControl

				}));

				oControl = new sap.ui.commons.TextView({
					text: "{TuskNumber}"
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "TuskNumber",
					width: "0px",
					flexible: false,
					template: oControl

				}));

				oControl = new sap.ui.commons.TextView({
					text: "{Version}"
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "Version",
					width: "0px",
					flexible: false,
					template: oControl

				}));

				oControl = new sap.ui.commons.TextView({
					text: "{Description}"
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "Description",
					width: "0px",
					flexible: false,
					template: oControl

				}));

				var oModel = new sap.ui.model.odata.v2.ODataModel(link,
					{

						useBatch: false,
						defaultUpdateMethod: "Put",
					});
				oModel.setSizeLimit(500);
				sap.ui.getCore().setModel(oModel);
				oTable.setModel(oModel);

				var oFilter = new sap.ui.model.Filter("StatusCode",
					sap.ui.model.FilterOperator.EQ, '01');

				oTable.bindRows("/Query_registrySet", undefined,
					undefined, [oFilter]);

				oTable
					.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
				oTable.setVisibleRowCount(calcRowCount());
				oTable
					.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);

				function calcRowCount() {
					var height = document.documentElement.clientHeight - 243;// .style.height;
					// height = height - 243;

					return ~~(height / heightRow);
				}
				// START yydevlyashov 
				// трансформация реестра запросов - добавление функционала переноса копий 			
				function changeTypeRequest(oEvent,
					oComboBoxReqFunction,
					oMultiComboBoxRole,
					oMultiComboBoxTransaction,
					CheckBoxEcatt,
					oComboBoxEnvironment,
					oMultiInputRequests,
					descriptionCopyRequest,
					oDropDownBox, ) {
					var selectedKey = oEvent.getSource().getSelectedKey();

					switch (selectedKey) {
						case 'W':
						case 'K':
							oComboBoxReqFunction.setVisible(true);
							oComboBoxReqFunction.setRequired(true),
								oMultiComboBoxRole.setVisible(true);
							oMultiComboBoxTransaction.setVisible(true);
							CheckBoxEcatt.setVisible(true);
							oComboBoxEnvironment.setVisible(false);
							oComboBoxEnvironment.setRequired(false);
							oComboBoxEnvironment.setRequired(true);
							oMultiInputRequests.setVisible(false);//копия запросов
							oMultiInputRequests.setRequired(false); //копия запросов

							oDropDownBox.setVisible(true); //задание

							descriptionCopyRequest.setEditable(true); //yydevlyashov разблок описания 
							break;
						case 'T':
							oDropDownBox.setVisible(false);  //задание
							oDropDownBox.setRequired(false); //задание
							oComboBoxReqFunction.setVisible(false);
							oComboBoxReqFunction.setRequired(false);
							oMultiComboBoxRole.setVisible(false);
							oMultiComboBoxTransaction.setVisible(false);
							CheckBoxEcatt.setVisible(false);
							oComboBoxEnvironment.setVisible(true);
							oComboBoxEnvironment.setRequired(true);
							oMultiInputRequests.setVisible(true);//копия запросов
							oMultiInputRequests.setRequired(true);//копия запросов

							descriptionCopyRequest.setEditable(false); //yydevlyashov блок описания копии запросов 
							break;
					}
				}

				/** ** Create Request **** */
				function openCreateDialog() {
					var self = this;
					var oCreateDialog = new sap.m.Dialog({
						title: "Новый запрос (DE)"
					});

					var oDropDownBox = new sap.m.ComboBox();

					// yydevlyashov трансформация реестра запросов - добавление функционала переноса копий 
					var oDropDownBoxTypeRequest = new sap.m.ComboBox({
						change: function (oEvent) {
							changeTypeRequest(oEvent,
								oComboBoxReqFunction,
								oMultiComboBoxRole,
								oMultiComboBoxTransaction,
								CheckBoxEcatt,
								oComboBoxEnvironment,
								oMultiInputRequests,   // new для копии запросов
								descriptionCopyRequest,  //new описание для копии запросов
								oDropDownBox, //задание
							);
						}
					});

					//new поле "описание" для копии запросов
					var descriptionCopyRequest = new sap.m.TextArea({
						required: true,
						cols: 60,
						height: "125px",
					});
					//end

					var oComboBoxEnvironment = new sap.m.ComboBox({
						visible: false,
					});

					// Фильтр по названию системы ландшафта yydevlyashov
					var aFilterSysName = new sap.ui.model.Filter(
						"Tarsystem",
						sap.ui.model.FilterOperator.EQ,
						"DET"
					);

					// Список  "Запросы для копирования" пользователя для копирования yydevlyashov
					var oMultiInputRequests = new sap.m.ComboBox({
						visible: false,
						items: {
							path: '/GetCopyableRequests',
							// filters: [aFilterSysName],
							template: new sap.ui.core.ListItem({
								key: "{Trkorr}",
								text: "{Trkorr} - {Description}",
							})
						},
						//yydevlyashov 24.10.19 Событие для поля "Копии запросов" (в "описание" подтянется Description (если даст Бог) )
						selectionChange: (oControlEvent) => {
							const item = oMultiInputRequests.getSelectedItem();
							var context = item.getBindingContext();
							const description = context.getProperty("Description", context);
							descriptionCopyRequest.setValue(description);
						},
					});
					//	END	

					var oComboBoxReqFunction = new sap.m.ComboBox();

					var CheckBoxEcatt = new sap.m.CheckBox({
						text: "Запрос для eCATT"
					});

					oDropDownBoxTypeRequest.setModel(oModel);
					oDropDownBox.setModel(oModel);
					oComboBoxReqFunction.setModel(oModel);

					var itemTemplate = new sap.ui.core.ListItem({
						key: "{Id}",
						text: "{Subject}",
						additionalText: "{Id}",
					});

					var itemTemplateTypeRequest = new sap.ui.core.ListItem(
						{
							key: "{DomvalueL}",
							text: "{Ddtext}",
						});
					//			
					var itemTemplateReqFunction = new sap.ui.core.ListItem(
						{
							key: "{Code}",
							text: "{Name}",
						});
					//
					var itemTemplateRole = new sap.ui.core.ListItem({
						text: "{RoleId}",
						additionalText: "{RoleText}"
					});

					var itemTemplateTransaction = new sap.ui.core.ListItem(
						{
							text: "{Tcode}",
							additionalText: "{Ttext}"
						});

					var arrayRole = [];
					var arrayTrans = [];
					var strRole = "";
					var strTrans = "";

					var oMultiComboBoxRole = new sap.m.MultiComboBox({

						items: {
							path: "/RoleSet",
							template: new sap.ui.core.ListItem({
								key: "{RoleId}",
								text: "{RoleId}",
							}),
						},
						selectionFinish: function (oControlEvent) {
							strRole = "";
							var items = oMultiComboBoxRole.getSelectedItems();
							for (var i = 0; i < items.length; i++) {
								var item = items[i];
								var context = item.getBindingContext();
								arrayRole.push(context.getProperty("RoleId", context));
								strRole += arrayRole[i] + " ";
							}
						},
					});

					var oMultiComboBoxTransaction = new sap.m.MultiComboBox(
						{
							items: {
								path: "/TRANSACTIONSet",
								template: new sap.ui.core.ListItem(
									{
										text: "{Tcode}",
									})
							},
							selectionFinish: function (oControlEvent) {
								strTrans = "";
								var items = oMultiComboBoxTransaction.getSelectedItems();
								for (var i = 0; i < items.length; i++) {
									var item = items[i];
									var context = item.getBindingContext();
									arrayTrans.push(context.getProperty("Tcode", context));
									strTrans += arrayTrans[i] + " ";

								}
							},
						});

					oDropDownBox.setShowSecondaryValues(true);
					oDropDownBoxTypeRequest.setShowSecondaryValues(true);
					//
					oComboBoxReqFunction.bindItems("/Function_releasesSet", itemTemplateReqFunction);
					//
					oDropDownBox.bindItems("/TASKSHDSet", itemTemplate);
					oDropDownBoxTypeRequest.bindItems("/TRFUNCTIONSet", itemTemplateTypeRequest);

					oMultiComboBoxTransaction.setModel(oModel);
					oModel.setSizeLimit(1000);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{
							width: "400px",
							content: [

								new sap.m.Label({
									text: "Задание"
								}),
								oDropDownBox.setRequired(true),

								new sap.m.Label({
									text: "Тип запроса"
								}),
								oDropDownBoxTypeRequest.setRequired(true),

								new sap.m.Label({
									text: "Описание"
								}),
								descriptionCopyRequest.setRequired(true),

								new sap.m.Label({
									text: "Функция",
								}),
								oComboBoxReqFunction.setRequired(true),

								new sap.m.Label({
									text: "Роли"
								}), oMultiComboBoxRole,

								new sap.m.Label({
									text: "Транзакции"
								}), oMultiComboBoxTransaction,

								new sap.m.Label({
									text: ""
								}), CheckBoxEcatt,

								new sap.m.Label({
									text: "Запросы для копирования"
								}),
								oMultiInputRequests,//setRequired(false),
							]
						});

					oCreateDialog.addContent(oSimpleForm);
					oModel.attachRequestCompleted(function () {
						busyDialog.close();
					});

					oCreateDialog.addButton(
						new sap.m.Button(
							{
								text: "Сохранить",
								//валидация формы создания:
								press: function () {
									var content = oSimpleForm.getContent();
									for (var i in content) {
										var control = content[i];
										if (control.getValue) {
											if (control.getValue() === "" && control.getRequired() == true) {
												control.setValueState(sap.ui.core.ValueState.Error);
												return;
											}
											else {
												control.setValueState(sap.ui.core.ValueState.None);
											}
										}
									}
									//проверка на чекбокс eCATT 
									var valEcatt = CheckBoxEcatt.getSelected();
									if (valEcatt == true) {
										valEcatt = "Ecatt"
									} else {
										valEcatt = ""
									};


									var CreateBusyDialog = new sap.m.BusyDialog({
										text: "Создание транспортного запроса..."
									});

									// Тип запроса
									var trfunction = oDropDownBoxTypeRequest.getSelectedKey();

									// Если создается "запрос на перенос" копии, то
									if (trfunction === 'T') {
										sap.ui.getCore().getModel().callFunction(
											"/CreateQueryCopy",
											{
												method: "POST",
												urlParameters: {
													Original_trkorr: oMultiInputRequests.getSelectedKey(),
													Tarsystem: "DET",
												},
												success: function (oData, response) {
													CreateBusyDialog.close();
													oCreateDialog.close();
												},
												error: function (oError) {
													CreateBusyDialog.close();
													oCreateDialog.close();
													sap.m.MessageToast.show("Ошибка при создании запроса");
												}
											});
									} else {
										var oEntry = {}; // Параметры запроса
										oEntry.TuskNumber = oDropDownBox.getSelectedKey();
										oEntry.Trfunction = trfunction;
										oEntry.Description = content[7].getValue() + " " + valEcatt + " " + oDropDownBoxTypeRequest.getSelectedKey() + " " + content[5].getValue();
										oEntry.ReqFunction = content[7].getValue();
										oEntry.Roles = strRole;
										oEntry.Transact = strTrans;
										oEntry.Ecatt = CheckBoxEcatt.getSelected();

										sap.ui.getCore().getModel().create('/Query_registrySet', oEntry,
											{
												success: function (oData, response) {
													var oModel = new sap.ui.model.odata.v2.ODataModel(link,
														{
															useBatch: false,
															defaultUpdateMethod: "Put"
														});

													oModel.setSizeLimit(500);
													sap.ui.getCore().setModel(oModel);
													oTable.setModel(oModel);
													CreateBusyDialog.close();
													oCreateDialog.close();
													ConterText0();
												},
												error: function () {
													oCreateDialog.close();
													CreateBusyDialog.close();
													sap.m.MessageToast.show("Ошибка при создании запроса");
												}
											});
									}
									CreateBusyDialog.open();
								}
							}));

					oCreateDialog.addButton(new sap.m.Button({
						text: "Отмена",
						press: function () {
							oCreateDialog.close();
						}
					}))
					oCreateDialog.open();
				};

				/** *** Update Role **** */

				function openUpdateDialog(Trkorr) {
					/*
					 * 
					 * 
					*/
					var arrayRole = [];
					var arrayTrans = [];
					var strRole = "";
					var strTrans = "";
					oModel.setSizeLimit(1000);

					var oUpdateDialog = new sap.m.Dialog({

						title: "Редактирования запроса "
							+ Trkorr.Trkorr

					});
					/* aochetvertko 19.08.2019 start
					* трансформация реестра запросов - добавление функционала переноса копий */
					var oDropDownBox = new sap.m.ComboBox();
					var oDropDownBoxTypeRequest = new sap.m.ComboBox();

					var oComboBoxEnvironment = new sap.m.ComboBox({
						visible: false,
					});
					var oMultiInputRequests = new sap.m.MultiInput({
						visible: false,
					});
					/* aochetvertko 19.08.2019 end */


					var oComboBox = new sap.m.ComboBox({

						value: Trkorr.ReqFunction

					});
					oComboBox.setModel(oModel);

					var res = Trkorr.Roles.split(" ");

					var oMultiComboBoxRole = new sap.m.MultiComboBox({
						selectedKeys: res,
						items: {

							path: "/RoleSet",
							template: new sap.ui.core.ListItem({

								key: "{RoleId}",
								text: "{RoleId}",
								additionalText: "{RoleText}"

							})
						},
						selectionFinish: function (oControlEvent) {

							strRole = "";
							var items = oMultiComboBoxRole
								.getSelectedItems();

							for (var i = 0; i < items.length; i++) {

								var item = items[i];
								var context = item.getBindingContext();
								arrayRole.push(context.getProperty(
									"RoleId", context));
								strRole += arrayRole[i] + " ";
							}
						},
					});

					// strRole = "";
					// var keys = oMultiComboBoxRole.getSelectedKeys();

					// for (var i = 0; i < items.length; i++) {
					//      		
					// var item = items[i];
					// var context = item.getBindingContext();
					// arrayRole.push(context.getProperty("RoleId",context));
					// strRole += arrayRole[i] + " ";
					// }

					var resTr = Trkorr.Transact.split(" ");

					var oMultiComboBoxTransaction = new sap.m.MultiComboBox(
						{
							selectedKeys: resTr,
							items: {

								path: "/TRANSACTIONSet",
								template: new sap.ui.core.ListItem(
									{
										key: "{Tcode}",
										text: "{Tcode}",
										additionalText: "{Ttext}"

									})
							},
							selectionFinish: function (
								oControlEvent) {

								strTrans = "";
								var items = oMultiComboBoxTransaction
									.getSelectedItems();

								for (var i = 0; i < items.length; i++) {

									var item = items[i];
									var context = item
										.getBindingContext();
									arrayTrans.push(context
										.getProperty("Tcode",
											context));
									strTrans += arrayTrans[i] + " ";

								}

							}

						});

					strTrans = Trkorr.Transact;
					strRole = Trkorr.Roles;

					// strTrans = "";
					// var items =
					// oMultiComboBoxTransaction.getSelectedItems();
					//		
					// for (var i = 0; i < items.length; i++) {
					//      		
					// var item = items[i];
					// var context = item.getBindingContext();
					// arrayTrans.push(context.getProperty("Tcode",context));
					// strTrans += arrayTrans[i] + " ";
					//      		
					// }

					var itemTemplate = new sap.ui.core.ListItem({

						key: "{Code}",
						text: "{Name}",

					});

					var textTarsystem = new sap.m.Text({
						text: Trkorr.Tarsystem,
					});
					/* aochetvertko 19.08.2019 start
									* трансформация реестра запросов - добавление функционала переноса копий */
					switch (Trkorr.Trfunction) {
						case 'Настроечный':
						case 'Инструментальный':
							/*
							 * 
							 */
							oComboBox.setVisible(true);
							oMultiComboBoxRole.setVisible(true);
							oMultiComboBoxTransaction.setVisible(true);

							oComboBox.setRequired(true),


								textTarsystem.setVisible(false);
							oMultiInputRequests.setVisible(false);

							oComboBoxEnvironment.setRequired(false);
							oMultiInputRequests.setRequired(false);
							break;
						case 'Перенос копий':
							/*
							 * 
							 */
							oComboBoxReqFunction.setVisible(false); //27.01.20
							oComboBoxReqFunction.setRequired(false); //27.01.20
							oComboBox.setVisible(false);
							oMultiComboBoxRole.setVisible(false);
							oMultiComboBoxTransaction.setVisible(false);

							oComboBox.setRequired(false),

								textTarsystem.setVisible(true);
							oMultiInputRequests.setVisible(true);

							/*	 oComboBoxEnvironment.setRequired(true); */
							oMultiInputRequests.setRequired(true);

							break;
					}
					/* aochetvertko 19.08.2019 end */

					oComboBox.bindItems("/Function_releasesSet",
						itemTemplate);
					oModel.setSizeLimit(1000);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							width: "400px",
							// layout:
							// sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
							content: [

								new sap.m.Label({
									text: "Задача",
								}), new sap.m.Text({

									text: Trkorr.TuskNumber,

								}),

								new sap.m.Label({
									text: "Тип запроса",
								}), new sap.m.Text({

									text: Trkorr.Trfunction,

								}),

								new sap.m.Label({
									text: "Версия",
								}), new sap.m.Text({

									text: Trkorr.Version,

								}),

								new sap.m.Label({
									text: "Описание",
								}), new sap.m.TextArea({
									value: Trkorr.Description,
									cols: 60,

								}),

								new sap.m.Label({
									text: "Функция",
								}), oComboBox.setRequired(),

								new sap.m.Label({
									text: "Роли",
								}), oMultiComboBoxRole,

								new sap.m.Label({
									text: "Транзакции",
								}), oMultiComboBoxTransaction,
								/* aochetvertko 20.08.2019 start
								* трансформация реестра запросов - добавление функционала переноса копий */
								new sap.m.Label({
									text: "Среда"
								}),
								textTarsystem,

								new sap.m.Label({
									text: "Запросы для копирования"
								}),
								oMultiInputRequests.setRequired(true),
								/* aochetvertko 20.08.2019 end */
							]
						}).addStyleClass("sapUiContentPadding");
					oUpdateDialog.addContent(oSimpleForm);



					oUpdateDialog.addButton(new sap.m.Button({
						text: "Сохранить",
						press: function () {
							var content = oSimpleForm.getContent();
							for (var i in content) {
								var control = content[i];
								if (control.getValue) {
									if (control.getValue() === "" && oMultiComboBoxRole.getSelectedKeys === "") {
										control.setValueState(sap.ui.core.ValueState.Error);
										return;
									}
									else {
										control.setValueState(sap.ui.core.ValueState.None);
									}
								};
							};
							var oEntry = {};
							oEntry.Trkorr = Trkorr.Trkorr;
							oEntry.Description = content[7].getValue();
							oEntry.ReqFunction = content[9].getValue();
							oEntry.Roles = strRole;
							oEntry.Transact = strTrans;

							sap.ui.getCore().getModel().update(
								"/Query_registrySet('" + oEntry.Trkorr + "')", oEntry,
								{
									success: function (oData, response) {
										var oModel = new sap.ui.model.odata.v2.ODataModel(
											link,
											{
												useBatch: false,
												defaultUpdateMethod: "Put"
											});
										oModel.setSizeLimit(1000);
										sap.ui.getCore().setModel(oModel);
										oTable.setModel(oModel);
										oUpdateDialog.close();
										sap.m.MessageToast.show("Запрос " + Trkorr.Trkorr + " отредактирован!");
									},

									error: function (oError) {
										oUpdateDialog.close();
										var dialog = new sap.m.Dialog(
											{
												title: "Ошибка",
												type: sap.m.DialogType.Message,
												state: sap.ui.core.ValueState.Error,
												content: new sap.m.Text(
													{
														text: "Произошла ошибка при редактировании запроса " + Trkorr.Trkorr
													}),
												beginButton: new sap.m.Button(
													{
														text: "Ок",
														press: function () {

															dialog.close();
														}
													}),
												afterClose: function () {
													dialog.destroy();
												}
											});
										dialog.open();
									}
								});
						}
					}));


					oUpdateDialog.addButton(new sap.m.Button({

						text: "Отмена",
						press: function () {

							oUpdateDialog.close();

						}
					}));
					oUpdateDialog.open();
				}
				;

				function push() {

					var array = [];

					for (var i = 0; i < oTable.getSelectedIndices().length; i++) {

						array.push(oTable.getContextByIndex(
							oTable.getSelectedIndices()[i])
							.getObject().Trkorr);

					}
					;

					var oModelUpdate = new sap.ui.model.odata.v2.ODataModel(
						link,
						{

							defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.Put

						});

					var oEntry = {};
					for (var index = 0; index < array.length; ++index) {

						oEntry.Trkorr = array[index];
						oEntry.StatusCode = "02";
						oModelUpdate.update("/Query_registrySet('"
							+ oEntry.Trkorr + "')", oEntry);

					}

					oModelUpdate
						.submitChanges({

							error: function () {

								jQuery.sap
									.require("sap.m.MessageBox");
								sap.m.MessageBox
									.error(
										"Произошла ошибка при смене статуса запроса!",
										{

											title: "Ошибка"

										});
							}
						});

					oModelUpdate
						.attachRequestCompleted(function () {

							var oModel = new sap.ui.model.odata.v2.ODataModel(
								link, {

								useBatch: false,
								defaultUpdateMethod: "Put"

							});
							oModel.setSizeLimit(500);
							sap.ui.getCore().setModel(oModel);
							oTable.setModel(oModel);
							ConterText0();
						});

					array = null;

				}

				function openDeleteDialog(Trkorr) {

					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox
						.confirm(
							"Вы уверены что хотите удалить запрос "
							+ Trkorr + " ?",
							{

								title: "Удаление запроса",
								onClose: function (oAction) {

									switch (oAction) {

										case 'OK':

											sap.ui.getCore().getModel().remove("/Query_registrySet('"+ Trkorr + "')",
													{
														success: function () {

															var oModel = new sap.ui.model.odata.v2.ODataModel(
																link,
																{
																	useBatch: false,
																	defaultUpdateMethod: "Put"
																});
															oModel.setSizeLimit(500);
															sap.ui.getCore().setModel(oModel);
															oTable.setModel(oModel);
															sap.m.MessageToast.show("Запрос " + Trkorr + " удален!");
															ConterText0();

														},
														error: function (
															oError) {

															var json = $.parseJSON(oError.responseText);
															var code = json.error.code;

															switch (code) {

																case '01':

																	var dialogErr = new sap.m.Dialog(
																		{

																			title: "Ошибка",
																			type: sap.m.DialogType.Message,
																			state: 'Error',
																			content: new sap.m.Text(
																				{

																					text: 'У Вас недостаточно прав для удаления!',

																				}),
																			beginButton: new sap.m.Button(
																				{

																					text: 'OK',
																					press: function () {

																						dialogErr
																							.close();

																					}
																				}),
																			afterClose: function () {

																				dialogErr
																					.destroy();

																			}
																		});
																	dialogErr
																		.open();
																	dialogErr
																		.addStyleClass("mydialogErr");

																	break;

																// case
																// 'value2':
																// ...
																// break;

																default:

																	var dialog = new sap.m.Dialog(
																		{

																			title: "Ошибка",
																			type: sap.m.DialogType.Message,
																			state: sap.ui.core.ValueState.Error,
																			content: new sap.m.Text(
																				{

																					text: "Произошла ошибка при удалении запроса "
																						+ Trkorr.Trkorr

																				}),
																			beginButton: new sap.m.Button(
																				{

																					text: "Ок",
																					press: function () {

																						dialog
																							.close();

																					}
																				}),
																			afterClose: function () {

																				dialog
																					.destroy();

																			}
																		});
																	dialog
																		.open();
																	break;

															}
														}
													});

											break;
										case 'CANCEL':
											break;
									}
								}
							});
				}

				function openNumbersTrkorrDialog(array) {

					var oNumbersTrkorrDialog = new sap.m.Dialog({

						title: "Номера запросов",
						textAlign: sap.ui.core.TextAlign.Center,
						endButton: new sap.m.Button({

							text: "Закрыть",
							press: function () {

								oNumbersTrkorrDialog.close();

							}
						})
					});

					for (var i = 0; i < array.length; i++) {

						var NumbersTrkorr = new sap.m.Text({

							text: array[i] + "\n",

						}).addStyleClass("myNumbersRequests");

						oNumbersTrkorrDialog.addContent(NumbersTrkorr);

					}
					oNumbersTrkorrDialog.open();

				}

				function watch(Trkorr) {

					var oUpdateDialog = new sap.m.Dialog({

						title: "Просмотр запроса " + Trkorr,
						endButton: new sap.m.Button({

							text: "Закрыть",
							press: function () {

								oUpdateDialog.close()

							}
						})
					});

					var oTableWatch = new sap.ui.table.Table(
						{

							visibleRowCount: 7,
							enableCellFilter: true,
							enableCustomFilter: true,
							selectionMode: sap.ui.table.SelectionMode.None,
							enableColumnReordering: true,

						});

					var oControl = new sap.m.Text({
						text: "{Parameter}"
					}); // short binding notation
					oTableWatch.addColumn(new sap.ui.table.Column({

						width: "30%",
						label: new sap.m.Label({
							text: "Параметр"
						}),
						template: oControl

					}));

					oControl = new sap.m.Text({
						text: "{Value}"
					}); // more verbose binding notation
					oTableWatch.addColumn(new sap.ui.table.Column({

						label: new sap.m.Label({
							text: "Значение"
						}),
						template: oControl

					}));

					var oModelWatch = new sap.ui.model.odata.v2.ODataModel(
						link, {

						useBatch: false,
						defaultUpdateMethod: "Put"

					});
					oModelWatch.setSizeLimit(500);
					sap.ui.getCore().setModel(oModelWatch);
					oTableWatch.setModel(oModelWatch);

					var oFilterWatch = new sap.ui.model.Filter(
						"Parameter",
						sap.ui.model.FilterOperator.EQ, Trkorr);
					oTableWatch.bindRows("/Watch_requestSet",
						undefined, undefined, [oFilterWatch]);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							content: [

								oTableWatch,

							]
						});

					oUpdateDialog.addContent(oSimpleForm);
					oUpdateDialog.open();

				}

				function history(Trkorr) {

					var oUpdateDialog = new sap.m.Dialog({

						title: "История запроса " + Trkorr,
						endButton: new sap.m.Button({

							text: "Закрыть",
							press: function () {

								oUpdateDialog.close();

							}
						})
					});

					var oTableWatch = new sap.ui.table.Table(
						{

							visibleRowCount: 7,
							selectionMode: sap.ui.table.SelectionMode.None,
							enableColumnReordering: false,

						});

					var oControl = new sap.m.Text({

						text: {

							path: "TimeOfAction",
							type: new sap.ui.model.type.DateTime({

								pattern: "dd-MM-yyyy HH:mm:ss",
								UTC: true
							})

						}
					});
					oTableWatch.addColumn(new sap.ui.table.Column({

						width: "30%",
						label: new sap.m.Label({
							text: "Отметка времени"
						}),
						template: oControl
					}));

					oControl = new sap.m.Text({
						text: "{ActionUser}"
					});
					oTableWatch.addColumn(new sap.ui.table.Column({

						label: new sap.m.Label({
							text: "Пользователь"
						}),
						template: oControl

					}));

					oControl = new sap.m.Text({

						text: "{ActionTxt}"

					});
					oTableWatch.addColumn(new sap.ui.table.Column({

						label: new sap.m.Label({
							text: "Действие"
						}),
						template: oControl

					}));

					var oModelHistory = new sap.ui.model.odata.v2.ODataModel(
						link, {

						useBatch: false,
						defaultUpdateMethod: "Put"

					});
					oModelHistory.setSizeLimit(500);
					sap.ui.getCore().setModel(oModelHistory);
					oTableWatch.setModel(oModelHistory);

					var oFilterWatch = new sap.ui.model.Filter(
						"Trkorr", sap.ui.model.FilterOperator.EQ,
						Trkorr);
					oTableWatch.bindRows("/HistorySet", undefined,

						undefined, [oFilterWatch]);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
							content: [

								oTableWatch,

							]
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
						sap.ui.model.FilterOperator.EQ, '01');
					var oFilterAll = new sap.ui.model.Filter([
						oFilterSearch, oFilterStatus], true);
					oTable.bindRows("/Query_registrySet", undefined,
						undefined, [oFilterAll]);
					oTable
						.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
					oTable.setVisibleRowCount(calcRowCount());
					oTable
						.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);

				}

				function openForceDialog(Trkorrs, Trkorr) {

					var TrkorrValue = "";
					TrkorrValue = Trkorr;

					var oForceDialog = new sap.m.Dialog({

						title: "Принудительный перенос запроса "
							+ Trkorr

					});

					var oComboBox = new sap.ui.commons.ComboBox();
					oComboBox.setModel(oModel);

					var itemTemplate = new sap.ui.core.ListItem({

						key: "{Id}",
						text: "{Text}",

					});

					oComboBox
						.bindItems("/Status_codeSet", itemTemplate);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							width: "400px",
							content: [

								new sap.ui.commons.Label({
									text: "Запрос",
								}), new sap.ui.commons.TextView({

									text: TrkorrValue,
									editable: false,

								}),

								new sap.ui.commons.Label({
									text: "Статус запроса",
								}), oComboBox,

							]
						});
					oForceDialog.addContent(oSimpleForm);
					oForceDialog
						.addButton(new sap.m.Button(
							{

								text: "Сохранить",
								press: function () {

									var content = oSimpleForm
										.getContent();
									for (var i in content) {

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
										.forEach(function (
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

														success: function () {

															var oModel = new sap.ui.model.odata.v2.ODataModel(
																link,
																{

																	useBatch: false,
																	defaultUpdateMethod: "Put"

																});
															oModel
																.setSizeLimit(500);
															oTable
																.setModel(oModel);
															oForceDialog
																.close();
															ConterText0();
															sap.m.MessageToast
																.show("Запрос "
																	+ TrkorrValue
																	+ " принудительно перенесен!")

														},
														error: function (
															oError1) {

															var json = $
																.parseJSON(oError1.responseText);
															var code = json.error.code;

															switch (code) {

																case '01':

																	var dialogErr2 = new sap.m.Dialog(
																		{

																			title: "Ошибка",
																			type: sap.m.DialogType.Message,
																			state: 'Error',
																			content: new sap.m.Text(
																				{

																					text: 'У Вас недостаточно прав для переноса!'

																				}),
																			beginButton: new sap.m.Button(
																				{

																					text: 'OK',
																					press: function () {

																						dialogErr2
																							.close();

																					}
																				}),
																			afterClose: function () {

																				dialogErr2
																					.destroy();

																			}

																		});
																	dialogErr2
																		.open();
																	dialogErr2
																		.addStyleClass("mydialogErr2");

																	break;

																default:

																	oForceDialog
																		.close();
																	jQuery.sap
																		.require("sap.m.MessageBox");
																	sap.m.MessageBox
																		.error(
																			"Произошла ошибка при смене статуса запроса!",
																			{

																				title: "Ошибка"

																			});

																	break;

															}
														}
													});
										});
								}
							}));
					oForceDialog.addButton(new sap.m.Button({

						text: "Отмена",
						press: function () {

							oForceDialog.close();

						}

					}));
					oForceDialog.open();

				}
				;

				return oTable;

			},

			/**
			 * Similar to onAfterRendering, but this hook is invoked before
			 * the controller's View is re-rendered (NOT before the first
			 * rendering! onInit() is used for that one!).
			 * 
			 * @memberOf queryregistry.Registry.DevelopSl
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
			 * @memberOf queryregistry.Registry.DevelopSl
			 */
			// onAfterRendering: function() {
			//
			// },
			/**
			 * Called when the Controller is destroyed. Use this one to free
			 * resources and finalize activities.
			 * 
			 * @memberOf queryregistry.Registry.DevelopSl
			 */
			// onExit: function() {
			//
			// }
		});