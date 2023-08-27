import React, { useEffect, useState } from 'react';
import Header from '../utils/Headers';
import { Box } from '@mui/system';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useEmail from 'hooks/useEmail.js';

function LineCharts() {
  const { email } = useEmail();
  const [data, setData] = useState([]);

  // Tarihleri gruplayan fonksiyon
  const groupDataByDate = (data) => {
    const groupedData = data.reduce((accumulator, current) => {
      const date = current.eklenme_tarihi;
      if (!accumulator[date]) {
        accumulator[date] = current;
      }
      return accumulator;
    }, {});
    return Object.values(groupedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://maps.deu.edu.tr/akim_olcum/cihaz/30/${email}`
        );
        const result = await response.json();

        // Sadece sayac1 değerlerini alarak geçerli tarih formatına dönüştürme ve gruplama
        const formattedData = groupDataByDate(result.data).map((item) => ({
          eklenme_tarihi: item.eklenme_tarihi.split(' ')[0],
          sayac1: item.sayac1,
        }));

        setData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <Header
        variant="h6"
        title="Akım Ölçümü"
        fontSize="1.5rem"
        margin="0 0 0 1rem"
        color="primary"
      />
      <Box sx={{ height: '40vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="eklenme_tarihi" />
            <YAxis type="number" domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="sayac1"
              stroke="#007aff"
              fill="#007bff"
              activeDot={{ r: 1 }}
              dot={{ strokeWidth: 1.5, r: 1.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default LineCharts;
