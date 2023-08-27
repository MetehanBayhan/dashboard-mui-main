import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from 'components/utils/Button';
import Header from 'components/utils/Headers';
import { Select, TextField, Box, MenuItem, FormControl } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { CihazUpdateSchema } from 'components/utils/yupSchemas';
import useEmail from 'hooks/useEmail';

function MyForm() {
  const email = useEmail();
  const [datas, setData] = useState([]);
  const [cihaz, setCihaz] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchData(email) {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/cihaz/${email}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (email && cihaz.id) {
      cachedGetCihazById(cihaz.id, email);
    }
  }, [email, cihaz.id]);

  useEffect(() => {
    if (email) fetchData(email);
  }, [email]);

  const handleSelectChange = (e) => {
    if (e.target.value === 0) {
      toast.error('Cihaz Seçiniz!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.success('Cihaz Seçildi!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      cachedGetCihazById(e.target.value, email);
    }
  };
  const cachedGetCihazById = useCallback(async function getCihazById(
    id,
    email
  ) {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/cihaz/id/${id}/${email}`
      );
      setCihaz(response.data.data);
    } catch (error) {
      console.error('ERROR:', error);
    } finally {
      setLoading(false);
    }
  },
  []);

  const options = datas.map((item, index) => (
    <MenuItem key={index} value={item.id}>
      {item.adi}
    </MenuItem>
  ));

  async function updateData(values, actions) {
    try {
      await axios.put(`https:/maps.deu.edu.tr/cihaz/${email}`, values).then(
        (response) => {
          if (response.data.success) {
            toast.success('Cihaz Güncellendi!', {
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
            toast.error('Cihaz Güncellenemedi!', {
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
        title="Cihaz Güncelle"
        variant="h2"
        color={'primary'}
        fontSize="2rem"
        margin="0 0 1rem 0 "
      />
      <form>
        <p>Lütfen Cihaz Seçiniz...</p>
        <Select
          value={cihaz.id || 0}
          label="Cihaz Seçiniz"
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
      </form>

      {!loading && (
        <Formik
          enableReinitialize
          initialValues={{
            id: cihaz?.id || '',
            adi: cihaz.adi || '',
            kategori_id: cihaz.kategori_id || '',
            meksis_kod: cihaz.meksis_kod || '',
            bina_id: cihaz.bina_id || '',
            kampus_id: cihaz.kampus_id || '',
            veri_gonderme_sikligi: cihaz.veri_gonderme_sikligi || '',
            universite_id: cihaz.universite_id || '',
            ip_adresi: cihaz.ip_adresi || '',
            aktif: cihaz.aktif || true,
            eklenme_tarihi: cihaz.eklenme_tarihi || '',
            durum: cihaz.durum || true,
          }}
          validationSchema={CihazUpdateSchema}
          onSubmit={(values, actions) => updateData(values, actions, email)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col md:w-1/3 w-full p-7">
              <Field
                as={TextField}
                name="id"
                type="number"
                label="ID"
                variant="outlined"
                disabled
                margin="normal"
                fullWidth
                error={errors.id && touched.id}
                helperText={errors.id && touched.id && errors.id}
              />
              <Field
                as={TextField}
                name="adi"
                type="string"
                label="Cihaz Adı"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.adi && touched.adi}
                helperText={errors.adi && touched.adi && errors.adi}
              />
              <Field
                as={TextField}
                name="kategori_id"
                type="number"
                label="Kategori ID"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.kategori_id && touched.kategori_id}
                helperText={errors.kategori_id && touched.kategori_id}
              />
              <Field
                as={TextField}
                name="meksis_kod"
                type="string"
                label="Meksis Kodu"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.meksis_kod && touched.meksis_kod}
                helperText={errors.meksis_kod && touched.meksis_kod}
              />
              <Field
                as={TextField}
                name="kampus_id"
                type="string"
                label="Kampus ID"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.kampus_id && touched.kampus_id}
                helperText={errors.kampus_id && touched.kampus_id}
              />
              <Field
                as={TextField}
                name="bina_id"
                type="string"
                label="Bina ID"
                variant="outlined"
                margin="normal"
                fullWidth
                error={errors.bina_id && touched.bina_id}
                helperText={errors.bina_id && touched.bina_id}
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
                  errors.veri_gonderme_sikligi && touched.veri_gonderme_sikligi
                }
                helperText={
                  errors.veri_gonderme_sikligi && touched.veri_gonderme_sikligi
                }
              />
              <Button
                style={{
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
      )}
    </Box>
  );
}

export default MyForm;
