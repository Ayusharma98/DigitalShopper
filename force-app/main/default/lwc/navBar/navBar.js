import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Navbar extends NavigationMixin(LightningElement) {

    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/homepage' // Adjust the URL as needed
            }
        });
    }

    navigateToAccount() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/account-details' 
            }
        });
    }

    navigateToContacts() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/contacts' 
            }
        });
    }

    navigateToProducts() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/product-details'
            }
        });
    }

    navigateToOrders() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://psagitpvtltd2-dev-ed.develop.preview.salesforce-experience.com/Ds/orders'
            }
        });
    }

    navigateToLogin() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'login-page' // Adjust this to the correct relative path for your login page
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