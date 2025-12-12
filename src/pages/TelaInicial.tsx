import { Link } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";
import Header from "../components/Header";
import SectionCard from "../components/SectionCard";
import { useEffect, useState } from "react";
import { listarTurmas } from "../hooks/ListaTurmas";
import type { Turma } from "../types/Turma";
import TurmaCard from "../components/TurmaCard";
import BirthdayCard from "../components/BirthdayCard";
import { filtrarAniversariantes } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";
import Calendario from "../components/Calendario";
import { SquarePen } from "lucide-react";
import BeltTag from "../components/BeltTag";
import { Avatar } from "../components/Avatar";
import EventModal from "../components/EventModal";
import type { event } from "../types/event";
import { eventList } from "../hooks/eventList";


export default function TelaInicial() {
  //Variáveis de estado
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorTurmas, setErrorTurmas] = useState<string | null>(null);
  const [errorEvents, setErrorEvents] = useState<string | null>(null);
  const [events, setEvents] = useState<event[]>()
  const [errorAniversariantes, setErrorAniversariantes] = useState<
    string | null
  >(null);
  const [aniversariantes, SetAniversariantes] = useState<Aluno[]>([]);
  const role = localStorage.getItem("role");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const fecharModal = () => setModalOpen(false);

  const salvarEvento = () => {
    console.log("Evento criado:");
    fecharModal();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const result = await eventList();

      if (typeof result === "string") {
        setErrorEvents(result);
      } else {
        setEvents(result);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      const result = await listarTurmas();

      if (result === false) {
        setErrorTurmas("Erro ao carregar turmas.");
      } else {
        setTurmas(result);
      }

      setLoading(false);
    };

    fetchTurmas();
  }, []);

  //Pega os aniversariantes do mês assim que a tela se inicia
  useEffect(() => {
    const fetchAniversariantes = async () => {
      setLoading(true);
      const result = await filtrarAniversariantes();

      if (result === undefined) {
        setErrorAniversariantes("Erro ao carregar aniversariantes.");
      } else {
        SetAniversariantes(result);
      }

      setLoading(false);
    };

    fetchAniversariantes();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000]">
      {/* HEADER - Menu */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="p-4 sm:p-6 md:p-8 space-y-3 mx-auto">
        {/* SEÇÃO TURMAS */}
        <SectionCard title="Turmas">
          <div className="relative">
            {/* Botão esquerdo */}
            <button
              onClick={() => {
                const el = document.getElementById("carrossel-turmas");
                if (el) el.scrollBy({ left: -250, behavior: "smooth" });
              }}
              className="absolute hidden sm:block left-0 top-1/2 -translate-y-1/2 z-10 bg-black/25 text-white px-3 py-2 rounded-full hover:bg-black/60"
            >
              ◀
            </button>

            {/* Carrossel */}
            <div
              id="carrossel-turmas"
              className="flex flex-nowrap gap-4 sm:gap-5 overflow-x-scroll pb-3 sm:pb-4 px-1 sm:px-2 scroll-smooth scrollbar-hide"
            >
              {role === "ADMIN" && (
                <Link to="/registrar-turma" className="flex-shrink-0">
                  <button className="w-36 sm:w-44 h-30 sm:h-35 bg-[#1D1E1E] rounded-xl flex flex-col items-center justify-center text-white font-semibold hover:opacity-90 transition cursor-pointer">
                    <Plus className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
                    Criar turma
                  </button>
                </Link>
              )}

              {loading && (
                <div className="flex items-center justify-center w-full h-40">
                  <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
                </div>
              )}
              {errorTurmas && <p className="text-red-500">{errorTurmas}</p>}

              {!loading &&
                !errorTurmas &&
                turmas.map((turma) => (
                  <div key={turma.id} className="flex-shrink-0">
                    <TurmaCard
                      id={turma.id}
                      nome={turma.nome}
                      imagem={turma.URLImage}
                    />
                  </div>
                ))}
            </div>

            {/* Botão direito */}
            <button
              onClick={() => {
                const el = document.getElementById("carrossel-turmas");
                if (el) el.scrollBy({ left: 250, behavior: "smooth" });
              }}
              className="absolute hidden sm:block right-0 top-1/2 -translate-y-1/2 z-10 bg-black/25 text-white px-3 py-2 rounded-full hover:bg-black/60"
            >
              ▶
            </button>
          </div>
        </SectionCard>

        {/* SEÇÃO PRÓXIMOS GRADUANDOS */}
        <SectionCard title="Próximos graduandos">
          {/* aqui é só substituir depois por uma chamada real */}
          {/* esse mock é só pra arrumar o estilo, pode apagar dpeois e inserir os dados reais */}
          {(() => {
            const graduandosMock = [
              {
                id: "1",
                nome: "Carlos Eduardo Silva",
                apelido: "",
                turma: "Turma Mista",
                data: "08/09/2025",
                faixaAtual: "BRANCA",
                grauAtual: 0,
                proximaFaixa: "AZUL",
                proximoGrau: 1,
              },
              {
                id: "2",
                nome: "Carlos Henrique Silva",
                apelido: "",
                turma: "Turma Mista",
                data: "08/09/2025",
                faixaAtual: "BRANCA",
                grauAtual: 0,
                proximaFaixa: "AZUL",
                proximoGrau: 1,
              },
              {
                id: "3",
                nome: "Juliana Alexana",
                apelido: "",
                turma: "Turma Mista",
                data: "08/09/2025",
                faixaAtual: "PRETA",
                grauAtual: 6,
                proximaFaixa: "CORAL",
                proximoGrau: 7,
              },
            ];

            return (
              <>
                {/* MOBILE */}
                <div className="md:hidden space-y-3">
                  {graduandosMock.map((g) => (
                    <div
                      key={g.id}
                      className="bg-[#F1F1F1] shadow-sm rounded-xl p-4 pt-5 pb-5 flex items-center gap-4"
                    >
                      {/* Avatar*/}
                      <div className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                        {/* placeholder de avatar — IMPLEMENTAR DADOS REAIS*/}
                        <Avatar
                          sexo={"male"}
                          idade={6}
                          size={48}
                          noWrapper={true}
                        />
                      </div>

                      {/* Texto principal */}
                      <div className="flex-1">
                        <Link
                          to={`/visualizar-aluno/${g.id}`}
                          className="font-semibold text-[#1E1E1E] block leading-tight"
                        >
                          {g.nome}
                        </Link>

                        <div className="flex flex-col leading-tight mt-1">
                          <span className="text-[0.8rem] text-gray-600">
                            {g.turma}
                          </span>
                          <span className="text-[0.75rem] text-gray-500">
                            {g.data}
                          </span>
                        </div>
                      </div>

                      {/* Faixas */}
                      <div className="flex flex-col items-center justify-center gap-2 p-1 rounded-2xl h-10">
                        <div className="bg-white p-3 rounded-2xl w-36 shadow-sm flex items-center justify-between">
                          {/* Faixa atual */}
                          <div className="flex flex-col items-center">
                            <BeltTag faixa={g.faixaAtual} grau={g.grauAtual} />
                            <p className="text-[0.65rem] font-semibold mt-1">
                              Grau: {g.grauAtual}
                            </p>
                          </div>

                          {/* Seta */}
                          <div className="px-2 text-gray-400">→</div>

                          {/* Próxima faixa */}
                          <div className="flex flex-col items-center">
                            <BeltTag
                              faixa={g.proximaFaixa}
                              grau={g.proximoGrau}
                            />
                            <p className="text-[0.65rem] font-semibold mt-1">
                              Grau: {g.proximoGrau}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                          Turma
                        </th>
                        <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                          Data
                        </th>
                        <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                          Faixa atual
                        </th>
                        <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                          Próxima faixa
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {graduandosMock.map((g) => (
                        <tr
                          key={g.id}
                          className="bg-[#FFFFFF] shadow-sm rounded-xl hover:bg-gray-50 transition"
                        >
                          <td className="py-3 px-6 font-medium">{g.nome}</td>
                          <td className="py-3 px-6">{g.turma}</td>
                          <td className="py-3 px-6 text-center">{g.data}</td>
                          <td className="py-3 px-6 text-center">
                            <BeltTag faixa={g.faixaAtual} grau={g.grauAtual} />
                          </td>
                          <td className="py-3 px-6 text-center">
                            <BeltTag
                              faixa={g.proximaFaixa}
                              grau={g.proximoGrau}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </SectionCard>

        {/* SEÇÃO ANIVERSARIANTES DO MÊS */}
        <SectionCard title="Aniversariantes do mês">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible ">
            {loading && (
              <div className="flex items-center justify-center w-full h-40">
                <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
              </div>
            )}

            {errorAniversariantes && (
              <p className="text-red-500">{errorAniversariantes}</p>
            )}

            {!loading && aniversariantes.length === 0 && (
              <p className="text-gray-600 text-sm">
                Nenhum aniversariante no restante do mês 🎂
              </p>
            )}

            {!loading &&
              aniversariantes.map((aluno) => (
                <BirthdayCard
                  key={aluno.id}
                  nome={aluno.nome}
                  data={new Date(aluno.dataNascimento).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                    }
                  )}
                  sexo={
                    aluno.sexo === "male" || aluno.sexo === "female"
                      ? aluno.sexo
                      : "male"
                  }
                />
              ))}
          </div>
        </SectionCard>

        {/* SEÇÃO CALENDÁRIO */}
        <SectionCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl text-[#1E1E1E] font-semibold mb-3">
              Calendário
            </h2>
            <div className="flex flex-row gap-2 sm:gap-3 items-center">
              <SquarePen className="w-7 h-7 sm:w-9 sm:h-9 text-[#1E1E1E]" />

              <button
                onClick={abrirModal}
                className="bg-black cursor-pointer text-white rounded-md px-3 py-1.5 text-sm sm:text-md sm:px-4 sm:py-2 hover:bg-gray-800 transition flex items-center gap-2"
              >
                Criar novo evento
              </button>
            </div>
          </div>
          {/* conteúdo do calendário */}
          <Calendario />
        </SectionCard>
      </main>
      <EventModal
        isOpen={modalOpen}
        onClose={fecharModal}
        onSave={salvarEvento}
        turmas={turmas}
      />
    </div>
  );
}
