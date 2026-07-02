const {test, expect} = require('@playwright/test');
const loginpayload = {userEmail:"genishow21@gmail.com",userPassword:"Geni123."};
let token;




test.beforeAll( async({request})=>
{
//const apiContext = await browser.newContext();
const loginresponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginpayload}
);
expect(loginresponse.ok()).toBeTruthy();
  const loginresponsejson = await loginresponse.json();
   token = loginresponsejson.token;
  console.log(token);
});


test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    },token);
await page.goto("https://rahulshettyacademy.com/client/");
await page.pause();
});