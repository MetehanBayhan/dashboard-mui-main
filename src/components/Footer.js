// import React from 'react';
// import { Box, Link } from '@mui/material';

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         width: '100%',
//         fontSize: '0.7rem',
//         color: '#C2C7D0',
//         backgroundColor: '#F4F6F9',
//         dropShadow: '0 0 0 1px #fff',
//         marginTop: '1rem',
//         padding: '0.5rem',
//       }}
//     >
//       <p className="ml-2">
//         Tüm hakları saklıdır © 2008-2022
//         <Link
//           href="#"
//           underline="none"
//           color="primary"
//           sx={{ marginLeft: '0.5rem' }}
//         >
//           DEU AKILLI KAMPÜS.
//         </Link>
//       </p>
//       <p className="ml-2">Version 1.0</p>
//     </Box>
//   );
// };

// export default Footer;

import React from 'react';
import { Box, Link } from '@mui/material';

// eski footer yukarıda fakat aşağıdakini de özelleştirebilirsiniz. Klasik footer'dır.
const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#F4F6F9',
        color: '#C2C7D0',
        height: '35px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <p
        className="
        ml-2 mr-2 text-xs text-gray-500  text-center font-semibold
      "
      >
        Tüm hakları saklıdır © 2008-2022
        <Link
          href="#"
          underline="none"
          color="primary"
          sx={{ marginLeft: '0.5rem' }}
        >
          DEU AKILLI KAMPÜS.
        </Link>
      </p>
    </Box>
  );
};

export default Footer;
