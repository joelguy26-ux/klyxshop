// ============================================
// AMAZON AFFILIATE PRODUCTS SYSTEM
// ============================================
// 
// To add products, simply add objects to the amazonProducts array below.
// Each product needs:
//   - id: unique identifier
//   - name: product name
//   - price: product price (number)
//   - originalPrice: original price if on sale (optional)
//   - image: product image URL
//   - image2: second image for hover effect (optional)
//   - affiliateLink: your Amazon affiliate link
//   - category: product category (optional, for filtering)
//
// Example affiliate link format:
//   https://www.amazon.com/dp/PRODUCT_ID?tag=YOUR_AFFILIATE_TAG
// ============================================

// Amazon Affiliate Products Data
// Add your products here - this is where you'll manage all your affiliate links
const amazonProducts = [
    // Your first Amazon affiliate product
    {
        id: 'product-1',
        name: 'Heated Blanket',
        price: 0,
        image: 'images/Gemini_Generated_Image_lk9naalk9naalk9n.png',
        image2: 'images/Gemini_Generated_Image_lk9naalk9naalk9n.png',
        affiliateLink: 'https://amzn.to/4sKu8B6',
        category: 'home'
    },
    // Featured product
    {
        id: 'product-2',
        name: 'Steam Cleaner',
        price: 0,
        image: 'images/featured-product.png',
        image2: 'images/featured-product.png',
        affiliateLink: 'https://amzn.to/4qGOtpz',
        category: 'featured'
    },
    // Snow Blower
    {
        id: 'product-3',
        name: 'Snow Blower',
        price: 0,
        image: 'images/snow-blower.png',
        image2: 'images/snow-blower.png',
        affiliateLink: 'https://amzn.to/4romoTZ',
        category: 'featured'
    },
    // Wheel Snow Pusher
    {
        id: 'product-4',
        name: 'Wheel Snow Pusher',
        price: 0,
        image: 'images/wheel-snow-pusher.png',
        image2: 'images/wheel-snow-pusher.png',
        affiliateLink: 'https://amzn.to/3Z6SiZ4',
        category: 'featured'
    },
    // Vegetable Chopper
    {
        id: 'product-5',
        name: 'Vegetable Chopper',
        price: 0,
        image: 'images/vegetable-chopper.png',
        image2: 'images/vegetable-chopper.png',
        affiliateLink: 'https://amzn.to/4a8B4iQ',
        category: 'home'
    },
    // Food Cutting Scissors
    {
        id: 'product-6',
        name: 'Food Cutting Scissors',
        price: 0,
        image: 'images/food-cutting-scissors.png',
        image2: 'images/food-cutting-scissors.png',
        affiliateLink: 'https://amzn.to/4ceqERn',
        category: 'home'
    },
    // Dyson SuperSonic Dryer
    {
        id: 'product-7',
        name: 'Dyson SuperSonic Dryer',
        price: 0,
        image: 'images/dyson-supersonic-dryer.png',
        image2: 'images/dyson-supersonic-dryer.png',
        affiliateLink: 'https://amzn.to/4knQzIr',
        category: 'featured'
    },
    // Polo Quarter Zip
    {
        id: 'product-8',
        name: 'Polo Quarter Zip',
        price: 0,
        image: 'images/polo-quarter-zip.png',
        image2: 'images/polo-quarter-zip.png',
        affiliateLink: 'https://amzn.to/4top31G',
        category: 'featured'
    },
    // Tracking Tripod
    {
        id: 'product-9',
        name: 'Tracking Tripod',
        price: 0,
        image: 'images/tracking-tripod.png',
        image2: 'images/tracking-tripod.png',
        affiliateLink: 'https://amzn.to/4tieVaB',
        category: 'featured'
    }
    // Add more products here by copying the object above and updating the details
];

// ============================================
// SHOPIFY STOREFRONT INTEGRATION
// ============================================
// This system allows you to sell your own products via Shopify
// while also displaying Amazon affiliate products above

// Shopify Configuration
let SHOPIFY_CONFIG = {
    store: 'cbpgj6-gb',
    apiKey: '202eb1236910457febb7ee281668f083',
    apiVersion: '2023-10',
    enabled: true
};

