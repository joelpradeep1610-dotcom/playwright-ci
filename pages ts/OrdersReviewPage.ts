import { Page, Locator } from '@playwright/test';

export class OrdersReviewPage {

  readonly page : Page;
  readonly thankYouText : Locator;
  readonly orderID : Locator;
  readonly OrderListPage : Locator;

  constructor(page : Page) {
    this.page = page;
    this.thankYouText = page.locator(".hero-primary");
    this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
    this.OrderListPage = page.locator("button[routerlink*='myorders']");
  }

  verifyOrderCreation() {
    return this.thankYouText;
  }
  async getOrderID() {
    const pageOrderID = await this.orderID.textContent();
    console.log(pageOrderID);

    return pageOrderID;
  }

  async goToOrderListPage() {
    await this.OrderListPage.click();
  }
}
