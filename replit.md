# MediScan AI - Medical Imaging Assistant

## Overview

MediScan AI is a full-stack web application that provides AI-powered medical scan analysis. The system allows healthcare professionals to upload medical images (X-ray, CT, MRI) and receive instant anomaly predictions with interpretable heatmaps and confidence scores. The application is designed to accelerate clinical triage and diagnosis by providing rapid preliminary analysis to assist radiologists.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript in strict mode
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Build Tool**: Vite with React plugin for development and production builds
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with TypeScript and ES modules
- **Framework**: Express.js for REST API endpoints
- **File Upload**: Multer middleware for handling multipart form data (50MB limit)
- **Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session store

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Three main entities:
  - `users`: User authentication and management
  - `medical_scans`: Metadata for uploaded medical images
  - `predictions`: AI analysis results with confidence scores, severity levels, and recommendations
- **Migrations**: Drizzle Kit for schema migrations and database management

### AI/ML Integration
- **Analysis Pipeline**: Mock AI analysis that simulates CNN-based medical image processing
- **Output Format**: Structured predictions including confidence scores, severity assessment, and clinical recommendations
- **Processing Flow**: Upload → Storage → AI Analysis → Results with heatmap visualization

### File Handling
- **Upload Constraints**: Images only (PNG/JPG), 50MB maximum file size
- **Storage Strategy**: Memory-based storage with provisions for file system or cloud storage
- **Preview Generation**: Client-side image preview using Object URLs

### Authentication & Security
- **Session-based Authentication**: Express sessions with PostgreSQL storage
- **HIPAA Compliance**: Secure data handling practices for medical information
- **Input Validation**: Zod schemas for type-safe data validation
- **CORS Configuration**: Proper cross-origin resource sharing setup

### Development Workflow
- **Hot Reloading**: Vite HMR for frontend, tsx for backend development
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Error Handling**: Runtime error overlay for development debugging
- **Build Process**: Separate frontend (Vite) and backend (esbuild) build processes

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **express**: Backend web framework
- **drizzle-orm**: Type-safe database ORM
- **zod**: Runtime type validation

### UI Component Libraries
- **@radix-ui**: Headless UI primitives for accessibility
- **lucide-react**: Icon library for consistent iconography
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management

### Development Tools
- **vite**: Frontend build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database migration and introspection tool

### File Processing
- **multer**: Multipart form data handling for file uploads
- **@types/multer**: TypeScript definitions for multer

### Database Integration
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **connect-pg-simple**: PostgreSQL session store for Express

### Styling and Design
- **autoprefixer**: CSS vendor prefixing
- **postcss**: CSS processing and transformation
- **tailwind-merge**: Tailwind class merging utility
- **clsx**: Conditional class name utility

The application follows a modern full-stack architecture with strong type safety, comprehensive error handling, and scalable data management patterns suitable for medical imaging applications requiring high reliability and security standards.