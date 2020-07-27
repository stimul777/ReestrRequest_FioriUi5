sap.ui.jsview("queryregistry.Registry.Analitic", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf queryregistry.Registry.ArchiveDe
	 */
	getControllerName : function() {
		return "queryregistry.Registry.Analitic";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf queryregistry.Registry.ArchiveDe
	 */
	createContent : function(oController) {
		this.setHeight("100%");

		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

		var self = this;

		var layout = new sap.ui.layout.VerticalLayout({
			id : "Layout",
			width : "100%",
			content : [
					new sap.m.List({
						items : [ new sap.m.InputListItem({
							label : "Период",
							content : new sap.m.DateRangeSelection({
								id : "DRS1",
								width : "100%",
//								change : "range_first_handleChange"
							})
						}),

						new sap.m.InputListItem({
							label : "Период",
							content : new sap.m.DateRangeSelection({
								id : "DRS2",
								width : "100%",
//								change : "range_two_handleChange"
							})
						}),

						new sap.m.InputListItem({
							label : "Сотрудник",
							content : new sap.m.MultiComboBox({
								id : "MBox"
							}),
						}), ]
					}),
					new sap.m.Button({
						text : "Анализ",
						type : sap.m.ButtonType.Accept,
						width : "30%",
						press : function(oEvent) {
							busyDialogLoad = new sap.m.BusyDialog({
							      text: "Загрузка данных...",
							            showCancelButton : false
							            });
							busyDialogLoad.open();
							oController.createTable("idStat",
									oController, self, 'new');
						}
					}) ]
		});

		// new sap.m.FlexBox({
		// items : [ new sap.m.Label({
		// text : "Период",
		// textAlign : sap.ui.core.TextAlign.Center,
		// labelFor : "DRS1"
		// }),
		//
		// new sap.m.DateRangeSelection({
		// id : "DRS1",
		// width : "100%",
		// change : "range_first_handleChange"
		// }) ]
		// }),
		//
		// new sap.m.FlexBox({
		// items : [ new sap.m.Label({
		// text : "Период",
		// textAlign : sap.ui.core.TextAlign.Center,
		// width : "100%",
		// labelFor : "DRS2"
		// }),
		//
		// new sap.m.DateRangeSelection({
		// id : "DRS2",
		// width : "100%",
		// change : "range_two_handleChange"
		// }), ]
		// }),
		//			
		//			
		// new sap.m.FlexBox({
		// items : [
		// new sap.m.Label({
		// text : "Сотрудник",
		// textAlign : sap.ui.core.TextAlign.Center,
		// width : "100%",
		// labelFor : "MBox"
		// }),
		//
		// new sap.m.MultiComboBox({
		// id : "MBox"
		// }), ]
		// }),
		//			
		//			
		//
		// ]
		// });

		layout.addStyleClass("sapUiContentPadding");

		// var label_first = new sap.m.Label(
		// {
		// text: "Период",
		// labelFor: "DRS1"
		// })
		// var range_first = new sap.m.DateRangeSelection({
		// id: "DRS1",
		// change: "range_first_handleChange"
		// }
		// );
		//		

		// var tabBar = new sap.m.IconTabBar({
		// id: "TabBarAr",
		// expandable: false,
		// stretchContentHeight: true,
		// items : [
		// new sap.m.IconTabFilter("tra-ta",{
		// text : "Архив",
		// content : oController.createTable("idArch",
		// oController, self, 'new')
		// })
		// ]
		// });
		//		
		//		
		var Title = new sap.m.Label({
			text : "Статистика"
		});
		// Title.addStyleClass("myTitle");

		var headerBar = new sap.m.Bar({
			contentMiddle : Title,
			contentRight : [ new sap.m.Label({
				text : "Пользователь: "
			}), new sap.m.Label({
				text : this.oStorage.get("IDName")
			}), new sap.m.Link({
				text : "Выход",
				press : function() {
					sap.ui.controller("queryregistry.WorkDesk").logoff();
				}
			}) ],
			design : sap.m.BarDesign.Header
		});
		//
		var pageDev = new sap.m.Page({
			customHeader : headerBar,
			content : [ layout ]

		});
		pageDev.addStyleClass("sapUiContentPadding");

		return pageDev;
	}

});