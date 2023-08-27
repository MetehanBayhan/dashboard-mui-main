import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Sidebar from 'components/views/Sidebar/Sidebar';
import Topbar from 'components/Topbar';
import Footer from './Footer';
import { useProSidebar } from 'react-pro-sidebar';
import HomePage from '../screens/Anasayfa/HomePage';
import Olcumler from 'screens/Olcumler/Olcumler';
import Cihazlar from 'screens/Cihazlar/Cihazlar';
import Limitler from 'screens/Limitler/Limitler';
import CihazEkle from 'screens/Cihazlar/CihazEkle';
import CihazUpdate from 'screens/Cihazlar/CihazUpdate';
import Sensorler from 'screens/Sensorler/Sensorler';
import SensorEkle from 'screens/Sensorler/SensorEkle';
import LimitKategoriler from 'screens/LimitKategoriler/LimitKategoriler';
import LimitKategoriEkle from 'screens/LimitKategoriler/LimitKategoriEkle';
import SensorTurleri from 'screens/SensorTurleri/SensorTurleri';
import SensorTuruEkle from 'screens/SensorTurleri/SensorTuruEkle';
import SensorTuruGuncelle from 'screens/SensorTurleri/SensorTuruGuncelle';
import SensorGuncelle from 'screens/Sensorler/SensorGuncelle';
import UnauthorizedPage from 'screens/Auth/Unauthorized';
import NotFoundPage from 'screens/404';
import Meksis from 'screens/Meksis/GetAllMekBinaAlt';
import GetAllMekanlarByBina from 'screens/Meksis/GetAllMekanlarByBina';
import AkimOlcum from 'screens/Olcumler/AkimOlcum';

const Wrapper = ({ isLoggedIn }) => {
  // Wrapper Componenti bir Prop alır Bu prop isLoggedIn dir. Yani eğer IsLoggedIn true ise Wrapper componenti çalışır.
  const { broken } = useProSidebar();

  return isLoggedIn ? (
    <div className="flex w-screen">
      <Sidebar />
      {/*
        Burası Ekranın boyutu ve Sidebar'ın açılıp kapanmasıyla alakalıdır.
      */}
      <div className="w-screen">
        <div
          className={`${
            broken ? 'ml-[0px]' : 'ml-[282px]'
          } transition-all duration-300`}
        >
          {/* Topbar Componentinin barındırıldığı kod aşağıdadır. Sayfa içerisinde bir topbar Bulunur. */}
          <Topbar />
          {/*
           1. Routes Altında sitedeki tüm sayfaların ve url yönlendirilmelerini kodları ve componentleri barındırılmaktadır.
           2. Eğer bir path tanımlamak istiyorsanız, path="path" element={<Component />} şeklinde tanımlama yapabilirsiniz.
           3. Dikkat edilmelidir ki url/:id şeklinde spesifik bir tanımlama ve yönlendirilme yapılmadığı için öyle bir gereksinim görülürse,
           bunun için testlerin düzgün ve kodun optimize çalışmasına dikkat edilmelidir.
          */}
          <Routes>
            {/* Anasayfa */}
            <Route path="/" element={<HomePage />} />
            {/* Ölçümler Sayfası */}
            <Route path="/olcumler" element={<Olcumler />} />
            {/* Cihazlar */}
            <Route path="/cihazlar" element={<Cihazlar />} />
            {/* Cihazlar / Cihaz Ekle */}
            <Route path="/cihazlar/cihaz-ekle" element={<CihazEkle />} />
            {/* Cihazlar / Cihaz Güncelle */}
            <Route path="/cihazlar/cihaz-guncelle" element={<CihazUpdate />} />
            {/* Sensörler */}
            <Route path="/sensorler" element={<Sensorler />} />
            {/* Sensörler / Sensör Ekle */}
            <Route path="/sensorler/sensor-ekle" element={<SensorEkle />} />
            {/* Sensörler / Sensör Güncelle */}
            <Route
              path="/sensorler/sensor-guncelle"
              element={<SensorGuncelle />}
            />
            {/* Limitler */}
            <Route path="/limitler" element={<Limitler />} />
            {/* Limit Kategoriler */}
            <Route path="/limit-kategoriler" element={<LimitKategoriler />} />
            {/* Limit Kategoriler / Limit Kategori Ekle */}
            <Route
              path="/limit-kategoriler/limit-kategori-ekle"
              element={<LimitKategoriEkle />}
            />
            {/* Sensör Türleri */}
            <Route path="/sensor-turleri" element={<SensorTurleri />} />
            {/* Sensör Türleri / Sensör Türü Ekle */}
            <Route
              path="/sensor-turleri/sensor-turu-ekle"
              element={<SensorTuruEkle />}
            />
            {/* Sensör Türleri / Sensör Türü Güncelle */}
            <Route
              path="/sensor-turleri/sensor-turu-guncelle"
              element={<SensorTuruGuncelle />}
            />
            {/* Meksis */}
            <Route path="/meksis" element={<Meksis />} />
            {/* Meksis 2 */}
            <Route path="/meksis2" element={<GetAllMekanlarByBina />} />
            {/* Akım Ölçüm */}
            <Route path="/akim-olcum" element={<AkimOlcum />} />
            {/* Routes Bitiş */}
          </Routes>
          {/* 
              Footer Component'inin barındırıldığı kod aşağıdadır. 
              Sayfa içerisinde bir footer Bulunur.
           */}
          <Footer />
        </div>
      </div>
    </div>
  ) : (
    // eğer doğru değil ise bu sayfa çalışır. Orada da Navigate componenti ile /unauthorized sayfasına yönlendirme yapılır.
    // Dediğim gibi, buralarda çoook gerekli değilse çok oynama yapılmamalıdır. Çünkü çok uzun uğraşlar sonucu optimize bir routing sistemi
    // oluşturulmuştur.
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/unauthorized" />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Wrapper;
