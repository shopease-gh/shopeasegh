let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let products = JSON.parse(localStorage.getItem("uploadedProducts") || "[]");

// Sample fallback if no products yet
if (!products.length) {
  products = [
    {
      id: 1,
      name: "Bluetooth Speaker",
      price: 180,
      category: "Electronics",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Matte Lipstick",
      price: 50,
      category: "Makeup",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Facial Cleanser",
      price: 40,
      category: "Skin Care",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 4,
      name: "Silk Hair Scrunchie",
      price: 30,
      category: "Hair Accessories",
      image: "https://via.placeholder.com/150"
    }
  ];
}

function renderProducts(items = products) {
  const container = document.getElementById("productList");
  if (!container) return;
  container.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₵${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="addToWishlist(${product.id})">❤️ Wishlist</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
}

function addToWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const product = products.find(p => p.id === id);
  if (product && !wishlist.find(p => p.id === id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

function updateCartCount() {
  const count = cart.length;
  const el = document.getElementById("cartCount");
  if (el) el.innerText = count;
}

function applyFilters() {
  const category = document.getElementById("categoryFilter").value;
  const maxPrice = parseFloat(document.getElementById("maxPriceFilter").value);

  const filtered = products.filter(product => {
    const categoryMatch = category === "All" || product.category === category;
    const priceMatch = isNaN(maxPrice) || parseFloat(product.price) <= maxPrice;
    return categoryMatch && priceMatch;
  });

  renderProducts(filtered);
}

function getUniqueCategories() {
  const cats = ["All", ...new Set(products.map(p => p.category))];
  const select = document.getElementById("categoryFilter");
  if (!select) return;
  select.innerHTML = "";
  cats.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const dark = localStorage.getItem("darkMode") === "true";

  document.body.classList.toggle("dark", dark);
  icon.innerText = dark ? "🌙" : "🌞";

  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", isDark);
      icon.innerText = isDark ? "🌙" : "🌞";
    };
  }
}

window.onload = () => {
  renderProducts();
  getUniqueCategories();
  updateCartCount();
  setupThemeToggle();
};
