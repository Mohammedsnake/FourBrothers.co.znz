import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Update cart count
    updateCartCount();
    
    // Check auth state
    onAuthStateChanged(auth, (user) => {
        const authLink = document.getElementById('auth-link');
        if (user) {
            // User is signed in
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.addEventListener('click', function(e) {
                e.preventDefault();
                signOut(auth).then(() => {
                    window.location.href = 'index.html';
                });
            });
        } else {
            // User is signed out
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    });
});

// Update cart count from localStorage
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Load featured products on homepage
if (document.getElementById('featured-products')) {
    import('./firebase-config.js').then(({ database, ref, get }) => {
        get(ref(database, 'products')).then((snapshot) => {
            if (snapshot.exists()) {
                const products = snapshot.val();
                const featuredProductsContainer = document.getElementById('featured-products');
                
                // Get first 4 products or all if less than 4
                const featuredProducts = Object.entries(products).slice(0, 4);
                
                featuredProducts.forEach(([id, product]) => {
                    const productCard = createProductCard(id, product);
                    featuredProductsContainer.appendChild(productCard);
                });
            }
        });
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