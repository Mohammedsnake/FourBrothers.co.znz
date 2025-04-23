import { database, ref, get } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('all-products');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    
    // Load all products
    loadProducts();
    
    // Add event listeners for filters
    categoryFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);
    
    function loadProducts() {
        get(ref(database, 'products')).then((snapshot) => {
            if (snapshot.exists()) {
                const products = snapshot.val();
                displayProducts(products);
            } else {
                productsContainer.innerHTML = '<p>No products available at the moment.</p>';
            }
        }).catch((error) => {
            console.error("Error loading products:", error);
            productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        });
    }
    
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        
        Object.entries(products).forEach(([id, product]) => {
            const productCard = createProductCard(id, product);
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    function createProductCard(id, product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.imageUrl || 'images/placeholder.jpg'}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <div class="product-price">TZS ${product.price.toLocaleString()}</div>
                <button class="add-to-cart" data-id="${id}">Add to Cart</button>
            </div>
        `;
        
        return card;
    }
    
    function filterProducts() {
        const category = categoryFilter.value;
        const sort = sortBy.value;
        
        get(ref(database, 'products')).then((snapshot) => {
            if (snapshot.exists()) {
                let products = snapshot.val();
                
                // Filter by category
                if (category !== 'all') {
                    products = Object.fromEntries(
                        Object.entries(products).filter(([_, product]) => product.category === category)
                    );
                }
                
                // Sort products
                products = Object.fromEntries(
                    Object.entries(products).sort(([_, a], [__, b]) => {
                        switch (sort) {
                            case 'price-asc': return a.price - b.price;
                            case 'price-desc': return b.price - a.price;
                            case 'name-asc': return a.name.localeCompare(b.name);
                            case 'name-desc': return b.name.localeCompare(a.name);
                            default: return 0;
                        }
                    })
                );
                
                displayProducts(products);
            }
        });
    }
    
    function addToCart(e) {
        const productId = e.target.getAttribute('data-id');
        
        get(ref(database, `products/${productId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const product = snapshot.val();
                
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} added to cart!`);
                
                // Update cart count in header
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
                }
            }
        });
    }
});