   sap.ui.controller("queryregistry.SM.UsersMobile", {
 
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.Section.Users
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
//				var Login = {};
//			    Login = oTable.getContextByIndex(idx).getObject();
//				openUpdateDialog(Login);},
				var item = oTable.getSelectedItem();
				var Login = item.getCells();
				openUpdateDialog(Login);},
		});
		
		var deleteButton = new sap.m.Button({
			enabled: false,
			icon: "sap-icon://delete",
			text: "Удалить",
			press: function() {
//				var idx = oTable.getSelectedIndex();
//				if (idx == -1) return;
//				var Login = oTable.getContextByIndex(idx).getObject().Login;
//				openDeleteDialog(Login);
				var item = oTable.getSelectedItem();
				var Login = item.getCells()[0].getText();
				openDeleteDialog(Login);
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
	        	path: "/UsersSet",          
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
			text:"{Login}"
		}); // short binding notation
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
		    header: new sap.m.Label({text: "Логин"}), 
		}));
		
//		var oControl = new sap.ui.commons.TextField().bindProperty("value", "Login"); // short binding notation
//		oTable.addColumn(new sap.ui.table.Column({
//			width: "100px",
//			label: new sap.ui.commons.Label({text: "Логин"}), 
//			template: oControl }));
		
		var oCell = new sap.m.Text({
			text:"{LastName}"
		}); // short binding notation
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
			minScreenWidth: "500px",
		    header: new sap.m.Label({text: "Фамилия"}), 
		}));
		
//		oControl = new sap.ui.commons.TextView({text:"{LastName}"}); // more verbose binding notationt
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Фамилия"}),
//			template: oControl }));
		
		var oCell = new sap.m.Text({
			text:"{FirstName}"
		}); // short binding notation
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
			minScreenWidth: "500px",
		    header: new sap.m.Label({text: "Имя"}), 
		}));
		
//		oControl = new sap.ui.commons.TextView({text:"{FirstName}"});
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Имя"}),
//			template: oControl }));
		
		var oCell = new sap.m.Text({
			text:"{Surename}"
		}); // short binding notation
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
			
			minScreenWidth: "500px",
		    header: new sap.m.Label({text: "Отчество"}), 
		}));
		
		
		
//		oControl = new sap.ui.commons.TextView({text:"{Surename}"});
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Отчество"}),
//			template: oControl }));
		
		var oCell = new sap.m.Text({
			text:"{AccessRole}"
		}); // short binding notation
		newColumnListItem.addCell(oCell);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
		    header: new sap.m.Label({text: "Роль доступа"}), 
		}));
		
