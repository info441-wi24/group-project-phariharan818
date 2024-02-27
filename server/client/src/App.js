// import React, { useEffect } from 'react';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage';

function App() {
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${process.env.REACT_APP_API_URL}`)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api`);

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); */

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
