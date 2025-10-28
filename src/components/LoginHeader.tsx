import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function LoginHeader() {
  return (
    <Link to="/">
      <div className="bg-[#7A0000] flex items-center gap-3 px-6 py-3">
        <img
          src={Logo}
          alt="Logo Morimitsu"
          className="w-10 h-10 object-cover rounded-full"
        />
        <span className="text-white text-lg font-[Outfit] font-medium tracking-widest">
          Morimitsu
        </span>
      </div>
    </Link>
  );
}
