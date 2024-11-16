import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class HomePage extends NavigationMixin(LightningElement) {
    @track products = [];
    @track cart = [];
    @track filteredProducts = [];

    productImage1 = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'; 
    productImage2 = 'https://www.intex.in/cdn/shop/products/1_1545c94e-b9a0-439e-a95b-dcce076080bf_1024x1024.png';

    connectedCallback() {
        this.products = [
            { id: '1', name: 'Product 1', price: '$100', inCart: false },
            { id: '2', name: 'Product 2', price: '$150', inCart: false },
            { id: '3', name: 'Product 3', price: '$200', inCart: false }
        ];
        this.filteredProducts = this.products;
    }

    navigateToHome() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            attributes: { url: '/homepage' }
        });
    }

    navigateToProducts() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            attributes: { url: '/product-details' }
        });
    }

    navigateToLogin() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            attributes: { url: '/login-page' }
        });
    }

    navigateToRegister() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            attributes: { url: '/' }
        });
    }

    handleShopNowClick() {
        this.navigateToCart();
    }

    handleAddToCart(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.id === productId);
    
        if (product && !product.inCart) {
            this.cart = [...this.cart, product];
            product.inCart = true; 
            this.showToast('Success', `${product.name} added to cart!`, 'success');
        }
    }

    handleBuyNow(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.id === productId);
    
        if (product) {
            this.showToast('Success', `Proceeding to checkout for ${product.name}`, 'success');
            this.navigateToCheckout();
        }
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(toastEvent);
    }

    navigateToCart() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            attributes: { url: '/shopping-cart' }
        });
    }

    navigateToCheckout() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            attributes: { url: '/checkout' }
        });
    }
}
