# Creators Web App

## Overview
This is a web application built using NextJS13 as the front-end and Firebase as the backend. The app has two user roles: user and admin.

## Pages
- Auth
- User Login
- User Signup
- Admin Login
- Public Pages
  - Homepage
  - Search
    - Search profiles by name, hobby, and achievements
    - Filter profiles by gender and hobby
  - List of Profiles
    - Display profiles with recent 3 achievements and starred/like counter
    - Click on "show_all" to view all achievements on a new page
    - Load more button for pagination
  - Profile Page
    - View profile data, personal info, education, achievements in brief, hobbies, etc.
    - Load more button for pagination to view all achievements
    - Login to add a star rating and like button to the profile
- After Admin Login
  - Dashboard
    - Display recently joined user count (last 1 week)
    - Show the most starred profile and average starred
    - Show the most liked profile and average liked
    - Display total user count
    - Display blocked user count
  - Users - CRUD Operations
    - Add, Edit, View, Delete users
    - Block/unblock users from the listing
    - Search, sort, and pagination for user list
- After User Login
  - Other User's Profile
    - View other user's profile, star/like, block/unblock actions for the current logged-in user
  - Profile Page [Self]
    - View and update own profile info, pictures, achievements, and hobbies

## Technologies Used
- Front-end: ReactJS/NextJS
- Backend: Firebase/NodeJS

## Installation
1. Clone the repository
2. Install dependencies using `npm install`
3. Run the app using `npm start`
