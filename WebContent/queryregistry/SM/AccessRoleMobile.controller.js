    sap.ui.controller("queryregistry.SM.AccessRoleMobile", {
  
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.Section.AccessRole
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
//				var idx = oTable.getSelectedIndex();
//				if (idx == -1) return;
//				var Code = {};
//				Code = oTable.getContextByIndex(idx).getObject();
//				openUpdateDialog(Code);},
				var item = oTable.getSelectedItem();
				var Code = item.getCells();
				openUpdateDialog(Code);},
		});
		
		var deleteButton = new sap.m.Button({
			enabled: false,
			icon: "sap-icon://delete",
			text: "Удалить",
			press: function() {
//				var idx = oTable.getSelectedIndex();
//				if (idx == -1) return;
//				var Code = oTable.getContextByIndex(idx).getObject().Code;
//				openDeleteDialog(Code);
				var item = oTable.getSelectedItem();
				var Code = item.getCells()[0].getText();
				openDeleteDialog(Code);
			}, 
		});
		
		

		var ToolBar = new sap.m.OverflowToolbar({ 
			design : sap.m.ToolbarDesign.Transparent, // sap.m.ToolbarDesign, since 1.16.8			
			content : [
		         refreshButton,
		         new sap.m.ToolbarSeparator(),
		         addButton,
		         editButton,
		         deleteButton,
		       	        
		        ],
			
		});
			
		var oTable = new sap.m.Table(tableId,{
			mode: sap.m.ListMode.MultiSelect,
			includeItemInSelection: true,
			headerToolbar: [
							ToolBar ,          
							],
			
	        items: {
	        	path: "/Access_roleSet",          
	        	template: newColumnListItem=new sap.m.ColumnListItem({
		        	type: "Active",
		        	cells:[]
		        	  }),
	        		},
	        	columns:[],              
	        });

		oTable.attachSelectionChange(function(oEvent){
			
			var quantitySelectedRows =  oTable.getSelectedItems().length; //получаем длину массива
			 if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
				    editButton.setEnabled(false);	  
			 }
			 else {
				    editButton.setEnabled(true);	  
			 }	 	
			(quantitySelectedRows >= 1)? deleteButton.setEnabled(true): deleteButton.setEnabled(false);
			 
		});
		 
		
		var oCell = new sap.m.Text({
			text:"{Code}"
		}); // short binding notation
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
		    header: new sap.m.Label({text: "Код"}), 
		}));
		
		var oCell = new sap.m.Text({
			text:"{Name}"
		});
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
		    header: new sap.m.Label({text: "Название"}),
		}));
		
		var oCell = new sap.m.Text({
			text:"{Description}"
		});
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
			minScreenWidth: "500px",
		    header: new sap.m.Label({text: "Описание"}),
		}));
		
							
	
		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    		 
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);	 	
		//oTable.bindRows("/Access_roleSet");

		/***** Create Role  *****/
		function openCreateDialog(){ 
			var oCreateDialog = new sap.m.Dialog({
				title: "Роли досутпа к реестру",
				stretchOnPhone: true ,
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
				title: "Редактирование типа запроса SAP",
				stretchOnPhone: true ,
			});

			var CheckType = Code[0].getText(); //Code.Code
			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				content:[
					new sap.m.Label({text:"Код", }),
			        new sap.m.Input({
			        	value:  Code[0].getText(), 
			        	required: true,
			        	editable: false,
			        	}),
				      
					new sap.m.Label({text:"Наименование"}),
					new sap.m.Input({
						value: Code[1].getText(),
						required: true, }),
				      
					new sap.m.Label({text:"Описание", required: true}),
					new sap.m.Input({
						value: Code[2].getText(),
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
						oEntry.Code = Code[0].getText();
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