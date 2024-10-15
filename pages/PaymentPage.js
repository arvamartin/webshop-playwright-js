

export default class PaymentPage{
    constructor(page) {
        this.nameOnCardInput = page.locator("input[name='name_on_card']");
        this.CardNumberInput = page.locator("input[name='card_number']");
        this.cvcInput = page.locator("input[data-qa='cvc']");
        this.expirationInput = page.locator("input[data-qa='expiry-month']");
        this.expiryYearInput = page.locator("input[data-qa='expiry-year']");
        this.payAndConfirmBtn = page.locator("button[id='submit']");
        this.orderPlacedMessage = page.locator("h2[data-qa='order-placed']");
    }

    async fillOutPaymentForm(nameOnCard, cardNumber, cvc, month, year){
        await this.fillNameOnCardInput(nameOnCard)
        await this.fillCardNumberInput(cardNumber);
        await this.fillCvcInput(cvc)
        await this.fillExpirationInput(month)
        await this.fillExpiryYearInput(year)
        await this.clickOnPayAndConfirmBtn();
    }

    async fillNameOnCardInput(nameOnCard){
        await this.nameOnCardInput.fill(nameOnCard);
    }

    async fillCardNumberInput(cardNumber){
        await this.CardNumberInput.fill(cardNumber);
    }

    async fillCvcInput(cvc){
        await this.cvcInput.fill(cvc);
    }

    async fillExpirationInput(month){
        await this.expirationInput.fill(month);
    }

    async fillExpiryYearInput(year){
        await this.expiryYearInput.fill(year);
    }

    async clickOnPayAndConfirmBtn(){
        await this.payAndConfirmBtn.click();
    }

    async getOrderPlacesMessageText(){
       return await this.orderPlacedMessage.textContent();
    }

}