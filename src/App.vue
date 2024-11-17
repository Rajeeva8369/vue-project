<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="logo-menu-container">
          <router-link to="/" class="logo">
            <img src="@/img/logo.jpeg" alt="MYLOGO" class="MYLOGO">
          </router-link>
          <div class="menu-container">
            <img src="@/img/menu.png" alt="menu" class="menu" @click.prevent="toggleMenu">
          </div>
        </div>
        <div class="dropdown-menu" :class="{ 'open': isMenuOpen }">
          <div class="menu-header">
            <span class="close-icon" @click="toggleMenu">×</span>
          </div>
          <ul class="menu-items">
            <li><router-link to="/" @click="toggleMenu">Home</router-link></li>
            <li><router-link to="/shop" @click="toggleMenu">Shop</router-link></li>
            <li><router-link to="/magazine" @click="toggleMenu">Magazine</router-link></li>
          </ul>
        </div>
        <div class="search-bar">
          <img src="@/img/search.png" alt="search" class="loop">
          <input 
            type="search" 
            v-model="searchTerm" 
            class="search-input" 
            placeholder="Search"
            @input="handleSearch"
          >
        </div>
        <ul class="nav-items">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/shop">Shop</router-link></li>
          <li><router-link to="/magazine">Magazine</router-link></li>
        </ul>
        <div class="icons">
          <div class="cart-icon" @click="isCartOpen = true">
            <img src="@/img/shoppingcart.png" alt="Shopping Cart" class="cart-img">
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </div>
          <div class="login-link">
            <router-link to="/login">Login</router-link>
          </div>
        </div>
      </nav>
    </header>

    <router-view 
      :searchResults="searchResults"
      @update-pagination="updatePagination"
    ></router-view>

    <footer>
      <div class="pagination" v-if="showPagination">
        <button 
          v-for="page in totalPages" 
          :key="page" 
          class="page-number" 
          :class="{ active: currentPage === page }"
          @click="setPage(page)"
        >
          {{ page }}
        </button>
        <button 
          class="page-number next-page" 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
        >
          &gt;
        </button>
      </div>
    </footer>

    
    <div v-if="isCartOpen" class="cart-modal" @click.self="isCartOpen = false">
      <div class="cart-content">
        <div class="cart-header">
          <h2>Shopping Cart</h2>
          <button class="close-btn" @click="isCartOpen = false">×</button>
        </div>
        
        <div v-if="cart.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
        </div>
        
        <div v-else class="cart-items">
          <div v-for="(item, index) in cart" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="cart-item-image">
            <div class="cart-item-details">
              <h3>{{ item.name }}</h3>
              <p class="cart-item-price">{{ item.price.toFixed(2) }} €</p>
            </div>
            <div class="cart-item-quantity">
              <button @click="decrementQuantity(index)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="incrementQuantity(index)">+</button>
            </div>
            <button class="remove-btn" @click="removeFromCart(index)">Remove</button>
          </div>
        </div>
        
        <div v-if="cart.length > 0" class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span>{{ cartTotal.toFixed(2) }} €</span>
          </div>
          <button class="checkout-btn" @click="checkout">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
      searchTerm: '',
      searchResults: [],
      cart: [],
      isCartOpen: false,
      currentPage: 1,
      totalPages: 1,
      showPagination: false,
      products: [
        { id: 1, name: "Table Basse Design", price: 299.99, category: "Tables", image: new URL('@/img/tablebasse.png', import.meta.url).href },
        { id: 2, name: "Table Basse Moderne", price: 349.99, category: "Tables", image: new URL('@/img/tablebasse2.png', import.meta.url).href },
        { id: 3, name: "Canapé Confort", price: 599.99, category: "Sofas", image: new URL('@/img/Bubblesofa.png', import.meta.url).href },
        { id: 4, name: "Canapé Élégance", price: 649.99, category: "Sofas", image: new URL('@/img/Bubblesofa2.png', import.meta.url).href },
        { id: 5, name: "Lampe de Table", price: 79.99, category: "Lighting", image: new URL('@/img/decor.png', import.meta.url).href },
        { id: 6, name: "Lampe Moderne", price: 129.99, category: "Decor", image: new URL('@/img/decor2.png', import.meta.url).href },
        { id: 7, name: "Chaise Moderne", price: 149.99, category: "Chairs", image: new URL('@/img/add1.jpg', import.meta.url).href },
        
      ]
    }
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleSearch() {
      if (this.searchTerm.trim() === '') {
        this.searchResults = []
      } else {
        this.searchResults = this.products.filter(product => 
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }
    },
    incrementQuantity(index) {
      this.cart[index].quantity++
    },
    decrementQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    },
    checkout() {
      console.log('Proceeding to checkout with items:', this.cart)
    },
    updatePagination(paginationData) {
      this.currentPage = paginationData.currentPage
      this.totalPages = paginationData.totalPages
      this.showPagination = paginationData.showPagination
    },
    setPage(page) {
      this.currentPage = page
      this.$emit('update:currentPage', page)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.$emit('update:currentPage', this.currentPage)
      }
    }
  },
  mounted() {
    window.addEventListener('add-to-cart', (event) => {
      const newItem = event.detail
      const existingItem = this.cart.find(item => item.id === newItem.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push(newItem)
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  position: relative;
  z-index: 1000;
}

.logo-menu-container {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
}

.menu-container {
  display: none;
  margin-left: 1rem;
}

.menu {
  height: 24px;
  width: 24px;
  cursor: pointer;
}

.dropdown-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: 1001;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.dropdown-menu.open {
  transform: translateX(0);
}

.menu-header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.close-icon {
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}

.menu-items {
  list-style-type: none;
  padding: 0;
}

.menu-items li {
  padding: 1rem;
}

.menu-items a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem;
}

.loop {
  height: 20px;
  margin-right: 0.5rem;
}

.search-input {
  border: none;
  outline: none;
}

.nav-items {
  display: flex;
  list-style-type: none;
}

.nav-items li {
  margin-left: 1rem;
}

.nav-items a {
  text-decoration: none;
  color: #000;
}

.icons {
  display: flex;
  align-items: center;
}

.cart-icon {
  position: relative;
  margin-right: 1rem;
}

.cart-img {
  height: 24px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.login-link a {
  text-decoration: none;
  color: #000;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.page-number {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
}

.page-number.active {
  background-color: #000;
  color: #fff;
}

.cart-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1002;
}

.cart-content {
  padding: 1rem;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.cart-items {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 1rem;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
}

.cart-item-quantity button {
  background: none;
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.remove-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.cart-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.checkout-btn {
  width: 100%;
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-items, 
  .search-bar {
    display: none;
  }

  .menu-container {
    display: block;
  }

  .navbar {
    padding: 0.5rem 1rem;
  }

  .logo-menu-container {
    width: 100%;
    justify-content: space-between;
  }
}
</style>