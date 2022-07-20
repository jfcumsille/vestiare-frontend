import { InvitationsViewLocale } from '@/interfaces/locales/views/invitations';

export default <InvitationsViewLocale> {
  login: {
    title: 'Welcome to this Organization',
    titleNotInvited: 'Sorry, this invitation is not for you!',
    thisInvitation: 'This invitation is for',
    loggedInWith: 'and you are logged in with',
    pleaseLogOut: 'Please log out and click on your email invitation again.',
    pleaseSignUp: 'Please sign up with',
    throughAny: 'through any of these:',
    warning: 'You will lose access to other organizations connected to this email by accepting this invitation.',
    decline: 'Decline Invitation',
    footer: 'Already have an account?',
    logIn: 'Accept invitation and log in',
  },
  expired: {
    title: 'Your link has expired',
    button: 'Request Another Link',
    footer: 'If you do not want an account associated with this organization, you can create a new organization with a different email through our regular',
    signUp: 'Sign Up',
  },
  emailSignup: {
    title: 'Add account details',
  },
};
