  sap.ui.controller("queryregistry.Mobile_version.DevelopDeMobile", {
 
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.Mobile_version.DevelopDeMobile
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

	
createTable : function(tableId, oController, view, typeTable) {
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	//	var check = this.oStorage.get("IDCheck");
		var link = this.oStorage.get("IDSystemLink");
		
		busyDialog = new sap.m.BusyDialog({
			text: "Загрузка данных...",
            showCancelButton : false
            });

		var refreshButton = new sap.m.Button({
			icon : "sap-icon://refresh",
			tooltip : "Обновить",
			press: function(){
//				var oModel = new sap.ui.model.odata.ODataModel(link,false);		
//				sap.ui.getCore().setModel(oModel);
//				oTable.setModel(oModel);
				var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			     });
				 oModel.setSizeLimit(500);
				 sap.ui.getCore().setModel(oModel);
				 oTable.setModel(oModel);
			}
		});
		refreshButton.addStyleClass("myRefreshButton");

		var addButton = new sap.m.Button({
			busyIndicatorDelay : 1,
			icon : "sap-icon://add",
			press : function() {
				busyDialog.open();
				openCreateDialog();
			}
		});

		var editButton = new sap.m.Button({
			tooltip: "Редактировать запрос",
			icon : "sap-icon://edit",
			enabled: false,
			press: function(oEvent) {

				var item = oTable.getSelectedItem();
				var cellsItem = item.getCells();
				openUpdateDialog(cellsItem);},
		});
		

		var deleteButton = new sap.m.Button({
			tooltip: "Удалить запрос",
			icon : "sap-icon://decline",
			enabled: false,
			press:  function() {
				var item = oTable.getSelectedItem();
				//if (idx == -1) return;
				var ReleaseType= item.getCells();
				//var ReleaseType = rows[idx].getCells();
				openDeleteDialog(ReleaseType);
			}, 
				
		});

		var numbersButton = new sap.m.Button({
			text: "Номера запросов",
			icon : "sap-icon://approvals",
			enabled: false,
			press: function() {
				var array = [];
				for ( i = 0; i< oTable.getSelectedItems().length; i++){
				var NumbersTrkorr = oTable.getSelectedItems()[i].getCells(); 
				
				array.push(NumbersTrkorr[0].getText());
				}			
				openNumbersTrkorrDialog(array);							   
			},
		});

		var watchButton = new sap.m.Button({
			text: "Просмотр запроса",
			icon : "sap-icon://display",
			enabled: false,
			press : function(){
				var item = oTable.getSelectedItem();
				//if (idx == -1) return;
				var rows = item.getCells();
				var Trkorr = rows;
				watch(Trkorr);},
		});

		var historyButton = new sap.m.Button({
			text: "История запроса",
			icon : "sap-icon://work-history",
			enabled: false,
			press: 
				function (){
				var item = oTable.getSelectedItem();
			//	if (idx == -1) return;
				var rows = item.getCells();
				var Trkorr = rows;
				history(Trkorr);							
			},
		});

		var doneButton = new sap.m.Button({
			icon : "sap-icon://sys-enter-2",
			enabled: false,
			press: function(){
				push();
				},
		});
		doneButton.addStyleClass("myDoneButton");
		
		var forceButton = new sap.m.Button({
			tooltip: "Принудительный перенос запроса",
	    	icon: "sap-icon://alert",
	    	visible: false,
			press: function() {
				var item = oTable.getSelectedItem();
				//if (idx == -1) return;
				var rows = item.getCells();
				var Trkorr = rows;
				openForceDialog(Trkorr);},
	    });
		
		forceButton.addStyleClass("myAlertButton");
    	if (check == "true"){
    		forceButton.setVisible(true);
    	}

		var searchBox = new sap.m.SearchField({	
			placeholder : "Поиск...", 	
			search: function(oEvent){
				Search(oEvent);
			},

		});
			
       var devToolBar = new sap.m.OverflowToolbar({ 
			design : sap.m.ToolbarDesign.Transparent, 
			content : [ 
			            refreshButton, 
			            addButton,
			            editButton,
			            deleteButton, 
			            doneButton,
			            forceButton,
			            new sap.m.ToolbarSeparator(),         
			            //searchBox,
			            numbersButton, 
						watchButton,
						historyButton, 
						
					  ], 		
		});
	   
       var infoToolbar = new sap.m.Toolbar({
    	   	width: "100%",
			design : sap.m.ToolbarDesign.Transparent, 
			content : [ 			                    
			            searchBox,			        			
					  ], 		
		}).addStyleClass("searchBox");
//        var oTableColumn = new sap.m.Table("TableColumn",{
//        	showNoData:false,
//        	headerToolbar: [
//		                	devToolBar          
//	                  	   ],
//        	columns: [
//					new sap.m.Column({
//					demandPopin: true,
//					header: new sap.m.Label({text: "Номер"}), 
//					}),
//					
//					new sap.m.Column({
//					minScreenWidth: "500px",
//					demandPopin: true,
//					header: new sap.m.Label({text: "Добавлен"}), 
//					}),
//	              
//					new sap.m.Column({
//					header: new sap.m.Label({text: "Описание"}), 
//					}),
//					
//					new  sap.m.Column({
//					minScreenWidth: "500px",
//					demandPopin: true,
//					header: new sap.m.Label({text: "Тип"}), 
//					}),
//					
//					new  sap.m.Column({
//					minScreenWidth: "500px",
//					demandPopin: true,
//					header: new sap.m.Label({text: "Добавил"}),
//					}),	              
//		        ],
//        });
        
   	var check = this.oStorage.get("IDCheck");
		var oTable = new sap.m.Table(tableId,{
			mode: sap.m.ListMode.MultiSelect,
			includeItemInSelection: true,
		    headerToolbar: [
		                	devToolBar          
	                  	   ],
	        infoToolbar: infoToolbar,
	        items: {
	        	path: "/Query_registrySet",          
	        	template: new sap.m.ColumnListItem({
	        	type: "Active",
	        	//press :function(oEvent){var mode = oEvent.getParameter("items").getValue();
			//	this.getView().byId("tableId").setMode(mode);},
	        	cells:[             
	        	       new sap.m.Text({
	        	       text:"{Trkorr}"
	        	        }),
	        	        new sap.m.Text({
	        	        	text: {
	        	    			path: "CreateDate",
	        	    			type: new sap.ui.model.type.DateTime({
	        	    				pattern: "dd-MM-yyyy HH:mm:ss",
	        	    				UTC: true })

	        	    			}
	        	        }),
	        	        new sap.m.Text({
	        	        text: "{TuskNumber}"+"-"+"{Version}"+":"+"{Description}",
	        	        }),
	        	        new sap.m.Text({
	        	        text:"{Trfunction}"
	        	        }),
	        	        new sap.m.Text({
	        	        text:"{CreatorLogin}"
	        	        })
	        	     ]
	        	  })        	
	        	},
	        	
		    columns: [
						new sap.m.Column({
						demandPopin: true,
						header: new sap.m.Label({text: "Номер"}), 
						}),
						
						new sap.m.Column({
						minScreenWidth: "500px",
						demandPopin: true,
						header: new sap.m.Label({text: "Добавлен"}), 
						}),
		              
						new sap.m.Column({
						header: new sap.m.Label({text: "Описание"}), 
						}),
						
						new  sap.m.Column({
						minScreenWidth: "500px",
						demandPopin: true,
						header: new sap.m.Label({text: "Тип"}), 
						}),
						
						new  sap.m.Column({
						minScreenWidth: "500px",
						demandPopin: true,
						header: new sap.m.Label({text: "Добавил"}),
						}),

  
		              ],
		              
		              
	        });
		
		var scroll = new sap.m.ScrollContainer("scroll",{
			  height: '63%',
			  vertical :true,
              focusable: true,
			  content: [oTable],
				});
		

		var check = this.oStorage.get("IDCheck");
		
		if (check == "false") {
			
			deleteButton.setVisible(false);
		
		}

		 oTable.attachSelectionChange(function(oEvent){ 
			
			var quantitySelectedRows =  oTable.getSelectedItems().length; //получаем длину массива
			 if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
				    editButton.setEnabled(false);
				    if (quantitySelectedRows == 0 ) {
				    doneButton.setEnabled(false); }
				    else{
			    	doneButton.setEnabled(true);	
				    }
				    watchButton.setEnabled(false);
				    historyButton.setEnabled(false);
				    deleteButton.setEnabled(false);
				    forceButton.setEnabled(false);
			 }
			 else {
				 if (quantitySelectedRows == 1) {
					 check = "true";
					 if(check=="true"){
					 editButton.setEnabled(true);
				    deleteButton.setEnabled(true);
				    forceButton.setEnabled(true);	}				}
				 else {
				 	editButton.setEnabled(false);
				 	deleteButton.setEnabled(false);
				 	forceButton.setEnabled(false);
				 	  }
				    doneButton.setEnabled(true);
				    watchButton.setEnabled(true);
				    historyButton.setEnabled(true);
				    forceButton.setEnabled(true);
			 		 }	 	
			 
			(quantitySelectedRows >= 1)? numbersButton.setEnabled(true): numbersButton.setEnabled(false);
		});
				
		var oGroupField = new sap.m.Text().bindText("text", {
			parts: [
			        {path: "TuskNumber" },
                    {path: "Version" },
                    {path: "Description" }			        		        
			       ],
			       
			formatter: function(TuskNumber, Version, Description){   
                       return TuskNumber + "-" + Version + ": " + Description;
					}       
		
		});
				
	    var oModel = new sap.ui.model.odata.v2.ODataModel(link,{
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);
	    


		var oFilter = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '01');
  
		oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template, undefined, oFilter);
