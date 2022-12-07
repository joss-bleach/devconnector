import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationFormData } from './Auth.types';
import { registrationValidationSchema } from './Auth.validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Styles
import styles from './Auth.styles';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

const Register: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationValidationSchema),
  });

  const handleOnSubmit = (data: RegistrationFormData) => {
    console.log(JSON.stringify(data, null, 2));
    reset();
  };

  const handleTogglePasswordVisible = () => {
    setPasswordVisible((current) => !current);
  };

  const handleToggleConfirmPasswordVisible = () => {
    setConfirmPasswordVisible((current) => !current);
  };

  return (
    <>
      <SEO
        title="Create your account"
        description="Welcome to DevConnector! Create your account to get started."
        type="website"
      />
      <div className={styles['form-wrapper']}>
        <div className={styles['headline-wrapper']}>
          <h1 className={styles.headline}>Get started</h1>
          <h2 className={styles.subheading}>
            Create your DevConnector account.
          </h2>
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleOnSubmit)}
          noValidate
        >
          <fieldset className={styles.fieldset}>
            <div className={styles['label-wrapper']}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <span className={styles['label-legend']}>Required</span>
            </div>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={styles['input-valid']}
            />
            <span className={styles['input-error']}>
              {errors.name?.message}
            </span>
          </fieldset>
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
                  onClick={handleTogglePasswordVisible}
                />
              ) : (
                <FaEyeSlash
                  role="button"
                  aria-label="Show password"
                  className={styles['visibility-icon']}
                  onClick={handleTogglePasswordVisible}
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
          <fieldset className={styles.fieldset}>
            <div className={styles['label-wrapper']}>
              <label className={styles.label} htmlFor="password">
                Confirm password
              </label>
              <span className={styles['label-legend']}>Required</span>
            </div>
            <span className="relative w-full">
              {!confirmPasswordVisible ? (
                <FaEye
                  role="button"
                  aria-label="Show password"
                  className={styles['visibility-icon']}
                  onClick={handleToggleConfirmPasswordVisible}
                />
              ) : (
                <FaEyeSlash
                  role="button"
                  aria-label="Show password"
                  className={styles['visibility-icon']}
                  onClick={handleToggleConfirmPasswordVisible}
                />
              )}
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="password"
                {...register('confirmPassword')}
                className={styles['input-valid']}
              />
            </span>
            <span className={styles['input-error']}>
              {errors.confirmPassword?.message}
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
            Already have an account?{' '}
            <Link className={styles['account-paragraph-link']} to="/auth/login">
              Click here
            </Link>{' '}
            to login.
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
