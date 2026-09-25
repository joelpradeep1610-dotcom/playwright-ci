import { test , expect } from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const userName = "joel@joel.com";
const password = "Welcome@123";

//step 1

test.describe.configure({ mode: "parallel"});

async function login (page)
{
    await page.goto(`${BASE_URL}`);
    await page.getByPlaceholder('you@email.com').fill(userName);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    // assertions 
    await expect(page.locator("#nav-events")).toBeVisible();
}

test("Creating new event and validation", async ({ page }) => 
{
    const eventTitle = `Test Event ${Date.now()}`;
    await login(page);

    //step 2

    await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
    await page.locator("#event-title-input").fill(eventTitle);
    await page.getByPlaceholder("Describe the event…").fill("Playwright Test Event");
    await page.getByLabel("City").fill("Chennai");
    await page.locator("#category").selectOption("Sports");
    await page.getByLabel("Venue").fill("Sample address , pincoe 600052");
    await page.getByLabel("Event Date & Time").fill('2026-07-08T10:00');
    await page.locator("#total-seats").fill("50");
    await page.getByLabel("Price ($)").fill("150");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();

    // step 3

    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    const eventCardList = page.locator('[data-testid="event-card"]');
    await expect(eventCardList.first()).toBeVisible();
    const targetCard = await eventCardList.filter({hasText: eventTitle}).first();
    await expect(targetCard).toBeVisible({ timeout : 5000});
    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log(seatsBeforeBooking);

    //step 4

    await targetCard.getByTestId("book-now-btn").click();

    //step 5

    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("Joel Pradeep");
    await page.locator("#customer-email").fill("example@joel.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 9789887065");
    await page.locator(".confirm-booking-btn").click();

    //step 6

    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = (await page.locator(".booking-ref").innerText()).trim();

    //step 7

    await page.goto("https://eventhub.rahulshettyacademy.com/bookings");
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    const firstBookingCard = await page.locator("#booking-card").first();
    await expect(firstBookingCard).toBeVisible();

    const matchedRef =  await page.locator("#booking-card").filter({ hasText: bookingRef })
    
    const extractedBookingRef = await matchedRef
    .locator('.booking-ref')
    .innerText();

     const extractedEventTitle = await matchedRef
    .locator('.text-base')
    .innerText();

    const validations =
    extractedBookingRef === bookingRef &&
    extractedEventTitle === eventTitle;

    await expect(validations).toBeTruthy();

   // step 8

   await page.goto("https://eventhub.rahulshettyacademy.com/events");
   await expect(page.locator("#event-card").first()).toBeVisible();
   await expect(page.locator("#event-card").filter({ hasText : eventTitle }))
   .toBeVisible();

   const seatsAfterBooking = parseInt(await page.locator("#event-card")
   .filter({ hasText : eventTitle })
   .getByText("seats").innerText());
   
   console.log(seatsBeforeBooking);
   console.log(seatsAfterBooking);

    const seatsValidations = seatsAfterBooking === seatsBeforeBooking-1;
    await expect(seatsValidations).toBeTruthy();
});