//		scroll.addContent(oTable);

		
/**** Create Request *****/		
		function openCreateDialog(){
			var oCreateDialog = new sap.m.Dialog({
				title: "Новый запрос (DE)",
				stretchOnPhone: true 
			});
			
			var oDropDownBox 			= new sap.m.ComboBox();
			var oDropDownBoxTypeRequest = new sap.m.ComboBox();
			var CheckBoxEcatt           = new sap.m.CheckBox({text: "Запрос для eCATT"});
			
			var oComboBoxReqFunction 	= new sap.m.ComboBox();		//
			
			oDropDownBoxTypeRequest.setModel(oModel);
			oDropDownBox.setModel(oModel);
			oComboBoxReqFunction.setModel(oModel); //
			
			
			var itemTemplate = new sap.ui.core.ListItem({
				key: "{Id}",
				text: "{Subject}",
				additionalText: "{Id}",
			});
//
			var itemTemplateReqFunction = new sap.ui.core.ListItem({
				
				key: "{Code}",
				text: "{Name}",
				
			});
//
			var itemTemplateTypeRequest = new sap.ui.core.ListItem({
				
				key: "{DomvalueL}",
				text:"{Ddtext}",

			});
			
            var itemTemplateRole = new sap.ui.core.ListItem({
            	text:"{RoleId}",
            	additionalText:"{RoleText}"});

            var itemTemplateTransaction = new sap.ui.core.ListItem({
            	text:"{Tcode}",
            	additionalText:"{Ttext}"});

        	var arrayRole = [];
        	var arrayTrans = [];
        	var strRole = "";
        	var strTrans = "";
            var oMultiComboBoxRole = new sap.m.MultiComboBox({
                items : {
                  path : "/RoleSet",
                  template : new sap.ui.core.ListItem({
                    key  : "{RoleId}",
                    text : "{RoleId}",
                  }),
                },
	            selectionFinish: function(oControlEvent){
                    strRole = "";	            	
	          		var items = oMultiComboBoxRole.getSelectedItems();
        		
	          		 for (var i = 0; i < items.length; i++) {
	          		var item = items[i];
	          		var context = item.getBindingContext();
	          	     arrayRole.push(context.getProperty("RoleId",context));
	          	     strRole += arrayRole[i] + " ";
	          		 }
	          		 },
              });

            var oMultiComboBoxTransaction = new sap.m.MultiComboBox({
                items : {
                  path : "/TRANSACTIONSet",
                  template : new sap.ui.core.ListItem({
                    text : "{Tcode}",
                  })
                },
                selectionFinish: function(oControlEvent){
                    strTrans = "";	            	
	          		var items = oMultiComboBoxTransaction.getSelectedItems();
        		
	          		 for (var i = 0; i < items.length; i++) {
	          		var item = items[i];
	          		var context = item.getBindingContext();
	          	     arrayTrans.push(context.getProperty("Tcode",context));
	          	     strTrans += arrayTrans[i] + " ";
	          		 }
	          		 },
              });

			oDropDownBox.setShowSecondaryValues(true);
            oDropDownBoxTypeRequest.setShowSecondaryValues(true);
            
            oDropDownBox.bindItems("/TASKSHDSet", itemTemplate);
            oDropDownBoxTypeRequest.bindItems("/TRFUNCTIONSet", itemTemplateTypeRequest);	
            oComboBoxReqFunction.bindItems("/Function_releasesSet", itemTemplateReqFunction);

            oMultiComboBoxTransaction.setModel(oModel);
            oModel.setSizeLimit(1000);

			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				
				content:[
					new sap.m.Label({text:"Задача"}),
					oDropDownBox.setRequired(true),
					
					new sap.m.Label({text:"Тип запроса"}),
					oDropDownBoxTypeRequest.setRequired(true),
				
					new sap.m.Label({text:"Описание"}),
				
				      new sap.m.TextArea({
				    	  required: true,
				    	  cols: 60,
				    	  height: "125px"
				    	
				      }),
				      
				      new sap.m.Label({text:"Функция", }),
						oComboBoxReqFunction.setRequired(true),
						
				      new sap.m.Label({text:"Роли"}),
				      oMultiComboBoxRole,
				
					
				      new sap.m.Label({text:"Транзакции"}),
				      oMultiComboBoxTransaction,
				
				      new sap.m.Label({text:""}),
				      CheckBoxEcatt,
				         				
				]
			});				
			oCreateDialog.addContent(oSimpleForm);
			oModel.attachRequestCompleted(function(){
				busyDialog.close();
				});	
			
			oCreateDialog.addButton(
				new sap.m.Button({
					text: "Сохранить",
					press: function() {
						var content = oSimpleForm.getContent();
						for (var i in content) {
							var control = content[i];
							if(control.getValue){
								if(control.getValue() === "" && control.getRequired() == true){
									control.setValueState(sap.ui.core.ValueState.Error);
									return;
								}
								if(control.getSelectedKey && control.getSelectedKey() === ""){
									control.setValueState(sap.ui.core.ValueState.Error);
									return;
								}
								else{
									 control.setValueState(sap.ui.core.ValueState.None);
								 }
							}
						}
						
						var valEcatt = CheckBoxEcatt.getSelected();
						
						if (valEcatt == true) {
							valEcatt = "Ecatt"
						} else {
							valEcatt = ""
						};
						
						var oEntry = {};
						
						oEntry.TuskNumber  = oDropDownBox.getSelectedKey();
						oEntry.Trfunction  = oDropDownBoxTypeRequest.getSelectedKey();
						oEntry.Description = content[7].getValue() + " " + valEcatt + " " + oDropDownBoxTypeRequest.getSelectedKey() + " " +  content[5].getValue();
						oEntry.ReqFunction = content[7].getValue();
						oEntry.Roles 	   = strRole;
						oEntry.Transact    = strTrans;
						oEntry.Ecatt       = CheckBoxEcatt.getSelected();
						
					
						var CreateBusyDialog = new sap.m.BusyDialog({
							text: "Создание транспортного запроса..."
						})

						sap.ui.getCore().getModel().create('/Query_registrySet',oEntry,{
								success :	function(oData, response){
									var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
								    	 useBatch: false,
								    	 defaultUpdateMethod: "Put"
								    	 });
									 oModel.setSizeLimit(500);
									 sap.ui.getCore().setModel(oModel);
									 oTable.setModel(oModel);
									 CreateBusyDialog.close();
								oCreateDialog.close();
								},
								error: function(){
										oCreateDialog.close();
										CreateBusyDialog.close();
										sap.m.MessageToast.show("Ошибка при создании запроса");
								}
								}
						);
						CreateBusyDialog.open();
					}
				})
			);
			oCreateDialog.addButton(
					new sap.m.Button({
						text: "Отмена",
						press: function(){
							oCreateDialog.close();
						}
					}))
			oCreateDialog.open();
		
		};
		
		
		/***** Update Role  *****/
		
		function openUpdateDialog(cellsItem){ 
			var oUpdateDialog = new sap.m.Dialog({
				
				title: "Редактирования запроса " + cellsItem[0].getText(),
				stretchOnPhone : true
			});
			
			 var oMultiComboBoxRole = new sap.m.MultiComboBox({
	                items : {
	                  path : "/RoleSet",
	                  template : new sap.ui.core.ListItem({
	                    key  : "{RoleId}",
	                    text : "{RoleId}",
	                    additionalText:"{RoleText}"
	                  })
	                }
	              });
			
			 var oMultiComboBoxTransaction = new sap.m.MultiComboBox({
	                items : {
	                  path : "/TRANSACTIONSet",
	                  template : new sap.ui.core.ListItem({
	                    text : "{Tcode}",
	                    additionalText:"{Ttext}"
	                  })
	                }
	              });
	
			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
			//	width: "400px",
				content:[
							new sap.m.Label({text:"Задача", }),
							new sap.m.Text({
								text: cellsItem[2].getText().split('-')[0],
							}),
																					
							new sap.m.Label({text:"Тип запроса", }),
							new sap.m.Text({
								text: cellsItem[3].getText(),
							}),
							
							new sap.m.Label({text:"Версия", }),
							new sap.m.Text({
								text: cellsItem[2].getText().split('-')[1].split(':')[0],
							}),
							
							new sap.m.Label({text:"Описание", }),		
						    new sap.m.TextArea({
						    	  value: cellsItem[2].getText().split(':')[1],
						    	  cols: 60,						    	
						      }),
							
							new sap.m.Label({text:"Роли", }),
							oMultiComboBoxRole,
							
							new sap.m.Label({text:"Транзакции", }),
							oMultiComboBoxTransaction,
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
							 if(control.getValue() === "" && oMultiComboBoxRole.getSelectedKeys === "")  {
								 control.setValueState(sap.ui.core.ValueState.Error);
								 return;
							 }
							 else{
								 control.setValueState(sap.ui.core.ValueState.None);
							 }
							}
						}
						var oEntry = {};
						oEntry.Trkorr = cellsItem[0].getText();
						oEntry.Description = content[7].getValue();
						
						sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry,{
							success: function(){
								var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
							    	 useBatch: false,
							    	 defaultUpdateMethod: "Put"
							    	 });
								 oModel.setSizeLimit(500);
								 sap.ui.getCore().setModel(oModel);
								 oTable.setModel(oModel);
							oUpdateDialog.close();
							sap.m.MessageToast.show("Запрос " + cellsItem[0].getText() + " отредактирован!");

							},
							error: function(oError){
								oUpdateDialog.close();
								var dialog = new sap.m.Dialog({
									title: "Ошибка",
									type: sap.m.DialogType.Message,
									state: sap.ui.core.ValueState.Error,
									content: new sap.m.Text({
										text: "Произошла ошибка при редактировании запроса " + cellsItem[0].getText()
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
					 
								dialog.open();
							}
						});
					}
				})
				);
			oUpdateDialog.addButton(
					new sap.m.Button({
						text: "Отмена",
						press: function(){
							oUpdateDialog.close();
						}
					}))
			oUpdateDialog.open();
		};
		

		function push(){
			var array = [];		
			for(var i = 0; i < oTable.getSelectedItems().length; i++){  
			array.push(oTable.getSelectedItems()[i].getCells()[0].getText()); 
							};
	
		    
		    var oEntry = {};
		    for (var index = 0; index < array.length; ++index) {
		
		    
		    oEntry.Trkorr = array[index];
		    oEntry.StatusCode = "02";
		    
		    sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, null, function(){

		    	var oModel = new sap.ui.model.odata.ODataModel(link,{
		    		 useBatch: false,
			    	 defaultUpdateMethod: "Put"
		    	});	
				sap.ui.getCore().setModel(oModel);
				oTable.setModel(oModel);
				
//				sap.ui.jsview("queryregistry.Registry.TestDe").createContent();

				},function(){
					alert("Ошибка");
				}
			);
		    
		    };
		    array = null;

			};
			
			
			function openDeleteDialog(ReleaseType){
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.confirm("Вы уверены что хотите удалить запрос " + ReleaseType[0].getText() + " ?", {
					title: "Удаление запроса",
					onClose: function(oAction){
						
						switch(oAction){
							case 'OK':
								sap.ui.getCore().getModel().remove("/Query_registrySet('" + ReleaseType[0].getText() + "')",{
									
									success: function() {
										
										var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
										    	 
											useBatch: false,
										    defaultUpdateMethod: "Put"
										    	 
										});
										oModel.setSizeLimit(500);
										sap.ui.getCore().setModel(oModel);
										oTable.setModel(oModel);
										sap.m.MessageToast.show("Запрос " + ReleaseType[0].getText() + " удален!");
										
									}, error: function(oError) {
									 
										var json =$.parseJSON(oError.responseText);
										var code = json.error.code;
																			
										switch(code) {
											
											case '01':
											  
												var dialogErr = new sap.m.Dialog({
													strethOnPhone: true,
													title : "Ошибка",
													type : sap.m.DialogType.Message,
													state: 'Error',
													content : new sap.m.Text({

														text: 'У Вас недостаточно прав для удаления!',
													
													}),
													beginButton: new sap.m.Button({
														
														text: 'OK',
														press: function () {
															
															dialogErr.close();
														
														}
													}),
													afterClose: function() {
														
														dialogErr.destroy();
													
													}
												}); dialogErr.open();
												dialogErr.addStyleClass("mydialogErr");

												break;

//										 	case 'value2':
//										    		...
//										    	break;

											default:
									 
												var dialog = new sap.m.Dialog({
													stretchOnPhone: true,
													title: "Ошибка",
													type: sap.m.DialogType.Message,
													state: sap.ui.core.ValueState.Error,
													content: new sap.m.Text({
													  
														text: "Произошла ошибка при удалении запроса " + ReleaseType[0].getText()
														
													}),
													beginButton: new sap.m.Button({
													  
														text: "Ок",
														press: function() {
														  
															dialog.close();
															
														}
													}),
													afterClose: function() {
													 
														dialog.destroy();
														
													}
												}); dialog.open();
												break;
										
										}
									}
								});
								
					
						
								break;
							case 'CANCEL':								
								break;
						}
					}
				 });
			}
			
			function openNumbersTrkorrDialog(array){
				var oNumbersTrkorrDialog = new sap.m.Dialog({
					stretchOnPhone : true
					
					
				});
				oNumbersTrkorrDialog.setTitle("Номера запросов");
					for (var i = 0; i < array.length; i++){
						

		
							
				var oSimpleForm = new sap.ui.layout.form.SimpleForm({
					//width: "150px",
					content:[ 
					         new sap.ui.commons.TextView({
								text: array[i],
								textAlign: sap.ui.core.TextAlign.Center,
								editable: false}),		          
					]
				});	
				
			

				oNumbersTrkorrDialog.addContent(oSimpleForm);				
				 }
					oNumbersTrkorrDialog.addButton(
							new sap.m.Button({
								text: "Закрыть",
								press: function(){
									oNumbersTrkorrDialog.close();
								}
							}))
					oNumbersTrkorrDialog.open();
			}	
		   function watch(Trkorr){
			   var oUpdateDialog = new sap.m.Dialog({
				   stretchOnPhone:true,
			  	   title: "Просмотр запроса " + Trkorr[0].getText(),
				   endButton: new sap.m.Button({
					   text: "Закрыть",
					   press: function(){
						   oUpdateDialog.close()
					   }
				   })
			   });
			   var oTableWatch = new sap.m.Table({
				   items: {
			        	path: "/Watch_requestSet",          
			        	template: new sap.m.ColumnListItem({	              
			        	  cells:[             
			        	        new sap.m.Text({
				        	        text: "{Parameter}"
				        	        }),
				        	        new sap.m.Text({
				        	        text: "{Value}"
				        	        })
			        	       	 ]
			        	  })        	
			        	},
				    columns: [
				    	new sap.m.Column({
						header: new sap.m.Label({text: "Параметр"}), 
							}),
							
						new sap.m.Column({
						header: new sap.m.Label({text: "Значение"}), 
							})
							
						    ],			
			        });		
//			   var oControl = new sap.m.Text({text:"{Parameter}"}); // short binding notation
//			   oTableWatch.addColumn(new sap.m.Column({
//				    width: "30%",
//					label: new sap.m.Label({text: "Параметр"}),
//					template: oControl }));
				
//				oControl = new sap.m.Text({text:"{Value}"}); // more verbose binding notationt
//				oTableWatch.addColumn(new sap.m.Column({
//					label: new sap.m.Label({text: "Значение"}),
//					template: oControl }));
//				

			     var oModelWatch = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
			    oModelWatch.setSizeLimit(500);			
				//sap.ui.getCore().setModel(oModelWatch);
				//oTableWatch.setModel(oModelWatch);
			
				var oFilterWatch = new sap.ui.model.Filter("Parameter", sap.ui.model.FilterOperator.EQ, Trkorr[0].getText());
				oTableWatch.bindItems("/Watch_requestSet",oTableWatch.getBindingInfo("items").template, undefined, oFilterWatch);
				
				/// Для кликабильности ссылки на вики
				//sap.ui.getCore().setModel(oModelWatch);
				oTableWatch.setModel(oModelWatch);
			oModelWatch.attachRequestCompleted(function(){	
				try{
				
						var Link10 = new sap.m.Link({
							text: "{Value}",//"{Value}",
							href: "{Value}",
							target: "_blank",
					    }); 
						var Link11 = new sap.m.Link({
							text: "{Value}",//"{Value}",
							href: "{Value}",
							target: "_blank",
					    }); 			   
					   oTableWatch.getItems()[10].getCells()[1].destroy();
					   oTableWatch.getItems()[11].getCells()[1].destroy();
					   oTableWatch.getItems()[11].addCell(Link11);
					   oTableWatch.getItems()[10].addCell(Link10);	
					}	
				catch (Exception)
				{
					
				}
			});
			/// Для кликабильности ссылки на вики
				
				
//			   var oSimpleForm = new sap.ui.layout.form.SimpleForm({
//					content:[
//								oTableWatch,
//					]
//				});		
				
			   oUpdateDialog.addContent(oTableWatch);						
			   oUpdateDialog.open();
						
		   }
		   function history(Trkorr){
			   var oUpdateDialog = new sap.m.Dialog({
				   stretchOnPhone: true,
			   	   title: "История запроса " + Trkorr[0].getText(),
				   endButton: new sap.m.Button({
					   text: "Назад",
					   press: function(){
						   oUpdateDialog.close(); 
					   }
				   })
			   });
		   			   
			   var oTableWatch = new sap.m.Table({
				   items: {
			        	path: "/HistorySet",          
			        	template: new sap.m.ColumnListItem({	              
			        	  cells:[             
			        	       new sap.m.Text({
			        	    	   text: {
			   						path: "TimeOfAction",
			   						type: new sap.ui.model.type.DateTime({
			   							pattern: "dd-MM-yyyy HH:mm:ss",
			   							UTC: true })
			   		
			   						}
			        	        }),
			        	        new sap.m.Text({
				        	        text: "{ActionTxt}",
				        	        }),
			        	        new sap.m.Text({
			        	        	text: "{ActionUser}"
			        	        }),			        	 
			        	     ]
			        	  })        	
			        	},
				    columns: [
								new sap.m.Column({
								demandPopin: true,
								header: new sap.m.Label({text: "Отметка времени"}), 
								}),
								
								new sap.m.Column({
									minScreenWidth: "500px",
									demandPopin: true,
									header: new sap.m.Label({text: "Действие"}), 
									}),
								
								new sap.m.Column({
								header: new sap.m.Label({text: "Пользователь"}), 
								}),
				              
				              ],			
			        });			 			
				var oModelHistory = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
				
			    oModelHistory.setSizeLimit(500);				
				sap.ui.getCore().setModel(oModelHistory);
				oTableWatch.setModel(oModelHistory);
				
				var oFilterWatch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, Trkorr[0].getText());
				oTableWatch.bindItems("/HistorySet", oTableWatch.getBindingInfo("items").template, undefined, oFilterWatch );
				   			   
			   oUpdateDialog.addContent(oTableWatch);						 
			   oUpdateDialog.open(); 
				   
			   }
		   
		   function Search(oEvent){
				
				var data = oEvent.getSource().getValue();
				var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, data);
				var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '01');

			     var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
				 oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilterAll);
				
				
			}
		   
		   function openForceDialog(Trkorr){ 
				var oForceDialog = new sap.m.Dialog({
					Title: "Принудительный перенос запроса " + Trkorr[0].getText(),
					stretchOnPhone :true
				});
				var TrkorrValue = "";

				TrkorrValue = Trkorr[0].getText();
				//oForceDialog.setTitle("Принудительный перенос запроса " + Trkorr[0].getText());

				
				var oComboBox = new sap.m.ComboBox();				
				oComboBox.setModel(oModel);

				var itemTemplate = new sap.ui.core.ListItem({
					key: "{Id}",
					text: "{Text}",
				});
				
				oComboBox.bindItems("/Status_codeSet", itemTemplate);
				
				var oSimpleForm = new sap.ui.layout.form.SimpleForm({
					width: "100%",
					content:[
								new sap.ui.commons.Label({text:"Запрос", }),
								new sap.ui.commons.TextView({
									text: TrkorrValue,
									editable: true,
								}),
								
								new sap.ui.commons.Label({text:"Статус запроса", }),
								oComboBox,
							      
						     ]
				});				
				oForceDialog.addContent(oSimpleForm);
				oForceDialog.addButton(
					new sap.m.Button({
						text: "Сохранить", 
						press: function() {
							var content = oSimpleForm.getContent();
							for (var i in content) {
								var control = content[i];
								if(control.getValue){ 
								 if(control.getValue() === "")  {
									 control.setValueState(sap.ui.core.ValueState.Error);
									 return;
								 }
								 else{
									 control.setValueState(sap.ui.core.ValueState.None);
								 }
								}
							}
							var oEntry = {};
							oEntry.Trkorr 	   = TrkorrValue;
							oEntry.StatusCode  = oComboBox.getSelectedKey();
							
							sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, null, function(){
								var oModel = new sap.ui.model.odata.ODataModel(link,{
							    	 useBatch: false,
							    	 defaultUpdateMethod: "Put"
							    	 });		
								sap.ui.getCore().setModel(oModel);
								oTable.setModel(oModel);
									oForceDialog.close();
								},function(){
									oForceDialog.close();
									alert("Update failed");
								}
							);
						}
					})
				);
				oForceDialog.addButton(
						new sap.m.Button({
							text: "Отмена",
							press: function(){
								oForceDialog.close();
							}
						}))
				
				
				oForceDialog.open();
			

			};
								
//		return scroll;
		return oTable;	
	},	
	
	
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf queryregistry.Mobile_version.DevelopDeMobile
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf queryregistry.Mobile_version.DevelopDeMobile
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf queryregistry.Mobile_version.DevelopDeMobile
*/
//	onExit: function() {
//
//	}

});