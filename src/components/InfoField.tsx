interface InfoFieldProps {
  label: string;
  value?: string;
  editable?: boolean;
  multiline?: boolean;
  onChange?: (value: string) => void;
}

export function InfoField({
  label,
  value = "",
  editable = false,
  multiline = false,
  onChange,
}: InfoFieldProps) {
  return (
    <div>
      {label && <p className="font-semibold text-sm md:text-base">{label}</p>}
      {editable ? (
        multiline ? (
          <textarea
            className="w-full bg-[#F5F5F5] rounded-xl p-4 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c30000]"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className="w-full bg-[#F5F5F5] rounded-xl p-4 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c30000]"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        )
      ) : (
        <p className="bg-[#F5F5F5] rounded-xl p-4 mt-1">{value}</p>
      )}
    </div>
  );
}
