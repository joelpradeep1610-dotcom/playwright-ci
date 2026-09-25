import { test } from '@playwright/test'

const [Download] = await Promise.all([
     page.waitForEvent('download'),
     page.getByRole("button",{ name : "Download"}).click()
]);

const [Download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button',{ name : "Download"}).click()
]);

await Download.save('path');