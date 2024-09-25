import { test, expect, chromium } from "@playwright/test";
import ConfigurationReader from "../utils/ConfigurationReader";
import registrationPage from "../pages/RegistrationPage";
import RegistrationPage from "../pages/RegistrationPage";

test.describe('RegistrationTest', () => {


    let browser;
    let context;
    let page;
    let registrationPage;

    test.beforeAll(async () => {
        const playwright = await chromium.launch({ headless: false });
        browser = playwright;
        context = await browser.newContext();
        page = await context.newPage();

    });

    test.beforeEach(async () => {
        registrationPage = new RegistrationPage(page);
    });
    

    test('successful registration with valid credentials', async () => {
        const username_to_register = ConfigurationReader.getProperty("username_to_register");
        const email_to_register = ConfigurationReader.getProperty("email_to_register");
        const password_to_register = ConfigurationReader.getProperty("password_to_register");
        const day_to_register = ConfigurationReader.getProperty("day_to_register");
        const month_to_register = ConfigurationReader.getProperty("month_to_register");
        const year_to_register = ConfigurationReader.getProperty("year_to_register");
        const first_name_to_register = ConfigurationReader.getProperty("first_name_to_register");
        const last_name_to_register = ConfigurationReader.getProperty("last_name_to_register");
        const address_to_register = ConfigurationReader.getProperty("address_to_register");
        const country_to_register = ConfigurationReader.getProperty("country_to_register");
        const state_to_register = ConfigurationReader.getProperty("state_to_register");
        const city_to_register = ConfigurationReader.getProperty("city_to_register");
        const zipcode_to_register = ConfigurationReader.getProperty("zipcode_to_register");
        const mobile_number_to_register = ConfigurationReader.getProperty("mobile_number_to_register");

        await registrationPage.registrationProcess(
            username_to_register,
            email_to_register,
            password_to_register,
            day_to_register,
            month_to_register,
            year_to_register,
            first_name_to_register,
            last_name_to_register,
            address_to_register,
            country_to_register,
            state_to_register,
            city_to_register,
            zipcode_to_register,
            mobile_number_to_register
        );

        const actualResult = await registrationPage.getAccountCreatedElementText();
        expect(actualResult).toBe("Account Created!");
    });


})