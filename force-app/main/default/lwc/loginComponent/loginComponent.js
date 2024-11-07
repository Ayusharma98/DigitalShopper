import { LightningElement, track } from 'lwc';
import loginUser from '@salesforce/apex/LoginController.loginUser';
import sendPasswordReset from '@salesforce/apex/AuthController.sendPasswordReset';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import USER_ID from '@salesforce/user/Id';

export default class LoginComponent extends NavigationMixin(LightningElement) {
    @track email = '';
    @track password = '';
    @track errorMessage = '';
    @track isForgotPassword = false;
    @track forgotEmail = '';
    @track userName = ''; // To hold the user's name
    @track userPhotoUrl = ''; // To hold the user's profile picture URL
    @track initials = ''; // To hold the user's initials
    @track isLoggedIn = false;

     // Show toast notification
     showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }


    // Handle form input changes for email and password
    handleChange(event) {
        const field = event.target.dataset.field;
        if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'password') {
            this.password = event.target.value;
        }
    }

    // Handle login form submission
    async handleSubmit() {
        this.errorMessage = '';
        try {
            // Call Apex to log in the user
            const result = await loginUser({ Username: this.email, password: this.password });

            if (result) {
                this.showToast('Success', result, 'success');
                this.isLoggedIn = true; // Set the user to logged in state
                this.redirectToHome();
            }
        } catch (error) {
            this.errorMessage = error.body.message;
            this.showToast('Error', this.errorMessage, 'error');
        }
    }

    // Redirect to the home page or dashboard
    redirectToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/homepage'  // Adjust this URL as needed for your app
            }
        });
    }

   

    // Handle forgot password form visibility
    handleForgotPassword() {
        this.isForgotPassword = true;
    }

    // Handle cancel button on forgot password
    cancelForgotPassword() {
        this.isForgotPassword = false;
        this.forgotEmail = '';
    }

    // Handle email change for forgot password
    handleForgotEmailChange(event) {
        this.forgotEmail = event.target.value;
    }

    // Send password reset email
    async forgotPassword() {
        if (!this.forgotEmail) {
            this.showToast('Error', 'Please enter your email address', 'error');
            return;
        }
        try {
            const result = await sendPasswordReset({ email: this.forgotEmail });
            this.showToast('Success', result, 'success');
            this.isForgotPassword = false;
        } catch (error) {
            this.errorMessage = error.body.message;
            this.showToast('Error', this.errorMessage, 'error');
        }
    }

    // Redirect to the sign-up page (or show a link to sign up)
    handleSignUp() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/'  // Adjust this URL to match your signup page or process
            }
        });
    }
}
