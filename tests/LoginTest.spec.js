import { expect, chromium, test } from "@playwright/test";
import ConfigurationReader from "../utils/ConfigurationReader";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

test.describe.parallel('RegistrationTest', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let homePage;

    test.beforeEach(async () => {
        const playwright = await chromium.launch({ headless: false });
        browser = playwright;
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
    });


    test('successful login with valid credentials', async () => {
        await loginPage.loginProcess(ConfigurationReader.getProperty("registered_email"), ConfigurationReader.getProperty("registered_password"));
        const logoutBtn = await homePage.getLogoutBtn();
        const isLogoutBtnVisible = await logoutBtn.isVisible();
        expect(isLogoutBtnVisible).toBe(true);
    });

    test('unsuccessful login with invalid credentials', async()=>{
        await loginPage.loginProcess(ConfigurationReader.getProperty("invalid_email"), ConfigurationReader.getProperty("invalid_password"));
        const errorMessage = await loginPage.getLoginErrorMessage()
        const isErrorMessageVisible = await errorMessage.isVisible();
        expect(isErrorMessageVisible).toBe(true);
    })
    
});
