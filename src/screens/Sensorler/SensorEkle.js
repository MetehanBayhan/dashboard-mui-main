import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'components/utils/Headers';
import {
  Select,
  Button,
  TextField,
  Box,
  Container,
  CircularProgress,
  Typography,
  LinearProgress,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useEmail from 'hooks/useEmail';

const SensorEkle = () => {
  const email = useEmail();
  const [datas, setDatas] = useState([]);
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    if (email) {
      fetchData(email);
      fetchKategori(email);
    }
  }, [email]);

  const fetchData = async (email) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/cihaz/${email}`
      );
      setDatas(response.data.data);
      console.log('fetchdata', email);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchKategori = async (email) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/sensor_kategoriler/${email}`
      );
      setKategori(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const options = datas.map((item, index) => (
    <option key={index} value={item.id}>
      {item.adi}
    </option>
  ));
  const optionsKategori = kategori.map((item, index) => (
    <option key={index} value={item.id}>
      {item.adi}
    </option>
  ));

  const onSubmit = async (values, actions) => {
    values.kategori_id = parseInt(values.kategori_id);
    values.cihaz_id = parseInt(values.cihaz_id);

    try {
      await axios.post(`https://maps.deu.edu.tr/sensor/${email}`, values).then(
        (response) => {
          if (response.data.success) {
            toast.success('Sensör Eklendi!', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            console.log(response);
            console.log('emailSUBMIT', email);
          } else {
            toast.error('Sensör Eklenemedi!', {
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
      console.error('Error: ' + error);
    }

    // Wait for 1 second before resetting the form
    await new Promise((r) => setTimeout(r, 1000));
    actions.resetForm();
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        height: '100vh',
        width: '100%',
      }}
    >
      {email ? (
        <Formik
          initialValues={{ parca_adi: '', kategori_id: '', cihaz_id: '' }}
          validationSchema={Yup.object({
            parca_adi: Yup.string().required('Parça Adı Boş Bırakılamaz!'),
            cihaz_id: Yup.number().required('Cihaz Seçiniz!'),
            kategori_id: Yup.number().required('Kategori Seçiniz!'),
          })}
          onSubmit={onSubmit}
        >
          <Form>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Header
                title="Sensör Ekle"
                variant="h2"
                color={'primary'}
                fontSize="2rem"
              />
              <Field
                native
                as={Select}
                name="cihaz_id"
                type="number"
                label="Cihaz ID"
                variant="outlined"
                required
              >
                <option value={0}>Cihaz Seçiniz</option>
                {options}
              </Field>
              <Field
                native
                type="number"
                as={Select}
                name="kategori_id"
                label="Kategori ID"
                variant="outlined"
                required
              >
                <option value={0}>Kategori Seçiniz</option>
                {optionsKategori}
              </Field>
              <Field
                as={TextField}
                name="parca_adi"
                label="Parça Adı"
                variant="outlined"
                required
              />
              <Button type="submit" variant="contained">
                Ekle
              </Button>
            </Box>
          </Form>
        </Formik>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Typography>Kullanıcı bilgileri alınıyor...</Typography>
          <CircularProgress
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100vh',
              alignItems: 'center',
              color: '#3498db',
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default SensorEkle;
