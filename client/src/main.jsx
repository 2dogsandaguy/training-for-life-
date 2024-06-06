
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'; // Corrected import path
import NotFound from './NotFound'; // Assuming NotFound is in the same directory
import Home from './components/Home'; //
const router = createBrowserRouter([
    {
      path: '*',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />
        },
        // {
        //   index: true,
        //   element: <Home />,
        // }
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
