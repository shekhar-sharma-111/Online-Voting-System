# Online-Voting-System
Overview

The Online Voting System is a web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). This platform provides a secure and efficient way to conduct elections online, allowing users to vote in various elections while ensuring the integrity and confidentiality of their votes.
-------------------------------------------------------------------------------------

1.Features


User Authentication: Secure login and registration system using JWT (JSON Web Tokens).

Admin Dashboard: Manage elections, candidates, and voters.

Vote Casting: Secure and intuitive interface for casting votes.

Real-time Results: Live display of election results with data visualizations.

Audit Trail: Maintain a log of all activities for transparency and auditing purposes.

Responsive Design: Fully responsive design to ensure usability on all devices.

-------------------------------------------------------------------------------------
2. Technologies Used


Frontend:

React

React Bootstrap

React Router


Backend:


Node.js

Express.js

MongoDB

Mongoose

----------------------------------------------------------------------
3. Other Tools:


1.JWT for authentication

2.Bcrypt for password hashing

3.Nodemailer for email notifications

4.Chart.js for data visualization

-----------------------------------------------------------------------
4. Installation

Prerequisites


Node.js and npm installed

MongoDB installed and running
------------------------------------------------------------------------

5. Set up environment variables:


Create a .env file in the backend directory with the following variables:


MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email_address

EMAIL_PASS=your_email_password
-------------------------------------------------------------------------
online-voting-system/
├── backend/         # Node.js & Express backend 
│   ├── controllers/ # Controllers for handling requests 
│   ├── models/      # Mongoose models 
│   ├── routes/      # API routes
│   ├── middleware/  # Authentication and other middleware 
│   └── server.js    # Entry point for the backend server 
├── frontend/        # React frontend 
│   ├── src/
│   │   ├── components/ # Reusable components 
│   │   ├── pages/      # Page components 
│   │   ├── App.js      # Main App component 
│   │   └── index.js    # Entry point for the frontend 
└── README.md        # This file 
-------------------------------------------------------------------------


