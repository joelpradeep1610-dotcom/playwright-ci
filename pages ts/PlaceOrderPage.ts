import { Page, Locator } from '@playwright/test';

export class PlaceOrderPage {

  readonly page : Page;
  readonly expiryDate : Locator;
  readonly cvvField : Locator;
  readonly cvvInput : Locator;
  readonly nameField : Locator;
  readonly nameInput : Locator;
  readonly selectCountry : Locator;
  readonly countryList : Locator;
  readonly userName : Locator;
  readonly placeOrderButton : Locator;

  constructor(page : Page) {
    this.page = page;
    this.expiryDate = page.locator(".input.ddl");
    this.cvvField = page.locator(".field").filter({
      hasText: "CVV Code ",
    });
    this.cvvInput = this.cvvField.locator("input");

    this.nameField = page.locator(".field").filter({
      hasText: "Name on Card ",
    });
    this.nameInput = this.nameField.locator("input");

    this.selectCountry = page.locator("[placeholder*='Select Country']");
    this.countryList = page.locator(".ta-results");
    this.userName = page.locator(".user__name [type='text']");
    this.placeOrderButton = page.locator(".action__submit");
  }

  async enterExpiryDate(month : string, day : string) {
    await this.expiryDate.first().selectOption(month);
    await this.expiryDate.last().selectOption(day);
  }

  async enterCVVCode(cvv : string) {
    await this.cvvInput.fill(cvv);
  }

  async enterCardName(name : string) {
    await this.nameInput.fill(name);
  }
  async enterCountry(country : string, countryName : string) {
    await this.selectCountry.pressSequentially(country, { delay: 100 });

    await this.countryList.first().waitFor();

    const optionsCount = await this.countryList.locator("button").count();

    for (let i = 0; i < (await optionsCount); i++) {
      const text : any = await this.countryList
        .locator("button")
        .nth(i)
        .textContent();
      if (text.trim() === countryName) {
        await this.countryList.locator("button").nth(i).click();
        break;
      }
    }
  }

  checkUsername() {
    return this.userName;
  }

  async placeOrder()
  {
    await this.placeOrderButton.click();
  }
}
