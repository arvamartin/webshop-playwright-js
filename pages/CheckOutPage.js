

export default class CheckOutPage{
    constructor(page) {
        this.cartProductsRows = page.locator('#cart_info tbody tr');
        this.totalAmount = page.locator('tr:has(h4:has-text("Total Amount")) p.cart_total_price');

    }


    async getTotalCartPrice() {
        let totalPrice = 0;
        const productsCount = await this.cartProductsRows.count();

        for (let i = 0; i < productsCount-1; i++) {
            const row = this.cartProductsRows.nth(i);

            const priceLocator = row.locator('.cart_total_price');

            try {
                const priceText = await priceLocator.textContent();
                if (priceText) {
                    const price = parseFloat(priceText.replace('Rs.', '').trim());
                    totalPrice += price;
                } else {
                    console.warn(`Price text is empty for row ${i}`);
                }
            } catch (error) {
                console.error(`Error getting price for row ${i}:`, error);
            }
        }

        return totalPrice;
    }


    async getFinalCartPrice() {
        const totalText = await this.totalAmount.textContent();
        return parseFloat(totalText.replace('Rs.', '').trim());
    }

}