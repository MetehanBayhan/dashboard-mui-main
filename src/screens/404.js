import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Sayfa Bulunamadı
        </h1>
        <p className="text-lg text-gray-800 mb-4">
          Aradığınız sayfayı bulamadık.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Lütfen doğru URL'yi kontrol edin veya ana sayfaya dönün.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
