import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './Layout.jsx'; 
import App from './App.jsx'; 
import Login from './component/Login/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",  
    element: <Layout />, 
    children: [
      {
        path: "/", 
        element: <App /> 
      },
      
    ]
  },
  {
    path: "login", 
    element: <Login />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
