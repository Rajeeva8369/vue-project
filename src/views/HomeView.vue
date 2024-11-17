<template>
  <div class="home">
    <div class="carousel">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(slide, index) in carouselSlides" :key="index" class="carousel-slide">
          <img :src="slide.image" :alt="slide.alt">
        </div>
      </div>
      
      <button class="carousel-button prev" @click="prevSlide">&lt;</button>
      <button class="carousel-button next" @click="nextSlide">&gt;</button>
    </div>

    <div class="welcome-section">
      <h1>BIENVENUE CHEZ MYSHOP</h1>
      <p>Venez decouvrir nos nouvelles collections juste ici ⬇️</p>
    </div>

    <div class="featured-section">
      <h2>{{ searchResults.length > 0 ? 'Search Results' : 'Our Products' }}</h2>
      <div v-if="searchResults.length === 0" class="category-filter">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="setCategory(category)"
          :class="{ active: currentCategory === category }"
        >
          {{ category }}
        </button>
      </div>
      <div class="product-grid">
        <div v-for="product in displayedProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name">
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price.toFixed(2) }} €</p>
          <p class="category">{{ product.category }}</p>
          <button 
            @click="addToCart(product)" 
            class="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        class="page-number" 
        :class="{ active: currentPage === page }"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
      <button class="page-number next-page" @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export default {
  name: 'HomeView',
  props: {
    searchResults: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const currentSlide = ref(0)
    const currentPage = ref(1)
    const currentCategory = ref('All')
    const itemsPerPage = 6
    let intervalId = null

    const carouselSlides = [
      { image: new URL('@/img/Bubblesofa.png', import.meta.url).href, alt: "Bubble Sofa" },
      { image: new URL('@/img/Bubblesofa2.png', import.meta.url).href, alt: "Bubble Sofa 2" },
      { image: new URL('@/img/tablebasse.png', import.meta.url).href, alt: "Tables" }
    ]

    const products = [
      { id: 1, name: "Table Basse Design", price: 299.99, category: "Tables", image: new URL('@/img/tablebasse.png', import.meta.url).href },
      { id: 2, name: "Table Basse Moderne", price: 349.99, category: "Tables", image: new URL('@/img/tablebasse2.png', import.meta.url).href },
      { id: 3, name: "Canapé Confort", price: 599.99, category: "Sofas", image: new URL('@/img/Bubblesofa.png', import.meta.url).href },
      { id: 4, name: "Canapé Élégance", price: 649.99, category: "Sofas", image: new URL('@/img/Bubblesofa2.png', import.meta.url).href },
      { id: 5, name: "Lampe de Table", price: 79.99, category: "Lighting", image: new URL('@/img/decor.png', import.meta.url).href },
      { id: 6, name: "Lampe Moderne", price: 129.99, category: "Decor", image: new URL('@/img/decor2.png', import.meta.url).href },
      { id: 7, name: "Chaise Moderne", price: 149.99, category: "Chairs", image: new URL('@/img/add1.jpg', import.meta.url).href },
      { id: 8, name: "Table Basse New Collection", price: 249.99, category: "Desks", image: new URL('@/img/tablebasse3.png', import.meta.url).href },
    ]

    const categories = computed(() => ['All', ...new Set(products.map(p => p.category))])

    const filteredProducts = computed(() => {
      if (props.searchResults.length > 0) {
        return props.searchResults
      }
      return currentCategory.value === 'All' 
        ? products 
        : products.filter(p => p.category === currentCategory.value)
    })

    const displayedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredProducts.value.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage)
    )

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
    }

    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + carouselSlides.length) % carouselSlides.length
    }

    const setCategory = (category) => {
      currentCategory.value = category
      currentPage.value = 1
    }

    const setPage = (page) => {
      currentPage.value = page
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const addToCart = (product) => {
      window.dispatchEvent(new CustomEvent('add-to-cart', { 
        detail: { 
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        } 
      }))
    }

    const emitPaginationUpdate = () => {
      window.dispatchEvent(new CustomEvent('update-pagination', {
        detail: {
          currentPage: currentPage.value,
          totalPages: totalPages.value,
          showPagination: totalPages.value > 1
        }
      }))
    }

    watch([currentPage, totalPages], emitPaginationUpdate)

    onMounted(() => {
      intervalId = setInterval(nextSlide, 5000)
      emitPaginationUpdate()
    })

    onBeforeUnmount(() => {
      if (intervalId) clearInterval(intervalId)
    })

    return {
      currentSlide,
      currentPage,
      currentCategory,
      categories,
      carouselSlides,
      displayedProducts,
      totalPages,
      nextSlide,
      prevSlide,
      setCategory,
      setPage,
      nextPage,
      addToCart
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 40px;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  font-size: 18px;
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-section h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.featured-section {
  margin-bottom: 40px;
}

.featured-section h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.category-filter {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.category-filter button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-filter button.active {
  background: #000;
  color: white;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-card h3 {
  margin: 10px 0;
}

.product-card .price {
  font-weight: bold;
  color: #e44d26;
}

.product-card .category {
  font-size: 0.9em;
  color: #666;
}

.add-to-cart-btn {
  background-color: #000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 10px;
}

.add-to-cart-btn:hover {
  background-color: #333;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.page-number {
  padding: 8px 12px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
}

.page-number.active {
  background: #000;
  color: white;
}

.next-page {
  background: #000;
  color: white;
}

.next-page:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .carousel {
    height: 300px;
  }

  .welcome-section h1 {
    font-size: 2em;
  }

  .featured-section h2 {
    font-size: 1.5em;
  }

  .category-filter {
    flex-wrap: wrap;
  }

  .category-filter button {
    font-size: 0.9em;
    padding: 6px 12px;
  }
}


</style>