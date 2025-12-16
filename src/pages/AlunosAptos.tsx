// pages/AlunosAptos.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { StudentList } from "../hooks/StudentList";
import type { Student } from "../types/Student";
import BeltTag from "../components/BeltTag";
import PageTitle from "../components/PageTitle";
import ConfirmPromotionModal from "../components/ConfirmPromotionModal";
import CreateAcessModal from "../components/CreateAcessModal";
import { getStudent } from "../HTTP/Student/getStudent";
import { AgeCalculator } from "../utils/AgeCalculator";
import { Avatar } from "../components/Avatar";
import SuccessAlert from "../components/SuccessAlert";

const podePromover = (faixa: string): boolean => {
  return ["ROXA", "MARROM", "PRETA", "VERMELHA"].includes(faixa);
};

export default function AlunosAptos() {
  const [alunosAptos, setAlunosAptos] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alunoEmPromocao, setAlunoEmPromocao] = useState<{
    id: string;
    nome: string;
    email: string;
  } | null>(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [acessoModalOpen, setAcessoModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function VerificarAptidao(aluno: Student) {
    return (
      podePromover(aluno.form?.rank ? aluno.form?.rank : "") &&
      aluno.form?.userID === null
    );
  }

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      const result = await StudentList();

      if (typeof result === "string") {
        setError("Erro ao carregar alunos.");
      } else {
        const aptos = (result || []).filter((aluno) => VerificarAptidao(aluno));
        setAlunosAptos(aptos);
      }
      setLoading(false);
    };

    fetchAlunos();
  }, []);

  const iniciarPromocao = async (aluno: Student) => {
    if (!aluno.id) return;

    const dados = await getStudent(aluno.id);

    if (
      !dados ||
      typeof dados === "string" ||
      !dados.personal.email?.includes("@")
    ) {
      alert(
        `O aluno ${aluno.personal.name} não tem um e-mail válido cadastrado.`
      );
      return;
    }

    setAlunoEmPromocao({
      id: aluno.id,
      nome: aluno.personal.name ? aluno.personal.name : "",
      email: dados.personal.email.trim(),
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
        <PageTitle title="Elegíveis a professor:" />
        {successMessage && <SuccessAlert message={successMessage} />}

        {loading && <p className="text-center">Carregando alunos...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            {/* DESKTOP TABLE */}
            {alunosAptos.length === 0 ? (
              <p className="text-center text-gray-500">
                Nenhum aluno apto no momento.
              </p>
            ) : (
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
                            {aluno.personal.name}
                          </Link>
                        </td>
                        <td className="py-3 px-6">
                          {aluno.personal.nickName || "—"}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <BeltTag
                            faixa={aluno.form?.rank}
                            grau={aluno.form?.rating}
                          />
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

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-3 mt-4">
              {alunosAptos.map((a) => {
                const promover = true; // todos aqui são aptos

                return (
                  <div
                    key={a.id}
                    className="bg-[#F1F1F1] shadow-sm rounded-xl p-2 pt-5 pb-5 flex items-center gap-4"
                  >
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                      <Avatar
                        sexo={a.personal.gender}
                        idade={AgeCalculator(
                          a.personal.birthDate ? a.personal.birthDate : ""
                        )}
                        size={48}
                        noWrapper={true}
                      />
                    </div>

                    {/* Nome + apelido */}
                    <div className="flex-1">
                      <Link
                        to={`/visualizar-aluno/${a.id}`}
                        className="font-semibold text-[#1E1E1E] block leading-tight"
                      >
                        {a.personal.name}
                      </Link>
                      <span className="text-sm text-gray-600">
                        {a.personal.nickName || "—"}
                      </span>
                    </div>

                    {/* Faixa + botão */}
                    <div className="flex flex-col items-center justify-center gap-2 p-1 rounded-2xl h-10">
                      <div className="bg-white p-3 rounded-2xl w-28 shadow-sm flex flex-col items-center justify-center">
                        <BeltTag faixa={a.form?.rank} grau={a.form?.rating} />
                        <p className="text-[0.7rem] font-semibold">
                          Grau: {a.form?.rating}
                        </p>
                      </div>

                      {promover && (
                        <button
                          type="button"
                          onClick={() => iniciarPromocao(a)}
                          className="bg-[#7F1A17] text-white px-3 py-1.5 rounded-lg text-[0.7rem] font-semibold w-28"
                        >
                          Promover
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
          setSuccessMessage("Professor criado com sucesso!");
          fecharFluxo();
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        }}
      />
    </div>
  );
}
