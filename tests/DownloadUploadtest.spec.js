import { test, route } from '@playwright/test';

test("download a file" , async ({ page }) =>
{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.locator('.button').click();
    const download = await downloadPromise;
    const path = './' + download.suggestedFilename();
    await download.saveAs(path);    
})

await page.route('**/api/users',async (route) =>
{
    await route.fullfill({
        status : 200,
        body : JSON.stringify([{id : 1, name: "joel"}])
    });
})

const eventNumber = `Event Name ${Date.now()}`;
