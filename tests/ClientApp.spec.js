import { expect, test } from '@playwright/test';

test('my first test',async ({page})=> {

    const userName = page.locator('#username');
    const signIn = page.locator("[style*='block']");
    const password = page.locator('#password');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator('#username').fill("rahulshetty");
    await page.locator('#password').fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    
    await password.fill("");
    await password.fill("rahulshettyacademy");
    await signIn.click();

});

test("UI Controls",async ({page}) => 
{
    const userName = page.locator('#username');
    const signIn = page.locator("[style*='block']");
    const password = page.locator('#password');
    const dropDown = page.locator("select.form-control")
    const documentLink = page.locator("[href*=documents-request]")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await page.locator(".radiotextsty").last().click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("button#okayBtn").click();
    await dropDown.selectOption("consult");
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');



    // await page.pause(); 
    // await page.locator('#signInBtn').click();


} )

test.only("Handling child window", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*=documents-request]");
    const [newPage] =  await Promise.all([context.waitForEvent('page'),documentLink.click()]);
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());
    await page.pause();

    



})