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