interface BirthdayCardProps {
  nome: string;
  data: string;
}

export default function BirthdayCard({ nome, data }: BirthdayCardProps) {
  return (
    <div className="flex-shrink-0 w-40 h-44 bg-gradient-to-b from-pink-100 to-pink-200 shadow-sm rounded-xl p-4 text-center flex flex-col items-center justify-between">
      <div className="text-4xl">🎉</div>
      <p className="font-semibold text-[15px] leading-tight">{nome}</p>
      <p className="text-sm font-semibold">{data}</p>
    </div>
  );
}
