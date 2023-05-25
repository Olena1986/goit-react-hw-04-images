import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImgGalleryStyle } from './ImageGallery.styled';

const ImageGallery = ({ images, onImageClick }) => {
  const uniqueImages = images.filter(
    (image, index, self) => self.findIndex(img => img.id === image.id) === index
  );

  return (
    <ImgGalleryStyle.GalleryStyle>
      {uniqueImages.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </ImgGalleryStyle.GalleryStyle>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
