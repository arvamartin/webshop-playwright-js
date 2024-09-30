import BasicMethods from "../utils/BasicMethods";
import ConfigurationReader from "../utils/ConfigurationReader";

export default class LoginPage {
    constructor(page) {
        this.consentBtn = page.locator('p.fc-button-label:has-text("Consent")');
        this.emailInput = page.locator("input[data-qa='login-email']");
        this.passwordInput = page.locator("input[data-qa='login-password']");
        this.loginBtn = page.locator("button[data-qa='login-button']");
        this.logoutBtn = page.locator("a[href='/logout']");
        this.loginErrorMessage = page.locator("p:has-text('Your email or password is incorrect!')")
        this.page = page;
    }

    async loginProcess(email, password) {
        await BasicMethods.navigate(this.page, ConfigurationReader.getProperty("login_url"));
        await this.acceptCookie();
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickOnLoginBtn();
    }

    async acceptCookie() {
        await this.consentBtn.click();
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickOnLoginBtn() {
        await this.loginBtn.click();
    }

    async getLogoutBtn() {
        return await this.logoutBtn;
    }

    async getLoginErrorMessage(){
        return this.loginErrorMessage
    }
}
