# Cyber Pyme Score

Una aplicación web de diagnóstico de ciberseguridad para pequeñas y medianas empresas.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase

## Prerequisites

- Node.js 18+ 
- npm 9+ or bun

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/alexis2487/cyber-pyme-score.git
cd cyber-pyme-score

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── data/           # Static data files
└── integrations/   # External service integrations
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file in the root directory with required Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Database Migrations

Migrations are located in `supabase/migrations/` and are managed through Supabase CLI.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.
