import { LightningElement, track } from 'lwc';
import saveAddress from '@salesforce/apex/AddressController.saveAddress';

export default class AddressManagement extends LightningElement {
    @track addressLine1 = '';
    @track city = '';
    @track state = '';
    @track zipCode = '';

    handleAddressLine1Change(event) {
        this.addressLine1 = event.target.value;
    }

    handleCityChange(event) {
        this.city = event.target.value;
    }

    handleStateChange(event) {
        this.state = event.target.value;
    }

    handleZipCodeChange(event) {
        this.zipCode = event.target.value;
    }

    saveAddress() {
        saveAddress({ addressLine1: this.addressLine1, city: this.city, state: this.state, zip: this.zipCode })
            .then(() => {
                // Handle successful address save (e.g., show a success message)
            })
            .catch(error => {
                console.error(error);
            });
    }
}
