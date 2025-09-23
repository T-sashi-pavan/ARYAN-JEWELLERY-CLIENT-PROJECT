# Aryan's Jewels Admin Panel

A comprehensive admin panel for managing jewelry products with secure authentication, full CRUD operations, image upload, and advanced filtering.

## 🚀 Features

### ✅ Completed Features

- **Secure Authentication System**
  - JWT-based login with email/password
  - Password hashing with bcrypt
  - Protected routes and middleware
  - Session management and auto-logout

- **Product Management (CRUD)**
  - Complete product model with all required fields
  - Create, read, update, delete products
  - Bulk operations (delete multiple products)
  - Product search and pagination
  - CSV export functionality

- **Image Upload System**
  - Multiple image upload with Multer
  - File validation and size limits
  - Image storage and URL generation
  - Delete unused images

- **Admin Interface**
  - Responsive React frontend with TailwindCSS
  - Dashboard with statistics and charts
  - Product listing with filters
  - Settings page with password change
  - Mobile-friendly navigation

### 🚧 Features to Implement

- **Advanced Product Form**
  - Rich text editor for descriptions
  - Drag-and-drop image upload
  - Category-specific fields
  - SEO optimization fields

- **Enhanced Features**
  - Advanced search and filters
  - Product analytics
  - Inventory alerts
  - Backup and restore

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🛠 Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd admin-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   - Copy `.env` file and update with your settings:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aryan-jewels-admin
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   ADMIN_EMAIL=admin@aryanjewels.com
   ADMIN_PASSWORD=Admin@123
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads/
   ```

4. **Start MongoDB:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (via Homebrew)
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

5. **Start the backend server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will be running on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd admin-panel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The admin panel will be running on `http://localhost:3001`

### Initial Setup

1. **Create default admin account:**
   ```bash
   # Make a POST request to create default admin
   curl -X POST http://localhost:5000/api/auth/setup
   ```

2. **Login to admin panel:**
   - Go to `http://localhost:3001/login`
   - Use credentials from `.env` file:
     - Email: `admin@aryanjewels.com`
     - Password: `Admin@123`

## 📁 Project Structure

```
admin-backend/
├── models/
│   ├── Admin.js          # Admin user model
│   └── Product.js        # Product model with all fields
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── products.js      # Product CRUD routes
│   └── upload.js        # File upload routes
├── middleware/
│   ├── auth.js          # JWT authentication middleware
│   └── upload.js        # Multer file upload middleware
├── uploads/             # File storage directory
├── .env                 # Environment variables
├── server.js           # Express server setup
└── package.json

admin-panel/
├── src/
│   ├── components/      # Reusable React components
│   ├── contexts/        # React contexts (Auth)
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin profile
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout
- `POST /api/auth/setup` - Create default admin

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `DELETE /api/products/bulk` - Bulk delete products
- `GET /api/products/stats` - Get product statistics
- `GET /api/products/export/csv` - Export products as CSV

### File Upload
- `POST /api/upload/product-images` - Upload multiple product images
- `POST /api/upload/single-image` - Upload single image
- `DELETE /api/upload/delete-image/:filename` - Delete image
- `GET /api/upload/images` - Get all uploaded images
- `GET /api/upload/storage-info` - Get storage information

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** bcrypt with salt rounds
- **Rate Limiting:** Prevent brute force attacks
- **CORS Protection:** Configured for specific origins
- **File Validation:** Image type and size validation
- **Input Sanitization:** Express validator for API inputs

## 📊 Product Schema

Each product includes the following fields:

- **Basic Info:** Name, SKU, Category, Type
- **Images:** Multiple images with primary image designation
- **Material:** Type, purity, weight, cost per gram
- **Pricing:** Base price, offer price, list price, discounts
- **Inventory:** Quantity, status, low stock threshold
- **Display:** Homepage visibility, featured status, sort order
- **Description:** Short and long descriptions
- **Attributes:** Gemstone details, occasion, style, size
- **SEO:** Meta title, description, keywords, slug
- **Tracking:** Views, sales count, creation/update timestamps

## 🎨 UI Components

The admin panel includes:

- **Responsive Design:** Mobile-first approach with TailwindCSS
- **Dashboard:** Statistics cards, charts, quick actions
- **Product Management:** Data table with search, filters, pagination
- **Authentication:** Secure login with form validation
- **Navigation:** Sidebar navigation with active states
- **Notifications:** Toast messages for user feedback

## 🚀 Deployment

### Backend Deployment

1. **Environment Variables:**
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb://your-production-db-url
   JWT_SECRET=your-production-secret
   ```

2. **Build and start:**
   ```bash
   npm start
   ```

### Frontend Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: admin@aryanjewels.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

---

**Note:** This admin panel is specifically designed for Aryan's Jewels and includes jewelry-specific features and categories. The product schema and UI are optimized for jewelry inventory management.