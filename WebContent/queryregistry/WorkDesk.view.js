  sap.ui.jsview("queryregistry.WorkDesk", {

  /**
   * Specifies the Controller belonging to this View. In the case that it is
   * not implemented, or that "null" is returned, this View does not have a
   * Controller.
   *
   * @memberOf queryregistry.WorkDesk
   */
  getControllerName : function() {
    return "queryregistry.WorkDesk";
  },

  /**
   * Is initially called once after the Controller has been instantiated. It
   * is the place where the UI is constructed. Since the Controller is given
   * to this method, its event handlers can be attached right away.
   *
   * @memberOf queryregistry.WorkDesk
   */
  createContent : function(oController) {

    busyDialogLoad = new sap.m.BusyDialog({
      text: "Загрузка данных...",
            showCancelButton : false
            });

    jQuery.sap.require("jquery.sap.storage");
    this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
    var sLogin = this.oStorage.get("ID");
        var link    = this.oStorage.get("IDSystemLink");

    var CheckRole = "";
    var oModelUsers = new sap.ui.model.odata.ODataModel(link,false);

// oModelUsers.setUseBatch(false);
// oModelUsers.setSizeLimit(500);
    sap.ui.getCore().setModel(oModelUsers);
    
     oModelUsers.callFunction("CheckRole", // function import name
        "POST", // http method
        {"Login" : sLogin }, // function import parameters
        null,
        function(oData, response) {
          CheckRole = oData.Check;
          this.oStorage.put("IDCheck", CheckRole);
        }, // callback function for success
        function(oError){
          jQuery.sap.require("sap.m.MessageBox");
      sap.m.MessageBox.error("Произошла ошибка при получении роли доступа!", {
          title: "Ошибка"});
        } ); // callback function for error


      var breadCrumbs = new sap.m.Breadcrumbs("breadCrumbsId", {
        links: [
            new sap.m.Link({text:"Каталог",
          target: "base_page",
          press: function(oControlEvent){
            var targetId = oControlEvent.getSource().getTarget();
          oController.removeLinks(targetId);
            splitApp.toMaster(targetId);
            splitApp.toDetail("defaultPage");
          }}) ]
      });

    var splitApp = new sap.m.SplitApp("workDeskSplitApp", {mode : sap.m.SplitAppMode.ShowHideMode,
      backgroundColor: "#f2f2f2",
// sap.m.SplitAppMode.ShowHideMode,
      masterNavigate: function(oEvent){
        var params = oEvent.getParameters();
        var links = breadCrumbs.getLinks();
        if(params.direction == "back"){
          var linkIndex = oController.indexOfByTarget(links, params.fromId);
          breadCrumbs.removeLink(links[linkIndex]);
        }
        else
        {
          var linkIndex = oController.indexOfByTarget(links, params.toId);
          if(linkIndex < 0){
            breadCrumbs.addLink(new sap.m.Link({/* text:params.to.getTitle(), */target: params.toId,
              press: function(oControlEvent){
                var targetId = oControlEvent.getSource().getTarget();
                oController.removeLinks(targetId);
                  splitApp.toMaster(targetId);
                }})
            );
          }
        }
      }});

    var list = new sap.m.List({
      inset : false,
      });

      list.addItem(oController.navigationItemTemplate("Реестр (DE)", "registry_de"));
      list.addItem(oController.navigationItemTemplate("Релизы", "release"));
      list.addItem(oController.navigationItemTemplate("Отчётность", "analitic"));
      
      if (CheckRole == "true" ){ 
      list.addItem(oController.navigationItemTemplate("Справочники", "catalog"));
      
      list.addItem(oController.navigationItemTemplate("Безопасность", "security"));
      }
      splitApp.addMasterPage(oController.page("base_page", list));

      window.devDE;
      window.testDE;
      window.beforeProdDE;
      window.prodDE;
      window.releaseHistory;
      window.newRelease;
      window.sapRole;
      window.sapTransaction;
      window.sapRequestType;
      window.sapReleaseFunction;
      window.idErJ;
      window.archiveDE;
      window.accessRole;
      window.users;
      
      list = new sap.m.List({
        inset : false,
        id:"listServer",
        headerToolbar: new sap.m.Toolbar({
        	content: [ new sap.m.SearchField( 	
        			{
        				placeholder: "Поиск запроса...",
        				search: function(oEvent){
							sap.ui.controller("queryregistry.WorkDesk").search(oEvent);
						}
        			}) ],
        }),
// includeItemInSelection: true,
        itemPress: function(oEvent){
        oController.pressItem(oEvent);
          var oBindingContext = oEvent.getParameters().listItem;
          var NameItem = oBindingContext.getTitle();
          var regular = /([^\(]*)\((.*)\)/g;
          var nameCategory = regular .exec(NameItem);
          for(var key in sap.ui.Device.system){
            if(sap.ui.Device.system[key] == true ){
              var device = key;
            }
          }

          switch(nameCategory[1]){

          case 'DE0 ':

            if (typeof(devDE)=="undefined" ){


              switch(device){

              case 'phone':
                busyDialogLoad.open();
                  devDE = new sap.ui.view({id: "devDE", viewName: "queryregistry.Mobile_version.DevelopDeMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(devDE);
                splitApp.toDetail(devDE);
                busyDialogLoad.close();
                break;


              default :
                busyDialogLoad.open();
                  devDE = new sap.ui.view({id: "devDE", viewName: "queryregistry.Registry.DevelopDe", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(devDE);
                splitApp.toDetail(devDE);
                busyDialogLoad.close();
              }

            }
            else{
            	splitApp.toDetail(devDE);
              var oTable = sap.ui.getCore().byId('idNew');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            
            }
            break;
                        
          case 'DET ':

            if (typeof(testDE)=="undefined" ){


              switch(device){

              case 'phone':
                 busyDialogLoad.open();
                 testDE = sap.ui.view({id: "testDE", viewName: "queryregistry.Mobile_version.TestDeMobile", type: sap.ui.core.mvc.ViewType.JS});
                 splitApp.addDetailPage(testDE);
                 splitApp.toDetail(testDE);
                 busyDialogLoad.close();
                break;


              default :
                busyDialogLoad.open();
                testDE = sap.ui.view({id: "testDE", viewName: "queryregistry.Registry.TestDe", type: sap.ui.core.mvc.ViewType.JS});
                splitApp.addDetailPage(testDE);
                splitApp.toDetail(testDE);
                busyDialogLoad.close();
              }

            }
            else{
            	splitApp.toDetail(testDE);
              var oTable = sap.ui.getCore().byId('idT');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            
            }
            break;


          case 'DEQ ':
            
            ///////////////////13.09.2017.......
            if (typeof(beforeProdDE)=="undefined" ){
              switch(device){
              case 'phone':
                 busyDialogLoad.open();
                 beforeProdDE = sap.ui.view({id: "beforeProdDE", viewName: "queryregistry.Mobile_version.BeforeMobile", type: sap.ui.core.mvc.ViewType.JS});
                 splitApp.addDetailPage(beforeProdDE);                         //ProdDe ^
                 splitApp.toDetail(beforeProdDE);
                 busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                beforeProdDE = sap.ui.view({id: "beforeProdDE", viewName: "queryregistry.Registry.BeforeProdDe", type: sap.ui.core.mvc.ViewType.JS});
                splitApp.addDetailPage(beforeProdDE);
                splitApp.toDetail(beforeProdDE);
                busyDialogLoad.close();
              }
            }
            else{
            	splitApp.toDetail(beforeProdDE);
              var oTable = sap.ui.getCore().byId('idBP1');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);      
            }
            break;
             /////////////13.09.2017
          case 'DE1 ' :
             if (typeof(prodDE)=="undefined" ){
                switch(device){
                case 'phone':
                   busyDialogLoad.open();
                   prodDE = sap.ui.view({id: "prodDE", viewName: "queryregistry.Mobile_version.ProdDeMobile", type: sap.ui.core.mvc.ViewType.JS});
                   splitApp.addDetailPage(prodDE);
                   splitApp.toDetail(prodDE);
                   busyDialogLoad.close();
                  break;
                default :
                  busyDialogLoad.open();
                  prodDE = sap.ui.view({id: "prodDE", viewName: "queryregistry.Registry.ProdDe", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(prodDE);
                  splitApp.toDetail(prodDE);
                  busyDialogLoad.close();
                }
              }
              else{
            	  splitApp.toDetail(prodDE);
                var oTable = sap.ui.getCore().byId('idP1');
                  var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                     useBatch: false,
                     defaultUpdateMethod: "Put"
                     });
                  oModel.setSizeLimit(500);
                  sap.ui.getCore().setModel(oModel);
                  oTable.setModel(oModel);      
              }
              break;
          case 'Журнал ошибок ' :
            if (typeof(journalDE)=="undefined" ){


              switch(device){

              case 'phone':
                busyDialogLoad.open();
                journalDE = new sap.ui.view({id: "journalDE", viewName: "queryregistry.Mobile_version.JournalDeMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(journalDE);
                splitApp.toDetail(journalDE);
                busyDialogLoad.close();
                break;


              default :
                busyDialogLoad.open();
                  journalDE = new sap.ui.view({id: "journalDE", viewName: "queryregistry.Registry.JournalDe", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(journalDE);
                splitApp.toDetail(journalDE);
                busyDialogLoad.close();
              }

            }
            else{
              var oTable = sap.ui.getCore().byId('idErJ');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;

          case 'Архив ' :
            if (typeof(archiveDE)=="undefined" ){
              switch(device){
              case 'phone':
                busyDialogLoad.open();
                archiveDE = new sap.ui.view({id: "archiveDE", viewName: "queryregistry.Mobile_version.ArchiveDeMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(archiveDE);
                splitApp.toDetail(archiveDE);
                busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                archiveDE = new sap.ui.view({id: "archiveDE", viewName: "queryregistry.Registry.ArchiveDe", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(archiveDE);
                splitApp.toDetail(archiveDE);
                busyDialogLoad.close();
              }
            }
            else{
              var oTable = sap.ui.getCore().byId('idArch');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;
             }
          }
          });
      
      var aFltDET = [new sap.ui.model.Filter({
    	  path: "StatusCode",
    		operator: sap.ui.model.FilterOperator.EQ,
    		value1: '02'
  	}),
  ];
      
      var aFltDETT = [new sap.ui.model.Filter({
    	  path: "StatusCode",
    		operator: sap.ui.model.FilterOperator.EQ,
    		value1: '03'
  	}),
  ];
      
     /* ("/Query_registrySet", undefined,
			    undefined, [ oFilterInTest ]);*/
      var oJsonModel = new sap.ui.model.json.JSONModel();
      var oModel =  new sap.ui.model.odata.ODataModel(link,false);
      oModel.read("/Query_registrySet", {
    	  filters: aFltDET,
    	  async:false,
          success: function(oData, response) {
        	  oJsonModel.setData(oData);
           }
      });
      
      var oJsonModelT = new sap.ui.model.json.JSONModel();
      oModel.read("/Query_registrySet", {
    	  filters: aFltDETT,
    	  async:false,
          success: function(oData, response) {
        	  oJsonModelT.setData(oData);
           }
      });
	     
    var aFltDE1 = [new sap.ui.model.Filter({
  	  path: "StatusCode",
  		operator: sap.ui.model.FilterOperator.EQ,
  		value1: '08'
	}),
];
                     
      var oJsonModelDE1 = new sap.ui.model.json.JSONModel();
      oModel.read("/Query_registrySet", {
    	  filters: aFltDE1,
    	  async:false,
          success: function(oData, response) {
        	  oJsonModelDE1.setData(oData);
           }
      });
      
      var aFltDE11 = [new sap.ui.model.Filter({
      	  path: "StatusCode",
      		operator: sap.ui.model.FilterOperator.EQ,
      		value1: '09'
    	}),
    ];
                         
          var oJsonModelDE11 = new sap.ui.model.json.JSONModel();
          oModel.read("/Query_registrySet", {
        	  filters: aFltDE11,
        	  async:false,
              success: function(oData, response) {
            	  oJsonModelDE11.setData(oData);
               }
          });
      
      var aFltDE0 = [new sap.ui.model.Filter({
      	  path: "StatusCode",
      		operator: sap.ui.model.FilterOperator.EQ,
      		value1: '01'
    	}),
    ];
                         
          var oJsonModelDE0 = new sap.ui.model.json.JSONModel();
          oModel.read("/Query_registrySet", {
        	  filters: aFltDE0,
        	  async:false,
              success: function(oData, response) {
            	  oJsonModelDE0.setData(oData);
               }
          });
          
          var aFltJournal = [new sap.ui.model.Filter({
          	  path: "StatusCode",
          		operator: sap.ui.model.FilterOperator.EQ,
          		value1: '11'
        	}),
        ];
                             
              var oJsonModelJournal = new sap.ui.model.json.JSONModel();
              oModel.read("/Query_registrySet", {
            	  filters: aFltJournal,
            	  async:false,
                  success: function(oData, response) {
                	  oJsonModelJournal.setData(oData);
                   }
              });
              
              
              var aFltArchive = [new sap.ui.model.Filter({
              	  path: "StatusCode",
              		operator: sap.ui.model.FilterOperator.EQ,
              		value1: '12'
            	}),
            ];
                                 
                  var oJsonModelArchive = new sap.ui.model.json.JSONModel();
                  oModel.read("/Query_registrySet", {
                	  filters: aFltArchive,
                	  async:false,
                      success: function(oData, response) {
                    	  oJsonModelArchive.setData(oData);
                       }
                  });
                  
                  var aFltDEQ = [new sap.ui.model.Filter({
                  	  path: "StatusCode",
                  		operator: sap.ui.model.FilterOperator.EQ,
                  		value1: '05'
                	}),
                ];
                                     
                      var oJsonModelDEQ = new sap.ui.model.json.JSONModel();
                      oModel.read("/Query_registrySet", {
                    	  filters: aFltDEQ,
                    	  async:false,
                          success: function(oData, response) {
                        	  oJsonModelDEQ.setData(oData);
                           }
                      });
                      
                      var aFltDEQQ = [new sap.ui.model.Filter({
                      	  path: "StatusCode",
                      		operator: sap.ui.model.FilterOperator.EQ,
                      		value1: '06'
                    	}),
                    ];
                                         
                          var oJsonModelDEQQ = new sap.ui.model.json.JSONModel();
                          oModel.read("/Query_registrySet", {
                        	  filters: aFltDEQQ,
                        	  async:false,
                              success: function(oData, response) {
                            	  oJsonModelDEQQ.setData(oData);
                               }
                          });
        	      	  
	  var listNotBlockedobj=[];
	  if(oJsonModelJournal.oData.results.length>0){
		  oJsonModelJournal.oData.results.forEach(function(item, i, parseListModel){
				if(item.Icon==""){
					listNotBlockedobj.push(item);
				} 
		  });
	  }
		  
	  
      list.addItem(oController.itemTemplate("DE0 "+"("+oJsonModelDE0.oData.results.length+")", "devDE"));
      list.addItem(oController.itemTemplate("DET "+"("+oJsonModel.oData.results.length+" / "+oJsonModelT.oData.results.length+")", "testDE"));
      list.addItem(oController.itemTemplate("DEQ "+"("+oJsonModelDEQ.oData.results.length+" / "+oJsonModelDEQQ.oData.results.length+")",  "beforeProdDE"));
      list.addItem(oController.itemTemplate("DE1 "+"("+oJsonModelDE1.oData.results.length+" / "+oJsonModelDE11.oData.results.length+")", "prodDE"));
      list.addItem(oController.itemTemplate("Журнал ошибок "+"("+listNotBlockedobj.length+")", "journalDE"));
      list.addItem(oController.itemTemplate("Архив "+"("+oJsonModelArchive.oData.results.length+")", "archiveDE"));
//      list.addItem(new sap.m.SearchField());
      splitApp.addMasterPage(oController.navigatePage("registry_de", "Реестр (DE)", list, "base_page"));
      //Конец---Раздел "Реестры"---------------

      //Начало---Раздел "Разделы"---------------

      //-Раздел "Релизы"---------------


// var releaseHistory = sap.ui.view({id: "releaseHistory", viewName:
// "queryregistry.Section.ReleaseHistory", type: sap.ui.core.mvc.ViewType.JS});
// var newRelease = sap.ui.view({id: "newRelease", viewName:
// "queryregistry.Section.NewRelease", type: sap.ui.core.mvc.ViewType.JS});

      list = new sap.m.List({
        inset : false,
        itemPress: function(oEvent){
        	
          var oBindingContext = oEvent.getParameters().listItem;
          var NameItem = oBindingContext.getTitle();

          for(var key in sap.ui.Device.system){
            if(sap.ui.Device.system[key] == true ){
              var device = key;
            }
          }

          switch(NameItem){

          case 'История':


            if (typeof(releaseHistory)=="undefined" ){


              switch(device){

              case 'phone':
                busyDialogLoad.open();
                releaseHistory = new sap.ui.view({id: "releaseHistory", viewName: "queryregistry.SM.ReleaseHistoryMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(releaseHistory);
                splitApp.toDetail(releaseHistory);
                busyDialogLoad.close();
                break;


              default :
                busyDialogLoad.open();
                releaseHistory = new sap.ui.view({id: "releaseHistory", viewName: "queryregistry.Section.ReleaseHistory", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(releaseHistory);
                splitApp.toDetail(releaseHistory);
                busyDialogLoad.close();
              }

            }
            else{
              var oTable = sap.ui.getCore().byId('idHR');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            
            }
            break;

          case 'Новый релиз':
            if (typeof(newRelease)=="undefined" ){


              switch(device){

              case 'phone':
                busyDialogLoad.open();
                newRelease = new sap.ui.view({id: "newRelease", viewName: "queryregistry.SM.NewReleaseMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(newRelease);
                splitApp.toDetail(newRelease);
                busyDialogLoad.close();
                break;


              default :
                busyDialogLoad.open();
                newRelease = new sap.ui.view({id: "newRelease", viewName: "queryregistry.Section.NewRelease", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(newRelease);
                splitApp.toDetail(newRelease);
                busyDialogLoad.close();
              }

            }
            else{
              var oTable = sap.ui.getCore().byId('idNR');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            
            }
            break;
          }
        }
        });
      list.addItem(oController.itemTemplate("История", "releaseHistory"));
      if (CheckRole == "true" ){
      list.addItem(oController.itemTemplate("Новый релиз", "newRelease"));}
      splitApp.addMasterPage(oController.navigatePage("release", "Релизы", list, "base_page"));


// var sapRole = sap.ui.view({id: "sapRole", viewName:
// "queryregistry.Section.SapRole", type: sap.ui.core.mvc.ViewType.JS});
// var sapTransaction = sap.ui.view({id: "sapTransaction", viewName:
// "queryregistry.Section.SapTransaction", type: sap.ui.core.mvc.ViewType.JS});
// var sapRequestType = sap.ui.view({id: "sapRequestType", viewName:
// "queryregistry.Section.SapRequestType", type: sap.ui.core.mvc.ViewType.JS});
// var sapReleaseFunction = sap.ui.view({id: "sapReleaseFunction", viewName:
// "queryregistry.Section.SapReleaseFunction", type:
// sap.ui.core.mvc.ViewType.JS});

      list =  new sap.m.List({
        inset : false,
        itemPress: function(oEvent){

          var oBindingContext = oEvent.getParameters().listItem;
          var NameItem = oBindingContext.getTitle();

          for(var key in sap.ui.Device.system){
            if(sap.ui.Device.system[key] == true ){
              var device = key;
            }
          }

          switch(NameItem){

          case 'Роли SAP':
            if (typeof(sapRole)=="undefined" ){
              switch(device){
              case 'phone':
                busyDialogLoad.open();
                sapRole = new sap.ui.view({id: "sapRole", viewName: "queryregistry.SM.SapRoleMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapRole);
                splitApp.toDetail(sapRole);
                busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                sapRole = new sap.ui.view({id: "sapRole", viewName: "queryregistry.Section.SapRole", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapRole);
                splitApp.toDetail(sapRole);
                busyDialogLoad.close();
              }
            }
            else{
              var oTable = sap.ui.getCore().byId('idRoleDe');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;                    

          case 'Транзакции SAP':
            if (typeof(sapTransaction)=="undefined" ){
              switch(device){
              case 'phone':
                busyDialogLoad.open();
                sapTransaction = new sap.ui.view({id: "sapTransaction", viewName: "queryregistry.SM.SapTransactionMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapTransaction);
                splitApp.toDetail(sapTransaction);
                busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                sapTransaction = new sap.ui.view({id: "sapTransaction", viewName: "queryregistry.Section.SapTransaction", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapTransaction);
                splitApp.toDetail(sapTransaction);
                busyDialogLoad.close();
              }
            }
            else{
              var oTable = sap.ui.getCore().byId('idTransDe');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;


          case 'Типы запросов SAP':
            if (typeof(sapRequestType)=="undefined" ){
              switch(device){
              case 'phone':
                busyDialogLoad.open();
                sapRequestType = new sap.ui.view({id: "sapRequestType", viewName: "queryregistry.SM.SapRequestTypeMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapRequestType);
                splitApp.toDetail(sapRequestType);
                busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                sapRequestType = new sap.ui.view({id: "sapRequestType", viewName: "queryregistry.Section.SapRequestType", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapRequestType);
                splitApp.toDetail(sapRequestType);
                busyDialogLoad.close();
              }
            }
            else{
              var oTable = sap.ui.getCore().byId('idTransDe');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;

//            if (typeof(sapRequestType)=="undefined" ){
//              busyDialogLoad.open();
//              sapRequestType = sap.ui.view({id: "sapRequestType", viewName: "queryregistry.Section.SapRequestType", type: sap.ui.core.mvc.ViewType.JS});
//                splitApp.addDetailPage(sapRequestType);
//              splitApp.toDetail(sapRequestType);
//              busyDialogLoad.close();
//
//              }
//            else{
//              var oTable = sap.ui.getCore().byId('idTypeRequestDe');
//              var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//                   useBatch: false,
//                   defaultUpdateMethod: "Put"
//                   });
//               oModel.setSizeLimit(500);
//               sap.ui.getCore().setModel(oModel);
//               oTable.setModel(oModel);
//            }
//            break;

          case 'Функции в релизах SAP':
            if (typeof(sapReleaseFunction)=="undefined" ){
              switch(device){
              case 'phone':
                busyDialogLoad.open();
                sapReleaseFunction = new sap.ui.view({id: "sapReleaseFunction", viewName: "queryregistry.SM.SapReleaseFunctionMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapReleaseFunction);
                splitApp.toDetail(sapReleaseFunction);
                busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                sapReleaseFunction = new sap.ui.view({id: "sapReleaseFunction", viewName: "queryregistry.Section.SapReleaseFunction", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(sapReleaseFunction);
                splitApp.toDetail(sapReleaseFunction);
                busyDialogLoad.close();
              }
            }
            else{
              var oTable = sap.ui.getCore().byId('idReleaseFunctionDe');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;
          }
        }
      });

      list.addItem(oController.itemTemplate("Роли SAP", "sapRole"));
      list.addItem(oController.itemTemplate("Транзакции SAP", "sapTransaction"));
      list.addItem(oController.itemTemplate("Типы запросов SAP", "sapRequestType"));
      list.addItem(oController.itemTemplate("Функции в релизах SAP", "sapReleaseFunction"));
      splitApp.addMasterPage(oController.navigatePage("catalog", "Справочники", list, "base_page"));

// var accessRole = sap.ui.view({id: "accessRole", viewName:
// "queryregistry.Section.AccessRole", type: sap.ui.core.mvc.ViewType.JS});
// var users = sap.ui.view({id: "users", viewName:
// "queryregistry.Section.Users", type: sap.ui.core.mvc.ViewType.JS});
//
      list = new sap.m.List({
        inset : false,
        itemPress: function(oEvent){

          var oBindingContext = oEvent.getParameters().listItem;
          var NameItem = oBindingContext.getTitle();

          for(var key in sap.ui.Device.system){
            if(sap.ui.Device.system[key] == true ){
              var device = key;
            }
          }

          switch(NameItem){

          case 'Роли доступа':

            if (typeof(accessRole)=="undefined" ){
              switch(device){
              case 'phone':
                busyDialogLoad.open();
                accessRole = new sap.ui.view({id: "accessRole", viewName: "queryregistry.SM.AccessRoleMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(accessRole);
                splitApp.toDetail(accessRole);
                busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                accessRole = new sap.ui.view({id: "accessRole", viewName: "queryregistry.Section.AccessRole", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(accessRole);
                splitApp.toDetail(accessRole);
                busyDialogLoad.close();
              }
            }
            else{
              var oTable = sap.ui.getCore().byId('idAccessRoleDe');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;

          case 'Пользователи':
//Блок b1 для доступа к мобильной версии сервиса
            if (typeof(users)=="undefined" ){
              switch(device){
              case 'phone':
                busyDialogLoad.open();
                users = new sap.ui.view({id: "users", viewName: "queryregistry.SM.UsersMobile", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(users);
                splitApp.toDetail(users);
                busyDialogLoad.close();
                break;
              default :
                busyDialogLoad.open();
                users = new sap.ui.view({id: "users", viewName: "queryregistry.Section.Users", type: sap.ui.core.mvc.ViewType.JS});
                  splitApp.addDetailPage(users);
                splitApp.toDetail(users);
                busyDialogLoad.close();
              }
            }
            else{
              var oTable = sap.ui.getCore().byId('idUsersDe');
                var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
                   useBatch: false,
                   defaultUpdateMethod: "Put"
                   });
                oModel.setSizeLimit(500);
                sap.ui.getCore().setModel(oModel);
                oTable.setModel(oModel);
            }
            break;
//Конец блока b1 для доступа к мобильной весии сервиса
//3333 Пример аналогичного блока до адаптации к мобильной версии
//            if (typeof(users)=="undefined" ){
//              busyDialogLoad.open();
//              users = sap.ui.view({id: "users", viewName: "queryregistry.Section.Users", type: sap.ui.core.mvc.ViewType.JS});
//                splitApp.addDetailPage(users);
//              splitApp.toDetail(users);
//              busyDialogLoad.close();
//
//              }
//            else{
//              var oTable = sap.ui.getCore().byId('idUsersDe');
//                var oModel = new sap.ui.model.odata.v2.ODataModel(link,false);
//                oModel.setUseBatch(false);
//                oModel.setSizeLimit(500);
//                sap.ui.getCore().setModel(oModel);
//                oTable.setModel(oModel);
//            }
//            break;
//3333
          }
        }

      });
      list.addItem(oController.itemTemplate("Роли доступа", "accessRole"));
      list.addItem(oController.itemTemplate("Пользователи", "users"));
      splitApp.addMasterPage(oController.navigatePage("security", "Безопасность", list, "base_page"));

      //Конец----Раздел "Разделы"---------------

      //Конец---Наполнение раздела "каталог"


      //Старт---Наполнение раздела "Таблицы"

      //Разработка
      
      
      list = new sap.m.List({
          inset : false,
          itemPress: function(oEvent){

            var oBindingContext = oEvent.getParameters().listItem;
            var NameItem = oBindingContext.getTitle();

            for(var key in sap.ui.Device.system){
              if(sap.ui.Device.system[key] == true ){
                var device = key;
              }
            }

            switch(NameItem){

            case 'Статистика по сотрудникам':

              if (typeof(stat)=="undefined" ){
                switch(device){
//                case 'phone':
//                  busyDialogLoad.open();
//                  accessRole = new sap.ui.view({id: "accessRole", viewName: "queryregistry.SM.AccessRoleMobile", type: sap.ui.core.mvc.ViewType.JS});
//                    splitApp.addDetailPage(accessRole);
//                  splitApp.toDetail(accessRole);
//                  busyDialogLoad.close();
//                  break;
                default :
                  busyDialogLoad.open();
                  stat = new sap.ui.view({id: "Analitic", viewName: "queryregistry.Registry.Analitic", type: sap.ui.core.mvc.ViewType.JS});
                    splitApp.addDetailPage(stat);
                  splitApp.toDetail(stat);
                  busyDialogLoad.close();
                }
              }
              else{
//            	  stat.rerender();
            	  splitApp.toDetail(stat);
//                var oTable = sap.ui.getCore().byId('idStat');
//                  var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//                     useBatch: false,
//                     defaultUpdateMethod: "Put"
//                     });
//                  oModel.setSizeLimit(500);
//                  sap.ui.getCore().setModel(oModel);
//                  oTable.setModel(oModel);
              }
              break;

            case 'Общая статистика':

                if (typeof(Allstat)=="undefined" ){
                  switch(device){
//                  case 'phone':
//                    busyDialogLoad.open();
//                    accessRole = new sap.ui.view({id: "accessRole", viewName: "queryregistry.SM.AccessRoleMobile", type: sap.ui.core.mvc.ViewType.JS});
//                      splitApp.addDetailPage(accessRole);
//                    splitApp.toDetail(accessRole);
//                    busyDialogLoad.close();
//                    break;
                  default :
                    busyDialogLoad.open();
                  	Allstat = new sap.ui.view({id: "FullAnalitic", viewName: "queryregistry.Registry.FullAnalitic", type: sap.ui.core.mvc.ViewType.JS});
                      splitApp.addDetailPage(Allstat);
                    splitApp.toDetail(Allstat);
                    busyDialogLoad.close();
                  }
                }
                else{
//              	  stat.rerender();
              	  splitApp.toDetail(Allstat);
//                  var oTable = sap.ui.getCore().byId('idStat');
//                    var oModel = new sap.ui.model.odata.v2.ODataModel(link, {
//                       useBatch: false,
//                       defaultUpdateMethod: "Put"
//                       });
//                    oModel.setSizeLimit(500);
//                    sap.ui.getCore().setModel(oModel);
//                    oTable.setModel(oModel);
                }
                break;
  //3333
            }
          }

        });
      	list.addItem(oController.itemTemplate("Общая статистика", "AllStat"));
        list.addItem(oController.itemTemplate("Статистика по сотрудникам", "Stat"));
        splitApp.addMasterPage(oController.navigatePage("analitic", "Отчётность", list, "base_page"));



    var headerBar = new sap.m.Bar({
      enableFlexBox: true,
      contentRight: [new sap.m.Label({text: "Пользователь: "}),
                     new sap.m.Label({text: this.oStorage.get("IDName")}),
                     new sap.m.Link({text: "Выход", press: function(){oController.logoff();}})],
      design: sap.m.BarDesign.Header
    });

    var oImage = new sap.m.Image({
      src: "images/Migo_logo_main.png"
    }).addStyleClass("myMainLogo");

    var TextImage = new sap.m.Label({
      text: "Реестр транспортных запросов"
    })
    var defaultPage = new sap.m.Page("defaultPage", {
      showHeader:true,
      showSubHeader: false,
      backgroundDesign: sap.m.PageBackgroundDesign.List,
      customHeader: headerBar,
      content:
        oImage,
        TextImage

    }).addStyleClass("myPageBackgoundColor");

    splitApp.addDetailPage(defaultPage)


    var workPage = new sap.m.Page("work",
    {
      showSubHeader: false,
      showHeader: false,

      enableScrolling: false,
      content : [
// breadCrumbs,
            splitApp
                ]
    }).addStyleClass("myPageBackgoundColor");

    workPage.addStyleClass("sapUiBody");


    return workPage;
  }

});