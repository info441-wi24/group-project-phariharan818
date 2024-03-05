import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobPage from './components/JobPage';
import NavigationBar from './components/Nav';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: '1em', padding: '10px' }}></div>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Jobs" element={<JobPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
