import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, X, Filter, Settings } from "lucide-react";
import Logo from "../assets/Logo.png";
import NotificationModal from "./NotificationModal";
import type { notification } from "../types/User";
import FilterOverlay from "./FilterOverlay";
import { userNotifications } from "../HTTP/User/notifications";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<notification[] | string>(
    ""
  );
  const role = localStorage.getItem("role");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      const result = await userNotifications();
      setNotifications(result);
    }

    fetchNotifications();
  }, []);

  const hasUnread =
    Array.isArray(notifications) &&
    notifications.some((n) => !n.read);

  function openNotifications() {
    setIsNotificationsOpen(true);

    if (Array.isArray(notifications)) {
      const updated = notifications.map((n) => ({
        ...n,
        read: true,
      }));
      setNotifications(updated);
    }
  }

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
    <header className="bg-[#8B0000] text-white flex items-center justify-between px-4 sm:px-6 py-3 shadow-md relative">

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
          className="hover:text-gray-200 transition relative"
          onClick={openNotifications}
        >
          <Bell className="w-6 h-6" />

          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#8B0000]" />
          )}
        </button>

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
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MENU DESKTOP */}
      <nav className="hidden md:flex items-center gap-6 text-base font-medium">
        <Link to="/inicio" className="hover:underline">Início</Link>
        <Link to="/alunos" className="hover:underline">Alunos</Link>
        {role === "ADMIN" && (
          <Link to="/professores" className="hover:underline">
            Professores
          </Link>
        )}
        <Link to="/turmas" className="hover:underline">Turmas</Link>

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
            className="hover:text-gray-200 transition flex items-center justify-center relative"
            onClick={openNotifications}
          >
            <Bell className="w-5 h-5 cursor-pointer" />

            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
          </button>

          <Link
            to="/configuracoes"
            className="hover:text-gray-200 transition flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* MODAL DE NOTIFICAÇÕES */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
      />

      <FilterOverlay
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </header>
  );
}
