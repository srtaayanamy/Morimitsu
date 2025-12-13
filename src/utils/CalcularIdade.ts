export function calcularIdade(dataNascimento: string): number {
  if (!dataNascimento) return 0;

  console.log(dataNascimento)

  const nascimento = new Date(dataNascimento);
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
