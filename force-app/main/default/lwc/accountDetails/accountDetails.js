import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// Define the fields you want to retrieve
const FIELDS = [
    'Account.Name',
    'Account.PersonEmail',
    'Account.Phone',
    'Account.BillingStreet',
    'Account.BillingCity',
    'Account.BillingState',
    'Account.BillingPostalCode',
    'Account.BillingCountry'
];

export default class AccountDetails extends LightningElement {
    @api recordId; // To receive the Account record Id as a property

    // Wire service to get the Account data
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    accountData({ error, data }) {
        if (data) {
            this.account = data.fields;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.account = undefined;
        }
    }
}
