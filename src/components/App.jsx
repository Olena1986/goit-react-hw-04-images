import React, { useEffect, useReducer,useCallback } from 'react';
import Searchbar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { AppStyle } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImagesApi } from 'servises/api';
import { Loader } from './Loader/Loader';

const App = () => {

const initialState = {
  searchQuery: '',
  images: [],
  selectedImage: null,
  isLoading: false,
  page: 1,
  totalPage: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, images: [], page: 1 };
    case 'SET_IMAGES':
      return { ...state, images: [...state.images, ...action.payload] };
    case 'SET_SELECTED_IMAGE':
      return { ...state, selectedImage: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_TOTAL_PAGE':
      return { ...state, totalPage: action.payload };
    default:
      return state;
  }
};


  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchQuery, images, selectedImage, isLoading, page, totalPage } = state;


  const fetchImages = useCallback(async () => {
    try {
      dispatch({ type: 'SET_IS_LOADING', payload: true });
  
      const fetchedImages = await fetchImagesApi(searchQuery, page);
  
      dispatch({ type: 'SET_IMAGES', payload: fetchedImages.imgData });
      dispatch({ type: 'SET_TOTAL_PAGE', payload: Math.ceil(fetchedImages.total / 12) });
      dispatch({ type: 'SET_IS_LOADING', payload: false });
  
      if (fetchedImages.imgData.length === 0) {
        toast.info('No images found.', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
      toast.error('Error fetching images');
    }
  }, [searchQuery, page]);
  
  
useEffect(() => {
  fetchImages();

}, [fetchImages]);

useEffect(() => {
  if (searchQuery !== '' || page !== 1) {
    fetchImages();
  }
}, [searchQuery, page,fetchImages]);

  const handleSearchSubmit = query => {
    if (!query) {
      toast.error('Please enter a search query');
      return;
    }

    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    dispatch({ type: 'SET_IMAGES', payload: [] });
    dispatch({ type: 'SET_PAGE', payload: 1 });
   
  };

  const handleLoadMore = () => {
    dispatch({ type: 'SET_PAGE', payload: page + 1 });
  };

  const handleImageClick = image => {
    dispatch({ type: 'SET_SELECTED_IMAGE', payload: image });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'SET_SELECTED_IMAGE', payload: null });
  };

  const hasMoreImages = page < totalPage;

  return (
    <AppStyle.Appform>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {hasMoreImages && <Button onClick={handleLoadMore} />}

      {selectedImage && (
        <Modal imageUrl={selectedImage.largeImageURL} onClose={handleCloseModal} />
      )}
      <ToastContainer autoClose={1000} />
    </AppStyle.Appform>
  );
};

export default App;

