import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import AuthPage from './pages/auth/Auth.page';

// Components
import Register from './components/auth/Register';
import Auth from './components/auth/Auth';

function App() {
  return (
    <>
      <Routes>
        <Route path="auth" element={<AuthPage />}>
          <Route path="login" element={<Auth />} />
          <Route path="signup" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
