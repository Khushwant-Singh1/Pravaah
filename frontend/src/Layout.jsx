// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

function Layout() {
  return (
    <>
      <Navbar />
        <Outlet /> 
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
