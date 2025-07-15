
# Nuxt Book Directory


## What is This Project?

**Nuxt Book Directory** is a web application for searching, saving, and managing books. It provides features such as user authentication, book search (using Google Books API), favorites, readlist, and user profile management. The project is designed with a modern tech stack for better maintainability, scalability, and developer experience.

## Why Rewrite?

This project is a complete rewrite of the original `book-directory` app, which was built using ExpressJS, EJS, and MongoDB. The rewrite aims to:

- Adopt a modern frontend framework (Nuxt 3 + Vue 3)
- Use TypeScript for type safety
- Improve UI/UX with Tailwind CSS and component-driven design
- Switch to a relational database (MySQL) with Sequelize ORM
- Simplify full-stack development using Nuxt's server API capabilities

## Who is This For?

This project is intended for:
- Book lovers who want to manage their reading lists and favorites
- Developers interested in modern full-stack Nuxt applications
- Anyone looking for a reference on migrating from a traditional Express/EJS/MongoDB stack to Nuxt 3/TypeScript/MySQL

## How Does It Work?

- **Frontend:** Built with Nuxt 3, Vue 3, and Tailwind CSS. Provides a responsive, modern UI for searching and managing books.
- **Backend:** Uses Nuxt server API routes for authentication, book management, and user data. Sequelize ORM is used to interact with a MySQL database.
- **Authentication:** JWT-based authentication with secure cookie handling.
- **Book Data:** Integrates with the Google Books API for searching and displaying book information.
- **User Features:** Users can register, log in, search for books, save favorites, manage their readlist, and update their profile.

## Technology Stack

- Nuxt 3 (Vue 3, Vite)
- TypeScript
- Tailwind CSS
- MySQL (via Sequelize ORM)
- Google Books API
- SweetAlert2 (for notifications)

## Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zkaraqy/nuxt-book-directory.git
   cd nuxt-book-directory
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your database and API credentials as needed.

4. **Set up the database:**
   - Make sure you have MySQL running and a database created.
   - Run migrations and seeders (if available):
     ```bash
     npx sequelize db:migrate
     npx sequelize db:seed:all
     ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   The app will be available at `http://localhost:3000` by default.

## Contributing

Feel free to open issues or pull requests for improvements, bug fixes, or new features.

## License

MIT

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
"# nuxt-book-directory" 
