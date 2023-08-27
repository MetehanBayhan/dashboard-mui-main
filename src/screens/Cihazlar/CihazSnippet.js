import { Box, Typography } from '@mui/material';
import { MdOutlineSensors, MdFormatListNumbered } from 'react-icons/md';
import { BiDevices } from 'react-icons/bi';
import { GoAlert } from 'react-icons/go';

// Yeni Versiyon:
const boxStyle = {
  position: 'relative',
  alignItems: 'center',
  boxShadow: '0 0 1px 1px #ccc',
  backgroundColor: '#fff',
  height: '5rem',
  margin: '0.5rem',
  width: '100%',
  display: 'flex',
  borderRadius: '0.2rem',
  justifyContent: 'center',
};

const iconStyle = {
  position: 'absolute',
  top: '-18px',
  left: 10,
  backgroundColor: 'green',
  borderRadius: '0.5rem',
  boxShadow: '0 0 5px 5px #eee',
  color: '#fff',
  fontSize: '1.5rem',
  padding: '0.5rem',
};

const CihazSnippet = () => {
  return (
    <div className="justify-center items-center flex flex-col md:flex-col lg:m-2 lg:flex-row m-4 md:mt-4">
      <Box sx={boxStyle}>
        <Box sx={iconStyle}>
          <BiDevices />
        </Box>
        <Typography variant="p" margin="0" color={''}>
          Cihaz Sayısı:
          <span className="ml-2 font-normal text-md ">12</span>
        </Typography>
      </Box>
      <Box sx={boxStyle}>
        <Box sx={{ ...iconStyle, backgroundColor: 'red', color: 'gold' }}>
          <GoAlert />
        </Box>
        <Typography variant="p" margin="0" color={'red'}>
          Arızalı Cihaz Sayısı:
          <span className="ml-2 font-normal text-md ">12</span>
        </Typography>
      </Box>
      <Box sx={boxStyle}>
        <Box sx={{ ...iconStyle, backgroundColor: 'black' }}>
          <MdOutlineSensors />
        </Box>
        <Typography
          variant="p"
          margin="0"
          color={'#343A40'}
          className="font-normal text-md"
        >
          Sensörler: <span className="ml-2 font-normal text-md ">124</span>
        </Typography>
      </Box>
      <Box sx={boxStyle}>
        <Box sx={{ ...iconStyle, backgroundColor: 'red', color: 'gold' }}>
          <GoAlert />
        </Box>
        <Typography variant="p" margin="0" color={'red'}>
          Arızalı Sensör:
          <span className="ml-2 font-normal text-md ">12</span>
        </Typography>
      </Box>
      <Box sx={boxStyle}>
        <Box sx={{ ...iconStyle, backgroundColor: 'blue' }}>
          <MdFormatListNumbered />
        </Box>
        <Typography variant="p" margin="0" color={'black'}>
          Ölçüm Sayısı:{' '}
          <span className="ml-2 font-normal text-md ">100.000</span>
        </Typography>
      </Box>
    </div>
  );
};

export default CihazSnippet;
