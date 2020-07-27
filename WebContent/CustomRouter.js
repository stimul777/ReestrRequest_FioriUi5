//jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
//jQuery.sap.require("sap.ui.core.routing.Router");
//jQuery.sap.declare("queryregistry.CustomRouter"); 
//
//sap.ui.core.routing.Router.extend("queryregistry.CustomRouter", {
//	
//	constructor : function() {
//		sap.ui.core.routing.Router.apply(this, arguments);
//		this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
//	},
//	myNavBack : function(sRoute, mData) {
//		var oHistory = sap.ui.core.routing.History.getInstance();
//		var sPreviousHash = oHistory.getPreviousHash();
//
//		// The history contains a previous entry
//		if (sPreviousHash !== undefined) {
//			window.history.go(-1);
//		} else {
//			var bReplace = true; // otherwise we go backwards with a forward history
//			this.navTo(sRoute, mData, bReplace);
//		}
//	},
//	destroy : function() {
//		sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
//		this._oRouteMatchedHandler.destroy();
//	},
//});