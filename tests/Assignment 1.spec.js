const {test,expect} = require("@playwright/test");



function futureDateValue(){


          const date = new Date();
            date.setDate(date.getDate() + 7);
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}T10:00`; // ✅ correct format for datetime-local
};





test("assignment1 test", async function({page}) {

await page.goto("https://eventhub.rahulshettyacademy.com/login")
const email = "genishow21@gmail.com";
const password = "Geni123.";
// Store the unique title in a variable
const eventTitle = `Test Event ${Date.now()}`;



await page.getByPlaceholder("you@email.com").fill(email);
await page.getByLabel('Password').fill(password);
await page.locator('#login-btn').click();
await expect(page.getByRole("link", {name:'Browse Events →'})).toBeVisible();
await page.locator('button', { hasText: 'Admin' }).click();

//await page.getByRole('link', {name:'Admin'}).click();
await page.locator(".absolute a").first().click();

await page.locator("#event-title-input").fill(eventTitle);
await page.locator("#admin-event-form textarea").fill("This event will be fun");
await page.getByLabel("category").selectOption("Festival");
await page.getByLabel("City").fill("Los Angeles");
await page.getByLabel("Venue").fill('Fetival venue, 123 la st');

await page.getByLabel('Event Date & Time').fill(futureDateValue());
await page.getByLabel('Price ($)').fill('100');
await page.getByLabel('Total Seats').fill('50');
await page.locator('#add-event-btn').click();

await expect(page.getByText('✓Event created!×')).toBeVisible();
//await page.pause(); // pauses the test so you can inspect manually
await page.locator('#nav-events').click();
await page.getByTestId("event-card").first().waitFor({ timeout: 10000 });

await expect(page.getByTestId("event-card").first()).toBeVisible();

const cardtitles = await page.getByTestId("event-card").allTextContents();
console.log(cardtitles);

const myCard = await page.getByTestId("event-card")
            .filter({hasText: eventTitle});

await expect(myCard).toBeVisible({ timeout: 5000 });  

const seatText = await myCard.getByText('seat').innerText();


const seatsBeforeBooking = parseInt(seatText);  
console.log(seatsBeforeBooking);

 //await myCard.getByRole('button',{name:'Book Now'});

await myCard.getByTestId("book-now-btn").click();
await expect(page.locator('#ticket-count')).toContainText("1");
await page.getByLabel('Full Name').fill('geni wor');
await page.locator('#customer-email').fill('geni@gmail.com');
await page.getByPlaceholder('+91 98765 43210').fill('+11 92885 45445');

await page.locator('.confirm-booking-btn').click();
await expect(page.locator('.booking-ref').first()).toBeVisible();

const bookingRef = (await page.locator('.booking-ref').first().textContent()).trim();

console.log(bookingRef);

await page.locator('#nav-bookings').click();

await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');

// the booking card that contains a .booking-ref matching our bookingRef
const myBookingCard = page.getByTestId('booking-card')
                          .filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });

await expect(myBookingCard).toBeVisible();
await expect(myBookingCard).toContainText(eventTitle);

// go back to events
await page.locator('#nav-events').click();
await expect(page.getByTestId('event-card').first()).toBeVisible();

// find our event card again
const myCardAfter = page.getByTestId('event-card').filter({ hasText: eventTitle });
await expect(myCardAfter).toBeVisible();

// assert seats dropped by 1 — auto-waits until the page shows the new count
await expect(myCardAfter.getByText('seat'))
    .toContainText(String(seatsBeforeBooking - 1));

// read it for logging
const seatsAfterBooking = parseInt(await myCardAfter.getByText('seat').innerText());
console.log(seatsAfterBooking);

//await page.pause();

















});


