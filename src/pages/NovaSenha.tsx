import { Link } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";

// Componente reutilizável para campos de formulário
function PasswordField({
  id,
  label,
  className = "",
}: {
  id: string;
  label: string;
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
          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-8 sm:mb-10">
            Redefina a senha:
          </h2>

          {/* Campos de senha */}
          <form className="text-left mb-6 sm:mb-8">
            <PasswordField id="novaSenha" label="Nova senha:" />
            <PasswordField id="confirmarSenha" label="Confirme a nova senha:" />
          </form>

          {/* Botão redefinir */}
          <Link to="/">
            <button
              type="submit"
              className="
                bg-[#A4161A] text-white 
                w-full py-2.5 sm:py-3 
                rounded-md font-medium 
                hover:bg-[#7A0000] transition text-base shadow-sm
              "
            >
              Redefinir senha
            </button>
          </Link>

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
