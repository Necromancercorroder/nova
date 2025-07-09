# NovaNexus 3D Prints - Replit Development Guide

## Overview

This is a full-stack web application for NovaNexus 3D Prints, a 3D printing services company. The application is built with a modern tech stack featuring React frontend, Express backend, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and build processes
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Animations**: Framer Motion for smooth transitions and effects

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: In-memory storage with plans for PostgreSQL sessions

### Key Design Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared directories
2. **TypeScript Throughout**: Full TypeScript implementation for type safety
3. **Component-Based UI**: Modular component architecture with reusable UI elements
4. **Modern CSS**: CSS custom properties for theming with Tailwind utility classes
5. **Development Experience**: Hot module replacement and error overlays for development

## Key Components

### Client Structure
- **Pages**: Home page with landing sections, 404 error page
- **Components**: Modular sections (Hero, Services, Gallery, Process, Contact, Footer)
- **UI Library**: Complete shadcn/ui component set with custom styling
- **Hooks**: Custom hooks for toast notifications and mobile detection

### Server Structure
- **Routes**: RESTful API endpoints (currently minimal setup)
- **Storage**: Abstracted storage interface with memory implementation
- **Middleware**: Request logging and error handling

### Shared Components
- **Schema**: Database schema definitions with Zod validation
- **Types**: Shared TypeScript interfaces and types

## Data Flow

### Current State
1. **Frontend**: Static content rendering with interactive components
2. **Backend**: Basic Express server with route registration
3. **Database**: User schema defined but not actively used
4. **Storage**: Memory-based storage interface ready for database integration

### Planned Flow
1. User interactions trigger API calls to Express backend
2. Backend processes requests using Drizzle ORM
3. Database operations return data to frontend via TanStack Query
4. UI updates reactively based on server state changes

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Production Setup
- **Server**: Node.js process serving bundled Express app
- **Static Files**: Frontend assets served from `dist/public`
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Environment**: Production mode with optimized builds

### Development Workflow
- **Hot Reload**: Vite dev server with HMR for frontend
- **API Development**: tsx for server-side development with auto-restart
- **Database**: Drizzle Kit for schema management and migrations

## Architecture Notes

### Scalability Considerations
- Stateless server design for horizontal scaling
- Database connection pooling through Neon serverless
- CDN-ready static asset organization

### Security Measures
- TypeScript for compile-time safety
- Zod validation for runtime data validation
- Prepared statements through Drizzle ORM

### Performance Optimizations
- Lazy loading and code splitting via Vite
- Optimized bundle sizes with tree shaking
- Efficient re-renders with React Query caching

The application is currently in a foundational state with a complete UI implementation and basic backend structure. The next development phase should focus on implementing the API endpoints, integrating the database operations, and adding user authentication features.