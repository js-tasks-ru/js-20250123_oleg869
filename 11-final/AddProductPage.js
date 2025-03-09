import ProductForm from "../../08-forms-fetch-api-part-2/1-product-form-v1/index.js";
import CorePage from './CorePage.js';

export default class AddProductPage extends CorePage {
    constructor() {
        super();
        this.productForm = new ProductForm();
        this.handleSendButton = this.handleSendButton.bind(this);
    }

    async render() {
        const element = await this.productForm.render();
        this.element = element;
        this.element.addEventListener('product-saved', this.handleSendButton);

        return this.element;
    }

    handleSendButton() {
        window.router.navigate('/products');
    }

    destroy() {
        this.productForm.destroy();
        this.element.removeEventListener('product-saved', this.handleSendButton);
        super.destroy();
    }
}