//-------------------------------------------------------------------------------------
import React, { useEffect } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import Wrapper from 'components/Wrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from 'screens/404';
import CryptoJS from 'crypto-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Tüm STYLING işlemleri için MUI kullanılmaktadır.
// Tüm Data yönetimi işlemleri için %90 oranında Axios kütüphanesi kullanılmaktadır.
// Şifreleme işlemleri için CryptoJS kullanılmaktadır.
// Tüm bildirim işlemleri için react-toastify kullanılmaktadır.
// Tüm form işlemleri için Formik kullanılmaktadır. (Formik, Form işlemlerini kolaylaştıran bir kütüphanedir.)
// Tüm form işlemleri için Yup kullanılmaktadır. (Yup, Formik ile birlikte kullanılan bir kütüphanedir. Formik ile birlikte kullanıldığında form işlemlerini kolaylaştıran bir kütüphanedir.)



function App() {
  // queryClient react-query için kullanılan bir state yönetim aracıdır.
  // queryClient ile verileri state yönetimi yapmadan yönetebiliriz.

  const queryClient = new QueryClient();

  // useSearchParams ile url'den parametreleri alabiliriz.
  // bu alınan paramtre ile email'i şifreleyip session storage'a kaydediyoruz.
  // session storage'dan email'i alıp şifre çözme işlemi yaparak email'i elde ediyoruz.
  // elde edilen email ile giriş yapıldı mı yapılmadı mı kontrolü yapabiliriz.

  const [params] = useSearchParams();
  const email = params.get('email');

  // Şifreleme ve şifre çözme işlemleri için kullanılan fonksiyonlar.
  // Bu fonksiyonlar ile email'i şifreleyip session storage'a kaydediyoruz.
  function Encrypt(word, key = 'share') {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString();
    let encData = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encJson)
    );
    return encData;
  }

  // eğer email varsa email'i şifreleyip session storage'a kaydediyoruz.
  if (email) {
    const hashedEmail = Encrypt(email);
    sessionStorage.setItem('email', hashedEmail);
  }
  // eğer email yoksa session storage'dan email'i alıp şifre çözme işlemi yapıyoruz.
  const isLoggedIn = sessionStorage.getItem('email') !== null;

  // useEffect bir hook'tur. Bu hook ile sayfa yenilendiğinde çalışacak kodları yazabiliriz. Özellikle:
  // isLoggedIn değişkeni değiştiğinde çalışacak kodları yazabiliriz.

  useEffect(() => {
    isLoggedIn ? console.log('Giriş Yapıldı') : console.log('Giriş Yapılmadı');

    console.log('Developer: Furkan Anter');
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* 
          1. Routes altında Route'lar bulunmalı. İlk Route '*' olduğu için, tüm her şeyi kapsayan bir yapıya sahiptir.
          2. Route'lar altında Wrapper componenti bulunmalı. Bu component içerisinde Header, Footer ve diğer componentler bulunmalı.
          3. Wrapper componenti içerisinde isLoggedIn değişkeni bulunmalı. Bu değişken ile giriş yapıldı mı yapılmadı mı kontrolü yapılabilir.
          4. NotFoundPage componenti ise, eğer url'de tanımlanmayan bir path varsa çalışacak componenttir. Yani 404 sayfası diyebiliriz.
          Routes bir react-router-dom bileşenidir. Routing işlemleri için kullanılır. Burada çok oynama yapılırsa problemler çıkabilir ve kullanıcıların,
          ekrana yönlendirilme işlemleri hataya düşebilir. Dikkatli olunmalıdır.
        */}
        <Routes>
          <Route path="*" element={<Wrapper isLoggedIn={isLoggedIn} />} />
          <Route component={NotFoundPage} />
        </Routes>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;

// -------------------------------------------------------------------------------------
