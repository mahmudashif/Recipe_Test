// src/lib/api.js - API utility functions
export const API_BASE_URL = 'https://recipe-server-jade.vercel.app/api';

// Authentication API calls
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

// Cart API calls
export const addToCart = async (mealId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ mealId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCart = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (mealId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${mealId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};