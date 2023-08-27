import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'components/utils/Button';
import { Box, Skeleton, ButtonGroup, LinearProgress } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Popup from 'components/utils/Modal';
import useEmail from 'hooks/useEmail';

const columns = [
  { field: 'id', headerName: '#', width: 50 },
  { field: 'cihaz_id', headerName: 'Cihaz ID', width: 100, padding: '1rem' },
  { field: 'kategori_id', headerName: 'Kategori ID', width: 100 },
  { field: 'parca_adi', headerName: 'Parça Adı' },
  {
    field: 'eklenme_tarihi',
    headerName: 'Eklenme Tarihi',
    width: 110,
    renderCell: (params) => {
      return params.value.substring(0, 10);
    },
  },
  { field: 'durum', headerName: 'Durum', type: 'boolean', width: 90 },
  {
    field: 'Sil',
    headerName: 'Sensör Sil',
    type: 'boolean',
    width: 110,
    renderCell: (params) => <HandleDeleteSensorModal params={params} />,
  },
];

function HandleDeleteSensorModal({ params }) {
  const email = useEmail();
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Sensör Sil"
      >
        <div className=" mb-4">
          <p className="font-normal">
            ID numarası{' '}
            <span className="font-semibold text-red-500">
              {' '}
              #{params.row.id}
            </span>
          </p>
          <p className="font-normal">
            Cihaz ID numarası{' '}
            <span className="font-semibold text-red-500">
              #{params.row.cihaz_id}
            </span>
          </p>
          <p className="font-normal">
            Parça Adı:{' '}
            <span className="font-semibold text-red-500">
              {params.row.parca_adi}
            </span>
          </p>
          olan sensörü silmek istediğinize emin misiniz?
        </div>
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
              deleteSensor(params.id, email);
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

const deleteSensor = async (id, email) => {
  try {
    await axios
      .delete(`https://maps.deu.edu.tr/sensor/${id}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(email);
          toast.success(`Sensör ${id}  Silindi!`, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          /*
                        Sensör silme işlemi başarılı olursa sayfa yenilenir.
                        Bu sayede silinen cihazın tablodan kaybolması sağlanır.
          */
          setTimeout(() => {
            window.location.reload();
          }, 3300);
        } else {
          toast.error(`Sensör ${id} Silinemedi!`, {
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
};

const SensorFetch = ({ height }) => {
  const email = useEmail();
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(Boolean);
  const [loading, setLoading] = useState(true);

  const fetchSensorler = async (email) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/sensor/${email}`
      );
      setFetchError(response.data.success);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchSensorler(email);
    }
  }, [email]);
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
              experimentalFeatures={{ newEditingApi: true }}
            />
          )
        ) : (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <LinearProgress />
            <Skeleton
              className="mb-1"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
            <Skeleton
              className="mb-1"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
            <Skeleton
              className="mb-1"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
            <Skeleton
              className="mb-1"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
            <Skeleton
              className="mb-1"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SensorFetch;
