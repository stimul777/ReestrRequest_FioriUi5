  sap.ui.controller("queryregistry.SM.ReleaseHistoryMobile", {
 
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf queryregistry.Section.ReleaseHistory
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
				 //sap.ui.getCore().setModel(oModel);
				 oTable.setModel(oModel);
				 }
			    });	
		refreshButton.addStyleClass("myRefreshButton");
		
		var SendEmail = new sap.m.Button({
		    icon : "sap-icon://email",
		    text: "Отправить email",
		    tooltip: "Отправить email",
		    press: function(){
		    	if (oComboBox.getSelectedKey() == "") {
		    		sap.m.MessageToast.show("Выберите релиз");
				    return; 			
					} 	
		    	
	    	 openSendEmailDialog();
		    
		    },		
		});
		SendEmail.addStyleClass("myReleaseFormButton");
	////
		var SendHist = new sap.m.Button({
		    icon : "sap-icon://customer-history",
		    text: "История рассылки",
		    tooltip: "История рассылки",
		    press: function(){
		    	if (oComboBox.getSelectedKey() == "") {
		    		sap.m.MessageToast.show("Выберите релиз");
				    return; 			
					} 	
		    	
//		    	var idx = oTable.getSelectedIndex();
//				if (idx == -1) return;
//				Trkorr = oTable.getContextByIndex(idx).getObject().Trkorr;       
	    	    //sendhistory(Trkorr);
		    	sendhistory();

		    },		
		});
		////
		var NameComboBox = new sap.m.Label({text:"Релиз:"});
		var oComboBox = new sap.m.ComboBox({
	    width: "100%", 
		
		change: function(oEvent){
			
			var b = oComboBox.getSelectedKey();
			var oFilter = new sap.ui.model.Filter("ReleaseDate", sap.ui.model.FilterOperator.EQ, b);
						oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilter);			
		}	
			
		});				
		oComboBox.setModel(oModel);

		var itemTemplate = new sap.ui.core.ListItem({
			key: "{Id}",
			text: {
				path: "Id",
				type: new sap.ui.model.type.DateTime({
					pattern: "yyyy-MM-dd HH:mm:ss",
					UTC: true })

				},
			additionalText:"{Text}"
		});
		
		oComboBox.setShowSecondaryValues(true);
		oComboBox.bindItems("/ReleaseIDSet", itemTemplate);
			
			var ReleaseHistoryToolBar = new sap.m.OverflowToolbar({			
				design : sap.m.ToolbarDesign.Transparent, // sap.m.ToolbarDesign, since 1.16.8			
				content : [
				           refreshButton,
				           new sap.m.ToolbarSeparator(),
				           NameComboBox,
				           SendEmail,					 
				           oComboBox,
				           SendHist,
				          ], // sap.ui.core.Control			
			});			
			
			ReleaseHistoryToolBar.addContent(new sap.m.ToolbarSpacer());
			ReleaseHistoryToolBar.addContent(oComboBox);
			
			var infoToolbar = new sap.m.Toolbar({
	    	   	width: "100%",
				design : sap.m.ToolbarDesign.Transparent, 
				content : [ 			                    
				            oComboBox,			        			
						  ], 		
			}).addStyleClass("oComboBox");
			
			var oTable =new sap.m.Table(tableId,{
				mode: sap.m.ListMode.MultiSelect,
				includeItemInSelection: true,
				headerToolbar: [
									ReleaseHistoryToolBar ,          
							   ],
				infoToolbar: infoToolbar,
		        items: {
		        	path: "",  //        /Query_registrySet
		        	template: newColumnListItem=new sap.m.ColumnListItem({
			        	type: "Active",
			        	cells:[]
			        	  }),
		        		},
		        	columns:[],              
		        });
						
			var oCell = new sap.m.Text({text:"{Trkorr}"}); 
			newColumnListItem.addCell(oCell);
			oTable.addColumn(new sap.m.Column({
				demandPopin: true,
			    header: new sap.m.Label({text: "Номер"}), 
				//template: oControl 
				}));
				
				
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
				
				oСell = new sap.m.Text({
					text:"{ReqFunction}"
				});
				oTable.addColumn(new sap.m.Column({
					header: new sap.m.Label({text: "Функция"}),
					demandPopin: true,
					visible: true,
					minScreenWidth: "500px",
					}));
				
				oCell = new sap.m.Text({
		    		text:"{TestComment}"
			    	});
		    	newColumnListItem.addCell(oCell);
				oTable.addColumn(new sap.m.Column({
					header: new sap.m.Label({text: "Комментарий"}),
					demandPopin: true,
					visible: true,
					//minScreenWidth: "500px",
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
				
						    
				var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
				oModel.setSizeLimit(500);
				//sap.ui.getCore().setModel(oModel);
				oTable.setModel(oModel);
		
		/****** Send Email *****/
	function openSendEmailDialog(){
		strPersEmail = "";

        var CheckCEO = new sap.m.CheckBox({
        	text: "ГД",
        	width: "100px"
        		});
        var CheckCFO = new sap.m.CheckBox({
        	text: "КД",
        	width: "100px"
        		});
        var CheckHSU = new sap.m.CheckBox({
        	text: "РСП",
        	width: "100px"
        		});
        var CheckHFA = new sap.m.CheckBox({
        	text: "РФН",
        	width: "100px"
        		});
        var CheckHFG = new sap.m.CheckBox({
        	text: "РФГ",
        	width: "100px"
        		});
        var CheckAC = new sap.m.CheckBox({
        	text: "Бухгалтер",
        	width: "100px"
        		});
        var CheckSE = new sap.m.CheckBox({
        	text: "Экономист",
        	width: "100px"
        		});
        var CheckAbap3 = new sap.m.CheckBox({
        	text: "ABAP3",
        	width: "100px"
        })
        var CheckBP = new sap.m.CheckBox({
        	text: "Владельцы БП",
        	width: "100px"
        })
        var CheckSec = new sap.m.CheckBox({
        	text: "Служба безопастности",
        	width: "100px"
        })
        var CheckHR = new sap.m.CheckBox({
        	text: "HR",
        	width: "100px"
        })
        var CheckLD = new sap.m.CheckBox({
        	text: "Юрист",
        	width: "100px"
        })
        
        var arrayPersEmail = [];
        var oPersEmail = new sap.m.MultiComboBox({ 
            items : {  
              path : "/PersInfoSet",  
              template : new sap.ui.core.ListItem({  
                key  : "{Uname}",  
                text : "{FullName}",
              }),
            },
            
            selectionFinish: function(oControlEvent){
            	arrayPersEmail = [];            	
          		var items = oPersEmail.getSelectedKeys(); 
    		
          		 for (var i = 0; i < items.length; i++) {
          		var item = items[i];
          	     arrayPersEmail.push(item);
          	     strPersEmail += arrayPersEmail[i] + " ";
          		 }
          		 },
          });
        
        oPersEmail.setModel(oModel);
        
        var oHL = new sap.ui.layout.HorizontalLayout({
            allowWrapping : true,
            content: [

              new sap.ui.layout.VerticalLayout({
                content: [
                	CheckCEO  
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                content: [
                	CheckCFO   
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                content: [
                	CheckHSU   
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                content: [
                	CheckHFA
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                content: [
                	CheckHFG
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                content: [
                	CheckAC
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                content: [
                	CheckSE
                ]
              }),
              new sap.ui.layout.VerticalLayout({
                  content: [
                	CheckAbap3
                  ]
                }),
             new sap.ui.layout.VerticalLayout({
                 content: [
                	 CheckBP
                 ]
               }),
             new sap.ui.layout.VerticalLayout({
                  content: [
                  	 CheckSec
                  ]
                }),
             new sap.ui.layout.VerticalLayout({
                  content: [
                     CheckHR
                   ]
                 }),
             new sap.ui.layout.VerticalLayout({
                   content: [
                     CheckLD
                    ]
                  }),
              
              
            ]
          });
		
		var oSendEmailDialog = new sap.m.Dialog({
			title: "Отправка письма",
			stretchOnPhone: true,
			contentWidth: "25%",
			content: [
				new sap.m.Label({
					text: "Кому:"
				}),
				oHL,
				new sap.m.Label({
					text: "Персональное письмо:"
				}).addStyleClass("myPersEmailLabel"),
				oPersEmail
				]
		});

		var busyDialog = new sap.m.BusyDialog({
			text: "Отправка писем...",
            showCancelButton : false
            });

		oSendEmailDialog.addButton(
			new sap.m.Button({
				text: "Отправить", 
				press: function() {
					var content = [];
					
					for(var i = 0; i < oHL.getContent().length; i++){
						
						content.push( oHL.getContent()[i].getContent()[0].getSelected() )
					}
					var oEntry = {};
					
			    	   oModel.callFunction("/SendForm",{ // function import name  
			    	          method: "POST", // http method  
			    	          urlParameters: {   
			    	          "ReleaseId"  : oComboBox.getValue(),			    	          
			    		      "CheckCEO"   : content[0],
			    		      "CheckCFO"   : content[1],
			    		      "CheckHSU"   : content[2],
			    		      "CheckHFA"   : content[3],
			    		      "CheckHFG"   : content[4],
			    		      "CheckAC"    : content[5],
			    		      "CheckSE"    : content[6],
			    		      "CheckAbap3" : content[7],
			    		      "CheckBP"    : content[8],
			    		      "CheckSec"   : content[9],
			    		      "CheckHR"    : content[10],
			    		      "CheckLD"    : content[11],
			    		      "PersEmail"  : strPersEmail }, // function import parameters  
			    		      
//			    	        null,          
			    	        success: function(oData, response) {    
			    	        	sap.m.MessageToast.show("Письма доставлены");
								oSendEmailDialog.close();
			    	        	busyDialog.close();
			    	        }, // callback function for success  
			    	        error: function(oError){
			    	        	busyDialog.close();
			    	        	jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.error("Произошла ошибка при отправке письма о релизе!", {
										title: "Ошибка"});
			    	        },
//			    	        true 
			    	        
			    	}); // callback function for error  
			    	
					busyDialog.open();

				}
			})
		);
		oSendEmailDialog.addButton(new sap.m.Button({
			text: "Закрыть",
			press: function(){
				oSendEmailDialog.close();
			}
		}))
		oSendEmailDialog.open();
		}
	
	////
	
	function sendhistory(){
		
		 var oSendHistDialog = new sap.m.Dialog({
			   title: "История рассылки",
			   stretchOnPhone: true,
			   endButton: new sap.m.Button({
				   text: "Закрыть",
				   press: function(){
					   oSendHistDialog.close(); 
				   }
			   })
		   });
		 var oTableWatch = new sap.m.Table({
			   items: {
		        	path: "/SendHistorySet",          
		        	template: new sap.m.ColumnListItem({	              
		        	  cells:[             
		        	       new sap.m.Text({
		        	        	text: {
		        	    			path: "ReleaseDate",
		        	    			//template: oControl ,
		        	    			type: new sap.ui.model.type.DateTime({
		        	    			pattern: "dd-MM-yyyy HH:mm:ss",
		        	    			UTC: true })
		        	    			}
			        	        }),
			        	    new sap.m.Text({
			        	        text: "{Trkorr}"
			        	        }) ,
		        	       
		        	        new sap.m.Text({
			        	        text: "{Recip}"
			        	        })
		        	       	 ]
		        	  })        	
		        	},
			    columns: [
			    	new sap.m.Column({
					header: new sap.m.Label({text: "Отметка времени"}), 
						}),
						
					new sap.m.Column({
					header: new sap.m.Label({text: "Номера запросов"}), 
						}),
					new sap.m.Column({
						
						minScreenWidth: "500px",
						demandPopin: true,
					header: new sap.m.Label({text: "Получатели"}), 
						}),
						
					    ],			
		        });		
//		 var oTableWatch = new sap.ui.table.Table({
//			 
//			 	width: "100%",
//			    visibleRowCount: 7,
//				selectionMode: sap.ui.table.SelectionMode.None,
//		        enableColumnReordering:false,			
//		        }); 
//		 
//		  var oControl = new sap.m.Text({
//			   text: {
//					path: "ReleaseDate",
//					type: new sap.ui.model.type.DateTime({
//						pattern: "dd-MM-yyyy HH:mm:ss",
//						UTC: true })
//	
//					}
//		   });
//		  
//		  oTableWatch.addColumn(new sap.ui.table.Column({
//			    width: "30%",
//				label: new sap.m.Label({text: "Отметка времени"}),
//				template: oControl }));
//			
//			oControl = new sap.m.Text({text:"{Trkorr}"});
//			oTableWatch.addColumn(new sap.ui.table.Column({
//				label: new sap.m.Label({text: "Номера запросов"}),
//				template: oControl }));
//			
//			oControl = new sap.m.Text({
//				text:"{Recip}"});
//			oTableWatch.addColumn(new sap.ui.table.Column({
//				label: new sap.m.Label({text: "Получатели"}),
//				template: oControl }));  
//			
			var oModelSendHistory = new sap.ui.model.odata.v2.ODataModel(link, {
		    	 useBatch: false,
		    	 defaultUpdateMethod: "Put"
		    	 });
		    oModelSendHistory.setSizeLimit(500);				
			sap.ui.getCore().setModel(oModelSendHistory);
			oTableWatch.setModel(oModelSendHistory);
			
			//var oFilterWatch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, Trkorr);
			//oTableWatch.bindRows("/SendHistorySet",undefined,undefined, [oFilterWatch]);
			var KeySendHist = oComboBox.getSelectedKey();
			var oFilterSendHist = new sap.ui.model.Filter("ReleaseDate", sap.ui.model.FilterOperator.EQ, KeySendHist);
			oTableWatch.bindItems("/SendHistorySet",oTableWatch.getBindingInfo("items").template,undefined, oFilterSendHist );
			
			// var oSimpleForm = new sap.ui.layout.form.SimpleForm({
			//	   layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			//		content:[
			//					oTableWatch,
			//		]
			//	});		
				
			 oSendHistDialog.addContent(oTableWatch);						
			 oSendHistDialog.open();
		
	}
	////
	
	    return oTable;					
	},
	
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf queryregistry.Section.ReleaseHistory
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf queryregistry.Section.ReleaseHistory
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf queryregistry.Section.ReleaseHistory
*/
//	onExit: function() {
//
//	}

});