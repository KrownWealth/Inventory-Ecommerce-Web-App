# Inventory E-commerce Web Application(Hometung Pricesage) 

![Macbook-Air-localhost (1)](https://github.com/user-attachments/assets/c740c020-b91d-486e-ab63-02b2dbc448da)


## Project Overview

## The Idea

Designed and developed a web-application to streamline inventory and sales management while enhancing the customer shopping experience. Here's the breakdown:

### Admin Interface

- An admin dashboard for stock managers to:
- Add new inventory.
- Automatically calculate product selling prices using markup percentages.
- Visualize key metrics, including total products, completed orders, and revenue.

### Customer Interface

- A product page where customers can:
- View available products.
- Add products to their cart and proceed to checkout.
- Leave reviews and ratings for purchased products.
- A customer profile page that displays individual order histories.



## The Goal

This project is built to achieve the following:

### Admin Interface Benefits

- Provide actionable insights via the admin dashboard.
- Improve stock manager efficiency with automated stock uploads and pricing.
- Enable visualization of total products, orders, and customer signups.
- Simplify product pricing decisions for businesses on the go.



### Customer-Facing Interface Benefits

- Deliver an intuitive, user-friendly e-commerce experience.
- Reduce cart abandonment with a seamless checkout process.
- Ensure secure payments with Stripe integration.
- Increase customer purchase intent with product ratings and reviews.



## The Objectives

Through this project, I aim to:

- Develop a complex full-stack e-commerce application.
- Articulate my thought process and justify technical decisions.
- Address critical customer requirements and deliver features that enhance business growth.



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



## Tech Stack

- **Frontend**: TypeScript, Next.js, React, Tailwind CSS, Shadcn UI used for creating the user interface and admin dashboard.
- **Backend**: Node.js through NextJS SSR for API logic and Supabase for backend data management and user authentication.
- **Database**: 
  - Supabase: Product and user data storage.
  - MongoDB: Storage for product ratings and user reviews.
  - MongoDB for rating and review storage.
- **Data Management / Database Connectivity**: Prisma ORM and Mongoose used for data modeling and backend connectivity.
- **Cloud Storage**: Cloudinary for product image storage.
- **Payment Processing**: Stripe for secure and reliable transactions.
- **Frontend Testing Frameworks**: 
  - Vitest
  - React Testing Library for unit testing.
 
-**Additional Tools**
- Zod: Form validation.
- Recharts: Charts for admin dashboard.
- NextAuth: Authentication.

-**Deployment**
Vercel


## Getting Started

### Prerequisites
- **Node.js**: Version 14.x or later
- - **Next.js**: Version 14.2.5 or later
  - - **React.js**: Version 18 or later
- **Supabase**: For database and authentication
- **MongoDB**: Database for rating and products review
- **Cloudinary**: For image storage
- **Stripe**: For payment processing
  

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KrownWealth/Inventory-Ecommerce-Web-App.git
   cd Inventory-Ecommerce-Web-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` and  `.env` file in the root of both the frontend and backend directories, including keys for Supabase, MongoDB, Cloudinary, and Stripe.

   ```env
   SUPABASE_URL=<your_supabase_url>
   SUPABASE_KEY=<your_supabase_key>
   MONGO_URI=<your_mongodb_uri>
   CLOUDINARY_URL=<your_cloudinary_url>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   ```

4. **Run database migrations**:
   ```bash
   npx prisma generate and npx prisma migrate dev
   ```

5. **Start the development servers**:
   ```bash
   npm run dev
   ```

6. **Open the app**:
   Visit `http://localhost:3000` for the frontend

## Testing

- **Unit Tests**: Run Vitest ests
  ```bash
  npm test
  ```


## Roadmap

- [ ] Add additional AI simulations for advanced analytics.
- [ ] Expand inventory management capabilities (e.g., bulk upload, stock alerts).
- [ ] Implement multi-language support.
- [ ] Integrate advanced customer analytics for better business insights.
