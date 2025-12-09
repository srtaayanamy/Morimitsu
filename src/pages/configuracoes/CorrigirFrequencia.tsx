import { useEffect, useState } from "react";
import type { Frequencie } from "../../types/Frequencie";
import { getFrequencies } from "../../hooks/FrequenceList";

export default function CorrigirFrequencia() {
  const [, setFrequencieList] = useState<Frequencie[]>([])
  const [, setError] =  useState<String | undefined>(undefined);

  useEffect(() => {

    const fetchFrequencies = async () =>{

      const result = await getFrequencies();

      if(typeof result === 'string'){
        setError(result)

      }else{
        setFrequencieList(result);
      }
    }
    fetchFrequencies();
  })
  

  return (
    <div className="p-4 text-gray-700 w-full max-sm:p-3">

      <h2 className="font-semibold text-xl mb-4">Corrigir frequências:</h2>

      {/* Seletor de data */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Selecione uma data:</label>
        <input
          type="date"
          className="border rounded-md px-3 py-2 w-48"
        />
      </div>

      {/* Tabela para correção de frequência */}
      <div className="bg-white p-4 rounded-xl shadow w-full overflow-x-auto">
        <table className="w-full border-collapse text-sm text-gray-600 min-w-[500px]">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Data</th>
              <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Turma</th>
              <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Horário</th>
              <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Professor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-400">
                Nenhum registro encontrado
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
