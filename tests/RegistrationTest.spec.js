import { test, expect, chromium } from "@playwright/test";
import ConfigurationReader from "../utils/ConfigurationReader";
import RegistrationPage from "../pages/RegistrationPage";



test.describe.parallel('RegistrationTest', () => {

    let browser;
    let context;
    let page;
    let registrationPage;


    test.beforeEach(async () => {
        const playwright = await chromium.launch({ headless: false });
        browser = playwright;
        context = await browser.newContext();
        page = await context.newPage();
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

    test('unsuccessful registration with invalid credentials', async () => {
        const invalid_username_to_register = ConfigurationReader.getProperty("invalid_username_to_register");
        const invalid_email_to_register = ConfigurationReader.getProperty("invalid_email_to_register");
        const invalid_password_to_register = ConfigurationReader.getProperty("invalid_password_to_register");
        const invalid_day_to_register = ConfigurationReader.getProperty("invalid_day_to_register");
        const invalid_month_to_register = ConfigurationReader.getProperty("invalid_month_to_register");
        const invalid_year_to_register = ConfigurationReader.getProperty("invalid_year_to_register");
        const invalid_first_name_to_register = ConfigurationReader.getProperty("invalid_first_name_to_register");
        const invalid_last_name_to_register = ConfigurationReader.getProperty("invalid_last_name_to_register");
        const invalid_address_to_register = ConfigurationReader.getProperty("invalid_address_to_register");
        const invalid_country_to_register = ConfigurationReader.getProperty("invalid_country_to_register");
        const invalid_state_to_register = ConfigurationReader.getProperty("invalid_state_to_register");
        const invalid_city_to_register = ConfigurationReader.getProperty("invalid_city_to_register");
        const invalid_zipcode_to_register = ConfigurationReader.getProperty("invalid_zipcode_to_register");
        const invalid_mobile_number_to_register = ConfigurationReader.getProperty("invalid_mobile_number_to_register");

        await registrationPage.registrationProcess(
            invalid_username_to_register,
            invalid_email_to_register,
            invalid_password_to_register,
            invalid_day_to_register,
            invalid_month_to_register,
            invalid_year_to_register,
            invalid_first_name_to_register,
            invalid_last_name_to_register,
            invalid_address_to_register,
            invalid_country_to_register,
            invalid_state_to_register,
            invalid_city_to_register,
            invalid_zipcode_to_register,
            invalid_mobile_number_to_register
        );

        const actualResult = await registrationPage.getAccountCreatedElementText();
        expect(actualResult).not.toBe("Account Created!");
    })


    test('unsuccessful registration with invalid email format', async () => {
        const username_to_register = ConfigurationReader.getProperty("username_to_register");
        const email_in_invalid_format = ConfigurationReader.getProperty("email_in_invalid_format");

        await registrationPage.invalidRegistrationProcess(username_to_register, email_in_invalid_format);

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Szerepeltesse a "@" jelet az e-mail-címben');
            await dialog.dismiss();
        });

    });

    test('unsuccessful registration with duplicate email', async () => {
        const username_to_register = ConfigurationReader.getProperty("username_to_register");
        const email_to_register = ConfigurationReader.getProperty("email_to_register"); 
    
        await registrationPage.invalidRegistrationProcess(username_to_register, email_to_register);
        
        const emailErrorMessageElement = await registrationPage.getEmailFieldErrorMessage();
        const isErrorMessageVisible = await emailErrorMessageElement.isVisible(); 
        expect(isErrorMessageVisible).toBe(true);
    });
    


})