import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getProducts from '@salesforce/apex/HomePageController.getProducts';
import getUserAccount from '@salesforce/apex/HomePageController.getUserAccount';

export default class HomePageNew extends NavigationMixin(LightningElement) {
    products = [];
    userAccount;
    cart = []; 

    productImage1 = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'; 
    productImage2 = 'https://www.intex.in/cdn/shop/products/1_1545c94e-b9a0-439e-a95b-dcce076080bf_1024x1024.png';

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.products.forEach(product => product.inCart = false);
        } else if (error) {
            console.error('Error fetching products:', error);
        }
    }

    @wire(getUserAccount)
    wiredUserAccount({ error, data }) {
        if (data) {
            this.userAccount = data;
        } else if (error) {
            console.error('Error fetching user account:', error);
        }
    }

    handleAddToCart(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.Id === productId);
    
        if (product) {
            if (!product.inCart) {
                this.cart = [...this.cart, product];
                product.inCart = true;
                this.showToast('Success', `${product.Name} added to cart!`, 'success');
            } else {
                this.showToast('Already in Cart', `${product.Name} is already in your cart!`, 'info');
            }
        }
    }

    handleBuyNow(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.Id === productId);
    
        if (product) {
            this.showToast('Success', `Proceeding to checkout for ${product.Name}`, 'success');
            this.navigateToCheckout();
        }
    }

    viewCart() {
        this.navigateToCart();
    }

    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/homepage' }
        });
    }

    navigateToHomeAfterLogout() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/afterloginhomepage' }
        });
        alert('Logout Successfully');
    }


    logout() {
        this.navigateToHomeAfterLogout();
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

    navigateToCart() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/shopping-cart' }
        });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}