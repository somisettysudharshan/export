sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
],
function (Controller,MessageToast,JSONModel,MessageBox) {
    "use strict";

    return Controller.extend("practice.controller.View1", {


        onInit:function(oEvent) {
            // set data model on view
            const oData = {
               recipient : {
                  name : "World"
               }
            };
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
         },


        // onInit :function(oEvent) {
		// 	this.getView().setModel(new JSONModel({
		// 			features: [
		// 				"Enterprise-Ready Web Toolkit",
		// 				"Powerful Development Concepts",
		// 				"Feature-Rich UI Controls",
		// 				"Consistent User Experience",
		// 				"Free and Open Source",
		// 				"Responsive Across Browsers and Devices"
		// 			]
		// 		})
		// 	);
		// },

		onChange :function(oEvent) {
			const bState = oEvent.getParameter("state");
			this.byId("ready").setVisible(bState);
		},
        onPress :function(oEvent){
            MessageToast.show("Hello UI5!");
        },
        onConfirmationMessageBoxPress: function () {
			MessageBox.confirm("Approve purchase order 12345?");
		},
        onShowHello:function(oEvent) {
            // show a native JavaScript alert
            alert("Hello World");
         },
         onShowHello1:function() {
            MessageToast.show("Hello World");
         }
         








        // handleMessageToastPress: function(oEvent) {
		// 	var msg = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.';
		// 	MessageToast.show(msg);
		// }

// press() {
// 			MessageToast.show("Hello World!");
// 		}
// 	}).placeAt("content");


//         handleFilterButtonPressed: function () {
//             this.getViewSettingsDialog("ux.zanalytics.view.FilterDialog")
//                 .then(function (oViewSettingsDialog) {
//                     oViewSettingsDialog.open();
//                 });
//         },
    });
});
