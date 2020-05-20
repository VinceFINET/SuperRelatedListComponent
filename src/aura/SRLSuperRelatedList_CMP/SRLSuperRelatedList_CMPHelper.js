({
    convertArrayOfObjectsToCSV : function(headers, rows) {
        if (rows == null || !rows.length) {
            return null;
        }

        const COLUMN_DIVIDER = ',';
        const LINE_DIVIDER = '\n';
       
        let csvStringResult = 'sep='+COLUMN_DIVIDER+LINE_DIVIDER;
        csvStringResult += headers.join(COLUMN_DIVIDER);
        csvStringResult += LINE_DIVIDER;

        for(let i=0; i < rows.length; i++){   
            let counter = 0;
            for(var header in headers) {
                if (counter > 0) { 
                    csvStringResult += COLUMN_DIVIDER; 
                }
                const fieldname = headers[header]; 
                const fieldvalue = rows[i][fieldname] || '';
                csvStringResult += '"'+ fieldvalue +'"'; 
                counter++;
            }
            csvStringResult += LINE_DIVIDER;
        }
        return csvStringResult;        
    }
})
