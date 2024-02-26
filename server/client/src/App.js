import React, { useEffect } from 'react';

function App() {
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
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
