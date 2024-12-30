import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const HttpKit = {
  getTopRecipes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=American`);
      return response.data.meals ? response.data.meals.slice(0, 12) : [];
    } catch (error) {
      console.error("Error fetching top recipes:", error);
      throw error;
    }
  },

  searchRecipesByName: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php`, {
        params: { s: query },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by name:", error);
      throw error;
    }
  },

  searchRecipesByIngredient: async (ingredient) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { i: ingredient },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by ingredient:", error);
      throw error;
    }
  },

  getRecipeDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php`, {
          params: { i: id },
        })
        .then((res) => res);
      console.log(response, "response check");

      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  filterByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { c: category },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by category:", error);
      throw error;
    }
  },

  filterByArea: async (area) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { a: area },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by area:", error);
      throw error;
    }
  },
};

export default HttpKit;
