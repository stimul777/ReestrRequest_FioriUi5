  var newColumnListItem = {};
sap.ui.controller("queryregistry.Mobile_version.TestDeMobile", {
 
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

	
	createTestTable : function(tableId, oController, view, typeTable) {
		
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
//				var oModel = new sap.ui.model.odata.ODataModel(link,false);	"заменить на одата модель 2"
//				sap.ui.getCore().setModel(oModel);
//				oTable.setModel(oModel);
				var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 }); ///может быть определить ее глобально, т.к. ошибка при использовании кнопки назад
				// и при вновь заходе в DET
				 oModel.setSizeLimit(500);
				 sap.ui.getCore().setModel(oModel);
				 oTable.setModel(oModel);
			}
		}).addStyleClass("myRefreshButton");

		 if(typeTable == 'for'){
    	var doneButton = new sap.m.Button({
    		//text: "Одобрен к переносу в тест",
    		icon: "sap-icon://sys-enter-2",
			enabled: false,
			visible: false,
			press: function(){
				pushApprove();
			},
	    });
    	
    	if (check == "true"){
    		doneButton.setVisible(true);
    	}
    	
    	doneButton.addStyleClass("myDoneButton");
		 }
		
		var editButton = new sap.m.Button({
			//tooltip: "Редактировать запрос",
			icon : "sap-icon://edit",
			enabled: false,
			press: function(oEvent) {

				var item = oTable.getSelectedItem();
				var cellsItem = item.getCells();
				openUpdateDialog(cellsItem);},
		});
		

	    
	    var removeButton = new sap.m.Button({
	    	icon: "sap-icon://delete",
			enabled: false,
			visible: false,
			press:  function() {
				var item = oTable.getSelectedItem();
				//if (idx == -1) return;
				
				var ReleaseType = item.getCells();
				openDeleteDialog(ReleaseType);
			}, 
	    });
	    if (check == "true"){
	    	removeButton.setVisible(true);			    	
	    }
	    

		var numbersButton = new sap.m.Button({
			//text: "Номера запросов",
			icon : "sap-icon://approvals",
			enabled: false,
			press: function() {

				var array = [];
				for ( i = 0; i< oTable.getSelectedItems().length; i++){
				var NumbersTrkorr = oTable.getSelectedItems()[i].getCells(); 
				
				array.push(NumbersTrkorr[1].getText());
				
				}			/**12.09.17**/	
				openNumbersTrkorrDialog(array);						   
			},
		});

		var watchButton = new sap.m.Button({
			//text: "Просмотр запроса",
			icon : "sap-icon://display",
			enabled: false,
			press : function(){
				var item = oTable.getSelectedItem();
				var rows = item.getCells();
				var Trkorr = rows;
				watch(Trkorr);},
		});

		var historyButton = new sap.m.Button({
			//text: "История запроса",
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
		
		
//Buttons--------------------------------------------------------------------------------------------START PART
		
		var buttons = [];
	    
	    if(typeTable == 'for'){
	    	//removeButton.setVisible(true);
	    	
	    	
	    	if (check == "true"){
	    		doneButton.setVisible(true);
	    	}
	    	buttons.push(doneButton);
	    	
	    }
	    if(typeTable == 'approve'){
	    	removeButton.setVisible(false);
	    	
	    	var errorButtonUnlock = new sap.m.Button({
		    	icon: "sap-icon://sys-cancel-2",
				enabled: false,
				press : function(){
					var item = oTable.getSelectedItem();
					var rows = item.getCells();
					var Trkorr = rows;
//					var idx = oTable.getSelectedIndex();
//					if (idx == -1) return;
//					var Trkorr = oTable.getContextByIndex(idx).getObject().Trkorr;
					errorUnlocking(Trkorr);},	
					
		    });
	    	errorButtonUnlock.addStyleClass("myErrorButton");
//	    	buttons.push(errorButtonUnlock);
	    }
	    if(typeTable == 'into'){
	    	
	    	removeButton.setVisible(false);
	    	var errorButton = new sap.m.Button({
		    	icon: "sap-icon://sys-cancel-2",
		    	text: "Тест не пройден",
		    	enabled: false,
		    	visible: true,
				press : function(){
					var item = oTable.getSelectedItem();
					var rows = item.getCells();
					var Trkorr = rows;
//					var idx = oTable.getSelectedIndex();
//					if (idx == -1) return;
//					var Trkorr = oTable.getContextByIndex(idx).getObject().Trkorr;
					oTestFail(Trkorr);},
		    });
	    	errorButton.addStyleClass("myErrorButton");
	    	buttons.push(errorButton);	
	    	
	    	var notMigrationButton = new sap.m.Button({
		    	icon: "sap-icon://locked",
		    	text: "Не переносить в предпрод",
		    	enabled: false,
				press : function(){
//					var idx = oTable.getSelectedIndex();
//					if (idx == -1) return;
//					var Trkorr =  oTable.getContextByIndex(idx).getObject().Trkorr;
					var item = oTable.getSelectedItem();
					var rows = item.getCells();
					var Trkorr = rows;
					oDontPush(Trkorr);},					
		    });
	    	notMigrationButton.addStyleClass("myErrorButton");
	    	buttons.push(notMigrationButton);
	    			    	
	    	var passTest = new sap.m.Button({
		    	icon: "sap-icon://sys-enter-2",
		    	text: "Прошел тест",
		    	enabled: false,
		    	press: function() {
//     				var idx = oTable.getSelectedIndex();
//					if (idx == -1) return;
//					var Trkorr =  oTable.getContextByIndex(idx).getObject().Trkorr;
		    		var item = oTable.getSelectedItem();
					var rows = item.getCells();
					var Trkorr = rows;
					openPushDialog(Trkorr);
					}
		    });
	    	
	    	passTest.addStyleClass("myDoneButton");
	    	buttons.push(passTest);
	    	
	    }
	    
	    if(typeTable == 'eCATT'){
	    	removeButton.setVisible(false);
	    }
		    
		    //Buttons-----------------------------------------------------------------------------------END PART
		
		var forceButton = new sap.m.Button({
			tooltip: "Принудительный перенос запроса",
			text: "Принудительный перенос запроса",
	    	icon: "sap-icon://alert",
	    	visible: false,
	    	enabled: false,
			press: function() {
				var item = oTable.getSelectedItem();
				var rows = item.getCells();
				var Trkorr = rows;
				openForceDialog(Trkorr);},
	    }).addStyleClass("myAlertButton");
		
    	if (check == "true"){
    		forceButton.setVisible(true);
    		buttons.push(forceButton);
    	}

		var searchBox = new sap.m.SearchField({	
			placeholder : "Поиск...", 	
			search: function(oEvent){
				Search(oEvent);
			},

		});
			
       var TestToolBar = new sap.m.OverflowToolbar({ 
			design : sap.m.ToolbarDesign.Transparent, 
			content : [ 
			            refreshButton, 
			            removeButton, 			           			          
			            numbersButton, 
						watchButton,
						historyButton, 
						
					  ], 		
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

        
		var oTable = new sap.m.Table(tableId,{
			mode: sap.m.ListMode.MultiSelect,
			includeItemInSelection: true,
		    headerToolbar: [
		                	TestToolBar          
	                  	   ],
	        infoToolbar: infoToolbar,
	        items: {
	        	path: "",   // /Query_registrySet      
	        	template: newColumnListItem=new sap.m.ColumnListItem({
		        	type: "Active",
		        	cells:[]
		        	  }),
	        		},
	        	columns:[],              
	        });
//	        
		oTable.attachSelectionChange(function(oEvent){ 
			
			var quantitySelectedRows =  oTable.getSelectedItems().length; //получаем длину массива
			(quantitySelectedRows >= 1)? numbersButton.setEnabled(true): numbersButton.setEnabled(false);
			switch(typeTable){
			case 'for':
				
				if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
					 removeButton.setEnabled(false);	  
					 watchButton.setEnabled(false);
					 historyButton.setEnabled(false);
					 if (quantitySelectedRows == 0 ) {
					    doneButton.setEnabled(false); }
				     else{
				    	doneButton.setEnabled(false);	
					     }
					 forceButton.setEnabled(false);

				 }
				 else {
					 removeButton.setEnabled(true);	  
					 watchButton.setEnabled(true);
					 historyButton.setEnabled(true);
					 doneButton.setEnabled(true);
					 forceButton.setEnabled(true);
					 					 							 
				     }	 				
				break;
			case 'approve':
				
				if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
					 removeButton.setEnabled(false);	  
					 watchButton.setEnabled(false);
					 historyButton.setEnabled(false);
					 errorButtonUnlock.setEnabled(false);
					 forceButton.setEnabled(false);

				 }
				 else {
					 removeButton.setEnabled(true);	  
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
			
			case 'eCATT':
				
				if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){  
					 watchButton.setEnabled(false);
					 historyButton.setEnabled(false);
					 forceButton.setEnabled(false);

				 }
				 else {
					 watchButton.setEnabled(true);
					 historyButton.setEnabled(true);
					 forceButton.setEnabled(true);
					 					 							 
				     }	 				
				break;
								
			}
			
		});
		
		if(typeTable == 'approve' || typeTable == 'eCATT' || typeTable == 'for'){
			
			var oControl = new sap.ui.core.Icon({
				src : "{Icon}",
		        color: "#cc0303!important;",
			});
			newColumnListItem.addCell(oControl);
			oTable.addColumn(new sap.m.Column({
				demandPopin: true,
				minScreenWidth: "500px",
				header: new sap.m.Label({text: ""}), 
				visible: false,
				}));//Столбец для статуса	
			
		}
		else
		{
			var oControl = new sap.ui.core.Icon({
				
				src : "{Icon}",
		        color: "#cc0303!important;",
			});
			newColumnListItem.addCell(oControl);
			oTable.addColumn(new sap.m.Column({
				
				demandPopin: false,
				width: "5px",
				//minScreenWidth: "500px",
				//demandPopin: true,
				//width: "35px",
				header: new sap.m.Label({text: ""}), 
				visible: true,
				}));//Столбец для статуса	
		}
		
		
		var oControl = new sap.m.Text({
 	       text:"{Trkorr}"
	        });
		newColumnListItem.addCell(oControl);
		oTable.addColumn(new sap.m.Column({
			demandPopin: true,
			header: new sap.m.Label({text: "Номер"}), 
			}));
		
		oControl = new sap.m.Text({
        	text: {
			path: "CreateDate",
			type: new sap.ui.model.type.DateTime({
				pattern: "dd-MM-yyyy HH:mm:ss",
				UTC: true })
			}
		});
		newColumnListItem.addCell(oControl);
		oTable.addColumn(new sap.m.Column({
				minScreenWidth: "500px",
				demandPopin: true,
				header: new sap.m.Label({text: "Добавлен"}), 
				}));
		
		var oGroupField = new sap.m.Text({
	        text: "{TuskNumber}"+"-"+"{Version}"+":"+"{Description}",
	        });
		newColumnListItem.addCell(oGroupField);
		oTable.addColumn(new sap.m.Column({
			header: new sap.m.Label({text: "Описание"}), 
			}));	

		oControl = new sap.m.Text({
	        text:"{Trfunction}"
	        });
		newColumnListItem.addCell(oControl);
		oTable.addColumn(new  sap.m.Column({
			minScreenWidth: "500px",
			demandPopin: true,
			header: new sap.m.Label({text: "Тип"}), 
			}));
		
		oControl =  new sap.m.Text({
	        text:"{CreatorLogin}"
	        });
		newColumnListItem.addCell(oControl);
		oTable.addColumn(new  sap.m.Column({
			minScreenWidth: "500px",
			visible : false,
			demandPopin: true,
			header: new sap.m.Label({text: "Добавил"}),
			}));

		    if(typeTable == 'into')
		    {
		    	
		    	oControl = new sap.m.Text({
			        text:"{TestComment}"
		        });
		    	newColumnListItem.addCell(oControl);
				oTable.addColumn(new  sap.m.Column({
					minScreenWidth: "500px",
					demandPopin: true,
					visible : false,
					header: new sap.m.Label({text: "Комментарий к тестированию"}),
					}));
				
				oControl = new sap.m.Text({
			        text:"{WikiLink}"
		        });
				newColumnListItem.addCell(oControl);
				oTable.addColumn(new  sap.m.Column({
					minScreenWidth: "500px",
					demandPopin: true,
					visible : false,
					header: new sap.m.Label({text: "Ссылка на WIKI"}),
					}));

			}
				
	    var oModel = new sap.ui.model.odata.v2.ODataModel(link,{
	    	 useBatch: false,
	    	 defaultUpdateMethod: "Put"
	    	 });
		 oModel.setSizeLimit(500);
		 sap.ui.getCore().setModel(oModel);
		 oTable.setModel(oModel);
	    


		    var oFilterInTest = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '02');
			var oFilterTestApprove = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '03');
			var oFilterTest = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '04');
			var oFilterEcatt = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '14');
  
		//oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template, undefined, oFilter);
		switch(typeTable){
		case 'for':
			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template, undefined, oFilterInTest);
			break;
		case 'approve':
			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template, undefined, oFilterTestApprove);
			break;
		case 'into':
			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template, undefined, oFilterTest);
			break;
		case 'eCATT':
			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template, undefined, oFilterEcatt);
			break;
							
		}
		
		function openDeblockDialog(Trkorr){
			
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.confirm("Запрос " + Trkorr[1].getText() + " содержит ошибки регламента: деблокировать?", {
				title: "Ошибки регламента",
				onClose: function(oAction){
					
					switch(oAction){
						case 'OK':
							var Unlock = true;
							pushApprove(Unlock, Trkorr);								
						case 'CANCEL':								
							break;
					}
				}
			 });
		}
		function pushApprove(Unlock, Trkorr){
			
			var BusyDialog = new sap.m.BusyDialog({
				text: "Деблокирование запроса..."				
			})

			var array = [];		
						
			for(var i = 0; i < oTable.getSelectedItems().length; i++){  
				array.push(oTable.getSelectedItems()[i].getCells()[1].getText()); 
								};
			
			var oModelUnlock = new sap.ui.model.odata.v2.ODataModel(link, {
				defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.Put
			});
		    
				
		    var oEntry = {};
		    if (Trkorr == undefined) {				
					    	
		    for (var index = 0; index < array.length; ++index) {
		    	
		    BusyDialog.open();
		    
		    oEntry.Trkorr = array[index];
		    oEntry.Trstatus = 'D';
		    oEntry.StatusCode = "03";
		    oEntry.Unlock = false;
		    		    
		    oModelUnlock.callFunction("/UnlockTrkorr",{
	    		method: "POST", 
	    		urlParameters: {
	    			"UnTrkorr"  : oEntry.Trkorr,
	    			"Trstatus"  : oEntry.Trstatus,			    	          
	    		    "StatusCode": oEntry.StatusCode,
	    		    "Unlock"    : oEntry.Unlock	    		     
	    		},  
	    		success: function(oData, response){
	    			var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
	    			oModel.setSizeLimit(500);
				    sap.ui.getCore().setModel(oModel);
					oTable.setModel(oModel);
					BusyDialog.close();
					if(oData.Unlock == true){
					openDeblockDialog(oData.Trkorr);
					}
	    		},
	    	    error: function(oError){
	    	    	BusyDialog.close();
	    	        sap.m.MessageToast.show("Произошла ошибка при смене статуса запроса " + oEntry.Trkorr + "!");
	    	    } 
	    	});
		    
//		    oModelUnlock.update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, {
//		    	  groupId: "Update"
//		    } );		   	    
		    		    		   		    
		    };
		    } else {
		    	BusyDialog.open();
		    	
		    	oEntry.Trkorr = Trkorr[1].getText();
			    oEntry.Trstatus = 'D';
			    oEntry.StatusCode = "03";
			    oEntry.Unlock = Unlock;
			    
			    
//			    oModelUnlock.update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry );
			    
			    oModelUnlock.callFunction("/UnlockTrkorr",{
		    		method: "POST", 
		    		urlParameters: {
		    			"UnTrkorr"  : oEntry.Trkorr,
		    			"Trstatus"  : oEntry.Trstatus,			    	          
		    		    "StatusCode": oEntry.StatusCode,
		    		    "Unlock"    : oEntry.Unlock	    		     
		    		},  
		    		success: function(oData, response){
		    			var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
					    	 useBatch: false,
					    	 defaultUpdateMethod: "Put"
					    	 });
		    			oModel.setSizeLimit(500);
					    sap.ui.getCore().setModel(oModel);
						oTable.setModel(oModel);
						BusyDialog.close();
		    		},
		    	    error: function(oError){
		    	    	BusyDialog.close();
		    	        sap.m.MessageToast.show("Произошла ошибка при смене статуса запроса!");
		    	    } 
		    	});

			}
		    
