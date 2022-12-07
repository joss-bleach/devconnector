import { Outlet } from 'react-router-dom';
import styles from './Auth.page.styles';

export const AuthPage = () => {
  return (
    <div className="bg-theme-background">
      <div className={styles['auth-form-wrapper']}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
