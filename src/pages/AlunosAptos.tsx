// pages/AlunosAptos.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { listarAlunos } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";
import BeltTag from "../components/BeltTag";
import PageTitle from "../components/PageTitle";
import ConfirmPromotionModal from "../components/ConfirmPromotionModal";
import CreateAcessModal from "../components/CreateAcessModal";
import { pegaDadosAluno } from "../utils/getDadosAluno";

const podePromover = (faixa: string): boolean => {
  return ["ROXA", "MARROM", "PRETA", "VERMELHA"].includes(faixa);
};

export default function AlunosAptos() {
  const [alunosAptos, setAlunosAptos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alunoEmPromocao, setAlunoEmPromocao] = useState<{
    id: string;
    nome: string;
    email: string;
  } | null>(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [acessoModalOpen, setAcessoModalOpen] = useState(false);

  function VerificarAptidao(aluno: Aluno){
    if(podePromover(aluno.faixa) === true && aluno.userID === null){
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      const result = await listarAlunos();

      if (typeof result === 'string') {
        setError("Erro ao carregar alunos.");
      } else {
        const aptos = (result || []).filter((aluno) =>
          VerificarAptidao(aluno)
        );
        setAlunosAptos(aptos);
      }
      setLoading(false);
    };

    fetchAlunos();
  }, []);

  // 1. Clique no botão "Promover"
  const iniciarPromocao = async (aluno: Aluno) => {
    if (!aluno.id) return;

    // Busca o e-mail real do aluno
    const dados = await pegaDadosAluno(aluno.id);

    if (!dados || typeof dados === "string" || !dados.email?.includes("@")) {
      alert(`O aluno ${aluno.nome} não tem um e-mail válido cadastrado.`);
      return;
    }

    // Guarda tudo num objeto único
    setAlunoEmPromocao({
      id: aluno.id,
      nome: aluno.nome,
      email: dados.email.trim(),
    });

    setConfirmModalOpen(true); // abre confirmação
  };

  // Fecha tudo e limpa
  const fecharFluxo = () => {
    setConfirmModalOpen(false);
    setAcessoModalOpen(false);
    setAlunoEmPromocao(null);
  };

  // Confirmar abre o modal de criar acesso
  const confirmarPromocao = () => {
    setConfirmModalOpen(false);
    setAcessoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <PageTitle title="Alunos aptos a se tornarem professores:" />

        {loading && <p className="text-center">Carregando alunos...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {alunosAptos.length === 0 ? (
              <p className="text-center text-gray-500">
                Nenhum aluno apto no momento.
              </p>
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
                        Ações
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
                        <td className="py-3 px-6">
                          <div className="flex justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => iniciarPromocao(aluno)}
                              className="bg-[#911418] text-white px-4 py-1.5 w-full rounded-full text-sm font-medium hover:bg-red-700 transition cursor-pointer"
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

      {/* Modal de Confirmação */}
      <ConfirmPromotionModal
        isOpen={confirmModalOpen}
        alunoNome={alunoEmPromocao?.nome || ""}
        onClose={fecharFluxo}
        onConfirm={confirmarPromocao}
      />

      {/* Modal de Criar Acesso*/}
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
