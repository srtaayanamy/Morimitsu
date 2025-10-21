import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import LoginHeader from "../components/LoginHeader";

export default function ConfirmarEmail() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  //Variável de estado e navigate
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  //Recebe e armazena o codigo e email recibidos da tela anterior
  const location = useLocation();
  const codigoRecebido = location.state?.codigo;

  const VerificarCodigo=()=>{
    // Junta os 4 inputs em uma string
    const codigoDigitado = inputsRef.current.map(input => input?.value || "").join("");

    // Valida se o usuário digitou 4 dígitos
    if (codigoDigitado.length !== 4) {
      setErro('Digite o código completo!')
      return;
    }
    if(codigoDigitado === codigoRecebido){
      navigate("/NovaSenha", {state:{codigo:codigoRecebido, codigoDigitado: codigoDigitado}})
      return;
    }
    setErro('Código inválido!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = ""; // impede letras
      return;
    }

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus(); // avança automaticamente
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus(); // volta ao campo anterior
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F2F2F2] font-[Outfit]">
      {/* Header vermelho */}
      <LoginHeader />

      {/* Conteúdo central */}
      <main className="flex flex-1 items-start justify-start pt-6 sm:items-center sm:justify-center sm:pt-0">
        <section
          className="
            bg-white rounded-2xl shadow-md text-center 
            w-full max-w-md 
            mx-6 sm:mx-0
            p-6 sm:p-10 mt-6 sm:mt-0
          "
        >
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo Morimitsu"
            className="w-28 h-28 mx-auto mb-5 object-contain rounded-full sm:w-24 sm:h-24"
          />

          {/* Título */}
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-black mb-2">
            Confirme o e-mail
          </h2>

          {/* Subtítulo */}
          <p className="text-[#1E1E1E] text-sm mb-5">
            Digite o código que recebeu no e-mail:
          </p>

          {/* Campos de código */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-6"> 
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="
                  w-12 h-12 sm:w-14 sm:h-14 
                  text-center border border-[#E6E6E6] 
                  rounded-[10px] text-lg font-medium text-black 
                  bg-white shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[#A4161A]
                "
              />
            ))}
          </div>

          {/* Botão de avançar */}
          <Link to="/nova-senha">
            <button
              type="button"
              className="w-full py-3 text-base font-medium rounded-xl shadow-md bg-[#A4161A] text-white hover:bg-[#7A0000] transition"
              onClick={VerificarCodigo}
            >
              Avançar
            </button>
          </Link>

          {/* Link voltar */}
          <Link
            to="/"
            className="text-sm text-[#5F5F5F] hover:text-[#7A0000] mt-4 transition underline underline-offset-2 block"
          >
            Voltar ao login
          </Link>
        </section>
      </main>
    </div>
  );
}
