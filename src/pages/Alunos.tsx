// src/pages/Alunos.tsx
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { listarAlunos } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";
import BeltTag from "../components/BeltTag";
import ConfirmPromotionModal from "../components/ConfirmPromotionModal";
import CreateAcessModal from "../components/CreateAcessModal";
import { Avatar } from "../components/Avatar";
import { calcularIdade } from "../utils/CalcularIdade";
import { pegaDadosAluno } from "../utils/getDadosAluno";

const podePromover = (faixa: string): boolean => {
  return ["ROXA", "MARROM", "PRETA", "VERMELHA"].includes(faixa);
};

export default function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [alunoEmPromocao, setAlunoEmPromocao] = useState<{
    id: string;
    nome: string;
    email: string;
  } | null>(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [acessoModalOpen, setAcessoModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      const result = await listarAlunos();

      if (typeof result === "string") {
        setError("Erro ao carregar alunos.");
      } else {
        setAlunos(result || []);
      }
      setLoading(false);
    };

    fetchAlunos();
  }, []);

  const iniciarPromocao = async (aluno: Aluno) => {
    if (!aluno.id) return;

    const dados = await pegaDadosAluno(aluno.id);

    if (!dados || typeof dados === "string" || !dados.email?.includes("@")) {
      alert(`O aluno ${aluno.nome} não tem um e-mail válido cadastrado.`);
      return;
    }

    setAlunoEmPromocao({
      id: aluno.id,
      nome: aluno.nome,
      email: dados.email.trim(),
    });

    setConfirmModalOpen(true);
  };

  const fecharFluxo = () => {
    setConfirmModalOpen(false);
    setAcessoModalOpen(false);
    setAlunoEmPromocao(null);
  };

  const confirmarPromocao = () => {
    setConfirmModalOpen(false);
    setAcessoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Alunos matriculados:
          </h1>

          <Link to="/registrar-aluno">
            <button
              type="button"
              className="bg-[#1E1E1E] md:bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
            >
              Cadastrar aluno
            </button>
          </Link>
        </div>

        {loading && <p>Carregando alunos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="rounded-2xl p-2 shadow">
            {alunos.length === 0 ? (
              <p>Nenhum aluno encontrado.</p>
            ) : (
              <>
                {/* MOBILE */}
                <div className="md:hidden space-y-3">
                  {alunos.map((aluno) => {
                    const promover =
                      podePromover(aluno.faixa) && aluno.userID === null;

                    return (
                      <div
                        key={aluno.id}
                        className="bg-[#F1F1F1] shadow-sm rounded-xl p-4 pt-5 pb-5 flex items-center gap-4"
                      >
                        <div className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                          <Avatar
                            sexo={aluno.sexo}
                            idade={calcularIdade(aluno.dataNascimento)}
                            size={48}
                            noWrapper={true}
                          />
                        </div>

                        <div className="flex-1">
                          <Link
                            to={`/visualizar-aluno/${aluno.id}`}
                            className="font-semibold text-[#1E1E1E] block leading-tight"
                          >
                            {aluno.nome}
                          </Link>
                          <span className="text-sm text-gray-600">
                            {aluno.apelido || "—"}
                          </span>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2 p-1 rounded-2xl h-10">
                          <div className="bg-white p-3 rounded-2xl w-28 shadow-sm flex flex-col items-center justify-center">
                            <BeltTag faixa={aluno.faixa} grau={aluno.grau} />
                            <p className="text-[0.7rem] font-semibold">
                              Grau: {aluno.grau}
                            </p>
                          </div>

                          {promover && (
                            <button
                              className="bg-[#7F1A17] text-white px-3 py-1.5 rounded-lg text-[0.7rem] font-semibold w-28"
                              onClick={() => iniciarPromocao(aluno)}
                            >
                              Promover
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* DESKTOP */}
                <div className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto hidden md:block">
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
                      {alunos.map((aluno) => {
                        const promover =
                          podePromover(aluno.faixa) && aluno.userID === null;

                        return (
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

                            <td className="py-3 px-6">
                              {aluno.apelido || "—"}
                            </td>

                            <td className="py-3 px-6 text-center">
                              <BeltTag faixa={aluno.faixa} grau={aluno.grau} />
                            </td>

                            <td className="py-3 px-6 rounded-r-xl">
                              {promover ? (
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    className="bg-[#1D1E1E] w-full text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
                                    onClick={() => iniciarPromocao(aluno)}
                                  >
                                    Promover
                                  </button>
                                </div>
                              ) : (
                                <div className="h-10 flex items-center">
                                  <span className="text-gray-400 text-sm"></span>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <ConfirmPromotionModal
        isOpen={confirmModalOpen}
        alunoNome={alunoEmPromocao?.nome || ""}
        onClose={fecharFluxo}
        onConfirm={confirmarPromocao}
      />

      <CreateAcessModal
        isOpen={acessoModalOpen}
        alunoId={alunoEmPromocao?.id || ""}
        alunoNome={alunoEmPromocao?.nome || ""}
        alunoEmail={alunoEmPromocao?.email}
        onClose={fecharFluxo}
        onSuccess={() => {
          alert("Professor criado com sucesso!");
          fecharFluxo();
        }}
      />
    </div>
  );
}
