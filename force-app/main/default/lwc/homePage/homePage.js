import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class HomePage extends NavigationMixin(LightningElement) {
    @track products = [
        { id: 'IPhone 16', name: 'IPhone 16', price: '$999' },
        { id: '2', name: 'Product B', price: '$20.00' },
        { id: '3', name: 'Product C', price: '$30.00' },
    ];
    
    productImage1 = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'; 
    productImage2 = 'https://www.intex.in/cdn/shop/products/1_1545c94e-b9a0-439e-a95b-dcce076080bf_1024x1024.png';

    handleShopNowClick() {
            this[NavigationMixin.Navigate]({
                type: 'standard__component',
                attributes: {
                    componentName: 'Shopping_Cart__c'
                }
            });
    }

    handleViewProduct(event) {
        const productId = event.target.dataset.id;
        
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                recordId: productId,
                objectApiName: 'Product2',
                actionName: 'view'
            }
        });
    }
}