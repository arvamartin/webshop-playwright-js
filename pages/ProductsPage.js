import BasicMethods from "../utils/BasicMethods";
import ConfigurationReader from "../utils/ConfigurationReader";

export default class ProductsPage{
    constructor(page) {
        this.firstProductAddToCartBtn = page.locator("a[data-product-id='1']").first();
        this.firstProductInfo = page.locator('.single-products .productinfo').first();
        this.secondProductAddToCartBtn = page.locator("a[data-product-id='2']").first();
        this.viewCartBtn = page.locator('a').filter({ hasText: 'View Cart' }).first();
        this.page = page;
    }

    async clickOnAddToCartFirstProduct(){
        await this.firstProductAddToCartBtn.scrollIntoViewIfNeeded();
        await this.firstProductAddToCartBtn.click();
    }

    async clickOnAddToCartSecondProduct(){
        await this.secondProductAddToCartBtn.scrollIntoViewIfNeeded();
        await this.secondProductAddToCartBtn.click();
    }

    async getFirstProductDetails() {
        const priceText = await this.firstProductInfo.locator('h2').textContent();
        const nameText = await this.firstProductInfo.locator('p').textContent();

        return [{
            name: nameText.trim(),
            price: priceText.trim()
        }];
    }

    async clickOnViewCartBtn(){
        await this.viewCartBtn.click();
    }

    async addFirstProductToCartProcess(){
        await BasicMethods.navigate(this.page, ConfigurationReader.getProperty("products_url"));
        await this.clickOnAddToCartFirstProduct()
        await this.clickOnViewCartBtn();
    }

    async addSecondProductToCartProcess(){
        await BasicMethods.navigate(this.page, ConfigurationReader.getProperty("products_url"));
        await this.clickOnAddToCartSecondProduct()
        await this.clickOnViewCartBtn();
    }


}