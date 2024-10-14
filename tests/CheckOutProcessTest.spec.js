import {chromium, expect, test} from "@playwright/test";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import ConfigurationReader from "../utils/ConfigurationReader";
import CheckOutPage from "../pages/CheckOutPage";


test.describe('CheckOutProcessTest', () => {

    let browser;
    let context;
    let page;
    let productsPage;
    let loginPage;
    let cartPage;
    let checkOutPage;

    test.beforeEach(async () => {
        const playwright = await chromium.launch({headless: false});
        browser = playwright;
        context = await browser.newContext();
        page = await context.newPage();
        productsPage = new ProductsPage(page);
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);

        await loginPage.loginProcess(ConfigurationReader.getProperty("registered_email"), ConfigurationReader.getProperty("registered_password"));
        await productsPage.addFirstProductToCartProcess();
        await productsPage.addSecondProductToCartProcess();
    });

    test.afterEach(async () => {
        await cartPage.deleteProductFromCart();
        browser.close();
    })

    test('Total amount of products added to the cart is correct', async () => {
        await cartPage.clickOnCheckOutBtn();
        const expectedTotalPrice = await checkOutPage.getTotalCartPrice();
        const actualTotalPrice = await checkOutPage.getFinalCartPrice();
        expect(actualTotalPrice).toBe(expectedTotalPrice);
    })

});