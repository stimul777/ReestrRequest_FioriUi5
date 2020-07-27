  sap.ui.controller("queryregistry.Mobile_version.JournalDeMobile", {

	 
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
		var check = this.oStorage.get("IDCheck");
		var link = this.oStorage.get("IDSystemLink");
		
		busyDialog = new sap.m.BusyDialog({
			text: "Загрузка данных...",
            showCancelButton : false
            });

		var refreshButton = new sap.m.Button({
			icon : "sap-icon://refresh",
			tooltip : "Обновить",
			press: function(){
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

		var numbersButton = new sap.m.Button({
			tooltip: "Номера запросов",
			icon : "sap-icon://approvals",
			enabled: false,
			press: function() {
				var array = [];
				for ( i = 0; i< oTable.getSelectedItems().length; i++){
				var NumbersTrkorr = oTable.getSelectedItems()[i].getCells(); 
				
				array.push(NumbersTrkorr[1].getText());
				}			
				openNumbersTrkorrDialog(array);							   
			},
		});

		var watchButton = new sap.m.Button({
			icon : "sap-icon://display",
			tooltip : "Просмотр",
			enabled: false,
			press : function(){
				var item = oTable.getSelectedItem();//				var idx = oTable.getSelectedIndex();
				var rows = item.getCells();			//				if (idx == -1) return;
				var Trkorr = rows;					//				var Trkorr = oTable.getContextByIndex(idx).getObject().Trkorr;		
				watch(Trkorr);},
		});

		var historyButton = new sap.m.Button({
			tooltip: "История запроса",
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
		
		var ErrorCorrection = new sap.m.Button({   //////////// ?????
	    	icon:    "sap-icon://activate",
	    	//tooltip: "Ошибка исправлена",
	    	enabled: false,
	    	visible: false,
			tooltip: "Принудительный перенос",
			press: function() {
//					var idx = oTable.getSelectedIndex();
//					if (idx == -1) return;
//					var Trkorr = oTable.getContextByIndex(idx).getObject().Trkorr;
					var item = oTable.getSelectedItem();
					//	if (idx == -1) return;
					var rows = item.getCells();
					var Trkorr = rows;
					openErrorCorrectionDialog(Trkorr)
					;},
	    });
		
		ErrorCorrection.addStyleClass("myDoneButton");
		
		if (check == "true"){
			ErrorCorrection.setVisible(true);			    	
	    }


		var searchBox = new sap.m.SearchField({								
			//enabled : true, 
			//visible : true, 
			//maxLength : 0,
			placeholder : "Текст для поиска...",
			//showMagnifier : true, 
			//showRefreshButton : false, 		
			//width: "15rem",
			search: function(oEvent){
				Search(oEvent);
			},

		});
		
		var LockButton = new sap.m.Button({
			tooltip: "Заблокировать",
	    	icon: "sap-icon://locked",
	    	enabled: false,
			tooltip: "Заблокировано",
			press : function(){
				var item = oTable.getSelectedItem();
				//	if (idx == -1) return;
					var rows = item.getCells();
					var Trkorr = rows;
				oLockTrkorr(Trkorr);
				},					
	    }).addStyleClass("myErrorButton");
		
		

		var devToolBar = new sap.m.Toolbar({    //sap.m.Toolbar
			//busy : false, // boolean
			//busyIndicatorDelay : 1000, // int
			//visible : true, // boolean
			//active : false, // boolean
			//enabled : true, // boolean
			design : sap.m.ToolbarDesign.Solid, // sap.m.ToolbarDesign, since   //sap.Toolbar.Auto
												// 1.16.8
			content : [ refreshButton, 
			            new sap.m.ToolbarSeparator(),
						numbersButton, 
						new sap.m.ToolbarSeparator(), 
						watchButton,
						historyButton, 
						ErrorCorrection,
						LockButton,
						//new sap.m.ToolbarSpacer(),
						//searchBox 
						], // sap.ui.core.Control
						
		});
		
		devToolBar.addContent(new sap.m.ToolbarSpacer());
		devToolBar.addContent(searchBox);	
		
		 var infoToolbar = new sap.m.Toolbar({
	    	   	width: "100%",
				design : sap.m.ToolbarDesign.Solid, 
				content : [ 			                    
				            searchBox,			        			
						  ], 		
			}).addStyleClass("searchBox");

		
		 var oTable = new sap.m.Table(tableId,{   //var oTable = new sap.ui.table.Table(tableId,{
			 mode: sap.m.ListMode.MultiSelect,
			 includeItemInSelection: true,
			 
			 //height: "100%",
			//rowHeight: 35,
			//visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
			//enableCellFilter: true,
			//enableCustomFilter: true,
			//selectionBehavior: sap.ui.table.SelectionBehavior.Row,
			 //selectionMode: sap.ui.table.SelectionMode.MultiToggle,
			//enableCellFilter : true,
	       // enableColumnReordering:true,
	       // enableSelectAll: true,
			 
			headerToolbar:  [
	        				devToolBar           
	        				],
	        infoToolbar: infoToolbar,
	        items: {
	        	path: "/Query_registrySet",          
	        	template: new sap.m.ColumnListItem({
	        	type: "Active",
	        	cells:[
//	        		var oControl = new sap.ui.core.Icon({
//	    				src : "{Icon}",
//	    		        color: "#cc0303!important;",
//	    		    });
//	    			oTable.addColumn(new sap.ui.table.Column({
//	    					width: "35px",
//	    					template: oControl }));					
	    			
	        		   new sap.ui.core.Icon({ //Trstatus
			           src:"{Icon}",
			           color: "#cc0303!important;",
			           }),
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
	        	        }),
	        	        ///Столбец - ошибка
	        	        new sap.m.Text({
		        	    text:"{ErrorText}"
		        	    })
	        	       //////
	        	     ]
	        	  })        	
	        	},
	        	
	        	columns: [
	        			new sap.m.Column({
						demandPopin: false,
						width: "5px",
						//minScreenWidth: "500px",
						//header: new sap.m.Label({text: ""}), 
						}),//Столбец для статуса
						
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
						////////Столбец - ошибка
						new  sap.m.Column({
						minScreenWidth: "500px",
						demandPopin: true,
						header: new sap.m.Label({text: "Ошибка"}),
						}),
						///////
		              ],              
		              
	        });
		
		
		oTable.attachSelectionChange(function(oEvent){ //oTable.attachRowSelectionChange(function(oEvent){
			
			var quantitySelectedRows =  oTable.getSelectedItems().length; //получаем длину массива //было - getSelectedIndices()
			 if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
				    watchButton.setEnabled(false);
				    historyButton.setEnabled(false);
				    ErrorCorrection.setEnabled(false);
			 }
			 else {
				 	ErrorCorrection.setEnabled(true);
				    watchButton.setEnabled(true);
				    historyButton.setEnabled(true);

			 	 }	 	
			(quantitySelectedRows >= 1)? numbersButton.setEnabled(true): numbersButton.setEnabled(false);
			(quantitySelectedRows >= 1)? LockButton.setEnabled(true): LockButton.setEnabled(false);
			
		});
		
//		 var oControl = new sap.ui.core.Icon({
//				src : "{Icon}",
//		        color: "#cc0303!important;",
//		    });
//			oTable.addColumn(new sap.ui.table.Column({
//					width: "35px",
//					template: oControl }));					
//			
//		
//		var oControl = new sap.ui.commons.TextField().bindProperty("value", "Trkorr").setEditable(false); // short binding notation
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Номер"}), 
//			width: "100px",
//			template: oControl,
//				}));
//		
//		oControl = new sap.ui.commons.TextView({
//			text: {
//				path: "CreateDate",
//				type: 'sap.ui.model.type.Date',
//				formatOptions: {
//					source: {
//						  pattern: 'yyyy-MM-ddTHH:mm:ss'
//					},
//				pattern: 'dd-MM-yyyy HH:mm:ss'
//				}
//				}
//		
//		});
		
//		jQuery.sap.require("sap.ui.core.format.DateFormat");
//		oControl = new sap.ui.commons.TextView({
//			text: {
//			path: "CreateDate",
//			type: new sap.ui.model.type.DateTime({
//				pattern: "dd-MM-yyyy HH:mm:ss",
//				UTC: true })
//
//			}
//		});
		
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Добавлен"}),
//			width: "150px",
//			template: oControl }));
//		
//						
		var oGroupField = new sap.ui.commons.TextView().bindProperty("text", {
            parts: [
                    {path: "TuskNumber" },
                    {path: "Version" },
                    {path: "Description" }
                ],
     
     
                formatter: function(TuskNumber, Version, Description){   
                             
                 
                  return TuskNumber + "-" + Version + ": " + Description;
                }
               
            });
//		oTable.addColumn(new sap.ui.table.Column({
//			label: "Описание",
//			template: oGroupField }));
//		
//		oControl = new sap.ui.commons.TextView({text:"{Trfunction}"});
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Тип"}),
//			width: "160px",
//			template: oControl }));
//
//		
//		oControl = new sap.ui.commons.TextView({text:"{CreatorLogin}"});
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Добавил"}),
//			width: "120px",
//			template: oControl }));
//		
//		oControl = new sap.ui.commons.TextView({text:"{ErrorText}"});
//		oTable.addColumn(new sap.ui.table.Column({
//			label: new sap.ui.commons.Label({text: "Ошибка"}),
//			width: "30%",
//			template: oControl }));
//		

		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);
		
		var oFilter = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '11');
       
		oTable.bindItems("/Query_registrySet", oTable.getBindingInfo("items").template, undefined, oFilter);
		//oTable.bindRows("/Query_registrySet",undefined,undefined, [oFilter]);
//		oTable.bindRows("/Query_registrySet");
		//oTable.placeAt("content");

									
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
				   title: "Просмотр запроса " + Trkorr[1].getText(),
				   endButton: new sap.m.Button({
					   text: "Закрыть",
					   press: function(){
						   oUpdateDialog.close()
					   }
				   })
			   });
	
			   var oTableWatch = new sap.m.Table({//var oTableWatch = new sap.ui.table.Table({
													//visibleRowCount: 7,
													//enableCellFilter: true,
													//enableCustomFilter: true,
													//selectionMode: sap.ui.table.SelectionMode.None,
			        								//enableColumnReordering:true,
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
//			   oTableWatch.addColumn(new sap.ui.table.Column({
//				    width: "30%",
//					label: new sap.m.Label({text: "Параметр"}),
//					template: oControl }));
//				
//				oControl = new sap.m.Text({text:"{Value}"}); // more verbose binding notationt
//				oTableWatch.addColumn(new sap.ui.table.Column({
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
			
				var oFilterWatch = new sap.ui.model.Filter("Parameter", sap.ui.model.FilterOperator.EQ, Trkorr[1].getText());
				oTableWatch.bindItems("/Watch_requestSet", oTableWatch.getBindingInfo("items").template, undefined, oFilterWatch);
				
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
			   	   title: "История запроса " + Trkorr[1].getText(),
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
// from desktop version
//			   var oControl = new sap.m.Text({
//				   text: {
//						path: "TimeOfAction",
//						type: new sap.ui.model.type.DateTime({
//							pattern: "dd-MM-yyyy HH:mm:ss",
//							UTC: true })
//		
//						}
//			   });
//			   oTableWatch.addColumn(new sap.ui.table.Column({
//				    width: "30%",
//					label: new sap.m.Label({text: "Отметка времени"}),
//					template: oControl }));
//				
//				oControl = new sap.m.Text({text:"{ActionUser}"});
//				oTableWatch.addColumn(new sap.ui.table.Column({
//					label: new sap.m.Label({text: "Пользователь"}),
//					template: oControl }));
//				
//				oControl = new sap.m.Text({
//					text:"{ActionTxt}"});
//				oTableWatch.addColumn(new sap.ui.table.Column({
//					label: new sap.m.Label({text: "Действие"}),
//					template: oControl }));

				
				var oModelHistory = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
			    oModelHistory.setSizeLimit(500);				
				sap.ui.getCore().setModel(oModelHistory);
				oTableWatch.setModel(oModelHistory);
				
				var oFilterWatch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, Trkorr[1].getText());
				oTableWatch.bindItems("/HistorySet",oTableWatch.getBindingInfo("items").template,undefined, oFilterWatch);
// from desktop version				
//			   var oSimpleForm = new sap.ui.layout.form.SimpleForm({
//				   layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
//					content:[
//								oTableWatch,
//					]
//				});		
				
			   oUpdateDialog.addContent(oTableWatch);						
			   oUpdateDialog.open();
				   
			   }
		   
		   function Search(oEvent){
				
				var data = oEvent.getSource().getValue();
				var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, data);
				var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '11');

			    var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
				oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilterAll);
				
				
			}
		   
		   function openErrorCorrectionDialog(Trkorr){ 

				var oEntry = {};
				oEntry.Trkorr = Trkorr[1].getText();
				oEntry.StatusCode = '11';

				sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry,{
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
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.error("Ошибка при изменении статуса запроса!", {
								title: "Ошибка"});
					}
				});

			};
			
			function oLockTrkorr(Trkorr){
					 
		 var array = [];
		 
		 for(var i = 0; i < oTable.getSelectedItems().length; i++){  
			 array.push(oTable.getSelectedContexts()[i].getObject().Trkorr)// вернет при 0 - "DE0K916300" //(oTable.getContextByIndex(oTable.getSelectedIndex()[i]).getObject().Trkorr); 
			 };
			 
			 var oModelLockTrkorr = new sap.ui.model.odata.v2.ODataModel(link, {
					defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.Put
				});
			 oModelLockTrkorr.setRefreshAfterChange(false);
			 oModelLockTrkorr.setDeferredGroups(["LockTrkorr"]);
			 
			 var oEntry = {};
			 for (var index = 0; index < array.length; ++index){
				 oEntry.Trkorr = array[index];
				 oEntry.Icon = "sap-icon://locked";
			    
				 oModelLockTrkorr.update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, {
					 groupId: "LockTrkorr"
				 });
				 
			    };
			    
			    oModelLockTrkorr.submitChanges({
				 	groupId: "LockTrkorr",
				 	success: function(){					 		
				 		var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//				 			 json: false,
					    	 defaultUpdateMethod: "Put"
					    	 });
				 		oModel.setSizeLimit(500);
						sap.ui.getCore().setModel(oModel);
						oTable.setModel(oModel);
						EnabledButton();
				 	},
			    	error: function(){
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.error("Произошла ошибка при смене статуса запроса!", {
								title: "Ошибка"});
			    	}
			    	});

			    array = null;
			
			
	}
			
			function EnabledButton(){
				 
				 numbersButton.setEnabled(false);
				 watchButton.setEnabled(false);
				 historyButton.setEnabled(false);
				 ErrorCorrection.setEnabled(false);
				 LockButton.setEnabled(false);
				 
			 }
								
		return oTable;
	},

});