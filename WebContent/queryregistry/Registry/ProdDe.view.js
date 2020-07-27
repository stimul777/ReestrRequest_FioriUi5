sap.ui.jsview("queryregistry.Registry.ProdDe", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 *
	 * @memberOf queryregistry.Registry.ProdDe
	 */
	getControllerName : function() {
		return "queryregistry.Registry.ProdDe";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 *
	 * @memberOf queryregistry.Registry.ProdDe
	 */
	createContent : function(oController) {
		this.setHeight("100%");
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

		var oModel =  new sap.ui.model.odata.ODataModel(link,false);
		var aFltDE1 = [new sap.ui.model.Filter({
		  	  path: "StatusCode",
		  		operator: sap.ui.model.FilterOperator.EQ,
		  		value1: '08'
			}),
		];
		                     
		      var oJsonModelDE1 = new sap.ui.model.json.JSONModel();
		      oModel.read("/Query_registrySet", {
		    	  filters: aFltDE1,
		    	  async:false,
		          success: function(oData, response) {
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
		        	  async:false,
		              success: function(oData, response) {
		            	  oJsonModelDE11.setData(oData);
		               }
		          });	
		
			      var aFltDE111 = [new sap.ui.model.Filter({
			      	  path: "StatusCode",
			      		operator: sap.ui.model.FilterOperator.EQ,
			      		value1: '10'
			    	}),
			    ];
			                         
			          var oJsonModelDE111 = new sap.ui.model.json.JSONModel();
			          oModel.read("/Query_registrySet", {
			        	  filters: aFltDE111,
			        	  async:false,
			              success: function(oData, response) {
			            	  oJsonModelDE111.setData(oData);
			               }
			          });	
		
	
		var self = this;
		var tabBar = new sap.m.IconTabBar({
			id: "TabBarProd",
			expandable: false,
			stretchContentHeight: true,
			items : [
					new sap.m.IconTabFilter({
						key: "idP1",
						text : "К переносу в DE1 "+ "("+oJsonModelDE1.oData.results.length+")",
						content : oController.createTestTable("idP1",
								oController, self, 'for')
					}),
					new sap.m.IconTabFilter({
						key: "idP2",
						text : "Перенос в DE1 одобрен "+ "("+oJsonModelDE11.oData.results.length+")",
						content : oController.createTestTable("idP2",
								oController, self, 'approve')
					}),
					new sap.m.IconTabFilter({
						key: "idP3",
						text : "В DE1 "+ "("+oJsonModelDE111.oData.results.length+")",
						content : oController.createTestTable("idP3",
								oController, self, 'into')
					}) ],
					
					select: function(e) {
						
						 switch (tabBar.getSelectedKey()){
						
						 case 'idP1' :
						
							 var oTable = sap.ui.getCore().byId('idP1');		
							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });
							 oModel.setSizeLimit(500);
							 sap.ui.getCore().setModel(oModel);
							 oTable.setModel(oModel);
							 break;	
							
						 case 'idP2' :
							
							 var oTable = sap.ui.getCore().byId('idP2');		
							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });
							 oModel.setSizeLimit(500);
							 sap.ui.getCore().setModel(oModel);
							 oTable.setModel(oModel);
							 break;	
							
						 case 'idP3' :
							
							 var oTable = sap.ui.getCore().byId('idP3');		
							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });
							 oModel.setSizeLimit(500);
							 sap.ui.getCore().setModel(oModel);
							 oTable.setModel(oModel);
							 break;	
						 				
						 }
						 },		
		});
		var Title = new sap.m.Label({text: "Прод(DE)"});
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
			content : [ tabBar ]
		}).addStyleClass("myPageBackgoundColor");

		page.addStyleClass("sapUiContentPadding");

		return page;
	}

});