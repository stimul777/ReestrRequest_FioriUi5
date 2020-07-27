jQuery.sap.require("queryregistry.Controller");

queryregistry.Controller.extend("queryregistry.WorkDesk", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.WorkDesk
*/
		
	onInit: function() {	
//		
//		oData.request ({
//
//			requestUri: "http://myfioripage/sap/bc/bsp/sap/zcustomapp/index.html",
//
//			method: "GET",
//
//			headers:{
//
//				"X-Requested-With": "XMLHttpRequest",
//
//       		     "Content-Type": "application/atom+xml",
//
//       		     "DataServiceVersion": "2.0",
//
//       		     "X-CSRF-Token":"Fetch"
//
//			}
//		},
//
//  	
//		function (data, response){
//
//				var header_xcsrf_token = response.headers['x-csrf-token'];
//
//             }
//
//		);
//
		this.initWorkflowNotifyWebsocket();

	},
	
	search: function(oEvent) {
		
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		var link = this.oStorage.get("IDSystemLink");
		
		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
            useBatch: false,
            });
		
//		sap.ui.getCore().setModel(oModel);
		
		var oFilterWatch = new sap.ui.model.Filter("Parameter", sap.ui.model.FilterOperator.EQ, oEvent.getParameters().query);
		var request = oEvent.getParameters().query;
