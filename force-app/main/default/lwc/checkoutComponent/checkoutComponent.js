import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
//import STRIPE_JS from '@salesforce/resourceUrl/stripeJs';  // Assume stripe.js is uploaded as a static resource

export default class CheckoutPage extends LightningElement {
    // @track fullName = '';
    // @track address = '';
    // @track city = '';
    // @track postalCode = '';
    // @track state = '';
    // @track country = '';
    // @track cardholderName = '';
    // @track cardNumber = '';
    // @track expirationDate = '';
    // @track cvc = '';

    // stripe;

    // // Load Stripe.js when the component is inserted into the DOM
    // renderedCallback() {
    //     if (this.stripe) {
    //         return;
    //     }

    //     loadScript(this, STRIPE_JS)
    //         .then(() => {
    //             this.stripe = Stripe('your-publishable-key');  // Replace with your Stripe publishable key
    //         })
    //         .catch(error => {
    //             console.error('Error loading Stripe.js', error);
    //         });
    // }

    // // Handle form input changes
    // handleInputChange(event) {
    //     const field = event.target.dataset.id;
    //     this[field] = event.target.value;
    // }

    // // Handle Checkout Button click
    // handleCheckout() {
    //     if (!this.isValidForm()) {
    //         alert('Please fill in all fields');
    //         return;
    //     }

    //     // Process payment through Stripe
    //     this.createPaymentMethod().then(paymentMethod => {
    //         this.processPayment(paymentMethod);
    //     }).catch(error => {
    //         console.error('Error creating payment method', error);
    //         alert('There was an error processing your payment details');
    //     });
    // }

    // // Check if the form is valid (basic validation)
    // isValidForm() {
    //     return this.fullName && this.address && this.city && this.state && this.country && this.cardholderName && this.cardNumber && this.expirationDate && this.cvc;
    // }

    // // Create a payment method using Stripe
    // createPaymentMethod() {
    //     return this.stripe.createPaymentMethod({
    //         type: 'card',
    //         card: {
    //             number: this.cardNumber,
    //             exp_month: this.expirationDate.split('/')[0],
    //             exp_year: this.expirationDate.split('/')[1],
    //             cvc: this.cvc
    //         },
    //         billing_details: {
    //             name: this.cardholderName,
    //             address: {
    //                 line1: this.address,
    //                 city: this.city,
    //                 postal_code: this.postalCode,
    //                 state: this.state,
    //                 country: this.country
    //             }
    //         }
    //     });
    // }

    // // Process the payment (this will be where your backend API comes in)
    // processPayment(paymentMethod) {
    //     // Call your Salesforce backend or external API to process the payment
    //     // You should send the paymentMethod.id to your server for creating a charge via Stripe's API
        
    //     // Example using a mock API call to process the payment
    //     fetch('/your-api/charge', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             payment_method: paymentMethod.paymentMethod.id,
    //             amount: 5000 // The amount in cents ($50)
    //         })
    //     }).then(response => {
    //         if (response.ok) {
    //             alert('Payment Successful!');
    //             // Redirect to the confirmation page or another page
    //             window.location.href = '/confirmation';
    //         } else {
    //             alert('Payment failed. Please try again.');
    //         }
    //     }).catch(error => {
    //         console.error('Payment failed', error);
    //         alert('Payment failed. Please try again.');
    //     });
    // }
}
