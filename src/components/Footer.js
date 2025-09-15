import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">A</div>
              <div className="logo-text">
                <h3>ARYAN'S</h3>
                <span>SILVER PALACE</span>
              </div>
            </div>
            <p className="footer-description">
              Premium silver jewelry crafted with excellence and tradition. 
              Your trusted partner for elegant and authentic silver collections.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="Email">📧</a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#collections">Collections</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Collections Section */}
          <div className="footer-section">
            <h4>Collections</h4>
            <ul>
              <li><a href="#bridal">Bridal Collection</a></li>
              <li><a href="#women">Women Collection</a></li>
              <li><a href="#mens">Men's Collection</a></li>
              <li><a href="#lifestyle">Lifestyle Collection</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Silver Palace Street, Jewelry District</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>info@aryanssilverpalace.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <span>Mon - Sat: 10AM - 8PM</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 All rights reserved Aryan Silver palace - Developed by BOdega TECH SOLUTIONS</p>
            {/* <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Shipping Policy</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
