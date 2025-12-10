import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Clock, Pen } from "lucide-react";
import Header from "../components/Header";
import ImageOverlay from "../components/ImageOverlay";
import ClockOverlay from "../components/ClockOverlay";
import { cadastrarTurma } from "../utils/CadastrarTurma";
import { ErrorMessage } from "../components/ErrorMessage";
import PageTitle from "../components/PageTitle";
import type { Professor } from "../types/Professor";
import { listarProfessores } from "../hooks/ListaProfessores";

import capa1 from "../assets/presets/capaturma1.png";
import capa2 from "../assets/presets/capaturma2.png";
import capa3 from "../assets/presets/capaturma3.png";
import capa4 from "../assets/presets/capaturma4.png";
import capa5 from "../assets/presets/capaturma5.png";
import capa6 from "../assets/presets/capaturma6.png";
import capa7 from "../assets/presets/capaturma7.png";
import capa8 from "../assets/presets/capaturma8.png";

export default function RegistrarTurma() {
  // Estados de exibição de overlays
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [showClockOverlay, setShowClockOverlay] = useState<
    "inicio" | "fim" | null
  >(null);

  // Estados principais
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [inicio, setInicio] = useState("00:00h");
  const [fim, setFim] = useState("00:00h");
  const [imagem, setImagem] = useState(capa8);
  const [nome, setNome] = useState("");
  const [coachsVinculados, setCoachsVinculados] = useState<string[]>([]);
  const [coachSelecionado, setCoachSelecionado] = useState<string>("");
  const [coachs, setCoachs] = useState<Professor[]>([]);
  const [idadeMin, setIdadeMin] = useState(0);
  const [idadeMax, setIdadeMax] = useState(120);
  const [error, setErro] = useState<string | boolean>("");

  //Define a função de navegação
  const navigate = useNavigate();

  //Guarda a imagem selecionada
  useEffect(() => {
    if (selectedImage !== null) {
      const capas = [capa1, capa2, capa3, capa4, capa5, capa6, capa7, capa8];
      setImagem(capas[selectedImage]);
    }
  }, [selectedImage]);

  //UseEffet para executar função de listarTurmas seja executada retornando a lista de professores
  useEffect(() => {
    const fetchProfessores = async () => {
      const result = await listarProfessores();

      if (typeof result === "string") {
        return;
      } else if (result === false) {
        setErro(result);
      } else {
        setCoachs(result);
      }
    };

    fetchProfessores();
  }, []);

  //Função para adicionar professor selecionado na lista de professores
  function adicionarProfessorSelecionado() {
    if (coachSelecionado === "") return;

    setCoachs(coachs.filter((t) => t.id !== coachSelecionado));

    // Evita duplicatas
    if (coachsVinculados.some((t) => t === coachSelecionado)) return;

    // Adiciona à lista
    setCoachsVinculados((prev) => [...prev, coachSelecionado]);
    setCoachSelecionado("");
  }

  //Função para registrar turma
  async function RegisterTurma() {
    const result = await cadastrarTurma(
      nome,
      idadeMin,
      idadeMax,
      inicio,
      fim,
      imagem,
      coachsVinculados
    );

    if (result === true) {
      console.log("Cadastro feito");
      navigate("/inicio");
    } else if (typeof result === "string") {
      console.log("Deu errado");
      setErro(result);
    } else {
      setErro("Preencha todos os campos obrigatórios.");
    }
  }

  // Função para confirmar o horário (chamada pelo overlay)
  const handleConfirmTime = (time: string) => {
    if (showClockOverlay === "inicio") setInicio(time);
    if (showClockOverlay === "fim") setFim(time);
    setShowClockOverlay(null);
  };

  // Componentes auxiliares
  const ActionButton = ({
    label,
    variant = "primary",
    className = "",
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    variant?: "primary" | "secondary";
  }) => {
    const baseStyle =
      "px-6 py-2 rounded-xl font-medium transition hover:opacity-90";
    const variants = {
      primary: "bg-[#7F1A17] text-white",
      secondary: "bg-[#1D1E1E] text-white",
    };

    return (
      <button
        className={`${baseStyle} ${variants[variant]} ${className}`}
        {...props}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000]">
      <Header />

      <main className="p-4 md:p-8 space-y-5">
        {/* Cabeçalho */}
        <PageTitle title="Cadastro de turma">
          {/* Botões desktop */}
          <div className="hidden md:flex gap-3">
            <ActionButton
              label="Cancelar"
              variant="secondary"
              onClick={() => navigate(-1)}
            />

            <ActionButton label="Concluir cadastro" onClick={RegisterTurma} />
          </div>
        </PageTitle>

        {/* Mensagem de erro */}
        {error && <ErrorMessage message={error} />}

        {/* Bloco principal */}
        <div className="bg-white rounded-2xl p-5 md:p-8 space-y-6 shadow-sm">
          {/* Imagem */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowImageOverlay(true)}
              className="relative w-24 h-24 md:w-36 md:h-36 bg-[#E8E8E8] rounded-full flex items-center justify-center border border-[#D9D9D9] hover:bg-[#dcdcdc] transition overflow-hidden"
            >
              <img
                src={imagem}
                alt="Capa da turma"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-3.5 right-4.5 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center shadow-md">
                <Pen size={16} />
              </div>
            </button>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Nome */}
            <div className="md:col-span-4">
              <label className="block text-sm font-semibold mb-2">
                Nome da Turma:
              </label>
              <input
                type="text"
                className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            {/* Professor */}
            <div className="w-full md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Vincular professor à turma:
              </label>
              <div className="flex items-center relative">
                <select
                  className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8B0000] appearance-none"
                  defaultValue=""
                  onChange={(e) =>
                    setCoachSelecionado(e.target.value ? e.target.value : "")
                  }
                >
                  <option value="" disabled>
                    Selecione um professor
                  </option>

                  {/*Lista os professores*/}
                  {coachs.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {coach.nome}
                    </option>
                  ))}
                </select>
                <Plus
                  className="absolute right-3 pointer-events-none w-5 h-5 text-black"
                  onClick={adicionarProfessorSelecionado}
                />
              </div>
            </div>

            {/* Idades */}
            {["mínima", "máxima"].map((tipo) => (
              <div key={tipo}>
                <label className="block text-sm font-semibold mb-2">
                  Idade {tipo}:
                </label>
                {tipo === "mínima" ? (
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    onChange={(e) => setIdadeMin(Number(e.target.value))}
                  />
                ) : (
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    onChange={(e) => setIdadeMax(Number(e.target.value))}
                  />
                )}
              </div>
            ))}

            {/* Horários */}
            {[
              { label: "Horário de início:", value: inicio, type: "inicio" },
              { label: "Horário de término:", value: fim, type: "fim" },
            ].map(({ label, value, type }) => (
              <div key={type}>
                <label className="block text-sm font-semibold mb-2">
                  {label}
                </label>
                <button
                  onClick={() => setShowClockOverlay(type as "inicio" | "fim")}
                  className="flex items-center justify-between w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 hover:bg-[#ebebeb] transition"
                >
                  <span className="text-gray-600">{value}</span>
                  <Clock className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Botões mobile */}
          <div className="flex justify-center gap-3 pt-4 md:hidden">
            <ActionButton
              label="Cancelar"
              variant="secondary"
              className="text-sm"
              onClick={() => navigate(-1)}
            />

            <ActionButton
              label="Concluir cadastro"
              className="text-sm"
              onClick={RegisterTurma}
            />
          </div>
        </div>
      </main>

      {/* Overlays */}
      {showImageOverlay && (
        <ImageOverlay
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onClose={() => setShowImageOverlay(false)}
        />
      )}

      {showClockOverlay && (
        <ClockOverlay
          onConfirm={handleConfirmTime}
          onClose={() => setShowClockOverlay(null)}
        />
      )}
    </div>
  );
}
