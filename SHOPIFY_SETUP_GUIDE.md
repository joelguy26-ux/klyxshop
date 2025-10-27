# 🛍️ Shopify Integration Setup Guide

## **✅ You Have BOTH Options!**

### **🔄 Option 1: Automatic Shopify Integration (Recommended)**
- **Products sync automatically** from your Shopify store
- **Real-time updates** when you add/edit products in Shopify
- **Collections sync** automatically
- **Stock levels** update in real-time
- **No manual work** required!

### **📝 Option 2: Manual Import (For Testing)**
- Import products manually using JavaScript functions
- Perfect for testing and development
- Full control over product data

---

## **🚀 Setting Up Automatic Shopify Integration**

### **Step 1: Get Your Shopify API Credentials**

1. **Go to your Shopify Admin**
2. **Navigate to:** Settings → Apps and sales channels → Develop apps
3. **Click:** "Create an app"
4. **Name your app:** "KLYXSHOP Integration"
5. **Click:** "Create app"

### **Step 2: Configure API Permissions**

In your new app, go to **Configuration** and enable these permissions:

```
✅ Products - Read access
✅ Collections - Read access
✅ Inventory - Read access
```

### **Step 3: Install the App**

1. **Click:** "Install app" in your Shopify admin
2. **Copy the Admin API access token**

### **Step 4: Connect to Your KLYXSHOP**

**Method A: Using Browser Console**
1. Open your KLYXSHOP website
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Run this command:

```javascript
enableShopifyIntegration('your-store-name', 'your-api-token');
```

**Method B: Update the Code Directly**
1. Open `script.js`
2. Find the `SHOPIFY_CONFIG` section
3. Update these values:

```javascript
const SHOPIFY_CONFIG = {
    store: 'your-actual-store-name',     // Your Shopify store name
    apiKey: 'your-actual-api-token',     // Your API token
    apiVersion: '2023-10',
    enabled: true                        // Set to true to enable
};
```

---

## **🎯 How It Works**

### **Automatic Product Sync**
- ✅ **Fetches all products** from your Shopify store
- ✅ **Converts to your format** automatically
- ✅ **Updates collections** based on Shopify tags
- ✅ **Syncs stock levels** in real-time
- ✅ **Handles images** from Shopify CDN

### **Collection Mapping**
- Products with `featured` tag → **Featured Products** section
- All other products → **Collection 8 Myrtle** section
- You can customize this mapping in the code

### **Real-time Updates**
- Products update when you refresh the page
- Stock levels sync automatically
- New products appear instantly

---

## **🔧 Advanced Configuration**

### **Custom Collection Mapping**
```javascript
// In the fetchProductsFromShopify function, modify this line:
collection: product.tags.includes('featured') ? 'featured' : 'myrtle'

// To use different tags:
collection: product.tags.includes('new-arrivals') ? 'featured' : 'myrtle'
```

### **Custom Product Fields**
```javascript
// Add more fields from Shopify:
const shopifyProducts = data.products.map(product => ({
    id: product.id.toString(),
    name: product.title.toUpperCase(),
    price: parseFloat(product.variants[0]?.price || 0),
    image: product.images[0]?.src || 'https://via.placeholder.com/400x400',
    soldOut: !product.variants[0]?.available || false,
    collection: product.tags.includes('featured') ? 'featured' : 'myrtle',
    description: product.body_html,
    handle: product.handle,
    tags: product.tags.split(',').map(tag => tag.trim()),
    // Add more fields:
    vendor: product.vendor,
    productType: product.product_type,
    createdAt: product.created_at
}));
```

---

## **🛠️ Troubleshooting**

### **Common Issues & Solutions**

**❌ "CORS Error"**
- **Solution:** Use a server or proxy for production
- **Development:** Use browser extensions to disable CORS

**❌ "401 Unauthorized"**
- **Solution:** Check your API token and permissions
- **Verify:** Store name is correct (no .myshopify.com)

**❌ "Products not loading"**
- **Solution:** Check browser console for error messages
- **Fallback:** System automatically uses sample data

**❌ "Images not showing"**
- **Solution:** Check image URLs in Shopify
- **Fallback:** Placeholder images are used

---

## **📊 Testing Your Integration**

### **Test Commands**
```javascript
// Check if Shopify is connected
console.log('Shopify enabled:', SHOPIFY_CONFIG.enabled);

// Test product loading
fetchProductsFromShopify().then(success => {
    console.log('Products loaded:', success);
});

// Check current products
console.log('Current products:', products.length);
```

### **Debug Mode**
```javascript
// Enable debug logging
SHOPIFY_CONFIG.debug = true;

// This will show detailed logs in console
```

---

## **🚀 Production Deployment**

### **For Production Use:**

1. **Set up a server** to handle CORS issues
2. **Use environment variables** for API credentials
3. **Enable HTTPS** for security
4. **Set up error monitoring**

### **Environment Variables Example:**
```javascript
const SHOPIFY_CONFIG = {
    store: process.env.SHOPIFY_STORE_NAME,
    apiKey: process.env.SHOPIFY_API_KEY,
    apiVersion: '2023-10',
    enabled: process.env.NODE_ENV === 'production'
};
```

---

## **✅ Benefits of Automatic Integration**

- 🚀 **Zero manual work** - Products sync automatically
- 🔄 **Real-time updates** - Changes appear instantly
- 📱 **Mobile responsive** - Works on all devices
- 🛡️ **Error handling** - Falls back to sample data if needed
- 🎨 **Professional styling** - Matches your design perfectly
- 💰 **Cost effective** - No additional fees
- 🔧 **Easy maintenance** - Update products in Shopify admin

---

## **🎯 Quick Start Checklist**

- [ ] Create Shopify app and get API token
- [ ] Enable required permissions
- [ ] Update `SHOPIFY_CONFIG` in script.js
- [ ] Set `enabled: true`
- [ ] Test with `enableShopifyIntegration()`
- [ ] Verify products load correctly
- [ ] Deploy to production

**You're ready to go!** 🚀
