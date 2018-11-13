## Run the starting point

1. `npm i`
2. `npm run seed`
3. `npm run build`
4. `npm start`

## Directory structure
`/assets` contains stylesheets.

`/client` contains React components and a Redux store.

`/files` is an empty directory for storing patient files.

`/public` is where the code from `/client` is compiled to.

`/server` contains an Express server, routes, and the database config.

## Logging in
Running the seed script seeds the database, including some users we've created for you. You can use any user's email address and password to log in to the app as that user.


#### Doctors
After logging in, Doctors will be routed to the <Dashboard /> component.
An API call to fetch all of a doctor's patients is made.
This is accomplished by configuring the patients endpoint to check for a `doctor_id`. If a `doctor_id` is found, I loop over all the patients in the system keep track of each patient that has an appointment with the given doctor.
Ideally, fetching a doctor's patient list should exist as its own endpoint. If this data was stored separately, we could avoid having to iterate over every patient.

Once a user clicks a patient, an API call to fetch patient details is fired. Once the application receives a valid response, the store gets updated with this data and the user gets routed to the patient page.

On a patient page, a doctor can then select a pending appointment and choose to accept/decline the appointment. The appropriate HTTP requests are made on select.

#### Patients
Similarly, after logging in, Patients will be routed to the `<PatientHome />` component. They can view their pending appointments and choose to cancel them. They can also request a new appointment.

## Challenges Overview
Below are a couple areas of this application that I found very interesting to work on. I thought I would give them their own space and explain my thoughts a little bit.

### Login/Logout
When a client hits our page, an immediate check for the user's auth cookie is made. If the cookie is found, we update our application state with the user's auth data.
Injecting user data into the store enables us to use the `<Protected />` component I wrote to prevent anonymous users from accessing private data like doctor/patient information.

If an cookie is not found, the user will be prompted to login. In the interest of time, I skipped adding an expiration date and refresh token to this cookie. Instead, the cookie remains valid until the user logs out. Logging out simply deletes the cookie.

### Appointment Components
I chose to create two appointment components in order to take a more compositional approach.
Because I have the active user in my application store, I could easily distinguish between doctor/patient in one appointment component. This would allow me share overlapping appointment functionality.

The downside to this approach is that it would require me to heavily couple the doctor/patient appointment implementations. Coupled code is error prone and difficult to scale. This would be a pain when it comes time for further feature development.    
By creating two independent components, I chose to honor the functional programming principle of composition and introduce a more robust application architecture.
This implementation allows us to define new behavior in Patient Appointments without impacting Doctor Appointments and vice versa.             

### Patient Search
A doctor can filter their patient list by typing into the search field on the dashboard page. This is all handled on the frontend. I chose to do this client side because I am assuming a patient list will not be an enormous amount of data.
For smaller data sets, filtering in the browser is more efficient because it allows us to avoid sending multiple network requests. For querying larger data sets, a frontend application should send throttled network requests to an endpoint that compiles search results on a server. 
