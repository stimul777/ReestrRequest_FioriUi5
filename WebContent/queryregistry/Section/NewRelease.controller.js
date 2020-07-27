sap.ui.controller("queryregistry.Section.NewRelease", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 *
	 * @memberOf queryregistry.Section.NewRelease
	 */
	onInit : function() {

		var oView = this.getView();
		oView.setModel(new sap.ui.model.json.JSONModel({

			globalFilter : ""

		}), "ui");
		this._oGlobalFilter = null;

	},


	createTable: function(tableId, oController, view, typeTable){

		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		var check = this.oStorage.get("IDCheck");

		var refreshButton = new sap.m.Button({

			icon: "sap-icon://refresh",
			tooltip: "Обновить",
			press: function refresh(){

				var oModel = new sap.ui.model.odata.v2.ODataModel(link, {

					useBatch: false,
					defaultUpdateMethod: "Put"

				});
				oModel.setSizeLimit(500);
				sap.ui.getCore().byId('IdNewRelease').setText(moment().format('YYYY.MM.DDTHH:mm:ss'));
				sap.ui.getCore().byId('NewRelease').setText(moment().format('YYYY-MM-DDTHH:mm:ss'));
				oTable.setModel(oModel);

			},

		});	
		refreshButton.addStyleClass("myRefreshButton");

		var editButton = new sap.m.Button({

			icon : "sap-icon://edit",
			text: "Изменить",
			tooltip : "Изменить",
			enabled: false,
			press: function() {

				var idx = oTable.getSelectedIndex();
				if (idx == -1) return;
				var Trkorr = {};
				Trkorr = oTable.getContextByIndex(idx).getObject();
				openUpdateDialog(Trkorr);},

		});

		var ReleaseForm = new sap.m.Button({

			icon : "sap-icon://accelerated",
			enabled: false,
			text: "Сформировать релиз",
			tooltip: "Сформировать релиз",
			press: function(){

				var oModelUsers = this.getModel();

				var array = [];
				var oEntry = {};

				oEntry['Trkorr'] = [];

				for(var i = 0; i < oTable.getSelectedIndices().length; i++){

					oEntry['Trkorr'].push(oTable.getContextByIndex(oTable.getSelectedIndices()[i]).getObject().Trkorr);

				};


				var BusyDialogRelease = new sap.m.BusyDialog({

					text: "Формирование релиза..."

				}).open();

				oModelUsers.callFunction("/ReleaseForm",{

					method: "POST",
					urlParameters: {

						"Trkorr": oEntry.Trkorr

					},success: function(oData, response){

						var oModel = new sap.ui.model.odata.v2.ODataModel(link, {

							useBatch: false,
							defaultUpdateMethod: "Put"

						});
						oModel.setSizeLimit(500);
//						sap.ui.getCore().byId('IdNewRelease').setText(moment().format('YYYY.MM.DDTHH:mm:ss'));
//						sap.ui.getCore().byId('NewRelease').setText(moment().format('YYYY-MM-DDTHH:mm:ss'));
						oTable.setModel(oModel);
						sap.m.MessageToast.show("Релиз сформирован!")
						EnabledButton();
						BusyDialogRelease.close();

					},error: function(oError){

						sap.m.MessageToast.show("Произошла ошибка при формировании релиза! Обратитесь к специалисту службы поддрежки");
						BusyDialogRelease.close();

					}

				});
			},		
		});
		ReleaseForm.addStyleClass("myReleaseFormButton");
		
		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern : "YYYY-MM-ddTHH:mm:ss"
		});
		
		var oDateFormat_2 = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern : "YYYY-MM-dd HH:mm:ss"
		});
		
		var oDate = new Date(); 

		var IdDate = oDateFormat.format(oDate);
		var DateNow  = oDateFormat_2.format(oDate);
		
		
		var IdReleaseLabel  = new sap.ui.commons.Label({text:"Номер релиза:", });
		var IdNewRelease = new sap.ui.commons.TextView("IdNewRelease",{

			text: IdDate,
			editable: false,

		});
		var NewReleaseLabel  = new sap.ui.commons.Label({text:"Дата выпуска:", });
		var NewRelease = new sap.ui.commons.TextView("NewRelease",{

			text: DateNow,
			editable: false,

		});

		var NewReleaseToolBar = new sap.m.Toolbar({			

			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean	
			active : false, // boolean
			enabled : true, // boolean			
			design : sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign, since 1.16.8			
			content : [

			           refreshButton,
			           editButton,					
			           IdReleaseLabel,
			           IdNewRelease,
			           NewReleaseLabel,
			           NewRelease,
			           ReleaseForm,

			           ], // sap.ui.core.Control			
		});						


		var oTable = new sap.ui.table.Table(tableId,{

			height: "100%",
			rowHeight: 35,
			visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
			selectionBehavior: sap.ui.table.SelectionBehavior.Row,
			selectionMode: sap.ui.table.SelectionMode.MultiToggle,
			enableColumnReordering:true,
			toolbar: [	

			          NewReleaseToolBar ,

			          ],			
		});

		oTable.attachRowSelectionChange(function(oEvent){


			var quantitySelectedRows =  oTable.getSelectedIndices().length; //получаем длину массива
			if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){

				editButton.setEnabled(false);

			} else {

				editButton.setEnabled(true);

			}
			(quantitySelectedRows >= 1)? ReleaseForm.setEnabled(true): ReleaseForm.setEnabled(false);

		});

		var oControl = new sap.ui.commons.TextField().bindProperty("value", "Trkorr").setEditable(false); // short binding notation
		oTable.addColumn(new sap.ui.table.Column({

			label: new sap.ui.commons.Label({text: "Номер"}),
			width: "8%",
			template: oControl,

		}));

		var oGroupField = new sap.ui.commons.TextView().bindProperty("text", {

			parts: [

			        {path: "TuskNumber" },
			        {path: "Version" },
			        {path: "Description" }

			        ],
			        formatter: function(TuskNumber, Version, Description){

			        	return TuskNumber + "-" + Version + ": " + Description;

			        }
		});

		oTable.addColumn(new sap.ui.table.Column({

			label: "Описание",
			template: oGroupField,
			width: "13%"

		})
		);

		oControl = new sap.ui.commons.TextView({text:"{CreatorLogin}"});
		oTable.addColumn(new sap.ui.table.Column({

			label: new sap.ui.commons.Label({text: "Добавил"}),
			template: oControl,
			width: "11%"

		})
		);

		oControl = new sap.ui.commons.TextView({text:"{ReqFunction}"});
		oTable.addColumn(new sap.ui.table.Column({

			label: new sap.ui.commons.Label({text: "Функция"}),
			template: oControl,
			width: "15%"

		})
		);

		oControl = new sap.ui.commons.TextView({text:"{TestComment}"});
		oTable.addColumn(new sap.ui.table.Column({

			label: new sap.ui.commons.Label({text: "Комментарий"}),
			width: "12%",
			template: oControl

		})
		);

		oControl = new sap.ui.commons.TextView({text:"{WikiLink}"});
		oTable.addColumn(new sap.ui.table.Column({

			label: new sap.ui.commons.Label({text: "Ссылка на WIKI"}),
			width: "12%",
			template: oControl

		})
		);