//		oControl = new sap.ui.commons.TextView({text:"{AccessRole}"});
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Роль доступа"}),
//			template: oControl }));
							
	
		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);	 	
		//oTable.bindRows("");
		

		//rows = oTable.getRows();

		/***** Create Role  *****/
		function openCreateDialog(){ 
			var oCreateDialog = new sap.m.Dialog({
				stretchOnPhone: true ,
				title: "Роли досутпа к реестру"
			});
			var oDropDownBox = new sap.m.ComboBox();
			oDropDownBox.setModel(oModel);			
			var itemTemplate = new sap.ui.core.ListItem({
				key: "{Code}",
				text: "{Name}",
				additionalText: "{Code}",
			});
			oDropDownBox.setShowSecondaryValues(true);
			oDropDownBox.bindItems("/Access_roleSet", itemTemplate);

			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				content:[
					new sap.m.Label({text:"Логин"}),
			        new sap.m.Input({
						required: true,
						}),
				      
					new sap.m.Label({text:"Фамилия"}),
					new sap.m.Input({
						value:"",
						}),
				      
					new sap.m.Label({text:"Имя"}),
					new sap.m.Input({
						}),
				    
				    new sap.m.Label({text:"Отчество"}),
				    new sap.m.Input({
						}),
					      
					new sap.m.Label({text:"Роль доступ"}),
					oDropDownBox.setRequired(true),
				         				      
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
							 if(control.getValue() === "" && i!=3 && i!=5 && i!=7) {
								 control.setValueState(sap.ui.core.ValueState.Error); 
								 return;
							 }
							 else{
								 control.setValueState(sap.ui.core.ValueState.None);
							 }
							}
						}
						var oEntry = {};
						oEntry.Login = content[1].getValue();
						oEntry.LastName = content[3].getValue();
						oEntry.FirstName = content[5].getValue();
						oEntry.Surename = content[7].getValue();
						oEntry.AccessRole = oDropDownBox.getSelectedKey();
    
						sap.ui.getCore().getModel().create('/UsersSet',oEntry, {
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
								sap.m.MessageBox.error("Ошибка при присвоениее роли доступа пользователю!", {
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
		
		function openUpdateDialog(Login){ 
			var oUpdateDialog = new sap.m.Dialog({
				stretchOnPhone: true ,
				title: "Редактирование типа запроса SAP"
			});
			
			var oDropDownBox = new sap.m.ComboBox();
			oDropDownBox.setModel(oModel);			
			var itemTemplate = new sap.ui.core.ListItem({
				key: "{Code}",
				text: "{Name}",
				additionalText: "{Code}",
			});
			oDropDownBox.setShowSecondaryValues(true);
			oDropDownBox.bindItems("/Access_roleSet", itemTemplate);
			oDropDownBox.setSelectedKey(Login[4].getText());
			//console.log(Login[4].getText());
			var CheckType = Login[0].getText();//Login.Login, 
			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				content:[
					new sap.m.Label({
						text:"Логин", }),
						
			        new sap.m.Text({
			        	text: Login[0].getText(), //
			        	required: true,
			        	}),
				      
					new sap.m.Label({
						text:"Фамилия"}),
					new sap.m.Input({
						value: Login[1].getText(),
						}),
				      
					new sap.m.Label({
						text:"Имя", 
						required: true
						}),
	
					new sap.m.Input({
						value: Login[2].getText(),
						}),
				  
				    new sap.m.Label({
				    	text:"Отчество",
				    	required: true}),
				    	
					new sap.m.Input({
						value: Login[3].getText(),
						}),
					      
					new sap.m.Label({
						text:"Роль доступ"}),
					oDropDownBox.setRequired(true),
					
				      
				]
			});				
			oUpdateDialog.addContent(oSimpleForm);
			oUpdateDialog.addButton(
				new sap.m.Button({
					text: "Сохранить", 
					press: function() {
						var content = oSimpleForm.getContent();

							 if(oDropDownBox.getValue() == "" || CheckType != Login[0].getText()) {
								 oDropDownBox.setValueState(sap.ui.core.ValueState.Error); 
								 return;
							 }
							 else{
								 oDropDownBox.setValueState(sap.ui.core.ValueState.None);
							 }

						var oEntry = {};
						oEntry.Login      = content[1].getText();
						oEntry.LastName   = content[3].getValue();
						oEntry.FirstName  = content[5].getValue();
						oEntry.Surename   = content[7].getValue();
						oEntry.AccessRole = oDropDownBox.getSelectedKey();
						
						sap.ui.getCore().getModel().update("/UsersSet('" + oEntry.Login + "')", oEntry, {
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
							error: function(){
								oUpdateDialog.close();
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.error("Произошла ошибка при редактировании пользователя!", {
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

      /***** Delete *****/
		
		function openDeleteDialog(Login) {
			
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.confirm("Вы уверены что хотите удалить пользователя с ролью доступа " + Login + " ?", {
				title: "Удаление пользователя с ролью доступа",
				onClose: function(oAction){
					
					switch(oAction){
						case 'OK':
							sap.ui.getCore().getModel().remove("/UsersSet('" + Login + "')", {
								success: function(){;
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
										text: "Произошла ошибка при удалении удалении пользователя с ролью доступа " + Login
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
* @memberOf queryregistry.Section.Users
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf queryregistry.Section.Users
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf queryregistry.Section.Users
*/
//	onExit: function() {
//
//	}

});