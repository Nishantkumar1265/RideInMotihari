import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import UserLogin from './pages/Login/UserLogin';
import AdminLogin from './pages/Login/AdminLogin';
import ServiceProviderLogin from './pages/Login/ServiceProviderLogin';
import UserHome from './pages/Dashboard/UserHome';
import ServiceProviderHome from './pages/Dashboard/ServiceProviderHome';
import AdminHome from './pages/Dashboard/AdminHome';
import RequireAuth from './utils/RequireAuth';

import AboutUs from './pages/HomePage/details/AboutUs';
import OurOfferings from './pages/HomePage/details/OurOfferings';
import Careers from './pages/HomePage/details/Careers';
import Bike from './pages/HomePage/details/Bike';
import Auto from './pages/HomePage/details/Auto';
import Car from './pages/HomePage/details/Car';
import Safety from './pages/HomePage/details/Safety';
import Sustainability from './pages/HomePage/details/Sustainability';

import OurTeam from './pages/HomePage/details/OurTeam';
import ContactUs from './pages/HomePage/details/ContactUs';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/serviceproviderlogin" element={<ServiceProviderLogin />} />
        {/* <Route path="/user-home" element={<UserHome />} /> */}
        {/* <Route path="/service-provider-home" element={<ServiceProviderHome />} /> */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* <Route path="/admin-home" element={<AdminHome />} /> */}


        {/* USER + ADMIN */}
        <Route element={<RequireAuth allowedRoles={['user', 'admin']} />}>
          <Route path="/user-home" element={<UserHome />} />
        </Route>

        {/* ADMIN ONLY  */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/admin-home" element={<AdminHome />} />
        </Route> 

        {/* Service provider + ADMIN */}
        <Route element={<RequireAuth allowedRoles={['service_provider', 'admin']} />}>
          <Route path="/service-provider-home" element={<ServiceProviderHome />} />
        </Route> 

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-offerings" element={<OurOfferings />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/bike" element={<Bike />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/car" element={<Car />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/sustainability" element={<Sustainability />} />
        
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/contact-us" element={<ContactUs />} />

      </Routes>
      
    </Router>
  );
}

export default App;
