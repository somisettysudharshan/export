sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("PrintPage.PrintPage.controller.View1", {
        onInit: function () {

        },

       

        onPressPrint: function (oEvent) {
            window.print();
        },

       

    });
});