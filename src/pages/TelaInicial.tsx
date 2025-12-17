import { Link } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";
import Header from "../components/Header";
import SectionCard from "../components/SectionCard";
import { useEffect, useState } from "react";
import SuccessAlert from "../components/SuccessAlert";
import { ErrorMessage } from "../components/ErrorMessage";
import { ClassList } from "../hooks/ClassList";
import type { Class } from "../types/Class";
import TurmaCard from "../components/TurmaCard";
import BirthdayCard from "../components/BirthdayCard";
import {
  filtrarAniversariantes,
  NextGraduantionsPeople,
} from "../hooks/StudentList";
import type { Student } from "../types/Student";
import Calendario from "../components/Calendario";
import { SquarePen } from "lucide-react";
import EventModal from "../components/EventModal";
import type { event } from "../types/Event";
import { eventList } from "../hooks/eventList";
import { registerEvent } from "../HTTP/Event/registerEvent";
import Cookies from "js-cookie";
import GraduandosSection from "../components/GraduandosSection";
import { deleteEvent } from "../HTTP/Event/deleteEvent";
import type { NextGraduantionStudent } from "../types/Graduation";

export default function TelaInicial() {
  //Variáveis de estado
  const [turmas, setTurmas] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorTurmas, setErrorTurmas] = useState<string | null>(null);
  const [, setErrorEvents] = useState<string | null>(null);
  const [events, setEvents] = useState<event[]>();
  const [errorAniversariantes, setErrorAniversariantes] = useState<
    string | null
  >(null);
  const [aniversariantes, SetAniversariantes] = useState<Student[]>([]);
  const [nextGraduantions, setNextGraduantions] = useState<
    NextGraduantionStudent[]
  >([]);
  const [errorNextGraduantions, setErrorNextGraduantions] = useState<
    string | null
  >(null);
  const role = Cookies.get("role");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const fecharModal = () => setModalOpen(false);
  const [editandoCalendario, setEditandoCalendario] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | boolean>(false);

  const salvarEvento = async (data: {
    nome: string;
    data: string;
    turma: string;
  }) => {
    setErrorMsg(false);
    setSuccessMsg("");
    const { nome, data: dateValue, turma } = data;

    const result = await registerEvent(nome, dateValue, turma);

    if (result === true) {
      setSuccessMsg("Evento criado com sucesso!");

      // Atualizar lista de eventos após salvar
      const updated = await eventList();
      if (typeof updated !== "string") {
        setEvents(updated);
      }

      fecharModal();
    } else {
      setErrorMsg(result);
    }
  };

  const deletarEvento = async (eventId: string) => {
    const result = await deleteEvent(eventId);

    if (result === true) {
      setSuccessMsg("Evento removido com sucesso!");

      const updated = await eventList();
      if (typeof updated !== "string") {
        setEvents(updated);
      }
    } else {
      setErrorMsg(result);
    }
  };

  useEffect(() => {
    if (!errorMsg) return;

    const timer = setTimeout(() => {
      setErrorMsg(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  useEffect(() => {
    const fetchNextGraduantions = async () => {
      setLoading(true);
      const result = await NextGraduantionsPeople();

      if (typeof result === "string") {
        setErrorNextGraduantions(result);
      } else {
        setNextGraduantions(result);
      }

      setLoading(false);
    };

    fetchNextGraduantions();
  }, []);

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
      const result = await ClassList();

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
                      nome={turma.name}
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
        {role === "ADMIN" && (
          <GraduandosSection
            title="Próximos graduandos"
            loading={loading}
            error={errorNextGraduantions}
            graduandos={nextGraduantions.map((aluno) => ({
              id: aluno.id,
              nome: aluno.name,
              apelido: "",
              faixaAtual: aluno.from_rank,
              grauAtual: 0, // se o backend não envia, mantemos 0
              proximaFaixa: aluno.to_rank,
              proximoGrau: 0, // idem
            }))}
          />
        )}

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
                  nome={aluno.personal.name ? aluno.personal.name : ""}
                  data={new Date(
                    aluno.personal.birthDate ? aluno.personal.birthDate : ""
                  ).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                  sexo={
                    aluno.personal.gender === "male" ||
                    aluno.personal.gender === "female"
                      ? aluno.personal.gender
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

            {/* AÇÕES */}
            {!editandoCalendario ? (
              <div className="flex flex-row gap-2 sm:gap-3 items-center">
                <button
                  onClick={() => setEditandoCalendario(true)}
                  className="flex items-center gap-2 text-[#1E1E1E] hover:opacity-70 transition"
                >
                  <SquarePen className="w-7 h-7 sm:w-9 sm:h-9 cursor-pointer" />
                  <span className="hidden sm:inline font-medium"></span>
                </button>

                <button
                  onClick={abrirModal}
                  className="bg-black cursor-pointer text-white rounded-md px-3 py-1.5 text-sm sm:text-md sm:px-4 sm:py-2 hover:bg-gray-800 transition flex items-center gap-2"
                >
                  Criar novo evento
                </button>
              </div>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setEditandoCalendario(false)}
                  className="bg-[#7F1A17] text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-sm hover:opacity-90 transition cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => setEditandoCalendario(false)}
                  className="bg-black text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-sm hover:bg-gray-800 transition cursor-pointer"
                >
                  Salvar alterações
                </button>
              </div>
            )}
          </div>
          {successMsg && <SuccessAlert message={successMsg} />}
          <ErrorMessage message={errorMsg} />

          {/* conteúdo do calendário */}
          <Calendario
            events={events}
            editando={editandoCalendario}
            onDeleteEvent={deletarEvento}
            onEventsChange={setEvents}
          />
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
