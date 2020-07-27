sap.ui.jsview("queryregistry.Registry.BeforeProdDe", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 *
	 * @memberOf queryregistry.Registry.BeforeProdSl
	 */
	getControllerName : function() {
		return "queryregistry.Registry.BeforeProdDe";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 *
	 * @memberOf queryregistry.Registry.BeforeProdSl
	 */
	createContent : function(oController) {
		this.setHeight("100%");
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

		var oModel =  new sap.ui.model.odata.ODataModel(link,false);
		var aFltDEQ = [new sap.ui.model.Filter({
        	  path: "StatusCode",
        		operator: sap.ui.model.FilterOperator.EQ,
        		value1: '05'
      	}),
      ];
                           
            var oJsonModelDEQ = new sap.ui.model.json.JSONModel();
            oModel.read("/Query_registrySet", {
          	  filters: aFltDEQ,
          	  async:false,
                success: function(oData, response) {
              	  oJsonModelDEQ.setData(oData);
                 }
            });
            
            var aFltDEQQ = [new sap.ui.model.Filter({
            	  path: "StatusCode",
            		operator: sap.ui.model.FilterOperator.EQ,
            		value1: '06'
          	}),
          ];
                               
                var oJsonModelDEQQ = new sap.ui.model.json.JSONModel();
                oModel.read("/Query_registrySet", {
              	  filters: aFltDEQQ,
              	  async:false,
                    success: function(oData, response) {
                  	  oJsonModelDEQQ.setData(oData);
                     }
                });
                
                var aFltDEQQQ = [new sap.ui.model.Filter({
              	  path: "StatusCode",
              		operator: sap.ui.model.FilterOperator.EQ,
              		value1: '07'
            	}),
            ];
                                 
                  var oJsonModelDEQQQ = new sap.ui.model.json.JSONModel();
                  oModel.read("/Query_registrySet", {
                	  filters: aFltDEQQQ,
                	  async:false,
                      success: function(oData, response) {
                    	  oJsonModelDEQQQ.setData(oData);
                       }
                  });
		
			
		
		var self = this;
		var tabBar = new sap.m.IconTabBar({
			id: "TabBar",
			expandable: false,
			stretchContentHeight: true,
			items : [
					new sap.m.IconTabFilter({
						key: "idBP1",
						text : "К переносу в DEQ "+ "("+oJsonModelDEQ.oData.results.length+")", 
						content : oController.createTestTable("idBP1",
								oController, self, 'for')
					}),
					new sap.m.IconTabFilter({
						key: "idBP2",
						text : "Перенос в DEQ одобрен "+"("+oJsonModelDEQQ.oData.results.length+")", 
						content : oController.createTestTable("idBP2",
								oController, self, 'approve')
					}),
					new sap.m.IconTabFilter({
						key: "idBP3",
						text : "В DEQ "+"("+oJsonModelDEQQQ.oData.results.length+")", 
						content : oController.createTestTable("idBP3",
								oController, self, 'into')
					}) ],
					
					select: function(e) {
						
						 switch (tabBar.getSelectedKey()){
						
						 case 'idBP1' :
						
							 var oTable = sap.ui.getCore().byId('idBP1');		
							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });
							 oModel.setSizeLimit(500);
							 sap.ui.getCore().setModel(oModel);
							 oTable.setModel(oModel);
							 break;	
							
						 case 'idBP2' :
							
							 var oTable = sap.ui.getCore().byId('idBP2');		
							 var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });
							 oModel.setSizeLimit(500);
							 sap.ui.getCore().setModel(oModel);
							 oTable.setModel(oModel);
							 break;	
							
						 case 'idBP3' :
							
							 var oTable = sap.ui.getCore().byId('idBP3');		
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
		
		var Title = new sap.m.Label({text: "Предпрод(DE)"});
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