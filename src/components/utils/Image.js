import React from 'react';

const Image = ({ src, alt, width, height, className }) => {
  // Image componenti. Bu componenti kullanarak resimlerimizi oluşturabiliriz.

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
    />
  );
};

export default Image;
