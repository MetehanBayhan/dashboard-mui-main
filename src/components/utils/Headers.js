import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ title, variant, fontSize, margin, color, fontWeight }) => {
  // Header componenti, başlık componentidir.
  // Bu componenti kullanarak başlıklarımızı oluşturabiliriz.

  return (
    <Typography
      variant={variant}
      sx={{
        color: { color },
        fontSize: { fontSize },
        fontWeight: { fontWeight },
        margin: { margin },
      }}
    >
      {title}
    </Typography>
  );
};

export default Header;
