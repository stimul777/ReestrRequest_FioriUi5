sap.ui.jsview("queryregistry.Registry.TestDe", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 *
	 * @memberOf queryregistry.Registry.TestSl
	 */
	getControllerName : function() {
		return "queryregistry.Registry.TestDe";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 *
	 * @memberOf queryregistry.Registry.TestSl
	 */
	createContent : function(oController) {
		this.setHeight("100%");
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
		
	      var aFltDET = [new sap.ui.model.Filter({
	    	  path: "StatusCode",
	    		operator: sap.ui.model.FilterOperator.EQ,
	    		value1: '02'
	  	}),
	  ];
		
	      var oJsonModel = new sap.ui.model.json.JSONModel();
	      var oModel =  new sap.ui.model.odata.ODataModel(link,false);
	      oModel.read("/Query_registrySet", {
	    	  filters: aFltDET,
	    	  async:false,
	          success: function(oData, response) {
	        	  oJsonModel.setData(oData);
	           }
	      });
		
	      var aFltDETT = [new sap.ui.model.Filter({
	    	  path: "StatusCode",
	    		operator: sap.ui.model.FilterOperator.EQ,
	    		value1: '03'
	  	}),
	  ];
	      
	      var oJsonModelT = new sap.ui.model.json.JSONModel();
	      oModel.read("/Query_registrySet", {
	    	  filters: aFltDETT,
	    	  async:false,
	          success: function(oData, response) {
	        	  oJsonModelT.setData(oData);
	           }
	      });
	      
	      
	      var aFltDETTT = [new sap.ui.model.Filter({
	    	  path: "StatusCode",
	    		operator: sap.ui.model.FilterOperator.EQ,
	    		value1: '04'
	  	}),
	  ];
	      
	      var oJsonModelTT = new sap.ui.model.json.JSONModel();
	      oModel.read("/Query_registrySet", {
	    	  filters: aFltDETTT,
	    	  async:false,
	          success: function(oData, response) {
	        	  oJsonModelTT.setData(oData);
	           }
	      });
	      
	      
	      var aFltDETC = [new sap.ui.model.Filter({
	    	  path: "StatusCode",
	    		operator: sap.ui.model.FilterOperator.EQ,
	    		value1: '14'
	  	}),
	  ];
	      
	      var oJsonModelTC = new sap.ui.model.json.JSONModel();
	      oModel.read("/Query_registrySet", {
	    	  filters: aFltDETC,
	    	  async:false,
	          success: function(oData, response) {
	        	  oJsonModelTC.setData(oData);
	           }
	      });
	      
		
		
		
		var tabBar = new sap.m.IconTabBar({
			id: "TabBarTest",
			expandable: false,
			stretchContentHeight: true,
			items : [
					new sap.m.IconTabFilter({
						key: "idT",
						text : "К переносу в DET "+ "("+oJsonModel.oData.results.length+")",
						content : oController.createTestTable("idT",
								oController, this, 'for')
					}),
					new sap.m.IconTabFilter({
						key: "idT1",
						text : "Перенос в DET одобрен "+ "("+oJsonModelT.oData.results.length+")",
						content : oController.createTestTable("idT1",
								oController, this, 'approve')
					}),
					new sap.m.IconTabFilter({
						key: "idT2",
						text : "В DET "+ "("+oJsonModelTT.oData.results.length+")",
						content : oController.createTestTable("idT2",
								oController, this, 'into')
					}),
					new sap.m.IconTabFilter({
						key: "idT3",
						text : "eCATT "+ "("+oJsonModelTC.oData.results.length+")",
						content : oController.createTestTable("idT3",
								oController, this, 'eCATT')
					})

			],
			 select: function(e) {
				
				 switch (tabBar.getSelectedKey()){
				
				 case 'idT' :
				
					 var oTable = sap.ui.getCore().byId('idT');		
					 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
					 oModel.setSizeLimit(500);
					 sap.ui.getCore().setModel(oModel);
					 oTable.setModel(oModel);
					 break;	
					
				 case 'idT1' :
					
					 var oTable = sap.ui.getCore().byId('idT1');		
					 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
					 oModel.setSizeLimit(500);
					 sap.ui.getCore().setModel(oModel);
					 oTable.setModel(oModel);
					 break;	
					
				 case 'idT2' :
					
					 var oTable = sap.ui.getCore().byId('idT2');		
					 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
					 oModel.setSizeLimit(500);
					 sap.ui.getCore().setModel(oModel);
					 oTable.setModel(oModel);
					 break;
				
				 case 'idT3' :	
					
					 var oTable = sap.ui.getCore().byId('idT3');		
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
				
		
		var Title = new sap.m.Label({
			text: "Тест(DE)"
				});
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