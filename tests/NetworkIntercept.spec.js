import { test, expect, request } from "@playwright/test";
import { APIUtils } from "./Utils/APIUtils";
import { count } from "node:console";

let orderResponse;
const loginPayload = { userEmail: "joel@joel.com", userPassword: "Password@1" };
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};
const fakeResponsePayLoad = { data: [], message: "No Orders" };

test.beforeAll("API Login", async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  orderResponse = await apiUtils.createOrder(orderPayLoad);
  const token = apiUtils.getToken();
});

test("Place the order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, orderResponse.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());

      await route.fulfill({
        response,
        json: fakeResponsePayLoad,
      });
    },
  );
  const productName = "ZARA COAT 3";
  const emailID = "joel@joel.com";
  const products = page.locator(".card-body");

  await page.locator("button[routerlink*='myorders']").click();
  await page.pause();

  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  console.log(await page.locator(".mt-4.ng-star-inserted").textContent());
});
