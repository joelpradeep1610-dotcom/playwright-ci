export class ProductsPage {
    constructor(page)
    {
        this.page = page;
        this.goToCheckOut = page.locator("[type='button']");
    }

     verifyProductName(productName)
    {
        return this.page.locator(`h3:has-text("${productName}")`);
    }

    async goToCheckOutPage()
    {
        await this.goToCheckOut.last().click();
    }
}