import { Button, Container, Select, TextField } from '@mui/material';
import axios from 'axios';
import { Form, Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Header from 'components/utils/Headers';
import useEmail from 'hooks/useEmail';

const validationSchema = Yup.object().shape({
  id: Yup.number()
    .min(1, 'Çok Kısa!')
    .max(100, 'Çok Uzun!')
    .required('Zorunlu!'),
  adi: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(15, 'Çok Uzun!')
    .required('Zorunlu!'),
  durum: Yup.boolean().required('Zorunlu!'),
});

const SensorTuruGuncelle = () => {
  const email = useEmail();
  const [datas, setData] = useState([]);
  const [sensorTuru, setSensorTuru] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchData(email) {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/sensor_kategoriler/${email}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (email) fetchData(email);
  }, [email]);

  const handleSelectChange = (e) => {
    if (e.target.value === 0) {
      toast.error('Sensör Türü Seçiniz!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    } else {
      toast.success('Sensör Türü Seçildi!', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getSensorTuruById(e.target.value, email);
      setLoading(true);
    }
  };

  // let email = 1;

  async function getSensorTuruById(id, email) {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/sensor_kategoriler/${id}/${email}`
      );
      setSensorTuru(response.data.data);
      console.log(email);
    } catch (error) {
      console.error(error);
    }
  }

  const options = datas.map((item, index) => (
    <option key={index} value={item.id}>
      {item.adi}
    </option>
  ));

  async function updateSensorTuru(values, actions) {
    try {
      await axios
        .put(`https://maps.deu.edu.tr/sensor_kategoriler/${email}`, values)
        .then(
          (response) => {
            if (response.data.success) {
              console.log(email);
              toast.success('Sensör Türü Güncellendi!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
              setTimeout(() => {
                window.location.reload();
                // window.location.href = "/cihazlar";
              }, 3300);
            } else {
              toast.error('Sensör Türü Güncellenemedi!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          },
          (error) => {
            console.log('Error: ' + error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2rem',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* Select Option ile birlikte Sensör Türlerini Seçtireceğiz. */}
      <form>
        <Header
          title="Sensör Türü Güncelle"
          variant="h2"
          color={'primary'}
          fontSize="2rem"
          margin="0 0 1rem 0 "
        />
        <Select
          native
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
          <option value={0}>Seçiniz</option>
          {options}
        </Select>
      </form>
      {loading && (
        <Formik
          enableReinitialize
          initialValues={{
            id: sensorTuru.id || '',
            adi: sensorTuru.adi || '',
            durum: sensorTuru.durum || '',
          }}
          validationSchema={validationSchema}
          onSubmit={updateSensorTuru}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Header
                title="Aşağıya Güncellemek İstediğiniz Bilgileri Giriniz."
                variant="h4"
                color={'primary'}
                fontSize="1rem"
                margin="0 0 1rem 0 "
              />
              <Field
                as={TextField}
                sx={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                id="adi"
                type="string"
                name="adi"
                label="Adı"
                variant="outlined"
                error={touched.adi && Boolean(errors.adi)}
                helperText="Sensör Türü Adını Giriniz..."
              />
              <Button
                sx={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                variant="contained"
                type="submit"
              >
                Güncelle
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default SensorTuruGuncelle;
