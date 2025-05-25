# CineXperience – Full-Stack Cinema Booking Web App (Spring Boot & React)

**CineXperience** is a full-stack web application designed to manage and explore movies and cinema sessions across multiple cities. Built with **Spring Boot**, **React**, and **MySQL**, the platform provides an interactive experience for both admin and user roles.

## ✅ Current Features

### 🎬 Movie Management
- View all available movies
- View detailed movie pages
- Insert, update, and delete movies (admin only)

### 📅 Session Scheduling
- Add movie sessions (admin only)
- View sessions grouped by movie and city
- Display session hall, time, and available seats
- Filter movies by city selection in the header

### 👥 Authentication & Roles
- Register and login
- Session saved in `localStorage`
- Different behavior for admin vs regular user:
  - Admin: can edit/delete movies and sessions
  - User: can only view session information

### 🏙️ City Support
- Cities are stored in the database
- Admin can assign movie sessions to specific cities
- Users can filter available movies by selected city (dropdown in header)

### 🎟️ Seat Booking System
- Choose number of tickets (1–8)
- Interactive seat selection per session
- Real-time display of reserved vs. available seats
- Dynamic total price calculation
- Booking validation per session

## 🔄 Upcoming Features
- Movie filtering by genre
- User profile page with session history
- Wishlist functionality for saving movies the user wants to watch

## 🚀 Tech Stack

- **Backend**: Spring Boot, JPA, MySQL
- **Frontend**: React, Bootstrap
- **Communication**: REST API using Axios


🛠️ **Note:** This project is still in active development and will be updated frequently as new functionality is added.
