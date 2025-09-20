import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Clock } from 'lucide-react';
import logo from '../ASSETS/LOGO.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src={logo} 
                alt="Aryan's Silver Palace" 
                className="footer-logo-image"
                style={{
                  height: '80px', 
                  maxWidth: '200px', 
                  filter: 'brightness(1.2) contrast(1.1)',
                  objectFit: 'contain'
                }} 
              />
            </div>
            <p className="footer-description">
              Premium silver jewelry crafted with excellence and tradition. 
              Your trusted partner for elegant and authentic silver collections.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#collections">Collections</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Collections Section */}
          <div className="footer-section">
            <h4>Collections</h4>
            <ul>
              <li><a href="bridal-collection">Bridal Collection</a></li>
              <li><a href="women-collection">Women Collection</a></li>
              <li><a href="mens-collection">Men's Collection</a></li>
              <li><a href="lifestyle-collection">Lifestyle Collection</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-item">
              <span className="contact-icon">
                <MapPin size={18} />
              </span>
              <span>Silver Palace Street, Jewelry District</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">
                <Phone size={18} />
              </span>
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">
                <Mail size={18} />
              </span>
              <span>info@aryanssilverpalace.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">
                <Clock size={18} />
              </span>
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
