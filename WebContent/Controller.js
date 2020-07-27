jQuery.sap.require("jquery.sap.storage");  
jQuery.sap.declare("queryregistry.Controller");

sap.ui.core.mvc.Controller.extend("queryregistry.Controller", {				
			
	onInit: function() {
		sap.ui.core.mvc.Controller.prototype.onInit.apply(this, arguments);
		
		var oView = this.getView();
		oView.setModel(new sap.ui.model.json.JSONModel({globalFilter: ""}), "ui");					
		this.oGlobalFilter = null;
	},
		
	filterGlobally : function(oEvent) {
		var sQuery = oEvent.getParameter("query");
		this.oGlobalFilter = null;

		if (sQuery) {
			this.oGlobalFilter = new sap.ui.model.Filter([
				new sap.ui.model.Filter("Number", sap.ui.model.FilterOperator.Contains, sQuery)				
			], false)
		}

		var table = oEvent.getSource().getParent().getParent();
		table.getBinding("items").filter(this.oGlobalFilter, "Application");
	},
	
	getEventBus : function () {
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		return sap.ui.component(sComponentId).getEventBus();
	},

	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);		
	},
	// ���������� ������ �� ��������� �������
	// sId - ������������� �������
	// oController - ���������� �����
	// targetPage - 
	// tabId - ������������� ���� �������� ����������� �������
	// forceMigrationName - �������� ������ �������������� ��������
	// approveName - �������� ������ ������������� ��������
	// doneName - ������ ���������
	// errorName - ������ ������
	// notMigrationName - �� ��������� ��������
	//
	getTableSettings: function(sId, oController, targetPage, tabId, forceMigrationName, approveName, doneName, errorName, notMigrationName ){
		return {
			sId: sId,
			oController: oController,
			oView: oView,
			targetPage: targetPage,
			tabId: tabId,
			forceMigrationName: forceMigrationName,
			approveName: approveName,
			doneName: doneName,
			errorName: errorName,
			notMigrationName: notMigrationName			
		}
	},	
	
	createTestTable: function(tableInfo){
		
		 var refreshButton = new sap.m.Button({
		    	icon: "sap-icon://refresh",
				tooltip: "�������� ������"	
		    });			    	    	   	   	      			 
		    
		    var removeButton = new sap.m.Button({
		    	icon: "sap-icon://decline",
				tooltip: "�������"			
		    });
		    
		    var numbersButton = new sap.m.Button({
		    	icon: "sap-icon://approvals",
				tooltip: "������ ��������"			
		    });
		    
		    var watchButton = new sap.m.Button({
		    	icon: "sap-icon://display",
				tooltip: "��������",
				press: function(){				
					var items = devGrid.getSelectedItems();				
					var context = items[0].oBindingContexts.devGridItems;				
					var model = context.getModel();
					var index = context.sPath.slice(-1);
					var data = model.getData();
					var item = data.items[index];
					oController.detailQuery(item);
				}
		    });
		    
		    var historyButton = new sap.m.Button({
		    	icon: "sap-icon://work-history",
				tooltip: "������� �������"			
		    });
		    
		    var buttons = [];
		    		   
		    var doneButton = new sap.m.Button({
			   	icon: "sap-icon://sys-enter-2",
				tooltip: tableInfo.doneName			
			});

	    	var errorButton = new sap.m.Button({
		    	icon: "sap-icon://error",
				tooltip: tableInfo.errorName			
		    });
	    			 	    		    		   
	    	var forceButton = new sap.m.Button({
		    	icon: "sap-icon://warning2",
				tooltip: "�������������� �������"			
		    });	    	    		    		    	
	    	
	    	var notMigrationButton = new sap.m.Button({
		    	icon: "sap-icon://sys-minus",
				tooltip: "�� ���������� � ����"			
		    });
		    			    			    		    	 		    
			var searchBox = new sap.m.SearchField({								
				enabled : true, // boolean
				visible : true, // boolean
				maxLength : 0, // int
				placeholder : "����� ��� ������", // string
				showMagnifier : true, // boolean
				showRefreshButton : false, // boolean, since 1.16			
				width: "15rem",
				value: "{ui>/globalFilter}",
				search: function(oEvent){
							oController.filterGlobally(oEvent);
						}
			});
			
			var devToolBar = new sap.m.Toolbar({			
				busy : false, // boolean
				busyIndicatorDelay : 1000, // int
				visible : true, // boolean			
				active : false, // boolean
				enabled : true, // boolean			
				design : sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign, since 1.16.8			
				content : [
				           refreshButton,
				           new sap.m.ToolbarSeparator(),			          					          
				           removeButton,
				           new sap.m.ToolbarSeparator(),
				           numbersButton,
				           new sap.m.ToolbarSeparator(),
				           watchButton,
				           historyButton,
				           new sap.m.ToolbarSeparator()					          			          
				          ], // sap.ui.core.Control			
			});						
			
			for(var i=0;i<buttons.length;i++){
				var item = buttons[i];
				devToolBar.addContent(item);
			}
			
			devToolBar.addContent(new sap.m.ToolbarSpacer());
			devToolBar.addContent(searchBox);				
							           				
			var devGrid = new sap.m.Table(tableId, {   		     		    
			      headerDesign : sap.m.ListHeaderDesign.Standard, 
			      mode : sap.m.ListMode.MultiSelect,   		     
			      includeItemInSelection : false,   
			      headerToolbar: devToolBar
			    });
			    
			var oTemplate = new sap.m.ColumnListItem({
			    cells : [				             				      			        
			        new sap.m.Text({
			            text : "{tableItems>Number}",
			            wrapping : false
			        }),
			        new sap.m.Text({
			            text : "{tableItems>AddDate}",
			            wrapping : false
			        }),
			        new sap.m.Text({
			            text : "{tableItems>Description}"
			        }), 
			        new sap.m.Text({
			            text : "{tableItems>Type}"
			        }),
			        new sap.m.Text({
			            text : "{tableItems>Owner}"
			        })
			    ]
			});
															
			    var col1 = new sap.m.Column({header: new sap.m.Label({text:"�����"})});		    		    
			    var col2 = new sap.m.Column({header: new sap.m.Label({text:"��������"})});		    		    
			    var col3 = new sap.m.Column({header: new sap.m.Label({text:"��������"})});
			    var col4 = new sap.m.Column({header: new sap.m.Label({text:"���"})});
			    var col5 = new sap.m.Column({header: new sap.m.Label({text:"�������"})});			    
			    
			    devGrid.addColumn(col1)
			    .addColumn(col2)
			    .addColumn(col3)
			    .addColumn(col4)
			    .addColumn(col5);
					    
			    if(typeTable == 'into'){		
			    	oTemplate.insertCell( new sap.m.Image({src:"{tableItems>icon}"}), 0);
			    	oTemplate.addCell( new sap.m.Text({text:"{tableItems>commentary}"}));
			    	oTemplate.addCell( new sap.m.Text({text:"{tableItems>linkToWiki}"}));
			    	oTemplate.addCell( new sap.m.Text({text:"{tableItems>state}"}));
			    	
			    	var colTemp = new sap.m.Column({header: new sap.m.Label({text:""})});
					devGrid.insertColumn(colTemp, 0);			    	
					colTemp = new sap.m.Column({header: new sap.m.Label({text:"���. � ������������"})});
					devGrid.addColumn(colTemp);
					colTemp = new sap.m.Column({header: new sap.m.Label({text:"������ �� wiki"})});
					devGrid.addColumn(colTemp);
					colTemp = new sap.m.Column({header: new sap.m.Label({text:"������"})});
					devGrid.addColumn(colTemp);
				}
			    
			    var oModelTable = new sap.ui.model.json.JSONModel();  
				var tableData = {"items": []};  				     				 			  
				oModelTable.setData(tableData); 
			    
				view.setModel(oModelTable, "tableItems"); 		    
			    devGrid.bindItems("tableItems>/items", oTemplate);	
			    
			    return devGrid;					
	},
	
	
	
});