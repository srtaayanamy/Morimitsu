// components/CreateAcessModal.tsx
import { useState, useEffect } from "react";
import { StudentPromote } from "../HTTP/User/registerCoach";
import { getStudent } from "../HTTP/Student/getStudent";
import { ErrorMessage } from "../components/ErrorMessage";

interface CreateAcessModalProps {
  isOpen: boolean;
  alunoId: string;
  alunoNome: string;
  alunoEmail?: string;
  onClose: () => void;
  onSuccess?: (email: string, senha: string) => void;
}

export default function CreateAcessModal({
  isOpen,
  alunoId,
  alunoNome,
  alunoEmail: emailProp,
  onClose,
  onSuccess,
}: CreateAcessModalProps) {
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | false>(false);
  const [sucesso, setSucesso] = useState(false);
  const [credenciais, setCredenciais] = useState<{
    email: string;
    senha: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen || !alunoId?.trim()) {
      setEmail("");
      setSenha("");
      setErro(false);
      setCarregando(false);
      return;
    }

    if (emailProp?.trim() && emailProp.includes("@")) {
      setEmail(emailProp.trim());
      return;
    }

    let isMounted = true;
    setCarregando(true);
    setEmail("");

    getStudent(alunoId).then((resultado) => {
      if (!isMounted) return;

      if (typeof resultado === "string") {
        setErro(resultado);
      } else {
        const emailDoAluno = resultado.personal.email?.trim();
        if (emailDoAluno && emailDoAluno.includes("@")) {
          setEmail(emailDoAluno);
        } else {
          setErro("Este aluno não possui um e-mail válido cadastrado.");
        }
      }
      setCarregando(false);
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, alunoId, emailProp]);

  const handleCriarAcesso = async () => {
    setErro(false);

    if (!email) {
      setErro("E-mail não encontrado ou inválido.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const resultado = await StudentPromote(senha, alunoId); // sem trim!
    setLoading(false);

    if (resultado === true) {
      setSucesso(true);
      setCredenciais({ email, senha });
      onSuccess?.(email, senha);
    } else {
      setErro(resultado as string);
    }
  };

  const handleClose = () => {
    if (loading || carregando) return;
    setSenha("");
    setEmail("");
    setErro(false);
    setSucesso(false);
    setCredenciais(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[60] p-4 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!sucesso ? (
          <>
            <h2 className="text-lg md:text-xl font-medium text-[#1E1E1E] mb-6">
              Novo acesso para <span className="font-bold">“{alunoNome}”</span>:
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
                E-mail de acesso:
              </label>
              <div
                className={`rounded-xl px-4 py-3 text-sm font-medium min-h-[48px] flex items-center ${
                  carregando
                    ? "bg-gray-100 text-gray-500"
                    : email
                    ? "bg-[#F5F5F5] text-gray-800"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {carregando
                  ? "Carregando e-mail..."
                  : email || "E-mail não encontrado"}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
                Senha de acesso:
              </label>
              <input
                type="text"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7F1A17] focus:outline-none transition"
                disabled={loading || carregando || !email}
                autoFocus
              />

              <ErrorMessage
                message={
                  senha.length > 0 && senha.length < 8
                    ? "A senha deve ter 8 ou mais caracteres."
                    : false
                }
              />
            </div>

            <ErrorMessage message={erro} />

            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                disabled={loading || carregando}
                className="px-6 py-2 bg-[#333434] text-white text-sm font-medium rounded-lg hover:bg-[#444444] transition disabled:opacity-70 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={handleCriarAcesso}
                disabled={loading || carregando || !email || senha.length < 8}
                className={`px-6 py-2 text-white text-sm font-medium rounded-lg transition flex items-center gap-2 cursor-pointer
                   ${
                     loading || carregando || !email || senha.length < 8
                       ? "bg-gray-400 cursor-not-allowed"
                       : "bg-[#7F1A17] hover:bg-[#6b1513]"
                   }`}
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Criando...
                  </>
                ) : (
                  "Criar acesso"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-5xl text-green-600">Check</span>
            </div>

            <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
              Acesso criado com sucesso!
            </h3>
            <p className="text-sm text-gray-600 mb-8">
              Professor <strong>{alunoNome}</strong> já pode fazer login.
            </p>

            <div className="bg-gray-50 rounded-xl p-5 text-left space-y-4 font-medium text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Login (e-mail):</span>
                <span className="font-mono text-[#7F1A17] break-all">
                  {credenciais?.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Senha:</span>
                <span className="font-mono text-[#7F1A17]">
                  {credenciais?.senha}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="mt-8 px-8 py-3 bg-[#7F1A17] text-white font-medium rounded-lg hover:bg-[#6b1513] transition"
            >
              Concluído
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
