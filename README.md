# E-commerce Admin Inventory Management System(Price Sage) and Customer Product Page(Hometung)

## Project Overview

This project is an e-commerce platform with two main components: an admin dashboard for stock management and a customer-facing product interface. 

The admin dashboard enables stock managers to manage inventory efficiently, calculate real-time product pricing based on markup percentages, and visualize essential business metrics like total products, completed orders, and revenue. 

The customer dashboard allows users to browse products, add items to a cart, complete purchases, leave reviews, and manage their profiles.

This platform aims to simplify pricing decisions, provide actionable insights, and offer a robust stock management and metrics. The result is a comprehensive solution that supports seamless e-commerce operations and enhance user eperience through product rating and review.

## Features

### Admin Dashboard
- **Inventory Management**: Add, update, and delete inventory items.
- **Dynamic Pricing**: Generate real-time product prices based on customizable markup percentages.
- **Data Visualization**: Track and visualize total products, completed orders, and total revenue using Power BI.

### Customer Dashboard
- **Product Catalog**: Browse available products and add them to a cart.
- **Checkout Process**: Secure checkout with payment integration using Stripe.
- **Product Reviews and Ratings**: Customers can leave reviews and rate products post-purchase.
- **Customer Profile Management**: Each customer can view, edit, or delete their profile, with full CRUD functionality.

## Goals

- Provide actionable insights for better pricing decisions and e-commerce management.
- Allow businesses to measure stock performance and simulate various customer interaction outcomes.
- Showcase a complete e-commerce stack, demonstrating the developer's ability to meet critical customer requirements with robust architecture and testing practices.

## Tech Stack

- **Frontend**: React, Next.JS with TypeScript for the user interface and admin dashboard.
- **Backend**: Node.js for API logic and Supabase for backend data management and user authentication.
- **Database**: 
  - Supabase for core data storage (user profiles, products, and orders).
  - MongoDB for rating and review storage.
- **Data Management**: Prisma ORM for efficient data handling and backend connectivity.
- **Media Storage**: Cloudinary for storing product images and profile avatars.
- **Payment Processing**: Stripe for secure and reliable transactions.
- **Testing**: 
  - Jest and React Testing Library for unit testing.
  - Cypress for end-to-end testing.

## Starting Architecture

- **Frontend**: React with TypeScript for the customer and admin interfaces, including a dynamic dashboard displaying product and sales metrics.
- **Backend**: Node.js, Supabase, and MongoDB with Prisma ORM to manage data and perform metric calculations.
- **Database**: Supabase and MongoDB to store all data for users, products, orders, and reviews.
- **Data Visualization**: Microsoft Power BI to generate charts and graphs representing sales, orders, and other performance metrics.

## Getting Started

### Prerequisites
- **Node.js**: Version 14.x or later
- **Supabase**: For database and authentication
- **MongoDB**: Database for comments
- **Cloudinary**: For image storage
- **Stripe**: For payment processing
- **Amazon QuickSight**: For admin data visualization
- **Microsoft Power BI**: For data visualization within the dashboard

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KrownWealth/pricesage.git
   cd pricesage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of both the frontend and backend directories, including keys for Supabase, MongoDB, Cloudinary, and Stripe.

   ```env
   SUPABASE_URL=<your_supabase_url>
   SUPABASE_KEY=<your_supabase_key>
   MONGO_URI=<your_mongodb_uri>
   CLOUDINARY_URL=<your_cloudinary_url>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate deploy
   ```

5. **Start the development servers**:
   ```bash
   npm run dev
   ```

6. **Open the app**:
   Visit `http://localhost:3000` for the frontend

## Testing

- **Unit Tests**: Run Jest tests
  ```bash
  npm test
  ```
- **End-to-End Tests**: Run Cypress tests
  ```bash
  npx cypress open
  ```

## Roadmap

- [ ] Add additional AI simulations for advanced analytics.
- [ ] Expand inventory management capabilities (e.g., bulk upload, stock alerts).
- [ ] Implement multi-language support.
- [ ] Integrate advanced customer analytics for better business insights.
