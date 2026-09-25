import { test , expect , request } from '@playwright/test';
import { APIUtils } from './Utils/APIUtils';
import { count } from 'node:console'; 

let response;

const loginPayload = {userEmail: "joel@joel.com", userPassword: "Password@1"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
test.beforeAll("API Login", async() =>
{
   const apiContext =  await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayload);
   response = await apiUtils.createOrder(orderPayLoad);
    const token = apiUtils.getToken();

    
})  

test('Place the order',async ({page}) =>
{
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value)},
        response.token);
 
    await page.goto("https://rahulshettyacademy.com/client/");

    const productName = "ZARA COAT 3";
    const emailID = "joel@joel.com";
    const products = page.locator(".card-body");

await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const orderRows = await page.locator("tbody tr");

for (let i = 0; i< await orderRows.count(); i++ )
{
    const actualOrderID = await orderRows.nth(i).locator("th").textContent();

    if(response.orderID.includes(actualOrderID))
    {
        await orderRows.nth(i).locator(".btn-primary").click();
        break;
    }
}

const viewOrderPageID = await page.locator(".col-text.-main").textContent();
await page.pause();

console.log(viewOrderPageID);


expect(response.orderID.includes(viewOrderPageID)).toBeTruthy();

await page.pause();
})
 