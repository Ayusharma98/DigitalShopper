import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import loginUser from '@salesforce/apex/UserLoginController.loginUser';
import resetPassword from '@salesforce/apex/UserLoginController.resetPassword';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UserLogin extends NavigationMixin(LightningElement) {
    email = '';
    password = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'password') {
            this.password = event.target.value;
        }
    }

    handleLogin() {
        loginUser({ email: this.email, password: this.password })
            .then(result => {
                console.log('Login successful', result);
                this.navigateToHomePage();
            })
            .catch(error => {
                console.error('Error during login', error);
                this.showToast('Error', 'Invalid credentials, please try again.', 'error');
            });
    }

    navigateToHomePage() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            attributes: {
                url: '/afterloginhomepage' 
            }
        });
    }

    handleForgotPassword() {
        resetPassword({ email: this.email })
            .then(result => {
                alert(result);
            })
            .catch(error => {
                alert('Error: ' + error.body.message);
            });
    }

    handleSignUp() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/'
            }
        });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }
}
