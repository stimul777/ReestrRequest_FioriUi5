 var newColumnListItem = {};
sap.ui.controller("queryregistry.Mobile_version.BeforeMobile", {  //ProdDe Пришлось поменять имя из -за того, что
																	//в сапе ограничение имени файла
 

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf queryregistry.Registry.BeforeProdSl
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
	
	createTestTable: function(tableId, oController, view, typeTable){
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		var check = this.oStorage.get("IDCheck");
		var link = this.oStorage.get("IDSystemLink");
			
		busyDialog = new sap.m.BusyDialog({
			text: "Загрузка данных...",
            showCancelButton : false
            });
		
			var refreshButton = new sap.m.Button({
			icon : "sap-icon://refresh",
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
			    			    
			var numbersButton = new sap.m.Button({
					icon : "sap-icon://approvals",
					enabled: false,
					press: function() {
						
						var array = [];
						
							for ( i = 0; i< oTable.getSelectedItems().length; i++)
							{
						
								var NumbersTrkorr = oTable.getSelectedItems()[i].getCells(); 
										if (oTable.getSelectedItems()[i].getCells().length<6)
										{
											array.push(NumbersTrkorr[0].getText());
										}			
						}
						
						
							for ( i = 0; i< oTable.getSelectedItems().length; i++)
							{
								var NumbersTrkorr = oTable.getSelectedItems()[i].getCells();
								if (oTable.getSelectedItems()[i].getCells().length>7)
								{
									array.push(NumbersTrkorr[1].getText());
								}	
						}
						openNumbersTrkorrDialog(array);						   
					},
			});
			    
				var watchButton = new sap.m.Button({
					icon : "sap-icon://display",
					enabled: false,
					press : function(){
						var item = oTable.getSelectedItem();
						var rows = item.getCells();
						var Trkorr = rows;
						watch(Trkorr);},
				});
			    
			    var historyButton = new sap.m.Button({
			    	icon : "sap-icon://work-history",
					enabled: false,
					press: 
						function (){
						var item = oTable.getSelectedItem();
						var rows = item.getCells();
						var Trkorr = rows;
						history(Trkorr);							
					},	
			    });
			    
			    var buttons = [];
			    
			    if(typeTable == 'for'){

			    	var doneButton = new sap.m.Button({
				    	icon: "sap-icon://sys-enter-2",
						tooltip: "Одобрен к переносу в предпрод",
						enabled: false,
						visible: false,
						press: function(){
							pushApprove();
						},
				    });
			    	doneButton.addStyleClass("myDoneButton");
			    	if (check == "true"){
			    		doneButton.setVisible(true);
			    	}
			    	buttons.push(doneButton);
			    	
			    }
			    if(typeTable == 'approve'){
			    	
			    	
			    	var errorButtonUnlock = new sap.m.Button({
				    	icon: "sap-icon://sys-cancel-2",
						tooltip: "Ошибка при деблокировании",
						enabled: false,
						press : function(){
							var item = oTable.getSelectedItem();
							var rows = item.getCells();
							var Trkorr = rows;
							errorUnlocking(Trkorr);},	
							
				    });
			    	errorButtonUnlock.addStyleClass("myErrorButton");
			    }
			    if(typeTable == 'into')
			    {
			    	
			    
			    	var errorButton = new sap.m.Button({
				    	icon: "sap-icon://sys-cancel-2",
				    	enabled: false,
						tooltip: "Предпрод не пройден",
						press : function(){
							var item = oTable.getSelectedItem();
							var rows = item.getCells();
							var Trkorr = rows;
							oTestFail(Trkorr);},
				    });
			    	errorButton.addStyleClass("myErrorButton");
			    	buttons.push(errorButton);	
			    	
			    	var notMigrationButton = new sap.m.Button({
				    	icon: "sap-icon://locked",
				    	enabled: false,
						tooltip: "Не переносить в прод",
						press : function(){
							var item = oTable.getSelectedItem();
							var rows = item.getCells();
							var Trkorr = rows;
							oDontPush(Trkorr);},					
				    });
			    	notMigrationButton.addStyleClass("myErrorButton");
			    	buttons.push(notMigrationButton);
			    			    	
			    	var passTest = new sap.m.Button({
				    	icon: "sap-icon://sys-enter-2",
				    	tooltip: "Прошел предпрод",
				    	text: "Прошел предпрод",
				    	enabled: false,
				    	press: function() {
				    		var item = oTable.getSelectedItem();
							var rows = item.getCells();
							var Trkorr = rows;
							openPushDialog(Trkorr);},
				    });
			    	
			    	passTest.addStyleClass("myDoneButton");
			    	buttons.push(passTest);
			    	
			    }
			    ////////////////
			    
			    var forceButton = new sap.m.Button({
			    	tooltip: "Принудительный перенос запроса",
			    	text:  "Принудительный перенос запроса",
			    	icon: "sap-icon://alert",
			    	visible: false,
			    	enabled: false,
					press: function() {
						var item = oTable.getSelectedItem();
						var rows = item.getCells();
						var Trkorr = rows;
						openForceDialog(Trkorr);},
			    }).addStyleClass("myAlertButton");
			    
		    	//forceButton.addStyleClass("myAlertButton");
			    
		    	if (check == "true"){
		    		forceButton.setVisible(true);
		    		
		    	}
		    	buttons.push(forceButton);
			    	 		    
				var searchBox = new sap.m.SearchField({								
					placeholder : "Поиск...", 		
					search: function(oEvent){
						Search(oEvent);
					},

				});
				
				var TestToolBar = new sap.m.OverflowToolbar({					
					design : sap.m.ToolbarDesign.Transparent,  // sap.m.ToolbarDesign, since 1.16.8			
					content : [
					           refreshButton,	
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
					TestToolBar.addContent(item);
				}
				
				TestToolBar.addContent(new sap.m.ToolbarSpacer());
				TestToolBar.addContent(searchBox);				
								           				
				var infoToolbar = new sap.m.Toolbar({
		    	   	width: "100%",
					design : sap.m.ToolbarDesign.Transparent, 
					content : [ 			                    
					            searchBox,			        			
							  ], 		
				}).addStyleClass("searchBox");
				//OTABLE///
				var oTable =new sap.m.Table(tableId,{
					mode: sap.m.ListMode.MultiSelect,
					includeItemInSelection: true,
					headerToolbar: [
									TestToolBar ,          
								   ],
			        infoToolbar: infoToolbar,
			        items: {
			        	path: "/Query_registrySet",          
			        	template: newColumnListItem=new sap.m.ColumnListItem({
				        	type: "Active",
				        	cells:[]
				        	  }),
			        		},
			        	columns:[],              
			        });
  
//				var check = this.oStorage.get("IDCheck");
							
				oTable.attachSelectionChange(function(oEvent){
					
					var quantitySelectedRows =  oTable.getSelectedItems().length; //получаем длину массива
					(quantitySelectedRows >= 1)? numbersButton.setEnabled(true): numbersButton.setEnabled(false);
					switch(typeTable){
					case 'for':
						
						if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){	  
							 watchButton.setEnabled(false);
							 historyButton.setEnabled(false);
							 if (quantitySelectedRows == 0 ) {
								doneButton.setEnabled(false); }
						     else{
							    doneButton.setEnabled(true);	
								 }
							 forceButton.setEnabled(false);

						 }
						 else {
							 watchButton.setEnabled(true);
							 historyButton.setEnabled(true);
							 doneButton.setEnabled(true);
							 forceButton.setEnabled(true);
							 					 							 
						     }	 				
						break;
					case 'approve':
						
						if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){  
							 watchButton.setEnabled(false);
							 historyButton.setEnabled(false);
							 errorButtonUnlock.setEnabled(false);
							 forceButton.setEnabled(false);

						 }
						 else {
							 watchButton.setEnabled(true);
							 historyButton.setEnabled(true);
							 errorButtonUnlock.setEnabled(true);
							 forceButton.setEnabled(true);
						 							 
						     }
						break;
						
					case 'into':
						
						if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){  
							 watchButton.setEnabled(false);
							 historyButton.setEnabled(false);
							 passTest.setEnabled(false);
							 errorButton.setEnabled(false);
							 notMigrationButton.setEnabled(false);
							 forceButton.setEnabled(false);
						 }
						 else {
							 watchButton.setEnabled(true);
							 historyButton.setEnabled(true);
							 passTest.setEnabled(true);
							 errorButton.setEnabled(true);
							 notMigrationButton.setEnabled(true);
							 forceButton.setEnabled(true);
							 
						     }
						break;
										
					}
					
				});
				    
				
				if(typeTable == 'into'){
//					new sap.ui.commons.Image  ---- ��� ���������������� �����������
			    var oCell = new sap.ui.core.Icon({
					src : "{Icon}",
			        color: "#cc0303!important;",
			    });
				newColumnListItem.addCell(oCell);
				oTable.addColumn(new sap.m.Column({
					demandPopin: false,
					width: "5px",
					//demandPopin: true,
					//minScreenWidth: "500px",
					//width: "50px"
						//template: oControl 
					}));					
				}
								
				var oCell = new sap.m.Text({text:"{Trkorr}"}); 
				newColumnListItem.addCell(oCell);
				oTable.addColumn(new sap.m.Column({
					demandPopin: true,
				    header: new sap.m.Label({text: "Номер"}), 
					//template: oControl 
					}));
				
				//jQuery.sap.require("sap.ui.core.format.DateFormat");				
				oCell = new sap.m.Text({
    	        	text: {
    	    			path: "CreateDate",
    	    			//template: oControl ,
    	    			type: new sap.ui.model.type.DateTime({
    	    			pattern: "dd-MM-yyyy HH:mm:ss",
    	    			UTC: true })
    	    			}
    	        });
				newColumnListItem.addCell(oCell);
				oTable.addColumn(new sap.m.Column({
					minScreenWidth: "500px",
					demandPopin: true,
					header: new sap.m.Label({text: "Добавлен"})
					}));
				
				var oGroupField = new sap.m.Text({
        	        text: "{TuskNumber}"+"-"+"{Version}"+":"+"{Description}",
    	        });
				newColumnListItem.addCell(oGroupField);
				oTable.addColumn(new sap.m.Column({
					header: new sap.m.Label({text: "Описание"}), 
				}));		

				oCell =  new sap.m.Text({
        	        text:"{Trfunction}"
    	        });
				newColumnListItem.addCell(oCell);
				oTable.addColumn(new  sap.m.Column({
					minScreenWidth: "500px",
					demandPopin: true,
					header: new sap.m.Label({text: "Тип"}), 
					}));
				
				oCell = new sap.m.Text({
        	        text:"{CreatorLogin}"
    	        });
				newColumnListItem.addCell(oCell);
				oTable.addColumn(new  sap.m.Column({
					minScreenWidth: "500px",
					demandPopin: true,
					header: new sap.m.Label({text: "Добавил"}),
					}));
				
				 if(typeTable == 'into')
				 {
				    	
				    	oCell = new sap.m.Text({
				    		text:"{TestComment}"
					    	});
				    	newColumnListItem.addCell(oCell);
						oTable.addColumn(new sap.m.Column({
							header: new sap.m.Label({text: "Ком. к тестированию"}),
							demandPopin: true,
							visible: false,
							minScreenWidth: "500px",
							}));
						
						oCell = new sap.m.Text({
							text:"{WikiLink}"
							});
						newColumnListItem.addCell(oCell);
						oTable.addColumn(new sap.m.Column({
							header: new sap.m.Label({text: "Ссылка на WIKI"}),
							minScreenWidth: "500px",
							visible: false,
							demandPopin: true,
							}));			
						
						oCell = new sap.m.Text({
							text:"{SpecLink}"
							});
						newColumnListItem.addCell(oCell);
						oTable.addColumn(new sap.m.Column({
						minScreenWidth: "500px",
						demandPopin: true,
						visible: false,
						}));

					}


			    var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
				 oModel.setSizeLimit(500);
				 sap.ui.getCore().setModel(oModel);
				 oTable.setModel(oModel);
		
		var oFilterInTest = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '05');
		var oFilterTestApprove = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '06');
		var oFilterTest = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '07');
		
		switch(typeTable){
		case 'for':
			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilterInTest);
			break;
		case 'approve':
			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilterTestApprove);
			break;
		case 'into':
			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilterTest);
			break;
							
		}
					
