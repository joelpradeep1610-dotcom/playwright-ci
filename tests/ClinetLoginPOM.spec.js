import { test, expect } from "@playwright/test";
import { count } from "node:console";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashBoardPage";
import { ProductsPage } from "../pages/ProductsPage";
import { PlaceOrderPage } from "../pages/PlaceOrderPage";
import { OrdersReviewPage } from "../pages/OrdersReviewPage";
import { OrderListPage } from "../pages/OrdersListPage";
import { OrderSummaryPage } from "../pages/OrderSummaryPage";
import testData from '../Utils/ClientLoginTestData.json';

for(const data of testData)
{
test(`Login Authentication for ${data.productName}`, async ({ page }) => {

  // login page
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);

  // dashboard page
  const dashBoardPage = new DashboardPage(page);
  await dashBoardPage.searchProductAddToCart(data.productName);
  await dashBoardPage.goToCartPage();

  // cart page to check if product name is visible
  const productsPage = new ProductsPage(page);
  await expect(productsPage.verifyProductName(data.productName)).toBeVisible();
  await productsPage.goToCheckOutPage();

  //Order page to fill in details
  const placeOrderPage = new PlaceOrderPage(page);
  await placeOrderPage.enterExpiryDate(data.expiryDate[0], data.expiryDate[1]);
  await placeOrderPage.enterCVVCode(data.cvvCode);
  await placeOrderPage.enterCardName(data.cardName);
  await placeOrderPage.enterCountry(data.countrySequence, data.countryName);
  await expect(placeOrderPage.checkUsername().first()).toHaveText(data.username);
  await placeOrderPage.placeOrder();

  await page.pause();

  // review the order and get orderID
  const ordersReviewPage = new OrdersReviewPage(page);
  await expect(ordersReviewPage.verifyOrderCreation()).toHaveText(
    " Thankyou for the order. ",
  );
  const orderID = await ordersReviewPage.getOrderID();
  await ordersReviewPage.goToOrderListPage();

  // verify if Order ID is present in the OrderList page
  const orderListPage = new OrderListPage(page);
  await orderListPage.findOrderIDAndViewSummary(orderID);

  // verify OrderID present in Summary Page is same as the Order Id we stored

  const orderSummaryPage = new OrderSummaryPage(page);
  const orderIDInPage = await orderSummaryPage.verifyOrderIDInSummaryPage();

  expect(orderID.includes(orderIDInPage)).toBeTruthy();
});
}