export function emailValidate(email: string): boolean {
  // Expressão regular para validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateCPF(CPF: string): boolean{
  // Expressão regular para validar formato de CPF
  const CPFRegex = /^[0-9]{2}\.[0-9]{3}\.[0-9]{4}-[0-9]{2}$/;
  return CPFRegex.test(CPF);
}