interface ProgressBarProps {
  percent?: number;
}

export function ProgressBar({ percent = 0 }: ProgressBarProps) {
  return (
    <div className="w-full bg-[#EFEFEF] h-6 rounded-full overflow-hidden mt-4 relative">
      <div
        className="bg-[#7F1A17] h-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
