
const TIMEOUT = 500;

export default class CartPage{
    constructor(page) {
        this.cartProductsRows = page.locator('#cart_info_table tbody tr');
        this.cartIsEmptyElement = page.locator("b:has-text('Cart is empty!')");
        this.page = page;
    }

    async getAllCartProductsDetails() {
        const productDetails = [];
        const productsCount = await this.cartProductsRows.count();

        for (let i = 0; i < productsCount; i++) {
            const row = this.cartProductsRows.nth(i);
            const name = await row.locator('.cart_description h4 a').textContent();
            const price = await row.locator('.cart_price p').textContent();

            productDetails.push({
                name: name.trim(),
                price: price.trim(),
            });
        }

        return productDetails;
    }

    async deleteProductFromCart() {
        while (await this.cartProductsRows.count() > 0) {
            const firstDeleteButton = this.cartProductsRows.first().locator('.cart_delete a.cart_quantity_delete');
            await firstDeleteButton.click();
            await this.page.waitForTimeout(TIMEOUT);
        }
    }


    async getCartIsEmptyText(){
        await this.page.waitForTimeout(TIMEOUT)
        return await this.cartIsEmptyElement.textContent();
    }
}