sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sampleform/util/Formatter",
    "sap/m/PDFViewer"

],
function (Controller,Formatter,PDFViewer) {
    "use strict";

    return Controller.extend("sampleform.controller.View1", {
        Formatter: Formatter,
        onInit: function () {
            // @ts-ignore
                // @ts-ignore
                var that = this;
                var sServiceUrl = "/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/";

                var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
                // @ts-ignore
                this.getView().setModel(oModel);

                this._mViewSettingsDialogs = {};    


        },
        onPressPrint: function (oEvent) {
            window.print();
        },
        showPDF: function(oEvent){
	
			var opdfViewer = new PDFViewer();
			this.getView().addDependent(opdfViewer);
			var sServiceURL = this.getView().getModel().sServiceUrl;
			var sSource = sServiceURL + "GetPdfSet(Serial='C0003',Filename='')/$value";
			opdfViewer.setSource(sSource);
			opdfViewer.setTitle( "My PDF");
			opdfViewer.open();	
			
		},
    });
});
