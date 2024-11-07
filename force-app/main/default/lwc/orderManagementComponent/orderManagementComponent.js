import { LightningElement, track } from 'lwc';
import getUserOrders from '@salesforce/apex/OrderController.createOrder';

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
