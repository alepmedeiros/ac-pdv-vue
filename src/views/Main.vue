<template>
  <div class="main-container">
    <!-- Navbar parametrizado -->
    <Navbar
      :logo="logo"
      :userName="userName"
      :userImage="userImage"
      @toggleSidebar="toggleSidebar"
    />

    <!-- Sidebar Component -->
    <Sidebar :isOpen="sidebarOpen" @navigate="navigateTo" />

    <!-- Conteúdo principal -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue'; // Importando Navbar componentizado
import Sidebar from '@/components/Sidebar.vue'; // Importando Sidebar componentizado

const router = useRouter();

// Variáveis para parametrizar o Navbar
const logo = '@/assets/logo.png'; // Substitua pelo caminho do logo
const userName = 'Alessandro Medeiros';
const userImage = 'https://avatar.iran.liara.run/public/30'; // Substitua pelo caminho do avatar do usuário

// Controle de abertura do Sidebar
const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const navigateTo = (route: string) => {
  router.push({ name: route });
};
</script>

<style scoped>
.back-button button {
  background-color: #555;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.back-button button:hover {
  background-color: #777;
}

/* Conteúdo Principal */
.content {
  margin-top: 80px;
  padding: 20px;
  overflow: auto;
  background-color: #f5f5f5;
  flex-grow: 1;
}
</style>
