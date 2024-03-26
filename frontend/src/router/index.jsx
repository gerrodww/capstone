import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import Verify from '../components/Verify/Verify';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/verify",
        element: <Verify />
      },
      {
        path: '*',
        element: <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>PAGE NOT FOUND</h1>
      },
    ],
  },

]);
