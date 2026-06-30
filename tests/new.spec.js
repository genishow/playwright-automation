const {test, expect} = require ('@playwright/test');




test('test2', async function({page}){

await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
await page.getByLabel('Gender').selectOption('Female');
await page.getByPlaceholder('password').fill('geni123.');
await page.getByRole('button', {name:'Submit'}).click();
const success = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
await page.getByRole('link', {name: "Shop"}).click();
await expect(page.locator('.row').first()).toBeVisible(); 


await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button',{name:'Add '}).click();

});


