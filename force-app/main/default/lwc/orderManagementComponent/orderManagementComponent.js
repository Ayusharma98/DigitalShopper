import { LightningElement, track } from 'lwc';
import getUserOrders from '@salesforce/apex/OrderController.getUserOrders';

export default class OrderHistory extends LightningElement {
    @track orders = [];

    connectedCallback() {
        this.loadOrders();
    }

    loadOrders() {
        getUserOrders()
            .then(result => {
                this.orders = result;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
