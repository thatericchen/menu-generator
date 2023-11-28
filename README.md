# CS3300 Project 2 - menu-generator
CS 3300 (Fall 2023) Project 2 - Group 8

## Visit

Deployed @ [CS3300 Project 2](https://cs3300proj1frontend.ue.r.appspot.com/)

## Release Notes

### Main Features

#### V3.0 - Generating menu and QR code

- Based on the information provided by hosters, after submitting the menus, hosters can get menus preview and see the QR code at the same time.
- Customers can scan the QR code and see the menus directly.

#### V2.0 - Information collection

- Restaurant should provide information of their restaurants, such as name, main dishes and description of their dishes, etc

#### V1.0 - Login and Signup Pages

- Introduced secure login and signup pages. Prompts user for first name, last name, email, and password.
- Began app UI design.

### Bug Fixes + Known Bugs and Defects

Refer to the [Troubleshooting](#troubleshooting) section for bug fixes and resolution steps.

# Frameworks and Tools Used

| Components |                     Technology                      |
| :--------- | :-------------------------------------------------: |
| Frontend   |                Vite 4.0, React 18.2.0               |
| Backend    |             Spring Boot 3.1.4, Java 17              |
| Database   |                     mongodb 7.0                     |
| Build      |                       GCP                           |

# Install Guide

## Prerequisite Installations

- Java 17
- GCP
- MongoDB 7.0

## GCP instruction and MongoDB configuration:

Download Google Cloud CLI for your respective OS and run the script to install it.

- GCP credit application
- Make Sure Billing Information is Set Up
- Create a new project

Navigate to Google Cloud Console and Create a Simple Spring Boot Application.

- Deploy to GCP
  - Run gcloud -v to make sure the Google Cloud CLI is installed
  - Run gcloud init to initialize google cloud.
  - Make sure to choose the default configuration
  - You will then be prompted to login with your email. (Make sure to use the email that has billing set up with the credits provided)

Database Setup

- MongoDB

  - Set the url to the MongoDB in environment variable, and we set this auto_create_database connect with GCP, and set up the authentication with GCP, then create a admin role, and we get this url:`spring.data.mongodb.uri=mongodb+srv://adminUser:yourSecurePassword@127.0.0.1:27017/accounts`, replacing `<adminUser>`, `<yourSecurePassword>`, and `<127.0.0.1:27017>` with your IP range.

- Once successfully deployed, there will be a URL in the console to take you to where the project is deployed.
- If not, run：
  - gcloud app browse
- Clean up to avoid billing charges: Project settings => shut down project

## Backend - Spring Boot Configuration

Navigate to the project root directory and execute

```
mvn clean install
gcloud app browse
```

## Frontend - React

Navigate to `./frontend/` directory and execute

```
npm install / npm i
npm run dev
```

The app should be available on http://localhost:5173

#### Login page

![image](https://github.com/jamesli12/menu-generator/assets/91359766/f3e4ee67-438c-4d7e-9068-e9e126d60e34)

#### Signup page

![image](https://github.com/jamesli12/menu-generator/assets/91359766/bde43fa0-7a98-49d5-98a6-5c8e1d3577ab)

#### Collecting information for generating menu

![image](https://github.com/jamesli12/menu-generator/assets/91359766/c3ab5fb5-4b35-4923-acc2-ab1c6e12ac54)


#### Menus and QRcode generating page

![image](https://github.com/jamesli12/menu-generator/assets/91359766/115a042f-227d-464d-8e06-6035c3a5807a)


## Troubleshooting <a name="troubleshooting"></a>

If you encounter issues while running the app, refer to the following common problems and their solutions:

### MongoDB Configuration

- **Issue:** The app is not connecting to the MongoDB instance when running locally.
- **Solution:** Ensure that you have a running MongoDB instance and place the connection link in the environmental variables. Use the format `mongodb+srv://<username>:<password>@<cluster-address>` replacing `<username>`, `<password>`, and `<cluster-address>` with your MongoDB credentials and address.

### Bug Fixes

- **Dropdown Menu Loading Issue:**

  - **Problem:** The dropdown wasn’t displaying all options.
  - **Solution:** Ensure the app is updated to the latest version where the data retrieval and rendering process is enhanced. Clear the browser cache or try a different browser if the issue persists.

- **UI Inconsistencies across Devices:**
  - **Problem:** The user interface isn't rendering consistently on all devices.
  - **Future Solution:** Adaptive UI has not been implemented yet, so this will be a future feature we can implement.

## Future Improvements

### Integration with Real-Time Data <a name="real-time-data"></a>

Incorporate real-time data sources like traffic conditions, weather updates, and public transport schedules to provide users with accurate and dynamic carbon footprint calculations. Users will receive real-time estimates, ensuring that the provided data is current and reflective of the actual environmental impact.

### Custom User Profiles <a name="user-profiles"></a>

Custom user profiles would encourage long-term user engagement and offer personalized insights and recommendations. Users can track their progress, encouraging a continued commitment to reducing their carbon footprint during commutes.

Hint:
For the front-end, make sure to create a .env file with the following contents:
BACKEND_URI="https://cs-3300-final-project.ue.r.appspot.com"
If you're not using the deployed backend, change that URL to anything you want.

### Team 8