// Shopify Buy Button client
let shopifyBuyClient = null;
let shopifyBuyUI = null;

// Product Management System
let products = [];
let collections = [];

// Mobile Navigation Toggle - Dropdown Menu
const mobileMenu = document.getElementById('mobile-menu');
const mobileDropdown = document.getElementById('mobile-dropdown');

if (mobileMenu && mobileDropdown) {
    const menuIcon = mobileMenu.querySelector('i');
    
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = mobileDropdown.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle between hamburger and X icon
        if (isActive) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Close mobile dropdown when clicking on a link
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileDropdown && mobileMenu) {
            mobileDropdown.classList.remove('active');
            mobileMenu.classList.remove('active');
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
});

// Close mobile dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (mobileDropdown && mobileMenu) {
        const isClickInside = mobileMenu.contains(e.target) || mobileDropdown.contains(e.target);
        if (!isClickInside && mobileDropdown.classList.contains('active')) {
            mobileDropdown.classList.remove('active');
            mobileMenu.classList.remove('active');
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    }
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

// Hero cards are now non-interactive - only hover effects remain
// Product cards use Shopify Buy Button for cart functionality

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

    // Keep empty spaces blank - don't show any message
    if (productsToRender.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = productsToRender.map((product, index) => {
        const originalPrice = product.compareAtPrice || product.price * 1.5; // Use compareAtPrice or calculate 50% off
        const isOnSale = originalPrice > product.price;
        const image2 = product.images && product.images.length > 1 ? product.images[1] : product.image;
        
        return `
        <div class="product-card" data-product-id="${product.id}" data-product-handle="${product.handle || ''}">
            ${isOnSale && !product.soldOut ? '<div class="sale-badge">Sale</div>' : ''}
            ${product.soldOut ? '<div class="sold-out-badge">Sold Out</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
                <img src="${image2}" alt="${product.name}" />
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-container">
                    ${isOnSale ? `<span class="product-price-original">$${originalPrice.toFixed(2)} USD</span>` : ''}
                    <span class="product-price-usd">$${product.price.toFixed(2)} USD</span>
                </div>
            </div>
            ${product.handle ? `<div class="shopify-buy-button" id="buy-button-${product.id}-${index}" data-product-handle="${product.handle}"></div>` : ''}
        </div>
    `;
    }).join('');

    // Re-attach event listeners to new product cards
    attachProductCardListeners(containerSelector);
    
    // Create Shopify Buy Buttons if available
    if (shopifyBuyUI) {
        setTimeout(() => createBuyButtonsForProducts(), 100);
    }
}

// Function to render products organized by collections
function renderProductsByCollections() {
    // Group products by collection
    const productsByCollection = {};
    
    products.forEach(product => {
        const collectionName = product.collectionName || 'Other';
        if (!productsByCollection[collectionName]) {
            productsByCollection[collectionName] = [];
        }
        productsByCollection[collectionName].push(product);
    });

    // Render first collection in the main section
    const firstCollection = Object.keys(productsByCollection)[0];
    if (firstCollection) {
        const collectionSection = document.querySelector('.collection-section');
        if (collectionSection) {
            const title = collectionSection.querySelector('.section-title');
            if (title) {
                title.textContent = firstCollection.toUpperCase();
            }
        }
        
        const mainGrid = document.querySelector('.collection-section .product-grid');
        if (mainGrid) {
            renderCollectionProducts(mainGrid, productsByCollection[firstCollection], firstCollection);
        }
    }

    // Render featured products
    const featuredProducts = products.filter(p => p.collection === 'featured' || p.tags?.includes('featured'));
    if (featuredProducts.length > 0) {
        const featuredGrid = document.querySelector('.featured-section .product-grid');
        if (featuredGrid) {
            const featuredTitle = document.querySelector('.featured-section .section-title');
            if (featuredTitle) {
                featuredTitle.textContent = 'FEATURED PRODUCTS';
            }
            renderCollectionProducts(featuredGrid, featuredProducts, 'Featured');
        }
    } else {
        // If no featured products, show second collection
        const secondCollection = Object.keys(productsByCollection)[1];
        if (secondCollection) {
            const featuredGrid = document.querySelector('.featured-section .product-grid');
            if (featuredGrid) {
                const featuredTitle = document.querySelector('.featured-section .section-title');
                if (featuredTitle) {
                    featuredTitle.textContent = secondCollection.toUpperCase();
                }
                renderCollectionProducts(featuredGrid, productsByCollection[secondCollection], secondCollection);
            }
        }
    }
}

