import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  // Popup componenti, modal componentidir.
  // Bu componenti kullanarak modalımızı oluşturabiliriz.
  // içerisindeki children componenti, modalın içerisindeki componenttir.

  return (
    <Dialog
      sx={{
        position: 'fixed',
        zIndex: 1300,
        right: '0',
        bottom: '0',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
      open={openPopup}
    >
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            size="small"
            rounded="true"
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: 'red',
                color: 'white',
              },
            }}
            color="error"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
