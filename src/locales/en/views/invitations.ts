import { InvitationsViewLocale } from '@/interfaces/locales/views/invitations';

export default <InvitationsViewLocale> {
  login: {
    title: 'Welcome to this Organization',
    pleaseLogin: 'Please Log In with',
    throughAny: 'through any of these:',
    warning: 'You will lose access to other organizations connected to this email by accepting this invitation.',
    decline: 'Decline Invitation',
    footer: 'If you do not want an account associated with this organization, you can create a new organization with a different email through',
    signUp: 'Sign Up',
  },
  expired: {
    title: 'Your link has expired',
    button: 'Request Another Link',
    footer: 'If you do not want an account associated with this organization, you can create a new organization with a different email through our regular',
    signUp: 'Sign Up',
  },
};
