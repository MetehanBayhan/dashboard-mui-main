import CihazFetch from './CihazFetch';
import Header from 'components/utils/Headers';

const Cihazlar = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Cihazlar"
        variant={'h2'}
        fontSize="2rem"
        margin=" 1rem 0 0 1rem"
      />
      <CihazFetch height={'80vh'} />
    </div>
  );
};
export default Cihazlar;
