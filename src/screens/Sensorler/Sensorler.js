import React from 'react';
import Header from 'components/utils/Headers';
import SensorFetch from './SensorFetch';

const Sensorler = () => {
  return (
    <div className=" h-screen justify-center">
      <Header
        variant={'h2'}
        title={'Sensörler'}
        fontSize="2rem"
        margin="1rem 0 0 1rem"
      />
      <SensorFetch height={'80vh'} />
    </div>
  );
};

export default Sensorler;
