import axios from 'axios';
import constants from '../constants';

const API = axios.create({
    baseURL: `${constants.HOST}/users`,
    withCredentials: true, 
});

// Fetch users
export const fetchUsers = () => API.get('/');

// Create user
export const createUser = (user) => API.post('/', user);

// Update user
export const updateUser = (id, user) => API.put(`/${id}`, user);

// Delete user
export const deleteUser = (id) => API.delete(`/${id}`);

// Login user
export const loginUser = (credentials) => API.post('/login', credentials);