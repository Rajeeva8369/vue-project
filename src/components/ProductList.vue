<template>
  <div class="product-list-container">
    <div class="sidebar">
      <div class="best-match">
        <select v-model="sortOption" @change="handleSort">
          <option value="best-match">Best Match</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <button class="filter-toggle" @click="toggleFilter">Filter By</button>

      <div class="filter-content" :class="{ 'open': isFilterOpen }">
        <h3>Filters</h3>
        <div class="filter-category">
          <h4>Category</h4>
          <label v-for="category in categories" :key="category">
            <input type="checkbox" v-model="selectedCategories" :value="category"> {{ category }}
          </label>
        </div>
        <div class="filter-collection">
          <h4>Collection</h4>
          <label v-for="collection in collections" :key="collection">
            <input type="checkbox" v-model="selectedCollections" :value="collection"> {{ collection }}
          </label>
        </div>
        <div class="filter-price">
          <h4>Price Range</h4>
          <input type="range" v-model="priceRange" min="500" max="10000" class="price-range">
          <p>Price: ${{ priceRange }}</p>
        </div>
        <button class="apply-filters" @click="applyFilters">Apply Filters</button>
      </div>
    </div>

    <section class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <img :src="product.image" :alt="product.name">
        <h4>${{ product.price.toFixed(2) }}</h4>
        <p>{{ product.name }}</p>
        <category>{{ product.category }}</category>
        <collection>{{ product.collection }}</collection>
        <img class="add-to-cart" @click="addToCart(product)" src="@/img/add1.jpg" alt="Add to cart">
        <div class="product-description">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      sortOption: 'best-match',
      isFilterOpen: false,
      selectedCategories: [],
      selectedCollections: [],
      priceRange: 10000,
      products: [
        { id: 1, name: "Astrea lounge", price: 2500, category: "Beds", collection: "Bubble", image: "@/img/Bubblesofa.png", description: "This stylish chair will add a modern touch to any space." },
        { id: 2, name: "Astrea", price: 3480, category: "Chairs", collection: "Bubble", image: "@/img/Bubblesofa2.png", description: "This stylish chair will add a modern touch to any space." },
        { id: 3, name: "Astrea", price: 2981, category: "Chairs", collection: "Bamboo", image: "@/img/decor.png", description: "This stylish chair will add a modern touch to any space." },
        { id: 4, name: "Bubble", price: 2478, category: "Sofas", collection: "Bubble", image: "@/img/decor2.png", description: "This stylish chair will add a modern touch to any space." },
        { id: 5, name: "Bubble mini", price: 4000, category: "Sofas", collection: "Bamboo", image: "@/img/tablebasse.png", description: "This stylish chair will add a modern touch to any space." },
        { id: 6, name: "Bubble", price: 4589, category: "Beds", collection: "Bamboo", image: "@/img/tablebasse2.png", description: "This stylish chair will add a modern touch to any space." }
      ]
    };
  },
  computed: {
    categories() {
      return [...new Set(this.products.map(product => product.category))];
    },
    collections() {
      return [...new Set(this.products.map(product => product.collection))];
    },
    filteredProducts() {
      return this.products.filter(product => {
        const categoryMatch = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category);
        const collectionMatch = this.selectedCollections.length === 0 || this.selectedCollections.includes(product.collection);
        const priceMatch = product.price <= this.priceRange;
        return categoryMatch && collectionMatch && priceMatch;
      }).sort((a, b) => {
        if (this.sortOption === 'low-high') return a.price - b.price;
        if (this.sortOption === 'high-low') return b.price - a.price;
        return 0;
      });
    }
  },
  methods: {
    handleSort() {
      // The sorting is handled in the computed property
    },
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    applyFilters() {
      this.isFilterOpen = false;
    },
    addToCart(product) {
      this.$emit('add-to-cart', product);
    }
  }
};
</script>

<style scoped>
.product-list-container {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.best-match select {
  width: 100%;
  padding: 5px;
  margin-bottom: 15px;
}

.filter-toggle {
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
}

.filter-content {
  display: none;
}

.filter-content.open {
  display: block;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  flex-grow: 1;
}

.product-item {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  transition: box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}

.product-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-item img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

category,
collection {
  display: block;
  color: grey;
  font-family: Roboto, sans-serif;
  font-size: small;
}

.add-to-cart {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.add-to-cart:hover {
  transform: scale(1.1);
}

.product-description {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-item:hover .product-description {
  opacity: 1;
}

.filter-price input[type="range"] {
  width: 100%;
}

.apply-filters {
  width: 100%;
  padding: 10px;
  background-color: #ade766;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
</style>
