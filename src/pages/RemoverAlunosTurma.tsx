import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegaDadosTurma } from "../utils/getDadosTurma";
import { removeAlunoDaTurma } from "../utils/removerAlunoDaTurma";
import type { Turma } from "../types/Turma";
import type { Aluno } from "../types/Aluno";
import SuccessAlert from "../components/SuccessAlert";
import { ErrorMessage } from "../components/ErrorMessage";

export default function RemoverAlunosTurma() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turma, setTurma] = useState<Turma>();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | boolean>("");

  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      const dados = await pegaDadosTurma(id);

      if (typeof dados === "string") {
        setErro(dados);
      } else {
        setTurma(dados);
        setAlunos(dados.alunos || []);
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
      const result = await removeAlunoDaTurma(idAluno, id);

      if (
        typeof result === "string" &&
        result !== "Aluno removido com sucesso."
      ) {
        erros++;
      }
    }

    if (erros === 0) {
      setMensagemSucesso("Alunos removidos com sucesso!");
      setMensagemErro("");

      // Remove visualmente da lista
      setAlunos((prev) => prev.filter((a) => !ids.includes(String(a.id))));
    } else {
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
              Selecionar alunos para remoção — <strong>{turma?.nome}</strong>
            </span>
          }
        >
          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              onClick={removerSelecionados}
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
            >
              Remover alunos
            </button>
          </div>
        </PageTitle>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Mensagens de feedback */}
          {mensagemSucesso && <SuccessAlert message={mensagemSucesso} />}
          {mensagemErro && <ErrorMessage message={mensagemErro} />}
          {erro && <ErrorMessage message={erro} />}

          {loading && (
            <p className="text-center text-gray-500">Carregando...</p>
          )}

          {!loading && alunos.length > 0 && (
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="py-3 px-6 font-semibold">Nome</th>
                  <th className="py-3 px-6 font-semibold ">Apelido</th>
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

                      {/* NOME */}
                      <td className="py-3 px-6">
                        <span className="text-[#000000] hover:underline font-medium cursor-pointer">
                          {aluno.nome}
                        </span>
                      </td>

                      {/* APELIDO */}
                      <td className="py-3 px-6">{aluno.apelido || "—"}</td>

                      {/* CHECKBOX */}
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
          )}

          {!loading && alunos.length === 0 && (
            <p className="text-center text-gray-500">
              Nenhum aluno matriculado nesta turma.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
