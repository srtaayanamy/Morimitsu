export default function RegistrosGraduacao() {
  return (
    <div className="p-4 text-gray-700 w-full max-sm:p-3">
      <h2 className="font-semibold text-2xl mb-4">Registros de graduação:</h2>

      <div className="bg-white p-4 rounded-xl shadow w-full overflow-x-auto max-sm:p-3">
        <div >
          <table className="w-full border-collapse text-sm text-gray-600 min-w-[500px]">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Nome</th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Data</th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Faixa anterior</th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Faixa atual</th>
              </tr>
            </thead>
            <tbody>
              {/* lista vazia por enquanto */}
              <tr>
                <td className="py-3 px-4 text-gray-400 italic" colSpan={4}>
                  Nenhum registro encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
