# CS3300 Project 2 - Menu Generator

CS 3300 (Fall 2023) Project 2 - Group 8

## Visit

Deployed @ [CS3300 Project 2](https://cs3300-gcp-assignment-401202.uc.r.appspot.com/)

## Release Notes

### New Features

#### V4.0 - Menu and QR Code Generation

- Users can upload their menu details, and immediately get a visual preview of how the menu will appear to customers.
- A unique QR code is generated for each menu. Hosts can print or display this QR code in their restaurant, enabling customers to access the menu digitally.
- Customers can scan the QR code using their mobile devices to view the menu.

#### V3.0 - Information Collection for Restaurants

- Restaurants are prompted to create profiles including their name, slogan, and logo.
- Options for restaurants to provide extensive details about their main dishes, including ingredients, dietary information, and dish descriptions.
- Implemented uploading for restaurants to add images of dishes.

#### V2.0 - User Registration and Login

- Introduced secure login and signup pages. Prompts user for first name, last name, email, and password.
- Implementation of MongoDB for robust data management and storage, ensuring data security.

#### V1.0 - Landing and Input Pages

- Began app UI design.
- Development of initial landing and input pages allowing users and restaurant owners to start inputting menu item data into the app.

### Bug Fixes + Known Bugs and Defects

Refer to the [Troubleshooting](#troubleshooting) section for bug fixes and resolution steps.

# Frameworks and Tools Used

| Components |            Technology             |
| :--------- | :-------------------------------: |
| Frontend   |      Vite 4.0, React 18.2.0       |
| Backend    | Flask 2.2.2, Java 17, QRCodeReact |
| Database   |            MongoDB 7.0            |
| Build      |                GCP                |

# Install Guide

## Prerequisite Installations

- Java 17
- GCP
- MongoDB 7.0

## GCP Instructions and MongoDB Configuration:

### GCP Setup

Download Google Cloud CLI for your respective OS and run the script to install it.

- GCP credit application.
- Make sure Billing Information is set up.
- Create a new project.

Deploy to GCP.

- Run `gcloud -v` to make sure the Google Cloud CLI is installed.
- Run `gcloud init` to initialize google cloud.
- Make sure to choose the default configuration.
- You will then be prompted to login with your email (make sure to use the email that has billing set up with the credits provided).

### Database Setup

MongoDB

- Create an environment variable, for example, `MONGODB_URI`, and assign your MongoDB connection string to this variable.
  - Format: `mongodb+srv://[username]:[password]@[cluster-address]/[database]`.
- Configure MongoDB in GCP to auto-create the database if it doesn't exist.
- Assign required roles and securely store the service account's credentials.
- Create an administrative user in MongoDB for database management.
- Replace placeholders in the URL: `spring.data.mongodb.uri=mongodb+srv://adminUser:yourSecurePassword@cluster-address/database`.
- Use your actual admin username, password, and cluster address.
- Implement this URL in your application's configuration.

Once successfully deployed, there will be a URL in the console to take you to where the project is deployed.

If not, run：

- `gcloud app browse`

Clean up to avoid billing charges: Project settings -> shut down project

## Download, Build, & Run Instructions
First, clone the repository by running `git clone https://github.com/jamesli12/menu-generator.git`.

### Backend - GCP Configuration

Navigate to project root directory and execute

```
pip install -r requirements.txt
Change GOOGLE_APPLICATION_CREDENTIALS to your GCP OAuth2 file path
Change GOOGLE_STORAGE_FILES_BUCKET to your GCP bucket name
Run main.py (Flask app)
```

### Frontend - React

Navigate to `./menu-gen-frontend/` directory and execute

```
npm install
npm run dev
```

The app should be available on http://localhost:5173.

#### Landing Page

![image](https://cdn.discordapp.com/attachments/1088898204948512790/1179275544328679464/Screenshot_2023-11-28_at_11.19.50_PM.png?ex=657930ef&is=6566bbef&hm=178b880d304a4312f5396b335984d71eb1a5328925385894670ab6acd14b8a43&)

#### Login Page

![image](https://github.com/jamesli12/menu-generator/assets/91359766/f3e4ee67-438c-4d7e-9068-e9e126d60e34)

#### Sign Up Page

![image](https://github.com/jamesli12/menu-generator/assets/91359766/bde43fa0-7a98-49d5-98a6-5c8e1d3577ab)

#### Restaurant Data Collection

![image](https://cdn.discordapp.com/attachments/1088898204948512790/1179275095156461648/Screenshot_2023-11-28_at_10.56.05_PM.png?ex=65793084&is=6566bb84&hm=fc1aff743f57c75f2b76a843d01e1190f6592517230ce0b1cf03bde49dfb787e&)

#### Menu Item Data Collection

![image](https://cdn.discordapp.com/attachments/1088898204948512790/1179275243076988998/Screenshot_2023-11-28_at_10.56.19_PM.png?ex=657930a7&is=6566bba7&hm=4e916ca4318143fd76005cd3528723c4ecf1a7ee66a45f64006c456b9d89dd55&)

#### Menu and QR Code Generation

![ezgif-1-2002d20f82](https://github.com/jamesli12/menu-generator/assets/112535058/8a62bb4a-5383-4296-be3b-8c62146588e8)

## Troubleshooting <a name="troubleshooting"></a>

If you encounter issues while running the app, refer to the following common problems and their solutions:

### MongoDB Configuration

- **Issue:** The app is not connecting to the MongoDB instance when running locally.
- **Solution:** Ensure that you have a running MongoDB instance and place the connection link in the environmental variables. Use the format `mongodb+srv://<username>:<password>@<cluster-address>` replacing `<username>`, `<password>`, and `<cluster-address>` with your MongoDB credentials and address.

### Bug Fixes

- **QR Code Not Scanning Properly**

  - **Problem:** QR codes generated are not scannable or lead to incorrect links.
  - **Solution:** Ensure QR codes have adequate resolution and contrast. Validate the encoded URL for correctness before generating the QR code.

- **UI Inconsistencies across Devices:**

  - **Problem:** The user interface is not rendering consistently on all devices.
  - **Future Solution:** Adaptive UI has not been implemented yet, so this can be a future feature to implement.

### .env in `./menu-gen-frontend/`

Make sure to create a .env file with the following contents:

`BACKEND_URI="https://cs-3300-final-project.ue.r.appspot.com"`

If you are not using the deployed backend, you can change that URL to anything you want.

## Future Improvements

### Advanced Customization Options for Menus

Introduce more diverse templates, fonts, and layout options to allow for greater customization of menus.

### Dynamic Menu Updates

Enable real-time menu updates, allowing restaurants to instantly change items, prices, or availability. Notifications for customers about new items or daily specials.
