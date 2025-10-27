e// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-center');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu && navMenu) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Promotional Modal
let showPromoModal = false;

function showPromo() {
    if (!showPromoModal) {
        const promoModal = document.getElementById('promo-modal');
        if (promoModal) {
            promoModal.classList.add('active');
            showPromoModal = true;
        }
    }
}

function closePromoModal() {
    const promoModal = document.getElementById('promo-modal');
    if (promoModal) {
        promoModal.classList.remove('active');
    }
}

// Show promo modal on page load after a delay
setTimeout(() => {
    showPromo();
}, 1000);

// Close promo modal when clicking outside
document.addEventListener('click', function(e) {
    const promoModal = document.getElementById('promo-modal');
    if (e.target === promoModal) {
        closePromoModal();
    }
});

// Close promo modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePromoModal();
    }
});

// Shopping Cart Functionality
let cart = [];
let cartTotal = 0;

// Add to cart function
function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showAddToCartAnimation();
}

// Remove from cart function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Update quantity function
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart items display
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <i class="fas fa-tshirt"></i>
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

// Toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.toggle('active');
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Thank you for your purchase!\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}\n\nThis would redirect to payment processing.`);
    
    // Clear cart after checkout
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Add to cart animation
function showAddToCartAnimation() {
    const cartBtn = document.querySelector('.nav-icon');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        cartBtn.style.color = '#dc2626';
        
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
            cartBtn.style.color = 'white';
        }, 300);
    }
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cart-modal');
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Close cart with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.classList.remove('active');
        }
    }
});

// Newsletter subscription
function subscribeEmail() {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput ? emailInput.value : '';
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    alert('Thank you for subscribing to our newsletter!');
    if (emailInput) {
        emailInput.value = '';
    }
}

// Add click handlers for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.querySelector('.product-name').textContent;
        const productPrice = this.querySelector('.product-price').textContent;
        const price = parseFloat(productPrice.replace('$', ''));
        
        // Generate a unique ID for the product
        const productId = 'product-' + Math.random().toString(36).substr(2, 9);
        
        addToCart(productId, productName, price);
    });
    
    // Add cursor pointer
    card.style.cursor = 'pointer';
});

// Hero cards are now non-interactive - only hover effects remain

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterBtn = newsletterForm.querySelector('.newsletter-btn');
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                subscribeEmail();
            });
        }
    }
});

// Promo modal form submission
document.addEventListener('DOMContentLoaded', function() {
    const promoSignupBtn = document.querySelector('.promo-signup-btn');
    if (promoSignupBtn) {
        promoSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneInput = document.querySelector('.promo-input');
            const phone = phoneInput ? phoneInput.value : '';
            
            if (!phone) {
                alert('Please enter your phone number');
                return;
            }
            
            alert('Thank you for signing up! You\'ll receive your 10% discount code via SMS.');
            closePromoModal();
        });
    }
});

// Product Management System
let products = [];
let collections = [];

// Sample product data structure
const sampleProducts = [
    {
        id: 'wraith-shirt',
        name: 'WRAITH SHIRT',
        price: 40.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: true,
        collection: 'myrtle'
    },
    {
        id: 'solstice-thermal',
        name: 'SOLSTICE THERMAL',
        price: 62.00,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: true,
        collection: 'myrtle'
    },
    {
        id: 'myrtle-thermal',
        name: 'MYRTLE THERMAL',
        price: 62.00,
        image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: true,
        collection: 'myrtle'
    },
    {
        id: 'spotlight-hoodie',
        name: 'SPOTLIGHT HOODIE',
        price: 68.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: false,
        collection: 'myrtle'
    },
    {
        id: 'camo-jorts',
        name: 'CAMO JORTS',
        price: 62.00,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: false,
        collection: 'myrtle'
    },
    {
        id: 'white-war-thermal',
        name: 'WHITE WAR THERMAL',
        price: 58.00,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: false,
        collection: 'featured'
    },
    {
        id: 'black-war-thermal',
        name: 'BLACK WAR THERMAL',
        price: 58.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: false,
        collection: 'featured'
    },
    {
        id: 'tiger-thermal',
        name: 'TIGER THERMAL',
        price: 62.00,
        image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: false,
        collection: 'featured'
    },
    {
        id: 'black-leopard-crewneck',
        name: 'BLACK LEOPARD CREWNECK',
        price: 68.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: true,
        collection: 'featured'
    },
    {
        id: 'black-leopard-sweats',
        name: 'BLACK LEOPARD SWEATS',
        price: 62.00,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        soldOut: false,
        collection: 'featured'
    }
];

// Function to render products dynamically
function renderProducts(containerSelector, productFilter = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let productsToRender = products;
    if (productFilter) {
        productsToRender = products.filter(product => product.collection === productFilter);
    }

    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No products available</p>
            </div>
        `;
        return;
    }

    container.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
                ${product.soldOut ? '<div class="sold-out-badge">Sold Out</div>' : ''}
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
    `).join('');

    // Re-attach event listeners to new product cards
    attachProductCardListeners(containerSelector);
}

// Function to attach event listeners to product cards
function attachProductCardListeners(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            const product = products.find(p => p.id === productId);
            
            if (product && !product.soldOut) {
                addToCart(product.id, product.name, product.price);
            } else if (product && product.soldOut) {
                alert('This product is currently sold out.');
            }
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Function to import products from external source
function importProducts(productData) {
    try {
        // Validate product data structure
        if (!Array.isArray(productData)) {
            throw new Error('Product data must be an array');
        }

        // Validate each product has required fields
        for (let product of productData) {
            if (!product.id || !product.name || !product.price) {
                throw new Error('Each product must have id, name, and price');
            }
        }

        // Replace products array
        products = productData;
        
        // Re-render all product sections
        renderProducts('.collection-section .product-grid', 'myrtle');
        renderProducts('.featured-section .product-grid', 'featured');
        
        console.log(`Successfully imported ${productData.length} products!`);
        return true;
        
    } catch (error) {
        console.error('Error importing products:', error.message);
        return false;
    }
}

// Function to add a single product
function addProduct(product) {
    // Validate product structure
    if (!product.id || !product.name || !product.price) {
        console.error('Product must have id, name, and price');
        return false;
    }

    // Check if product already exists
    const existingIndex = products.findIndex(p => p.id === product.id);
    if (existingIndex !== -1) {
        // Update existing product
        products[existingIndex] = { ...products[existingIndex], ...product };
    } else {
        // Add new product
        products.push(product);
    }

    // Re-render product sections
    renderProducts('.collection-section .product-grid', 'myrtle');
    renderProducts('.featured-section .product-grid', 'featured');
    
    return true;
}

// Function to remove a product
function removeProduct(productId) {
    products = products.filter(p => p.id !== productId);
    
    // Re-render product sections
    renderProducts('.collection-section .product-grid', 'myrtle');
    renderProducts('.featured-section .product-grid', 'featured');
    
    return true;
}

// Function to update product stock status
function updateProductStock(productId, soldOut) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.soldOut = soldOut;
        
        // Re-render product sections
        renderProducts('.collection-section .product-grid', 'myrtle');
        renderProducts('.featured-section .product-grid', 'featured');
        
        return true;
    }
    return false;
}

// Function to get products by collection
function getProductsByCollection(collection) {
    return products.filter(product => product.collection === collection);
}

// Function to search products
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.id.toLowerCase().includes(searchTerm)
    );
}

// Shopify Integration Configuration
const SHOPIFY_CONFIG = {
    store: 'your-store-name', // Replace with your Shopify store name (without .myshopify.com)
    apiKey: 'your-api-key',   // Replace with your Shopify API key
    apiVersion: '2023-10',
    enabled: false // Set to true when ready to connect to Shopify
};

// Shopify API Integration
async function fetchProductsFromShopify() {
    if (!SHOPIFY_CONFIG.enabled) {
        console.log('Shopify integration disabled. Using sample data.');
        return false;
    }

    try {
        const response = await fetch(`https://${SHOPIFY_CONFIG.store}.myshopify.com/admin/api/${SHOPIFY_CONFIG.apiVersion}/products.json`, {
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_CONFIG.apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Convert Shopify products to our format
        const shopifyProducts = data.products.map(product => ({
            id: product.id.toString(),
            name: product.title.toUpperCase(),
            price: parseFloat(product.variants[0]?.price || 0),
            image: product.images[0]?.src || 'https://via.placeholder.com/400x400',
            soldOut: !product.variants[0]?.available || false,
            collection: product.tags.includes('featured') ? 'featured' : 'myrtle',
            description: product.body_html,
            handle: product.handle,
            tags: product.tags.split(',').map(tag => tag.trim())
        }));

        // Import the products
        importProducts(shopifyProducts);
        console.log(`✅ Successfully loaded ${shopifyProducts.length} products from Shopify!`);
        return true;

    } catch (error) {
        console.error('❌ Error fetching products from Shopify:', error.message);
        console.log('🔄 Falling back to sample data...');
        return false;
    }
}

