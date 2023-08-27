import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Container,
  CircularProgress,
} from '@mui/material';
import useFetch from 'hooks/useFetch';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Line } from 'recharts';
import useEmail from 'hooks/useEmail';
import { DataGrid } from '@mui/x-data-grid';

/* 
"id": 13,
      "kategori_id": 11,
      "adi": "stringaa",
      "meksis_kod": "string",
      "bina_id": "string",
      "kampus_id": "string",
      "universite_id": 0,
      "veri_gonderme_sikligi": 111,
      "ip_adresi": null,
      "aktif": true,
      "eklenme_tarihi": "2023-03-02T21:00:00.000Z",
      "durum": true

*/
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'kategori_id', headerName: 'Kategori ID', width: 130 },
  { field: 'adi', headerName: 'Adı', width: 130 },
  { field: 'meksis_kod', headerName: 'Meksis Kodu', width: 130 },
  { field: 'bina_id', headerName: 'Bina ID', width: 130 },
  { field: 'kampus_id', headerName: 'Kampus ID', width: 130 },
  { field: 'universite_id', headerName: 'Üniversite ID', width: 130 },
  {
    field: 'veri_gonderme_sikligi',
    headerName: 'Veri Gönderme Sıklığı',
    width: 130,
  },
  { field: 'ip_adresi', headerName: 'IP Adresi', width: 130 },
  { field: 'aktif', headerName: 'Aktif', width: 130 },
  { field: 'eklenme_tarihi', headerName: 'Eklenme Tarihi', width: 130 },
  { field: 'durum', headerName: 'Durum', width: 130 },
];

const GetAllMekanlarByBina = () => {
  const email = useEmail();
  const [binaMeksisKodu, setBinaMeksisKodu] = useState(0);
  const [kampusler, setKampusler] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [binalar, setBinalar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [kampusId, setKampusId] = useState(0);
  const [error, setError] = useState(null);

  const fetchKampusler = async () => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/meksis/get_all_kampusler/${email}`
      );
      setKampusler(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchBinaByKampusId = async (kampusId) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/meksis/get_all_binalar_by_kampus_id/${kampusId}/${email}`
      );
      setBinalar(response.data.data);
      console.log('binalar', response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchCihazMeksisKodu = async (binaMeksisKodu) => {
    try {
      const response = await axios.get(
        // `https://maps.deu.edu.tr/cihazlar/meksis/${binaMeksisKodu}/${email}`
        `https://maps.deu.edu.tr/cihaz/meksis/string/${email}`
      );

      setChartData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const createMenuItem = (item) => (
    <MenuItem key={item.ID} value={item.ID}>
      {item.adi}
    </MenuItem>
  );
  const createMenuItem2 = (item) => (
    <MenuItem key={item.ID} value={item.meksis_kod}>
      {item.adi}
    </MenuItem>
  );

  const options = kampusler.map(createMenuItem);
  const options2 = binalar.map(createMenuItem2);

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
      if (type === 'Kampüs') {
        setKampusId(e.target.value);
        console.log('kampusId', e.target.value);
      } else if (type === 'Bina') {
        setBinaMeksisKodu(e.target.value);
        console.log('binaId', e.target.value);
      }
    }
  };

  useEffect(() => {
    if (email) fetchKampusler();
  }, [email]);

  useEffect(() => {
    if (kampusId !== 0) fetchBinaByKampusId(kampusId);
  }, [kampusId]);

  useEffect(() => {
    if (binaMeksisKodu !== 0) fetchCihazMeksisKodu(binaMeksisKodu);
  }, [binaMeksisKodu]);

  return (
    <Box
      maxWidth={chartData.length > 0 ? '100%' : '50%'}
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#f8f8f8',
        padding: '15px',
        borderRadius: '10px',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            <FormControl id="bina">
              <p>Lütfen Kampüs Seçiniz...</p>
              <Select
                id="kampus"
                value={kampusId}
                sx={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                }}
                defaultValue={0}
                onChange={(e) => handleSelect(e, 'Kampüs')}
              >
                <MenuItem
                  style={{
                    zIndex: '1000',
                  }}
                  value={0}
                >
                  Seçiniz
                </MenuItem>
                {options}
              </Select>
              {kampusId !== 0 && binalar.length > 0 && (
                <>
                  <p>Lütfen Bina Seçiniz...</p>
                  <Select
                    id="bina"
                    value={binaMeksisKodu}
                    style={{
                      width: '100%',
                    }}
                    defaultValue={0}
                    onChange={(e) => handleSelect(e, 'Bina')}
                  >
                    <MenuItem
                      style={{
                        zIndex: '1000',
                      }}
                      value={0}
                      defaultValue={0}
                    >
                      Seçiniz
                    </MenuItem>
                    {options2}
                  </Select>
                </>
              )}
            </FormControl>

            {kampusId && binaMeksisKodu !== 0 && (
              <Box
                sx={{
                  marginTop: '30px',
                  width: '100%',
                  height: '40vh',
                  backgroundColor: '#ffffff',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <DataGrid
                  sx={{
                    height: '100%',
                  }}
                  rows={chartData}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GetAllMekanlarByBina;
