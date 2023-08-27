import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import Button from 'components/utils/Button';
import Header from 'components/utils/Headers';
import {
  Select,
  TextField,
  Box,
  Container,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { SensorUpdateSchema } from 'components/utils/yupSchemas';
import { toast } from 'react-toastify';
import Popup from 'components/utils/Modal';
import { DataGrid } from '@mui/x-data-grid';
import useEmail from 'hooks/useEmail';

// Burada öncelikle cihaz seçtiriyoruz. Seçilen cihazın id'sini alıyoruz.
// Daha sonra bu id'yi kullanarak sensörleri getiriyoruz.
// Son olarak sensörleri de seçtiriyoruz. Seçilen sensörün id'sini alıyoruz.
// Bu id'yi kullanarak sensörü güncelliyoruz.

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'cihaz_id', type: 'number', headerName: 'Cihaz ID', width: 70 },
  { field: 'parca_adi', headerName: 'Parça Adı', width: 150 },
  {
    field: 'kategori_id',
    type: 'number',
    headerName: 'Kategori ID',
    width: 100,
  },
  {
    field: 'eklenme_tarihi',
    type: 'number',
    headerName: 'Eklenme Tarihi',
    width: 150,
  },
  { field: 'durum', type: 'boolean', headerName: 'Durum', width: 70 },
  {
    field: 'Güncelle',
    headerName: 'Güncelle',
    width: 120,
    renderCell: (params, email) => (
      <HandleUpdateSensorModal params={params} email={email} />
    ),
  },
];

const HandleUpdateSensorModal = ({ params }) => {
  const email = useEmail();
  const updateData = async (values, actions) => {
    try {
      const response = await axios.put(
        `https://maps.deu.edu.tr/sensor/${email}`,
        values
      );

      if (response.data.success) {
        toast.success('Sensör Güncellendi!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3300);
      } else {
        toast.error('Sensör Güncellenemedi!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateCachedData = useCallback(updateData, [email]);

  const [openPopup, setOpenPopup] = useState(false);

  const initialValues = useMemo(
    () => ({
      id: params.row.id || '',
      cihaz_id: params.row.cihaz_id || '',
      parca_adi: params.row.parca_adi || '',
      kategori_id: params.row.kategori_id || '',
      eklenme_tarihi: params.row.eklenme_tarihi || '',
      durum: params.row.durum || '',
    }),
    [params.row]
  );

  return (
    <>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Sensör Güncelle"
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={SensorUpdateSchema}
          onSubmit={updateCachedData}
        >
          {({ errors, touched }) => (
            <Form className=" w-full p-7 justify-center items-center text-end">
              <Field
                disabled
                as={TextField}
                name="id"
                type="number"
                label="ID"
                fullWidth
              />
              <Field
                as={TextField}
                name="cihaz_id"
                type="number"
                label="Parçanın Takılı Olduğu Cihazın ID numarası"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.cihaz_id && touched.cihaz_id}
                helperText={
                  errors.cihaz_id && touched.cihaz_id && errors.cihaz_id
                }
              />
              <Field
                as={TextField}
                name="kategori_id"
                type="number"
                label="Parçanın Ait Olduğu Kategorinin ID numarası"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.kategori_id && touched.kategori_id}
                helperText={errors.kategori_id && touched.kategori_id}
              />
              <Field
                as={TextField}
                name="parca_adi"
                type="string"
                label="Parçaya Verilmiş Isim"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.parca_adi && touched.parca_adi}
                helperText={errors.parca_adi && touched.parca_adi}
              />

              <Button
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'green',
                    boxShadow: ' 0 0 0 0.2rem rgba(0,255,0,.2)',
                  },
                }}
                label={'Güncelle'}
                variant={'filled'}
                type="submit"
                fullWidth
              />
            </Form>
          )}
        </Formik>
      </Popup>
      <Button
        label={'Güncelle'}
        onClick={() => setOpenPopup(true)}
        style={{
          backgroundColor: 'green',
          color: 'white',
        }}
        variant="contained"
      >
        Güncelle
      </Button>
    </>
  );
};

function SensorGuncelle() {
  const email = useEmail();
  const [data, setData] = useState([]);
  const [sensorById, setSensorById] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      fetchData(email);
    }
  }, [email]);

  async function fetchData(email) {
    console.log('FetchData: ', email);
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/cihaz/${email}`
      );
      setData(response.data.data);
      console.log(email);
    } catch (error) {
      console.error('FetchData: ', error);
    }
  }

  const handleSelectChange = useCallback(async (e) => {
    setLoading(true);
    if (e.target.value === 0) {
      toast.error('Cihaz Seçiniz!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log('Cihaz Seçiniz!LOG:', e.target.value);
      setLoading(false);
    } else {
      toast.success('Cihaz Seçildi!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log('Cihaz Seçildi!LOG:', e.target.value);
      getSensorById(e.target.value);
      setLoading(false);
    }
  });

  async function getSensorById(id, email) {
    setLoading(true);
    console.log('getSensorById:', id, email);
    try {
      await axios
        .get(`https://maps.deu.edu.tr/sensor/cihaz/${id}/${email}`)
        .then((res) => {
          console.log(id, email);
          setSensorById(res.data.data);
          if (res.data.data.length === 0) {
            toast.error('Bu Cihaza Ait Sensör Bulunmamaktadır!', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }

          setLoading(false);
        });
    } catch (error) {
      console.error('GetSensorById:', error);
    }
  }

  const options = useMemo(
    () =>
      data.map((item, index) => (
        <MenuItem key={index} value={item.id}>
          {item.adi}
        </MenuItem>
      )),
    [data]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        marginTop: '2rem',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Header
        title="Sensör Güncelle"
        variant="h2"
        color={'primary'}
        fontSize="2rem"
        margin="0 0 1rem 0 "
      />
      <form>
        <p>Lütfen Sensör Güncellemek için Cihaz Seçiniz...</p>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sensorById.id}
          defaultValue={0}
          sx={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '0 10px',
            marginBottom: '10px',
            fontSize: '16px',
            color: '#000',
            '&:focus': {
              outline: 'none',
              border: '1px solid #3f51b5',
            },
            '&:hover': {
              outline: 'none',
              border: '1px solid #3f51b5',
            },
          }}
          onChange={handleSelectChange}
        >
          <MenuItem value={0}>Seçiniz</MenuItem>
          {options}
        </Select>
        <p>
          {loading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <CircularProgress />
            </div>
          )}
        </p>
      </form>

      {sensorById?.length > 0 ? (
        <Container sx={{ width: '100%', height: '100%' }}>
          <DataGrid
            sx={{ width: '100%', height: '100%' }}
            rows={sensorById}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            experimentalFeatures={{ newEditingApi: true }}
            disableSelectionOnClick
          />
        </Container>
      ) : (
        <Typography
          variant="p"
          color="primary"
          sx={{ color: '#ccc', fontWeight: '400' }}
        >
          Sensör bulunan bir cihaz seçiniz!
        </Typography>
      )}
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Box>
  );
}
export default SensorGuncelle;
