import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { type Turma } from "../types/Turma";
import { type Aluno } from "../types/Aluno";
import { cadastrarAluno } from "../utils/CadastrarAluno";
import { FiltrarTurmaPorIdade } from "../hooks/ListaTurmas";
import {
  faixasEGrausMaior16,
  faixasEGrausMenor16,
  Ranking,
} from "../types/Rank";
import { ErrorMessage } from "../components/ErrorMessage";
import PageTitle from "../components/PageTitle";
import { calcularIdade } from "../utils/CalcularIdade";

export default function RegistrarAluno() {
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>("");
  const [apelido, setApelido] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [CPF, setCPF] = useState<string>("");
  const [faixa, setFaixa] = useState<string>("BRANCA");
  const [grau, setGrau] = useState<number>(0);
  const [frequencia, setFrequencia] = useState<number>(0);
  const [responsavel, setResponsavel] = useState<string>("");
  const [contato, setContato] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmasVinculadas, setTurmasVinculadas] = useState<string[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("");
  const [observacao, setoObservacao] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const fetchTurmas = async () => {
      if (!age) return;
      const result = await FiltrarTurmaPorIdade(age);

      if (typeof result === "string") {
        setError(result);
      } else {
        setTurmas(result);
      }
    };

    fetchTurmas();
  }, [age]);

  useEffect(() => {
    if (!dataNascimento) return;
    const idade = calcularIdade(dataNascimento);
    setAge(idade);
  }, [dataNascimento]);

  function adicionarTurmaSelecionada() {
    if (turmaSelecionada === "") return;

    setTurmas(turmas.filter((t) => t.id !== turmaSelecionada));

    if (turmasVinculadas.some((t) => t === turmaSelecionada)) return;

    setTurmasVinculadas((prev) => [...prev, turmaSelecionada]);
    setTurmaSelecionada("");
  }

  async function handleRegisterAluno() {
    const novoAluno: Aluno = {
      nome,
      apelido,
      dataNascimento,
      telefone,
      sexo,
      CPF,
      faixa,
      grau,
      frequencia,
      Responsavel: responsavel,
      telefoneResponsavel: contato,
      matricula,
      email,
      observacao,
      turmas: turmasVinculadas,
    };
    const result = await cadastrarAluno(novoAluno);

    if (result === true) {
      console.log("Aluno criado com sucesso");
      navigate("/alunos");
    } else {
      setError(result);
      return;
    }
  }

  const inputBase =
    "w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 focus:ring-2 focus:ring-[#8B0000] outline-none";
  const labelBase = "block text-sm font-semibold mb-2";

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-3">
        <PageTitle title="Cadastro de aluno">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
              onClick={() => navigate("/alunos")}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-[#7F1A17] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
              onClick={handleRegisterAluno}
            >
              Concluir cadastro
            </button>
          </div>
        </PageTitle>

        {error && <ErrorMessage message={error} />}

        <div className="bg-white rounded-2xl p-5 md:p-8 space-y-6 shadow-sm flex-1">
          {/* Nome / Apelido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>Nome completo:</label>
              <input
                type="text"
                className={inputBase}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <label className={labelBase}>Apelido / Nome social:</label>
              <input
                type="text"
                className={inputBase}
                onChange={(e) => setApelido(e.target.value)}
              />
            </div>
          </div>

          {/* Data / Telefone / Sexo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>Data de Nascimento:</label>
              <input
                type="date"
                className={inputBase}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>

            <div>
              <label className={labelBase}>Telefone:</label>
              <input
                type="tel"
                className={inputBase}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div>
              <label className={labelBase}>Sexo:</label>
              <div
                className={`${inputBase} flex items-center justify-between md:justify-start gap-6`}
              >
                {["Masculino", "Feminino"].map((sexo) => (
                  <label key={sexo} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sexo"
                      className="accent-[#8B0000]"
                      onChange={() => setSexo(sexo)}
                    />
                    {sexo}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* CPF / FAIXA + GRAU / Frequência */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>CPF:</label>
              <input
                type="text"
                className={inputBase}
                onChange={(e) => setCPF(e.target.value)}
              />
            </div>

            <div>
              <label className={labelBase}>Faixa / Grau:</label>

              <div className="flex w-full gap-3 justify-center">
                {/* Faixa */}
                <select
                  className={inputBase}
                  value={faixa}
                  onChange={(e) => {
                    const f = e.target.value;
                    setFaixa(f);
                  }}
                >
                  {(age >= 16 ? faixasEGrausMaior16 : faixasEGrausMenor16).map(
                    (item, index) => (
                      <option key={index} value={item.faixa}>
                        {item.faixa}
                      </option>
                    )
                  )}
                </select>

                {/* Grau */}
                <select
                  className={inputBase}
                  value={grau > 0 ? grau : "Nenhum"}
                  onChange={(e) => {
                    const g = e.target.value;
                    setGrau(Number(g));
                  }}
                >
                  {Ranking[faixa].map((g) => (
                    <option key={g} value={g > 0 ? g : "Nenhum"}>
                      {g > 0 ? g : "Nenhum"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelBase}>Frequência inicial:</label>
              <input
                type="text"
                className={inputBase}
                onChange={(e) => setFrequencia(Number(e.target.value))}
              />
            </div>
          </div>

          {/* RESPONSÁVEL / MATRÍCULA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className={labelBase}>
                Responsável / Contato emergencial:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Responsável (ex: Carla - Mãe)"
                  className={inputBase}
                  onChange={(e) => setResponsavel(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Telefone (ex: (88) 9 9999-9999)"
                  className={inputBase}
                  onChange={(e) => setContato(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>Matrícula (opcional):</label>
              <input
                type="text"
                className={inputBase}
                onChange={(e) => setMatricula(e.target.value)}
              />
            </div>
          </div>

          {/* EMAIL / TURMA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>E-mail:</label>
              <input
                type="email"
                className={inputBase}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className={labelBase}>Vincular a turma:</label>
              <div className="relative flex items-center">
                <select
                  className={`${inputBase} pr-16 appearance-none`}
                  value={turmaSelecionada}
                  onChange={(e) =>
                    setTurmaSelecionada(e.target.value ? e.target.value : "")
                  }
                >
                  <option value="">Selecione</option>

                  {turmas.map((turma) => (
                    <option key={turma.id} value={turma.id}>
                      {turma.nome}
                    </option>
                  ))}
                </select>

                <svg
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

                <Plus
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black cursor-pointer"
                  onClick={adicionarTurmaSelecionada}
                />
              </div>
            </div>
          </div>

          {/* OBSERVAÇÃO */}
          <div>
            <label className={labelBase}>Observações do aluno:</label>
            <textarea
              rows={3}
              className={`${inputBase} resize-none`}
              onChange={(e) => setoObservacao(e.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