//		    oModelUnlock.submitChanges({
//		    	groupId: "Update",
//		    	success: function(oData, response){
//			    	var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//			         json: false,
//			    	 useBatch: false,
//			    	 defaultUpdateMethod: "Put"
//			    	 });
//				 oModel.setSizeLimit(500);
//				 sap.ui.getCore().setModel(oModel);
//				 oTable.setModel(oModel);
//				 BusyDialog.close();
//		    	},
//		    	error: function(oError){
//		    		BusyDialog.close();		    		
//					jQuery.sap.require("sap.m.MessageBox");
//					sap.m.MessageBox.error("Произошла ошибка при смене статуса запроса!", {
//							title: "Ошибка"});
//		    	}
//		    	});
		    
		    
//		    oModelUnlock.attachRequestCompleted(function(oEvent){
//		    	var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//			    	 useBatch: false,
//			    	 defaultUpdateMethod: "Put"
//			    	 });
//				 oModel.setSizeLimit(500);
//				 sap.ui.getCore().setModel(oModel);
//				 oTable.setModel(oModel);
//				 if(oEvent.Unlock == true){
//				 openDeblockDialog(oEntry.Trkorr);
//				 }
//				 BusyDialog.close();
//		    });
		    array = null;

			};
		
			
			function openPushDialog(Trkorr){
				var oPushDialog = new sap.m.Dialog({
					title: "Аудит запроса " + Trkorr[1].getText(),
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
								oEntry.Trkorr 	   = Trkorr[1].getText(); // Trkorr
								oEntry.StatusCode  = "05";
								oEntry.TestComment = content[1].getValue();
								oEntry.WikiLink    = content[3].getValue();
								oEntry.SpecLink    = content[5].getValue();	
								
								sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, {
									success: function(){
									var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
								    	 useBatch: false,
								    	 defaultUpdateMethod: "Put"
								    	 });
									 oModel.setSizeLimit(500);
									 sap.ui.getCore().setModel(oModel);
									 oTable.setModel(oModel);
									 
									 passTest.setEnabled(false);
										errorButton.setEnabled(false);
										notMigrationButton.setEnabled(false);
										forceButton.setEnabled(false);
										removeButton.setEnabled(false);	  
										watchButton.setEnabled(false);
										historyButton.setEnabled(false);
										numbersButton.setEnabled(false) ;
									 
									 oPushDialog.close();
									},
									error: function(){
										oPushDialog.close();
										jQuery.sap.require("sap.m.MessageBox");
										sap.m.MessageBox.error("Ошибка при изменении статуса запроса!", {
												title: "Ошибка"});
									}
								});
								
