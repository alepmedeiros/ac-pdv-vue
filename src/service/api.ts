import axios from 'axios';
import router from '@/router'; // Importa o roteador para redirecionamento

// Cria uma instância do axios com a configuração básica
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para carregar o token do localStorage e configurar o cabeçalho Authorization
const loadAuthToken = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Executa a configuração do token automaticamente ao iniciar
loadAuthToken();

// Função para salvar o token no localStorage e configurá-lo no axios
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('authToken', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Interceptor para manipular respostas de erro, como o caso de token expirado
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se o token expirar ou a sessão for inválida, remova o token do localStorage
      setAuthToken(null);
      localStorage.setItem('authMessage', 'Sessão expirada. Por favor, faça login novamente.');
      router.push('/login'); // Redireciona para a página de login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
