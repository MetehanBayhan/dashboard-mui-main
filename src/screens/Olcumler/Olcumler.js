import OlcumFetch from './OlcumFetch';
import Header from 'components/utils/Headers';

const Olcumler = () => {
  // burası ölçümlerimiz. Ölçümlerimizi burada görebiliyoruz.
  // OlcumFetch componenti ölçümleri çekmek için oluşturulmuştur.
  // Header componenti ise başlık için oluşturulmuştur.

  return (
    <div className=" h-screen justify-center">
      <Header
        variant={'h2'}
        title={'Ölçümler'}
        fontSize="2rem"
        margin="1rem 0 0 1rem"
      />
      <OlcumFetch height={'80vh'} />
    </div>
  );
};

export default Olcumler;
