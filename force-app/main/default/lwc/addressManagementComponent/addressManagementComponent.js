import { LightningElement, track } from 'lwc';
import saveAddress from '@salesforce/apex/AddressController.saveAddress';

export default class AddressManagement extends LightningElement {
    // Track form fields for Billing and Shipping Address
    @track billingStreet = '';
    @track billingCity = '';
    @track billingState = '';
    @track billingZipCode = '';
    @track billingCountry = '';

    @track shippingStreet = '';
    @track shippingCity = '';
    @track shippingState = '';
    @track shippingZipCode = '';
    @track shippingCountry = '';

    @track account = {};  // To store the updated Account details
    @track errorMessage;  // To store error messages

    // Billing Address Change Handlers
    handleBillingStreetChange(event) { this.billingStreet = event.target.value; }
    handleBillingCityChange(event) { this.billingCity = event.target.value; }
    handleBillingStateChange(event) { this.billingState = event.target.value; }
    handleBillingZipCodeChange(event) { this.billingZipCode = event.target.value; }
    handleBillingCountryChange(event) { this.billingCountry = event.target.value; }

    // Shipping Address Change Handlers
    handleShippingStreetChange(event) { this.shippingStreet = event.target.value; }
    handleShippingCityChange(event) { this.shippingCity = event.target.value; }
    handleShippingStateChange(event) { this.shippingState = event.target.value; }
    handleShippingZipCodeChange(event) { this.shippingZipCode = event.target.value; }
    handleShippingCountryChange(event) { this.shippingCountry = event.target.value; }

    // Save Address Method (call Apex)
    saveAddress() {
        saveAddress({
            billingStreet: this.billingStreet,
            billingCity: this.billingCity,
            billingState: this.billingState,
            billingZip: this.billingZipCode,
            billingCountry: this.billingCountry,
            shippingStreet: this.shippingStreet,
            shippingCity: this.shippingCity,
            shippingState: this.shippingState,
            shippingZip: this.shippingZipCode,
            shippingCountry: this.shippingCountry
        })
        .then(result => {
            this.account = result; // Update account with new address data
            this.errorMessage = undefined; // Clear previous errors
        })
        .catch(error => {
            this.errorMessage = 'Error: ' + error.body.message; // Display error message
            console.error(error);
        });
    }
}
