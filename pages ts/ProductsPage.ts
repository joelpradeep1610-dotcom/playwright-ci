import { Page ,Locator } from '@playwright/test';
export class ProductsPage {

    readonly page : Page;
    readonly goToCheckOut : Locator;

    constructor(page : Page)
    {
        this.page = page;
        this.goToCheckOut = page.locator("[type='button']");
    }

     verifyProductName(productName : string)
    {
        return this.page.locator(`h3:has-text("${productName}")`);
    }

    async goToCheckOutPage()
    {
        await this.goToCheckOut.last().click();
    }
}