// Function to render products for a specific collection
function renderCollectionProducts(container, productsToRender, collectionName) {
    if (!container) return;

    // Keep empty spaces blank - don't show any message
    if (productsToRender.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = productsToRender.map((product, index) => {
        const originalPrice = product.compareAtPrice || product.price * 1.5; // Use compareAtPrice or calculate 50% off
        const isOnSale = originalPrice > product.price;
        const image2 = product.images && product.images.length > 1 ? product.images[1] : product.image;
        
        return `
        <div class="product-card" data-product-id="${product.id}" data-product-handle="${product.handle || ''}">
            ${isOnSale && !product.soldOut ? '<div class="sale-badge">Sale</div>' : ''}
            ${product.soldOut ? '<div class="sold-out-badge">Sold Out</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
                <img src="${image2}" alt="${product.name}" />
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-container">
                    ${isOnSale ? `<span class="product-price-original">$${originalPrice.toFixed(2)} USD</span>` : ''}
                    <span class="product-price-usd">$${product.price.toFixed(2)} USD</span>
                </div>
            </div>
            ${product.handle ? `<div class="shopify-buy-button" id="buy-button-${product.id}-${index}" data-product-handle="${product.handle}"></div>` : ''}
        </div>
    `;
    }).join('');

    // Re-attach event listeners - pass the container element directly
    attachProductCardListenersToContainer(container);
    
    // Create Shopify Buy Buttons if available
    if (shopifyBuyUI) {
        setTimeout(() => createBuyButtonsForProducts(), 100);
    }
}

// Function to attach event listeners to product cards (accepts selector string)
function attachProductCardListeners(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    attachProductCardListenersToContainer(container);
}

// Function to create Shopify Buy Buttons for products
function createBuyButtonsForProducts() {
    if (!shopifyBuyUI) {
        console.log('⏳ Shopify Buy UI not ready yet');
        return;
    }

    document.querySelectorAll('.shopify-buy-button').forEach((buttonContainer, index) => {
        // Skip if button already created
        if (buttonContainer.hasAttribute('data-button-created')) {
            return;
        }

        const productHandle = buttonContainer.getAttribute('data-product-handle');
        if (!productHandle) {
            console.log('⚠️ No product handle found for buy button');
            return;
        }

        try {
            // Create product component but hide everything except the button
            shopifyBuyUI.createComponent('product', {
                handle: productHandle,
                node: buttonContainer,
                moneyFormat: '${{amount}}',
                options: {
                    product: {
                        contents: {
                            img: false,
                            imgWithCarousel: false,
                            title: false,
                            price: false,
                            button: true,
                            buttonWithQuantity: false
                        },
                        styles: {
                            button: {
                                'background-color': '#000000',
                                ':hover': {
                                    'background-color': '#000000'
                                },
                                ':focus': {
                                    'background-color': '#000000'
                                },
                                'width': '100%',
                                'margin': '0'
                            }
                        },
                        text: {
                            button: 'Add to cart'
                        }
                    },
                    cart: {
                        styles: {
                            button: {
                                'background-color': '#000000',
                                ':hover': {
                                    'background-color': '#000000'
                                }
                            }
                        },
                        text: {
                            button: 'Checkout'
                        }
                    },
                    toggle: {
                        styles: {
                            toggle: {
                                'background-color': '#000000',
                                ':hover': {
                                    'background-color': '#000000'
                                }
                            }
                        }
                    }
                }
            });
            
            // Mark as created
            buttonContainer.setAttribute('data-button-created', 'true');
        } catch (error) {
            console.error('Error creating buy button for', productHandle, error);
        }
    });
}

// Function to attach event listeners to product cards (accepts container element)
function attachProductCardListenersToContainer(container) {
    if (!container) return;

    // Don't add click handlers if Shopify Buy Button is enabled
    // The buy buttons will handle the cart functionality
    if (shopifyBuyUI) {
        return;
    }

    container.querySelectorAll('.product-card').forEach(card => {
        // Remove any existing event listeners by cloning
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        // Add click handler
        newCard.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-product-id');
            if (!productId) {
                console.error('No product ID found on card');
                return;
            }
            
            const product = products.find(p => p.id === productId);
            
            if (!product) {
                console.error('Product not found:', productId);
                return;
            }
            
            if (product.soldOut) {
                alert('This product is currently sold out.');
                return;
            }
            
            // Product cards use Shopify Buy Button for cart functionality
        });
        
        // Add cursor pointer
        newCard.style.cursor = 'pointer';
        
        // Add hover effects
        newCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        newCard.addEventListener('mouseleave', function() {
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
        
        // Re-render products organized by collections
        if (products.length > 0 && products.some(p => p.collectionName)) {
            renderProductsByCollections();
        } else {
            // Fallback to old method if no collection names
            renderProducts('.collection-section .product-grid', 'myrtle');
            renderProducts('.featured-section .product-grid', 'featured');
        }
        
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

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

// Search all products (Amazon + Shopify)
function searchAllProducts(query) {
    if (!query || query.trim() === '') {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const results = [];
    
    // Search Amazon products
    amazonProducts.forEach(product => {
        const productName = product.name.toLowerCase();
        if (productName.includes(searchTerm)) {
            // Calculate similarity score (simple: position of match)
            const matchIndex = productName.indexOf(searchTerm);
            const similarity = matchIndex === 0 ? 100 : 100 - matchIndex;
            results.push({
                ...product,
                type: 'amazon',
                similarity: similarity
            });
        }
    });
    
    // Search Shopify products
    products.forEach(product => {
        const productName = product.name.toLowerCase();
        if (productName.includes(searchTerm)) {
            const matchIndex = productName.indexOf(searchTerm);
            const similarity = matchIndex === 0 ? 100 : 100 - matchIndex;
            results.push({
                ...product,
                type: 'shopify',
                similarity: similarity
            });
        }
    });
    
    // Sort by similarity (most similar first)
    return results.sort((a, b) => b.similarity - a.similarity);
}

// Display search results
function displaySearchResults(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    const searchResults = searchAllProducts(query);
    
    if (query.trim() === '') {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('empty');
        return;
    }
    
    if (searchResults.length === 0) {
        resultsContainer.innerHTML = '<div class="search-results empty">No products found</div>';
        resultsContainer.classList.add('empty');
        return;
    }
    
    resultsContainer.classList.remove('empty');
    resultsContainer.innerHTML = searchResults.map(product => {
        const isAmazon = product.type === 'amazon';
        const productLink = isAmazon ? product.affiliateLink : '#';
        const productImage = product.image || 'https://via.placeholder.com/200x200';
        const productPrice = product.price > 0 ? `$${product.price.toFixed(2)}` : '';
        const productType = isAmazon ? 'Featured' : 'Our Store';
        
        return `
            <a href="${productLink}" ${isAmazon ? 'target="_blank" rel="nofollow sponsored"' : ''} class="search-result-item">
                <img src="${productImage}" alt="${product.name}" class="search-result-image" />
                <div class="search-result-info">
                    <div class="search-result-name">${product.name}</div>
                    ${productPrice ? `<div class="search-result-price">${productPrice} USD</div>` : ''}
                    <div class="search-result-type">${productType}</div>
                </div>
            </a>
        `;
    }).join('');
}

// Open search modal
function openSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    
    if (searchModal) {
        searchModal.classList.add('active');
        // Focus input after a short delay to ensure modal is visible
        setTimeout(() => {
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
    }
}

// Close search modal
function closeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    
    if (searchModal) {
        searchModal.classList.remove('active');
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Clear results
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('empty');
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchCloseBtn = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    
    // Open search modal when search button is clicked
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSearchModal();
        });
    }
    
    // Close search modal when close button is clicked
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeSearchModal();
        });
    }
    
    // Close search modal when clicking outside
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
    
    // Close search modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });
    
    // Search as user types
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value;
            
            // Debounce search for better performance
            searchTimeout = setTimeout(() => {
                displaySearchResults(query);
            }, 150);
        });
        
        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    displaySearchResults(query);
                }
            }
        });
    }
});


