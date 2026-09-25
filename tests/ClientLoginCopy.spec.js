import { test , expect } from '@playwright/test';
import { count } from 'node:console';

test('Login Authentication',async ({page}) =>
{
    const productName = "ZARA COAT 3";
    const emailID = "joel@joel.com";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(emailID);
    await page.getByPlaceholder("enter your passsword").fill("Password@1");
    await page.getByRole("button",{name : "Login"}).click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").last().waitFor();

    await page.locator(".card-body").filter({ hasText : "ZARA COAT 3"})
    .getByRole("button",{name : "Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name : "Cart"}).click();

   // adding asssetions to check if product is added 
   await page.locator("div li").first().waitFor();
   

   // checkout product 
    await page.getByRole("button", {name : "Checkout"}).click();

//    await page.locator(".input.ddl").first().selectOption("07");
//    await page.locator(".input.ddl").last().selectOption("31");

//     const inputText = await page.locator("input.input.txt");

//     const inputs = page.locator("input.input.txt");


//  const field = page.locator(".field").filter({
//     hasText: "CVV Code "
// });

// await field.locator("input").fill("123");

//    const field2 = page.locator(".field").filter({
//     hasText: "Name on Card "
// });

// await field2.locator("input").fill("Joel Pradeep");


await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay : 100});   
await page.getByRole("button", {name : "India"}).nth(1).click()
await page.getByText("PLACE ORDER").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();



// await page.locator("button[routerlink*='myorders']").click();
// await page.locator("tbody").waitFor();
// const orderRows = await page.locator("tbody tr");

// for (let i = 0; i< await orderRows.count(); i++ )
// {
//     const actualOrderID = await orderRows.nth(i).locator("th").textContent();

//     if(orderID.includes(actualOrderID))
//     {
//         await orderRows.nth(i).locator(".btn-primary").click();
//         break;
//     }
// }

// const viewOrderPageID = await page.locator(".col-text.-main").textContent();
// console.log(viewOrderPageID);


// expect(orderID.includes(viewOrderPageID)).toBeTruthy();

await page.pause();
})  