import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import type { Professor } from "../types/Professor";
import { listarProfessores } from "../hooks/ListaProfessores";
import BeltTag from "../components/BeltTag";

export default function Professores() {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [Professores, setProfessores] = useState<Professor[]>([])

  useEffect(() => {
      const fetchProfessores = async () => {
        setLoading(true);
        const result = await listarProfessores();
  
        if (result === false) {
          setError("Erro ao carregar professores.");
        } else if(typeof result ===  'string'){
          setError(result)
        } else {
          setProfessores(result || []);
        }
  
        setLoading(false);
      };
  
      fetchProfessores();
    }, []);
  
  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        {/* Cabeçalho da página */}
        <PageTitle title="Professores:">
          <Link to="/alunos-aptos">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
            >
              Promover aluno a professor
            </button>
          </Link>
        </PageTitle>
        {/* Conteúdo */}
        {loading && <p>Carregando professores...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {Professores.length === 0 ? (
              <p>Nenhum professor encontrado.</p>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 font-semibold text-[#1E1E1E]">
                        Nome
                      </th>
                      <th className="py-3 px-6 font-semibold text-[#1E1E1E]">
                        Apelido
                      </th>
                      <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                        Faixa atual
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Professores.map((professor) => (
                      <tr
                        key={professor.id}
                        className="bg-[#FFFFFF] shadow-sm rounded-xl hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-6 rounded-l-xl">
                          <Link
                            to={`/visualizar-aluno/${professor.studentId}`}
                            className="text-[#000000] hover:underline font-medium"
                          >
                            {professor.nome}
                          </Link>
                        </td>
                        <td className="py-3 px-6">{professor.apelido || "—"}</td>
                        <td className="py-3 px-6 rounded-r-xl text-center">
                          <BeltTag faixa={professor.faixa} grau={professor.grau} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
