import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'; // Corrected import path
import NotFound from './NotFound'; // Assuming NotFound is in the same directory

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <App />
        }
      ],
    },
  ]);
  
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
