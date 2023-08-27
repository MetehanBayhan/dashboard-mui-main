import { Grid } from '@mui/material';
import Header from 'components/utils/Headers';
import CihazSnippet from 'screens/Cihazlar/CihazSnippet';
import Grafik2 from 'components/charts/Grafik2';
import Grafik3 from 'components/charts/Grafik3';

const Dashboard = () => {
  // burası anasayfamız.
  // Grafik 2 ve Grafik 3 ismindeki componentlerin içerisindeki grafikleri anasayfada barındırabiliyoruz.
  // CihazSnippet ise o kutuları işaret etmektedir.
  // Bu bir grid containerdir. Grid Yapısındadır.

  // 
  return (
    <Grid container direction="column" justifyContent="center">
      <Header
        title="Anasayfa"
        variant="h2"
        fontSize="2rem"
        margin="0 0 1rem 1rem"
      />
      <CihazSnippet />

      <div className="flex flex-col w-full">
        <div>
          <Grafik2 />
        </div>
        <div>
          <Grafik3 />
        </div>
      </div>
    </Grid>
  );
};

export default Dashboard;
