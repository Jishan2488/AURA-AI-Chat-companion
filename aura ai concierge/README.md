# Aura - AI Concierge

A sleek, vibecoded AI concierge designed for a capstone hackathon project. Aura provides freestyle guidance, "AI for Good" ideation, and acts as an empathetic assistant during your building journey.

## Features

- **Conversational AI:** Powered by Google's Gemini 3.5 Flash model for fast, empathetic, and creative responses.
- **Typewriter Effect:** Dynamic message rendering makes the AI feel alive.
- **Message Reactions:** Like or save specific AI suggestions for later reference.
- **Modern Tech Stack:** Built with React 19, Tailwind CSS v4, Express, and Vite.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Motion (Animations), Lucide React (Icons)
- **Backend:** Node.js, Express
- **AI Integration:** `@google/genai` SDK
- **Build Tools:** Vite, esbuild, TypeScript

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A [Gemini API Key](https://aistudio.google.com/app/apikey)

## Setup & Installation

Follow these steps to get the project running locally:

### 1. Clone the repository
Clone the code to your local machine and navigate into the project directory.

### 2. Install dependencies
Run the following command to install all required packages:
```bash
npm install
```

### 3. Environment Variables
Copy the provided example environment file to create your own:
```bash
cp .env.example .env
```
Open the `.env` file and replace `"MY_GEMINI_API_KEY"` with your actual Gemini API key:
```env
GEMINI_API_KEY="your_actual_api_key_here"
```

### 4. Development
Start the development server. This runs both the Express backend and the Vite frontend middleware.
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 5. Production Build
To build the application for production, run:
```bash
npm run build
```
This command compiles the React frontend into static files in the `dist/` directory and bundles the Express server using esbuild.

### 6. Start Production Server
After building, you can start the production server:
```bash
npm run start
```
The production server will serve the static frontend files and the AI API endpoints.

## Project Structure

- `src/App.tsx`: Main React application containing the chat interface.
- `src/types.ts`: TypeScript definitions for the application state.
- `src/index.css`: Tailwind CSS imports and global styles.
- `server.ts`: The Express backend entry point that handles the `/api/chat` Gemini integration and serves the frontend.
- `vite.config.ts`: Vite configuration for the frontend build.

## License
MIT License
