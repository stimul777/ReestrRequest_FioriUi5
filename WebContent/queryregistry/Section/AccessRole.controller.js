sap.ui.controller("queryregistry.Section.AccessRole", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.Section.AccessRole
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
		
		var addButton = new sap.m.Button({
			icon: "sap-icon://add",
			text: "Добавить",
			press: function() {
				openCreateDialog();},
		});
		
		var editButton = new sap.m.Button({
			enabled: false,
			icon: "sap-icon://edit",
			text: "Изменить",
			press: function() {
				var idx = oTable.getSelectedIndex();
				if (idx == -1) return;
				var Code = {};
				Code = oTable.getContextByIndex(idx).getObject();
				openUpdateDialog(Code);},
		});
		
		var deleteButton = new sap.m.Button({
			enabled: false,
			icon: "sap-icon://delete",
			text: "Удалить",
			press: function() {
				var idx = oTable.getSelectedIndex();
				if (idx == -1) return;
				var Code = oTable.getContextByIndex(idx).getObject().Code;
				openDeleteDialog(Code);
				
			}, 
		});
		
		

		var ToolBar = new sap.m.Toolbar({
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean	
			active : false, // boolean
			enabled : true, // boolean			
			design : sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign, since 1.16.8			
			content : [
		         refreshButton,
		         new sap.m.ToolbarSeparator(),
		         addButton,
		         editButton,
		         deleteButton,
		       	        
		        ],
			
		});
			
		var oTable = new sap.ui.table.Table(tableId,{
			height: "100%",
			rowHeight: 30,
			visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
			selectionBehavior: sap.ui.table.SelectionBehavior.Row,
			selectionMode: sap.ui.table.SelectionMode.MultiToggle,
	        enableColumnReordering:true,
	        toolbar: [
	        ToolBar ,          
	                  ],
		
	        });

		oTable.attachRowSelectionChange(function(oEvent){
			
			var quantitySelectedRows =  oTable.getSelectedIndices().length; //получаем длину массива
			 if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
				    editButton.setEnabled(false);	  
			 }
			 else {
				    editButton.setEnabled(true);	  
			 }	 	
			(quantitySelectedRows >= 1)? deleteButton.setEnabled(true): deleteButton.setEnabled(false);
			 
		});
		 
		
		var oControl = new sap.ui.commons.TextField().bindProperty("value", "Code"); // short binding notation
		oTable.addColumn(new sap.ui.table.Column({
			width: "100px",
			label: new sap.ui.commons.Label({text: "Код"}), 
			template: oControl }));
		
		oControl = new sap.ui.commons.TextView({text:"{Name}"}); // more verbose binding notationt
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Название"}),
			template: oControl }));
		
		oControl = new sap.ui.commons.TextView({text:"{Description}"});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Описание"}),
			template: oControl }));
		
							
	
		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);	 	
		oTable.bindRows("/Access_roleSet");

		/***** Create Role  *****/
		function openCreateDialog(){ 
			var oCreateDialog = new sap.m.Dialog({
				title: "Роли досутпа к реестру"
			});

			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				content:[
					new sap.m.Label({text:"Код"}),
			        new sap.m.Input({
			        	required: true }),
				      
					new sap.m.Label({text:"Название"}),
					new sap.m.Input({
						required: true }),
				      
					new sap.m.Label({text:"Описание"}),
					new sap.m.Input({
						required: true }),
				         				      
				]
			});				
			oCreateDialog.addContent(oSimpleForm);
			oCreateDialog.addButton(
				new sap.m.Button({
					text: "Сохранить", 
					press: function() {
						var content = oSimpleForm.getContent();
						for (var i in content) {
							var control = content[i];
							if(control.getValue){ 
							 if(control.getValue() === "") {
								 control.setValueState(sap.ui.core.ValueState.Error); 
								 return;
							 }
							 else{
								 control.setValueState(sap.ui.core.ValueState.None);
							 }
							}
						}
						var oEntry = {};
						oEntry.Code = content[1].getValue();
						oEntry.Name = content[3].getValue();
						oEntry.Description = content[5].getValue();
    
						sap.ui.getCore().getModel().create('/Access_roleSet',oEntry, {
							success: function(){
							oCreateDialog.close();
							var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });
							 oModel.setSizeLimit(500);
							 sap.ui.getCore().setModel(oModel);
							 oTable.setModel(oModel);	 	
							},
							error: function(){
								oCreateDialog.close();
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.error("Произошла ошибка при создании роли доступа!", {
										title: "Ошибка"});
							}
						});
					}
				})
			);
			oCreateDialog.addButton(
					new sap.m.Button({
						text: "Закрыть",
						press: function(){
							oCreateDialog.close();
						}
					}))
			oCreateDialog.open();
		};		
		
		/***** Update Role  *****/
		
		function openUpdateDialog(Code){ 
			var oUpdateDialog = new sap.m.Dialog({
				title: "Редактирование типа запроса SAP"
			});

			var CheckType = Code.Code;
			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				content:[
					new sap.m.Label({text:"Код", }),
			        new sap.m.Input({
			        	value: Code.Code, 
			        	required: true,
			        	editable: false,
			        	}),
				      
					new sap.m.Label({text:"Наименование"}),
					new sap.m.Input({
						value: Code.Name,
						required: true, }),
				      
					new sap.m.Label({text:"Описание", required: true}),
					new sap.m.Input({
						value: Code.Description,
						required: true,}),
				      
				]
			});				
			oUpdateDialog.addContent(oSimpleForm);
			oUpdateDialog.addButton(
				new sap.m.Button({
					text: "Сохранить", 
					press: function() {
						var content = oSimpleForm.getContent();
						for (var i in content) {
							var control = content[i];
							if(control.getValue){ 
							 if(control.getValue() == "") {
								 control.setValueState(sap.ui.core.ValueState.Error); 
								 return;
							 }
							 else{
								 control.setValueState(sap.ui.core.ValueState.None);
							 }
							}
						}
						var oEntry = {};
						oEntry.Code = Code.Code;
						oEntry.Name = content[3].getValue();
						oEntry.Description = content[5].getValue();
						
						sap.ui.getCore().getModel().update("/Access_roleSet('" + oEntry.Code + "')", oEntry, {
							success: function(){
								oUpdateDialog.close();
								var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
							    	 useBatch: false,
							    	 defaultUpdateMethod: "Put"
							    	 });
								 oModel.setSizeLimit(500);
								 sap.ui.getCore().setModel(oModel);
								 oTable.setModel(oModel);	 	
							},
							error : function(){
								oUpdateDialog.close();
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.error("Произошла ошибка при изменении роли доступа!", {
										title: "Ошибка"});
							}
						});
					}
				})
			);
			oUpdateDialog.addButton(
					new sap.m.Button({
						text: "Закрыть",
						press: function(){
							oUpdateDialog.close();
						}
					}))
			oUpdateDialog.open();
		};

		/***** Delete Role  *****/
		
		function openDeleteDialog(Code) {
			
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.confirm("Вы уверены что хотите удалить роль доступа " + Code + " ?", {
				title: "Удаление роли доступа",
				onClose: function(oAction){
					
					switch(oAction){
						case 'OK':
							sap.ui.getCore().getModel().remove("/Access_roleSet('" + Code + "')", {
								success: function(){
								var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
							    	 useBatch: false,
							    	 defaultUpdateMethod: "Put"
							    	 });
								 oModel.setSizeLimit(500);
								 sap.ui.getCore().setModel(oModel);
								 oTable.setModel(oModel);	 	
							},
							error: function(){
								
								var dialog = new sap.m.Dialog({
									title: "Ошибка",
									type: sap.m.DialogType.Message,
									state: sap.ui.core.ValueState.Error,
									content: new sap.m.Text({
										text: "Произошла ошибка при удалении роли доступа " + Code
									}),
									beginButton: new sap.m.Button({
										text: "Ок",
										press: function () {
											dialog.close();
										}
									}),
									afterClose: function() {
										dialog.destroy();
									}
								});
								}
							});
							break;
						case 'CANCEL':								
							break;
					}
				}
			 });
			
		}	

		return oTable;
		}
		
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf queryregistry.Section.AccessRole
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf queryregistry.Section.AccessRole
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf queryregistry.Section.AccessRole
*/
//	onExit: function() {
//
//	}

});