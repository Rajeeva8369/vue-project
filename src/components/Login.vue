<template>
  <div class="container">
    <div class="form-container">
      <div class="form-header">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'login' }" 
          @click="setActiveTab('login')"
        >
          Login
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'register' }" 
          @click="$router.push('/register')"
        >
          Register
        </button>
      </div>

      <div class="form-content login-form active">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Email" 
              required
            >
          </div>
          <div class="form-group">
            <input 
              type="password" 
              v-model="password" 
              placeholder="Password" 
              required
            >
          </div>
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
          <p class="error-message" v-if="error">{{ error }}</p>
          <p>
            Don't have an account? 
            <router-link to="/register">Register here</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const isLoading = ref(false)
    const activeTab = ref('login')

    const setActiveTab = (tab) => {
      activeTab.value = tab
    }

    const handleLogin = async () => {
      try {
        isLoading.value = true
        error.value = ''
        
        const response = await axios.post('http://localhost:3000/login', {
          username: email.value,
          password: password.value
        })

        const { token } = response.data
        localStorage.setItem('token', token)
        
        // Reset form
        email.value = ''
        password.value = ''
        
        // Redirect to home page
        router.push('/')
      } catch (err) {
        error.value = err.response?.data?.message || 'An error occurred during login'
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      error,
      isLoading,
      activeTab,
      setActiveTab,
      handleLogin
    }
  }
}
</script>

<style scoped>
body {
  background-color: #121212;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 480px;
  padding: 20px;
  box-sizing: border-box;
}

.form-container {
  background-color: #1f1f1f;
  border-radius: 20px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.2);
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  position: relative;
}

.form-container:hover {
  box-shadow: 0 8px 80px rgba(0, 0, 0, 0.3);
}

.form-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.tab-btn {
  background-color: #333333;
  border: 1px solid #444444;
  padding: 14px 28px;
  cursor: pointer;
  border-radius: 50px;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 48%;
}

.tab-btn:hover {
  background-color: #555555;
}

.tab-btn.active {
  background-color: #0e0e0e;
  color: #f1f1f1;
  border: 1px solid #f1f1f1;
}

.form-content {
  display: block;
}

h2 {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

input {
  width: 100%;
  padding: 14px 20px;
  margin: 15px 0;
  border: 1px solid #444444;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  background-color: #2c2c2c;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input::placeholder {
  color: #b0b0b0;
}

input:focus {
  border-color: #e1c16e;
  box-shadow: 0 0 8px rgba(225, 193, 110, 0.4);
  outline: none;
}

button {
  width: 100%;
  padding: 16px 20px;
  background: linear-gradient(45deg, #afaeac, #524b46);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #777571;
  transform: translateY(-3px);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

a {
  color: #636058;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #8a8079;
}

p {
  font-size: 14px;
  margin-top: 20px;
  color: #b0b0b0;
}

.error-message {
  color: #ff6b6b;
  margin-top: 10px;
}

@media (max-width: 480px) {
  .form-container {
    padding: 25px;
  }

  .tab-btn {
    padding: 12px 22px;
  }

  h2 {
    font-size: 24px;
  }

  input,
  button {
    padding: 12px;
  }
}
</style>