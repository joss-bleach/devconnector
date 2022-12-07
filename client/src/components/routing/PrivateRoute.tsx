import { Navigate } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../hooks/hooks';

// Components
import Loading from '../loading/Loading';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isError } = useAppSelector(
    (state) => state.auth,
  );

  if (isLoading) return <Loading />;

  if (isError) {
    <Navigate to="/auth/login" />;
  }

  return !isLoading && !isError && isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth/login/" />
  );
};

export default PrivateRoute;
