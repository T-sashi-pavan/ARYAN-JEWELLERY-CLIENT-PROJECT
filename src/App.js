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
// Import bridal subcategory components
import PayalCollection from './components/PayalCollection';
import ChainsCollection from './components/ChainsCollection';
import BraceletsCollection from './components/BraceletsCollection';
import NecklaceCollection from './components/NecklaceCollection';
import NoseRingsCollection from './components/NoseRingsCollection';
// Import women's subcategory components
import WomenPayalCollection from './components/WomenPayalCollection';
import WomenChainsCollection from './components/WomenChainsCollection';
import WomenBraceletsCollection from './components/WomenBraceletsCollection';
import WomenNecklaceCollection from './components/WomenNecklaceCollection';
import WomenNoseRingsCollection from './components/WomenNoseRingsCollection';
// Import men's subcategory components
import MenChainsCollection from './components/MenChainsCollection';
import MenBraceletsCollection from './components/MenBraceletsCollection';
import MenRingsCollection from './components/MenRingsCollection';
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
              {/* Bridal subcategory routes */}
              <Route path="/bridal-collection/payal" element={<PayalCollection />} />
              <Route path="/bridal-collection/chains" element={<ChainsCollection />} />
              <Route path="/bridal-collection/bracelets" element={<BraceletsCollection />} />
              <Route path="/bridal-collection/necklace" element={<NecklaceCollection />} />
              <Route path="/bridal-collection/nose-rings" element={<NoseRingsCollection />} />
              <Route path="/women-collection" element={<WomenCollection />} />
              {/* Women's subcategory routes */}
              <Route path="/women-collection/payal" element={<WomenPayalCollection />} />
              <Route path="/women-collection/chains" element={<WomenChainsCollection />} />
              <Route path="/women-collection/bracelets" element={<WomenBraceletsCollection />} />
              <Route path="/women-collection/necklace" element={<WomenNecklaceCollection />} />
              <Route path="/women-collection/nose-rings" element={<WomenNoseRingsCollection />} />
              <Route path="/mens-collection" element={<MensCollection />} />
              {/* Men's subcategory routes */}
              <Route path="/mens-collection/chains" element={<MenChainsCollection />} />
              <Route path="/mens-collection/bracelets" element={<MenBraceletsCollection />} />
              <Route path="/mens-collection/rings" element={<MenRingsCollection />} />
              <Route path="/lifestyle-collection" element={<LifestyleCollection />} />
              {/* Lifestyle subcategory routes */}
              <Route path="/lifestyle-collection/coins" element={<CoinsCollection />} />
              <Route path="/lifestyle-collection/murthi" element={<MurthiCollection />} />
              <Route path="/lifestyle-collection/decorative" element={<DecorativeCollection />} />
              <Route path="/lifestyle-collection/pooja-items" element={<PoojaItemsCollection />} />
              <Route path="/lifestyle-collection/living-room" element={<LivingRoomCollection />} />
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

