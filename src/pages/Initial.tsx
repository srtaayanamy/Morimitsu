import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { verificarLogin } from "../utils/VerficarLogin";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAuth } from "../hooks/Autenticao";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | boolean>("");

  const verificaLogin = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (verificaLogin.isLoggedIn) {
      navigate("/inicio");
    }
  }, [verificaLogin.isLoggedIn, navigate]);

  async function handleLogin() {
    const result = await verificarLogin(email, senha);

    if (result === true) {
      navigate("/inicio");
      return;
    } else {
      setErro(result);
      return;
    }
  }

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-[Outfit] bg-[#F5F5F5]">
      <div className="flex items-center justify-center bg-gradient-to-b from-[#911418] to-[#2B0607] w-full md:w-1/2 h-[30vh] md:h-full">
        <img
          src={Logo}
          alt="Logo Morimitsu"
          className="w-36 h-36 md:w-64 md:h-64 object-contain"
        />
      </div>

      {/* BLOCO DO LOGIN */}
      <div className="flex items-start md:items-center justify-center w-full md:w-1/2 h-[70vh] md:h-full px-6 py-10 md:py-8">
        <div className="bg-white shadow-md rounded-[1.8rem] md:rounded-2xl px-6 py-8 md:p-10 w-full max-w-sm mt-6 md:mt-0 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-black">
            Login
          </h2>

          <form className="flex flex-col space-y-5">
            {/* Campo Usuário */}
            <FormField
              id="username"
              label="E-mail do usuário:"
              type="email"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Campo Senha */}
            <div className="flex flex-col text-left">
              <label htmlFor="password" className="text-black text-sm mb-1">
                Senha:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="border border-gray-200 rounded-md w-full px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#911418]"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-2 text-gray-500 hover:text-[#911418] transition"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            <ErrorMessage message={erro} />

            {/* Link Esqueceu Senha */}
            <div className="flex justify-end">
              <Link
                to="/recuperar-senha"
                className="text-sm text-gray-400 hover:text-[#911418] transition underline underline-offset-2"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão Entrar */}
            <button
              type="button"
              onClick={handleLogin}
              className="mt-1 mx-auto w-44 h-11 md:w-60 md:h-14 bg-[#911418] text-white rounded-lg font-medium flex items-center justify-center hover:bg-[#7a1014] transition text-base shadow-sm cursor-pointer"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Campo reutilizável */
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
    <div className="flex flex-col text-left">
      <label htmlFor={id} className="text-black text-sm mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#911418]"
        onChange={onChange}
      />
    </div>
  );
}
