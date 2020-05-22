public class SRLDataRetriever_APC {

    /**
     * @description Maximum rows the method returns
     */
    private static final Integer MAX_ROWS = 5000;

    /**
     * @description Get the rows from a SOQL query
     * @return A JSON representation of the rows
     */
    @AuraEnabled
    public static List<SObject> GetRows(String fields, String table, 
        String whereClause, String orderByClause, 
        SObject variables, Integer maximumNbRows) {
        
        Map<String, Object> var = variables.getPopulatedFieldsAsMap();
        String whereClauseBind = whereClause;
        for (String key : var.keySet()) {
            String bindingKey = '['+key+']';
            if (whereClauseBind.contains(bindingKey)) {
                String value = String.escapeSingleQuotes(String.valueOf(var.get(key)));
                whereClauseBind = whereClauseBind.replace(bindingKey, '\''+value+'\'');
            }
        }
        if (maximumNbRows == null || maximumNbRows > MAX_ROWS) maximumNbRows = MAX_ROWS;
        String query = 
            ' SELECT ' + fields + 
            ' FROM ' + table + 
            (String.isNotBlank(whereClauseBind) ? ' WHERE '    + whereClauseBind : '') + 
            (String.isNotBlank(orderByClause)   ? ' ORDER BY ' + orderByClause   : '') + 
            ' LIMIT ' + maximumNbRows);
        return Database.query(query);
    }
}
