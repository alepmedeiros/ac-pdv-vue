<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <div class="input-group">
        <label for="username">Usuário</label>
        <input v-model="username" id="username" type="text" placeholder="Digite seu usuário" required />
      </div>
      <div class="input-group">
        <label for="password">Senha</label>
        <input v-model="password" id="password" type="password" placeholder="Digite sua senha" required />
      </div>
      <button type="submit">Entrar</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    // const response = await axios.post('/api/auth/login', {
    //   username: username.value,
    //   password: password.value,
    // });

    // const token = response.data.token;
    // localStorage.setItem('token', token);
    window.location.href = '/main';
  } catch (error) {
    errorMessage.value = 'Login ou senha incorretos. Tente novamente.';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
