import { LogInViewLocale } from '@/interfaces/locales/views/logIn';

export default <LogInViewLocale>{
  title: 'Log in to your account',
  dontHaveAccount: 'Don\'t have an account?',
  signUp: 'Sign up',
  invalidMethodWarning: 'Please use {{ validMethod }} to log in to this account.',
  invalidMethodWarningSub: 'You cannot log in with {{ invalidMethod }} because you signed up with {{ validMethod }}',
};
