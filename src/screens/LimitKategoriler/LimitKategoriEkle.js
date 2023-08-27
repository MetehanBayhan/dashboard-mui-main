import React from 'react';
import axios from 'axios';
import Header from 'components/utils/Headers';
import { Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useEmail from 'hooks/useEmail';

const LimitKategoriEkle = () => {
  /*
    Bu kod, bir "Limit Kategori" (limit kategorisi) veritabanına yeni bir kategori eklemek için bir form tanımlayan JavaScript'te yazılmış bir React bileşenidir. 
    Formik kütüphanesi kullanılarak oluşturulan form, kategori adı için tek bir giriş alanı içerir. 
    Form, sunucu uç noktasına kategori adı ve kullanıcının e-posta adresi ile bir POST isteği göndererek gönderilir. 
    İstek başarılı olursa, toast kütüphanesi kullanılarak bir başarı mesajı görüntülenir. 
    İstek başarısız olursa, bir hata mesajı görüntülenir. 
    Form gönderildikten sonra, resetForm işlevi kullanılarak bir saniyelik gecikmeyle sıfırlanır.
*/

  const email = useEmail();
  const onSubmit = async (values, actions) => {
    try {
      await axios
        .post(`https://maps.deu.edu.tr/veri_limit_kategori/${email}`, values)
        .then(
          (response) => {
            if (response.data.success) {
              console.log(email);
              toast.success('Limit Kategori Eklendi!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            } else {
              toast.error('Limit Kategori Eklenemedi!', {
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
    <Box
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
          adi: Yup.string().required('Boş Bırakılamaz!'),
        })}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
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
                title="Limit Kategori Ekle"
                variant="h2"
                color={'primary'}
                fontSize="2rem"
              />
              <Field
                as={TextField}
                name="adi"
                label="Limit Kategori Adı"
                variant="outlined"
                required
                error={errors.adi && touched.adi}
                helperText={errors.adi && touched.adi && errors.adi}
              />
              <Button type="submit" variant="contained">
                Ekle
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LimitKategoriEkle;
