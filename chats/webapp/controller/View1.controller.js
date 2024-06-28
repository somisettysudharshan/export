sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "chats/util/Formatter",
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format'
],
function (Controller,Formatter,BindingMode,JSONModel,ChartFormatter,Format) {
    "use strict";

    return Controller.extend("chats.controller.View1", {
        Formatter: Formatter,
        onInit: function () {
            var that = this;
            var oModel = new sap.ui.model.odata.v2.ODataModel("https://services.odata.org/V3/Northwind/Northwind.svc/");
            // @ts-ignore
            this.getView().setModel(oModel);

            this._mViewSettingsDialogs = {}; 

        },
        onApplyFilter: function() {
            var oChart = this.getView().byId("barChart");
            var oModel = oChart.getModel();
        
            var oBinding = oChart.getBinding("data");
            var oFilter = new sap.ui.model.Filter({
                path: "OrderDate",
                operator: "BT",
                value1: this.getView().byId("fromDatePicker").getValue(),
                value2: this.getView().byId("toDatePicker").getValue()
            });
        
            oBinding.filter(oFilter);
        }
    });
});
