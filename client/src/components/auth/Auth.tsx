import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthenticationFormData } from './Auth.types';
import { authenticationValidationSchema } from './Auth.validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RegisterUser } from '../../state/features/auth/models';
import {
  authenticateUser,
  resetAsyncState,
} from '../../state/features/auth/authSlice';

// Styles
import styles from './Auth.styles';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetAsyncState());
      reset();
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/dashboard');
  }, [isAuthenticated]);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthenticationFormData>({
    resolver: yupResolver(authenticationValidationSchema),
  });

  const handleOnSubmit = (data: AuthenticationFormData) => {
    dispatch(authenticateUser(data));
  };

  const handleToggleVisible = () => {
    setPasswordVisible((current) => !current);
  };

  return (
    <>
      <SEO
        title="Log in"
        description="Welcome back to DevConnector!"
        type="website"
      />
      <div className={styles['form-wrapper']}>
        <div className={styles['headline-wrapper']}>
          <h1 className={styles.headline}>Welcome back</h1>
          <h2 className={styles.subheading}>
            Log into your DevConnector account.
          </h2>
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleOnSubmit)}
          noValidate
        >
          <fieldset className={styles.fieldset}>
            <div className={styles['label-wrapper']}>
              <label className={styles.label} htmlFor="email">
                Email address
              </label>
              <span className={styles['label-legend']}>Required</span>
            </div>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={styles['input-valid']}
            />
            <span className={styles['input-error']}>
              {errors.email?.message}
            </span>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <div className={styles['label-wrapper']}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <span className={styles['label-legend']}>Required</span>
            </div>
            <span className="relative w-full">
              {!passwordVisible ? (
                <FaEye
                  role="button"
                  aria-label="Show password"
                  className={styles['visibility-icon']}
                  onClick={handleToggleVisible}
                />
              ) : (
                <FaEyeSlash
                  role="button"
                  aria-label="Show password"
                  className={styles['visibility-icon']}
                  onClick={handleToggleVisible}
                />
              )}
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className={styles['input-valid']}
              />
            </span>
            <span className={styles['input-error']}>
              {errors.password?.message}
            </span>
          </fieldset>
          <button
            type="submit"
            aria-label="Create your account."
            className={styles.submit}
          >
            Create account
          </button>
          <p className={styles['account-paragraph']}>
            Don't have an account?{' '}
            <Link
              className={styles['account-paragraph-link']}
              to="/auth/signup"
            >
              Click here
            </Link>{' '}
            to create one.
          </p>
        </form>
      </div>
    </>
  );
};

export default Auth;
