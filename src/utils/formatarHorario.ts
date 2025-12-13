export function formataHorario(horario:string){
    
    //Verifica se horário é padrão que retorna da API
    if (horario === '1970-01-01T00:00:00.000Z') return '00:00';

    const horarioAntigo = new Date(horario);
    
    const horarioFormatado = horarioAntigo.toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return horarioFormatado;
};



export function parseDateBRToISO(dateBR: string): string | null {
  const [day, month, year] = dateBR.split("/");

  if (!day || !month || !year) return null;

  const iso = `${year}-${month}-${day}`;
  const date = new Date(iso);

  return isNaN(date.getTime()) ? null : date.toISOString();
}