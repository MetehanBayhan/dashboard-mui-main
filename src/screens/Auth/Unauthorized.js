import React from 'react';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useNavigate } from 'react-router-dom';
const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 p-4">
      <NoAccountsIcon className="text-white mb-4 text-5xl" fontSize="xlarge" />

      <h1 className="text-4xl font-bold text-white mb-4">Yetkisiz Erişim</h1>
      <div className="text-center">
        <p className="text-lg text-white mb-4">
          Uygun yetkilendirmeye sahip olmadığınız için bu sayfayı
          görüntüleyemezsiniz.
        </p>
        <p className="text-lg text-white mb-4">
          Lütfen geçerli bir email ile oturum açarak tekrar deneyin.
        </p>
      </div>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => {
          navigate('/cihazlar');
        }}
      >
        Geri Dön
      </button>
    </div>
  );
};

export default UnauthorizedPage;
