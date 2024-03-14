import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: '*',
        element: <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>PAGE NOT FOUND</h1>
      }
    ],
  },

]);
