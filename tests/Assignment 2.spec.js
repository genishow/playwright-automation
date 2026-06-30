// Bring in Playwright's testing tools: "test" lets us write a test, "expect" lets us check things
const { test, expect } = require("@playwright/test");

// TEST 1: booking just 1 ticket should say we CAN get a refund
test("assignment2 test - single ticket refund eligible", async function ({ page }) {

  // Step 1: Login
  // Go to the login page
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  const email = "genishow21@gmail.com";
  const password = "Geni123.";

  // Type the email into the email box
  await page.getByPlaceholder("you@email.com").fill(email);
  // Type the password into the password box
  await page.getByLabel('Password').fill(password);
  // Click the login button
  await page.locator('#login-btn').click();
  // Check that we landed on the right page by looking for the "Browse Events" link
  await expect(page.getByRole("link", { name: 'Browse Events →' })).toBeVisible();

  // Step 2: Book first event with 1 ticket (default)
  // Go to the page that lists all the events
  await page.goto("https://eventhub.rahulshettyacademy.com/events");
  // Grab the first event box on the page
  const firstCard = page.getByTestId("event-card").first();
  // Click the "Book Now" button on that event
  await firstCard.getByTestId("book-now-btn").click();

  // Type a name into the "Full Name" box
  await page.getByLabel('Full Name').fill('geni wor');
  // Type an email into the "Email" box
  await page.locator('#customer-email').fill('geni@gmail.com');
  // Type a phone number into the "Phone" box
  await page.getByPlaceholder('+91 98765 43210').fill('+11 92885 45445');
  // Click the button to confirm the booking
  await page.locator('.confirm-booking-btn').click();

  // Step 3: Navigate to booking detail
  // Click the "View My Bookings" link
  await page.locator('a', { hasText: 'View My Bookings' }).click();
  // Check that we are now on the bookings page
  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');

  // Click "View Details" on the first booking in the list
  await page.getByRole('link', { name: 'View Details' }).first().click();
  // Check that the "Booking Information" section shows up on this page
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Step 4: Validate booking ref
  // Read the booking's reference code (like a receipt number) from the page
  const bookingRef = (await page.locator('span.font-mono.font-bold').first().innerText()).trim();
  // Read the event's title from the big heading on the page
  const eventTitle = (await page.locator('h1').innerText()).trim();
  // Check that the first letter of the booking code matches the first letter of the event title
  expect(bookingRef[0]).toBe(eventTitle[0]);

  // Step 5: Check refund eligibility
  // Click the button that checks if this booking can be refunded
  await page.locator('#check-refund-btn').click();
  // Check that the loading spinner shows up right away
  await expect(page.locator('#refund-spinner')).toBeVisible();
  // Check that the loading spinner goes away again within 6 seconds
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  // Step 6: Validate result
  // Find the box that shows the refund result
  const refundResult = page.locator('#refund-result');
  // Check that the result box is visible
  await expect(refundResult).toBeVisible();
  // Check that it says we are eligible for a refund
  await expect(refundResult).toContainText('Eligible for refund');
  // Check that it explains why (single tickets get a full refund)
  await expect(refundResult).toContainText('Single-ticket bookings qualify for a full refund');

});

// TEST 2: booking 3 tickets together should say we CANNOT get a refund
test("assignment2 test - group ticket refund not eligible", async function ({ page }) {

  // Step 1: Login
  // Go to the login page
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  const email = "genishow21@gmail.com";
  const password = "Geni123.";

  // Type the email into the email box
  await page.getByPlaceholder("you@email.com").fill(email);
  // Type the password into the password box
  await page.getByLabel('Password').fill(password);
  // Click the login button
  await page.locator('#login-btn').click();
  // Check that we landed on the right page by looking for the "Browse Events" link
  await expect(page.getByRole("link", { name: 'Browse Events →' })).toBeVisible();

  // Step 2: Book first event, then increase quantity to 3 tickets
  // Go to the page that lists all the events
  await page.goto("https://eventhub.rahulshettyacademy.com/events");
  // Grab the first event box on the page
  const firstCard = page.getByTestId("event-card").first();
  // Click the "Book Now" button on that event
  await firstCard.getByTestId("book-now-btn").click();

  // Click the "+" button twice to bring the ticket count up to 3
  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();

  // Type a name into the "Full Name" box
  await page.getByLabel('Full Name').fill('geni wor');
  // Type an email into the "Email" box
  await page.locator('#customer-email').fill('geni@gmail.com');
  // Type a phone number into the "Phone" box
  await page.getByPlaceholder('+91 98765 43210').fill('+11 92885 45445');
  // Click the button to confirm the booking
  await page.locator('.confirm-booking-btn').click();

  // Step 3: Navigate to booking detail
  // Click the "View My Bookings" link
  await page.locator('a', { hasText: 'View My Bookings' }).click();
  // Check that we are now on the bookings page
  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');

  // Click "View Details" on the first booking in the list
  await page.getByRole('link', { name: 'View Details' }).first().click();
  // Check that the "Booking Information" section shows up on this page
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Step 4: Validate booking ref
  // Read the booking's reference code from the page
  const bookingRef = (await page.locator('span.font-mono.font-bold').first().innerText()).trim();
  // Read the event's title from the big heading on the page
  const eventTitle = (await page.locator('h1').innerText()).trim();
  // Check that the first letter of the booking code matches the first letter of the event title
  expect(bookingRef[0]).toBe(eventTitle[0]);

  // Step 5: Check refund eligibility
  // Click the button that checks if this booking can be refunded
  await page.locator('#check-refund-btn').click();
  // Check that the loading spinner shows up right away
  await expect(page.locator('#refund-spinner')).toBeVisible();
  // Check that the loading spinner goes away again within 6 seconds
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  // Step 6: Validate result (different assertions - group bookings are not refundable)
  // Find the box that shows the refund result
  const refundResult = page.locator('#refund-result');
  // Check that the result box is visible
  await expect(refundResult).toBeVisible();
  // Check that it says we are NOT eligible for a refund
  await expect(refundResult).toContainText('Not eligible for refund');
  // Check that it explains why (group bookings of 3 tickets can't be refunded)
  await expect(refundResult).toContainText('Group bookings (3 tickets) are non-refundable');

});
