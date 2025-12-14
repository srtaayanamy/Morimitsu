import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClass } from "../HTTP/Class/getClass";
import { removeStudentInClass } from "../HTTP/Student/removeStudentInClass";
import type { Class } from "../types/Class";
import type { Student } from "../types/Student";
import SuccessAlert from "../components/SuccessAlert";
import { ErrorMessage } from "../components/ErrorMessage";
import { Avatar } from "../components/Avatar";
import { AgeCalculator } from "../utils/AgeCalculator";

export default function RemoverAlunosTurma() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turma, setTurma] = useState<Class>();
  const [alunos, setAlunos] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | boolean>("");

  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      const dados = await getClass(id);

      if (typeof dados === "string") {
        setErro(dados);
      } else {
        setTurma(dados);
        setAlunos(dados.students || []);
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  const toggleSelecionado = (idAluno: string) => {
    setSelecionados((prev) => ({
      ...prev,
      [idAluno]: !prev[idAluno],
    }));
  };

  const removerSelecionados = async () => {
    if (!id) return;

    const ids = Object.keys(selecionados).filter(
      (idAluno) => selecionados[idAluno]
    );

    if (ids.length === 0) {
      setMensagemErro("Selecione pelo menos um aluno para remover.");
      setMensagemSucesso("");
      return;
    }

    let erros = 0;

    for (const idAluno of ids) {
      const result = await removeStudentInClass(idAluno, id);

      // Se houver um erro diferente da mensagem padrão, conta como erro
      if (
        typeof result === "string"
      ) {
        erros++;
      }
    }

    if (erros === 0) {
      // Sucesso → mensagem (rápida) e volta
      setMensagemSucesso("Alunos removidos com sucesso!");
      setMensagemErro("");

      // delay curto para permitir mostrar sucesso (100–300ms)
      setTimeout(() => {
        navigate(-1);
      }, 300);
    } else {
      // Se houve erros → mostra mensagem
      setMensagemErro(`Alguns alunos não puderam ser removidos (${erros}).`);
      setMensagemSucesso("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <PageTitle
          title={
            <span>
              Remover alunos da turma <strong>{turma?.name}</strong>
            </span>
          }
        >
          {/* Botões Desktop */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Cancelar
            </button>

            <button
              onClick={removerSelecionados}
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Remover alunos
            </button>
          </div>
        </PageTitle>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {mensagemSucesso && <SuccessAlert message={mensagemSucesso} />}
          {mensagemErro && <ErrorMessage message={mensagemErro} />}
          {erro && <ErrorMessage message={erro} />}

          {loading && (
            <p className="text-center text-gray-500">Carregando...</p>
          )}

          {/* DESKTOP TABLE */}
          {!loading && alunos.length > 0 && (
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="py-3 px-6 font-semibold">Nome</th>
                    <th className="py-3 px-6 font-semibold">Apelido</th>
                    <th className="py-3 px-6 font-semibold text-center">
                      Selecionar
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {alunos.map((aluno) => {
                    const idStr = String(aluno.id);

                    return (
                      <tr
                        key={idStr}
                        className="bg-[#FFFFFF] shadow-sm rounded-xl hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-6 font-medium">{aluno.personal.name}</td>
                        <td className="py-3 px-6">{aluno.personal.nickName || "—"}</td>

                        <td className="py-3 px-6 text-center">
                          <input
                            type="checkbox"
                            checked={!!selecionados[idStr]}
                            onChange={() => toggleSelecionado(idStr)}
                            className="w-5 h-5 accent-[#1E1E1E]"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* MOBILE CARDS */}
          {!loading && alunos.length > 0 && (
            <div className="md:hidden space-y-3">
              {alunos.map((aluno) => {
                const idStr = String(aluno.id);
                return (
                  <div
                    key={idStr}
                    className="bg-white shadow-sm rounded-xl p-3 flex items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-lg bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                      <Avatar
                        sexo={aluno.personal.gender}
                        idade={AgeCalculator(aluno.personal.birthDate ? aluno.personal.birthDate : '')}
                        size={40}
                        noWrapper
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-sm">{aluno.personal.name}</p>
                      <span className="text-xs text-gray-600">
                        {aluno.personal.name || "—"}
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={!!selecionados[idStr]}
                      onChange={() => toggleSelecionado(idStr)}
                      className="w-5 h-5 accent-[#1E1E1E]"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* BOTÕES MOBILE — sempre no final */}
          <div className="flex md:hidden gap-2 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl text-sm font-medium w-full"
            >
              Cancelar
            </button>

            <button
              onClick={removerSelecionados}
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-sm font-medium w-full"
            >
              Remover alunos
            </button>
          </div>

          {!loading && alunos.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhum aluno matriculado nesta turma.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
