import React from 'react';
import Olcum1 from './Olcum1';
import { Box, Container, Typography } from '@mui/material';

const AkimOlcum = () => {
  // AkimOlcum componentinde ise, Olcum1 componentini çağırdık.
  // Bu component bir wrapper yani kapsayıcı component. Atomik çalışmak için yapılmış bir şeydir. 
  return (
    <Container>
      <Typography variant="h6" sx={{ marginTop: '1rem' }}>
        Ölçüm 1
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Olcum1 />
      </Box>
    </Container>
  );
};

export default AkimOlcum;
