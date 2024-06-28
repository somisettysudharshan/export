sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller,Filter,FilterOperator) {
    "use strict";

    return Controller.extend("ui5chartsfilter.controller.View1", {
        onInit: function () {
            var that = this;
            var sServiceUrl = "/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/";

            var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
            // @ts-ignore
            this.getView().setModel(oModel);

            this._mViewSettingsDialogs = {};    

        },
        onApplyFilter1: function() {
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
        },
        onApplyFilter: function () {
            var oView = this.getView();
            var oStartDate = oView.byId("fromDatePicker").getDateValue();
            var oEndDate = oView.byId("toDatePicker").getDateValue();

            if (oStartDate && oEndDate) {
                var oFilter = new Filter({
                    filters: [
                        new Filter("OrderDate", FilterOperator.GE, oStartDate),
                        new Filter("OrderDate", FilterOperator.LE, oEndDate)
                    ],
                    and: true
                });

                var oVizFrame = oView.byId("barChart");
                var oBinding = oVizFrame.getDataset().getBinding("data");
                oBinding.filter(oFilter);
            } else {
                sap.m.MessageToast.show("Please select both start and end dates.");
            }
        }
        
    });
});





