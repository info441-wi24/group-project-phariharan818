// import React, { useEffect } from 'react';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import JobPage from './components/JobPage';
import Nav from './components/Nav.js'

function App() {
  return (
    <div>
      <Nav />
      <div style={{ marginTop: '1em', padding: '10px' }}></div>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<JobPage />}  /> 
      </Routes>
    </div>
  );
}

export default App;
