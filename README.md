# CineXperience – Full-Stack Cinema Booking Web App (Spring Boot & React)

**CineXperience** is a full-stack web application designed to manage and explore movies and cinema sessions across multiple cities. Built with **Spring Boot**, **React**, and **MySQL**, the platform provides an interactive experience for both admin and user roles.

## ✅ Current Features

### 🎬 Movie Management
- View all available movies
- View detailed movie pages
- Insert, update, and delete movies *(admin only)*
- Add movies with:
  - Poster upload via file selector
  - Duration selection via scrollable input
  - Multiple genres (from a predefined list)

### 📅 Session Scheduling
- Admins can add new movie sessions
- View sessions grouped by movie and city
- Display session hall, time, and available seats
- Filter movies by city and genre

### 🎟️ Seat Booking System
- Choose number of tickets (1–8)
- **Interactive seat map**:
  - Select specific seats
  - Visually differentiate between reserved and available seats
- Real-time **total price calculation**
- Validation for existing reservations

### 🎚️ Filtering & Navigation
- Dropdown filters by **city** (in header) and **genre**
- Only movies available for the selected filters are shown
- If no movies match the filters, an informative message is displayed

### 👥 Authentication & Roles
- Register and login
- User session stored in `localStorage`
- Behavior based on role:
  - **Admin**: can add/edit/delete movies and sessions
  - **User**: can browse, filter, and book seats

---

## 🛠️ Under Development
- Profile page with booking history
- Rating system for movies
- Wishlist / favorite movies
- PDF/email confirmation after booking

---

## 🚀 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| **Backend** | Java Spring Boot, JPA, MySQL |
| **Frontend**| React, Bootstrap 5, Axios  |
| **Storage** | Local file system (for posters) |
| **API**     | RESTful APIs              |

---

> ℹ️ **Note**: This project is actively being developed. New features and refinements are added regularly.
