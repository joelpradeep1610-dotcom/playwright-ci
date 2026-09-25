import { test , expect } from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const userName = "joel@joel.com";
const password = "Welcome@123";

async function login(page) {
        await page.goto(`${BASE_URL}`);
        await page.getByPlaceholder('you@email.com').fill(userName);
        await page.getByLabel('Password').fill(password);
        await page.locator('#login-btn').click();
        // assertions 
        await expect(page.locator("#nav-events")).toBeVisible();
}

    //step 1
test("Booking first event with 1 ticket", async ({page}) =>
{
    // const eventTitle = `Test Event ${Date.now()}`;
    await login(page);

    // step 2

    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    await page.locator("[data-testid = 'event-card']")
    .first()
    .locator("[data-testid='book-now-btn']").click();

    await page.getByPlaceholder("Your full Name").fill("Joel Pradeep");
    await page.getByPlaceholder("you@email.com").fill("joel@joel.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 9884568876");
    await page.getByRole('button', {name : 'Confirm Booking'}).click();

    // step 3
     await page.getByRole('button', {name : 'View My Bookings'}).click();
     await expect(page).toHaveURL(/.*bookings/);
     await page.getByRole('button', {name : 'View Details'}).first().click();
     await expect(page.getByText('Booking Information')).toBeVisible();

     //step 4
     const h1Title = await page.locator(".text-2xl.font-bold.text-gray-900").innerText();
     const eventTitle = await page.locator(".text-sm.text-sm.font-medium.text-gray-900.text-right")
     .nth(0).innerText();
     const result = h1Title.charAt(0) === eventTitle.charAt(0);
     await expect(result).toBeTruthy();
     console.log(h1Title);
     console.log(eventTitle);

     // step 5

     await page.locator("#check-refund-btn").click();
     await expect(page.locator("#refund-spinner")).toBeVisible();
     await expect(page.locator("#refund-spinner")).toBeHidden({ timeout : 6000});


    // step 6

    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.getByText('Eligible for refund')).toBeVisible();
    await expect(page.getByText('Single-ticket bookings qualify for a full refund.')).toBeVisible(); 



})

test("Booking event with multiple tickets" ,async ({ page }) => {

    // step 1

    await login(page);

        // step 2

    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    await page.locator("[data-testid = 'event-card']")
    .first()
    .locator("[data-testid='book-now-btn']").click();

    await page.getByRole('button',{ name : '+'}).dblclick();
    await page.getByPlaceholder("Your full Name").fill("Joel Pradeep");
    await page.getByPlaceholder("you@email.com").fill("joel@joel.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 9884568876");
    await page.getByRole('button', {name : 'Confirm Booking'}).click();

    // step 3

    await page.getByRole('button', {name : 'View My Bookings'}).click();
     await expect(page).toHaveURL(/.*bookings/);
     await page.getByRole('button', {name : 'View Details'}).first().click();
     await expect(page.getByText('Booking Information')).toBeVisible();

     // step 4

    const h1Title = await page.locator(".text-2xl.font-bold.text-gray-900").innerText();
     const eventTitle = await page.locator(".text-sm.text-sm.font-medium.text-gray-900.text-right")
     .nth(0).innerText();
     const result = h1Title.charAt(0) === eventTitle.charAt(0);
     await expect(result).toBeTruthy();
     console.log(h1Title);
     console.log(eventTitle);

     // step 5

    await page.locator("#check-refund-btn").click();
     await expect(page.locator("#refund-spinner")).toBeVisible();
     await expect(page.locator("#refund-spinner")).toBeHidden({ timeout : 6000});

     // step 6

     await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.getByText('Not eligible for refund')).toBeVisible();
    await expect(page.getByText('Group bookings (3 tickets) are non-refundable.')).toBeVisible(); 


})