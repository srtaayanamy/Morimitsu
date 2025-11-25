import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegaDadosTurma } from "../utils/getDadosTurma";
import { listarAlunos } from "../hooks/ListaAlunos";
import type { Turma } from "../types/Turma";
import type { Aluno } from "../types/Aluno";
import BeltTag from "../components/BeltTag";
import { enturmaAluno } from "../utils/enturmarAluno";
import SuccessAlert from "../components/SuccessAlert"; 
import { ErrorMessage } from "../components/ErrorMessage"; 

export default function InserirAlunosTurma() {
  const { id } = useParams();
  const [turma, setTurma] = useState<Turma>();
  const [erro, setErro] = useState<string | boolean>("");

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    async function fetch() {
      if (!id) return;

      // Carrega turma
      const turmaDados = await pegaDadosTurma(id);
      if (typeof turmaDados === "string") {
        setErro(turmaDados);
      } else {
        setTurma(turmaDados);
      }

      // Carrega a mesma lista da tela Alunos
      const lista = await listarAlunos();
      if (typeof lista !== 'string') {
        setAlunos(lista || []);
      }

      setLoading(false);
    }
    fetch();
  }, [id]);

  const toggleSelecionado = (id: string) => {
    setSelecionados((prev) => ({
      ...prev,
      [id]: !prev[id],
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

    let erros = 0;

    for (const idAluno of idsSelecionados) {
      const result = await enturmaAluno(idAluno, id);

      if (
        typeof result === "string" &&
        result !== "Aluno enturmado com sucesso."
      ) {
        erros++;
        console.log("Erro ao enturmar:", result);
      }
    }

    // Limpa mensagens anteriores
    setMensagemErro("");
    setMensagemSucesso("");

    if (erros === 0) {
      setMensagemSucesso("Todos os alunos foram adicionados à turma!");
    } else {
      setMensagemErro(
        `Alguns alunos não puderam ser adicionados. (${erros} erro(s))`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <PageTitle
          title={
            <span>
              Inserir alunos à turma <strong>{turma?.nome || "..."}</strong>:
            </span>
          }
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={inserirAlunos}
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
            >
              Inserir alunos
            </button>
          </div>
        </PageTitle>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Mensagens de feedback */}
          {mensagemSucesso && (
            <SuccessAlert message={mensagemSucesso} />
          )}
          {mensagemErro && (
            <ErrorMessage message={mensagemErro} />
          )}
          {erro && <ErrorMessage message={erro} />}

          {loading && (
            <p className="text-center text-gray-500">Carregando...</p>
          )}

          {!loading && alunos.length > 0 && (
            <div className="overflow-x-auto">
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

                        {/* CÍRCULO DA FAIXA */}
                        <td className="py-3 px-6 text-center">
                          <BeltTag faixa={aluno.faixa} grau={aluno.grau} />
                        </td>

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
            </div>
          )}

          {!loading && alunos.length === 0 && (
            <p className="text-center text-gray-500">
              Nenhum aluno encontrado.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}