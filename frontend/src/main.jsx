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
import Register from './component/Login/Register.jsx';
import Chat from './component/Chat/Chat.jsx';
import WaterQualityAnalyzer from './component/water-quality-analyzer.jsx';

const router = createBrowserRouter([
  {
    path: "/",  
    element: <Layout />, 
    children: [
      {
        path: "/", 
        element: <App /> 
      },
      {
        path: "/chat",
        element: <Chat />
      },
      {
        path: "/weather",
        element: <WaterQualityAnalyzer />
      }
      
    ]
  },
  {
    path: "login", 
    element: <Login />
  },
  {
    path: "register", 
    element: <Register />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
