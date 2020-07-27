sap.ui.jsview("queryregistry.Registry.FullAnalitic", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf queryregistry.Registry.ArchiveDe
	 */
	getControllerName : function() {
		return "queryregistry.Registry.FullAnalitic";
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
			id : "Layout_1",
			width : "100%",
			content : [
					new sap.m.List({
						
						items : [ new sap.m.InputListItem({
							label : "Период",
							content : new sap.m.DateRangeSelection({
								id : "DRS3",
								width : "100%",
//								change : "range_first_handleChange"
							})
						}),

						new sap.m.InputListItem({
							label : "Период",
							content : new sap.m.DateRangeSelection({
								id : "DRS4",	
								width : "100%",
//								change : "range_two_handleChange"
							})
						}),
						]
					}),
					new sap.m.Button({
						text : "Анализ",
						type : sap.m.ButtonType.Accept,
						width : "20%",
						press : function(oEvent) {
							busyDialogLoad = new sap.m.BusyDialog({
							      text: "Загрузка данных...",
							            showCancelButton : false
							            });
							busyDialogLoad.open();
							oController.createTable("idFullStat",
									oController, self, 'new');
						}
					}) ]
		});


		layout.addStyleClass("sapUiContentPadding");


		var Title = new sap.m.Label({
			text : "Общая статистика"
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