// Shopify API Integration - Fetch products from collections
async function fetchProductsFromShopify() {
    if (!SHOPIFY_CONFIG.enabled) {
        console.log('Shopify integration disabled. Using sample data.');
        return false;
    }

    try {
        // First, get all collections and their products
        const query = `
            query {
                collections(first: 20) {
                    edges {
                        node {
                            id
                            title
                            handle
                            products(first: 50) {
                                edges {
                                    node {
                                        id
                                        title
                                        handle
                                        description
                                        images(first: 2) {
                                            edges {
                                                node {
                                                    url
                                                }
                                            }
                                        }
                                        variants(first: 1) {
                                            edges {
                                                node {
                                                    price {
                                                        amount
                                                    }
                                                    compareAtPrice {
                                                        amount
                                                    }
                                                    availableForSale
                                                }
                                            }
                                        }
                                        tags
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch(`https://${SHOPIFY_CONFIG.store}.myshopify.com/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract products from all collections
        const allProducts = [];
        
        if (data.data?.collections?.edges) {
            data.data.collections.edges.forEach(collectionEdge => {
                const collection = collectionEdge.node;
                const collectionName = collection.title.toLowerCase();
                
                if (collection.products?.edges) {
                    collection.products.edges.forEach(productEdge => {
                        const product = productEdge.node;
                        const variant = product.variants.edges[0]?.node;
                        const images = product.images.edges || [];
                        const primaryImage = images[0]?.node;
                        const secondaryImage = images[1]?.node || primaryImage;
                        
                        // Determine collection assignment
                        let productCollection = 'myrtle';
                        if (product.tags.includes('featured') || collectionName.includes('featured')) {
                            productCollection = 'featured';
                        } else if (collectionName.includes('myrtle')) {
                            productCollection = 'myrtle';
                        }
                        
                        allProducts.push({
                            id: product.id.split('/').pop(), // Extract ID from GraphQL ID
                            name: product.title.toUpperCase(),
                            price: parseFloat(variant?.price?.amount || 0),
                            compareAtPrice: variant?.compareAtPrice?.amount ? parseFloat(variant.compareAtPrice.amount) : null,
                            image: primaryImage?.url || 'https://via.placeholder.com/400x400',
                            images: images.map(img => img.node.url),
                            soldOut: !variant?.availableForSale || false,
                            collection: productCollection,
                            description: product.description,
                            handle: product.handle,
                            tags: product.tags,
                            collectionName: collection.title
                        });
                    });
                }
            });
        }

        // Remove duplicates (products might be in multiple collections)
        const uniqueProducts = [];
        const seenIds = new Set();
        
        allProducts.forEach(product => {
            if (!seenIds.has(product.id)) {
                seenIds.add(product.id);
                uniqueProducts.push(product);
            }
        });

        // Import the products
        importProducts(uniqueProducts);
        console.log(`✅ Successfully loaded ${uniqueProducts.length} products from ${data.data?.collections?.edges?.length || 0} collections!`);
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
        // Use Storefront API for collections to avoid CORS issues
        const query = `
            query {
                collections(first: 20) {
                    edges {
                        node {
                            id
                            title
                            handle
                            image {
                                url
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch(`https://${SHOPIFY_CONFIG.store}.myshopify.com/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`Shopify Collections API error: ${response.status}`);
        }

        const data = await response.json();
        collections = data.data.collections.edges.map(edge => ({
            id: edge.node.id.split('/').pop(),
            title: edge.node.title,
            handle: edge.node.handle,
            image: edge.node.image?.url || 'https://via.placeholder.com/400x300'
        }));

        console.log(`✅ Successfully loaded ${collections.length} collections from Shopify!`);
        return true;

    } catch (error) {
        console.error('❌ Error fetching collections from Shopify:', error.message);
        return false;
    }
}

