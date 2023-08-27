import React from 'react';
import { Button } from '@mui/material';

const ButtonComponent = ({
  onClick,
  onSubmit,
  label,
  type,
  variant,
  style,
  className,
}) => {
  // Button componenti. Bu componenti kullanarak butonlarımızı oluşturabiliriz.
  // Örneğin, src/screens/Anasayfa/HomePage.js dosyasında kullanılmıştır.
  // Bu her yerde özelleştirerek kullanabileceğiniz bir componenttir.
  return (
    <Button
      className={className}
      variant={variant}
      sx={style}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
