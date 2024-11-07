import { LightningElement, track } from 'lwc';
import searchProducts from '@salesforce/apex/ProductSearchController.searchProducts';

export default class ProductSearch extends LightningElement {
    @track searchTerm = ''; 
    @track allProducts = []; 
    @track filteredProducts = []; 
    @track isLoading = false; 
    @track cart = [];
    debounceTimeout;

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }


    handleKeyUp() {
        clearTimeout(this.debounceTimeout);

        this.debounceTimeout = setTimeout(() => {
            if (this.searchTerm.length >= 2) {
                this.isLoading = true;
                searchProducts({ searchTerm: this.searchTerm })
                    .then((result) => {
                        this.filteredProducts = result;
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        console.error('Error searching products:', error);
                        this.isLoading = false;
                        this.filteredProducts = [];
                    });
            } else {
                this.filteredProducts = [];
            }
        }, 300);
    }

    connectedCallback() {
        this.fetchAllProducts();
    }

    fetchAllProducts() {
        this.isLoading = true;
        setTimeout(() => {
            this.allProducts = [
                { Id: '1', Name: 'Product 1', Description: 'Description of product 1', Price__c: 100, Category__c: 'Category A', Stock_Quantity__c: 50, Image_URL__c: '' },
                { Id: '2', Name: 'Product 2', Description: 'Description of product 2', Price__c: 150, Category__c: 'Category B', Stock_Quantity__c: 30, Image_URL__c: '' },
                { Id: '3', Name: 'Product 3', Description: 'Description of product 3', Price__c: 200, Category__c: 'Category A', Stock_Quantity__c: 70, Image_URL__c: '' },
                { Id: '4', Name: 'Product 4', Description: 'Description of product 4', Price__c: 250, Category__c: 'Category C', Stock_Quantity__c: 100, Image_URL__c: '' },
            ];
            this.filteredProducts = [...this.allProducts]; 
            this.isLoading = false;
        }, 300);
    }

    handleAddToCart(event) {
        const productId = event.target.dataset.id;
        const product = this.allProducts.find((prod) => prod.Id === productId);

        if (product) {
            this.cart.push(product);
            this.dispatchEvent(new CustomEvent('cartupdated', { detail: this.cart.length }));
            console.log(`Added to Cart: ${product.Name}`);
        }
    }

    handleBuyNow(event) {
        const productId = event.target.dataset.id;
        const product = this.allProducts.find((prod) => prod.Id === productId);

        if (product) {
            console.log(`Initiating purchase for: ${product.Name}`);
            alert(`Proceeding to checkout for ${product.Name}`);
        }
    }

    get shouldDisplayAllProducts() {
        return this.filteredProducts.length === 0 && this.allProducts.length > 0;
    }
    
    get noResults() {
        return this.filteredProducts.length === 0 && this.searchTerm.length > 1 && !this.isLoading;
    }
}
