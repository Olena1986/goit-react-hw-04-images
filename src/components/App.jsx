import React, { Component } from 'react';
import Searchbar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from '../servises/api.js';
import { AppStyle } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    selectedImage: null,
    isLoading: false,
    page: 1,
    totalPage: 1,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      const { searchQuery, page } = this.state;

      this.setState({
        isLoading: true,
      });

      const images = await fetchImages(searchQuery, page);

      this.setState(prevState => ({
        images:
          page === 1
            ? images.imgData
            : [...prevState.images, ...images.imgData],
        isLoading: false,
        totalPage: Math.ceil(images.total / 12),
      }));

      if (images.length === 0) {
        toast.info('No images found.', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      toast.error('Error fetching images');
    }
  };

  handleSearchSubmit = query => {
    if (!query) {
      toast.error('Please enter a search query');
      return;
    }
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = image => {
    this.setState({
      selectedImage: image,
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  render() {
    const { images, selectedImage, isLoading } = this.state;
    const { page, totalPage } = this.state;
    const hasMoreImages = page < totalPage;

    return (
      <AppStyle.Appform>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {hasMoreImages && <Button onClick={this.handleLoadMore} />}

        {selectedImage && (
          <Modal
            imageUrl={selectedImage.largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
        <ToastContainer autoClose={1000} />
      </AppStyle.Appform>
    );
  }
}

export default App;
