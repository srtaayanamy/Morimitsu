// src/pages/AlunosAptos.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { listarAlunos } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";
import BeltTag from "../components/BeltTag";
import PageTitle from "../components/PageTitle";
import ConfirmPromotionModal from "../components/ConfirmPromotionModal";

const podePromover = (faixa: string): boolean => {
  return ["ROXA", "MARROM", "PRETA", "VERMELHA"].includes(faixa);
};

export default function AlunosAptos() {
  const [alunosAptos, setAlunosAptos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      const result = await listarAlunos();

      if (result === false) {
        setError("Erro ao carregar alunos.");
      } else {
        const aptos = (result || []).filter((aluno) => podePromover(aluno.faixa));
        setAlunosAptos(aptos);
      }
      setLoading(false);
    };

    fetchAlunos();
  }, []);

  const openModal = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAluno(null);
  };

  const handleConfirm = () => {
    console.log("Promovendo aluno:", selectedAluno?.nome);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        {/* Título com PageTitle (sem botão) */}
        <PageTitle title="Alunos aptos a se tornarem professores:" />

        {loading && <p>Carregando alunos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {alunosAptos.length === 0 ? (
              <p>Nenhum aluno apto no momento.</p>
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
                      <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                        Promover a professor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosAptos.map((aluno) => (
                      <tr
                        key={aluno.id}
                        className="bg-[#FFFFFF] shadow-sm rounded-xl hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-6">
                          <Link
                            to={`/visualizar-aluno/${aluno.id}`}
                            className="text-[#000000] hover:underline font-medium"
                          >
                            {aluno.nome}
                          </Link>
                        </td>
                        <td className="py-3 px-6">{aluno.apelido || "—"}</td>
                        <td className="py-3 px-6 text-center">
                          <BeltTag faixa={aluno.faixa} grau={aluno.grau} />
                        </td>
                        <td className="py-3 px-6 rounded-r-xl">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => openModal(aluno)}
                              className="bg-[#1D1E1E] w-full text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
                            >
                              Promover
                            </button>
                          </div>
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

      <ConfirmPromotionModal
        isOpen={modalOpen}
        alunoNome={selectedAluno?.nome || ""}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}