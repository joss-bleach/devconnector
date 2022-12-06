import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationFormData } from './Auth.types';
import { registrationValidationSchema } from './Auth.validation';

// Styles
import styles from './Auth.styles';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationValidationSchema),
  });

  const handleOnSubmit = (data: RegistrationFormData) => {
    console.log(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div className="mx-auto max-w-prose">
      <div className={styles['headline-wrapper']}>
        <h1 className={styles.headline}>Get started.</h1>
        <h2 className={styles.subheading}>Create your DevConnector account.</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
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
          <span className={styles['input-error']}>{errors.name?.message}</span>
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
          <span className={styles['input-error']}>{errors.email?.message}</span>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <div className={styles['label-wrapper']}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <span className={styles['label-legend']}>Required</span>
          </div>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={styles['input-valid']}
          />
          <span className={styles['input-error']}>
            {errors.password?.message}
          </span>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <div className={styles['label-wrapper']}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm password
            </label>
            <span className={styles['label-legend']}>Required</span>
          </div>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className={styles['input-valid']}
          />
          <span className={styles['input-error']}>
            {errors.confirmPassword?.message}
          </span>
        </fieldset>
        <button
          type="submit"
          disabled={!isValid}
          aria-label="Create your account."
          className={styles.submit}
        >
          Create account
        </button>
      </form>
    </div>
  );
};

export default Register;
