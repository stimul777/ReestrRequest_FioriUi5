  sap.ui.jsview("queryregistry.Mobile_version.ProdDeMobile", {
 
	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf queryregistry.Registry.ProdDe
	 */
	getControllerName : function() {
		return "queryregistry.Mobile_version.ProdDeMobile";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf queryregistry.Registry.ProdDe
	 */
	createContent : function(oController) {
		//this.setHeight("100%");
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

		var self = this;
		
		var scrollContainer = sap.ui.getCore().byId('scroll');
		var oTableColumn = sap.ui.getCore().byId('TableColumn');
		var oToolbar = sap.ui.getCore().byId('ToolBar');
		
		var tabBar = new sap.m.IconTabBar({
			expandable: false,
			//stretchContentHeight: true,
			items : [
					new sap.m.IconTabFilter({
						key: "idP1",
						text : "К переносу в DE1",
						content : oController.createTestTable("idP1",
								oController, self, 'for')
					}),
					new sap.m.IconTabFilter({
						key: "idP2",
						text : "Перенос в DE1 одобрен",
						content : oController.createTestTable("idP2",
								oController, self, 'approve')
					}),
					new sap.m.IconTabFilter({
						key: "idP3",
						text : "В DE1",
						content : oController.createTestTable("idP3",
								oController, self, 'into')
					}) ],
					
//					select: function(e) { 
//						 
//						 switch (tabBar.getSelectedKey()){
//						 
//						 case 'idP1' :
//						 
//							 var oTable = sap.ui.getCore().byId('idP1');		
//							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//						    	 useBatch: false,
//						    	 defaultUpdateMethod: "Put"
//						    	 });
//							 oModel.setSizeLimit(500);
//							 sap.ui.getCore().setModel(oModel);
//							 oTable.setModel(oModel);
//							 break;	
//							 
//						 case 'idP2' :
//							 
//							 var oTable = sap.ui.getCore().byId('idP2');		
//							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//						    	 useBatch: false,
//						    	 defaultUpdateMethod: "Put"
//						    	 });
//							 oModel.setSizeLimit(500);
//							 sap.ui.getCore().setModel(oModel);
//							 oTable.setModel(oModel);
//							 break;	
//							 
//						 case 'idP3' :
//							 
//							 var oTable = sap.ui.getCore().byId('idP3');		
//							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//						    	 useBatch: false,
//						    	 defaultUpdateMethod: "Put"
//						    	 });
//							 oModel.setSizeLimit(500);
//							 sap.ui.getCore().setModel(oModel);
//							 oTable.setModel(oModel);
//							 break;	
//						 				 
//						 }
//						 },		
		});
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
		var Title = new sap.m.Label({text: "Прод(DE)"});
//		Title.addStyleClass("myTitle");
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
			contentMiddle : Title,

			contentRight : [ ButtonExit, ],
			design : sap.m.BarDesign.Header
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

		return pageDev;
	}

});