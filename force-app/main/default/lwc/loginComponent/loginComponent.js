import { LightningElement, api } from 'lwc';
import loginUser from '@salesforce/apex/UserAuthController.loginUser';
import resetPassword from '@salesforce/apex/UserAuthController.resetPassword';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LoginComponent extends LightningElement {
    username = '';
    password = '';
    
    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleLogin() {
       console.log(
        loginUser({ username: this.username, password: this.password })
            .then(result => {
                if (result) {
                    const initials = this.getUserInitials(this.username);
                    this.dispatchLoginEvent(initials);

                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Success',
                        message: 'Login successful!',
                        variant: 'success'
                    }));
                    
                    this.redirectToHome();
                } else {

                    alert('Invalid credentials. Please try again.');
                }
            })
            .catch(error => {
                alert('Error: ' + error.body.message);
            }));
    }

    getUserInitials(username) {
        const nameParts = username.split(' ');
        const initials = nameParts.map(name => name.charAt(0).toUpperCase()).join('');
        return initials;
    }

    dispatchLoginEvent(initials) {
        const loginEvent = new CustomEvent('userlogin', {
            detail: {
                isLoggedIn: true,
                userInitials: initials
            }
        });
        this.dispatchEvent(loginEvent);
    }

    redirectToHome() {
        window.location.href = '/homepage';
    }

    handleForgotPassword() {
        resetPassword({ username: this.username })
            .then(result => {
                alert(result);
            })
            .catch(error => {
                alert('Error: ' + error.body.message);
            });
    }

    handleRedirectToRegister() {
        window.location.href = '/';
    }
}
