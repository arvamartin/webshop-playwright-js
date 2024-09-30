
export default class HomePage{
    constructor(page) {
        this.logoutBtn = page.locator("a[href='/logout']");
    }

    async getLogoutBtn() {
        return await this.logoutBtn;
    }


}