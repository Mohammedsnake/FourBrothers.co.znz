import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase-config.js';

// Common form handling
document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('auth-form');
    
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = authForm.querySelector('input[type="email"]').value;
            const password = authForm.querySelector('input[type="password"]').value;
            const isLogin = authForm.classList.contains('login-form');
            
            if (isLogin) {
                loginUser(email, password);
            } else {
                registerUser(email, password);
            }
        });
    }
    
    // Password toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
});

function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert('Login successful!');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            alert('Registration successful! You can now login.');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
}