({
    doInit: function(component, event, helper) {        
        // ------------------------------------------
        // Read "tableConfig" from configuration to generate table headers
        // ------------------------------------------
        const jsonTableConfig = component.get("v.tableConfig");
		const jsonCsvConfig = component.get("v.csvConfig");
        try {
            const tableConfig = JSON.parse(jsonTableConfig);
            component.set("v.addFields", tableConfig.additionalFields);
            component.set("v.tableColumns", tableConfig.columns);
            const csvConfig = JSON.parse(jsonCsvConfig);
            if (csvConfig) {
                component.set("v.csvHeaders", csvConfig.headers);
                if (csvConfig.button && csvConfig.button.label) {
                    component.set("v.csvLabelButton", csvConfig.button.label);
                }
                component.set("v.csvShowButton", true);
            } else {
                component.set("v.csvHeaders", []);
                component.set("v.csvShowButton", false);
            }
        } catch (error) {
            console.error('tableConfig=', jsonTableConfig, 'csvConfig=', csvConfig, 'Error=', error);          
        }
    },
    doDownloadCsv: function(component, event, helper) {
        const headers = component.get("v.csvHeaders");
        const rows = component.get("v.tableRows");
        const csv = helper.convertArrayOfObjectsToCSV(headers, rows);
        if (csv == null) return; 
        
        // ####--code for create a temp. <a> html tag [link tag] for download the CSV file--####     
        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self'; // 
        hiddenElement.download = 'ExportData.csv';  // CSV file Name* you can change it.[only name not .csv] 
        document.body.appendChild(hiddenElement); // Required for FireFox browser
        hiddenElement.click(); // using click() js function to download csv file
    },
    doGetRows: function(component, event, helper) {
        // ------------------------------------------
        // Call the SOQL apex controller
        // ------------------------------------------
        const action = component.get("c.GetRows");
        action.setParams({
            "fields": component.get("v.soqlFields"),
            "table":  component.get("v.soqlTable"),
            "whereClause": component.get("v.soqlWhere"),
            "orderByClause": component.get("v.soqlOrderBy"),
            "variables": component.get("v.record"),
            "maximumNbRows": 5000
        });
        action.setCallback(this, function(response){
            const state = response.getState();
            if (state === "SUCCESS") {
                const rows = response.getReturnValue();
                const addFields = component.get("v.addFields");
                addFields.forEach(field => {
                    rows.forEach(row => {
                        // Workaround for lookups fields in datatable
                        for (var f in row) if (typeof row[f] === 'object') {
                            for (var relField in row[f]) {
                               row[f + "." + relField] = row[f][relField];
                            }
                        }
                        // Calculate additional fields
                        let value = field.formula;
                        field.params.forEach(p => value = value.replace('['+p+']', row[p]));
                        row[field.name] = value;
                	});
                });
                component.set("v.tableRows", rows);
            } else {
                console.error('State=', state);
                console.error('Error=', response.getError()[0]);
            }
        });
        $A.enqueueAction(action);
	}
})
