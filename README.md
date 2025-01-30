EventSphere: Event Finder App
EventSphere is a web application built with React (frontend) and Node.js (backend) that allows users to search for events, filter them by category or location, and view them on a map. The app integrates with the Ticketmaster API to fetch event data.

Step 2:
Set Up the Node.js Backend Server

git clone https://github.com/andresarield/EventSphere
cd EventSphere

Navigate to the server folder:
cd server

Install dependencies:
npm install
Create a .env file in the server folder and add your Ticketmaster API key:

API_KEY=your_ticketmaster_api_key

Start the server:
node index.js

Step 3: Build the React Frontend
Objective: Create a React app to display events fetched from the backend.
