import { test ,expect } from '@playwright/test';

test("Network interceptor" , async ({page}) => {

    
    const emailID = "joel@joel.com";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("input#userEmail").fill(emailID);
    await page.locator("input#userPassword").fill("Password@1");
    await page.locator("input#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"}))
    await page.getByRole('button',{ name : "View"}).first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

}); 

