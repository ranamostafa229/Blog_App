# Blog App Using MERN Stack

#### DevJournwy is a MERN bloag application that allows users to view, search, and comment on posts.
 ![Screenshot (1363)](https://github.com/user-attachments/assets/610d69e9-8483-4077-82ac-612ad725313c)

## Features

#### - User authentication and authorization using bcrypt
#### - Google authentication Option

 ![Screenshot (1364)](https://github.com/user-attachments/assets/7545c469-cac6-4700-a38f-849406b77b4f)

#### - Explore Categories section
 
 ![Screenshot (1365)](https://github.com/user-attachments/assets/8c04eead-eb4a-4a31-a74f-45e39054ef22)


#### - Get specific categorized topic posts
 
 ![Screenshot (1366)](https://github.com/user-attachments/assets/e49a6339-f621-4c6b-aa7b-f61c0b417b4e)

#### - View post details with carousel slider to specifc heading section

 ![blogapp-production-3bfd up railway app_post_react-post(Nest Hub)](https://github.com/user-attachments/assets/1c3b6756-3284-4dc4-bd6f-0dd4602fa768)

#### - Add comment with the ability to edit or delete your comment and also like other comments 

 ![Screenshot (1368)](https://github.com/user-attachments/assets/0f554391-170b-4b2e-9572-9423513490ee)

#### - Get related posts based on search term

  ![Screenshot (1369)](https://github.com/user-attachments/assets/1c7248a3-0b8d-4f40-8a15-7431aede28de)

#### - Switch between dark and light mode

  ![Screenshot (1370)](https://github.com/user-attachments/assets/ab71e607-eef8-4597-a21d-ad7ba5098eba)

#### - Dashboard for admin to manage the app 

![blogapp-production-3bfd up railway app_dashboard_content(Nest Hub Max)](https://github.com/user-attachments/assets/a5b1e55a-8528-483e-9682-bfb6556d35ec)

#### - Profile Section to update info avaliable both for admin and logged-in users

![blogapp-production-3bfd up railway app_dashboard_profile(Nest Hub Max0)](https://github.com/user-attachments/assets/d3297b55-1669-4069-9f03-5bf5810af796)

#### - View logged-in users for admin with the ability to delete them

![blogapp-production-3bfd up railway app_dashboard_profile(Nest Hub Max3)](https://github.com/user-attachments/assets/ca68dee2-77fb-4b0f-8267-5a27747587c6)

#### - The ability to make CRUD operation for the posts by the admin

![blogapp-production-3bfd up railway app_dashboard_profile(Nest Hub Max4)](https://github.com/user-attachments/assets/4ea4cb07-ebae-429a-a249-b7515923c980)

#### - Create new Post with text editor 

![blogapp-production-3bfd up railway app_dashboard_profile(Nest Hub Max)5](https://github.com/user-attachments/assets/4811d1c2-f8c4-45ab-82f8-67f45f862d88)

## Technologies

- React for the front-end
- Node.js and Express for the back-end
- MongoDB and Mongoose for the database
- ChartJs for data visualization
- Matrial UI for styling
- Firebase for authentication

## Installation

To run this project locally, you need to have Node.js and MongoDB installed on your machine.

1. Clone this repository or download the zip file
2. Navigate to the project directory and run `npm install` to install the dependencies
3. Create a `.env` file in the root folder and add the following variables:

```
PORT=5000
MONGO = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
VITE_FIREBASE_API_KEY = your_api_key //in client folder
```

4. Run `npm run dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app

## Demo

You can view a live demo of the app here: [https://blogapp-production-3bfd.up.railway.app/](https://blogapp-production-3bfd.up.railway.app/)

