interface InfoFieldProps {
  label: string;
  value?: string;
  multiline?: boolean;
}

export function InfoField({ label, value = "", multiline }: InfoFieldProps) {
  return (
    <div>
      <p className="font-semibold text-[#1E1E1E]">{label}</p>
      <p
        className={`bg-[#EFEFEF] rounded-lg p-6 mt-1 ${
          multiline ? "h-24" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
