import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Navbar extends NavigationMixin(LightningElement) {

    @track isLoggedIn = false;
    @track userInitials = ''; 

    loginUser() {
        this.isLoggedIn = true;
        const userName = "John Doe";
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
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/homepage'
            }
        });
    }

    navigateToAccount() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/account-details'
            }
        });
    }

    navigateToContacts() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/contacts'
            }
        });
    }

    navigateToProducts() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/product-details'
            }
        });
    }

    navigateToOrders() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/orders'
            }
        });
    }

    navigateToLogin() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            target: '_self',
            attributes: {
                url: 'login-page' 
            }
        });
        console.log('Login button clicked');
    }
    
    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();

        this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        console.log('Filtered Products:', this.filteredProducts);
    }
}
