sap.ui.controller("queryregistry.Section.SapRequestType", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.Section.SapRequestType
*/
//	onInit: function() {
//
//	},

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
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean	
			active : false, // boolean
			enabled : true, // boolean			
			design : sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign, since 1.16.8			
			content : [
		         refreshButton,
		       	        
		        ],
			
		});
			
		var oTable = new sap.ui.table.Table(tableId,{
			height: "100%",
			rowHeight: 30,
			visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
			selectionBehavior: sap.ui.table.SelectionBehavior.Row,
			selectionMode: sap.ui.table.SelectionMode.None ,
	        enableColumnReordering:true,
	        toolbar: [
	        ToolBar ,          
	                  ],
		
	        });
		
		var oControl = new sap.ui.commons.TextView({text:"{DomvalueL}"}); // short binding notation
		oTable.addColumn(new sap.ui.table.Column({
			width: "50px",
			label: new sap.ui.commons.Label({text: "Код"}), 
			template: oControl }));
		
		oControl = new sap.ui.commons.TextView({text:"{Ddtext}"}); // more verbose binding notationt
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Наименование"}),
			template: oControl }));
		
		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);	 	
		 oTable.bindRows("/TRFUNCTIONSet");


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