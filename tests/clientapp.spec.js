const {test, expect} = require ('@playwright/test');


test('test1', async function({browser}){
const context = await browser.newContext();
const page = await context.newPage();
const product = await page.locator('.card-body');
const zara = 'ZARA COAT 3';

await page.goto('https://rahulshettyacademy.com/client/')
console.log(await page.title());


    await page.locator('#userEmail').fill('genishow21@gmail.com');
await page.locator('#userPassword').fill('Geni123.');
await page.locator('#login').click();
await page.locator('.card-body b').first().waitFor();
await page.waitForLoadState('networkidle');
const p2 = await page.locator('.card-body b').allTextContents();

console.log(p2[1]);

// find the card that has "ZARA COAT 3" and click its Add To Cart
await page.locator('.card-body')
    .filter({ hasText: zara })
    .locator('text=Add To Cart')
    .click();
const Cart = 'Cart';
await page.locator('.btn.btn-custom')
        .filter({hasText:Cart})
        .locator('text=Cart')
        .click();
        await page.locator('.cartWrap').first();
      const zaracoat = await page.locator('.cartSection h3').textContent();
      console.log('added cloth in the cart',zaracoat);
      await expect(page.locator('.cartSection h3')).toHaveText("ZARA COAT 3");
      await page.locator('button:has-text("Checkout")').click();
      const country = await page.locator("input[placeholder*='Country']").pressSequentially('ind');

      await page.locator('span')
      .filter({ hasText: 'India' })
      await page.getByText('India',{exact:true})
      .click();
await expect(page.getByText('genishow21@gmail.com', { exact: true })).toBeVisible();
await page.locator('.action__submit').click();
await expect (page.getByText('Thankyou for the order.', {exact:true})).toBeVisible();

const orderid = await page.locator('label').filter({ hasText: '|' }).textContent();        
console.log(orderid);

await page.locator('button:has-text("ORDERS")').click();
await page.locator('tbody').first().waitFor();
const myorder = await expect (page.getByText('6a3af579378febeacdc7f143', {exact:true})).toBeVisible();

await page.locator('tr')
          .filter({hasText: '6a3af579378febeacdc7f143'})
         .locator('button:has-text("View")')
         .click();



//const myorder = await expect (page.getByText('6a3af579378febeacdc7f143', {exact:true})).toBeVisible();
//await page.locator(myorder).click()




//await page.locator(country).click();
       await page.pause();

});