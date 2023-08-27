import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

// Bu hook, kullanıcının emailini şifrelenmiş olarak alır.
// Bu hook ile email'i şifre çözme işlemi yaparak elde edebiliriz.

function useEmail() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const hash = sessionStorage.getItem('email');
    if (hash) {
      const decryptedData = Decrypt(hash);
      setEmail(decryptedData);
    }
  }, []);

  function Decrypt(word, key = 'share') {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8);
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes);
  }

  return email;
}

export default useEmail;
