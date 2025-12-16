export function emailValidate(email: string): boolean {
  // Expressão regular para validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateCPF(CPF: string): boolean{
  // Expressão regular para validar formato de CPF
  const CPFRegex = /^\d{11}$/;
  return CPFRegex.test(CPF);
}

export function isDateValid(date: Date | string): boolean {
  const inputDate = new Date(date);
  const now = new Date();

  // Remove horas/minutos/segundos se quiser comparar só a data
  inputDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return inputDate >= now;
}
