import localFont from 'next/font/local';

export const dana = localFont({
  src: [
    {
      path: './woff2/DanaVF.woff2',
      style: 'normal',
    },
  ],
  variable: '--font-dana',
  display: 'swap',
});
export const poppins = localFont({
  src: [
    {
      path: './ttf/Poppins-Regular.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});
