sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "printtable/util/Formatter",
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library',
    
],
function (Controller,Formatter,Spreadsheet,exportlibrary) {
    "use strict";

    return Controller.extend("printtable.controller.View1", {
        Formatter: Formatter,
        onInit: function () {
            var that = this;
                var sServiceUrl = "/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/";

                var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
                // @ts-ignore
                this.getView().setModel(oModel);

                this._mViewSettingsDialogs = {};  

        },
        onPrint : function(oEvent) {
            var oTarget = this.getView(),
                sTargetId = oEvent.getSource().data("targetId");
                
            if (sTargetId) {
                oTarget = oTarget.byId(sTargetId);
            }
            
            if (oTarget) {
                var $domTarget = oTarget.$()[0],
                    sTargetContent = $domTarget.innerHTML,
                    sOriginalContent = document.body.innerHTML;
                    
                document.body.innerHTML = sTargetContent;
                window.print();
                document.body.innerHTML = sOriginalContent;
            } else {
                jQuery.sap.log.error("onPrint needs a valid target container [view|data:targetId=\"SID\"]");
            }
        },



        createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: 'Full name',
				property: ['SupplierName', 'OrderedByName'],
				type: EdmType.String,
				template: '{0}, {1}'
			});

			aCols.push({
				label: 'Purchase OrderID',
				type: EdmType.Number,
				property: 'POId',
				scale: 0
			});

            aCols.push({
				label: 'SupplierId',
				type: EdmType.Number,
				property: 'OrderedById',
				scale: 0
			});

			aCols.push({
				property: 'OrderedByName',
				type: EdmType.String
			});

			aCols.push({
				property: 'SupplierName',
				type: EdmType.String
			});

			// aCols.push({
			// 	property: 'Birthdate',
			// 	type: EdmType.Date
			// });

			// aCols.push({
			// 	property: 'Salary',
			// 	type: EdmType.Number,
			// 	scale: 2,
			// 	delimiter: true
			// });

			// aCols.push({
			// 	property: 'Currency',
			// 	type: EdmType.String
			// });

			// aCols.push({
			// 	property: 'Active',
			// 	type: EdmType.Boolean,
			// 	trueValue: 'YES',
			// 	falseValue: 'NO'
			// });

			return aCols;
		},















        onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId('IDOrderTable');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export .xlsx',
				worker: true // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},


        

    });
});
