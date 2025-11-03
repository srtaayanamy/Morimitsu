export default function CorrigirFrequencia() {
  return (
    <div className="p-4 text-gray-700 w-full">

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
        <table className="w-full border-collapse text-sm text-gray-600">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2 px-2">Data</th>
              <th className="py-2 px-2">Turma</th>
              <th className="py-2 px-2">Horário</th>
              <th className="py-2 px-2">Professor</th>
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
