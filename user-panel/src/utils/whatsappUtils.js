// WhatsApp Utility Functions
export const WHATSAPP_NUMBER = '917330775225'; // Adding country code for international format

// Helper function to format price for WhatsApp message
const formatPriceForMessage = (price) => {
  if (typeof price === 'number') {
    return price.toLocaleString();
  }
  if (typeof price === 'string') {
    // Remove currency symbols and return clean number
    const cleanPrice = price.replace(/[^\d]/g, '');
    return parseInt(cleanPrice).toLocaleString();
  }
  return '0';
};

// Helper function to get numeric price value
const getPriceValue = (price) => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price === 'string') {
    return parseInt(price.replace(/[^\d]/g, ''));
  }
  return 0;
};

// Function to create WhatsApp message for cart checkout
export const createCartCheckoutMessage = (cartItems, total) => {
  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  let message = `🛍️ *NEW ORDER REQUEST*\n`;
  message += `📅 Date: ${orderDate}\n\n`;
  
  message += `📋 *ORDER DETAILS:*\n`;
  message += `════════════════════\n\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   💎 Category: ${item.category}\n`;
    message += `   📝 Description: ${item.description}\n`;
    message += `   💰 Price: ₹${formatPriceForMessage(item.price)}\n`;
    message += `   📦 Quantity: ${item.quantity}\n`;
    message += `   💵 Subtotal: ₹${(getPriceValue(item.price) * item.quantity).toLocaleString()}\n`;
    
    // Add image link if available
    if (item.image) {
      message += `   🖼️ Product Image: ${window.location.origin}${item.image}\n`;
    }
    message += `\n`;
  });

  message += `════════════════════\n`;
  message += `🧾 *ORDER SUMMARY:*\n`;
  message += `📦 Total Items: ${cartItems.length}\n`;
  message += `💰 *Total Amount: ₹${total.toLocaleString()}*\n`;
  message += `🚚 Shipping: Free\n\n`;

  message += `📍 *NEXT STEPS:*\n`;
  message += `• Please confirm this order\n`;
  message += `• Share delivery address\n`;
  message += `• Preferred payment method\n\n`;

  message += `🙏 Thank you for choosing Aryan's Silver Palace!\n`;
  message += `We'll process your order shortly.`;

  return encodeURIComponent(message);
};

// Function to create WhatsApp message for wishlist inquiry
export const createWishlistInquiryMessage = (wishlistItems) => {
  const inquiryDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  let message = `💝 *WISHLIST INQUIRY*\n`;
  message += `📅 Date: ${inquiryDate}\n\n`;
  
  message += `🌟 *PRODUCTS OF INTEREST:*\n`;
  message += `════════════════════\n\n`;

  wishlistItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   💎 Category: ${item.category}\n`;
    message += `   📝 Description: ${item.description}\n`;
    message += `   💰 Price: ₹${formatPriceForMessage(item.price)}\n`;
    
    // Add image link if available
    if (item.image) {
      message += `   🖼️ Product Image: ${window.location.origin}${item.image}\n`;
    }
    message += `\n`;
  });

  message += `════════════════════\n`;
  message += `💡 *INQUIRY DETAILS:*\n`;
  message += `📦 Total Items: ${wishlistItems.length}\n`;
  message += `🎯 Status: Interested in offers/discounts\n\n`;

  message += `🤔 *QUESTIONS:*\n`;
  message += `• Are there any current offers on these items?\n`;
  message += `• Do you provide bulk discounts?\n`;
  message += `• What are the latest designs available?\n`;
  message += `• Can I get a special quote for these items?\n\n`;

  message += `🙏 Thank you! Looking forward to your best offers.\n`;
  message += `- Aryan's Silver Palace Customer`;

  return encodeURIComponent(message);
};

// Function to open WhatsApp with pre-filled message
export const openWhatsApp = (message) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  
  // Try to open in new tab/window
  const newWindow = window.open(whatsappUrl, '_blank');
  
  // Fallback for popup blockers
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    // If popup is blocked, redirect in same window
    window.location.href = whatsappUrl;
  }
};

// Function for cart WhatsApp checkout
export const handleCartWhatsAppCheckout = (cartItems, total) => {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const message = createCartCheckoutMessage(cartItems, total);
  openWhatsApp(message);
};

// Function for wishlist WhatsApp inquiry
export const handleWishlistWhatsAppInquiry = (wishlistItems) => {
  if (wishlistItems.length === 0) {
    alert('Your wishlist is empty!');
    return;
  }
  
  const message = createWishlistInquiryMessage(wishlistItems);
  openWhatsApp(message);
};
