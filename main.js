// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById("themeSwitch");
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("light", currentTheme === "light");

  if (themeSwitch) {
    themeSwitch.checked = currentTheme === "light";
    themeSwitch.addEventListener("change", () => {
      const newTheme = themeSwitch.checked ? "light" : "dark";
      document.body.classList.toggle("light", themeSwitch.checked);
      localStorage.setItem("theme", newTheme);
    });
  }

  loadProducts();
  updateCartIcon();
  toggleAdminLink();
  populateCategories();
});

// Sample Products (initial preload)
const sampleProducts = [
  {
    id: 1,
    name: "Silk Hair Scrunchie",
    category: "Hair Accessories",
    price: 30,
    image: "https://via.placeholder.com/200x160.png?text=Hair+Scrunchie"
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 180,
    image: "https://via.placeholder.com/200x160.png?text=Speaker"
  },
  {
    id: 3,
    name: "Matte Lipstick",
    category: "Makeup",
    price: 50,
    image: "https://via.placeholder.com/200x160.png?text=Lipstick"
  },
  {
    id: 4,
    name: "Facial Cleanser",
    category: "Skin Care",
    price: 40,
    image: "https://via.placeholder.com/200x160.png?text=Cleanser"
  }
];

// Load + Render Products
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("uploadedProducts") || "[]");
  if (products.length === 0) {
    products = sampleProducts;
    localStorage.setItem("uploadedProducts", JSON.stringify(products));
  }

  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₵${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
    </div>
  `).join("");
}

// Add to Cart
function addToCart(id) {
  const products = JSON.parse(localStorage.getItem("uploadedProducts") || "[]");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
    alert("Added to cart!");
  }
}

// Wishlist
function addToWishlist(id) {
  const products = JSON.parse(localStorage.getItem("uploadedProducts") || "[]");
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const product = products.find(p => p.id === id);
  if (product) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist!");
  }
}

// Cart Count
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartLinks = document.querySelectorAll("a[href='cart.html']");
  cartLinks.forEach(link => {
    link.innerHTML = `Cart 🛒 (${cart.length})`;
  });
}

// Admin Link Visibility
function toggleAdminLink() {
  const adminLink = document.getElementById("adminLink");
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  if (adminLink) {
    adminLink.style.display = isAdminLoggedIn ? "block" : "none";
  }
}

// Filter Logic
function applyFilters() {
  const maxPrice = parseFloat(document.getElementById("priceFilter").value) || Infinity;
  const category = document.getElementById("categoryFilter").value;

  const allProducts = JSON.parse(localStorage.getItem("uploadedProducts") || "[]");
  const filtered = allProducts.filter(p =>
    (category === "All" || p.category === category) && p.price <= maxPrice
  );

  const container = document.getElementById("productList");
  if (!container) return;
  container.innerHTML = filtered.length > 0 ? filtered.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₵${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
    </div>
  `).join("") : "<p>No matching products found.</p>";
}

// Populate Filter Categories
function populateCategories() {
  const products = JSON.parse(localStorage.getItem("uploadedProducts") || "[]");
  const select = document.getElementById("categoryFilter");
  if (!select) return;

  const categories = [...new Set(products.map(p => p.category))];
  select.innerHTML = `<option value="All">All Categories</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join("");
}
