export default function RegistrosGraduacao() {
  return (
    <div className="p-6 text-gray-700">
      <h2 className="font-semibold text-2xl mb-4">Registros de graduação:</h2>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 font-semibold">Nome</th>
                <th className="py-3 px-4 font-semibold">Data</th>
                <th className="py-3 px-4 font-semibold">Faixa anterior</th>
                <th className="py-3 px-4 font-semibold">Faixa atual</th>
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
