import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import createAccount from '@salesforce/apex/UserRegistrationController.createAccount';

export default class UserRegistration extends NavigationMixin(LightningElement) {
    firstName = '';
    lastName = '';
    email = '';
    password = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'firstName') {
            this.firstName = event.target.value;
        } else if (field === 'lastName') {
            this.lastName = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'password') {
            this.password = event.target.value;
        }
    }

    handleSubmit() {
        createAccount({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password })
            .then(result => {
                console.log('Account created successfully', result);
                
                this.navigateToLoginPage();
            })
            .catch(error => {
                console.error('Error creating account', error);
            });
    }

    navigateToLoginPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/login-page' 
            }
        });
    }
}
