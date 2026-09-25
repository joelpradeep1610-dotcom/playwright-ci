import { expect, test } from '@playwright/test';

test('auth register',async ({page})=> {

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator('#userEmail').fill('testcase21@gmail.com');
await page.locator('#userPassword').fill('Dummy_1234');
await page.locator('#login').click();
await page.locator('.card-body b').first().waitFor();
const getAlltitles = await page.locator('.card-body b').allTextContents();
console.log(getAlltitles);

    
})