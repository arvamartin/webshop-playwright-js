import {chromium, expect, test} from "@playwright/test";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import ConfigurationReader from "../utils/ConfigurationReader";
import CheckOutPage from "../pages/CheckOutPage";
import PaymentPage from "../pages/PaymentPage";


const COMMENT_MESSAGE = "test comment";

const NAME_ON_CARD = "Test Tester";
const CARD_NUMBER = "012345678-98765432-00000000";
const CVC_NUMBER = "350";
const MONTH = "10";
const YEAR = "2026";


const EXPECTED_MESSAGE = "Order Placed!";
test.describe.parallel('CheckOutProcessTest', () => {

    let browser;
    let context;
    let page;
    let productsPage;
    let loginPage;
    let cartPage;
    let checkOutPage;
    let paymentPage;

    test.beforeEach(async () => {
        const playwright = await chromium.launch({headless: false});
        browser = playwright;
        context = await browser.newContext();
        page = await context.newPage();
        productsPage = new ProductsPage(page);
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);
        paymentPage = new PaymentPage(page);

        await loginPage.loginProcess(ConfigurationReader.getProperty("registered_email"), ConfigurationReader.getProperty("registered_password"));
        await productsPage.addFirstProductToCartProcess();
        await productsPage.addSecondProductToCartProcess();
    });

    test.afterAll(async () => {
        await cartPage.deleteProductFromCart();
        browser.close();
    })

    test('Total amount of products added to the cart is correct', async () => {
        await cartPage.clickOnCheckOutBtn();
        const expectedTotalPrice = await checkOutPage.getTotalCartPrice();
        const actualTotalPrice = await checkOutPage.getFinalCartPrice();
        expect(actualTotalPrice).toBe(expectedTotalPrice);
    })

    test('successful checkout process', async()=>{
        await cartPage.clickOnCheckOutBtn();
        await checkOutPage.writeMessage(COMMENT_MESSAGE);
        await checkOutPage.clickOnPlaceOrderBtn();
        await paymentPage.fillOutPaymentForm(NAME_ON_CARD, CARD_NUMBER, CVC_NUMBER, MONTH, YEAR);
        let actualConfirmMessage = await paymentPage.getOrderPlacesMessageText();
        expect(actualConfirmMessage).toContain(EXPECTED_MESSAGE)
    })

});