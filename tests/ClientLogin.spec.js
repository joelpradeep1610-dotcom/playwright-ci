import { test , expect } from '@playwright/test';
import { count } from 'node:console';

test('Login Authentication',async ({page}) =>
{
    const productName = "ZARA COAT 3";
    const emailID = "joel@joel.com";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("input#userEmail").fill(emailID);
    await page.locator("input#userPassword").fill("Password@1");
    await page.locator("input#login").click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").last().waitFor();
//    console.log(await page.locator(".card-body b").allTextContents());
//    await page.pause();
    for(let  i = 0; i < await products.count(); ++i)
    {
     if (await products.nth(i).locator("b").textContent() === productName)
     {
        // add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
     }
    }
   // adding asssetions to check if product is added 
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
   expect(bool).toBeTruthy();
   
   // checkout product 
   await page.locator("[type='button']").last().click();

   await page.locator(".input.ddl").first().selectOption("07");
   await page.locator(".input.ddl").last().selectOption("31");

    const inputText = await page.locator("input.input.txt");

    const inputs = page.locator("input.input.txt");


 const field = page.locator(".field").filter({
    hasText: "CVV Code "
});

await field.locator("input").fill("123");

   const field2 = page.locator(".field").filter({
    hasText: "Name on Card "
});

await field2.locator("input").fill("Joel Pradeep");


   await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay : 100});
   
   const countryList = page.locator(".ta-results");

   await countryList.first().waitFor();

   const optionsCount = await countryList.locator("button").count();
   
   for (let i = 0; i < await optionsCount; i++)

   {
        const text = await countryList.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
         await countryList.locator("button").nth(i).click();
        break;
        }
        
   }
  
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailID);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID =  await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);


await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const orderRows = await page.locator("tbody tr");

for (let i = 0; i< await orderRows.count(); i++ )
{
    const actualOrderID = await orderRows.nth(i).locator("th").textContent();

    if(orderID.includes(actualOrderID))
    {
        await orderRows.nth(i).locator(".btn-primary").click();
        break;
    }
}

const viewOrderPageID = await page.locator(".col-text.-main").textContent();
console.log(viewOrderPageID);


expect(orderID.includes(viewOrderPageID)).toBeTruthy();

await page.pause();
})