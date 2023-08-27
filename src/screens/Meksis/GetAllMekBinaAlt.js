import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  Select,
  MenuItem,
  InputBase,
  Box,
  Container,
} from '@mui/material';
import useFetch from 'hooks/useFetch';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Line } from 'recharts';
import useEmail from 'hooks/useEmail';

const Meksis = () => {
  const { email } = useEmail();
  const [alt, setAlt] = useState(0);
  const [bina, setBina] = useState(0);

  const {
    data: binalar,
    isLoading,
    error,
  } = useFetch(`https://maps.deu.edu.tr/meksis/get_all_binalar/${email}`);

  const {
    data: altFonksiyonlar,
    isLoading: isLoadingAlt,
    error: errorAlt,
  } = useFetch(
    `https://maps.deu.edu.tr/meksis/get_all_alt_fonksiyonlar/${email}`
  );

  const {
    data: mekanlar,
    isLoading: isLoadingMekan,
    error: errorMekan,
  } = useFetch(
    `https://maps.deu.edu.tr/meksis/get_all_mekanlar_by_bina_id_and_alt_fonksiyon/${bina}/${alt}/${email}`
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const createMenuItem = (item) => (
    <MenuItem key={item.ID} value={item.ID}>
      {item.adi}
    </MenuItem>
  );

  const options = altFonksiyonlar.map(createMenuItem);
  const options2 = binalar.map(createMenuItem);

  const handleSelect = (e, type) => {
    if (e.target.value === 0) {
      toast.error(`${type} Seçiniz!`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.success(`${type} Seçildi!`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      if (type === 'Alt Fonksiyon') {
        setAlt(e.target.value);
      } else {
        setBina(e.target.value);
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        width: '100%',
        height: '100dvh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '30px',
        }}
      >
        <Box>
          <FormControl id="bina">
            <p>Lütfen Bina Seçiniz...</p>
            <Select
              id="bina"
              value={bina}
              style={{
                width: '100%',
              }}
              defaultValue={0}
              onChange={(bina) => {
                handleSelect(bina, 'Bina');
              }}
            >
              <MenuItem style={{
                 zIndex: '1000',
              }} value={0}>
                Lütfen Bina Seçiniz!
              </MenuItem>
              {options}
            </Select>
          </FormControl>
        </Box>
        {bina === 0 ? (
          ''
        ) : !isLoading ? (
          <FormControl
            id="alt"
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: '5px',

              marginBottom: '10px',
              fontSize: '16px',
              color: '#000',
              '&:focus': {
                outline: 'none',
                border: '1px solid blue',
              },
            }}
          >
            <p>Lütfen Alt Fonksiyon Seçiniz...</p>

            <Select
              id="alt"
              value={alt}
              defaultValue={0}
              sx={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '5px',
                marginBottom: '10px',
                fontSize: '16px',
                color: '#000',
                '&:focus': {
                  outline: 'none',
                  border: '1px solid #3f51b5',
                },
              }}
              onChange={(alt) => {
                handleSelect(alt, 'Alt Fonksiyon');
              }}
            >
              <MenuItem value={0}>Lütfen Alt Fonksiyon Seçiniz!</MenuItem>
              {options2}
            </Select>
          </FormControl>
        ) : (
          <div>
            <p>Yükleniyor...</p>
          </div>
        )}
      </Box>
      {alt === 0 ? (
        ''
      ) : isLoadingAlt ? (
        <div>
          <p>Yükleniyor...</p>
        </div>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px',
            height: '100%',
          }}
        >
          {!isLoadingMekan ? (
            !errorMekan ? (
              <div>
                ({mekanlar.length} Mekan Bulundu)
                <Line data={mekanlar} x="ID" y="adi" />
              </div>
            ) : (
              <div>
                <p>Hata: {errorMekan.message}</p>
              </div>
            )
          ) : (
            <div>
              <p>Yükleniyor...</p>
            </div>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Meksis;
