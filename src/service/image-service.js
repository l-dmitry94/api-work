import axios from 'axios';

const API_KEY = 'ZVoZBE7HDAaArxnREIXZJGvRzLHpnsf2xYDBfETZqmahk6snaEsPkHtc';
axios.defaults.baseURL = 'https://api.pexels.com/v1';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const response = await axios.get(`/search?query=${query}&page=${page}`);
  return response.data;
};

//curl -H "Authorization: YOUR_API_KEY" \
// "https://api.pexels.com/v1/search?query=nature&per_page=1"
