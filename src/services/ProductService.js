import ApiService from './ApiService';

const ProductService = {
  getAll() {
    return ApiService.getProducts();
  },

  get(id) {
    return ApiService.getProducts().then(response => 
      response.data.find(product => product.id === id)
    );
  },

  create(data, token) {
    return ApiService.createProduct(data, token);
  },

  update(id, data, token) {
    return ApiService.updateProduct(id, data, token);
  },

  delete(id, token) {
    return ApiService.deleteProduct(id, token);
  }
};

export default ProductService;
