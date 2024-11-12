import { LightningElement } from 'lwc';
import registerUser from '@salesforce/apex/UserAuthController.registerUser';
import { NavigationMixin } from 'lightning/navigation';

export default class UserRegistration extends NavigationMixin(LightningElement) {
    firstName = '';
    lastName = '';
    email = '';
    username = '';
    password = '';
    addressLine1 = '';
    addressLine2 = '';
    city = '';
    state = '';
    zipCode = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleRegister(event) {
        event.preventDefault(); 

        if (!this.firstName || !this.lastName || !this.password) {
            alert('Please fill out all required fields.');
            return;
        }

        registerUser({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            password: this.password,
            addressLine1: this.addressLine1,
            addressLine2: this.addressLine2,
            city: this.city,
            state: this.state,
            zipCode: this.zipCode
        })
        .then(result => {
            alert(result);
        })
        .catch(error => {
            alert('Error: ' + error.body.message);
        });
    }

    handleRedirectToLogin() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/login-page'
            }
        });
    }
}
