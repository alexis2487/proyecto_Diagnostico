# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d6355b0b-1a86-437d-99e1-85dd31c07419

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d6355b0b-1a86-437d-99e1-85dd31c07419) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d6355b0b-1a86-437d-99e1-85dd31c07419) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Local development (recommended)

If you're running this project locally, follow these extra steps to configure environment variables and run the dev server.

1. Copy the example env file and fill in real values (do NOT commit real secrets):

```sh
cp .env.example .env
# then edit .env and replace placeholders (or create the file manually on Windows)
```

On Windows PowerShell you can copy with:

```powershell
Copy-Item .env.example .env
# then open .env in your editor and replace placeholders
```

2. Install dependencies and start the dev server:

```sh
npm install
npm run dev
```

3. Open the URL shown by Vite in your browser (by default: http://localhost:5173).

Notes:
- The project expects the following client-exposed environment variables (see `src/integrations/supabase/client.ts`):
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_PUBLISHABLE_KEY`
- We added `.env` to `.gitignore` and provided `.env.example` so you can share config structure without leaking secrets.

If you want, update this README with more project-specific instructions (database, migrations, seed data, etc.).
