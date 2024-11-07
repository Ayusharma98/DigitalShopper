import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class HomePage extends NavigationMixin(LightningElement) {
    @track products = [
        { id: '1', name: 'IPhone 16', price: '$999' },
        { id: '2', name: 'Product B', price: '$20.00' },
        { id: '3', name: 'Product C', price: '$30.00' },
    ];

    @track cart = []; // Tracks the products added to the cart
    productImage1 = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg';
    productImage2 = 'https://www.intex.in/cdn/shop/products/1_1545c94e-b9a0-439e-a95b-dcce076080bf_1024x1024.png';


    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    // Handle Shop Now button click (navigate to Shopping Cart page)
    handleShopNowClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/shopping-cart' // Assuming you have a Shopping Cart component
            }
        });
    }

    // Handle Add to Cart button click
    handleAddToCart(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.id === productId);

        if (product) {
            // Add product to cart array
            this.cart = [...this.cart, product];
            this.showToast('Added to Cart Successfully', result, 'success')
            //window.alert("Added to cart Successfully");
            // Change button to View Cart if product is added
            event.target.label = 'View Cart';
            event.target.variant = 'brand';

            // Optionally, update the cart count in the header or a cart icon.
            // (e.g., this.cartCount = this.cart.length;)
        }
    }

    // Handle Buy Now button click (redirect to Checkout page)
    handleBuyNow(event) {
        const productId = event.target.dataset.id;
        
        // Navigate to checkout page with the product information
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__Checkout__c' // Assuming you have a Checkout page or component
            },
            state: {
                productId: productId
            }
        });
    }

    // Optionally, you could include a method to navigate to the Shopping Cart if the user clicks "View Cart".
    handleViewCart() {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__Shopping_Cart__c' // Shopping cart component
            }
        });
    }
}
