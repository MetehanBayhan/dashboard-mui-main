import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { Button, TextField, Container, CircularProgress } from '@mui/material';
import Header from 'components/utils/Headers';
import { toast } from 'react-toastify';
import useEmail from 'hooks/useEmail';
import { CihazEkleSchema } from 'components/utils/yupSchemas';

function CihazEkle() {
  // Cihaz ekleme ekranı
  // Cihaz ekleme işlemleri bu ekran üzerinden yapılır.
  // Cihaz ekleme işlemleri için, aşağıda oluşturulmuş formdaki datalar seçilir.
  // Seçilen datalar, axios ile apiye gönderilir.
  // Gönderilen datalar, api tarafında işlenir ve cihaz ekleme işlemi gerçekleşir.
  // Cihaz ekleme işlemi gerçekleştikten sonra, kullanıcıya toast mesajı gösterilir.
  // Cihaz ekleme işlemi gerçekleşmezse, kullanıcıya toast mesajı gösterilir.
  // Cihaz ekleme işlemi gerçekleştiğinde, form resetlenir.

  const email = useEmail();
  const onSubmit = async (values, actions) => {
    try {
      await axios.post(`https://maps.deu.edu.tr/cihaz/${email}`, values).then(
        (response) => {
          if (response.data.success) {
            console.log('Cihaz EKLE?', email);
            toast.success('Cihaz Eklendi!', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            toast.error('Cihaz Eklenemedi!', {
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
      maxWidth="sm"
      sx={{
        display: 'flex',
        marginTop: '4rem',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {email ? (
        <>
          <Header
            title="Cihaz Ekle"
            variant="h2"
            color={'primary'}
            fontSize="2rem"
            margin="0 0 0 1rem"
          />
          <Formik
            initialValues={{
              adi: '',
              kategori_id: '',
              meksis_kod: '',
              bina_id: '',
              kampus_id: '',
              veri_gonderme_sikligi: '',
            }}
            validationSchema={CihazEkleSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col w-full">
                <Field
                  as={TextField}
                  name="adi"
                  label="Cihaz Adı"
                  type="string"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={errors.adi && touched.adi}
                  helperText={errors.adi && touched.adi ? errors.adi : null}
                />
                <Field
                  as={TextField}
                  type="number"
                  name="kategori_id"
                  label="Kategori ID"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={errors.kategori_id && touched.kategori_id}
                  helperText={
                    errors.kategori_id && touched.kategori_id
                      ? errors.kategori_id
                      : null
                  }
                />
                <Field
                  as={TextField}
                  name="meksis_kod"
                  type="string"
                  label="Meksis Kod"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={errors.meksis_kod && touched.meksis_kod}
                  helperText={
                    errors.meksis_kod && touched.meksis_kod
                      ? errors.meksis_kod
                      : null
                  }
                />
                <Field
                  as={TextField}
                  name="bina_id"
                  label="Bina ID"
                  type="string"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={errors.bina_id && touched.bina_id}
                  helperText={
                    errors.bina_id && touched.bina_id ? errors.bina_id : null
                  }
                />
                <Field
                  as={TextField}
                  name="kampus_id"
                  label="Kampus ID"
                  type="string"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={errors.kampus_id && touched.kampus_id}
                  helperText={
                    errors.kampus_id && touched.kampus_id
                      ? errors.kampus_id
                      : null
                  }
                />
                <Field
                  as={TextField}
                  name="veri_gonderme_sikligi"
                  type="number"
                  label="Veri Gönderme Sıklığı"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={
                    errors.veri_gonderme_sikligi &&
                    touched.veri_gonderme_sikligi
                  }
                  helperText={
                    errors.veri_gonderme_sikligi &&
                    touched.veri_gonderme_sikligi
                      ? errors.veri_gonderme_sikligi
                      : null
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  disabled={Object.keys(errors).length > 0}
                >
                  Gönder
                </Button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <Header
            title="Cihaz Ekle"
            variant="h2"
            color={'primary'}
            fontSize="2rem"
            margin="0 0 0 1rem"
          />
          <p>Yönlendiriliyorsunuz...</p>
          <CircularProgress />
        </>
      )}
    </Container>
  );
}

export default CihazEkle;
