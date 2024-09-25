import BasicMethods from "../utils/BasicMethods";
import ConfigurationReader from "../utils/ConfigurationReader";


export default class RegistrationPage{
    constructor(page){
        this.consentBtn = page.locator('p.fc-button-label:has-text("Consent")');
        this.nameInput = page.locator("input[name='name']");
        this.emailInput = page.locator("input[data-qa='signup-email']");
        this.signUpBtn = page.locator("button[data-qa='signup-button']");
        this.title = page.locator("input[value='Mr']");
        this.password = page.locator("input[name='password']");
        this.daysSelect = page.locator('select[data-qa="days"]');
        this.monthsSelect = page.locator('select[data-qa="months"]');
        this.yearsSelect = page.locator('select[data-qa="years"]');

        this.firstNameInput = page.locator("input[name='first_name']");
        this.lastNameInput = page.locator("input[name='last_name']");
        this.address1Input = page.locator("input[name='address1']");
        this.countrySelect = page.locator('select[data-qa="country"]');
        this.stateInput = page.locator("input[name='state']");
        this.cityInput = page.locator("input[name='city']");
        this.zipCodeInput = page.locator("input[name='zipcode']");
        this.mobileNumberInput = page.locator("input[name='mobile_number']");
        this.createAccountBtn = page.locator("button[data-qa='create-account']");
        this.accountCreatedElement = page.locator('b:has-text("Account Created!")');
        this.page = page;
    }

    async registrationProcess(name, email, password, day, month, year, firstName, lastName, address, country, state, city, zipCode, 
        mobileNumber){
        await BasicMethods.navigate(this.page, ConfigurationReader.getProperty("sign_up_url"));
        await this.acceptCookie();
        await this.enterName(name)
        await this.enterEmail(email)
        await this.clickOnSignUpBtn();
        await this.chooseTitle();
        await this.enterPassword(password);
        await this.selectDateOfBirt(day, month, year)
        await this.enterFirstAndLastName(firstName, lastName)
        await this.enterFullAddress(address, country, state, city, zipCode)
        await this.enterMobileNumber(mobileNumber)
        await this.clickOnCreateAcoount();

    }

    async acceptCookie(){
        await this.consentBtn.click();
    }

    async enterName(name){
        await this.nameInput.fill(name)
    }

    async enterEmail(email){
        await this.emailInput.fill(email)
    }

    async clickOnSignUpBtn(){
        await this.signUpBtn.click();
    }

    async chooseTitle(){
        await this.title.click();
    }

    async enterPassword(password){
        await this.password.fill(password);
    }

    async selectDateOfBirt(day, month, year){
        await this.selectDay(day);
        await this.selectMonth(month);
        await this.selectYear(year);
    }

    async selectDay(day){
        await this.daysSelect.selectOption(day);
    }

    async selectMonth(month){
        await this.monthsSelect.selectOption(month);
    }

    async selectYear(year){
        await this.yearsSelect.selectOption(year);
    }

    async enterFirstAndLastName(firstName, lastName){
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
    }

    async enterFirstName(firstName){
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName){
        await this.lastNameInput.fill(lastName);
    }

    async enterFullAddress(address, country, state, city, zipCode){
        await this.enterAddress(address);
        await this.selectCountry(country)
        await this.enterState(state);
        await this.enterCity(city)
        await this.enterZipCode(zipCode);
    }

    async enterAddress(address){
        await this.address1Input.fill(address)
    }

    async selectCountry(country){
        await this.countrySelect.selectOption(country);
    }

    async enterState(state){
        await this.stateInput.fill(state);
    }

    async enterCity(city){
        await this.cityInput.fill(city);
    }

    async enterZipCode(zipCode){
        await this.zipCodeInput.fill(zipCode);
    }

    async enterMobileNumber(mobileNumber){
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async clickOnCreateAcoount(){
        await this.createAccountBtn.click();
    }

    async getAccountCreatedElementText(){
        return await this.accountCreatedElement.textContent();
    }

}