import Header from 'components/utils/Headers';
import LimitFetch from 'screens/Limitler/LimitFetch';

const Limitler = () => {
  return (
    <div className="justify-center h-screen mt-4">
      <Header
        variant={'h2'}
        title="Limitler"
        fontSize="2rem"
        margin="0 0 0 1rem"
      />
      <LimitFetch height={'80vh'} />
    </div>
  );
};

export default Limitler;