//					oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilter]);
					
//					oTable.bindRows("/Query_registrySet");
//					oTable.placeAt("content");

					
					
					
		function pushApprove(){
			
//			var BusyDialog = new sap.m.BusyDialog({
//				//stretchOnPhone:true,
//				text: "Деблокирование запроса..."				
//			});
//
//			var array = [];		
//			if (oTable.getSelectedItems()[0].getCells().length <6)
//			{
//				for(var i = 0; i < oTable.getSelectedItems().length; i++){  
//					array.push(oTable.getSelectedItems()[i].getCells()[0].getText()); 
//									};
//			}
//			else
//			{
//				for(var i = 0; i < oTable.getSelectedItems().length; i++){  
//					array.push(oTable.getSelectedItems()[i].getCells()[1].getText()); 
//									};
//			}				
//		    var oEntry = {};
//		    for (var index = 0; index < array.length; ++index) {
//		    
//		    oEntry.Trkorr = array[index];
//		    oEntry.Trstatus = 'D';
//		    oEntry.StatusCode = "03";
//		    
//		    
//		    sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, null, function(){
//
//		    	var oModel = new sap.ui.model.odata.ODataModel(link,{
//		    		 useBatch: false,
//			    	 defaultUpdateMethod: "Put"
//		    	});	
//				sap.ui.getCore().setModel(oModel);
//				oTable.setModel(oModel);
//				
////				sap.ui.jsview("queryregistry.Registry.TestDe").createContent();
//
//		    },function(){
//				alert("Ошибка");
//			}
//		    );	    		   		    
//		    };
//		    array = null;
		    
		    var array = [];		
			
			for(var i = 0; i < oTable.getSelectedItems().length; i++) {  
				array.push(oTable.getSelectedItems()[i].getCells()[0].getText()); 				
			};
								
			var oModelApproveBeforeProd = new sap.ui.model.odata.v2.ODataModel(link, {
				
				defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.Put
			
			});					
		    
		    var oEntry = {};
		    for (var index = 0; index < array.length; ++index) {
		    
		    	oEntry.Trkorr = array[index];
		    	oEntry.StatusCode = "06";
		    
		    	oModelApproveBeforeProd.update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry );
		    
		    };
		    
		    oModelApproveBeforeProd.submitChanges({
		    	
		    	error: function() {
					
		    		jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.error("Произошла ошибка при смене статуса запроса!", {
						strethOnPhone: true,
						title: "Ошибка"});
		    	
		    	}
		    });
		    
		    oModelApproveBeforeProd.attachRequestCompleted(function() {
		    	
		    	var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
			    	
		    		useBatch: false,
			    	defaultUpdateMethod: "Put"
			    	 
		    	});
				oModel.setSizeLimit(500);
				sap.ui.getCore().setModel(oModel);
				oTable.setModel(oModel);
		    
		    });
		       
		    array = null;

			};
						
			function openDeleteDialog(Trkorr){
				if (oTable.getSelectedItems()[0].getCells().length <6)
				{
					var title1 = Trkorr[0].getText();
				}
				else
				{
					var title1 = Trkorr[1].getText();
				}
				var oDeleteDialog = new sap.ui.commons.Dialog();
				oDeleteDialog.setTitle("Удаление запроса");
				var oText = new sap.ui.commons.TextView({text: "Вы уверены что хотите удалить запрос?"});
				oDeleteDialog.addContent(oText);
				oDeleteDialog.addButton(
					new sap.ui.commons.Button({
						text: "Да", 
						press:function(){ 
							sap.ui.getCore().getModel().remove("/Query_registrySet('" + title1 + "')", null, function(){
								var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
							    	 useBatch: false,
							    	 defaultUpdateMethod: "Put"
							    	 });
								 oModel.setSizeLimit(500);
								 sap.ui.getCore().setModel(oModel);
								 oTable.setModel(oModel);
								oDeleteDialog.close();
							},function(){
								oDeleteDialog.close();
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.error("Произошла ошибка при удалении запроса!", {
										title: "Ошибка"});
							});
						}
					})
				);
				oDeleteDialog.open();
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
						}));
				oNumbersTrkorrDialog.open();
			}	
						
		function watch(Trkorr){
			if (oTable.getSelectedItems()[0].getCells().length <6)
			{
				var title1 = Trkorr[0].getText();
			}
			else
			{
				var title1 = Trkorr[1].getText();
			}
			var oUpdateDialog = new sap.m.Dialog({
					stretchOnPhone:true,
				   title: "Просмотр запроса " + title1,
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

			    var oModelWatch = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
			    oModelWatch.setSizeLimit(500);			
				var oFilterWatch = new sap.ui.model.Filter("Parameter", sap.ui.model.FilterOperator.EQ, title1);
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
//				var oSimpleForm = new sap.ui.layout.form.SimpleForm({
//					content:[
//								oTableWatch,
//					]
//				});		
			   oUpdateDialog.addContent(oTableWatch);	
			   oUpdateDialog.open();
			   }		
		
		function openPushDialog(Trkorr){ 
			if (oTable.getSelectedItems()[0].getCells().length <6)
			{
				var title1 = Trkorr[0].getText();
			}
			else
			{
				var title1 = Trkorr[1].getText();
			}
			var oPushDialog = new sap.m.Dialog({
				title: "Аудит запроса " + title1,
				stretchOnPhone:true,
			});
			//from desktop version
			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				content:[
							new sap.m.Label({text:"Комментарий к тестировнию", }),
							new sap.m.TextArea({
								  required: true,
						    	  cols: 60,			
						      }),
							
								new sap.m.Label({text:"Ссылка WIKI", }),
								new sap.m.TextArea({
									  required: true,
							    	  cols: 60,							    	  
							      }),
							      
								
								new sap.m.Label({text:"Ссылка Спецификации", }),
								new sap.m.TextArea({
									  required: true,
							    	  cols: 60,							    	  
							      }),
						     ]
				});				
				oPushDialog.addContent(oSimpleForm);
				oPushDialog.addButton(
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
							if (oTable.getSelectedItems()[0].getCells().length <6)
							{
								oEntry.Trkorr 	   = Trkorr[0].getText(); // Trkorr
								oEntry.StatusCode  = "08";
								oEntry.TestComment = content[1].getValue();
								oEntry.WikiLink    = content[3].getValue();
								oEntry.SpecLink    = content[5].getValue();	
							}
							else
							{
								oEntry.Trkorr 	   = Trkorr[1].getText(); // Trkorr
								oEntry.StatusCode  = "08";
								oEntry.TestComment = content[1].getValue();
								oEntry.WikiLink    = content[3].getValue();
								oEntry.SpecLink    = content[5].getValue();	
							}
							
							sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, {
								success: function(){
								var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
							    	 useBatch: false,
							    	 defaultUpdateMethod: "Put"
							    	 });
								 oModel.setSizeLimit(500);
								 sap.ui.getCore().setModel(oModel);
								 oTable.setModel(oModel);
								 
//								 passTest.setEnabled(false);
//									errorButton.setEnabled(false);
//									notMigrationButton.setEnabled(false);
//									forceButton.setEnabled(false);
//									removeButton.setEnabled(false);	  
//									watchButton.setEnabled(false);
//									historyButton.setEnabled(false);
//									numbersButton.setEnabled(false) ;
								 
								 oPushDialog.close();
								},
								error: function(){
									oPushDialog.close();
									jQuery.sap.require("sap.m.MessageBox");
									sap.m.MessageBox.error("Ошибка при изменении статуса запроса!", {
											title: "Ошибка"});
								}
							});
							
