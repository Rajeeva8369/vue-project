<template>
    <div class="user-admin">
      <h2>Manage Users</h2>
      <form @submit.prevent="createUser">
        <input v-model="newUser.username" placeholder="Username" required />
        <input v-model="newUser.password" placeholder="Password" type="password" required />
        <select v-model="newUser.role">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }} - {{ user.role }}
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import ApiService from "@/services/ApiService"; 
  
  export default {
    data() {
      return {
        users: [],
        newUser: {
          username: "",
          password: "",
          role: "user",
        },
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        ApiService.getUsers().then((response) => {
          this.users = response.data;
        });
      },
      createUser() {
        ApiService.register(this.newUser).then(() => {
          this.fetchUsers();
          this.newUser = { username: "", password: "", role: "user" };
        });
      },
      deleteUser(id) {
        ApiService.deleteUser(id).then(() => {
          this.fetchUsers();
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .user-admin {
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
  
  input,
  select {
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
  