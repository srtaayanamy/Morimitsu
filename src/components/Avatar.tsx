// components/Avatar.tsx
import fallbackAvatar from "../assets/presets/martial-arts.png";
import { getAvatarImage } from "../utils/getAvatarImage";

interface AvatarProps {
  sexo?: string;
  idade?: number | null;           // agora aceita idade
}

export function Avatar({ sexo, idade }: AvatarProps) {
  const avatarSrc = getAvatarImage(sexo, idade);

  return (
    <div className="bg-white rounded-2xl p-4 flex items-center justify-center w-48 h-48 shadow-sm">
      <div className="w-42 h-42 rounded-full overflow-hidden bg-[#F5F5F5] flex items-center justify-center border border-[#DDD]">
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