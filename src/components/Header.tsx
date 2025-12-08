import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, X, Filter, Settings } from "lucide-react";
import Logo from "../assets/Logo.png";
import NotificationModal from "./NotificationModal";
import FilterOverlay from "./FilterOverlay";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // controla o dropdown de busca no mobile
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleSearch(e?: any) {
    if (e) e.preventDefault();
    if (!search.trim()) return;
    navigate(`/pesquisa?nome=${encodeURIComponent(search)}`);
  }

  return (
    <header className="bg-[#8B0000] text-white flex items-center justify-between px-6 py-3 shadow-md relative">
      {/* LOGO E NOME */}
      <Link to="/inicio" className="cursor-pointer">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo Morimitsu"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-xl font-medium tracking-wide">Morimitsu</h1>
        </div>
      </Link>

      {/* ÍCONES FIXOS (MOBILE) */}
      <div className="flex items-center gap-5 md:hidden">
        <button
          className="hover:text-gray-200 transition "
          onClick={() => setIsNotificationsOpen(true)}
        >
          <Bell className="w-6 h-6 " />
        </button>

        {/* Abre/fecha o dropdown */}
        <button
          className="hover:text-gray-200 transition"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <Search className="w-6 h-6" />
        </button>

        <button
          className="p-2 hover:bg-[#9b1a1a] rounded-lg transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* MENU DESKTOP */}
      <nav className="hidden md:flex items-center gap-6 text-base font-medium">
        <Link to="/inicio" className="hover:underline">
          Início
        </Link>
        <Link to="/alunos" className="hover:underline">
          Alunos
        </Link>
        {role === "ADMIN" && (
          <Link to="/professores" className="hover:underline">
            Professores
          </Link>
        )}
        <Link to="/turmas" className="hover:underline">
          Turmas
        </Link>

        {/* CAMPO DE PESQUISA */}
        <form onSubmit={handleSearch}>
          <div className="relative bg-white rounded-full flex items-center px-4 py-2 w-72">
            <input
              type="text"
              placeholder="Pesquisa por nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-gray-800 text-sm focus:outline-none placeholder-gray-400"
            />

            <button type="submit">
              <Search className="w-6 h-6 pr-1 text-black cursor-pointer" />
            </button>

            <button type="button" onClick={() => setIsFilterOpen(true)}>
              <Filter className="w-4 h-4 text-black cursor-pointer ml-2" />
            </button>
          </div>
        </form>

        {/* ÍCONES DESKTOP */}
        <div className="flex items-center gap-4">
          <button
            className="hover:text-gray-200 transition flex items-center justify-center"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell className="w-5 h-5 cursor-pointer" />
          </button>
          <Link
            to="/configuracoes"
            className="hover:text-gray-200 transition flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* DROPDOWN DE PESQUISA NO MOBILE */}
      {showMobileSearch && (
        <div className="absolute top-full left-0 w-full bg-[#8B0000] px-4 pb-3 pt-2 z-40 md:hidden">
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setShowMobileSearch(false);
            }}
            className="w-full"
          >
            <div className="relative bg-white rounded-full flex items-center px-4 py-2">
              <input
                type="text"
                placeholder="Pesquisa por nome"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-gray-800 text-sm focus:outline-none placeholder-gray-400"
              />

              <button type="submit">
                <Search className="w-6 h-6 pr-1 text-black cursor-pointer" />
              </button>

              <button type="button" onClick={() => setIsFilterOpen(true)}>
                <Filter className="w-4 h-4 text-black cursor-pointer ml-2" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MENU LATERAL MOBILE */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#8B0000] text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-9 h-9 rounded-full" />
            <h2 className="text-lg font-semibold">Morimitsu</h2>
          </div>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-base font-medium px-8 mt-8">
          <Link
            to="/inicio"
            className="hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link
            to="/alunos"
            className="hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Alunos
          </Link>
          <Link
            to="/professores"
            className="hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Professores
          </Link>
          <Link
            to="/turmas"
            className="hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Turmas
          </Link>
          <Link
            to="/configuracoes"
            className="hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Configurações
          </Link>
        </nav>
      </div>

      {/* FUNDO ESCURO QUANDO MENU ABERTO */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* MODAL DE NOTIFICAÇÕES */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <FilterOverlay
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => {
          setIsFilterOpen(false);
        }}
      />
    </header>
  );
}
