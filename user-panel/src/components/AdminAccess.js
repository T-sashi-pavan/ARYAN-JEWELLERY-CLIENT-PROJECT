import React from 'react';
import { Link } from 'react-router-dom';
import './AdminAccess.css';

const AdminAccess = () => {
  return (
    <div className="admin-access-container">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <p>Manage your jewelry inventory</p>
        </div>
        
        <div className="admin-menu">
          <Link to="/admin/products" className="admin-menu-item">
            <div className="menu-icon">📦</div>
            <div className="menu-content">
              <h3>Product Management</h3>
              <p>View, edit, and delete products</p>
            </div>
          </Link>
          
          <Link to="/admin/add-product" className="admin-menu-item">
            <div className="menu-icon">➕</div>
            <div className="menu-content">
              <h3>Add New Product</h3>
              <p>Add new jewelry items to your inventory</p>
            </div>
          </Link>
          
          <Link to="/" className="admin-menu-item secondary">
            <div className="menu-icon">🏠</div>
            <div className="menu-content">
              <h3>View Website</h3>
              <p>Go back to the main website</p>
            </div>
          </Link>
        </div>
        
        <div className="admin-stats">
          <div className="stat-item">
            <h4>Quick Access</h4>
            <p>Use these direct links to manage your jewelry inventory</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;