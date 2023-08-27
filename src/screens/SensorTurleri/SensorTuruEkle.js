import React from 'react';
import axios from 'axios';
import Header from 'components/utils/Headers';
import { Button, TextField, Box, Container } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useEmail from 'hooks/useEmail';

const SensorTuruEkle = () => {
  const email = useEmail();
  const onSubmit = async (values, actions) => {
    try {
      await axios
        .post(`https://maps.deu.edu.tr/sensor_kategoriler/${email}`, values)
        .then(
          (response) => {
            console.log(email);
            if (response.data.success) {
              toast.success('Sensör Türü Eklendi!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            } else {
              toast.error('Sensör Türü Eklenemedi!', {
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
      <Formik
        initialValues={{ id: '', adi: '', durum: '' }}
        validationSchema={Yup.object({
          adi: Yup.string().required('Parça Adı Bdasoş Bırakılamaz!'),
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
              title="Sensör Türü Ekle"
              variant="h2"
              color={'primary'}
              fontSize="2rem"
            />
            <Field
              as={TextField}
              name="adi"
              label="Sensör Türü Adı"
              variant="outlined"
              required
            />
            <Button type="submit" variant="contained">
              Ekle
            </Button>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
};

export default SensorTuruEkle;
