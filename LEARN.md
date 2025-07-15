# LEARN.md

## Quick Steps to Build and Run This Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/zkaraqy/nuxt-book-directory.git
   cd nuxt-book-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your database and API credentials.

4. **Set up the database**
   - Make sure MySQL is running and a database is created.
   - Run migrations and seeders:
     ```bash
     npm run db:migrate
     npm run db:seed
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   - Open your browser at [http://localhost:3000](http://localhost:3000)

---

**That's it!** You now have the project running locally. For more details, see the README.md.
