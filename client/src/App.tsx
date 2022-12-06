import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/auth/Register';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
