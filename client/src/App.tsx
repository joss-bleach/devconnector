import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Pages
import AuthPage from './pages/auth/Auth.page';

// Components
import Register from './components/auth/Register';
import Auth from './components/auth/Auth';
import Dashboard from './pages/auth/Dashboard';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="auth" element={<AuthPage />}>
          <Route path="login" element={<Auth />} />
          <Route path="signup" element={<Register />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
