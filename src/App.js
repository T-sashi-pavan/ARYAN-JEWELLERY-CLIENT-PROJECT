import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import VideoSection from './components/VideoSection';
import Categories from './components/Categories';
import ItemsGrid from './components/ItemsGrid';
import Footer from './components/Footer';
import BridalCollection from './components/BridalCollection';
import WomenCollection from './components/WomenCollection';
import MensCollection from './components/MensCollection';
import LifestyleCollection from './components/LifestyleCollection';
import CoinsCollection from './components/CoinsCollection';
import MurthiCollection from './components/MurthiCollection';
import LivingRoomCollection from './components/LivingRoomCollection';
import PoojaItemsCollection from './components/PoojaItemsCollection';
import GiftCollection from './components/GiftCollection';
import DecorativeCollection from './components/DecorativeCollection';
import ProductDetail from './components/ProductDetail';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <VideoSection />
                  <Categories />
                  <ItemsGrid />
                </>
              } />
              <Route path="/bridal-collection" element={<BridalCollection />} />
              <Route path="/women-collection" element={<WomenCollection />} />
              <Route path="/mens-collection" element={<MensCollection />} />
              <Route path="/lifestyle-collection" element={<LifestyleCollection />} />
              <Route path="/coins-collection" element={<CoinsCollection />} />
              <Route path="/murthi-collection" element={<MurthiCollection />} />
              <Route path="/livingroom-collection" element={<LivingRoomCollection />} />
              <Route path="/poojaitems-collection" element={<PoojaItemsCollection />} />
              <Route path="/gift-collection" element={<GiftCollection />} />
              <Route path="/decorative-collection" element={<DecorativeCollection />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;

