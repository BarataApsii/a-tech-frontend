import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const auth = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export const categories = {
  list: async (): Promise<Category[]> => {
    const { data } = await api.get('/categories');
    return data;
  },
  create: async (category: Omit<Category, 'id' | 'slug'>): Promise<Category> => {
    const { data } = await api.post('/categories', category);
    return data;
  },
  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    const { data } = await api.put(`/categories/${id}`, category);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  description: string | null;
  published: boolean;
  categoryId: string;
}

export const news = {
  list: async (): Promise<NewsItem[]> => {
    const { data } = await api.get('/news');
    return data;
  },
  create: async (item: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
    const { data } = await api.post('/news', item);
    return data;
  },
  update: async (id: string, item: Partial<NewsItem>): Promise<NewsItem> => {
    const { data } = await api.put(`/news/${id}`, item);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/news?id=${id}`);
  },
};

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const contact = {
  send: async (message: ContactMessage): Promise<void> => {
    await api.post('/contact', message);
  },
  list: async (): Promise<ContactMessage[]> => {
    const { data } = await api.get('/messages');
    return data;
  },
  markAsRead: async (id: string): Promise<void> => {
    await api.put(`/messages/${id}/read`);
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/messages/${id}`);
  },
};

export default api; 