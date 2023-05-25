import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '35978039-e1b43f028e4248e636af167c6';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get('/', {
      params: {
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: perPage,
      },
    });

    const imgData = response.data.hits.map(image => ({
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
    }));
    const images = { imgData, total: response.data.total };
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

fetchImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
};
