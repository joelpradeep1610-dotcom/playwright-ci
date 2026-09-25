export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.cart = page.locator(".card-body b");
  }

  async validLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.cart.last().waitFor();
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }
}
