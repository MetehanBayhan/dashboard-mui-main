import React, { useEffect, useState } from 'react';
import Header from '../utils/Headers';
import { Box, Container } from '@mui/system';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://maps.deu.edu.tr/akim_olcum/cihaz/29/${email}`
        );
        const result = await response.json();

        // Sadece sayac1 değerlerini alarak geçerli tarih formatına dönüştürme
        const formattedData = result.data.map((item) => ({
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
        title="Günlük Akım Ölçümü"
        fontSize="1.5rem"
        margin="0 0 0 1rem"
        color="primary"
      />
      <Box sx={{ height: '30vh' }}>
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
              stroke="#ff0000"
              fill="#ff0000"
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
