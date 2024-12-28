# Aim Training App

An interactive web-based application designed to improve aim and precision through customizable training modules. Built with modern web technologies for speed, scalability, and user experience.

## Features

- **Customizable Training**: Adjust difficulty, targets, and scenarios.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Performance Metrics**: Real-time feedback and progress tracking.
- **Lightweight Build**: Fast load times with Vite and Tailwind CSS.

## Tech Stack

- **Frontend**: TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Configuration**: PostCSS, Tailwind, TypeScript

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd aim-training-app-main
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Server

To start the development server, run:
```bash
npm run dev
```
The app will be available at `http://localhost:3000/` by default.

### Build for Production

To create a production build, use:
```bash
npm run build
```
The output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## File Structure

```
.
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable components
│   ├── styles/           # Global styles
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── package.json          # Project metadata and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

Happy aiming! 🎯
