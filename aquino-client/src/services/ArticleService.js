import axios from 'axios';
import constants from '../constants';

// API Access to Article data
const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// Fetch articles
export const fetchArticles = () => API.get('/');

// Create article
export const createArticle = (article) => API.post('/', article);

// Update article
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// Delete article
export const deleteArticle = (id) => API.delete(`/${id}`);