document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".product button");
    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Your order has been placed!");
        });
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Your message has been sent!");
    });

    // Adding hover effect on navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.backgroundColor = "#575757";
        });
        link.addEventListener("mouseout", () => {
            link.style.backgroundColor = "transparent";
        });
    });

    // Adding hover effect on products
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        product.addEventListener("mouseover", () => {
            product.style.transform = "translateY(-10px)";
        });
        product.addEventListener("mouseout", () => {
            product.style.transform = "translateY(0)";
        });
    });
});
