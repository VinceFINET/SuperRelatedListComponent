public class SRLDataRetriever_APC {

    /**
     * @description Get the rows from a SOQL query
     * @return A JSON representation of the rows
     */
    @AuraEnabled
    public static List<SObject> GetRows(String fields, String table, 
        String whereClause, String orderByClause, 
        SObject variables) {
        
        Map<String, Object> var = variables.getPopulatedFieldsAsMap();
        String whereClauseBind = whereClause;
        for (String key : var.keySet()) {
            String bindingKey = '['+key+']';
            if (whereClauseBind.contains(bindingKey)) {
                String value = String.escapeSingleQuotes(String.valueOf(var.get(key)));
                whereClauseBind = whereClauseBind.replace(bindingKey, '\''+value+'\'');
            }
        }
        String query = 
            ' SELECT ' + fields + 
            ' FROM ' + table + 
            (String.isNotBlank(whereClauseBind) ? ' WHERE '    + whereClauseBind : '') + 
            (String.isNotBlank(orderByClause)   ? ' ORDER BY ' + orderByClause   : '') + 
            ' LIMIT 100';
        return Database.query(query);
    }
}
