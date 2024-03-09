export const validatePhone = (phone: string): boolean => {
  const re = /[0-9]{9,15}$/;

  return re.test(phone);
};

export const validateCode = (code: string): boolean => {
  const re = /[0-9]{4}$/;

  return re.test(code);
};
