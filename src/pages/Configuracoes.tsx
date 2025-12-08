import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { motion, AnimatePresence } from "framer-motion";

export default function Configuracoes() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const menuItems = [
    { label: "Perfil do usuário", path: "/configuracoes/perfil" },
    {
      label: "Registros de frequência",
      path: "/configuracoes/registros-frequencia",
    },
    {
      label: "Corrigir frequência",
      path: "/configuracoes/corrigir-frequencia",
    },
  ];

  if (role === "ADMIN") {
    menuItems.push(
      {
        label: "Registros de graduação",
        path: "/configuracoes/registros-graduacao",
      },
      {
        label: "Configurar graduação",
        path: "/configuracoes/configurar-graduacao",
      },
      {
        label: "Relatórios e exports",
        path: "/configuracoes/relatorios-exports",
      }
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <PageTitle title="Configurações:"></PageTitle>

        <div className="bg-white w-full rounded-2xl p-4 md:p-6 flex gap-6 shadow-sm">
          {/* Sidebar */}
          <aside className="w-64 bg-[#FFFFFF] rounded-xl p-2 flex flex-col gap-2 border border-gray-200">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <button
                    className={`w-full transition cursor-pointer text-sm font-medium px-4 py-2 rounded-lg text-left shadow-sm
${active ? "bg-[#8C0003] text-white" : "bg-[#EDEDED] hover:bg-[#dcdcdc]"}`}
                  >
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </aside>

          {/* Display area */}
          <section className="flex-1 bg-[white] rounded-lg p-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}
