document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    displayCartItems();
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="shop.html">Continue shopping</a></p>';
            cartTotal.textContent = 'TZS 0';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.imageUrl || 'images/placeholder.jpg'}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>TZS ${item.price.toLocaleString()} x ${item.quantity}</p>
                    <p>Subtotal: TZS ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                    <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = `TZS ${total.toLocaleString()}`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', updateQuantity);
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
    
    function updateQuantity(e) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = e.target.getAttribute('data-index');
        
        if (e.target.classList.contains('plus')) {
            cart[index].quantity += 1;
        } else if (e.target.classList.contains('minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
    
    function removeItem(e) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = e.target.closest('.remove-btn').getAttribute('data-index');
        
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
    
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    function proceedToCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            alert('Your cart is empty. Please add some items before checkout.');
            return;
        }
        
        window.location.href = 'order.html';
    }
});