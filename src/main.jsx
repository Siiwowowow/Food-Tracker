import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <>
        <Toaster position="bottom-right" />
        <RouterProvider router={router} />
      </>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
