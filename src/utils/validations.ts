export const isValidEmail = (email: string) => !!email.match(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const isValidPassword = (password: string) => {
  const value = password.trim();
  const lengthValidation = value.length >= 8;
  const lowerCase = Number(!!value.match(/[a-z]/g));
  const upperCase = Number(!!value.match(/[A-Z]/g));
  const number = Number(!!value.match(/[0-9]/g));
  const speacialChar = Number(!!value.match(/[(!@#$%^&*).,:;]/g));
  const chars = lowerCase + upperCase + number + speacialChar;
  const validPassword = lengthValidation && (chars >= 3);
  return validPassword;
};
