## Application Overview

### Doctors
After logging in, Doctors will be routed to the `<Dashboard />` component.
An API call to fetch all of a doctor's patients is made. The results are inserted into the appiclation store and the patients are shown to the user.
A user can click a patient which fires off an API call to fetch patient details. Once the application receives a valid response, the store gets updated with this data and the user gets routed to the patient page.
On a patient page, a doctor can then select a pending appointment and choose to accept or decline the appointment. The appropriate HTTP requests are made on select.

### Patients
Similarly, after logging in, Patients will be routed to the `<PatientHome />` component. They can view their pending appointments and choose to cancel them. They can also request a new appointment and send messages to their doctor. 

## Challenges Overview
Below are a couple areas of this application that I found very interesting to work on. I thought I would give them their own space and explain my thoughts a little bit.

### Login/Logout
When a client hits our page, an immediate check for a user's auth cookie is made. If the cookie is found, we update our application state with the user's auth data.
Injecting user data into the store enables us to use the `<Protected />` component I wrote to prevent anonymous users from accessing private data like doctor/patient information.

If an cookie is not found, the user will be prompted to login. In the interest of time, I skipped adding an expiration date and refresh token to this cookie. Instead, the cookie remains valid until the user logs out. Logging out simply deletes the cookie.

### Appointment Components
I chose to create two appointment components in order to take a more compositional approach.
Because I have the active user in my application store, I could easily distinguish between doctor/patient in one appointment component. This would allow me share overlapping appointment functionality.

The downside to this approach is that it would require me to heavily couple the doctor/patient appointment implementations. Coupled code is error prone and difficult to scale. This would be a pain when it comes time for further feature development.    

By creating two independent components, I am honoring the functional programming principle of composition. This introduces a more robust application architecture.
This implementation allows us to define new behavior in Patient Appointments without impacting Doctor Appointments and vice versa.             

### Patient Search
A doctor can filter their patient list by typing into the search field on the dashboard page. This is all handled on the frontend. I chose to do this client side because I am assuming a patient list will not be an enormous amount of data.
For smaller data sets, filtering in the browser is more efficient because it allows us to avoid sending multiple network requests. For querying larger data sets, a frontend application should send throttled network requests to an endpoint that compiles search results on the backend.
