import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton } from '@mui/material';
import axios from 'axios';
import useEmail from 'hooks/useEmail';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const columns = [
  { field: 'cihaz_id', headerName: 'Cihaz ID', width: 100, padding: '1rem' },
  { field: 'isik_siddeti', headerName: 'Işık Şiddeti', width: 100 },
  { field: 'sicaklik', headerName: 'Sıcaklık' },
  { field: 'karbondioksit_miktari', headerName: 'CO2 Miktarı', width: 120 },
  { field: 'nem', headerName: 'Nem', width: 100 },
  {
    field: 'eklenme_tarihi',
    headerName: 'Eklenme Tarihi',
    width: 120,
    renderCell: (params) => {
      return params.value.substring(0, 10);
    },
  },
  { field: 'gurultu', headerName: 'Gürültü', width: 150 },
];
const OlcumFetch = ({ height }) => {
  // olcum fetch componenti, olcumlerin çekildiği componenttir.
  // height props'u ile yüksekliği ayarlanabilir.
  // yine her component gibi useEmail hook'u ile email'i çekiyoruz.
  // Çünkü yapılan bütün CRUD işlemleri email'e göre yapılıyor.
  // yukarıdaki columns ise tablonun başlıklarını belirliyor. MUI özelliğidir.

  const email = useEmail();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect ile email değiştiğinde, cachedFetchOlcumler çalışıyor.
  // cachedFetchOlcumler, fetchOlcumler'i useCallback ile cache'liyor.
  // fetchOlcumler, axios ile verileri çekiyor.
  // setData ile verileri data'ya atıyoruz.
  // setLoading ile loading'i false yapıyoruz.

  useEffect(() => {
    if (email) {
      cachedFetchOlcumler(email);
    }
  }, [email]);

  const fetchOlcumler = async (email) => {
    try {
      const response = await axios.get(
        `https://maps.deu.edu.tr/olcum/${email}`
      );
      const data = response.data.data;
      const formattedData = data.map(item => {
      return {
        ...item,
        eklenme_tarihi: new Date(item.eklenme_tarihi).toLocaleDateString(),
        eklenme_saati: new Date(item.eklenme_tarihi).toLocaleTimeString(),
        birlesikTarihVeSaati: `${new Date(item.eklenme_tarihi).toLocaleDateString()} ${new Date(item.eklenme_tarihi).toLocaleTimeString()}`,
      };
    });
    
    console.log(email);
    setData(formattedData);
    setLoading(false);

  } catch (error) {
    console.error(error);
  }
  };
  const cachedFetchOlcumler = useCallback(fetchOlcumler, [data]);
  
  return (
    <>
      <Box
        sx={{
          height: `${height}`,
          width: '100%',
          padding: '1rem',
          display: 'flex',
        }}
      >
        {loading === false ? (
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        ) : (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/*Skeleton Gelecek */}
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={60}
              sx={{ marginTop: '0.1rem' }}
            ></Skeleton>
          </Box>
        )}
      </Box>
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
              <XAxis dataKey="eklenme_tarihi" interval={5} angle={-25} fontSize={12} />
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
              
              <XAxis dataKey="eklenme_tarihi" interval={5} angle={-25} fontSize={12} />
              <YAxis />
              <CartesianGrid strokeDasharray="4 4" />
              <Tooltip />
              <Legend />
              <Area
                width={1000}
                height={500}
                type="monotone"
                dataKey="nem"
                name="Nem"
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
              <XAxis 
                dataKey="eklenme_tarihi"
                interval={5} 
                angle={-45}
                />
              <YAxis />
              <CartesianGrid strokeDasharray="4 4" />

              <Legend />
              <Area
                type="monotone"
                dataKey="karbondioksit_miktari"
                name="CO2 Miktarı"
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
              data={data}
            >
              <XAxis dataKey="eklenme_tarihi" interval={5} angle={-45} />
              <YAxis />
              <CartesianGrid strokeDasharray="4 4" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="isik_siddeti"
                name="Işık Şiddeti"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </Box>
        </Box>
    </>
  );
};

export default OlcumFetch;
