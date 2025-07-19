
const products = [
  { id: 1, name: "Oversized Tee", price: 799 },
  { id: 2, name: "Black Co-ord Set", price: 1499 },
  { id: 3, name: "Streetwear Hoodie", price: 1199 },
];

// Show products on shop.html
if (document.getElementById("product-list")) {
  const list = document.getElementById("product-list");
  products.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <h3>${prod.name}</h3>
      <p>₹${prod.price}</p>
      <button onclick='addToCart(${JSON.stringify(prod)})'>Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// Show cart items
if (document.getElementById("cart-items")) {
  const cartItems = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  cartItems.innerHTML = cart.map(item => {
    total += item.price;
    return `<div>${item.name} - ₹${item.price}</div>`;
  }).join("");
  document.getElementById("total").textContent = "Total: ₹" + total;
}

function checkout() {
  alert("Proceeding to checkout...");
}

// Show cart summary on checkout page
if (document.getElementById("checkout-summary")) {
  const summaryDiv = document.getElementById("checkout-summary");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  summaryDiv.innerHTML = cart.map(item => {
    total += item.price;
    return `<div>${item.name} - ₹${item.price}</div>`;
  }).join("");
  summaryDiv.innerHTML += `<p><strong>Total: ₹${total}</strong></p>`;
}

// Submit checkout form to Google Sheets
if (document.getElementById("checkout-form")) {
  document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const data = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      address: this.address.value,
      pincode: this.pincode.value,
      city: this.city.value,
      state: this.state.value,
      cart: cart,
      total: total
    };

    fetch("https://script.google.com/macros/s/AKfycbzp2pJEWI5m55Doi8-gje0ESvZbwMZMFZpiol7LbSVhXfqr2pNJjcjbjzeg5pPFKd1v/exec", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      localStorage.removeItem("cart");
      document.getElementById("checkout-form").reset();
      document.getElementById("order-success").style.display = "block";
    }).catch(err => {
      alert("Something went wrong. Please try again.");
    });
  });
}

