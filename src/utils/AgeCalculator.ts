export function AgeCalculator(birthDate: string): number {
  if (!birthDate) return 0;

  const nascimento = new Date(birthDate);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  // Se ainda não fez aniversário este ano, subtrai 1
  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
  ) {
    idade--;
  }

  return idade;
}

export function VarifyDate(date: string): boolean {
  if (!date) return false;

  const dateFormated = new Date(date);
  const today = new Date();

  const CurrentYear = today.getFullYear();
  const CurrentMonth = today.getMonth();
  const CurrentDay = today.getDay();

  const IformedYear = dateFormated.getFullYear();
  const IformedMonth = dateFormated.getMonth();
  const IformedDay = dateFormated.getDay();

  // Verifica se a data informada é anterior a data atual
  if(IformedYear < CurrentYear){
    return false;
  } else if(IformedYear === CurrentYear && IformedMonth< CurrentMonth){
    return false;
  } else if(IformedYear === CurrentYear && IformedMonth === CurrentMonth && IformedDay < CurrentDay){
    return false;
  } else{
    return true;
  }  
}