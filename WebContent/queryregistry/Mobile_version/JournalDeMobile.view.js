  sap.ui.jsview("queryregistry.Mobile_version.JournalDeMobile", {
 
	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf queryregistry.Registry.JournalDeMobile
	 */
	getControllerName : function() {
		return "queryregistry.Mobile_version.JournalDeMobile";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf queryregistry.Registry.JournalDeMobile
	 */

	createContent : function(oController) {
		//this.setHeight("100%"); 
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
		var self = this;
		//for mobileV
		var scrollContainer = sap.ui.getCore().byId('scroll');
		var oTableColumn = sap.ui.getCore().byId('TableColumn');
		var oToolbar = sap.ui.getCore().byId('ToolBar');
		//for mobileV
		var tabBar = new sap.m.IconTabBar({
			expandable: false,
			//stretchContentHeight: true,
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
		var MenuButton = new sap.m.Button({
			enabled : true,
			visible : "{device>/isPhone}",
			icon : "sap-icon://nav-back",
			press : function() {

				var oSplitApp = sap.ui.getCore().byId(
						'workDeskSplitApp');
				oSplitApp.backToPage("registry_de");

			}

		});
		// var PopoverExit = new sap.m.Popover({
		// // placement : sap.m.PlacementType.Bottom,
		// // title : this.oStorage.get("IDName"),
		// // contentWidth : "200px",
		var PopoverExit = new sap.m.Toolbar({
			content : new sap.m.Button({
				text : "Выход",
				icon : "sap-icon://visits",
				press : function() {
					sap.ui.controller("queryregistry.WorkDesk")
							.logoff();
				}
			}).addStyleClass("myButtonExit")
		});

		var ButtonExit = new sap.m.Button({
			icon : "sap-icon://visits",
			press : function() {
				sap.ui.controller("queryregistry.WorkDesk").logoff();
			}
		});
		
		var headerBar = new sap.m.Bar({
			contentLeft : MenuButton,
			contentMiddle: Title ,
			contentRight: [ButtonExit,],
			//DESKTOP V
//				new sap.m.Label({text: "Пользователь: "}),
//			               new sap.m.Label({text: this.oStorage.get("IDName")}),
//			               new sap.m.Link({text: "Выход", press: function(){
//			            	   sap.ui.controller("queryregistry.WorkDesk").logoff();
//			            	   }
//			               }
//			               )],
			///DESKTOPV
			design: sap.m.BarDesign.Header
		});

		var headerBarUser = new sap.m.Bar({

			contentMiddle : [ new sap.m.Label({
				text : "Пользователь: "
			}), new sap.m.Label({
				text : this.oStorage.get("IDName")
			}) ],
		// design: sap.m.BarDesign.Header
		}).addStyleClass("myToolBarUser");

		var pageDev = new sap.m.Page({
			// enableScrolling: false,
			showHeader : true,
			showSubHeader : true,
			customHeader : headerBar,
			subHeader : headerBarUser,
			content : [ tabBar ]

		}).addStyleClass("myPageBackgoundColor");
		// addStyleClass("sapUiBody");
		
		//}).addStyleClass("myPageBackgoundColor");
		//pageDev.addStyleClass("sapUiContentPadding");

		return pageDev;
	}

});