//		oControl = new sap.ui.commons.TextView({text:"{Roles}"});
//		oTable.addColumn(new sap.ui.table.Column({

//		label: new sap.ui.commons.Label({text: "Роль"}),
//		template: oControl,
//		width: "20%"

//		})
//		);

//		oControl = new sap.ui.commons.TextView({text:"{Transact}"});
//		oTable.addColumn(new sap.ui.table.Column({

//		label: new sap.ui.commons.Label({text: "Транзакция"}),
//		template: oControl,
//		width: "20%"

//		})
//		);

		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {

			useBatch: false,
			defaultUpdateMethod: "Put"

		});
		oModel.setSizeLimit(500);
		oTable.setModel(oModel);

		var oFilter = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '10');

		oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilter]);
		oTable.placeAt("content");

		/***** Update Request  *****/

		function openUpdateDialog(Trkorr){

			var oUpdateDialog = new sap.m.Dialog({

				title: "Редактирование запроса в релизе " + Trkorr.Trkorr

			});

			var oComboBox = new sap.m.ComboBox({

				value: Trkorr.ReqFunction

			});				
			oComboBox.setModel(oModel);

			var oComboBoxRoles = new sap.m.ComboBox({

				value: Trkorr.Roles

			});				
			oComboBoxRoles.setModel(oModel);

			var oComboBoxTransact = new sap.m.ComboBox({

				value: Trkorr.Transact

			});				
			oComboBoxTransact.setModel(oModel);

			var itemTemplate = new sap.ui.core.ListItem({

				key: "{Code}",
				text: "{Name}",

			});

//			Выпадающий список для роли и транзакции
			var itemTemplateRoles = new sap.ui.core.ListItem({

				text:"{RoleId}"

			});

			var itemTemplateTransact = new sap.ui.core.ListItem({

				text:"{Tcode}"

			});

			var arrayRoles = [];
			var arrayTransact = [];
			var strRoles = "";
			var strTransact = "";
			var oMultiComboBoxRoles = new sap.m.MultiComboBox({

				items : {

					path : "/RoleSet",
					template : new sap.ui.core.ListItem({

						key  : "{RoleId}",
						text : "{RoleId}",

					}),

				},selectionFinish: function(){

					strRoles = "";	            	
					var items = oMultiComboBoxRoles.getSelectedItems();
					for (var i = 0; i < items.length; i++) {

						var item = items[i];
						var context = item.getBindingContext();
						arrayRoles.push(context.getProperty("RoleId",context));
						strRoles += arrayRoles[i] + " ";

					}
				},
			});

			var oMultiComboBoxTransact = new sap.m.MultiComboBox({

				items : {

					path : "/TRANSACTIONSet",
					template : new sap.ui.core.ListItem({

						text : "{Tcode}",

					})

				},selectionFinish: function(){

					strTransact = "";	            	
					var items = oMultiComboBoxTransact.getSelectedItems();

					for (var i = 0; i < items.length; i++) {

						var item = items[i];
						var context = item.getBindingContext();
						arrayTransact.push(context.getProperty("Tcode",context));
						strTransact += arrayTransact[i] + " ";

					}
				},
			});

			oComboBoxRoles.setShowSecondaryValues(true);
			oComboBoxTransact.setShowSecondaryValues(true);

			oComboBoxRoles.setModel(oModel)
			oComboBoxTransact.setModel(oModel)

			oComboBox.bindItems("/Function_releasesSet", itemTemplate);
			oComboBoxRoles.bindItems("/RoleSet", itemTemplateRoles);
			oComboBoxTransact.bindItems("/TRANSACTIONSet", itemTemplateTransact);

			var oSimpleForm = new sap.ui.layout.form.SimpleForm({

				width: "400px",
				content:[

				         new sap.m.Label({text:"Номер запроса", }),
				         new sap.m.Text({

				        	 text: Trkorr.Trkorr,

				         }),

				         new sap.m.Label({text:"Задача", }),
				         new sap.m.Text({

				        	 text: Trkorr.TuskNumber,

				         }),

				         new sap.m.Label({text:"Описание", }),
				         new sap.m.TextArea({

				        	 value: Trkorr.Description,
				        	 required: true,

				         }),

				         new sap.m.Label({text:"Комментарий", }),
				         new sap.m.TextArea({

				        	 required: true,
				        	 value:  Trkorr.TestComment,

				         }),

				         new sap.m.Label({text:"Ссылка на WIKI", }),
				         new sap.m.TextArea({

				        	 required: true,
				        	 value:  Trkorr.WikiLink,

				         }),

				         new sap.m.Label({text:"Функция", }),
				         oComboBox.setRequired(false),

				         new sap.m.Label({text:"Роль", }),
				         oComboBoxRoles.setRequired(false),

				         new sap.m.Label({text:"Транзакция", }),
				         oComboBoxTransact.setRequired(false),

				         ]
			});				
			oUpdateDialog.addContent(oSimpleForm);
			oUpdateDialog.addButton(

					new sap.m.Button({

						text: "Сохранить",
						press: function() {

							var content = oSimpleForm.getContent();
							for (var i in content) {

								var control = content[i];
								if(control.getValue){

									if(control.getValue() === "" && oComboBoxRoles.getSelectedKeys === "")  {

										control.setValueState(sap.ui.core.ValueState.Error);
										return;

									} else{

										control.setValueState(sap.ui.core.ValueState.None);
									}
								}
							}
							var oEntry = {};
							oEntry.Trkorr = Trkorr.Trkorr;
							oEntry.Description = content[5].getValue();
							oEntry.TestComment = content[7].getValue();
							oEntry.WikiLink = content[9].getValue();
							oEntry.ReqFunction = content[11].getValue();
							oEntry.Roles = content[13].getValue();
							oEntry.Transact = content[15].getValue();

//							var BusyDialog = new sap.m.BusyDialog({
//
//								text: "Сохранение..."
//
//							})
//							BusyDialog.open();
							sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, {

								success: function(oData, response){

									var oModel = new sap.ui.model.odata.v2.ODataModel(link, {

										useBatch: false,
										defaultUpdateMethod: "Put"

									});
									oModel.setSizeLimit(500);
									oTable.setModel(oModel);
									oUpdateDialog.close();
									EnabledButton();
//									BusyDialog.close();
									sap.m.MessageToast.show("Запрос " + Trkorr.Trkorr + " отредактирован!")

								}, error: function(){

									oUpdateDialog.close();
									BusyDialog.close();
									jQuery.sap.require("sap.m.MessageBox");
									sap.m.MessageBox.error("Ошибка при сохранении изменений!", {

										title: "Ошибка"});

								}
							});
						}
					})
			);
			oUpdateDialog.addButton(

					new sap.m.Button({

						text: "Закрыть",
						press: function(){

							oUpdateDialog.close();

						}
					}))
					oUpdateDialog.open();

		};

		/***** Update Request End *****/


		function EnabledButton(){

			editButton.setEnabled(false);
			ReleaseForm.setEnabled(false);

		}

		return oTable;

	},
});