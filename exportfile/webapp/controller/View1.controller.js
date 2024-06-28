sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet"
],
function (Controller,exportLibrary,Spreadsheet) {
    "use strict";
    var EdmType = exportLibrary.EdmType;
    return Controller.extend("exportfile.controller.View1", {
        onExportTable:function()
        {
            var oTable= this.getView().byId("exportTable");
            var oRowBinding = oTable.getBinding("items");
            var aCols = this.createColoum();

             var oSettings= {
                workbook:{
                    columns:aCols,
                    hierarchyLevel:'Level'
                },
                dataSource: oRowBinding,
                fileName:"My ProjectIdea"
            };

            var oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function(){
                oSheet.destroy();
            })
        },


        createColoum:function()
        {
            var aCols=[];

            aCols.push({
                label:"Company Name",
                property:"CompanyName",
                type: EdmType.String

            });
            aCols.push({
                label:"Contact Name",
                property:"ContactName",
                type: EdmType.String

            });
            aCols.push({
                label:"Address",
                property:"Address",
                type: EdmType.String

            });
            aCols.push({
                label:"Phone",
                property:"Phone",
                type: EdmType.String

            });

            return aCols;

        }
    });
});
