import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";
import { mudarSenha } from "../utils/MudarSenha";
import { ErrorMessage } from "../components/ErrorMessage";

// Campo de senha reutilizável, agora com suporte a onChange
function PasswordField({
  id,
  label,
  value,
  onChange,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <div className={`mb-5 sm:mb-6 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm text-black mb-1 sm:mb-2 font-medium"
      >
        {label}
      </label>
      <input
        type="password"
        id={id}
        value={value}
        onChange={onChange}
        className="
          w-full border border-gray-200 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-[#7A0000]
          text-black text-sm sm:text-base
        "
      />
    </div>
  );
}

export default function NovaSenha() {

  //Variáveis de estado
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  //Definindo intâncias para as funções location e navigate
  const location = useLocation();
  const navigate = useNavigate();

  const codigo = location.state?.codigo;
  const codigoDigitado = location.state?.codigoDigitado;

  async function handleRedefinirSenha() {

    //Verifica os campos de senha e se as senha são iguais
    if (!novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      const sucesso = await mudarSenha(novaSenha, codigo, codigoDigitado);

      if (sucesso) {
        console.log("Senha alterada com sucesso!");
        navigate("/");
      } else {
        setErro("Falha ao redefinir a senha. Verifique os dados.");
      }

    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setErro("Ocorreu um erro. Tente novamente.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-[#F2F2F2] font-[Outfit]">
      {/* Header vermelho */}
      <LoginHeader />

      {/* Conteúdo central */}
      <main className="flex flex-1 items-start justify-center mt-6 sm:items-center sm:mt-0">
        <section
          className="
            bg-white rounded-2xl shadow-md 
            w-[90%] sm:w-full max-w-md 
            p-6 sm:px-10 sm:py-12
            text-center
          "
        >
          <ErrorMessage message={erro} />

          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-8 sm:mb-10">
            Redefina a senha:
          </h2>

          {/* Campos de senha */}
          <form
            className="text-left mb-6 sm:mb-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <PasswordField
              id="novaSenha"
              label="Nova senha:"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <PasswordField
              id="confirmarSenha"
              label="Confirme a nova senha:"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </form>
          
          {/* Botão redefinir */}
          <button
            type="button"
            className="
              bg-[#A4161A] text-white 
              w-full py-2.5 sm:py-3 
              rounded-md font-medium 
              hover:bg-[#7A0000] transition text-base shadow-sm
            "
            onClick={handleRedefinirSenha}
          >
            Redefinir senha
          </button>

          {/* Link voltar */}
          <Link 
            to="/"
            className="
              text-sm text-gray-500 hover:text-[#7A0000] 
              mt-5 sm:mt-6 transition underline underline-offset-2 block
            "
          >
            Voltar ao login
          </Link>
        </section>
      </main>
    </div>
  );
}
