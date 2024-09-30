import {test, expect, chromium} from "@playwright/test";
import ConfigurationReader from "../utils/ConfigurationReader";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";


const EXPECTED_RESULT = "Cart is empty! Click here to buy products.";

test.describe('RegistrationTest', () => {

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

    test('successfully add product to cart', async () => {
        const addedProduct = await productsPage.getFirstProductDetails();
        await productsPage.addProductToCartProcess();
        const productInCart = await cartPage.getFirstCartProductDetails();

        expect(addedProduct).toEqual(productInCart);
    })

    test('successfully remove product from cart', async () => {
        await productsPage.addProductToCartProcess();
        await cartPage.deleteProductFromCart();
       const cartIsEmptyText = await cartPage.getCartIsEmptyText();
        expect(cartIsEmptyText).toBe(EXPECTED_RESULT)
    })
});


