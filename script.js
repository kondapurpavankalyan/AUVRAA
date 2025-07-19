
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
