@isTest
public class SRLDataRetrieverTest_APC {

    @isTest
    public static void doPositiveTest() {
        
        List<Account> accounts = new List<Account>();
        accounts.add(new Account(Name='Test1'));
        accounts.add(new Account(Name='Test2'));
        insert accounts;
        
        List<Contact> contacts = new List<Contact>();
        contacts.add(new Contact(FirstName='AA', LastName='aa', AccountId=accounts[0].Id));
        contacts.add(new Contact(FirstName='BB', LastName='bb', AccountId=accounts[0].Id));
        contacts.add(new Contact(FirstName='CC', LastName='cc', AccountId=accounts[1].Id));
        insert contacts;
        
        String fields = 'Id, Name, FirstName, LastName';
        String table = 'Contact';
        String whereClause = 'AccountId = [Id]';
        String orderByClause = 'Name DESC';
        SObject mainRecord = accounts[0];

        List<SObject> rows = SRLDataRetriever_APC.GetRows(fields, table, whereClause, orderByClause, mainRecord, 10);

        System.assertEquals(rows.size(), 2);
        System.assertEquals(((Contact) rows[0]).FirstName, 'BB');
        System.assertEquals(((Contact) rows[1]).FirstName, 'AA');
    }
}