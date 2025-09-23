#!/bin/bash

# Test script to verify the image upload fix
echo "🔧 Testing Fixed Image Upload System..."

# Get authentication token
echo "📝 Getting authentication token..."
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aryanjewels.com","password":"Admin@123"}' | \
  grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get authentication token"
  exit 1
fi

echo "✅ Token obtained successfully"

# Create a unique product to avoid duplicates
TIMESTAMP=$(date +%s)
UNIQUE_SKU="TEST-IMG-FIX-$TIMESTAMP"
UNIQUE_NAME="Fixed Image Test Product $TIMESTAMP"

echo "📝 Creating test product with unique identifiers..."
echo "SKU: $UNIQUE_SKU"
echo "Name: $UNIQUE_NAME"

# Test product creation with single image
RESPONSE=$(curl -s -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=$UNIQUE_NAME" \
  -F "price=₹5000" \
  -F "category=bridal" \
  -F "subcategory=necklace" \
  -F "material=925 Sterling Silver" \
  -F "description=Test product created after fixing image upload issue" \
  -F "sku=$UNIQUE_SKU" \
  -F "weight=10.5" \
  -F "inStock=true" \
  -F "featured=true" \
  -F "tags=test,fixed,single-image" \
  -F "image=@test-image.jpg")

echo "📊 API Response:"
echo $RESPONSE | jq '.' 2>/dev/null || echo $RESPONSE

# Check if creation was successful
if echo $RESPONSE | grep -q '"success":true'; then
  echo "✅ SUCCESS! Image upload fix is working perfectly!"
  echo "🎉 Product created with single image upload"
  
  # Extract product ID for verification
  PRODUCT_ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
  if [ ! -z "$PRODUCT_ID" ]; then
    echo "📝 Product ID: $PRODUCT_ID"
    echo "🔍 Testing product retrieval..."
    
    # Verify product was created correctly
    VERIFY_RESPONSE=$(curl -s -X GET http://localhost:5000/api/products/$PRODUCT_ID \
      -H "Authorization: Bearer $TOKEN")
    
    echo "✅ Product verification:"
    echo $VERIFY_RESPONSE | jq '.data.image' 2>/dev/null || echo "Image field: $(echo $VERIFY_RESPONSE | grep -o '"image":"[^"]*' | cut -d'"' -f4)"
  fi
else
  echo "❌ Product creation failed"
  echo "Error details: $RESPONSE"
fi

echo ""
echo "🔍 Summary:"
echo "- Backend now uses upload.single('image') instead of upload.array('images')"
echo "- Frontend sends single image with field name 'image'"
echo "- Image path format: /uploads/products/filename"
echo "- Compatible with main website's product.image format"