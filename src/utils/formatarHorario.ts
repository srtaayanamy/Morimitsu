export function formataHorario(horario:string){

    const horarioAntigo = new Date(horario);

    const horarioFormatado = horarioAntigo.toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return horarioFormatado;
};