import { test ,expect } from '@playwright/test';

test("Popup Validations", async ({ page })=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
   
    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.accept());
    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.getByRole('link', { name : "All Access plan"}).click();
    const subCountText = await framePage.locator(".text h2").textContent();
    console.log(subCountText.split(" ")[1]);

})