
import { expect } from "@playwright/test";

const API_URL = "https://api.eventhub.rahulshettyacademy.com/api/";
const BASE_URL = "https://eventhub.rahulshettyacademy.com/";

export async function login(apiContext,yahooLoginPayload) {

    const response = await apiContext.post(`${API_URL}/auth/login`,
        { data :yahooLoginPayload });

    expect(response.ok()).toBeTruthy();

    const json = await response.json();

    const loginToken = json.token;

    return loginToken;
    
}

export async function getEventID(apiContext,token) {
    const response = await apiContext.get(`${API_URL}/events`,
        {
            headers: { Authorization : `Bearer ${token}`}
    })
    expect(response.ok()).toBeTruthy();

    const json = await response.json();

    return json.data[0].id;
    
    
}

export async function createBooking(apiContext,token,eventID){

const bookingPayLoad = {
  eventId: eventID,
  customerName: "Yahoo User",
  customerEmail: "joel@yahoo.com",
  customerPhone: "+91-9876643210",
  quantity: 1
}

    const response = await apiContext.post(`${API_URL}/bookings`,{
        headers : {Authorization : `Bearer ${token}` },
        data :  bookingPayLoad,
    });
    console.log("Status:", response.status());
console.log("Body:", await response.text());

    expect(response.ok()).toBeTruthy();

    const json = await response.json();

   const yahooBookingID =  json.data.id;
   return yahooBookingID;
}

export async function loginAndGoToEvents (page) {

      await page.goto(BASE_URL);
        await page.getByPlaceholder('you@email.com').fill("joel@gmail.com");
        await page.getByLabel('Password').fill("Password@gmail");
        await page.locator('#login-btn').click(); 
        await expect(page.locator("#nav-events")).toBeVisible();  
      
}