// ============================================
// AMAZON PRODUCT RENDERING FUNCTIONS
// ============================================

// Render Amazon affiliate products
function renderAmazonProducts() {
    const productGrid = document.getElementById('amazon-products-grid');
    if (!productGrid) {
        console.error('⚠️ Product grid not found. Make sure id="amazon-products-grid" exists in HTML.');
        return;
    }

    console.log(`🔄 Rendering ${amazonProducts.length} Amazon products...`);

    if (amazonProducts.length === 0) {
        productGrid.innerHTML = '';
        console.log('📦 No Amazon products to display. Add products to the amazonProducts array in script.js');
        return;
    }

    // Latest-added first: render in reverse order so newest product is at the top
    productGrid.innerHTML = [...amazonProducts].reverse().map((product) => {
        const isOnSale = product.originalPrice && product.originalPrice > product.price;
        const image2 = product.image2 || product.image;
        const showPrice = product.price > 0;
        
        return `
            <div class="product-card amazon-product-card" data-product-id="${product.id}">
                ${isOnSale ? '<div class="sale-badge">Sale</div>' : ''}
                <a href="${product.affiliateLink}" target="_blank" rel="nofollow sponsored" class="product-link">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" />
                        <img src="${image2}" alt="${product.name}" />
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        ${showPrice ? `
                        <div class="product-price-container">
                            ${isOnSale ? `<span class="product-price-original">$${product.originalPrice.toFixed(2)} USD</span>` : ''}
                            <span class="product-price-usd">$${product.price.toFixed(2)} USD</span>
                        </div>
                        ` : ''}
                        <div class="amazon-badge">View on Amazon →</div>
                    </div>
                </a>
            </div>
        `;
    }).join('');

    console.log(`✅ Rendered ${amazonProducts.length} Amazon affiliate products`);
}

