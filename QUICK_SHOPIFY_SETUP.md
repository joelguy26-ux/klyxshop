# 🚀 Quick Shopify Setup Guide

## **Step 1: Get Your Shopify Credentials**

### **A. Create Shopify App**
1. Go to your **Shopify Admin Dashboard**
2. Navigate to **Settings** → **Apps and sales channels**
3. Click **"Develop apps"** (at the bottom)
4. Click **"Create an app"**
5. Name it: **"KLYXSHOP Integration"**
6. Click **"Create app"**

### **B. Set Permissions**
In your app's **Configuration** tab, enable:
- ✅ **Products** - Read access
- ✅ **Collections** - Read access
- ✅ **Inventory** - Read access

### **C. Install & Get Token**
1. Click **"Install app"**
2. Copy the **Admin API access token** (starts with `shpat_`)

## **Step 2: Connect to KLYXSHOP**

### **Method A: Quick Setup (Recommended)**

1. **Open your KLYXSHOP website**
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. **Copy and paste this code:**

```javascript
// Replace with your actual credentials
const storeName = 'your-store-name'; // Without .myshopify.com
const apiToken = 'shpat_your_actual_token_here';

// Connect to Shopify
enableShopifyIntegration(storeName, apiToken);
```

5. **Press Enter** - Products should load automatically!

### **Method B: Update Code Directly**

1. **Open `script.js`**
2. **Find this section:**
```javascript
const SHOPIFY_CONFIG = {
    store: 'your-store-name',
    apiKey: 'your-api-key',
    enabled: false
};
```

3. **Replace with your credentials:**
```javascript
const SHOPIFY_CONFIG = {
    store: 'your-actual-store-name',
    apiKey: 'shpat_your_actual_token_here',
    enabled: true
};
```

4. **Save and refresh** your website

## **Step 3: Test the Connection**

### **Check if it's working:**
```javascript
// Run this in console to test
testShopifyConnection();
```

### **You should see:**
- ✅ "Shopify connection successful!"
- ✅ Number of products loaded
- ✅ Your actual products on the page

## **Step 4: Verify Products**

### **What to look for:**
- ✅ **Real product images** from your Shopify store
- ✅ **Actual product names** and prices
- ✅ **Correct stock status** (sold out badges)
- ✅ **Products in correct sections** (based on tags)

## **🔧 Troubleshooting**

### **❌ "CORS Error"**
- **Solution:** This is normal in development
- **Fix:** Use a local server or browser extension to disable CORS

### **❌ "401 Unauthorized"**
- **Check:** Store name is correct (no .myshopify.com)
- **Check:** API token is correct and has proper permissions

### **❌ "Products not loading"**
- **Check:** Browser console for error messages
- **Fallback:** System will use sample data if Shopify fails

### **❌ "Images not showing"**
- **Check:** Product images exist in Shopify
- **Fallback:** Placeholder images will be used

## **🎯 Collection Mapping**

### **How products are organized:**
- Products with **`featured`** tag → **Featured Products** section
- All other products → **Collection 8 Myrtle** section

### **To change this:**
1. **In Shopify:** Add/remove tags from products
2. **Or modify the code** in `fetchProductsFromShopify()` function

## **✅ Success Checklist**

- [ ] Shopify app created with correct permissions
- [ ] API token copied and pasted correctly
- [ ] Store name entered without .myshopify.com
- [ ] `enabled: true` in configuration
- [ ] Products loading from Shopify
- [ ] Images displaying correctly
- [ ] Stock status working
- [ ] Add to cart functionality working

## **🚀 You're Done!**

Once connected, your KLYXSHOP will:
- ✅ **Automatically sync** with your Shopify store
- ✅ **Update in real-time** when you change products
- ✅ **Handle stock levels** automatically
- ✅ **Work on all devices** (mobile, tablet, desktop)

**Your products will now load automatically from Shopify!** 🎉
