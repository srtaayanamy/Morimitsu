import { getAvatarImage } from "../utils/getAvatarImage";

interface AvatarProps {
  sexo?: string;
  dataNascimento?: string;
}

export function Avatar({ sexo, dataNascimento }: AvatarProps) {
  return (
    <div className="bg-[#EFEFEF] rounded-lg p-6 flex items-center justify-center w-48 h-48">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-[#EFEFEF] flex items-center justify-center">
        <img
          src={getAvatarImage(sexo, dataNascimento)}
          alt="Avatar do aluno"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