//								var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//							    	 useBatch: false,
//							    	 defaultUpdateMethod: "Put"
//							    	 });
//								 oModel.setSizeLimit(500);
//								 sap.ui.getCore().setModel(oModel);
//								 oTable.setModel(oModel);
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
			
			function oDontPush(Trkorr){
				
				var oEntry = {};
				oEntry.Trkorr = Trkorr[1].getText();
				oEntry.Icon   = "sap-icon://locked";
				sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry,{
					success: function(){
					var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
					 oModel.setSizeLimit(500);
					 sap.ui.getCore().setModel(oModel);
					 oTable.setModel(oModel);
					 passTest.setEnabled(false);
						errorButton.setEnabled(false);
						notMigrationButton.setEnabled(false);
						forceButton.setEnabled(false);
						removeButton.setEnabled(false);	  
						watchButton.setEnabled(false);
						historyButton.setEnabled(false);
						numbersButton.setEnabled(false) ;
					},
					error: function(){
						var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
					    	 useBatch: false,
					    	 defaultUpdateMethod: "Put"
					    	 });
						 oModel.setSizeLimit(500);
						 sap.ui.getCore().setModel(oModel);
						 oTable.setModel(oModel);
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.error("Ошибка при изменении статуса запроса!", {
								title: "Ошибка"});
					}
				});
				
			};
			
			function oTestFail(Trkorr){
				
				var oEntry = {};
				oEntry.Trkorr = Trkorr[1].getText();
				oEntry.Icon   = "sap-icon://sys-cancel-2";
				sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, { 
					success: function(){
					var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
					 oModel.setSizeLimit(500);
					 sap.ui.getCore().setModel(oModel);
					 oTable.setModel(oModel);
					 passTest.setEnabled(false);
						errorButton.setEnabled(false);
						notMigrationButton.setEnabled(false);
						forceButton.setEnabled(false);
						removeButton.setEnabled(false);	  
						watchButton.setEnabled(false);
						historyButton.setEnabled(false);
						numbersButton.setEnabled(false) ;
					},
					error: function(){
						var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
					    	 useBatch: false,
					    	 defaultUpdateMethod: "Put"
					    	 });
						 oModel.setSizeLimit(500);
						 sap.ui.getCore().setModel(oModel);
						 oTable.setModel(oModel);
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.error("Ошибка при изменении статуса запроса!", {
								title: "Ошибка"});
					}
				});
				
			};
