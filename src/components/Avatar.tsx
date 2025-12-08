import fallbackAvatar from "../assets/presets/martial-arts.png";
import { getAvatarImage } from "../utils/getAvatarImage";

interface AvatarProps {
  sexo?: string;
  idade?: number | null; 
  size?: number;
  noWrapper?: boolean; 
}

export function Avatar({ sexo, idade, size = 64, noWrapper = false }: AvatarProps) {
  const avatarSrc = getAvatarImage(sexo, idade);

  if (noWrapper) {
    return (
      <img
        src={avatarSrc}
        alt="Avatar do aluno"
        className="object-cover rounded-full"
        style={{ width: size, height: size }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 flex items-center justify-center w-48 h-48 shadow-sm">
      <div className="w-16 h-16 md:w-42 md:h-42 rounded-full overflow-hidden bg-[#F5F5F5] flex items-center justify-center border border-[#DDD]">
        <img
          src={avatarSrc}
          alt="Avatar do aluno"
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackAvatar;
          }}
        />
      </div>
    </div>
  );
}