// Initialize Amazon products on page load
function initializeAmazonProducts() {
    renderAmazonProducts();
}

// Render Shopify products to the shopify section
function renderShopifyProducts() {
    const productGrid = document.getElementById('shopify-products-grid');
    if (!productGrid) {
        console.log('⚠️ Shopify product grid not found');
        return;
    }

    if (products.length === 0) {
        productGrid.innerHTML = '';
        console.log('📦 No Shopify products to display.');
        return;
    }

    productGrid.innerHTML = products.map((product, index) => {
        const originalPrice = product.compareAtPrice || product.price * 1.5;
        const isOnSale = originalPrice > product.price;
        const image2 = product.images && product.images.length > 1 ? product.images[1] : product.image;
        
        return `
            <div class="product-card shopify-product-card" data-product-id="${product.id}" data-product-handle="${product.handle || ''}">
                ${isOnSale && !product.soldOut ? '<div class="sale-badge">Sale</div>' : ''}
                ${product.soldOut ? '<div class="sold-out-badge">Sold Out</div>' : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" />
                    <img src="${image2}" alt="${product.name}" />
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price-container">
                        ${isOnSale ? `<span class="product-price-original">$${originalPrice.toFixed(2)} USD</span>` : ''}
                        <span class="product-price-usd">$${product.price.toFixed(2)} USD</span>
                    </div>
                </div>
                ${product.handle ? `<div class="shopify-buy-button" id="buy-button-${product.id}-${index}" data-product-handle="${product.handle}"></div>` : ''}
            </div>
        `;
    }).join('');

    // Create Shopify Buy Buttons if available
    if (shopifyBuyUI) {
        setTimeout(() => createBuyButtonsForProducts(), 100);
    }

    console.log(`✅ Rendered ${products.length} Shopify products`);
}

// Initialize Shopify products
async function initializeShopifyProducts() {
    if (!SHOPIFY_CONFIG.enabled) {
        console.log('📦 Shopify integration disabled.');
        return;
    }

    // Try to load from Shopify
    const shopifyLoaded = await fetchProductsFromShopify();
    
    if (shopifyLoaded && products.length > 0) {
        renderShopifyProducts();
    } else {
        const productGrid = document.getElementById('shopify-products-grid');
        if (productGrid) {
            productGrid.innerHTML = '';
        }
    }
}

