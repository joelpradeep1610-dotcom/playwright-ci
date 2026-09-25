export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.productsText = page.locator(".card-body");
    this.gotoCart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddToCart(productName) {
    for (let i = 0; i < (await this.productsText.count()); ++i) {
      if (
        (await this.productsText.nth(i).locator("b").textContent()) ===
        productName
      ) {
        // add to cart
        await this.productsText.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async goToCartPage() {
    await this.gotoCart.click();
  }
}
