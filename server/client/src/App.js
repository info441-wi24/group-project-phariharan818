import { React, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobPage from './components/JobPage';
import NavigationBar from './components/Nav';
import HomePage from './components/HomePage';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userSessionInfo, setUserSessionInfo] = useState({
    status: '',
    userInfo: {
      name: "",
      username: ""
    }
  })

  async function fetchUserIdentity() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/myIdentity`)
      const identity = response.data
      if (identity.status === "loggedin") {
        const { status, userInfo: { name, username } } = identity
        const userInfoForPostRequest = {
          status: status,
          userInfo: {
            name: name,
            username: username
          }
        };
        setIsAuthenticated(true)
        setUserSessionInfo(userInfoForPostRequest); 
        await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users`, userInfoForPostRequest.userInfo);
        console.log('log in success');
      } else {
        setUserSessionInfo({
          status: undefined,
          userInfo: {
            name: undefined,
            username: undefined
          }
        })
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.log("error fetching user identity", error)
      setUserSessionInfo({
        status: 'error',
        userInfo: {
          name: "",
          username: ""
        }
      });
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    fetchUserIdentity();
  }, []);

  return (
    <div>
      <NavigationBar userSessionInfo={userSessionInfo} />
      <div style={{ marginTop: '1em', padding: '10px' }}></div>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Jobs" element={isAuthenticated ? <JobPage userSessionInfo={userSessionInfo}/> : <Navigate to="/" replace />} />
        <Route path="/" element={<HomePage userSessionInfo={userSessionInfo} />} />
      </Routes>
    </div>
  );
}

export default App;
