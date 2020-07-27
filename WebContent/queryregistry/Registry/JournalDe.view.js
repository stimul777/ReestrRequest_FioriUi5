sap.ui.jsview("queryregistry.Registry.JournalDe", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 *
	 * @memberOf queryregistry.Registry.JournalDe
	 */
	getControllerName : function() {
		return "queryregistry.Registry.JournalDe";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 *
	 * @memberOf queryregistry.Registry.JournalDe
	 */

	createContent : function(oController) {
		this.setHeight("100%");
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
		var self = this;
		var tabBar = new sap.m.IconTabBar({
			id: "TabBarJ",
			expandable: false,
			stretchContentHeight: true,
			items : [
					new sap.m.IconTabFilter({
						text : "Журнал ошибок",
						content : oController.createTable("idErJ",
								oController, self, 'new')
					})
			]
		});
		
		var Title = new sap.m.Label({text: "Журнал ошибок(DE)"});
//		Title.addStyleClass("myTitle");
		
		var headerBar = new sap.m.Bar({
			contentMiddle: Title ,
			contentRight: [new sap.m.Label({text: "Пользователь: "}),
			               new sap.m.Label({text: this.oStorage.get("IDName")}),
			               new sap.m.Link({text: "Выход", press: function(){
			            	   sap.ui.controller("queryregistry.WorkDesk").logoff();
			            	   }
			               }
			               )],
			design: sap.m.BarDesign.Header
		});

		var pageDev = new sap.m.Page({
			customHeader: headerBar,
			content : [ tabBar ]

		}).addStyleClass("myPageBackgoundColor");
		pageDev.addStyleClass("sapUiContentPadding");

		return pageDev;
	}

});