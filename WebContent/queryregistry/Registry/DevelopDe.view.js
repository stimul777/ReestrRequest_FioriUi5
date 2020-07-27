sap.ui.jsview("queryregistry.Registry.DevelopDe", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 *
	 * @memberOf queryregistry.Registry.DevelopSl
	 */
	getControllerName : function() {
		
		return "queryregistry.Registry.DevelopDe";
	
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 *
	 * @memberOf queryregistry.Registry.DevelopSl
	 */
	createContent : function(oController) {
		
		this.setHeight("100%");
//		this.displayBlock(true);

		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			
		var self = this;
		var tabBar = new sap.m.IconTabBar({
			id: "TabBarDe",
			expandable: false,
			stretchContentHeight: true,
			items : [
				new sap.m.IconTabFilter({
					height: "100%"	,
					text : "Новые",
					content : oController.createTable("idNew",oController, self, 'new')
					
				})
				]
		});
		var Title = new sap.m.Label({text: "Разработка(DE)"});
//		Title.addStyleClass("myTitle");
		
		var MenuButton = new sap.m.Button({
			
			enabled : true,
			visible: "{device>/isPhone}",
			icon :  "sap-icon://menu2",
			press: function(){

				var oSplitApp = sap.ui.getCore().byId('workDeskSplitApp');
				oSplitApp.backToPage("base_page");
				
			}
		});
		
		var headerBar = new sap.m.Bar({
			
			contentMiddle: Title ,
			contentRight: [
				
				new sap.m.Label({text: "Пользователь: "}),
			    new sap.m.Label({text: this.oStorage.get("IDName")}),
			    new sap.m.Button({
			    			
			    	icon: "sap-icon://visits",
			    	press: function(){
			    				
			    		sap.ui.controller("queryregistry.WorkDesk").logoff();
			    			
			    	}
			    })
			    ],
			    design: sap.m.BarDesign.Header
		
		});

		var pageDev = new sap.m.Page({

			showHeader: true,
//			showNavButton: "{device>/isDesk}",
//			showSubHeader: true,
			customHeader: headerBar,
			content : [ tabBar ]

		}).addStyleClass("myPageBackgoundColor");
		
		return pageDev;
	
	}

});