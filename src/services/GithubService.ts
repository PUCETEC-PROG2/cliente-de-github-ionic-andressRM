import axios from 'axios';

//  token de GitHub

const ACCESS_TOKEN = ''; 

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  }
});

// Obtener repositorios del usuario
export const getRepos = async () => {
  try {
    const response = await client.get('/user/repos');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo repositorios:', error);
    throw error;
  }
};

// Obtener información del usuario (Perfil)
export const getUser = async () => {
  try {
    const response = await client.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
};