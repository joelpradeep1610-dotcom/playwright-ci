import { Page, Locator } from "@playwright/test";

export class OrderListPage {

  readonly page : Page;
  readonly tableBody : Locator;
  readonly orderRows : Locator;

  constructor(page : Page) {
    this.page = page;
    this.tableBody = page.locator("tbody");
    this.orderRows = page.locator("tbody tr");
  }

  async findOrderIDAndViewSummary(orderID : any) {
    await this.tableBody.waitFor();
    for (let i = 0; i < (await this.orderRows.count()); i++) {
      const actualOrderID = await this.orderRows
        .nth(i)
        .locator("th")
        .textContent();

      if (orderID.includes(actualOrderID)) {
        await this.orderRows.nth(i).locator(".btn-primary").click();
        break;
      }
    }
  }
}