/**** Create Request *****/		
		function openCreateDialog(){
			var oCreateDialog = new sap.m.Dialog({
				title: "Новый запрос (DE)",
				stretchOnPhone: true 
			});
			
			var oDropDownBox 			= new sap.m.ComboBox();
			var oDropDownBoxTypeRequest = new sap.m.ComboBox();
			var CheckBoxEcatt           = new sap.m.CheckBox({text: "Запрос для eCATT"});
			
			oDropDownBoxTypeRequest.setModel(oModel);
			oDropDownBox.setModel(oModel);

			var itemTemplate = new sap.ui.core.ListItem({
				key: "{Id}",
				text: "{Subject}",
				additionalText: "{Id}",
			});
			
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
					    					  						
						var oEntry = {};
						
						oEntry.TuskNumber  = oDropDownBox.getSelectedKey();
						oEntry.Trfunction  = oDropDownBoxTypeRequest.getSelectedKey();
						oEntry.Description = content[5].getValue();
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
				
				title: "Редактирования запроса " + cellsItem[1].getText(),
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
								text: cellsItem[3].getText().split('-')[0],
							}),
																					
							new sap.m.Label({text:"Тип запроса", }),
							new sap.m.Text({
								text: cellsItem[4].getText(),
							}),
							
							new sap.m.Label({text:"Версия", }),
							new sap.m.Text({
								text: cellsItem[3].getText().split('-')[1].split(':')[0],
							}),
							
							new sap.m.Label({text:"Описание", }),		
						    new sap.m.TextArea({
						    	  value: cellsItem[3].getText().split(':')[1],
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
						oEntry.Trkorr = cellsItem[1].getText();
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
							sap.m.MessageToast.show("Запрос " + cellsItem[1].getText() + " отредактирован!");

							},
							error: function(oError){
								oUpdateDialog.close();
								var dialog = new sap.m.Dialog({
									title: "Ошибка",
									type: sap.m.DialogType.Message,
									state: sap.ui.core.ValueState.Error,
									content: new sap.m.Text({
										text: "Произошла ошибка при редактировании запроса " + cellsItem[1].getText()
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
			array.push(oTable.getSelectedItems()[i].getCells()[1].getText()); 
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
				sap.m.MessageBox.confirm("Вы уверены что хотите удалить запрос " + ReleaseType[1].getText() + " ?", {
					title: "Удаление запроса",
					onClose: function(oAction){
						
						switch(oAction){
							case 'OK':
								sap.ui.getCore().getModel().remove("/Query_registrySet('" + ReleaseType[1].getText() + "')", {
									success: function(){
										var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
									    	 useBatch: false,
									    	 defaultUpdateMethod: "Put"
									    	 });
										 oModel.setSizeLimit(500);
										 sap.ui.getCore().setModel(oModel);
										 oTable.setModel(oModel);
										 sap.m.MessageToast.show("Запрос " + ReleaseType[1].getText() + " удален!");
									},
							 error: function(){
								 
								 var dialog = new sap.m.Dialog({
										title: "Ошибка",
										type: sap.m.DialogType.Message,
										state: sap.ui.core.ValueState.Error,
										content: new sap.m.Text({
											text: "Произошла ошибка при удалении запроса " + ReleaseType[1].getText().ReleaseType[0].getText()
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
				//sap.ui.getCore().setModel(oModelWatch);
				//oTableWatch.setModel(oModelWatch);
			
				var oFilterWatch = new sap.ui.model.Filter("Parameter", sap.ui.model.FilterOperator.EQ, Trkorr[1].getText());
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
//				
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
				var oModelHistory = new sap.ui.model.odata.v2.ODataModel(link, {
			    	 useBatch: false,
			    	 defaultUpdateMethod: "Put"
			    	 });
				
			    oModelHistory.setSizeLimit(500);				
				sap.ui.getCore().setModel(oModelHistory);
				oTableWatch.setModel(oModelHistory);
				
				var oFilterWatch = new sap.ui.model.Filter("Trkorr", sap.ui.model.FilterOperator.EQ, Trkorr[1].getText());
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
					Title: "Принудительный перенос запроса " + Trkorr[1].getText(),
					stretchOnPhone :true
				});
				var TrkorrValue = "";

				TrkorrValue = Trkorr[1].getText();
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
									editable: false, /// TRUE
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