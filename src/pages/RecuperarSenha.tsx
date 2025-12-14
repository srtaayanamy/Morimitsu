import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import LoginHeader from "../components/LoginHeader";
import { useState } from "react";
import { SendEmail } from "../HTTP/Auth/sendEmail";
import { ErrorMessage } from "../components/ErrorMessage";

export default function RecuperarSenha() {

  //Variaveis de estado e navigate
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState<string | boolean>('');
  const navigate = useNavigate();

  async function handleEnviarEmail(){
    const codigo = await SendEmail(email)
  
    if(codigo !== null){
      console.log("Email enviado com sucesso")
      navigate('/ConfirmarEmail', {state:{codigo: codigo}})
    }
    else{
      console.log("Ocorreu um erro")
      setErro('Ocorreu um erro. Tente novamente.')
    }
  }
    
  return (
    <div className="flex flex-col h-screen w-screen bg-[#F2F2F2] font-[Outfit]">
      {/* Header vermelho */}
      <LoginHeader />

      {/* Conteúdo central */}
      <main className="flex flex-1 items-start justify-center mt-8 md:items-center md:mt-0">
        <section className="bg-white rounded-[1.5rem] shadow-md p-8 md:p-10 w-[90%] max-w-md text-center">

          <ErrorMessage message={erro} />

          {/* Logo */}
          <LogoImage />

          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
            Recuperar senha
          </h2>

          {/* Formulário */}
          <form className="flex flex-col items-center w-full">
            <FormField
              id="email"
              label="E-mail:"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Botão */}
            <button
              className="bg-[#911418] text-white w-full py-2.5 rounded-md font-medium hover:bg-[#7A0000] transition text-center block shadow-sm"
              onClick={handleEnviarEmail}
            >
              Receber código
            </button>

            {/* Link Voltar */}
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-[#911418] mt-4 transition underline underline-offset-2"
            >
              Voltar ao login
            </Link>
          </form>
        </section>
      </main>
    </div>
  );
}

/* Campo de input com label */
type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormField({
  id,
  label,
  type = "text",
  autoComplete,
  onChange,
}: FormFieldProps) {
  return (
    <div className="w-full text-left mb-6">
      <label htmlFor={id} className="block text-sm text-black font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#911418]"
        onChange={onChange}
      />
    </div>
  );
}

/* Logo */
function LogoImage() {
  return (
    <img
      src={Logo}
      alt="Logo Morimitsu"
      className="w-24 h-24 mx-auto mb-4 object-contain"
    />
  );
}