//							var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//						    	 useBatch: false,
//						    	 defaultUpdateMethod: "Put"
//						    	 });
//							 oModel.setSizeLimit(500);
//							 sap.ui.getCore().setModel(oModel);
//							 oTable.setModel(oModel);
						}
					})
				);
				oPushDialog.addButton(new sap.m.Button({
						text: "Закрыть",
						press: function(){
							oPushDialog.close();
						}
					}));
				oPushDialog.open();
			

			};
			
			function openForceDialog(Trkorr){ 
				if (oTable.getSelectedItems()[0].getCells().length <6)
				{
					var title1 = Trkorr[0].getText();
				}
				else
				{
					var title1 = Trkorr[1].getText();
				}

				var oForceDialog = new sap.m.Dialog({
					Title: "Принудительный перенос запроса " + title1,
					stretchOnPhone :true
				});
				var TrkorrValue = "";

				TrkorrValue = title1;
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
							sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, null, function()
									{
							var oModel = new sap.ui.model.odata.ODataModel(link,{
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });		
							sap.ui.getCore().setModel(oModel);
							oTable.setModel(oModel);
							oForceDialog.close();
							},
								function(){
								alert("Update failed");
									oForceDialog.close();
									
								}
							);
							oForceDialog.close(); // вставлено для закрытия диалогового окна 12.09.17
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
			
			function history(Trkorr){
				if (oTable.getSelectedItems()[0].getCells().length <6)
				{
					var title1 = Trkorr[0].getText();
				}
				else
				{
					var title1 = Trkorr[1].getText();
				}
				var oUpdateDialog = new sap.m.Dialog({
					   stretchOnPhone: true,
				   	   title: "История запроса " + title1,
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
					
					var oFilterWatch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, title1);
					oTableWatch.bindItems("/HistorySet", oTableWatch.getBindingInfo("items").template, undefined, oFilterWatch );
					   			   
				   oUpdateDialog.addContent(oTableWatch);						 
				   oUpdateDialog.open(); 
					   
				   }
			
			function errorUnlocking(Trkorr){
				if (oTable.getSelectedItems()[0].getCells().length <6)
				{
					var title1 = Trkorr[0].getText();
				}
				else
				{
					var title1 = Trkorr[1].getText();
				}
			var oEntry = {};
				oEntry.Trkorr = title1;
				oEntry.StatusCode = "errorUnlocking";
				
				sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, null, function(){
					var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
					 oModel.setSizeLimit(500);
					 sap.ui.getCore().setModel(oModel);
					 oTable.setModel(oModel);
					},function(){
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.error("Произошла ошибка при смене статуса запроса!", {
								title: "Ошибка"});
					}
				);
			}	
						
				function oTestFail(Trkorr){
					if (oTable.getSelectedItems()[0].getCells().length <6)
					{
						var title1 = Trkorr[0].getText();
					}
					else
					{
						var title1 = Trkorr[1].getText();
					}
				var oEntry = {};
					oEntry.Trkorr = title1;
					oEntry.Icon   = "sap-icon://sys-cancel-2";
					sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, null, function(){
						var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
					    	 useBatch: false,
					    	 defaultUpdateMethod: "Put"
					    	 });
						 oModel.setSizeLimit(500);
						 sap.ui.getCore().setModel(oModel);
						 oTable.setModel(oModel);
						},function(){
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.error("Произошла ошибка при смене статуса запроса!", {
									title: "Ошибка"});
						}
					);
				}
				
				function oDontPush(Trkorr){
					if (oTable.getSelectedItems()[0].getCells().length <6)
					{
						var title1 = Trkorr[0].getText();
					}
					else
					{
						var title1 = Trkorr[1].getText();
					}
					var oEntry = {};
						oEntry.Trkorr = title1;
						oEntry.Icon   = "sap-icon://locked";
						sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, null, function(){
							var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
						    	 useBatch: false,
						    	 defaultUpdateMethod: "Put"
						    	 });
							 oModel.setSizeLimit(500);
							 sap.ui.getCore().setModel(oModel);
							 oTable.setModel(oModel);
							},function(){
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.error("Произошла ошибка при смене статуса запроса!", {
										title: "Ошибка"});
							}
						);
					}
				function Search(oEvent){
					
					var data = oEvent.getSource().getValue();
					var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, data);
					
					switch(typeTable){
					case 'for':
						var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '05');
						break;
					case 'approve':
						var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '06');
						break;
					case 'into':
						var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '07');
						break;
										
					}
					
				     var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
				     oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilterAll);
					
					
				}
		
										
				    return oTable;					
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf queryregistry.Registry.BeforeProdSl
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf queryregistry.Registry.BeforeProdSl
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf queryregistry.Registry.BeforeProdSl
 */
// onExit: function() {
//
// }
});