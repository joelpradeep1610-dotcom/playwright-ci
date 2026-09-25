import { test } from '@playwright/test'
import { LoginPage } from './LoginPage';


test("POM Example" , async ({ page }) => 
{

await page.goto("example.com");

const loginPage = new LoginPage(page);


await loginPage.login("joel","password");
})