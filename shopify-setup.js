// Shopify Setup Script
// Run this in your browser console to connect to Shopify

// Step 1: Replace these with your actual Shopify credentials
const YOUR_SHOPIFY_STORE = 'your-store-name'; // Your store name without .myshopify.com
const YOUR_API_TOKEN = 'your-api-token';      // Your Admin API access token

// Step 2: Run this function to connect
function connectToShopify() {
    console.log('🔄 Connecting to Shopify...');
    
    // Enable Shopify integration
    enableShopifyIntegration(YOUR_SHOPIFY_STORE, YOUR_API_TOKEN);
    
    console.log('✅ Shopify connection initiated!');
    console.log('📦 Products should load automatically...');
}

// Step 3: Test the connection
function testShopifyConnection() {
    console.log('🧪 Testing Shopify connection...');
    console.log('Store:', SHOPIFY_CONFIG.store);
    console.log('API Key:', SHOPIFY_CONFIG.apiKey ? 'Set' : 'Not set');
    console.log('Enabled:', SHOPIFY_CONFIG.enabled);
    
    // Try to fetch products
    fetchProductsFromShopify().then(success => {
        if (success) {
            console.log('✅ Shopify connection successful!');
            console.log('📊 Products loaded:', products.length);
        } else {
            console.log('❌ Shopify connection failed. Check your credentials.');
        }
    });
}

// Instructions
console.log(`
🛍️ KLYXSHOP Shopify Setup Instructions:

1. Replace 'your-store-name' with your actual Shopify store name
2. Replace 'your-api-token' with your actual API token
3. Run: connectToShopify()
4. Test: testShopifyConnection()

Your store name should be like: 'my-awesome-store' (without .myshopify.com)
Your API token should be a long string like: 'shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
`);

// Auto-run if credentials are set
if (YOUR_SHOPIFY_STORE !== 'your-store-name' && YOUR_API_TOKEN !== 'your-api-token') {
    console.log('🚀 Auto-connecting to Shopify...');
    connectToShopify();
}



