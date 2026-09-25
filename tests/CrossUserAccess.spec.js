import { test , expect , request} from '@playwright/test';
import { getEventID, login , createBooking , loginAndGoToEvents } from './Utils/APiHelper';
import { url } from 'node:inspector';

const yahooLoginPayload = {
  email: "joel@yahoo.com",
  password : "Password@yahoo"
}

const gmailLoginPayload = {
  email: "joel@gmail.com",
  password : "Password@gmail"
}

test("Unauthorized Booking access", async  ({ page }) => {

    const apicontext = await request.newContext();

    const yahooLoginToken = await login(apicontext,yahooLoginPayload);

    const eventID = await getEventID(apicontext,yahooLoginToken);
    console.log(eventID);

    const bookingID = await createBooking(apicontext,yahooLoginToken,eventID)

    await loginAndGoToEvents(page);
     await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${bookingID}`,
        { waitUntil: 'networkidle' }
    );
    await expect(page.getByText("Access Denied")).toBeVisible();
    await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();

});

