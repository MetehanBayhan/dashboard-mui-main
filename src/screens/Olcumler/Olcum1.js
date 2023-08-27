import React, { useState, useEffect, useCallback } from 'react';
// import data from "./dummydata"
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Container,
  CircularProgress,
  Grid,
  InputLabel,
} from '@mui/material';
import useFetch from 'hooks/useFetch';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import useEmail from 'hooks/useEmail';
import { current } from '@reduxjs/toolkit';

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

const Olcum1 = () => {
  // burada yapılan şey şu: useEmail ile kullanıcımızın emailini alıyoruz. Ardından bu emaili kullanarak
  // kullanıcının kampüslerini çekiyoruz. Ardından bu kampüslerden birini seçiyoruz. Ardından bu kampüsün
  // binalarını çekiyoruz. Ardından bu binalardan birini seçiyoruz. Ardından bu binanın ölçümlerini çekiyoruz.
  // Ardından bu ölçümleri bir tabloda gösteriyoruz. Ardından bu ölçümleri grafikte gösteriyoruz.

  const email = useEmail();
  const [binaId, setBinaId] = useState(0);
  const [currentCihaz, setCurrentCihaz] = ([])
  const [cihazID, setCihazID] = useState(0);
  const [kampusler, setKampusler] = useState([]);
  // const [chartData, setChartData] = useState([]);
  const [binalar, setBinalar] = useState([]);
  const [cihazlar, setCihazlar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [kampusId, setKampusId] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState([])

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://maps.deu.edu.tr/akim_olcum/cihaz/${cihazID}/${email}`
        );
        const result = await response.json();
        // Sadece sayac1 değerlerini alarak geçerli tarih formatına dönüştürme
        // const formattedData = result.data.map((item) => ({
        //   eklenme_tarihi: item.eklenme_tarihi.split(' ')[0],
        //   sicaklik: item.sicaklik,
        //   nem: item.nem,
        //   duman: item.duman,
        //   sayac1: item.sayac1,
        //   sayac2: item.sayac2,
        //   sayac3: item.sayac3,
        // }));
        const startIndex = Math.max(result.data.length - 4520, 0);
        setData(result.data.slice(startIndex));
      } catch (error) {
        console.log(error);
      }
    };
    
    if(cihazID !== 0){
      console.log("data gel'yor");
      fetchData();
    }
  }, [cihazID]);

  console.log(cihazID);
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

  
  const fetchCihazlar = async (binaId, kampusId) => {
    let current = ""
    for (const bina of binalar){
      if (bina.ID == binaId){
        current = bina.meksis_kod
      }
    }

    if (current !== ""){
      try {
        const response = await axios.get(
          `https://maps.deu.edu.tr/cihaz/get_all_by_kampus_bina/${kampusId}/${current}/metehnb%40gmail.com`
        );
        setCihazlar(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  };

  const fetchBinaByKampusId = async (kampusId) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/meksis/get_all_binalar_by_kampus_id/${kampusId}/${email}`
      );
      setBinalar(response.data.data);
      // console.log('binalar', response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  // const fetchCihazMeksisKodu = async () => {
  //   try {
  //     const response = await axios.get(
  //       // `https://maps.deu.edu.tr/cihazlar/meksis/${binaId}/${email}`
  //       // `https://maps.deu.edu.tr/akim_olcum/get_all_olcumler_by_kamus_and_bina_id/${kampusId}/${binaId}/${email}`
  //       `https://maps.deu.edu.tr/akim_olcum/get_all_olcumler_by_kamus_and_bina_id/string/string/${email}`
  //     );

  //     setChartData(response.data.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error);
  //     setIsLoading(false);
  //   }
  // };

  const createMenuItem = (item) => (
    <MenuItem key={item.ID} value={item.ID}>
      {item.adi}
    </MenuItem>
  );
  const createMenuItem2 = (item) => (
    <MenuItem key={item.ID} value={item.ID}>
      {item.adi}
    </MenuItem>
  );
  const createMenuItem3 = (item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.meksis_kod}
    </MenuItem>
  );

  const options = kampusler.map(createMenuItem);
  const options2 = binalar.map(createMenuItem2);
  const options3 = cihazlar.map(createMenuItem3);

  const handleSelect = (e, type) => {
    // if (e.target.value === 1) {
    //   toast.error(`${type} Seçiniz!`, {
    //     position: 'bottom-right',
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //   });
    // } else {
    //   toast.success(`${type} Seçildi!`, {
    //     position: 'bottom-right',
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //   });
    // }
    if (type === 'Kampüs') {
      setKampusId(e.target.value);
      // console.log('kampusId', e.target.value);
    } else if (type === 'Bina') {
      setBinaId(e.target.value);
      // console.log('binaId', e.target.value);
    } else if (type === 'Cihaz') {
      setCihazID(e.target.value)
      // setCurrentCihaz(cihazlar[e.target.value]);
      // console.log('cihaz', e.target.value);
    } 
  };

  useEffect(() => {
    if (email) fetchKampusler();
  }, [email]);

  useEffect(() => {
    setBinaId(0)
    if (kampusId !== 0) fetchBinaByKampusId(kampusId);
  }, [kampusId]);

  useEffect(() => {
    setCihazID(0)
    if (binaId !== 0) {
      // fetchCihazMeksisKodu(binaId);
      fetchCihazlar(binaId, kampusId)
    }
  }, [binaId]);
  // useEffect(() => {
  // //   if (cihazID) {
  // //     // fetchCihazMeksisKodu(binaId);
  // //     setCurrentCihaz([cihazlar[cihazID]])
  // //   }
  // // }, [cihazID]);

  return (
    <Container>
      <Box
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          marginTop: '10px',
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
              // flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                width: binalar?.length > 0 ? '100%' : '50%',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ display: 'flex', gap: '2px' }}>
                <div style={{ flex: '1' }}>
                  <FormControl fullWidth>
                    <InputLabel id="kampus-label">Kampüs Seçiniz</InputLabel>
                    <Select
                      label="Kampüs Seçiniz"
                      labelId="kampus-label"
                      id="kampus"
                      value={kampusId}
                      onChange={(e) => handleSelect(e, 'Kampüs')}
                    >
                      <MenuItem value={0}>Seçiniz</MenuItem>
                      {options}
                    </Select>
                  </FormControl>
                </div>
                {kampusId !== 0 && binalar.length > 0 && (
                  <div style={{ flex: '1' }}>
                    <FormControl fullWidth>
                      <InputLabel id="bina-label">Bina Seçiniz</InputLabel>
                      <Select
                        label="Bina Seçiniz"
                        labelId="bina-label"
                        id="bina"
                        value={binaId}
                        onChange={(e) => handleSelect(e, 'Bina')}
                      >
                        <MenuItem value={0}>Seçiniz</MenuItem>
                        {options2}
                      </Select>
                    </FormControl>
                  </div>
                )}
                {kampusId !== 0 && binaId !== 0 && (
                  <div style={{ flex: '1' }}>
                    <FormControl fullWidth>
                      <InputLabel id="Cihaz-label">Cihaz Seçiniz</InputLabel>
                      <Select
                        label="Cihaz Seçiniz"
                        labelId="cihaz-label"
                        id="cihaz"
                        value={cihazID}
                        onChange={(e) => handleSelect(e, 'Cihaz')}
                      >
                        <MenuItem value={0}>Seçiniz</MenuItem>
                        {options3}
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>

              {cihazID !== 0 && data.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '30px',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#efefef',
                      paddingTop: 7,
                      paddingBottom: 7,
                      marginBottom: '10px',
                    }}
                  >
                    <AreaChart
                      width={1000}
                      height={500}
                      data={data.length > 0 && data}
                    >
                      <XAxis dataKey="eklenme_tarihi" interval={180} angle={-25} fontSize={12} />
                      <YAxis domain={[0, 55]}/>
                      <CartesianGrid strokeDasharray="4 4" />
                      <Tooltip />
                      <Legend />
                      <Area
                        width={800}
                        height={500}
                        type="monotone"
                        dataKey="sicaklik"
                        name="Sıcaklık"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#efefef',
                      padding: 5,
                      marginBottom: '10px',
                    }}
                  >
                    <AreaChart width={1000} height={500} data={data}>
                      
                      <XAxis dataKey="eklenme_tarihi" interval={100} angle={-25} fontSize={12} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="4 4" />
                      <Tooltip />
                      <Legend />
                      <Area
                        width={1000}
                        height={500}
                        type="monotone"
                        dataKey="duman"
                        name="Duman"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#efefef',
                      padding: 5,
                      marginBottom: '10px',
                      borderRadius: '10px',
                    }}
                  >
                    <AreaChart width={1000} height={500} data={data}>
                      <XAxis dataKey="eklenme_tarihi" interval={180} angle={-45} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="4 4" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="nem"
                        name="nem"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                    </AreaChart>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#efefef',
                      padding: 5,
                      marginBottom: '10px',
                    }}
                  >
                    <AreaChart
                      width={1000}
                      height={500}
                      data={data.sayac1}
                    >
                      <XAxis dataKey="tarih" interval={180} angle={-45} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="4 4" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Sayaç 1"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                    </AreaChart>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#efefef',
                      padding: 5,
                      marginBottom: '10px',
                    }}
                  >
                    <AreaChart
                      width={1000}
                      height={500}
                      data={data.sayac2}
                    >
                      <XAxis dataKey="tarih" interval={180} angle={-45} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="4 4" />
                      <Tooltip />
                      <Legend />
                      <Area
                        width="100%"
                        type="monotone"
                        dataKey="Sayaç 2"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                    </AreaChart>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#eee',
                      padding: 5,
                      marginBottom: '10px',
                    }}
                  >
                    <AreaChart
                      width={1000}
                      height={500}
                      data={data.sayac3}
                    >
                      <XAxis dataKey="tarih" interval={180} angle={-45} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="4 4" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Sayaç 3"
                        pathLength={0.5}
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                    </AreaChart>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Olcum1;
