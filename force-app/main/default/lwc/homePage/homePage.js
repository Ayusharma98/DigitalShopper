import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class HomePage extends NavigationMixin(LightningElement) {
    @track isLoggedIn = false; 
    @track userInitials = ''; 
    @track products = []; 
    @track cart = [];
    
    productImage1 = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'; 
    productImage2 = 'https://www.intex.in/cdn/shop/products/1_1545c94e-b9a0-439e-a95b-dcce076080bf_1024x1024.png';

    handleLogin(event) {
        this.isLoggedIn = true;
        let userName = '';
        this.userInitials = event.detail.initials;
        console.log('User Logged In: ', this.userInitials);
        this.showToast('Success', 'You are logged in!', 'success');
    }

    handleLogout() {
        this.isLoggedIn = false;
        this.userInitials = '';
        this.showToast('Success', 'You have logged out successfully!', 'success');
        console.log('User logged out');
    }

    getUserInitials(fullName) {
        const nameParts = fullName.split(' ');
        const initials = nameParts.map(name => name.charAt(0).toUpperCase()).join('');
        return initials;
    }

    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/homepage' }
        });
    }

    navigateToAccount() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/account-details' }
        });
    }

    navigateToContacts() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/contacts' }
        });
    }

    navigateToProducts() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/product-details' }
        });
    }

    navigateToOrders() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/orders' }
        });
    }

    navigateToLogin() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/login-page' }
        });
    }

    navigateToCart() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/shopping-cart' }
        });
    }

    navigateToCheckout() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/checkout' }
        });
    }

    handleShopNowClick() {
        console.log('Shop Now button clicked');
        this.navigateToCart();
    }

    connectedCallback() {
        this.products = [
            { id: '1', name: 'Product 1', price: '$100', inCart: false },
            { id: '2', name: 'Product 2', price: '$150', inCart: false },
            { id: '3', name: 'Product 3', price: '$200', inCart: false }
        ];
    }

    handleAddToCart(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.id === productId);
    
        if (product) {
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
            console.log(`Proceeding to checkout for ${product.name}`);
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
}