//		oTableWatch.bindRows("/Watch_requestSet",undefined,undefined, [oFilterWatch]);
		
		var oEntry = [];
		
		oModel.read('/Watch_requestSet', { filters: [oFilterWatch] ,  
			success: function(oData){
				
				var splitApp = sap.ui.getCore().byId('workDeskSplitApp');
				
				var loop = [];
				
				switch(oData.results[2].Value){

				case "Новая разработка":
					if (typeof(devDE)=="undefined" )
					{
					
						busyDialogLoad.open();
		                devDE = sap.ui.view({id: "devDE1", viewName: "queryregistry.Registry.DevelopDe", type: sap.ui.core.mvc.ViewType.JS});
		                splitApp.addDetailPage(devDE);
		                splitApp.toDetail(devDE);
		                sap.ui.getCore().byId('TabBarDe').setSelectedKey("idNew");
		                var a = sap.ui.getCore().byId('idNew')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '01');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idNew');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(devDE);
		                sap.ui.getCore().byId('TabBarDe').setSelectedKey("idNew"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '01');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
				break;
				
				
				case "К переносу в тест":
					if (typeof(testDE)=="undefined" )
					{
					
						busyDialogLoad.open();
						testDE = sap.ui.view({id: "testDE1", viewName: "queryregistry.Registry.TestDe", type: sap.ui.core.mvc.ViewType.JS});
		                splitApp.addDetailPage(testDE);
		                splitApp.toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT");
		                var a = sap.ui.getCore().byId('idT')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '02');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idT');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '02');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
				break;
				
				case "Перенос в тест одобрен":
					if (typeof(testDE)=="undefined" )
					{
					
						busyDialogLoad.open();
						testDE = sap.ui.view({id: "testDE1", viewName: "queryregistry.Registry.TestDe", type: sap.ui.core.mvc.ViewType.JS});
		                splitApp.addDetailPage(testDE);
		                splitApp.toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT1");
		                var a = sap.ui.getCore().byId('idT1')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '03');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idT1');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT1"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '03');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
				break;
				
				case "В тесте":
					if (typeof(testDE)=="undefined" )
					{
					
						busyDialogLoad.open();
						
						testDE = sap.ui.view({id: "testDE1", viewName: "queryregistry.Registry.TestDe", type: sap.ui.core.mvc.ViewType.JS});
		                splitApp.addDetailPage(testDE);
		                splitApp.toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT2");
		                var a = sap.ui.getCore().byId('idT2')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '04');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idT2');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT2"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '04');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
				break;
				
				case "eCATT":
					if (typeof(testDE)=="undefined" )
					{
					
						busyDialogLoad.open();
						testDE = sap.ui.view({id: "testDE1", viewName: "queryregistry.Registry.TestDe", type: sap.ui.core.mvc.ViewType.JS});
		                splitApp.addDetailPage(testDE);
		                splitApp.toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT3");
		                var a = sap.ui.getCore().byId('idT3')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '14');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idT3');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(testDE);
		                sap.ui.getCore().byId('TabBarTest').setSelectedKey("idT3"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '14');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
				break;
				
				
				case "К переносу в предпрод":
					if (typeof(beforeProdDE)=="undefined" )
					{
					
						busyDialogLoad.open();
		                beforeProdDE = sap.ui.view({id: "beforeProdDE1", viewName: "queryregistry.Registry.BeforeProdDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(beforeProdDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(beforeProdDE);
		                sap.ui.getCore().byId('TabBar').setSelectedKey("idBP1");
		                var a = sap.ui.getCore().byId('idBP1')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '05');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idBP1');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(beforeProdDE);
		                sap.ui.getCore().byId('TabBar').setSelectedKey("idBP1"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '05');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;
					
				case "Перенос в предпрод одобрен":
					if (typeof(beforeProdDE)=="undefined" )
					{
					
						busyDialogLoad.open();
		                beforeProdDE = sap.ui.view({id: "beforeProdDE1", viewName: "queryregistry.Registry.BeforeProdDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(beforeProdDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(beforeProdDE);
		                sap.ui.getCore().byId('TabBar').setSelectedKey("idBP2");
		                var a = sap.ui.getCore().byId('idBP2')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '06');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idBP2');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(beforeProdDE);
		                sap.ui.getCore().byId('TabBar').setSelectedKey("idBP2"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '06');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;
					
				case "В предпроде":
					if (typeof(beforeProdDE)=="undefined" )
					{
					
						busyDialogLoad.open();
		                beforeProdDE = sap.ui.view({id: "beforeProdDE1", viewName: "queryregistry.Registry.BeforeProdDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(beforeProdDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(beforeProdDE);
		                sap.ui.getCore().byId('TabBar').setSelectedKey("idBP3");
		                var a = sap.ui.getCore().byId('idBP3')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '07');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idBP3');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(beforeProdDE);
		                sap.ui.getCore().byId('TabBar').setSelectedKey("idBP3"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '07');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;
					
					
				case "К переносу в прод":
					if (typeof(prodDE)=="undefined" )
					{
					
						busyDialogLoad.open();
		                prodDE = sap.ui.view({id: "prodDE", viewName: "queryregistry.Registry.ProdDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(prodDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(prodDE);
		                sap.ui.getCore().byId('TabBarProd').setSelectedKey("idP1");
		                var a = sap.ui.getCore().byId('idP1')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '08');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idP1');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(prodDE);
		                sap.ui.getCore().byId('TabBarProd').setSelectedKey("idP1"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '08');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;
					
				case "Перенос в прод одобрен":
					if (typeof(prodDE)=="undefined" )
					{
					
						busyDialogLoad.open();
		                prodDE = sap.ui.view({id: "prodDE", viewName: "queryregistry.Registry.ProdDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(prodDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(prodDE);
		                sap.ui.getCore().byId('TabBarProd').setSelectedKey("idP2");
		                var a = sap.ui.getCore().byId('idP2')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '09');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idP2');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(prodDE);
		                sap.ui.getCore().byId('TabBarProd').setSelectedKey("idP2"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '09');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;
					
					
				case "В проде":
					if (typeof(prodDE)=="undefined" )
					{
					
						busyDialogLoad.open();
		                prodDE = sap.ui.view({id: "prodDE", viewName: "queryregistry.Registry.ProdDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(prodDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(prodDE);
		                sap.ui.getCore().byId('TabBarProd').setSelectedKey("idP3");
		                var a = sap.ui.getCore().byId('idP3')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '10');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idP3');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(prodDE);
		                sap.ui.getCore().byId('TabBarProd').setSelectedKey("idP3"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '10');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;
					
				case "Журнал ошибок":
					if (typeof(journalDE)=="undefined" )
					{
					
						busyDialogLoad.open();
						journalDE = new sap.ui.view({id: "journalDE", viewName: "queryregistry.Registry.JournalDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(journalDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(journalDE);
		                sap.ui.getCore().byId('TabBarJ').setSelectedKey("idErJ");
		                var a = sap.ui.getCore().byId('idErJ')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '11');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idErJ');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(journalDE);
		                sap.ui.getCore().byId('TabBarJ	').setSelectedKey("idErJ"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '11');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;	
					
				case "Архив":
					if (typeof(archiveDE)=="undefined" )
					{
					
						busyDialogLoad.open();
						archiveDE = new sap.ui.view({id: "archiveDE", viewName: "queryregistry.Registry.ArchiveDe", type: sap.ui.core.mvc.ViewType.JS});
		                sap.ui.getCore().byId('workDeskSplitApp').addDetailPage(archiveDE);
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(archiveDE);
		                sap.ui.getCore().byId('TabBarAr').setSelectedKey("idArch");
		                var a = sap.ui.getCore().byId('idArch')
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '12');
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                a.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = a.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		                busyDialogLoad.close();
					}
	                
		            else{
		              var oTable = sap.ui.getCore().byId('idArch');
		                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		                   useBatch: false,
		                   defaultUpdateMethod: "Put"
		                   });
		                oModel.setSizeLimit(500);
		                sap.ui.getCore().setModel(oModel);
		                oTable.setModel(oModel);      
		                
		                sap.ui.getCore().byId('workDeskSplitApp').toDetail(archiveDE);
		                sap.ui.getCore().byId('TabBarAr	').setSelectedKey("idArch"); 
		                var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, request);
		                var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '12');
		                var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
		                oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilterAll]);
		                loop = oTable.getToolbar().getContent();
		                loop[ loop.length - 1].setValue(request);
		            }
					
					break;
					
					default:
						if ( request !== '')
							{
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.error("Запрос не найден!");
							}
						
					
				}
				
//				sap.m.MessageBox.error("Запрос не найден!");
			},
			error: function(){
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.error("Запрос не найден!");
			}
			
		});
//		oTable.setModel(oModel);
	},
	
	
	initWorkflowNotifyWebsocket : function() {

        var hostLocation = window.location, socket, socketHostURI, webSocketURI;
        if (hostLocation.protocol === "https:") {

        	socketHostURI = "wss:";

        } else {

        	socketHostURI = "ws:";

        }
        socketHostURI += "//" + hostLocation.host;
        webSocketURI = socketHostURI + '/sap/bc/apc/sap/Z_QUERY_NOTIFY';

        try {

        	socket = new WebSocket(webSocketURI);
            socket.onopen = function() { };
            var that = this;

            //Create function for handling websocket messages
            socket.onmessage = function(oDataMessage) {

            	//Create a popup toast message to notify the user
            	
            	document.addEventListener('DOMContentLoaded', function () {
            		
            		if (Notification.permission !== "granted")
            		    Notification.requestPermission();
            		
            	});

//            	function notifyMe() {
            		
            	if (!Notification) {
            			
            		jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.error("Ваш браузер не поддерживает уведомления!", {
									
						title: "Ошибка"});
            		    return;
            		
            	}if (Notification.permission !== "granted")
            		Notification.requestPermission();
            		
            	else {
          			
            		var notification = new Notification('Сообщение', {
            		
            			icon: 'images/migoGroup_logo.png',
//            		    body: "������ " + window.oDataMessage.Trkorr + Text,
            		    body: oDataMessage.data,
//            		    silent: false,
//            		    sound: "sound/1.mp3"
            		
            		});
            	}
            };
            socket.onclose = function() {

            };
        } catch (exception) {

        }
	},
			
	logoff: function(){
		
		var self = this;
		jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.confirm( "Вы действительно хотите выйти?", {
		
			title: "Выход",
			styleClass: "myNumbersRequests",
			onClose: function(oAction){			
			
				if(oAction == "OK"){	
				
					jQuery.sap.require("jquery.sap.storage");
					this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
					this.oStorage.clear();  	
					jQuery.ajax({
			
						type: "GET",
						url: "/sap/public/bc/icf/logoff",  //Clear SSO cookies: SAP Provided service to do that
				
					}).done(function(data){ //Now clear the authentication header stored in the browser
			
						if (!document.execCommand("ClearAuthenticationCache")) {
			
							//"ClearAuthenticationCache" will work only for IE. Below code for other browsers
			                $.ajax({
			
			                	type: "GET",
			                    url: "/sap/opu/odata/SOME/SERVICE", //any URL to a Gateway service
			                    username: 'dummy', //dummy credentials: when request fails, will clear the authentication header
			                    password: 'dummy',
			                    statusCode: { 401: function() {
			
			                    	//This empty handler function will prevent authentication pop-up in chrome/firefox
			                        location.reload();
			
			                    } },
			                    error: function() {
			
			                    	//alert('reached error of wrong username password')
			                    }
			                });
			            }else{
			                            	
			            	location.reload();
			
			            }			
			        })
				}			
			}});		
	},
			
	navigationItemTemplate: function(title, toMaster){
		
		var splitApp = sap.ui.getCore().byId('workDeskSplitApp');
		var itemTemplate = new sap.m.StandardListItem({
			
			title : title,
            iconInset: false,
            type: "Navigation",
            press: function(){
            	
            	splitApp.toMaster(toMaster);

            }
		});								
		
		return itemTemplate;
	
	},
	
	itemTemplate: function(title, toDetail){
		
		var splitApp = sap.ui.getCore().byId('workDeskSplitApp');
		var itemTemplate = new sap.m.StandardListItem({
			
			title : title,
            iconInset: true,
            type: "Active",
            press: function(){
            	
            	splitApp.toDetail(toDetail);

            }
		});
								
		return itemTemplate;
	},
	
	navigatePage: function(pageId, title, list, toMaster){
		
		var self = this;
		var splitApp = sap.ui.getCore().byId('workDeskSplitApp');
		return new sap.m.Page(pageId,{
	 			
			showHeader: true,
	 		showNavButton: true,
	 		title: title,
	 		headerContent: new sap.m.Button({
			    	 	
	 			icon: "sap-icon://visits",
			    press: function(){
			            	
			    	sap.ui.controller("queryregistry.WorkDesk").logoff();
		            	
			    }	
	 		}),
	 				 			
	 		navButtonPress: function(){
 				
//	 			self.removeLinks(toMaster);
	 			splitApp.backToPage(toMaster);
	 			
	 		},
			content: [list]
		});
	},	
	
	page: function(pageId, list){
		
		var headerBar = new sap.m.Bar({
			
			enableFlexBox: true,
			contentLeft: [new sap.m.Image({
			            	  			
				src: "images/migoGroup_logo.png",
				height:"43px",
				press: function(){
											
					location.reload(); }	
			
			}),new sap.m.Label({text: "Реестр запросов"})
			],
			
			contentRight:[new sap.m.Button({
			    	 	
				// text: "�����",
			    icon: "sap-icon://visits",
			     press: function(){
			            	
			    	 sap.ui.controller("queryregistry.WorkDesk").logoff();
		            	
			     }	
			
			}).addStyleClass("myButtonExit")
			
			],
			design: sap.m.BarDesign.Header
		
		});
										
		return new sap.m.Page(pageId, {

//			title: "Реестр запросов",
 			showHeader: true, 			
 			showNavButton: true,
 			customHeader: headerBar,
			content: [list]
		
		});
	},	
	
	indexOfByTarget: function(links, targetId){			
		
		for(var i=0;i<links.length;i++){
			
			var item = links[i];
			if(item.getTarget() == targetId){
				
				return i;				
			
			}			
		}				
		return -1;
	
	},
	
	removeLinks: function(targetId){
		
		var breadCrumbs = sap.ui.getCore().byId('breadCrumbsId');
		var links = breadCrumbs.getLinks();	
		var linkIndex = this.indexOfByTarget(links, targetId);
		for(var i = linkIndex + 1; i < links.length; i++){			
			
			var item = links[i];
			breadCrumbs.removeLink(item);			    				
		
		}
	},
	pressItem:function(oControlEvent){
		var selectList= sap.ui.getCore().byId('listServer');
		var oBindingContext = oControlEvent.getParameters().listItem;
        var NameItem = oBindingContext.getTitle();
		var regular = /([^\(]*)\((.*)\)/g;
        var nameCategory = regular.exec(NameItem);
        switch(nameCategory[1]){
        case 'DE0 ':
      	break;            
        case 'DET ':
        	var tabBar= sap.ui.getCore().byId("TabBarTest");
        	if(tabBar!== undefined){
        		sap.ui.controller("queryregistry.Registry.TestDe").changeBar();
        	}
      	break;
        case 'DEQ ':
        	var tabBar= sap.ui.getCore().byId("TabBar");
        	if(tabBar!== undefined){
        		sap.ui.controller("queryregistry.Registry.BeforeProdDe").changeBar();
        	}
      	break;
        case 'DE1 ' :
        	var tabBar= sap.ui.getCore().byId("TabBarProd");
        	if(tabBar!== undefined){
        		sap.ui.controller("queryregistry.Registry.ProdDe").changeBar();
        	}
      	  break;
        case 'Журнал ошибок ' :
      	break;
        case 'Архив ' :
      	break;
        }
        
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf queryregistry.WorkDesk
*/
	onBeforeRendering: function() {		
				
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf queryregistry.WorkDesk
*/
//	onAfterRendering: function() {
//					
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf queryregistry.WorkDesk
*/
	//onExit: function() {		
//	}

});