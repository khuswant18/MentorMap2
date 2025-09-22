import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useAuthStore from './stores/authStore'

const Layout = () => {
  const activeRole = useAuthStore((state) => state.activeRole);
  const location = useLocation();
  
  const showNavbar = location.pathname === '/' || activeRole !== 'mentor';
  
  return (
    <div>
        {showNavbar && <Navbar />}
            <Outlet/>
        <Footer />
    </div>
  )
}

export default Layout
