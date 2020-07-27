sap.ui.controller("queryregistry.Registry.FullAnalitic", {

	onInit : function() {

		// jQuery.sap.require("jquery.sap.storage");
		// this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		// var link = this.oStorage.get("IDSystemLink");
		//
		// var oModel = new sap.ui.model.odata.v2.ODataModel(link, false);
		// sap.ui.getCore().setModel(oModel);

		// var MBox = sap.ui.getCore().byId("MBox");
		// MBox.setModel(oModel);
		// MBox.bindItems({
		// path : "/PersInfoSet",
		// template : new sap.ui.core.ListItem({
		// key : "{Uname}",
		// text : "{FullName}",
		// }),
		// });
		//
		// MBox.attachSelectionFinish(function(oControlEvent) {
		// var arrayPersEmail = [];
		// var items = MBox.getSelectedKeys();
		// // if (items !== null) {
		// // sap.ui.getCore().byId("DRS4")
		// // .setDateValue(null);
		// // sap.ui.getCore().byId("DRS4")
		// // .setSecondDateValue(null)
		// // }
		//
		// })
	},

	createTable : function(tableId, oController, view, typeTable) {

		jQuery.sap.require("jquery.sap.storage");
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		var link = this.oStorage.get("IDSystemLink");

		var DRS3 = sap.ui.getCore().byId("DRS3");
		var DRS4 = sap.ui.getCore().byId("DRS4");

		jQuery.sap.require("sap.ui.core.format.DateFormat");

		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern : "dd.MM.yyyy"
		});

		var title = oDateFormat.format(DRS3.getDateValue()) + ' - '
				+ oDateFormat.format(DRS3.getSecondDateValue());

		if (DRS3.getDateValue() === null) {
			title = "За всё время";
		}

		var title_1 = oDateFormat.format(DRS4.getDateValue()) + ' - '
				+ oDateFormat.format(DRS4.getSecondDateValue());

		if (DRS4.getDateValue() === null) {
			title_1 = "За всё время";
		}


		var oflex = sap.ui.getCore().byId(tableId);

		if (typeof (oflex) == "undefined") {

			// if (DRS3.getDateValue() !== null) {
			var flex = new sap.ui.layout.HorizontalLayout({
				id : tableId,
				width: "100%",
				content : [ new sap.viz.ui5.controls.Popover({
					width : "50%",
					id : "idPopOver_1"
				}), new sap.viz.ui5.controls.VizFrame({
					id : "idVizFrame_1",
					uiConfig : {
						'applicationSet' : 'fiori',
						'showErrorMessage' : true
					},
					vizType : 'donut',
				}),

				new sap.m.Label({
//					text : "Сравнение",
					labelFor: "idPopOver_2",
					width : "10%"
				// visible: false
				}),

				new sap.viz.ui5.controls.Popover({
					width : "50%",
					id : "idPopOver_2"
				}), new sap.viz.ui5.controls.VizFrame({
					id : "idVizFrame_2",
					uiConfig : {
						'applicationSet' : 'fiori',
						'showErrorMessage' : true
					},
					vizType : 'donut',
				}), ]
			})

			var oVizFrame_1 = this.oVizFrame_1 = flex.getContent()[1];

			oVizFrame_1.setDataset(new sap.viz.ui5.data.FlattenedDataset({
				dimensions : [ new sap.viz.ui5.data.DimensionDefinition({
					name : "Text",
					value : "{Text}"
				}) ],
				measures : [ new sap.viz.ui5.data.MeasureDefinition({
					name : "Value",
					value : "{Value}"
				}) ]
			}));

			oVizFrame_1.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem(
					{
						uid : "size",
						type : "Measure",
						values : [ "Value" ]
					}));

			oVizFrame_1.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem(
					{
						uid : "color",
						type : "Dimension",
						values : [ "Text" ]
					}));

			this.oVizFrame_1.setVizProperties({
				plotArea : {
					dataLabel : {
						visible : true,
						type : 'value',
						style : {
							fontSize : '20px'
						}
					}
				},
				title : {
					// visible : false,
					text : title,
				},
				legend : {
					label : {
						style : {
							fontSize : '10px'
						}
					}
				},
				interaction : {
				// noninteractiveMode : true
				}
			});

			var oVizFrame_2 = this.oVizFrame_2 = flex.getContent()[4];

			oVizFrame_2.setDataset(new sap.viz.ui5.data.FlattenedDataset({
				dimensions : [ new sap.viz.ui5.data.DimensionDefinition({
					name : "Text",
					value : "{Text}"
				}) ],
				measures : [ new sap.viz.ui5.data.MeasureDefinition({
					name : "Value",
					value : "{Value}"
				}) ]
			}));

			oVizFrame_2.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem(
					{
						uid : "size",
						type : "Measure",
						values : [ "Value" ]
					}));

			oVizFrame_2.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem(
					{
						uid : "color",
						type : "Dimension",
						values : [ "Text" ]
					}));

			this.oVizFrame_2.setVizProperties({
				plotArea : {
					dataLabel : {
						visible : true,
						type : 'value',
						style : {
							fontSize : '20px'
						}
					}
				},
				title : {
					text : title_1
				// visible : false,
				},
				legend : {
					label : {
						style : {
							fontSize : '10px'
						}
					}
				},
				interaction : {
				// noninteractiveMode : true
				}
			});

		} else {
			flex = oflex;
//			flex.
		}
		// }

		var oVizFrame_1 = this.oVizFrame_1 = flex.getContent()[1];
		var oVizFrame_2 = this.oVizFrame_2 = flex.getContent()[4];
		
		this.oVizFrame_1.setVizProperties({
			plotArea : {
				dataLabel : {
					visible : true,
					type : 'value',
					style : {
						fontSize : '20px'
					}
				}
			},
			title : {
				text : title
			// visible : false,
			},
			legend : {
				label : {
					style : {
						fontSize : '10px'
					}
				}
			},
			interaction : {
			// noninteractiveMode : true
			}
		});
		
		this.oVizFrame_2.setVizProperties({
			plotArea : {
				dataLabel : {
					visible : true,
					type : 'value',
					style : {
						fontSize : '20px'
					}
				}
			},
			title : {
				text : title_1
			// visible : false,
			},
			legend : {
				label : {
					style : {
						fontSize : '10px'
					}
				}
			},
			interaction : {
			// noninteractiveMode : true
			}
		});
		var DRS3 = sap.ui.getCore().byId("DRS3");
		var DRS4 = sap.ui.getCore().byId("DRS4");

		var oFilterDate1 = new sap.ui.model.Filter("Createdate1",
				sap.ui.model.FilterOperator.EQ, DRS3.getDateValue());
		var oFilterDate2 = new sap.ui.model.Filter("Enddate1",
				sap.ui.model.FilterOperator.EQ, DRS3.getSecondDateValue());

		var oFilterDate3 = new sap.ui.model.Filter("Createdate2",
				sap.ui.model.FilterOperator.EQ, DRS4.getDateValue());
		var oFilterDate4 = new sap.ui.model.Filter("Enddate2",
				sap.ui.model.FilterOperator.EQ, DRS4.getSecondDateValue());

		var oModel = new sap.ui.model.odata.v2.ODataModel(link, false);
		sap.ui.getCore().setModel(oModel);

		oVizFrame_1.getDataset().setModel(oModel);
		oModel.attachRequestCompleted(function(oEvent) {
			busyDialogLoad.close()
		});

		oVizFrame_1.getDataset().bindData("/SummSet", undefined, undefined,
				[ oFilterDate1, oFilterDate2, oFilterDate3, oFilterDate4 ]);

		oVizFrame_2.getDataset().setModel(oModel);
		oVizFrame_2.getDataset().bindData("/SummChSet", undefined, undefined,
				[ oFilterDate1, oFilterDate2, oFilterDate3, oFilterDate4 ]);

		var oPopOver_1 = flex.getContent()[0];
//		flex.getContent()[2].toStatic();
		var oPopOver_2 = flex.getContent()[3];
		oPopOver_1.connect(oVizFrame_1.getVizUid());
		oPopOver_2.connect(oVizFrame_2.getVizUid());

		this.getView().getContent()[0].addContent(flex);
		this.getView().rerender();

	}

});