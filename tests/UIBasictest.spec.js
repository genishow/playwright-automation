const {test, expect} = require ('@playwright/test');




test('ui control test',async function({browser})
{
  
   const context = await browser.newContext();
   const page =await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

await page.locator('#username').fill(" rahulshettyacademy");
await page.locator('#password').fill("Learning@830$3mK2");
await page.locator('.radiotextsty').last().click();
await page.locator('#okayBtn').click();
await page.locator("select.form-control").selectOption("consult");
await expect (page.locator('.radiotextsty').last()).toBeChecked();

await page.locator('#terms').click();
await expect (page.locator('#terms')).toBeChecked();
await page.locator('#terms').uncheck();
expect(await page.locator('#terms').isChecked()).toBeFalsy();

const doclink =page.locator('[href*="documents"]');
await expect (doclink).toHaveAttribute("class","blinkingText");

//await page.pause();
//await page.locator('[name="signin"]').click();


});