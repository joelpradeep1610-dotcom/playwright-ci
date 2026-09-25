export class OrderListPage {
  constructor(page) {
    this.page = page;
    this.tableBody = page.locator("tbody");
    this.orderRows = page.locator("tbody tr");
  }

  async findOrderIDAndViewSummary(orderID) {
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
