# 🛍️ Products CRUD - Next.js

A modern web application built with Next.js and TypeScript that implements a complete CRUD (Create, Read, Update, Delete) system for products using the [FakeStore API](https://fakestoreapi.com/).

## 🌐 Live Demo

Check out the live application: [https://testedevcrud.netlify.app/products](https://testedevcrud.netlify.app/products)

## 🚀 Features

- ✅ **Product Listing** - Browse all products with a beautiful data table
- ✅ **Product Details** - View detailed information about each product
- ✅ **Create Product** - Add new products with form validation
- ✅ **Update Product** - Edit existing products
- ✅ **Delete Product** - Remove products with confirmation
- ✅ **Dark/Light Mode** - Toggle between themes
- ✅ **Responsive Design** - Works on mobile and desktop
- ✅ **Search & Filter** - Search products and filter by category
- ✅ **Sorting** - Sort by any column in the data table

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AndreGM/test-nextjs.git
cd test-nextjs
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Run tests with UI
pnpm test:ui

# Clean cache and reinstall dependencies
pnpm store prune
rm -rf node_modules
pnpm install
```

## 🧪 Testing

Run tests with interactive UI:

```bash
pnpm test:ui
```

This will open the test runner interface where you can view and run all tests.

## 🌐 API Endpoints Used

The application integrates with [FakeStore API](https://fakestoreapi.com/):

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

> ⚠️ **Note:** The FakeStore API is public and doesn't persist data. Changes are simulated but not saved permanently.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── products/          # Products pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── forms/            # Form components
│   ├── providers/        # Context providers
│   └── ui/               # shadcn/ui components
├── http/                  # API integration
│   └── schemas/          # Zod schemas
└── lib/                   # Utilities
```

## 🎨 Features in Detail

### Data Table
- Sortable columns
- Search functionality
- Category filtering
- Pagination
- Row actions (View, Edit, Delete)

### Forms
- Client-side validation with Zod
- Real-time error messages
- Loading states
- Success/error notifications

### Theme System
- Light mode
- Dark mode
- System preference detection
- Persistent theme selection

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Andre GM**

- GitHub: [@AndreGM](https://github.com/AndreGM)
- Repository: [test-nextjs](https://github.com/AndreGM/test-nextjs)
- Live Demo: [testedevcrud.netlify.app](https://testedevcrud.netlify.app/products)

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing the product data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Netlify](https://netlify.com/) for hosting platform
