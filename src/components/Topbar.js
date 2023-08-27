import React from 'react';
import { Box, IconButton } from '@mui/material';
import Notification from './Notification';
import { Menu, Logout } from '@mui/icons-material';
import { useProSidebar } from 'react-pro-sidebar';
import logo from 'assets/logo.png';
import { Typography } from '@mui/material';
import Image from 'components/utils/Image';
import { Link } from 'react-router-dom';

const Topbar = () => {
  // const [darkMode, setDarkMode] = React.useState(false);
  const { toggleSidebar, toggled, broken } = useProSidebar();

  // Eğer ekran boyutu küçükse ve broken true döndüğünde ekrandaki sidebar Hamburger menüye dönüşürse o zaman topbar'ın
  // alacağı şekli belirten kod aşağıdadır. useProSidebar bir custom hook'tur ve react pro sidebar'ın bir parçasıdır.
  // Bu hook'u kullanarak sidebar'ın açılıp kapanmasını ve ekran boyutuna göre değişimini sağlayabilirsiniz.
  return (
    <Box className="flex justify-between items-center bg-[#eaeaea] p-1">
      {broken ? (
        <IconButton color="#343A40" onClick={() => toggleSidebar(!toggled)}>
          <Menu shapeRendering="square" />
        </IconButton>
      ) : null}
      {broken && (
        <Link to="/" className="flex flex-row items-center">
          <Image src={logo} width="30px" height="30px" alt="logo" />
          <Typography
            variant="h6"
            fontSize="1rem"
            sx={{
              color: '#343A40',
              fontFamily: 'Poppins',
              marginLeft: '0.5rem',
            }}
          >
            DEÜ Akıllı Kampüs
          </Typography>
        </Link>
      )}
      {/* ICONS */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: '0.5rem',
        }}
      >
        <Notification />
        <IconButton
          color="#343A40"
          onClick={() => {
            sessionStorage.removeItem('email');
            window.location.href = 'http://kampus.deu.edu.tr/admin.php';
          }}
        >
          <Logout />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
