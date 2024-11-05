import { LightningElement, track } from 'lwc';
import loginUser from '@salesforce/apex/LoginController.loginUser';
import sendPasswordReset from '@salesforce/apex/AuthController.sendPasswordReset';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LoginController extends LightningElement {
    @track email = '';
    @track password = '';
    @track errorMessage = '';
    @track isForgotPassword = false;
    @track forgotEmail = '';

    handleChange(event) {
        const field = event.target.dataset.field;
        if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'password') {
            this.password = event.target.value;
        }
    }

    handleForgotPassword() {
        this.isForgotPassword = true;
    }

    handleForgotEmailChange(event) {
        this.forgotEmail = event.target.value;
    }

    async forgotPassword() {
        try {
            const result = await sendPasswordReset({ email: this.forgotEmail });
            this.showToast('Success', result, 'success');
            this.isForgotPassword = false;
        } catch (error) {
            this.errorMessage = error.body.message;
            console.error('Error sending password reset email', error);
        }
    }

    cancelForgotPassword() {
        this.isForgotPassword = false; 
        this.forgotEmail = ''; 
    }

    async handleSubmit() {
        this.errorMessage = '';
        try {
            const result = await loginUser({ Username__c: this.email, Password__c: this.password });
            
            this.showToast('Success', result, 'success');
            
        } catch (error) {
            this.errorMessage = error.body.message;
            console.error('Login error', error);
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}