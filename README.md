# SuperRelatedListComponent
SuperRelatedList Component (Aura version)

## Setup the component
- SOQL Fields (required): API names of fields you want to select in Salesforce
- SOQL Table (required): API name of the table in Salesforce
- SOQL Where (optional): WHERE statements as in a SOQL query (without the Where!!)
- SOQL Order By (optional): ORDER BY statements as in a SOQL query (without the Order by!!)
- Fields from Current Record (required): List of Fields (API name) of the current record, comma separated, that can be use in other fields surrounded byt square bracket
- Table json configuration (required): JSON configuration with 'columns' (as expected by the aura table) and 'additionalFields' (with name, params and formula).
- CSV export json configuration (required): JSON configuration with 'headers' (an array of strings)

## Example of setup
- SOQL Fields: 
```
Id, Name, Firstname, Lastname
```
- SOQL Table: 
```
Contact
```
- SOQL Where: 
```
AccountId = [Id]
```
- SOQL Order By: 
```
Name DESC
```
- Fields from Current Record (for example in Account): 
```
Id
```
- Table json configuration: 
```
{ 
  "columns": [
    { 
      "label": "Id", 
      "type": "url", 
      "fieldName": "Id_Url", 
      "typeAttributes": {
        "label": { "fieldName": "Name" }, 
        "target": { "fieldName": "_blank" } 
      } 
    },
    { 
      "label": "Firstname", 
      "type": "text", 
      "fieldName": "Firstname" 
    },
    { 
      "label": "Lastname", 
      "type": "text", 
      "fieldName": "Firstname" 
    }
  ],
  "additionalFields": [
    { 
      "name": "Id_Url", 
      "params": ["Id"], 
      "formula": "/one/one.app?#/sObject/[Id]/view" 
    }
  ]
}
```
- CSV export json configuration: 
```
{ 
  "headers": [ "Id", "Name" ] 
}
```


## Deploy to Salesforce (sandbox)

<a href="https://githubsfdeploy-sandbox.herokuapp.com/app/githubdeploy/VinceFINET/SuperRelatedListComponent?ref=master">  
  <img alt="Deploy to Salesforce (sandbox)" src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

## Deploy to Salesforce (production and developer edition)

<a href="https://githubsfdeploy.herokuapp.com/app/githubdeploy/VinceFINET/SuperRelatedListComponent?ref=master">
  <img alt="Deploy to Salesforce (production)" src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
