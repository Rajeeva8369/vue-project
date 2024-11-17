import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from "@/views/HomeView.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import ProductAdmin from "@/components/ProductAdmin.vue";
import UserAdmin from "@/components/UserAdmin.vue";


const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/admin/products", name: "ProductAdmin", component: ProductAdmin },
  { path: "/admin/users", name: "UserAdmin", component: UserAdmin },
  
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;queueMicrotask
