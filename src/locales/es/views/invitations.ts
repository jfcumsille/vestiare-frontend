import { InvitationsViewLocale } from '@/interfaces/locales/views/invitations';

export default <InvitationsViewLocale> {
  login: {
    title: 'Bienvenido a esta organización',
    titleNotInvited: 'Lo sentimos, ¡Esta invitación no es para ti!',
    thisInvitation: 'Esta invitación es para',
    loggedInWith: 'y tu has iniciado sesión con',
    pleaseLogOut: 'Por favor, cierra la sesión y haz click en la invitación por correo nuevamente.',
    pleaseLogin: 'Por favor ingresa con',
    throughAny: 'mediante cualquiera de estas opciones:',
    warning: 'Si aceptas la invitación, perderás acceso a otras organizaciones conectadas a esta email',
    decline: 'Rechazar invitación',
    footer: '¿Ya tienes una cuenta?',
    logIn: 'Aceptar invitación e iniciar sesión',
  },
  expired: {
    title: 'Tu link ha expirado',
    button: 'Pedir otro link',
    footer: 'Si no quieres una cuenta asociada a esta organización, puedes crear una nueva organización con otro correo en',
    signUp: 'Registrarse',
  },
  emailSignup: {
    title: 'Agrega información de tu cuenta',
  },
};
