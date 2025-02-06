EventSphere: Event Finder App
EventSphere is a web application built with React (frontend) and Node.js (backend) that allows users to search for events, filter them by category or location, and view them on a map. The app integrates with the Ticketmaster API to fetch event data.

```
eventSphere
├─ client
│  ├─ dist
│  │  ├─ bundle.js
│  ├─ public
│  │  └─ index.html
│  ├─ src
│  │  ├─ api
│  │  │  └─ ticketmasterApi.js
│  │  ├─ assets
│  │  │  ├─ fonts
│  │  │  ├─ forms
│  │  │  ├─ images
│  │  │  ├─ styles
│  │  │  │  ├─ Header.css
│  │  │  │  └─ SearchBar.css
│  │  │  └─ svg
│  │  ├─ components
│  │  │  ├─ common
│  │  │  │  └─ SearchBar.jsx
│  │  │  ├─ events
│  │  │  │  ├─ EventDetails.jsx
│  │  │  │  ├─ EventList.jsx
│  │  │  │  └─ Map.jsx
│  │  │  ├─ forms
│  │  │  │  └─ SearchForm.jsx
│  │  │  └─ layout
│  │  │     ├─ Footer.js
│  │  │     └─ Header.js
│  │  ├─ controllers
│  │  │  ├─ eventController.js
│  │  │  ├─ eventDetailsController.js
│  │  │  └─ routesController.js
│  │  ├─ hooks
│  │  │  └─ useDebouncedFetch.js
│  │  ├─ pages
│  │  │  ├─ About.js
│  │  │  ├─ Home.jsx
│  │  │  └─ SearchResults.jsx
│  │  └─ utils
│  │     └─ dateUtils.js
│  │  ├─ App.js
│  │  ├─ index.js
│  │  └─ styles.css
│  ├─ .babelrc
│  ├─ package-lock.json
│  ├─ package.json
│  └─ webpack.config.js
├─ package-lock.json
├─ package.json
├─ README.md
└─ server
   ├─ .env
   ├─ index.js
   ├─ package-lock.json
   └─ package.json
```
