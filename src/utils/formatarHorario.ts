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