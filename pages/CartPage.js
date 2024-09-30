

export default class CartPage{
    constructor(page) {
        this.firstCartProduct = page.locator('#cart_info_table tbody tr');
        this.cartIsEmptyElement = page.locator('p.text-center').filter({ hasText: 'Cart is empty!' }).first();
        this.page = page;
    }

    async getFirstCartProductDetails() {
        const priceText = await this.firstCartProduct.locator('.cart_price p').textContent();
        const nameText = await this.firstCartProduct.locator('.cart_description h4 a').textContent();

        return {
            name: nameText.trim(),
            price: priceText.trim()
        };
    }

    async deleteProductFromCart() {
        const products = await this.firstCartProduct.count();

        for (let i = 0; i < products; i++) {
            const deleteButton = this.firstCartProduct.nth(i).locator('.cart_delete a.cart_quantity_delete');
            await deleteButton.click();
            await this.page.waitForTimeout(500);
        }
    }

    async getCartIsEmptyText(){
        return await this.cartIsEmptyElement.textContent();
    }
}