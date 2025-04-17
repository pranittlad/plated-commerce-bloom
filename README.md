
# Godhadya E-Commerce Website

A comprehensive e-commerce platform built with React, Tailwind CSS, Supabase, Stripe, and more.

## Features

- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop devices.
- **Product Catalog:** Browse products by category (Men/Women).
- **Search Functionality:** Find products by name.
- **Shopping Cart:** Add/remove items, adjust quantities, and see the total price.
- **User Accounts:** Register, login, and manage your profile.
- **Checkout Process:** Secure checkout with Stripe payment processing.
- **Order Management:** View your order history.

## Technology Stack

- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS, Shadcn/UI components
- **Routing:** React Router
- **Database:** Supabase
- **Authentication:** Supabase Auth
- **Forms:** React Hook Form with Zod validation
- **Payment Processing:** Stripe
- **State Management:** Context API, React Query
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/godhadya.git
   cd godhadya
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Supabase Setup

1. Create a new Supabase project.

2. Run the following SQL in the Supabase SQL editor to create the necessary tables:

```sql
-- Create products table
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create cart table
CREATE TABLE public.cart (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample data insertion
INSERT INTO public.products (name, price, category, description, image_url) VALUES
('Men''s Classic T-Shirt', 24.99, 'Men', 'A comfortable and versatile t-shirt that''s perfect for everyday wear. Made from 100% cotton with a classic fit.', 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'),
('Men''s Slim-Fit Jeans', 49.99, 'Men', 'Modern slim-fit jeans with a comfortable stretch. Perfect for both casual and semi-formal occasions.', 'https://images.unsplash.com/photo-1604176424472-45cd9f9dda69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'),
('Women''s Summer Dress', 39.99, 'Women', 'A lightweight, flowy summer dress with a floral pattern. Perfect for warm days and casual outings.', 'https://images.unsplash.com/photo-1569315729857-219941162c57?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'),
('Women''s Casual Blouse', 29.99, 'Women', 'A versatile blouse that can be dressed up or down. Features a comfortable fit and elegant design.', 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
```

3. Enable Email Authentication in Supabase Auth settings.

4. Set up Row Level Security (RLS) policies for your tables.

## Stripe Setup

1. Create a Stripe account if you don't already have one.

2. Get your API keys from the Stripe Dashboard.

3. Update the `.env` file with your Stripe public key.

4. For a production environment, you'll need to set up webhook endpoints.

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository.

2. Log in to Vercel and import your GitHub repository.

3. Set up environment variables in the Vercel dashboard.

4. Deploy the project!

### Deploying to Netlify

1. Push your code to a GitHub repository.

2. Log in to Netlify and import your GitHub repository.

3. Set up environment variables in the Netlify dashboard.

4. Deploy the project!

## Project Structure

```
godhadya/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/             # UI components from shadcn/ui
│   │   ├── Header.tsx      # Site header with navigation
│   │   ├── Footer.tsx      # Site footer
│   │   └── ...
│   ├── context/            # React context providers
│   │   ├── CartContext.tsx # Shopping cart state
│   │   └── AuthContext.tsx # Authentication state
│   ├── lib/                # Utility functions
│   │   ├── supabase.ts     # Supabase client and queries
│   │   └── utils.ts        # Helper functions
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Home page
│   │   ├── CategoryPage.tsx # Men's and Women's pages
│   │   └── ...
│   ├── App.tsx             # Main App component with routes
│   ├── index.css           # Global CSS
│   └── main.tsx            # Entry point
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.io/)
- [Stripe](https://stripe.com/)
- [React](https://reactjs.org/)
- [Unsplash](https://unsplash.com/) for the sample product images
