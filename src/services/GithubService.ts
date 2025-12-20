import axios from 'axios';

//token desde .env
const ACCESS_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  }
});

// 1. Obtener repositorios (GET)
export const getRepos = async () => {
  try {
    const response = await client.get('/user/repos');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo repositorios:', error);
    throw error;
  }
};

// 2. Obtener usuario (GET)
export const getUser = async () => {
  try {
    const response = await client.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
};

// 3. Crear repositorio 
export const createRepo = async (repoData: { name: string; description: string }) => {
  try {
    const response = await client.post('/user/repos', {
        name: repoData.name,
        description: repoData.description,
        private: false, 
        auto_init: true 
    });
    return response.data;
  } catch (error) {
    console.error('Error creando repositorio:', error);
    throw error;
  }
};