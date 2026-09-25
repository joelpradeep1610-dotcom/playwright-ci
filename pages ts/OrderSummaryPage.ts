import { Page, Locator } from '@playwright/test';

export class OrderSummaryPage {

    readonly page : Page;
    readonly viewPageOrderID : Locator;

  constructor(page : Page) {
    this.page = page;
    this.viewPageOrderID = page.locator(".col-text.-main");
  }

  async verifyOrderIDInSummaryPage() {
    return await this.viewPageOrderID.textContent();
  }
}
