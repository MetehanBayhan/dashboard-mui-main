import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'components/utils/Button';
import { Box, Skeleton, ButtonGroup, CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Popup from 'components/utils/Modal';
import useEmail from 'hooks/useEmail';

const columns = [
  { field: 'id', headerName: '#' },
  { field: 'adi', headerName: 'Adı', width: 120, padding: '1rem' },
  {
    field: 'eklenme_tarihi',
    headerName: 'Eklenme Tarihi',
    width: 120,
    renderCell: (params) => {
      return params.value.substring(0, 10);
    },
  },
  { field: 'durum', headerName: 'Durum', type: 'boolean', width: 70 },
  {
    field: 'Sil',
    headerName: 'Limit Kategori Sil',
    type: 'boolean',
    width: 160,
    renderCell: (params, email) => {
      return <HandleModal params={params} email={email} />;
    },
  },
];

function HandleModal({ params }) {
  /*
    Bu kod, bir "Limit Kategori" (limit kategorisi) veritabanından kategorileri çekmek ve silmek için bir React bileşenidir. 
    DataGrid bileşeni kullanılarak bir tablo oluşturulur ve axios kütüphanesi kullanılarak sunucu ile iletişim kurulur. 
    useEffect kancası kullanılarak bileşen yüklendiğinde ve kullanıcının e-posta adresi değiştiğinde verileri yeniden yükler. 
    Popup bileşeni kullanılarak bir silme onayı modalı oluşturulur. 
    Silme işlemi başarılı olursa, toast kütüphanesi kullanılarak bir başarı mesajı görüntülenir ve sayfa yenilenir.
*/
  const email = useEmail();
  const [openPopup, setOpenPopup] = useState(false);

  async function deleteLimitKategori(id) {
    try {
      await axios
        .delete(`https://maps.deu.edu.tr/veri_limit_kategori/${id}/${email}`)
        .then((response) => {
          if (response.status === 200) {
            console.log('oldu', email);
            toast.success('Limit Kategorisi Silindi!', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            /*
                          Cihaz silme işlemi başarılı olursa sayfa yenilenir.
                          Bu sayede silinen cihazın tablodan kaybolması sağlanır.
            */
            setTimeout(() => {
              window.location.reload();
            }, 3300);
          } else {
            toast.error('Limit Kategorisi Silinemedi!', {
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

  return (
    <>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Cihaz Sil"
      >
        <h3 className="text-center mb-4">
          <span className="font-bold text-red-500 mr-1 ">{params.row.adi}</span>
          cihazını silmek istediğinize emin misiniz?
        </h3>

        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="Emin Misiniz?"
          style={{ width: '100%' }}
        >
          <Button
            upperCase={false}
            label={'Evet'}
            style={{
              width: '100%',
              backgroundColor: 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: '#6b2',
                color: 'white',
              },
            }}
            onClick={() => {
              deleteLimitKategori(params.id);
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

const LimitKategoriFetch = ({ height }) => {
  const email = useEmail();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) fetchLimitKategoriler(email);
  }, [email]);

  const fetchLimitKategoriler = async (email) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/veri_limit_kategori/${email}`
      );

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
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        ) : (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};

export default LimitKategoriFetch;
