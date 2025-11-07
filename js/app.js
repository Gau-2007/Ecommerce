// Set title based on page
(function() {
  var pageTitles = {
    'index.html': 'TechHub - Premium Electronics Store',
    'products.html': 'Products - TechHub',
    'about.html': 'About Us - TechHub', 
    'contact.html': 'Contact - TechHub',
    'cart.html': 'Shopping Cart - TechHub',
    'login.html': 'Login - TechHub',
    'signup.html': 'Sign Up - TechHub'
  };
  
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var targetTitle = pageTitles[currentPage] || 'TechHub - Premium Electronics Store';
  
  var setTitle = function() {
    if (document.title !== targetTitle) {
      document.title = targetTitle;
    }
  };
  
  setTitle();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setTitle);
  }
  window.addEventListener('load', setTitle);
  window.addEventListener('pageshow', setTitle);
})();

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. STATE & DATA ---

  // Our "database" of products
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 12999,
      image: "images/wireless_headphones.jpg",
      category: "Audio",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 19999,
      image: "images/smart_watch.webp",
      category: "Wearable",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 7999,
      image: "images/speaker.jpg",
      category: "Audio",
    },
    {
      id: 4,
      name: "Noise-Cancelling Earbuds",
      price: 9999,
      image: "https://placehold.co/600x400/38b2ac/ffffff?text=Earbuds",
      category: "Audio",
    },
    {
      id: 5,
      name: "Fitness Tracker",
      price: 7999,
      image: "https://placehold.co/600x400/dd6b20/ffffff?text=Tracker",
      category: "Wearable",
    },
    {
      id: 6,
      name: "Portable Power Bank",
      price: 2499,
      image: "https://placehold.co/600x400/c53030/ffffff?text=Power+Bank",
      category: "Accessories",
    },
    {
      id: 7,
      name: "Smart Home Hub",
      price: 14999,
      image: "https://placehold.co/600x400/5a67d8/ffffff?text=Smart+Hub",
      category: "Accessories",
    },
    {
      id: 8,
      name: "Gaming Headset",
      price: 11999,
      image: "https://placehold.co/600x400/d53f8c/ffffff?text=Gaming+Headset",
      category: "Audio",
    },
    {
      id: 9,
      name: "4K Action Camera",
      price: 24999,
      image: "https://placehold.co/600x400/38a169/ffffff?text=Action+Camera",
      category: "Cameras",
    },
    {
      id: 10,
      name: "E-Reader",
      price: 8999,
      image: "https://placehold.co/600x400/ed8936/ffffff?text=E-Reader",
      category: "Gadgets",
    },
    {
      id: 11,
      name: "VR Headset",
      price: 29999,
      image: "https://placehold.co/600x400/805ad5/ffffff?text=VR+Headset",
    },
    {
      id: 12,
      name: "Wireless Charger",
      price: 3999,
      image: "https://placehold.co/600x400/e53e3e/ffffff?text=Wireless+Charger",
      category: "Accessories",
    },
    {
      id: 13,
      name: "Smartphone Gimbal",
      price: 10999,
      image:
        "https://placehold.co/600x400/38b2ac/ffffff?text=Smartphone+Gimbal",
      category: "Cameras",
    },
    {
      id: 14,
      name: "Digital Photo Frame",
      price: 6999,
      image: "https://placehold.co/600x400/dd6b20/ffffff?text=Photo+Frame",
      category: "Gadgets",
    },
    {
      id: 15,
      name: "Smart Light Bulb",
      price: 1999,
      image: "https://placehold.co/600x400/c53030/ffffff?text=Smart+Bulb",
      category: "Accessories",
    },
  ];

  // Get cart from localStorage or initialize as empty array
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  // Get login state from localStorage
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  let currentTheme = localStorage.getItem("theme") || "light";

  // --- 2. SELECTORS (Shared across all pages) ---
  const cartBadge = document.getElementById("cart-badge");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const loginBtn = document.getElementById("login-btn");
  const profileIcon = document.getElementById("profile-icon");
  const toast = document.getElementById("toast");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;
  // Home page selectors
  const featuredGrid = document.getElementById("featured-grid");

  // Product page specific selectors
  const productGrid = document.getElementById("product-grid");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const categorySelect = document.getElementById("category-select");

  // Cart page specific selectors
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Contact page specific selectors
  const contactForm = document.getElementById("contact-form");

  // --- 3. SHARED FUNCTIONS (Cart, Auth, UI) ---

  /**
   * Applies the current theme to the document body.
   */
  function applyTheme() {
    body.setAttribute("data-theme", currentTheme);
  }

  /**
   * Toggles the theme between light and dark.
   */
  function toggleTheme() {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
    applyTheme();
    updateThemeToggleIcon();
  }

  /**
   * Updates the theme toggle icon based on the current theme.
   */
  function updateThemeToggleIcon() {
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML =
        currentTheme === "dark"
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  }

  /**
   * Adds an item to the cart
   * @param {number} productId - The ID of the product to add
   */
  function addToCart(productId) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    saveCart();
    updateCartBadge();
    showToast("Item added to cart!");
  }

  /**
   * Updates the quantity of a cart item
   * @param {number} productId
   * @param {string} action - 'increase' or 'decrease'
   */
  function updateCartQuantity(productId, action) {
    const item = cart.find((item) => item.id === productId);
    if (!item) return;

    if (action === "increase") {
      item.quantity++;
    } else if (action === "decrease") {
      item.quantity--;
      if (item.quantity <= 0) {
        // Remove item if quantity drops to 0
        removeFromCart(productId);
        return; // Exit function since removeFromCart handles rerender
      }
    }

    saveCart();
    renderCart(); // Re-render the cart UI
    updateCartBadge();
  }

  /**
   * Removes an item from the cart
   * @param {number} productId
   */
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    renderCart(); // Re-render the cart UI
    updateCartBadge();
    showToast("Item removed from cart");
  }

  /**
   * Saves the current cart to localStorage
   */
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  /**
   * Updates the cart badge count
   */
  function updateCartBadge() {
    if (!cartBadge) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
  }

  /**
   * Shows a simple toast notification
   * @param {string} message
   */
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Make showToast globally available for onclick handlers
  window.showToast = showToast;

  /**
   * Initializes mobile menu toggle
   */
  function initMobileMenu() {
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }

  /**
   * Initializes login/profile simulation
   */
  function initAuth() {
    if (!loginBtn || !profileIcon) return;

    if (isLoggedIn) {
      loginBtn.classList.add("hidden");
      profileIcon.classList.remove("hidden");
    } else {
      loginBtn.classList.remove("hidden");
      profileIcon.classList.add("hidden");
    }

    loginBtn.addEventListener("click", () => {
      // Redirect to login page instead of instant login
      window.location.href = "login.html";
    });

    profileIcon.addEventListener("click", () => {
      // Here you could show a dropdown, for now we'll just log out
      isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
      profileIcon.classList.add("hidden");
      loginBtn.classList.remove("hidden");
      showToast("Logged out.");
    });
  }

  // --- 4. PAGE-SPECIFIC FUNCTIONS ---

  /**
   * Renders all products to the product grid (PRODUCTS PAGE)
   */
  function renderProducts(searchTerm = "", category = "all") {
    if (!productGrid) return; // Only run on products page

    productGrid.innerHTML = ""; // Clear existing grid

    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    if (filteredProducts.length === 0) {
      productGrid.innerHTML =
        '<p class="empty-message">No products found matching your criteria.</p>';
      return;
    }

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card glass-card"; // Apply glass-card
      productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toLocaleString(
                  "en-IN"
                )}</p>
                <button 
                    class="add-to-cart-btn"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>
            </div>
        `;
      productGrid.appendChild(productCard);
    });

    // Add event listener for the newly created buttons
    productGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart-btn")) {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
      }
    });
  }

  /**
   * Renders featured products on the home page (first 3 products)
   */
  function renderFeaturedProducts() {
    if (!featuredGrid) return; // Only on home page

    const featured = products.slice(0, 3);
    featuredGrid.innerHTML = "";

    featured.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card glass-card";
      card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toLocaleString(
                  "en-IN"
                )}</p>
                <button class="add-to-cart-btn" data-id="${
                  product.id
                }">Add to Cart</button>
            </div>
        `;
      featuredGrid.appendChild(card);
    });

    featuredGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart-btn")) {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
      }
    });
  }

  /**
   * Renders the items in the cart (CART PAGE)
   */
  function renderCart() {
    if (!cartItemsContainer || !cartTotalEl) return; // Only run on cart page

    cartItemsContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart-message">Your cart is empty.</p>';
      cartTotalEl.textContent = "₹0.00";
      return;
    }

    let total = 0;
    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return;

      const itemTotal = product.price * cartItem.quantity;
      total += itemTotal;

      const cartItemEl = document.createElement("div");
      cartItemEl.className = "cart-item glass-card";
      cartItemEl.innerHTML = `
            <img src="${product.image}" alt="${
        product.name
      }" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${product.name}</h4>
                <p class="cart-item-price">₹${product.price.toLocaleString(
                  "en-IN"
                )}</p>
            </div>
            <div class="cart-item-quantity-control">
                <button class="cart-quantity-btn" data-id="${
                  product.id
                }" data-action="decrease">-</button>
                <span class="cart-quantity">${cartItem.quantity}</span>
                <button class="cart-quantity-btn" data-id="${
                  product.id
                }" data-action="increase">+</button>
            </div>
            <p class="cart-item-total">₹${itemTotal.toLocaleString("en-IN")}</p>
            <button class="cart-remove-btn" data-id="${product.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        `;
      cartItemsContainer.appendChild(cartItemEl);
    });

    // Update total
    cartTotalEl.textContent = `₹${total.toLocaleString("en-IN")}`;

    // Add event listeners for cart page
    cartItemsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const id = parseInt(btn.dataset.id);

      if (btn.classList.contains("cart-quantity-btn")) {
        const action = btn.dataset.action;
        updateCartQuantity(id, action);
      }

      if (btn.classList.contains("cart-remove-btn")) {
        removeFromCart(id);
      }
    });

    // Checkout Button
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
          showToast("Your cart is empty!");
          return;
        }
        showToast("Thank you for your purchase!");
        cart = [];
        saveCart();
        renderCart();
        updateCartBadge();
        // In a real app, you'd redirect. Here we just update.
      });
    }
  }

  /**
   * Handles contact form submission (CONTACT PAGE)
   */
  function initContactForm() {
    if (!contactForm) return; // Only run on contact page

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Message sent! (Demo)");
      contactForm.reset();
      // In a real app, you might redirect to home
      // window.location.href = 'index.html';
    });
  }

  // --- 5. INITIALIZATION ---

  // Run functions shared by all pages
  initMobileMenu();
  initAuth();
  updateCartBadge();
  applyTheme(); // Apply theme on load
  updateThemeToggleIcon(); // Initialize theme toggle icon

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Add event listeners for product page filters
  if (searchInput) {
    searchButton.addEventListener("click", () => {
      renderProducts(searchInput.value, categorySelect.value);
    });
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        renderProducts(searchInput.value, categorySelect.value);
      }
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      renderProducts(searchInput.value, categorySelect.value);
    });
  }

  // Run page-specific functions
  renderProducts(); // Will only run if #product-grid exists
  renderCart(); // Will only run if #cart-items-container exists
  renderFeaturedProducts(); // Will only run if #featured-grid exists
  initContactForm(); // Will only run if #contact-form exists
});
