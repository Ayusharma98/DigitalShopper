import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AfterLoginHomePage extends NavigationMixin(LightningElement) {
    @track isLoggedIn = false; 
    @track userInitials = ''; 
    @track products = []; 
    @track productImage1 = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'; 
    @track productImage2 = 'https://www.intex.in/cdn/shop/products/1_1545c94e-b9a0-439e-a95b-dcce076080bf_1024x1024.png'; 
    @track cart = []; 

    loginUser() {
        this.isLoggedIn = true;
        let userName = "John Doe"; 
        this.userInitials = this.getUserInitials(userName);
    }

    getUserInitials(fullName) {
        const nameParts = fullName.split(' ');
        const initials = nameParts.map(name => name.charAt(0).toUpperCase()).join('');
        return initials;
    }

    handleLogout() {
        this.isLoggedIn = false;
        this.userInitials = '';
        console.log('User logged out');
    }

    navigateToHome() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/homepage' 
            }
        });
    }

    navigateToAccount() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/account-details' 
            }
        });
    }

    navigateToContacts() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/contacts' 
            }
        });
    }

    navigateToProducts() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/product-details' 
            }
        });
    }

    navigateToOrders() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/orders' 
            }
        });
    }

    navigateToCart() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/shopping-cart' 
            }
        });
    }

    navigateToCheckout() {
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/checkout' 
            }
        });
    }

    handleShopNowClick() {
        console.log('Shop Now button clicked');
        this.navigateToCart();
    }

    // Simulate loading products
    connectedCallback() {
        this.products = [
            { id: '1', name: 'Product 1', price: '$100' },
            { id: '2', name: 'Product 2', price: '$150' },
            { id: '3', name: 'Product 3', price: '$200' }
        ];
    }

    handleAddToCart(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.id === productId);
    
        if (product) {
            // Add product to cart array
            this.cart = [...this.cart, product];
    
            // Change the button text to "View Cart"
            const button = event.target;
            button.label = 'View Cart';
            button.variant = 'brand';
            button.onclick = () => this.handleViewCart(); 
            this.showToast('Success', `${product.name} added to cart!`, 'success');
        }
    }

    handleViewCart() {
        console.log('Navigating to Shopping Cart with Cart:', this.cart);
        this[NavigationMixin.Navigate]( {
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: '/shopping-cart'
            }
        });
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
