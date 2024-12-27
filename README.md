# Portfolio Management System

## Project Overview

This project is a portfolio management system built using:

- **Next.js**
- **NextAuth** (Authentication)
- **Tailwind CSS**
- **TypeScript**
- **MongoDB**

It allows users to manage portfolios and investments with authentication and access control.

## Features

- User authentication with NextAuth
- Role-based access control (admin, user)
- CRUD operations for users, portfolios, and investments
- Data validation on both client and server
- Multi-language support (English, Polish)
- Pagination for portfolios and investments

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   MONGODB_URI=your-mongodb-uri
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application can be easily deployed using [Vercel](https://vercel.com/).

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Add the required environment variables in Vercel settings.
4. Deploy the application.
