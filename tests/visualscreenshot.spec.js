const { test, expect } = require("@playwright/test");

// TEST 1: booking just 1 ticket should say we CAN get a refund
test("popup validation", async function ({ page }) {

 await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//  await page.goto('http://google.com');

//  await page.goBack();
//  await page.goForward();

await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator('#hide-textbox').click();
await expect(page.locator('#displayed-text')).toBeHidden();
page.on('dialog', dialog => dialog.accept());
await page.locator('#confirmbtn').click();
await page.locator('#mousehover').hover();
const framespage = page.frameLocator('#courses-iframe');

//await framespage.locator("li a[href*='lifetime-access']:visible").click();
await (framespage).getByRole('link', { name: 'NEW All Access plan' }).click();
const heading = await framespage.getByRole('heading', { name: 'Join 13,522 Happy Subscibers!' }).textContent();
console.log(heading);



});
test("screenshot", async function ({ page }) {



 await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator('#hide-textbox').click();
await page.screenshot({path: 'tests/screenshot.png',fullPage:true });
//await page.locator('#displayed-text').screenshot({path: 'tests/screenshot.png'});
await expect(page.locator('#displayed-text')).toBeHidden();

});

test("visual comparison", async function ({ page }) {

 await page.goto('https://ticketmaster.com/');
expect(await page.screenshot()).toMatchSnapshot('ticketmaster.png');
});



test.only("visual comparison using google", async function ({ page }) {

 await page.goto('https://google.com/');
expect(await page.screenshot()).toMatchSnapshot('googlelanding.png');
});
