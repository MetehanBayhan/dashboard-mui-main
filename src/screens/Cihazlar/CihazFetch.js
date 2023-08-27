

import { Box, Skeleton, ButtonGroup, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Popup from 'components/utils/Modal';
import Button from 'components/utils/Button';
import useEmail from 'hooks/useEmail';

const columns = [
  { field: 'id', headerName: '#', width: 70 },
  {
    field: 'adi',
    headerName: 'Adı',
    width: 150,
  },
  {
    field: 'eklenme_tarihi',
    headerName: 'Eklenme Tarihi',
    type: 'dateTime',
    width: 130,
    renderCell: (params) => {
      return params.value.substring(0, 10);
    },
  },
  {
    field: 'meksis_kod',
    headerName: 'Meksis Kod',
    type: 'number',
    width: 110,
  },
  {
    field: 'bina_id',
    headerName: 'Bina ID',
    type: 'number',
    width: 80,
  },
  {
    field: 'kampus_id',
    headerName: 'Kampus ID',
    type: 'number',
    width: 100,
  },
  {
    field: 'universite_id',
    headerName: 'Üniversite ID',
    type: 'number',
    width: 100,
  },
  {
    field: 'veri_gonderme_sikligi',
    headerName: 'Veri Gönderme Sıklığı',
    type: 'number',
    width: 150,
  },
  {
    field: 'ip_adresi',
    headerName: 'IP Adresi',
    type: 'number',
    width: 80,
  },
  {
    field: 'aktif',
    headerName: 'Aktif',
    type: 'boolean',
    width: 110,
  },
  {
    field: 'Sil',
    headerName: 'Sil',
    type: 'boolean',
    width: 110,
    renderCell: (params) => {
      return <HandleModal params={params} />;
    },
  },
];

function HandleModal({ params }) {
  const email = useEmail();
  const [openPopup, setOpenPopup] = useState(false);
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
              deleteCihaz(params.id, email);
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

/* 
    Cihazı Silmek için oluşturulmuş bir async fonksiyon.
    Cihaz ID'si ile birlikte axios.delete() fonksiyonu ile
    cihaz silme işlemi gerçekleştirilir.
    Eğer işlem başarılı olursa toastify ile bir uyarı mesajı gösterilir.
    Eğer işlem başarısız olursa toastify ile bir hata mesajı gösterilir.

    Not: Cihaz silme işlemi için gerekli olan ID değeri,
    Cihazlar tablosundaki Sil butonuna tıklandığında
    fonksiyonun parametresi olarak gönderilir.

http://maps.deu.edu.tr:8080/api-docs/#/
*/
async function deleteCihaz(id, email) {
  try {
    await axios
      .delete(`https://maps.deu.edu.tr/cihaz/${id}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('cihazsil', email);
          toast.success('Cihaz Silindi!', {
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
          toast.error('Cihaz Silinemedi!', {
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

const CihazFetch = ({ height }) => {
  /*
        Cihazlar tablosu için oluşturulmuş 2 adet state değişkeni.
        data: Cihazlar tablosu için gerekli olan verileri tutar.
        loading: Cihazlar tablosu için gerekli olan verilerin çekilip çekilmediğini kontrol eder.
    */
  const email = useEmail();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
        Cihazlar tablosu için oluşturulmuş bir async fonksiyon.
        Cihazlar tablosu için gerekli olan veriler axios.get() fonksiyonu ile
        çekilir. Eğer işlem başarılı olursa veriler data değişkenine atanır.
        Eğer işlem başarısız olursa hata mesajı konsola yazdırılır.

        
        Bu işlem için useEffect() hook'u kullanılmıştır.
        Bu hook sayesinde sayfa ilk yüklendiğinde ve herhangi bir değişiklik olduğunda
        bu fonksiyon çalıştırılır.

        Loading değişkeni true olduğu sürece DataGrid'in içeriği yüklenmez.
        Loading değişkeni false olduğu zaman ise DataGrid'in içeriği yüklenir.

https://193.140.151.200:443/cihaz/1
     */
  useEffect(() => {
    if (email) getCihaz(email);
  }, [email]);

  const getCihaz = async (email) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/cihaz/${email}`
      );
      setData(response.data);
      console.log('cihaz', email);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  /*
    DataGrid'in içeriği yüklenirken bir loading iconu gösterilir.
    Bu loading iconu için GridLoadIcon componenti kullanılmıştır.
    DataGrid içeriği MUI DataGrid componenti kullanılarak oluşturulmuştur.
    DataGrid içeriği için gerekli olan veriler data değişkeninden alınır.
    DataGrid içeriği için gerekli olan sütunlar columns değişkeninden alınır.
    DataGrid içeriği için gerekli olan sayfa boyutu 10 olarak ayarlanmıştır.
    DataGrid içeriği için gerekli olan satır boyutu seçenekleri 10 olarak ayarlanmıştır.
    DataGrid içeriği için gerekli olan seçim özelliği kapatılmıştır.
    
 */
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
              pageSize={10}
              rowsPerPageOptions={[10]}
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
export default CihazFetch;
