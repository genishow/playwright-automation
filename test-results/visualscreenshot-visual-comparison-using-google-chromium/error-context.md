# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visualscreenshot.spec.js >> visual comparison using google
- Location: tests\visualscreenshot.spec.js:50:6

# Error details

```
Error: expect(Buffer).toMatchSnapshot(expected) failed

  16958 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: googlelanding.png

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - link "About" [ref=e4] [cursor=pointer]:
      - /url: https://about.google/?fg=1&utm_source=google-US&utm_medium=referral&utm_campaign=hp-header
    - link "Store" [ref=e5] [cursor=pointer]:
      - /url: https://store.google.com/US?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=en-US
    - generic [ref=e7]:
      - generic [ref=e8]:
        - link "Gmail" [ref=e10] [cursor=pointer]:
          - /url: https://mail.google.com/mail/&ogbl
        - link "Search for Images" [ref=e12] [cursor=pointer]:
          - /url: https://www.google.com/imghp?hl=en&ogbl
          - text: Images
      - button "Google apps" [ref=e15] [cursor=pointer]:
        - img [ref=e16]
      - link "Sign in" [ref=e20] [cursor=pointer]:
        - /url: https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=futura_exp_og_so_72776762_e
  - img "Google" [ref=e23]
  - search [ref=e31]:
    - generic [ref=e33]:
      - generic [ref=e35]:
        - button "Add files and tools" [ref=e38] [cursor=pointer]:
          - img [ref=e40]
        - combobox "Search" [active] [ref=e43]
        - generic [ref=e44]:
          - generic [ref=e45]:
            - button "Search by voice" [ref=e46] [cursor=pointer]:
              - img [ref=e47]
            - button "Search by image" [ref=e49] [cursor=pointer]:
              - img [ref=e50]
          - link "AI Mode" [ref=e52] [cursor=pointer]:
            - generic [ref=e54]:
              - img [ref=e56]
              - generic [ref=e63]: AI Mode
      - generic [ref=e65]:
        - button "Google Search" [ref=e66] [cursor=pointer]
        - button "I'm Feeling Lucky" [ref=e67] [cursor=pointer]
  - link "⚽ Learn how fans across the globe celebrate the biggest soccer moments with AI Mode" [ref=e77] [cursor=pointer]
  - contentinfo [ref=e79]:
    - generic [ref=e80]:
      - generic [ref=e81]:
        - link "Advertising" [ref=e82] [cursor=pointer]:
          - /url: https://www.google.com/intl/en_us/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1
        - link "Business" [ref=e83] [cursor=pointer]:
          - /url: https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1
        - link "How Search works" [ref=e84] [cursor=pointer]:
          - /url: https://google.com/search/howsearchworks/?fg=1
      - link "Build, create, and do more with AI tools from Google" [ref=e86] [cursor=pointer]:
        - /url: https://ai.google/helpful-tools/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer
      - generic [ref=e87]:
        - link "Privacy" [ref=e88] [cursor=pointer]:
          - /url: https://policies.google.com/privacy?hl=en&fg=1
        - link "Terms" [ref=e89] [cursor=pointer]:
          - /url: https://policies.google.com/terms?hl=en&fg=1
        - button "Settings" [ref=e93] [cursor=pointer]:
          - generic [ref=e94]: Settings
```

# Test source

```ts
  1  | const { test, expect } = require("@playwright/test");
  2  | 
  3  | // TEST 1: booking just 1 ticket should say we CAN get a refund
  4  | test("popup validation", async function ({ page }) {
  5  | 
  6  |  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  7  | //  await page.goto('http://google.com');
  8  | 
  9  | //  await page.goBack();
  10 | //  await page.goForward();
  11 | 
  12 | await expect(page.locator('#displayed-text')).toBeVisible();
  13 | await page.locator('#hide-textbox').click();
  14 | await expect(page.locator('#displayed-text')).toBeHidden();
  15 | page.on('dialog', dialog => dialog.accept());
  16 | await page.locator('#confirmbtn').click();
  17 | await page.locator('#mousehover').hover();
  18 | const framespage = page.frameLocator('#courses-iframe');
  19 | 
  20 | //await framespage.locator("li a[href*='lifetime-access']:visible").click();
  21 | await (framespage).getByRole('link', { name: 'NEW All Access plan' }).click();
  22 | const heading = await framespage.getByRole('heading', { name: 'Join 13,522 Happy Subscibers!' }).textContent();
  23 | console.log(heading);
  24 | 
  25 | 
  26 | 
  27 | });
  28 | test("screenshot", async function ({ page }) {
  29 | 
  30 | 
  31 | 
  32 |  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  33 | 
  34 | await expect(page.locator('#displayed-text')).toBeVisible();
  35 | await page.locator('#hide-textbox').click();
  36 | await page.screenshot({path: 'tests/screenshot.png',fullPage:true });
  37 | //await page.locator('#displayed-text').screenshot({path: 'tests/screenshot.png'});
  38 | await expect(page.locator('#displayed-text')).toBeHidden();
  39 | 
  40 | });
  41 | 
  42 | test("visual comparison", async function ({ page }) {
  43 | 
  44 |  await page.goto('https://ticketmaster.com/');
  45 | expect(await page.screenshot()).toMatchSnapshot('ticketmaster.png');
  46 | });
  47 | 
  48 | 
  49 | 
  50 | test.only("visual comparison using google", async function ({ page }) {
  51 | 
  52 |  await page.goto('https://google.com/');
> 53 | expect(await page.screenshot()).toMatchSnapshot('googlelanding.png');
     |                                 ^ Error: expect(Buffer).toMatchSnapshot(expected) failed
  54 | });
  55 | 
```