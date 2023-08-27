import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'components/utils/Button';
import { Box, Skeleton, ButtonGroup, CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Popup from 'components/utils/Modal';
import useEmail from 'hooks/useEmail';

const columns = [
  { field: 'id', headerName: '#', width: 180, padding: '1rem' },
  { field: 'adi', headerName: 'Adı', width: 180, padding: '1rem' },
  { field: 'durum', headerName: 'Durum', type: 'boolean', width: 180 },
  {
    field: 'Sil',
    headerName: 'Sensör Türü Sil',
    type: 'boolean',
    width: 100,
    renderCell: (params) => {
      return <HandleEditModal params={params} />;
    },
  },
];

function HandleEditModal({ params }) {
  const email = useEmail();
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Sensör Türü Sil"
      >
        <h3 className="text-center mb-4">
          <span className="font-bold text-red-500">{params.row.adi}</span>{' '}
          isimli sensör türünü silmek istediğinize emin misiniz?
        </h3>

        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="Emin Misiniz?"
          style={{ width: '100%', padding: '0.3em', borderRadius: '2rem' }}
        >
          <Button
            upperCase={false}
            label={'Evet'}
            style={{
              width: '100%',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '2rem',
              '&:hover': {
                backgroundColor: '#6b2',
                color: 'white',
              },
            }}
            onClick={() => {
              deleteSensorTurleri(params.id, email);
              setOpenPopup(false);
            }}
          />
          <Button
            upperCase={false}
            label={'Hayır'}
            style={{
              width: '100%',
              backgroundColor: 'red',
              color: 'white',
              marginLeft: '0.3em',
              borderRadius: '2rem',
              '&:hover': {
                backgroundColor: '#6B0F1A',
                color: 'white',
              },
            }}
            onClick={() => {
              setOpenPopup(false);
            }}
          />
        </ButtonGroup>
      </Popup>
      <Button
        upperCase={false}
        label={'Sil'}
        style={{
          width: '100%',
          backgroundColor: 'red',
          color: 'white',
          '&:hover': {
            backgroundColor: '#6B0F1A',
            color: 'white',
          },
        }}
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        Sil
      </Button>
    </>
  );
}
async function deleteSensorTurleri(id, email) {
  try {
    await axios
      .delete(`https://maps.deu.edu.tr/sensor_kategoriler/${id}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Sensör Türü Silindi!', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          /*
                        Sensör Türü silme işlemi başarılı olursa sayfa yenilenir.
                        Bu sayede silinen sensör türlerinin tablodan kaybolması sağlanır.
          */
          setTimeout(() => {
            window.location.reload();
          }, 3300);
        } else {
          toast.error('Sensör Türü Silinemedi!', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
}

const SensorTurleriFetch = ({ height }) => {
  const email = useEmail();
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(Boolean);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) fetchSensorTurleri(email);
  }, [email]);

  const fetchSensorTurleri = async () => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/sensor_kategoriler/${email}`
      );
      setFetchError(response.data.success);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

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
          fetchError === false ? (
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
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          )
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SensorTurleriFetch;
