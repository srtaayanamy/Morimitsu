import { useEffect, useState } from "react";
import { getFrequencies } from "../../hooks/FrequenceList";
import { useNavigate } from "react-router-dom";

interface Turma {
  id: string | number;
  name: string;
}

interface Professor {
  id: string | number;
  name: string;
}

interface FrequenciaNormalizada {
  Date: string;
  class: Turma;
  teacher: Professor;
  students: any[];
}

export default function RegistrosFrequencia() {
  const [frequencieList, setFrequencieList] = useState<FrequenciaNormalizada[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFrequencies = async () => {
      if (!selectedDate && selectedDate !== "") return;

      setLoading(true);
      setError(undefined);

      const result = await getFrequencies(selectedDate || undefined);

      if (typeof result === "string") {
        setError(result);
        setFrequencieList([]);
      } else {
        const normalizado: FrequenciaNormalizada[] = result.map((freq: any) => ({
          Date: freq.Date,
          class: {
            id: freq.class?.id || freq.Class?.id,
            name:
              freq.class?.nome ||
              freq.class?.name ||
              freq.Class?.nome ||
              freq.Class?.name ||
              "—",
          },
          teacher: {
            id: freq.teacher?.id || freq.Coach?.id,
            name:
              freq.teacher?.nome ||
              freq.teacher?.name ||
              freq.Coach?.nome ||
              freq.Coach?.name ||
              "—",
          },
          students: freq.students || [],
        }));

        setFrequencieList(normalizado);
      }

      setLoading(false);
    };

    fetchFrequencies();
  }, [selectedDate]);

  return (
    <div className="p-4 text-gray-700 w-full max-sm:p-3">
      <h2 className="font-semibold text-xl mb-4 max-sm:text-lg">
        Registros de frequências
      </h2>

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 p-3 rounded">{error}</div>
      )}

      <div className="mb-4 max-sm:w-full">
        <label className="block text-sm mb-1 max-sm:text-xs">
          Selecione uma data:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-md px-3 py-2 w-48 max-sm:w-full max-sm:text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Carregando...</div>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow w-full overflow-x-auto max-sm:p-3">
          <table className="w-full border-collapse text-sm text-gray-600 min-w-[500px]">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs text-center">Data</th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs text-center">Turma</th>
                <th className="py-2 px-2 max-sm:px-1 max-sm:text-xs text-center">Professor</th>
              </tr>
            </thead>
            <tbody>
              {frequencieList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400">
                    {selectedDate
                      ? "Nenhum registro nesta data"
                      : "Selecione uma data"}
                  </td>
                </tr>
              ) : (
                frequencieList.map((freq, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td
                      className="py-3 px-2 text-center text-sm cursor-pointer text-blue-600 underline"
                      onClick={() =>
                        navigate(`/configuracoes/frequencia-do-dia`, { state: freq })
                      }
                    >
                      {new Date(freq.Date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-3 px-2 text-center font-medium">{freq.class.name}</td>
                    <td className="py-3 px-2 text-center font-medium">{freq.teacher.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
