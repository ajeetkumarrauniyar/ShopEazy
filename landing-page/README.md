# RuralLedger Landing Page

A modern, responsive landing page for RuralLedger - India's first offline-first rural billing app.

## Features

- 🎨 Beautiful, production-ready design
- 📱 Fully responsive across all devices
- ⚡ Built with React, TypeScript, and Tailwind CSS
- 🗄️ Integrated with Appwrite for waitlist data storage
- 🔒 Form validation and error handling
- 🎯 Optimized for conversions

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Appwrite Backend

1. Go to [Appwrite Cloud](https://cloud.appwrite.io) and create a free account
2. Create a new project
3. Create a database called "ruralledger-db"
4. Create a collection called "waitlist" with these attributes:
   - `email` (string, optional, size: 255)
   - `phone` (string, required, unique, size: 20)
   - `userType` (string, required, size: 20)
   - `createdAt` (string, required, size: 50)
   - `source` (string, optional, size: 50)
   - `referralCode` (string, optional, size: 20)

5. Set collection permissions:
   - Create: Any (to allow public form submissions)
   - Read: None (for privacy)
   - Update: None
   - Delete: None

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Appwrite project details:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=ruralledger-db
VITE_APPWRITE_COLLECTION_ID=waitlist
```

### 4. Run the Development Server

```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Problem.tsx     # Problem statement
│   ├── Solution.tsx    # Solution overview
│   ├── Features.tsx    # Feature showcase
│   ├── Audience.tsx    # Target audience
│   ├── Waitlist.tsx    # Waitlist signup form
│   ├── FAQ.tsx         # Frequently asked questions
│   └── Footer.tsx      # Footer section
├── lib/
│   └── appwrite.ts     # Appwrite configuration and API
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## Key Features

### Waitlist Integration
- Real-time form validation
- Duplicate phone number prevention
- Error handling with user-friendly messages
- Success confirmation with waitlist position
- Data stored securely in Appwrite

### Design Highlights
- Smooth animations and micro-interactions
- Mobile-first responsive design
- Accessibility-friendly components
- Professional color scheme and typography
- Optimized for conversion

### Technical Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Appwrite (Database, Authentication ready)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify, Vercel, or any static host

## Deployment

The app is ready for deployment to any static hosting service:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_COLLECTION_ID`

## License

MIT License - feel free to use this for your own projects!