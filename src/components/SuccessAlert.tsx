import { CheckCircle } from "lucide-react";

interface SuccessAlertProps {
  message: string;
}

export default function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl shadow-sm animate-fadeIn">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  );
}
