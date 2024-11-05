import { LightningElement, track, wire } from 'lwc';
import getCartItems from '@salesforce/apex/ShoppingCartController.getCartItems';
import updateCart from '@salesforce/apex/ShoppingCartController.updateCart';
import checkout from '@salesforce/apex/ShoppingCartController.checkout';

export default class ShoppingCart extends LightningElement {
    @track cartItems = [];
    @track isLoading = true;

    @wire(getCartItems)
    wiredCartItems({ error, data }) {
        if (data) {
            this.cartItems = data;
            this.isLoading = false;
        } else if (error) {
            console.error('Error fetching cart items:', error);
            this.isLoading = false;
        }
    }

    handleQuantityChange(event) {
        const productId = event.target.dataset.id;
        const quantity = parseInt(event.target.value, 10);

        updateCart({ productId, quantity })
            .then(() => {
                // Optionally refresh cart items
                return getCartItems();
            })
            .then((data) => {
                this.cartItems = data;
            })
            .catch(error => {
                console.error('Error updating cart:', error);
            });
    }

    handleCheckout() {
        checkout()
            .then(() => {
                // Clear cart items after checkout
                this.cartItems = [];
                alert('Checkout successful!');
            })
            .catch(error => {
                console.error('Error during checkout:', error);
            });
    }
}
