import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton } from '@mui/material';
import axios from 'axios';
import useEmail from 'hooks/useEmail';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'cihaz_id', headerName: 'Cihaz ID', width: 100 },
  { field: 'kategori_id', headerName: 'Kategori ID', width: 100 },
  { field: 'adi', headerName: 'Adı' },
  { field: 'alt_limit', headerName: 'Alt Limit', width: 100 },
  { field: 'ust_limit', headerName: 'Üst Limit', width: 100 },
  {
    field: 'eklenme_tarihi',
    headerName: 'Eklenme Tarihi',
    width: 170,
    renderCell: (params) => {
      return params.value.substring(0, 10);
    },
  },
  { field: 'durum', headerName: 'Durum', width: 150 },
];

const LimitFetch = ({ height }) => {
  const email = useEmail();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) fetchLimitler(email);
  }, [email]);

  async function fetchLimitler(email) {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/veri_limit/${email}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Box
        sx={{
          height: `${height}`,
          width: '100%',
          padding: '1rem',
          display: 'flex',
        }}
      >
        {loading === false ? (
          data.success === false ? (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h1>Veri Bulunamadı</h1>
            </Box>
          ) : (
            <DataGrid
              rows={data.data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          )
        ) : (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LimitFetch;
