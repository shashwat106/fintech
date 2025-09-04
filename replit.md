# Fusion Starter - Personal Finance Manager

## Overview
This is a full-stack TypeScript application featuring a React frontend with Vite and an Express backend. The app provides comprehensive personal finance management tools including budget planning, expense tracking, savings goals, stock exploration, and financial tips.

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js with TypeScript  
- **UI Library**: Radix UI components with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Build System**: Vite with separate client/server builds

## Recent Changes (2025-09-04)
- Successfully imported from GitHub and configured for Replit environment
- Updated Vite configuration to use host 0.0.0.0 and port 5000 for Replit compatibility
- Installed all dependencies and resolved TypeScript configuration issues
- Set up development workflow running on port 5000
- Configured deployment for production using autoscale target
- Verified application loads correctly with all routes and components working

## Development Setup
- Development server runs on port 5000 via `npm run dev`
- Frontend and backend are integrated in development mode
- API endpoints available at `/api/*` routes
- Static assets served from `dist/spa` in production

## Key Features
- Budget Planning
- Expense Tracking  
- Savings Goals
- Stock Market Explorer
- Financial Tips and News
- Responsive design with dark/light mode support

## User Preferences
- None specified yet

## Deployment
- Build command: `npm run build`
- Start command: `npm start`
- Deployment target: autoscale (suitable for stateless web applications)