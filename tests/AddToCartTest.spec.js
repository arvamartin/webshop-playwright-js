import {test, expect, chromium} from "@playwright/test";
import ConfigurationReader from "../utils/ConfigurationReader";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";


const EXPECTED_RESULT = "Cart is empty!";

test.describe('AddToCartTest', () => {

    let browser;
    let context;
    let page;
    let productsPage;
    let loginPage;
    let cartPage;

    test.beforeEach(async () => {
        const playwright = await chromium.launch({headless: false});
        browser = playwright;
        context = await browser.newContext();
        page = await context.newPage();
        productsPage = new ProductsPage(page);
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);

        await loginPage.loginProcess(ConfigurationReader.getProperty("registered_email"), ConfigurationReader.getProperty("registered_password"));
    });

    test.afterEach(async () => {
        await cartPage.deleteProductFromCart();
        browser.close();
    })

    test('successfully add product to cart', async () => {
        const addedProduct = await productsPage.getFirstProductDetails();
        await productsPage.addFirstProductToCartProcess();
        const productInCart = await cartPage.getAllCartProductsDetails();

        expect(productInCart).toEqual(addedProduct);
    })

    test('successfully remove product from cart', async () => {
        await productsPage.addFirstProductToCartProcess();
        await cartPage.deleteProductFromCart();
        const cartIsEmptyText = await cartPage.getCartIsEmptyText();
        expect(cartIsEmptyText).toContain(EXPECTED_RESULT)
    })

    test('successfully add multiple products to cart', async () => {
        await productsPage.addFirstProductToCartProcess();
        await productsPage.addSecondProductToCartProcess();
        const productsInCart = await cartPage.getAllCartProductsDetails();
        expect(productsInCart.length).toBeGreaterThan(1);
    })
});


