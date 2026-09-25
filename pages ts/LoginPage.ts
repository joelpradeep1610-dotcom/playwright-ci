import { Page, Locator } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly cart: Locator;

  constructor(page : Page) {
    this.page = page;
    this.username = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.cart = page.locator(".card-body b");
  }

  async validLogin(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.cart.last().waitFor();
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }
}
