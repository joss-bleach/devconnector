import { Navigate } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../hooks/hooks';

// Components
import Loading from '../loading/Loading';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isError, isLoading, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  if (isLoading) return <Loading />;

  if (isError) {
    <Navigate to="/auth/login" />;
  }

  return !isLoading && !isError && isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
};

export default PublicRoute;
