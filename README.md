# ShopEZ - Modern E-Commerce Platform

ShopEZ is a full-stack, aesthetically driven e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features a sleek, high-contrast, minimalist UI inspired by premium athletic brands like Puma.

## Features

- **Puma-Inspired UI/UX**: Bold typography (Oswald & Inter), stark black & white contrast, and sharp geometric design elements.
- **Rich Product Data**: Integrates detailed product information including multiple image galleries, brand data, return policies, and customer reviews sourced from DummyJSON.
- **Responsive Layout**: fully mobile-responsive design utilizing Bootstrap 5 utility classes.
- **State Management**: Built-in React Context for handling secure User Authentication and persistent Shopping Cart state.
- **Mock Payment Flow**: Includes a simulated UPI checkout system.
- **Admin Dashboard**: Role-based access control allowing admin users to view sales statistics.

## Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Axios (API Client)
- Bootstrap 5 (Styling & Layout)
- Lucide React (Icons)
- Chart.js / react-chartjs-2 (Admin Analytics)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- JSON Web Tokens (JWT) for Authentication
- bcryptjs for Password Hashing

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YashJangid04/shopez.git
cd shopez
```

### 2. Backend Setup

Open a terminal navigate to the `backend` directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Seed the Database:**
To populate the database with categories and 100 products from DummyJSON (including an admin user), run:
```bash
node seed.js
```
*(Note: The seed script creates an admin user with email `admin@shopez.com` and password `admin123`)*

**Start the Backend Server:**
```bash
npm start
# or for development:
# npm run dev
```

### 3. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
npm install
```

**Start the Frontend Development Server:**
```bash
npm run dev
```

The application will now be running on `http://localhost:5173/` (or the port specified by Vite), communicating with the backend API at `http://localhost:5000`.

## Project Structure

```
shopez/
├── backend/
│   ├── config/      # Database connection
│   ├── controllers/ # Route logic (Auth, Products, Orders)
│   ├── middleware/  # JWT Authentication & Error handling
│   ├── models/      # Mongoose Schemas
│   ├── routes/      # API Endpoints
│   ├── seed.js      # DummyJSON database population script
│   └── server.js    # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI pieces (Navbar, ProductCard, Footer)
    │   ├── context/    # React Context providers (Auth, Cart)
    │   ├── pages/      # Main views (Home, Shop, Detail, Cart, Profile, Admin)
    │   ├── App.jsx     # Routing configuration
    │   └── index.css   # Core styling and theme variables
    └── ...
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
