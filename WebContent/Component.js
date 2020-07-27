jQuery.sap.declare("queryregistry.Component");
jQuery.sap.includeStyleSheet("css/style.css");
jQuery.sap.includeScript("libs/moments.js");

sap.ui.core.UIComponent.extend("queryregistry.Component", {
	metadata : {
		// includes: [ "/libs/moments.js" ],
		routing : {
			config : {
				routerClass : queryregistry.CustomRouter,
				viewType : "JS",
				viewPath : "queryregistry",
				targetControl : "NavContainer",
				clearTarget : false
			},
			routes : [ {
				pattern : "",
				name : "workdesk",
				view : "WorkDesk",
				viewPath : "queryregistry",
				targetAggregation : "pages"
			}, ]
		}
	},
	init : function() {

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("/sap/bc/ui2/start_up", null, false); // делаем запрос синхронным
		var sLogin = "";
		sLogin = oModel.getProperty("/id");
		sUser = oModel.getProperty("/fullName");

		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		this.oStorage.put("ID", sLogin);
		this.oStorage.put("IDName", sUser);

		link = "/sap/opu/odata/sap/zquery_registry_final_srv/";
		this.oStorage.put("IDSystemLink", link);

		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		this.getRouter().initialize();
	},

	createContent : function() {
		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "queryregistry.App",
			type : "JS",
		});

		return oView;
	}
});