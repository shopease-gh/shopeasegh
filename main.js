const sampleProducts = [
  {
    id: 1,
    name: "Silk Hair Scrunchie",
    price: 30,
    category: "Hair Accessories",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 180,
    category: "Electronics",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Matte Lipstick",
    price: 50,
    category: "Makeup",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Facial Cleanser",
    price: 40,
    category: "Skin Care",
    image: "https://via.placeholder.com/150"
  }
];

function renderProducts(filtered = null) {
  const products = filtered || sampleProducts;
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = products.length ? products.map(prod => `
    <div class="product-card">
      <img src="${prod.image}" alt="${prod.name}" />
      <h3>${prod.name}</h3>
      <p>₵${prod.price}</p>
      <button>Add to Cart</button>
      <button>❤️ Wishlist</button>
    </div>
  `).join("") : `<p>No products available yet.</p>`;
}

function applyFilters() {
  const cat = document.getElementById("categoryFilter").value;
  const max = parseFloat(document.getElementById("priceFilter").value);
  let filtered = sampleProducts;

  if (cat !== "all") {
    filtered = filtered.filter(p => p.category === cat);
  }

  if (!isNaN(max)) {
    filtered = filtered.filter(p => p.price <= max);
  }

  renderProducts(filtered);
}

function updateCartCount() {
  const count = JSON.parse(localStorage.getItem("cart") || "[]").length;
  const el = document.getElementById("cartCount");
  if (el) el.innerText = count;
}

function getUniqueCategories() {
  const cats = [...new Set(sampleProducts.map(p => p.category))];
  const select = document.getElementById("categoryFilter");
  if (!select) return;
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.innerText = c;
    select.appendChild(opt);
  });
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  const dark = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark", dark);
  if (icon) icon.innerText = dark ? "🌙" : "🌞";

  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", isDark);
      if (icon) icon.innerText = isDark ? "🌙" : "🌞";
    };
  }
}

window.onload = () => {
  renderProducts();
  getUniqueCategories();
  updateCartCount();
  setupThemeToggle();
};
