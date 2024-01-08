import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './views/pages/dashboard/Dashboard';
import Header from './views/components/header/Header';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
