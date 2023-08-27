import React, { useState } from 'react';
import {
  ClickAwayListener,
  Box,
  Fade,
  Typography,
  Paper,
} from '@mui/material/';
import { Popper, IconButton } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import ImageComponent from 'components/utils/Image';

const NotificationPopover = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const items = [];

  for (let i = 0; i < 7; i++) {
    items.push(
      <Box className="flex items-center justify-between p-4 hover:bg-gray-100 w-full border-b-2">
        <ImageComponent
          src="https://picsum.photos/200/300"
          className={'aspect-square rounded-md'}
          width={'35px'}
          height={'35px'}
        />
        <Typography sx={{ p: 1, fontSize: '0.9rem' }}>
          Sisteme Yeni bir sensör eklendi.
        </Typography>
        <Typography sx={{ p: 1, fontSize: '0.6rem', fontWeight: 'light' }}>
          20:31
        </Typography>
      </Box>
    );
  }

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
          className="z-50"
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="w-96 h-96 overflow-y-scroll overflow-x-hidden rounded-xl ml-4">
                {items}
              </Paper>
            </Fade>
          )}
        </Popper>
        <IconButton onClick={handleClick('bottom-end')}>
          <Notifications />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
};

export default NotificationPopover;
