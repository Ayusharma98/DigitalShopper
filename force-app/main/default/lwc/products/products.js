import { LightningElement, track } from 'lwc';
import searchProducts from '@salesforce/apex/ProductSearchController.searchProducts';

export default class ProductSearch extends LightningElement {
    @track searchTerm = '';
    @track products = [];
    @track isLoading = false;

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }

    handleKeyUp(event) {
        if (this.searchTerm.length >= 2) {
            this.isLoading = true;
            searchProducts({ searchTerm: this.searchTerm })
                .then((result) => {
                    this.products = result;
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.error('Error searching products:', error);
                    this.isLoading = false;
                    this.products = [];
                });
        } else {
            this.products = []; 
        }
    }

    get noResults() {
        return this.products.length === 0 && this.searchTerm.length > 1 && !this.isLoading;
    }
}
