# Aryan's Jewels - Admin Panel Setup Guide

## Quick Start Commands

### 1. Install Backend Dependencies & Start Server

```bash
# Navigate to backend directory
cd admin-backend

# Install dependencies
npm install

# Start development server
npm run dev
```

Backend will be running on: `http://localhost:5000`

### 2. Install Frontend Dependencies & Start Admin Panel

```bash
# Open new terminal, navigate to frontend directory
cd admin-panel

# Install dependencies
npm install

# Start development server
npm run dev
```

Admin panel will be running on: `http://localhost:3001`

### 3. Create Default Admin Account

```bash
# In another terminal, create default admin
curl -X POST http://localhost:5000/api/auth/setup
```

### 4. Login to Admin Panel

1. Go to: `http://localhost:3001/login`
2. Use credentials:
   - **Email:** `admin@aryanjewels.com`
   - **Password:** `Admin@123`

## Prerequisites

- **Node.js** (v16+)
- **MongoDB** (local or cloud)
- **Git** for version control

## MongoDB Setup

### Option 1: Local MongoDB
```bash
# Windows - Install MongoDB Community Edition
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB service
net start MongoDB
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at `https://www.mongodb.com/atlas`
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Environment Configuration

Backend `.env` file is already configured with default values:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aryan-jewels-admin
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@aryanjewels.com
ADMIN_PASSWORD=Admin@123
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads/
```

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Kill process on port 5000
npx kill-port 5000
```

**MongoDB connection error:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database permissions

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 3001
npx kill-port 3001
```

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## API Testing

Test backend endpoints with curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aryanjewels.com","password":"Admin@123"}'

# Get products
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/products
```

## Next Steps

1. **Add Products:** Use the admin panel to add jewelry products
2. **Upload Images:** Test image upload functionality
3. **Customize:** Modify categories and fields as needed
4. **Deploy:** Set up production environment

## Production Deployment

### Backend
1. Update `.env` with production values
2. Use process manager like PM2
3. Set up reverse proxy (nginx)
4. Enable HTTPS

### Frontend
1. Build: `npm run build`
2. Deploy `dist` folder to hosting service
3. Configure environment variables

## Development Commands

```bash
# Backend
npm run dev        # Start with nodemon
npm start          # Start production server

# Frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

Happy coding! 🚀