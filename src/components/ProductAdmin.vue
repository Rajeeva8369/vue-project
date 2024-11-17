<template>
  <div class="product-admin">
    <h2>Manage Products</h2>
    <form @submit.prevent="isEditing ? updateProduct() : createProduct()">
      <input v-model="newProduct.name" placeholder="Product Name" required />
      <input v-model="newProduct.price" placeholder="Price" required />
      <input v-model="newProduct.description" placeholder="Description" required />
      <button type="submit">{{ isEditing ? "Update Product" : "Add Product" }}</button>
    </form>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - ${{ product.price }}
        <button @click="editProduct(product)">Edit</button>
        <button @click="deleteProduct(product.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  data() {
    return {
      products: [],
      newProduct: {
        name: "",
        price: "",
        description: "",
      },
      isEditing: false,
      productToEdit: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      ProductService.getAll()
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    createProduct() {
      ProductService.create(this.newProduct)
        .then(() => {
          this.fetchProducts();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error creating product:", error);
        });
    },
    deleteProduct(id) {
      ProductService.delete(id)
        .then(() => {
          this.fetchProducts();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    },
    editProduct(product) {
      this.newProduct = { ...product };
      this.isEditing = true;
      this.productToEdit = product.id;
    },
    updateProduct() {
      ProductService.update(this.productToEdit, this.newProduct)
        .then(() => {
          this.fetchProducts();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    },
    resetForm() {
      this.newProduct = { name: "", price: "", description: "" };
      this.isEditing = false;
      this.productToEdit = null;
    },
  },
};
</script>

<style scoped>
.product-admin {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #444;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

li button {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

li button:hover {
  background-color: #e60000;
}
</style>



