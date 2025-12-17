import { useEffect, useState } from "react";
import type { graduationRegister } from "../../types/Graduation";
import { getRegistersGraduations } from "../../HTTP/Graduation/registersGraduations";

export default function RegistrosGraduacao() {
  const [error, setError] = useState<string>();
  const [registers, setRegisters] = useState<graduationRegister[]>([]);

  useEffect(() => {
    const fetchRegistersGraduations = async () => {
      const result = await getRegistersGraduations();

      if (typeof result === "string") {
        setError(result);
        return;
      } else {
        setRegisters(result);
        return;
      }
    };

    fetchRegistersGraduations();
  }, []);

  return (
    <div className="p-4 text-gray-700 w-full max-sm:p-3">
      <h2 className="font-semibold text-2xl mb-4">Registros de graduação:</h2>

      <div className="bg-white p-4 rounded-xl shadow w-full overflow-x-auto max-sm:p-3">
        <div>
          <table className="w-full border-collapse text-sm text-gray-600 min-w-[500px]">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Nome</th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">Data</th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">
                  Faixa anterior
                </th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs">
                  Faixa atual
                </th>
              </tr>
            </thead>
            <tbody>
              {registers.length === 0 ? (
                <tr>
                  <td className="py-3 px-4 text-gray-400 italic" colSpan={4}>
                    Nenhum registro encontrado
                  </td>
                </tr>
              ) : (
                registers.map((register) => (
                  <tr key={register.id} className="border-b last:border-b-0">
                    <td className="py-2 px-2">
                      {register.student?.personal?.name ??
                        "Aluno não informado"}
                    </td>

                    <td className="py-2 px-2">
                      {new Date(register.date).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="py-2 px-2">{register.beforePromotion}</td>

                    <td className="py-2 px-2">{register.afterPromotion}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
