import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
 
  register(user) {
    return apiClient.post("/register", user);
  },
  login(credentials) {
    return apiClient.post("/login", credentials);
  },

  
  getUsers(token) {
    return apiClient.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteUser(id, token) {
    return apiClient.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  
  getProducts() {
    return apiClient.get("/products");
  },
  createProduct(product, token) {
    return apiClient.post("/products", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProduct(id, product, token) {
    return apiClient.put(`/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteProduct(id, token) {
    return apiClient.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  
  getCategories() {
    return apiClient.get("/categories");
  },
  createCategory(category, token) {
    return apiClient.post("/categories", category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateCategory(id, category, token) {
    return apiClient.put(`/categories/${id}`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteCategory(id, token) {
    return apiClient.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
