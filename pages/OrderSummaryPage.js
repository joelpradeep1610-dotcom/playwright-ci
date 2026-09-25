export class OrderSummaryPage {
  constructor(page) {
    this.page = page;
    this.viewPageOrderID = page.locator(".col-text.-main");
  }

  async verifyOrderIDInSummaryPage() {
    return await this.viewPageOrderID.textContent();
  }
}
