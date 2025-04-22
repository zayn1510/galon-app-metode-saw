import { X, CheckCircle, AlertCircle } from "lucide-react";

type MessageProps = {
  message: {
    text: string;
    status: boolean | null;
  };
  onClear: () => void;
};

export const Message = ({ message, onClear }: MessageProps) => {
  if (!message.text) return null;

  const isSuccess = message.status === true;
  const isError = message.status === false;

  return (
    <div
      className={`flex items-start justify-between p-4 mb-4 rounded-lg shadow-lg border ${
        isSuccess
          ? "bg-green-50 text-green-700 border-green-300"
          : "bg-red-50 text-red-700 border-red-300"
      }`}
    >
      <div className="flex items-start gap-2">
        {isSuccess && <CheckCircle className="mt-0.5 w-5 h-5 text-green-500" />}
        {isError && <AlertCircle className="mt-0.5 w-5 h-5 text-red-500" />}
        <p className="text-sm">{message.text}</p>
      </div>
      <button onClick={onClear}>
        <X className="w-4 h-4 hover:text-black/70 transition" />
      </button>
    </div>
  );
};
