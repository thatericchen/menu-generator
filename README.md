# Menu Generator

## Introduction
Menu Generator is a web application designed to help restaurants seamlessly create, manage, and share digital menus. This platform allows restaurant owners to easily input menu details, generate visually appealing digital menus, and provide instant access to customers through QR codes. By simplifying menu management and enhancing the dining experience, Menu Generator bridges the gap between traditional menu design and modern digital convenience.

Key features include:
- Restaurant profile creation and menu item management
- Automatic QR code generation for digital menus
- Responsive menu preview for customers
- Secure user authentication and data storage

## Release Notes
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

## Frameworks and Tools Used
| Components |            Technology             |
| :--------- | :-------------------------------: |
| Frontend   |      Vite 4.0, React 18.2.0       |
| Backend    | Flask 2.2.2, Java 17, QRCodeReact |
| Database   |            MongoDB 7.0            |
| Build      |                GCP                |

## Install Guide
### Prerequisite Installations
- Java 17
- GCP
- MongoDB 7.0

### GCP Instructions and MongoDB Configuration:
#### GCP Setup
Download Google Cloud CLI for your respective OS and run the script to install it.
- GCP credit application.
- Make sure Billing Information is set up.
- Create a new project.

Deploy to GCP.
- Run `gcloud -v` to make sure the Google Cloud CLI is installed.
- Run `gcloud init` to initialize google cloud.
- Make sure to choose the default configuration.
- You will then be prompted to login with your email (make sure to use the email that has billing set up with the credits provided).

#### Database Setup
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

### Download, Build, & Run Instructions
First, clone the repository by running `git clone https://github.com/jamesli12/menu-generator.git`.

#### Backend - GCP Configuration

Navigate to project root directory and execute

```
pip install -r requirements.txt
Change GOOGLE_APPLICATION_CREDENTIALS to your GCP OAuth2 file path
Change GOOGLE_STORAGE_FILES_BUCKET to your GCP bucket name
Run main.py (Flask app)
```

#### Frontend - React

Navigate to `./menu-gen-frontend/` directory and execute

```
npm install
npm run dev
```

The app should be available on http://localhost:5173.

#### Login Page
![image](https://github.com/jamesli12/menu-generator/assets/91359766/f3e4ee67-438c-4d7e-9068-e9e126d60e34)

#### Sign Up Page
![image](https://github.com/jamesli12/menu-generator/assets/91359766/bde43fa0-7a98-49d5-98a6-5c8e1d3577ab)

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

## Next Steps
### Advanced Customization Options for Menus
Introduce more diverse templates, fonts, and layout options to allow for greater customization of menus.

### Dynamic Menu Updates
Enable real-time menu updates, allowing restaurants to instantly change items, prices, or availability. Notifications for customers about new items or daily specials.

## Acknowledgements
Zexiu An, Eric Chen, Tingyue He, James Li, Karen Sun
