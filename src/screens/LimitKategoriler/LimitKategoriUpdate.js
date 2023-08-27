import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'components/utils/Button';
import Header from 'components/utils/Headers';
import { Select, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { LimitKategorilerUpdateSchema } from 'components/utils/yupSchemas';

function MyForm() {
  const [datas, setData] = useState([]);
  const [cihaz, setCihaz] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      const response = await axios.get(
        'https://maps.deu.edu.tr/limit_kategori/1'
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    if (e.target.value === 0) {
      toast.error('Limit Kategori Seçiniz!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    } else {
      toast.success('Limit Kategori Seçildi!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getLimitKategoriById(e.target.value);
      setLoading(true);
    }
  };

  async function getLimitKategoriById(id) {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/cihaz/id/${id}/1`
      );
      setCihaz(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const options = datas.map((item, index) => (
    <option key={index} value={item.id}>
      {item.adi}
    </option>
  ));

  async function updateData(values, actions) {
    console.log(values);
    try {
      await axios.put(`https://maps.deu.edu.tr/limit_kategori/1`, values).then(
        (response) => {
          if (response.data.success) {
            toast.success('Limit Kategori Güncellendi!', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            setTimeout(() => {
              window.location.reload();
              window.sessionStorage.setItem('cihazId', values.id);
              // window.location.href = "/cihazlar";
            }, 3300);
          } else {
            toast.error('Limit Kategori Güncellenemedi!', {
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
            id: cihaz.id || '',
            adi: cihaz.adi || '',
            kategori_id: cihaz.kategori_id || '',
            meksis_kod: cihaz.meksis_kod || '',
            bina_id: cihaz.bina_id || '',
            kampus_id: cihaz.kampus_id || '',
            veri_gonderme_sikligi: cihaz.veri_gonderme_sikligi || '',
            universite_id: cihaz.universite_id || '',
            ip_adresi: cihaz.ip_adresi || '',
            aktif: cihaz.aktif || '',
            eklenme_tarihi: cihaz.eklenme_tarihi || '',
            durum: cihaz.durum || '',
          }}
          validationSchema={LimitKategorilerUpdateSchema}
          onSubmit={updateData}
        >
          <Form className="flex flex-col md:w-1/3 w-full p-7">
            <Field
              as={TextField}
              name="adi"
              type="string"
              label="Cihaz Adı"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Field
              as={TextField}
              name="kategori_id"
              type="number"
              label="Kategori ID"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Field
              as={TextField}
              name="meksis_kod"
              type="string"
              label="Meksis Kodu"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Field
              as={TextField}
              name="kampus_id"
              type="string"
              label="Kampus ID"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Field
              as={TextField}
              name="bina_id"
              type="string"
              label="Bina ID"
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <Field
              as={TextField}
              name="veri_gonderme_sikligi"
              type="number"
              label="Veri Gönderme Sıklığı"
              variant="outlined"
              margin="normal"
              fullWidth
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
            />
          </Form>
        </Formik>
      )}
    </Box>
  );
}

export default MyForm;
