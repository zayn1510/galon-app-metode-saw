// components/Message.tsx
'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

type MessageProps = {
  message: {
    text: string;
    status: boolean | null;
  };
  onClear: () => void;
  autoDismiss?: number; // in milliseconds
};

export function MessageLogin({ message, onClear, autoDismiss = 5000 }: MessageProps) {
  useEffect(() => {
    if (message.text && autoDismiss > 0) {
      const timer = setTimeout(() => {
        onClear();
      }, autoDismiss);

      return () => clearTimeout(timer);
    }
  }, [message.text, autoDismiss, onClear]);

  if (!message.text || message.status === null) return null;

  const isSuccess = message.status === true;
  const bgColor = isSuccess ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30';
  const textColor = isSuccess ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';
  const borderColor = isSuccess ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800';
  const iconColor = isSuccess ? 'text-green-400 dark:text-green-500' : 'text-red-400 dark:text-red-500';

  return (
    <div
      className={`mb-4 w-full rounded-lg border ${borderColor} ${bgColor} p-4 transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${iconColor}`}>
          {isSuccess ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className={`ml-3 text-sm font-medium ${textColor}`}>{message.text}</div>
        <button
          type="button"
          onClick={onClear}
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 ${bgColor} ${textColor} hover:${isSuccess ? 'bg-green-100 dark:bg-green-800/50' : 'bg-red-100 dark:bg-red-800/50'} focus:ring-2 focus:ring-${isSuccess ? 'green' : 'red'}-400 focus:outline-none`}
          aria-label="Dismiss"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}