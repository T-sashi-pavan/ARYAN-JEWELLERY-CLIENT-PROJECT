#!/bin/bash

# Script to test the product creation API
# Make sure the backend is running on port 5000

echo "🔄 Testing Product Creation API..."

# Step 1: Login to get token
echo "📝 Step 1: Getting authentication token..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aryanjewels.com","password":"Admin@123"}')

echo "Login Response: $LOGIN_RESPONSE"

# Extract token from response (this is a simplified extraction)
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get authentication token"
  exit 1
fi

echo "✅ Token obtained: ${TOKEN:0:50}..."

# Step 2: Create a test product
echo "📝 Step 2: Creating test product..."

PRODUCT_RESPONSE=$(curl -s -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=API Test Bridal Necklace" \
  -F "price=₹15000" \
  -F "originalPrice=₹18000" \
  -F "category=bridal" \
  -F "subcategory=necklace" \
  -F "material=925 Sterling Silver" \
  -F "description=Beautiful test product created via API" \
  -F "tags=bridal,necklace,silver" \
  -F "weight=12.5" \
  -F "inStock=true" \
  -F "featured=true" \
  -F "images=@test-image.jpg")

echo "Product Creation Response:"
echo $PRODUCT_RESPONSE | jq '.' 2>/dev/null || echo $PRODUCT_RESPONSE

# Check if creation was successful
if echo $PRODUCT_RESPONSE | grep -q '"success":true'; then
  echo "✅ Product created successfully!"
else
  echo "❌ Product creation failed"
fi