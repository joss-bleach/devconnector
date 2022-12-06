const AuthStyles = {
  'headline-wrapper': 'flex flex-col items-center',
  headline: 'text-theme-headline text-xl font-semibold',
  subheading: 'text-theme-paragraph text-sm',
  form: 'flex max-w-prose flex-col items-center space-y-5 py-6',
  fieldset: 'flex w-80 flex-col space-y-1',
  'label-wrapper': 'flex flex-row items-center justify-between',
  label: 'text-theme-headline text-xs font-semibold',
  'label-legend': 'text-theme-paragraph text-xs',
  'input-valid':
    'bg-theme-background text-theme-paragraph ring-theme-button h-9 rounded p-2 text-sm focus:outline-none focus:ring-2',
  submit:
    'bg-theme-button text-theme-button-text hover:bg-theme-button-hover h-9 w-80 rounded text-sm transition disabled:cursor-not-allowed disabled:opacity-30',
  'input-error': 'text-theme-tertiary text-xs font-semibold',
};

export default AuthStyles;
