import * as Yup from 'yup';

// Yup Şemaları, Formik ile kullanılmak üzere hazırlanmıştır.
// Burada kullanacağınız formlar için şemaları tasarlarsanız işleriniz aşırı kolaylaşır.

export const CihazUpdateSchema = Yup.object().shape({
  adi: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(15, 'Çok Uzun!')
    .required('Zorunlu!'),
  kategori_id: Yup.number()
    .min(1, 'Çok Kısa!')
    .max(100, 'Çok Uzun!')
    .required('Zorunlu!'),
  meksis_kod: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  bina_id: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  kampus_id: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  veri_gonderme_sikligi: Yup.number()
    .min(1, 'Çok Kısa!')
    .max(5000, 'Çok!')
    .required('Zorunlu!'),
});

export const SensorUpdateSchema = Yup.object().shape({
  parca_adi: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(30, 'Çok Uzun!')
    .required('Zorunlu!'),
  kategori_id: Yup.number().min(1, 'Çok Kısa!').required('Zorunlu!'),
  cihaz_id: Yup.number().min(1, 'Çok Kısa!').required('Zorunlu!'),
});

export const LimitKategorilerUpdateSchema = Yup.object().shape({
  adi: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(15, 'Çok Uzun!')
    .required('Zorunlu!'),
  kategori_id: Yup.number()
    .min(1, 'Çok Kısa!')
    .max(100, 'Çok Uzun!')
    .required('Zorunlu!'),
  meksis_kod: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  bina_id: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  kampus_id: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  veri_gonderme_sikligi: Yup.number()
    .min(1, 'Çok Kısa!')
    .max(5000, 'Çok!')
    .required('Zorunlu!'),
});

export const CihazEkleSchema = Yup.object().shape({
  adi: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(15, 'Çok Uzun!')
    .required('Zorunlu!'),
  kategori_id: Yup.number()
    .min(1, 'Çok Kısa!')
    .max(100, 'Çok Uzun!')
    .required('Zorunlu!'),
  meksis_kod: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  bina_id: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  kampus_id: Yup.string()
    .min(1, 'Çok Kısa!')
    .max(50, 'Çok!')
    .required('Zorunlu!'),
  veri_gonderme_sikligi: Yup.number()
    .min(1, 'Çok Kısa!')
    .max(5000, 'Çok!')
    .required('Zorunlu!'),
});
