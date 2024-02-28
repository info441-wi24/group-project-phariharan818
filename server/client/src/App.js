// import React, { useEffect } from 'react';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />}  /> 
      </Routes>
    </div>
  );
}

export default App;
