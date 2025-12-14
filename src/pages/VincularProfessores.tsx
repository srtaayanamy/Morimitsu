import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClass } from "../HTTP/Class/getClass";
import { StudentList } from "../hooks/StudentList";
import type { Class } from "../types/Class";
import type { Student } from "../types/Student";
import BeltTag from "../components/BeltTag";
import { includeStudentInClass } from "../HTTP/Student/includeStudentInClass";
import SuccessAlert from "../components/SuccessAlert";
import { ErrorMessage } from "../components/ErrorMessage";
import { Avatar } from "../components/Avatar";
import { AgeCalculator } from "../utils/AgeCalculator";

export default function InserirAlunosTurma() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turma, setTurma] = useState<Class | null>(null);
  const [alunosTotais, setAlunosTotais] = useState<Student[]>([]);
  const [erro, setErro] = useState<string | boolean>("");
  const [loading, setLoading] = useState(true);

  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  // Filtra apenas alunos que AINDA não estão na turma
  const alunosDisponiveis = alunosTotais.filter(
    (aluno) => !turma?.students?.some((a) => a.id === aluno.id)
  );

  useEffect(() => {
    async function fetch() {
      if (!id) return;

      const turmaDados = await getClass(id);
      if (typeof turmaDados === "string") {
        setErro(turmaDados);
      } else {
        setTurma(turmaDados);
      }

      const lista = await StudentList();
      if (typeof lista !== "string") {
        setAlunosTotais(lista || []);
      }

      setLoading(false);
    }
    fetch();
  }, [id]);

  const toggleSelecionado = (idAluno: string) => {
    setSelecionados((prev) => ({
      ...prev,
      [idAluno]: !prev[idAluno],
    }));
  };

  const inserirAlunos = async () => {
    if (!id) return;

    const idsSelecionados = Object.keys(selecionados).filter(
      (idAluno) => selecionados[idAluno]
    );

    if (idsSelecionados.length === 0) {
      setMensagemErro("Selecione pelo menos um aluno.");
      setMensagemSucesso("");
      return;
    }

    setMensagemErro("");
    setMensagemSucesso("");
    setLoading(true);

    let sucessos = 0;
    let erros = 0;
    const errosDetalhados: string[] = [];

    for (const idAluno of idsSelecionados) {
      const resultado = await includeStudentInClass(idAluno, id);

      if (resultado === true) {
        sucessos++;
      } else {
        erros++;
        if (typeof resultado === "string") {
          errosDetalhados.push(resultado);
        }
      }
    }

    setLoading(false);

    if (erros === 0) {
      // ✔ Tudo certo → mostra sucesso e volta para tela anterior
      setMensagemSucesso(
        `Todos os ${sucessos} aluno(s) foram adicionados com sucesso!`
      );
      setTimeout(() => navigate(-1), 300);
    } else {
      setMensagemSucesso(
        sucessos > 0 ? `${sucessos} aluno(s) adicionado(s).` : ""
      );
      setMensagemErro(
        `${erros} aluno(s) não foram adicionados: ${errosDetalhados
          .slice(0, 3)
          .join(" | ")}`
      );
    }

    // Limpa seleção
    setSelecionados({});
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <PageTitle
          title={
            <span>
              Inserir alunos à turma <strong>{turma?.name || "..."}</strong>:
            </span>
          }
        >
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:opacity-90"
            >
              Cancelar
            </button>

            <button
              onClick={inserirAlunos}
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:opacity-90"
            >
              Inserir alunos
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

          {!loading && alunosDisponiveis.length > 0 && (
            <>
              {/* Desktop Table */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 font-semibold">Nome</th>
                      <th className="py-3 px-6 font-semibold">Apelido</th>
                      <th className="py-3 px-6 font-semibold text-center">
                        Faixa atual
                      </th>
                      <th className="py-3 px-6 font-semibold text-center">
                        Selecionar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosDisponiveis.map((aluno) => {
                      const idStr = String(aluno.id);
                      return (
                        <tr
                          key={idStr}
                          className="bg-white shadow-sm rounded-xl hover:bg-gray-50"
                        >
                          <td className="py-3 px-6 font-medium">
                            {aluno.personal.name}
                          </td>
                          <td className="py-3 px-6">{aluno.personal.nickName || "—"}</td>
                          <td className="py-3 px-6 text-center">
                            <BeltTag faixa={aluno.form?.rank} grau={aluno.form?.rating} />
                          </td>
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

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {alunosDisponiveis.map((aluno) => {
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
                          {aluno.personal.nickName || "—"}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="bg-white p-2 rounded-xl w-20 shadow-sm flex flex-col items-center">
                          <BeltTag faixa={aluno.form?.rank} grau={aluno.form?.rating} />
                          <p className="text-[0.5rem] font-semibold pt-0.5">
                            {aluno.form?.rating}º
                          </p>
                        </div>

                        <input
                          type="checkbox"
                          checked={!!selecionados[idStr]}
                          onChange={() => toggleSelecionado(idStr)}
                          className="w-5 h-5 accent-[#1E1E1E] mt-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Botões Mobile */}
          <div className="flex md:hidden gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl text-sm font-medium w-full"
            >
              Cancelar
            </button>

            <button
              onClick={inserirAlunos}
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-sm font-medium w-full"
            >
              Inserir alunos
            </button>
          </div>

          {!loading && alunosDisponiveis.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              {turma?.students && turma.students.length > 0
                ? "Todos os alunos já estão nesta turma."
                : "Nenhum aluno disponível para adicionar."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