// Shopify Collections Integration
async function fetchCollectionsFromShopify() {
    if (!SHOPIFY_CONFIG.enabled) return false;

    try {
        const response = await fetch(`https://${SHOPIFY_CONFIG.store}.myshopify.com/admin/api/${SHOPIFY_CONFIG.apiVersion}/collections.json`, {
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_CONFIG.apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Shopify Collections API error: ${response.status}`);
        }

        const data = await response.json();
        collections = data.collections.map(collection => ({
            id: collection.id,
            title: collection.title,
            handle: collection.handle,
            image: collection.image?.src || 'https://via.placeholder.com/400x300'
        }));

        console.log(`✅ Successfully loaded ${collections.length} collections from Shopify!`);
        return true;

    } catch (error) {
        console.error('❌ Error fetching collections from Shopify:', error.message);
        return false;
    }
}

// Initialize with sample data or Shopify
async function initializeProducts() {
    // Try to load from Shopify first
    const shopifyLoaded = await fetchProductsFromShopify();
    
    if (!shopifyLoaded) {
        // Fallback to sample data
        products = [...sampleProducts];
        console.log('📦 Using sample product data');
    }
    
    // Load collections
    await fetchCollectionsFromShopify();
    
    // Render products
    renderProducts('.collection-section .product-grid', 'myrtle');
    renderProducts('.featured-section .product-grid', 'featured');
}

// Function to enable Shopify integration
function enableShopifyIntegration(storeName, apiKey) {
    SHOPIFY_CONFIG.store = storeName;
    SHOPIFY_CONFIG.apiKey = apiKey;
    SHOPIFY_CONFIG.enabled = true;
    
    console.log('🔄 Shopify integration enabled. Reloading products...');
    initializeProducts();
}

// Function to disable Shopify integration
function disableShopifyIntegration() {
    SHOPIFY_CONFIG.enabled = false;
    console.log('📦 Shopify integration disabled. Using sample data.');
    initializeProducts();
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    initializeProducts();
});

// Add hover effects to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add hover effects to hero cards
document.querySelectorAll('.hero-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .hero-card, .section-title');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation to buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #000, #333);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();