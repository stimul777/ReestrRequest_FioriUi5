 sap.ui.controller("queryregistry.Mobile_version.ArchiveDeMobile", {
 
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
		var link = this.oStorage.get("IDSystemLink");
	
		busyDialog = new sap.m.BusyDialog({
			text: "Загрузка данных...",
            showCancelButton : false
            });

		var refreshButton = new sap.m.Button({
			icon: "sap-icon://refresh",
			tooltip: "Обновить",
			press: function refresh(){
				var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
				 oModel.setSizeLimit(500);
				 sap.ui.getCore().setModel(oModel);
				 oTable.setModel(oModel);
			},
		});
		refreshButton.addStyleClass("myRefreshButton");

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


		var searchBox = new sap.m.SearchField({								
			placeholder : "Поиск...", 		
			search: function(oEvent){
				Search(oEvent);
			},
		});
		
		

		var TestToolBar = new sap.m.OverflowToolbar({					
			design : sap.m.ToolbarDesign.Transparent, // sap.m.ToolbarDesign, since 1.16.8			
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
		TestToolBar.addContent(new sap.m.ToolbarSpacer());
		TestToolBar.addContent(searchBox);	
		
		var infoToolbar = new sap.m.Toolbar({
    	   	width: "100%",
			design : sap.m.ToolbarDesign.Transparent, 
			content : [ 			                    
			            searchBox,			        			
					  ], 		
		}).addStyleClass("searchBox");		
		
		var oTable = new sap.m.Table(tableId,{
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
		
		oTable.attachSelectionChange(function(oEvent){
			
			var quantitySelectedRows =  oTable.getSelectedItems().length; //получаем длину массива
			 if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
				    watchButton.setEnabled(false);
				    historyButton.setEnabled(false);
			 }
			 else {

				    watchButton.setEnabled(true);
				    historyButton.setEnabled(true);

			 	 }	 	
			(quantitySelectedRows >= 1)? numbersButton.setEnabled(true): numbersButton.setEnabled(false);
		});
		

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
		
		

	     var oModel = new sap.ui.model.odata.v2.ODataModel(link,false);
		
//		sap.ui.getCore().setModel(oModel);
//		oTable.setModel(oModel);
	     oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);
		
		var oFilter = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '12');
       
		oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined,undefined, oFilter);
//		oTable.bindRows("/Query_registrySet");
		oTable.placeAt("content");

									
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
			 
				var oTableWatch = new sap.m.Table( {
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
					//sap.ui.getCore().setModel(oModelWatch);
				    //oTableWatch.setModel(oModelWatch);
					
					var oFilterWatch = new sap.ui.model.Filter("Parameter", sap.ui.model.FilterOperator.EQ, Trkorr);
					oTableWatch.bindItems("/Watch_requestSet",oTableWatch.getBindingInfo("items").template,undefined, oFilterWatch);
					
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
					
				   var oSimpleForm = new sap.ui.layout.form.SimpleForm({
						content:[
									oTableWatch,
						]
					});		
					
				  oUpdateDialog.addContent(oSimpleForm);
				  oUpdateDialog.open();
				  
				 
				
				//var a = sap.ui.getCore().byId("fa");

				
				//a.getItems()[0].getCells()[1].destroy(); //10
				//a.getItems()[0].addCell(Link10); 
				  
		   }
		   
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
		   
		   function Search(oEvent){
				
				var data = oEvent.getSource().getValue();
				var oFilterSearch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, data);
				var oFilterStatus = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '12');

			     var oFilterAll    = new sap.ui.model.Filter([oFilterSearch,oFilterStatus], true);
				 oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, [oFilterAll]);
				
				
			}
		   
								
		return oTable;
	},
	
});