sap.ui.jsview("queryregistry.Section.SapTransaction", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf queryregistry.Section.SapTransaction
	*/ 
	getControllerName : function() {
		return "queryregistry.Section.SapTransaction";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf queryregistry.Section.SapTransaction
	*/ 
	createContent : function(oController) {
		this.setHeight("100%");
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
		var tabBar = new sap.m.IconTabBar({
			expandable: false,
			stretchContentHeight: true,
			items : [
					new sap.m.IconTabFilter({
						text: "Транзакции",
						content : oController.createTable("idTransDe",
								oController, this)
					})]
		});
		
		var Title = new sap.m.Label({text: "Транзакции SAP"});
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
		
		
 		var page = new sap.m.Page({
			customHeader: headerBar,
			content: [ tabBar ]
		}).addStyleClass("myPageBackgoundColor");
 		

 		page.addStyleClass("sapUiContentPadding");

		return page;
	}

});