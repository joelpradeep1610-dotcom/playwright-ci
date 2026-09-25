import { Page ,Locator } from '@playwright/test';

export class DashboardPage {

  readonly page : Page;
  readonly productsText : Locator;
  readonly gotoCart : Locator;

  constructor(page : Page) {
    this.page = page;
    this.productsText = page.locator(".card-body");
    this.gotoCart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddToCart(productName : string) {
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
