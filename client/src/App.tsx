import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Pages
import AuthPage from './pages/auth/Auth.page';

// Components
import Register from './components/auth/Register';
import Auth from './components/auth/Auth';
import Dashboard from './pages/auth/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';
import DashProfile from './pages/Dash-Profile';

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
        <Route
          path="auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        >
          <Route path="login" element={<Auth />} />
          <Route path="signup" element={<Register />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="dash-profile" element={<DashProfile />} />
      </Routes>
    </>
  );
}

export default App;
