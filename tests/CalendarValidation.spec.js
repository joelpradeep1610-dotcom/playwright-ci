import { test , expect } from '@playwright/test';

test("Calendar Validation",async ({ page }) =>{
    

    const numberDay = '15';
    const numberMonth = '6';
    const numberYear = '2027';

    const expectedValues = [numberMonth,numberDay,numberYear];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup__input").last().click();
     await page.locator(".react-calendar__navigation__label__labelText").click();
     await page.locator(".react-calendar__navigation__label__labelText").click();
     await page.getByText(numberYear).click();
     await page.locator(".react-calendar__tile").nth(Number(numberMonth)-1).click();
     await page.locator("//abbr[text()="+numberDay+"]").click();

    // adding assertions 

    const inputs = await page.locator(".react-date-picker__inputGroup__input");

    for (let i = 0; i<expectedValues.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedValues[i]);
    }
})