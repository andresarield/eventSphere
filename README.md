EventSphere: Event Finder App
EventSphere is a web application built with React (frontend) and Node.js (backend) that allows users to search for events, filter them by category or location, and view them on a map. The app integrates with the Ticketmaster API to fetch event data.

To do list:

Agregar Analytics de Google Analytics o Plausible en index.html.

```
eventSphere
├─ Backend
│  ├─ config
│  │  ├─ .env
│  │  └─ config.js
│  ├─ controllers
│  │  ├─ eventController.js
│  │  └─ eventDetailsController.js
│  ├─ middlewares
│  │  ├─ authMiddleware.js
│  │  └─ errorHandler.js
│  ├─ models
│  │  └─ Event.js
│  ├─ routes
│  │  ├─ eventDetailroutes.js
│  │  ├─ eventRoutes.js
│  │  └─ userRoutes.js
│  ├─ services
│  │  └─ eventService.js
│  │─ utils
│  │  └─ dateUtils.js
│  ├─ index.js
│  ├─ package-lock.json
│  └─ package.json
├─ Frontend
│  ├─ dist
│  │  ├─ bundle.js
│  │  └─ bundle.js.LICENSE.txt
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ index.html
│  │  └─ manifest.json
│  ├─ src
│  │  ├─ api
│  │  │  └─ ticketmasterApi.js
│  │  ├─ assets
│  │  │  ├─ fonts
│  │  │  ├─ images
│  │  │  ├─ styles
│  │  │  │  ├─ EventDetails.css
│  │  │  │  ├─ Header.css
│  │  │  │  ├─ SearchBar.css
│  │  │  │  └─ styles.css
│  │  │  └─ svg
│  │  ├─ components
│  │  │  ├─ common
│  │  │  │  └─ SearchBar.jsx
│  │  │  ├─ context
│  │  │  │  └─ AuthContext.js
│  │  │  ├─ events
│  │  │  │  ├─ EventDetails.jsx
│  │  │  │  ├─ EventList.jsx
│  │  │  │  └─ Map.jsx
│  │  │  ├─ forms
│  │  │  │  └─ SearchForm.jsx
│  │  │  └─ layout
│  │  │     ├─ Footer.js
│  │  │     └─ Header.js
│  │  ├─ hooks
│  │  │  └─ useDebouncedFetch.js
│  │  ├─ pages
│  │  │  ├─ About.js
│  │  │  ├─ Home.jsx
│  │  │  └─ SearchResults.jsx
│  │  │─ store
│  │  │  └─ store.js
│  │  ├─ App.js
│  │  └─ index.js
│  └─ webpack.config.js
└─ README.md

```
