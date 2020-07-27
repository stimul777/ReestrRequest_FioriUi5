  sap.ui.controller("queryregistry.SM.SapRequestTypeMobile", {
 
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.Section.SapRequestType
*/
onInit: function() {
		
		jQuery.sap.require("sap.m.MessageBox");
		sap.ui.Device.orientation.attachHandler(function(oEvt){
		      if(jQuery.device.is.landscape){
           
		    sap.m.MessageBox.show("Please use this application in Landscape mode.",sap.m.MessageBox.Icon.INFORMATION );
		    jQuery.device.is.portrait = true;
		      }

	});
	},	

	createTable : function(tableId, oController, view) {
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		var link = this.oStorage.get("IDSystemLink");
		
		var refreshButton = new sap.m.Button({
	    	icon: "sap-icon://refresh",
	    	press: function(){
	    		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
				 oModel.setSizeLimit(500);
				 sap.ui.getCore().setModel(oModel);
				 oTable.setModel(oModel);	 	
			}
	    }).addStyleClass("myRefreshButton");	
		
		
		var ToolBar = new sap.m.Toolbar({		
			design : sap.m.ToolbarDesign.Solid, // sap.m.ToolbarDesign, since 1.16.8			
			content : [
		         refreshButton,       
		         	  ],
		});
			
		var oTable =new sap.m.Table(tableId,{
			//mode: sap.m.ListMode.MultiSelect,
			//includeItemInSelection: true,
			headerToolbar: [
								ToolBar ,          
						   ],
	        items: {
	        	path: "/TRFUNCTIONSet",  //        /Query_registrySet
	        	template: newColumnListItem=new sap.m.ColumnListItem({
		        type: "Active",
		        cells:[]
		        	  }),
	        		},
	        columns:[],              
	        });
		
		var oCell = new sap.m.Text({
			text:"{DomvalueL}"
		});
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: false,
			width: "15%",
		    header: new sap.m.Label({text: "Код"}), 
		}));
		
		oCell = new sap.m.Text({
			text:"{Ddtext}"
		});
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
		    header: new sap.m.Label({text: "Наименование"}),
		}));
		
		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);	 	
		// oTable.bindRows("/TRFUNCTIONSet");


		return oTable;
		},
	
	
	
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf queryregistry.Section.SapRequestType
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf queryregistry.Section.SapRequestType
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf queryregistry.Section.SapRequestType
*/
//	onExit: function() {
//
//	}

});