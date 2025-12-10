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

  const formatarCPF = (value: string) => {
  value = value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length <= 3) return value;
  if (value.length <= 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
  if (value.length <= 9)
    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;

  return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
    6,
    9
  )}-${value.slice(9)}`;
};


  const formatarTelefone = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) return `(${value}`;
    if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  };

  const handleTelefoneChange = (e: any) => {
    const value = e.target.value;
    setTelefone(formatarTelefone(value));
  };

  const handleContatoChange = (e: any) => {
    const value = e.target.value;
    setContato(formatarTelefone(value));
  };

  const handleCPFChange = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setCPF(value);
  };

  async function handleRegisterAluno() {
    const telefoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      setError("Telefone inválido. Use o formato (DD) 99999-9999.");
      return;
    }

    if (contato && !telefoneRegex.test(contato)) {
      setError(
        "Telefone de responsável inválido. Use o formato (DD) 99999-9999."
      );
      return;
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(CPF)) {
      setError(
        "CPF inválido. Digite apenas os 11 números sem pontos ou traços."
      );
      return;
    }

    const rankFormated = faixa.replace("/", "_");

    const novoAluno: Aluno = {
      nome,
      apelido,
      dataNascimento,
      telefone,
      sexo,
      CPF,
      faixa: rankFormated,
      grau,
      frequencia,
      Responsavel: responsavel,
      telefoneResponsavel: contato,
      matricula,
      email,
      observacao,
      turmas: turmasVinculadas,
    };
    console.log(novoAluno);
    const result = await cadastrarAluno(novoAluno);

    if (result === true) {
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
          <div className="hidden md:flex justify-end gap-3">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-6 py-3 rounded-xl font-medium"
              onClick={() => navigate("/alunos")}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-[#7F1A17] text-white px-6 py-3 rounded-xl font-medium cursor-pointer"
              onClick={handleRegisterAluno}
            >
              Concluir cadastro
            </button>
          </div>
        </PageTitle>

        {error && <ErrorMessage message={error} />}

        <div className="bg-white rounded-2xl p-5 md:p-8 space-y-6 shadow-sm flex-1">
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
                value={telefone}
                onChange={handleTelefoneChange}
              />
            </div>

            <div>
              <label className={labelBase}>Sexo:</label>
              <div
                className={`${inputBase} bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 flex items-center gap-6`}
              >
                {["Masculino", "Feminino"].map((sexo) => (
                  <label key={sexo} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sexo"
                      onChange={() => setSexo(sexo)}
                    />
                    {sexo}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>CPF:</label>
              <input
                type="text"
                className={inputBase}
                value={formatarCPF(CPF)}
                onChange={handleCPFChange}
              />
            </div>

            <div>
              <label className={labelBase}>Faixa / Grau:</label>

              <div className="flex w-full gap-3 justify-center">
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

                <select
                  className={inputBase}
                  value={grau > 0 ? grau : "Nenhum"}
                  onChange={(e) => setGrau(Number(e.target.value))}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className={labelBase}>
                Responsável / Contato emergencial:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Responsável"
                  className={inputBase}
                  onChange={(e) => setResponsavel(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  className={inputBase}
                  value={contato}
                  onChange={handleContatoChange}
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

                <Plus
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black cursor-pointer"
                  onClick={adicionarTurmaSelecionada}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelBase}>Observações do aluno:</label>
            <textarea
              rows={3}
              className={`${inputBase} resize-none`}
              onChange={(e) => setoObservacao(e.target.value)}
            />
          </div>

          {/* Botões mobile*/}
          <div className="flex md:hidden gap-3 justify-end pt-4">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-3 py-2 rounded-xl font-medium w-1/4"
              onClick={() => navigate("/alunos")}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="bg-[#7F1A17] text-white px-3 py-2 rounded-xl font-medium cursor-pointer w-1/3"
              onClick={handleRegisterAluno}
            >
              Concluir
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