// Initialize Shopify Buy Button
function initializeShopifyBuyButton() {
    if (!window.ShopifyBuy) {
        console.log('⏳ Waiting for Shopify Buy Button SDK to load...');
        setTimeout(initializeShopifyBuyButton, 100);
        return;
    }

    if (window.ShopifyBuy.UI) {
        createShopifyBuyClient();
    } else {
        window.ShopifyBuy.onReady = createShopifyBuyClient;
    }
}

function createShopifyBuyClient() {
    if (!SHOPIFY_CONFIG.store || !SHOPIFY_CONFIG.apiKey) {
        console.log('⚠️ Shopify credentials not set');
        return;
    }

    try {
        shopifyBuyClient = ShopifyBuy.buildClient({
            domain: `${SHOPIFY_CONFIG.store}.myshopify.com`,
            storefrontAccessToken: SHOPIFY_CONFIG.apiKey
        });

        ShopifyBuy.UI.onReady(shopifyBuyClient).then(function(ui) {
            shopifyBuyUI = ui;
            console.log('✅ Shopify Buy Button initialized');
            // Create buy buttons for existing products
            createBuyButtonsForProducts();
        });
    } catch (error) {
        console.error('❌ Error initializing Shopify Buy Button:', error);
    }
}

// Save Shopify credentials to localStorage
function saveShopifyCredentials(storeName, apiKey) {
    try {
        localStorage.setItem('shopify_store', storeName);
        localStorage.setItem('shopify_api_key', apiKey);
        localStorage.setItem('shopify_enabled', 'true');
        console.log('✅ Shopify credentials saved');
    } catch (error) {
        console.error('❌ Error saving credentials:', error);
    }
}

// Load Shopify credentials from localStorage
function loadShopifyCredentials() {
    try {
        const store = localStorage.getItem('shopify_store');
        const apiKey = localStorage.getItem('shopify_api_key');
        const enabled = localStorage.getItem('shopify_enabled') === 'true';
        
        if (store && apiKey && enabled) {
            return { store, apiKey, enabled };
        }
        return null;
    } catch (error) {
        console.error('❌ Error loading credentials:', error);
        return null;
    }
}

// Clear saved Shopify credentials
function clearShopifyCredentials() {
    try {
        localStorage.removeItem('shopify_store');
        localStorage.removeItem('shopify_api_key');
        localStorage.removeItem('shopify_enabled');
        console.log('✅ Shopify credentials cleared');
    } catch (error) {
        console.error('❌ Error clearing credentials:', error);
    }
}

// Function to enable Shopify integration
function enableShopifyIntegration(storeName, apiKey, saveCredentials = true) {
    SHOPIFY_CONFIG.store = storeName;
    SHOPIFY_CONFIG.apiKey = apiKey;
    SHOPIFY_CONFIG.enabled = true;

    // Save credentials to localStorage for persistence
    if (saveCredentials) {
        saveShopifyCredentials(storeName, apiKey);
    }

    console.log('🔄 Shopify integration enabled. Reloading products...');
    initializeShopifyProducts();
    
    // Initialize Buy Button
    initializeShopifyBuyButton();
}

// Function to disable Shopify integration
function disableShopifyIntegration() {
    SHOPIFY_CONFIG.enabled = false;
    console.log('📦 Shopify integration disabled.');
    products = [];
    // Clear product grids
    const collectionGrid = document.querySelector('.collection-section .product-grid');
    const featuredGrid = document.querySelector('.featured-section .product-grid');
    if (collectionGrid) collectionGrid.innerHTML = '';
    if (featuredGrid) featuredGrid.innerHTML = '';
}

// Initialize both Amazon and Shopify products on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Amazon affiliate products (always show)
    initializeAmazonProducts();
    
    // Initialize Shopify products (if enabled)
    if (SHOPIFY_CONFIG.enabled && SHOPIFY_CONFIG.store && SHOPIFY_CONFIG.apiKey) {
        console.log('🔄 Auto-connecting to Shopify...');
        initializeShopifyProducts();
        initializeShopifyBuyButton();
    } else {
        // Check for saved credentials in localStorage
        const savedCredentials = loadShopifyCredentials();
        if (savedCredentials) {
            console.log('🔄 Auto-connecting to Shopify with saved credentials...');
            enableShopifyIntegration(savedCredentials.store, savedCredentials.apiKey, false);
        }
    }
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