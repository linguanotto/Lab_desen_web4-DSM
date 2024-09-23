import axios from 'axios';
import { User } from '../types/User';

// URL base da API
const API_URL = 'http://localhost:5000/api/users';

// Função para buscar todos os usuários
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    throw error;
  }
};

// Função para criar um novo usuário
export const addUser = async (name: string, email: string): Promise<User> => {
  try {
    const response = await axios.post(API_URL, { name, email });
    return response.data;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};

// Função para deletar um usuário
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting user', error);
    throw error;
  }
};
