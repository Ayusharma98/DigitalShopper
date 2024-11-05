import { LightningElement, track } from 'lwc';
import userRegistration from '@salesforce/apex/RegistartionController.userRegistration';

export default class RegistartionController extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track password = '';
    @track confirmPassword = '';
    @track errorMessage = '';

    handleChange(event) {
        const field = event.target.dataset.field;
        if (field === 'firstName') this.firstName = event.target.value;
        else if (field === 'lastName') this.lastName = event.target.value;
        else if (field === 'email') this.email = event.target.value;
        else if (field === 'password') this.password = event.target.value;
        else if (field === 'confirmPassword') this.confirmPassword = event.target.value;
    }

    async handleSubmit() {
        this.errorMessage = '';
        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }
        try {
            await userRegistration({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
            });
            console.log('User registered successfully');
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
        } catch (error) {
            this.errorMessage = error.body.message; 
            console.error('Error during registration:', error);
        }
    }
}
