
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'; // Corrected import path
import NotFound from './NotFound'; // Assuming NotFound is in the same directory
import Home from './components/Home'; //
import Login from './components/Login';
import Seclude from './components/Seclude';
import SignUp from './components/SignUp';

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
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Seclude",
          element: <Seclude />
        },
        {
          path: "SignUp",
          element: <SignUp />
        }
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
