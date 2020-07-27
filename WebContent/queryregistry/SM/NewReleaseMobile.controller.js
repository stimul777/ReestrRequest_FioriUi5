   sap.ui.controller("queryregistry.SM.NewReleaseMobile", {
 
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf queryregistry.Section.NewRelease
	 */
	onInit : function() {
		var oView = this.getView();
		oView.setModel(new sap.ui.model.json.JSONModel({
			globalFilter : ""
		}), "ui");
		this._oGlobalFilter = null;
		/////
		jQuery.sap.require("sap.m.MessageBox");
		sap.ui.Device.orientation.attachHandler(function(oEvt){
		      if(jQuery.device.is.landscape){
           
		    sap.m.MessageBox.show("Please use this application in Landscape mode.",sap.m.MessageBox.Icon.INFORMATION );
		    jQuery.device.is.portrait = true;
		      }

	});
		//////
	},


	createTable: function(tableId, oController, view, typeTable){
		
		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		var check = this.oStorage.get("IDCheck");
		//var link = this.oStorage.get("IDSystemLink");
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
						sap.ui.getCore().byId('IdNewRelease').setText(moment().format('YYYY.MM.DD HH:mm:ss'));
					    sap.ui.getCore().byId('NewRelease').setText(moment().format('YYYY-MM-DD HH:mm:ss'));
						oTable.setModel(oModel);
					},
			    });	
		refreshButton.addStyleClass("myRefreshButton");
		
		var editButton = new sap.m.Button({
			tooltip: "Изменить",
			icon : "sap-icon://edit",
			enabled: false,
			press: function(oEvent) {

				var item = oTable.getSelectedItem();
				var Trkorr = item.getCells();
				openUpdateDialog(Trkorr);},
		});
		
		var ReleaseForm = new sap.m.Button({
		    icon : "sap-icon://accelerated",
		    enabled: false,
		    text: "Сформировать релиз",
		    tooltip: "Сформировать релиз",
		    press: function(){
		    	
		    var oModelUsers = this.getModel();
		    
	    	var array = [];
	    	var oEntry = {};

	    	oEntry['Trkorr'] = [];
			
			for(var i = 0; i < oTable.getSelectedItems().length; i++){  
				oEntry['Trkorr'].push(oTable.getSelectedItems()[i].getCells()[0].getText());
			};
			
			var BusyDialogRelease = new sap.m.BusyDialog({
				text: "Формирование релиза..."
			}).open();
	    	
	    	oModelUsers.callFunction("/ReleaseForm",{
	    		method: "POST", 
	    		urlParameters: {
	    			"Trkorr": oEntry.Trkorr
	    		},  
	    		success: function(oData, response){
	    			var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
				    	 useBatch: false,
				    	 defaultUpdateMethod: "Put"
				    	 });
					oModel.setSizeLimit(500);
					sap.ui.getCore().byId('IdNewRelease').setText(moment().format('YYYY.MM.DD HH:mm:ss'));
				    sap.ui.getCore().byId('NewRelease').setText(moment().format('YYYY-MM-DD HH:mm:ss'));
					oTable.setModel(oModel);
					sap.m.MessageToast.show("Релиз сформирован!")
					EnabledButton();
					BusyDialogRelease.close();
	    		},
	    	    error: function(oError){
	    	        	sap.m.MessageToast.show("Произошла ошибка при формировании релиза! Обратитесь к специалисту службы поддрежки");
	    	        	BusyDialogRelease.close();
	    	        } 
	    		});
		    },		
		});
		ReleaseForm.addStyleClass("myReleaseFormButton");
		
		
		
	    var IdDate   = moment().format('YYYY.MM.DD HH:mm:ss');
	    var DateNow  = moment().format('YYYY-MM-DD HH:mm:ss');
		var IdReleaseLabel  = new sap.m.Text({
			text:"Номер релиза:",
		});
		var IdNewRelease = new sap.m.Text("IdNewRelease",{
					 text: IdDate,
					 editable: false,
		});
		var NewReleaseLabel  = new sap.m.Text({
			text:"Дата выпуска:", 
		});
		var NewRelease = new sap.m.Text("NewRelease",{
					 text: DateNow,
					 editable: false,
		});
			    	
				var NewReleaseToolBar =new sap.m.OverflowToolbar({			
					design : sap.m.ToolbarDesign.Transparent, // sap.m.ToolbarDesign, since 1.16.8			
					content : [
					           refreshButton,
					           editButton,					 
					           IdReleaseLabel,
					           IdNewRelease,
					           NewReleaseLabel,
					           NewRelease,
					           ReleaseForm,
					           
					          ], // sap.ui.core.Control			
				});						

				NewReleaseToolBar.addContent(new sap.m.ToolbarSpacer());
				NewReleaseToolBar.addContent(ReleaseForm);
				
				var infoToolbar = new sap.m.Toolbar({
		    	   	width: "100%",
					design : sap.m.ToolbarDesign.Transparent, 
					content : [ 			                    
					            
					            refreshButton,
						        editButton,	
						        ReleaseForm,
							  ], 		
				}).addStyleClass("oComboBox");		

				var oTable =new sap.m.Table(tableId,{
					mode: sap.m.ListMode.MultiSelect,
					includeItemInSelection: true,
					headerToolbar: [
										NewReleaseToolBar ,          
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
				
				oTable.attachSelectionChange(function(oEvent){
					
					var quantitySelectedRows =  oTable.getSelectedItems().length; //получаем длину массива
					 if (quantitySelectedRows > 1 || quantitySelectedRows == 0 ){
						    editButton.setEnabled(false);
					 }
					 else {
						    editButton.setEnabled(true);
					 	  }
					(quantitySelectedRows >= 1)? ReleaseForm.setEnabled(true): ReleaseForm.setEnabled(false);
				});
						
				var oCell = new sap.m.Text({text:"{Trkorr}"}); //[0]
				newColumnListItem.addCell(oCell);
				oTable.addColumn(new sap.m.Column({
					demandPopin: true,
				    header: new sap.m.Label({text: "Номер"}), 
					//template: oControl 
					}));
								
				var oGroupField = new sap.m.Text({
        	        text: "{TuskNumber}"+"-"+"{Version}"+":"+"{Description}",
    	        });
				newColumnListItem.addCell(oGroupField);
				oTable.addColumn(new sap.m.Column({
					demandPopin: true,
					header: new sap.m.Label({text: "Описание"}), //[1]
				}));
				
				var oControl = new sap.m.Text({
        	        text:"{CreatorLogin}"
    	        });
				newColumnListItem.addCell(oControl);
				oTable.addColumn(new  sap.m.Column({
					minScreenWidth: "500px",
					demandPopin: true,
					header: new sap.m.Label({text: "Добавил"}),	//[2]
					}));
				
				oControl = new sap.m.Text({
					text:"{ReqFunction}"
				});
				newColumnListItem.addCell(oControl);
				oTable.addColumn(new sap.m.Column({
					header: new sap.m.Label({text: "Функция"}),// [3]
					minScreenWidth: "500px",
					demandPopin: true,
				}));
				
				oControl = new sap.m.Text({
					text:"{TestComment}"
				});
				newColumnListItem.addCell(oControl);
				oTable.addColumn(new sap.m.Column({
					header: new sap.m.Label({text: "Комментарий"}),//[4]
					minScreenWidth: "500px",
					demandPopin: true,
				}));
				
				oControl = new sap.m.Text({
					text:"{WikiLink}"
				});
				newColumnListItem.addCell(oControl);
				oTable.addColumn(new sap.m.Column({
					header: new sap.m.Label({text: "Ссылка на WIKI"}),//[5]
					minScreenWidth: "500px",
					demandPopin: true,
				}));
						    
			var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
		    	 useBatch: false,
		    	 defaultUpdateMethod: "Put"
		    	 });
			oModel.setSizeLimit(500);
			oTable.setModel(oModel);
		
			var oFilter = new sap.ui.model.Filter("StatusCode", sap.ui.model.FilterOperator.EQ, '10');

			oTable.bindItems("/Query_registrySet",oTable.getBindingInfo("items").template,undefined, oFilter);
			oTable.placeAt("content");
			
			
			/***** Update Request  *****/
			
			function openUpdateDialog(Trkorr){ 
				var oUpdateDialog = new sap.m.Dialog({
					stretchOnPhone:true,
					title: "Редактирование запроса в релизе " + Trkorr[0].getText() ////.Trkorr
				});
				
				var oComboBox = new sap.m.ComboBox({
					value: Trkorr[3].getText()//.ReqFunction
				});				
				oComboBox.setModel(oModel);

				var itemTemplate = new sap.ui.core.ListItem({
					key: "{Code}",
					text: "{Name}",
				});
				
				oComboBox.bindItems("/Function_releasesSet", itemTemplate);
				var TuskNumber1 = Trkorr[1].getText().split("-");
				var Description1 = Trkorr[1].getText().split(":");
				var oSimpleForm = new sap.ui.layout.form.SimpleForm({
					width: "100%",
					content:[
								new sap.m.Label({text:"Номер запроса", }),
								new sap.m.Text({
									text: Trkorr[0].getText(),//.Trkorr,
								}),
								
								new sap.m.Label({text:"Задача", }),
								new sap.m.Text({
									text: TuskNumber1[0],//.getText(),//Trkorr[1].getText()//.TuskNumber, 
								}),
																						
								new sap.m.Label({text:"Описание", }),
								new sap.m.TextArea({
									value: Description1[1],//.getText(),
									required: true,
								}),
								  
								new sap.m.Label({text:"Комментарий", }),
								new sap.m.TextArea({
									required: true,
									value:  Trkorr[4].getText(),
								}),  
								
								new sap.m.Label({text:"Ссылка на WIKI", }),
								new sap.m.TextArea({
									required: true,
									value:  Trkorr[5].getText(),
								}),
								
								new sap.m.Label({text:"Функция", }),
								oComboBox.setRequired(true),
								

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
							oEntry.Trkorr = Trkorr[0].getText();
							oEntry.Description = content[5].getValue();
							oEntry.TestComment = content[7].getValue();
							oEntry.WikiLink = content[9].getValue();
							oEntry.ReqFunction = content[11].getValue();
						
							var BusyDialog = new sap.m.BusyDialog({
								text: "Сохранение..."
							})
							BusyDialog.open();
							sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')", oEntry, {
								success: function(oData, response){
									var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
								    	 useBatch: false,
								    	 defaultUpdateMethod: "Put"
								    	 });
									oModel.setSizeLimit(500);
									oTable.setModel(oModel);
									oUpdateDialog.close();
									EnabledButton();
									BusyDialog.close();
								},
								error: function(){
									oUpdateDialog.close();
									BusyDialog.close();
									jQuery.sap.require("sap.m.MessageBox");
									sap.m.MessageBox.error("Ошибка при сохранении изменений!", {
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
			
			function EnabledButton(){
				 editButton.setEnabled(false);
				 ReleaseForm.setEnabled(false);
			 }

							
	    return oTable;					
	},
});