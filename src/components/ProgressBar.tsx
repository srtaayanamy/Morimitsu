interface ProgressBarProps {
  percent?: number;
}

export function ProgressBar({ percent = 0 }: ProgressBarProps) {
  return (
    <div className="w-full bg-[#EFEFEF] h-12 rounded-full overflow-hidden mt-4">
      <div
        className="bg-[#7F1A17] h-8 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
