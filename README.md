# Lendsqr Frontend Assessment

A modern user management dashboard built for Lendsqr's frontend assessment. This app helps financial institutions manage their users efficiently with a clean, responsive interface.

## What This App Does

This is a comprehensive user management system that allows administrators to:

- **View all users** in a clean, organized table with pagination
- **Filter users** by organization, username, email, phone number, date joined, and status
- **See detailed user information** including personal details, employment info, guarantor details, and financial data
- **Manage user status** by activating or blacklisting users as needed
- **Track user statistics** with summary cards showing total users, active users, users with loans, and users with savings
- **Secure login system** with form validation and user authentication

## Problems It Solves

**For Financial Institutions:**

- Eliminates the need for multiple systems to manage user data
- Provides quick access to comprehensive user information
- Streamlines user status management (activation/blacklisting)
- Offers real-time statistics for better decision making

**For Administrators:**

- Reduces time spent searching through user records
- Simplifies the process of viewing detailed user profiles
- Makes bulk user management more efficient
- Provides a mobile-friendly interface for on-the-go access

## Tools & Technologies Used

- **React 19** - For building the user interface
- **TypeScript** - For type safety and better development experience
- **React Router** - For navigation between pages
- **SCSS/Sass** - For styling and responsive design
- **Vite** - For fast development and building
- **Local Storage** - For persisting user data and authentication
- **Random User API** - For generating realistic user data
- **Custom Toast System** - For user feedback and notifications

## Key Features

###  Secure Authentication

- Login form with email and password validation
- Persistent sessions using local storage
- Automatic redirect to dashboard after login

###  User Dashboard

- Summary cards showing key statistics
- Responsive table with user information
- Advanced filtering system
- Pagination for handling large datasets

###  Detailed User Profiles

- Complete user information display
- Personal, employment, and financial details
- Guarantor information
- User action buttons (activate/blacklist)

###  Mobile Responsive

- Works seamlessly on desktop, tablet, and mobile
- Touch-friendly interface
- Collapsible sidebar for mobile navigation

###  Modern UI/UX

- Clean, professional design
- Intuitive navigation
- Real-time feedback with toast notifications
- Loading states and error handling

## Demo Video

Watch the full walkthrough of the application:
[App Demo Video]

https://www.loom.com/share/947fb70748a74c628d88dcede60a5239?sid=1265d6c9-1957-4409-855e-39b66534ff39

## Live Demo

[View Live Application] 

https://ulasi-lendsqr-fe-test-5b43a.web.app

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ulasi-lendsqr-fe-tes.git
   cd ulasi-lendsqr-fe-tes
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Test Credentials

Use these credentials to log into the application:

- **Email:** test@lendsqr.com
- **Password:** password123