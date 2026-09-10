# Synexus Capstone 🚀

## 📌 Project Overview

Synexus Capstone is the final project of the **Synexus 50-Day Web Development Challenge**.

The project combines the concepts and features developed throughout the challenge into a single responsive web application. The Capstone focuses on building a **Vanilla JavaScript Single Page Application (SPA)** with reusable Web Components, global state management, persistent storage, API integration, routing, offline support, and interactive UI features.

---

## 🎯 Phase 5 — Capstone Requirements

Phase 5 focuses on bringing together the concepts learned during the previous phases and developing a complete, functional web application.

### Day 46 — Core UI Shell

* Built the main application structure using HTML5.
* Implemented a Single Page Application structure with:

  * `<main id="app-root">`
* Added responsive design and global CSS.
* Added viewport metadata for responsive layouts.
* Used CSS variables and reusable layout styles.

### Day 47 — Component Library

Implemented reusable Web Components using **Shadow DOM**.

Components include:

* `<user-card>`
* `<data-feed>`
* `<custom-modal>`
* `<cart-counter>`
* `<product-button>`

These components are designed to be reusable and independent from the main page styling.

### Day 48 — State & Memory

Implemented application state and persistent browser storage.

Features include:

* Global state management using a Pub/Sub approach.
* Reactive state updates.
* IndexedDB for persistent data storage.
* Offline data loading and storage.

### Day 49 — Data Streams & Routing

Implemented client-side data handling and navigation.

Features include:

* Vanilla JavaScript SPA routing.
* API abstraction through `api.js`.
* Fetch retry handling.
* Asynchronous data loading.
* Parallel requests using `Promise.all`.
* GitHub developer and repository lookup.

### Day 50 — Offline & Polish

Added offline functionality and final application improvements.

Features include:

* Service Worker registration.
* Static asset caching.
* Offline support.
* Loading indicators.
* Error handling.
* Responsive UI.
* Accessibility considerations.
* Final UI and functionality testing.

---

## ✨ Additional Features

The Capstone also integrates features developed during the earlier stages of the 50-Day Challenge.

### Community Features

* About section
* Core Team section
* Community testimonials
* Community data feed
* Initiative proposal system

### Productivity Features

* Task Tracker
* Kanban-style Task Board
* Drag-and-drop tasks

### Interactive Features

* Dark mode
* Custom modals
* Reactive components
* Infinite scrolling
* WebSocket live communication
* Web Worker background processing

### GitHub Integration

Users can search for a GitHub developer and view:

* Public developer information
* Recently updated repositories

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Web Components
* Shadow DOM
* IndexedDB
* REST APIs
* GitHub API
* WebSocket
* Web Workers
* Service Workers

---

## 📂 Project Structure

```text
synexus-capstone/
│
├── index.html
├── style.css
├── main.js
├── api.js
├── db.js
├── router.js
├── sw.js
├── utils.js
├── worker.js
├── websocket.js
├── README.md
│
├── components/
│   ├── UserCard.js
│   ├── DataFeed.js
│   ├── CustomModal.js
│   ├── CartCounter.js
│   └── ProductButton.js
│
└── core/
    └── store.js
```

---

## 🌐 Live Website

**Synexus Capstone:**
https://bhumikam925.github.io/synexus-capstone/

## 📚 Original 50-Day Challenge Repository

**50-Day Web Development Challenge:**
https://github.com/bhumikam925/50-days-web-dev-challenge-

