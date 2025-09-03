# 🩺 MediScan AI

A modern web application for medical scan analysis using AI technology. Upload medical scans (X-rays, CT scans, MRIs, etc.) and get instant AI-powered analysis with confidence scores and recommendations.

## ✨ Features

- 📁 **Medical Scan Upload**: Support for PNG, JPG medical images (up to 50MB)
- 🤖 **AI Analysis**: Intelligent medical scan interpretation
- 📊 **Confidence Scoring**: Get confidence levels for predictions
- 🎯 **Severity Assessment**: Low, medium, high severity classifications
- 💡 **Recommendations**: AI-generated medical recommendations
- 👤 **User Management**: Secure user authentication
- 📱 **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM
- **Styling**: TailwindCSS + Radix UI
- **File Upload**: Multer
- **Authentication**: Passport.js

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL 16
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/devabhay07/mediscan-ai.git
cd mediscan-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up PostgreSQL**
```bash
# Start PostgreSQL service
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE mediscan;
CREATE USER mediscan_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE mediscan TO mediscan_user;
GRANT ALL ON SCHEMA public TO mediscan_user;
\q
```

4. **Configure environment**
Create a `.env` file:
```env
DATABASE_URL="postgresql://mediscan_user:your_password@localhost:5432/mediscan"
PORT=5000
```

5. **Push database schema**
```bash
npm run db:push
```

6. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5000` to see the application running!

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Application pages
│   │   └── types/         # TypeScript type definitions
├── server/                # Backend Express server
├── shared/                # Shared schemas and types
└── migrations/            # Database migrations
```

## 🔐 Security Features

- Input validation with Zod schemas
- SQL injection protection with parameterized queries
- File upload restrictions and validation
- Session-based authentication
- CORS configuration

## 📊 Database Schema

- **Users**: User authentication and profiles
- **Medical Scans**: Uploaded scan metadata
- **Predictions**: AI analysis results and recommendations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for demonstration purposes only. It should not be used for actual medical diagnosis. Always consult with healthcare professionals for medical advice.

## 👨‍💻 Author

**Abhay** - [@devabhay07](https://github.com/devabhay07)

## 🙏 Acknowledgments

- Built with modern web technologies
- UI components from Radix UI
- Icons from Lucide React
- Styling with TailwindCSS

---

Made with ❤️ for better healthcare technology
