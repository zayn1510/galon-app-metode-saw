'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { ReactElement, useState,MouseEvent } from 'react';
import { Lock, X, UserIcon } from 'lucide-react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { LoginRequest, TokenResource } from '@/types/login';
import { API_ENDPOINT } from '@/config/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { text } from 'stream/consumers';
interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

const AuthModal = ({ show, onClose}: AuthModalProps): ReactElement => {
  const router = useRouter();
  const [isLoginView] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, status: boolean | null,danger:boolean }>({
    text: "",
    status: false,
    danger:false
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
       if (!formData.username || !formData.password) {
         setMessage({ text: "Username and password are required", status: false,danger:true });
         return;
       }
   
       setIsLoading(true);
       setMessage({ text: "", status: false,danger:false });
   
       try {
         const payload: LoginRequest = {
           username: formData.username,
           password: formData.password
         };
         const res = await fetch(`${API_ENDPOINT.auth}/login`, {
           method: 'POST',
           headers: { 
             'Content-Type': 'application/json',
           },
           credentials: 'include',
           body: JSON.stringify(payload),
         });
         if (res.status === 500) {
           setMessage({text:"Login Gagal",status:true,danger:true})
           return;
         }
   
         const result = await res.json();
         if (result.data.status === 'inactive') {
          setMessage({
            text: "Akun Anda tidak aktif. Silakan hubungi admin atau customer support untuk informasi lebih lanjut.",
            status: true,
            danger: true,
          });
          return;
        } else if (result.data.status === 'banned') {
          setMessage({
            text: "Akun Anda telah diblokir. Silakan hubungi admin atau customer support untuk bantuan.",
            status: true,
            danger: true,
          });
          return;
        }
        
         const data: TokenResource = result.data;
         // Set token via API route
         const tokenResponse = await fetch('/api/set-token-user', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ token: data.token }),
         });
   
         if (!tokenResponse.ok) {
           throw new Error("Failed to set authentication token");
         }
         setMessage({ text: 'Login successful! Redirecting...', status: true,danger:false });
         
         if (data.role !=='admin') {
            router.push("galon");
         }
  
         
   
       } catch (error) {
         console.error('Login error:', error);
         setMessage({ 
           text: error instanceof Error ? error.message : 'Something went wrong', 
           status: false ,
           danger:true
         });
       } finally {
         setIsLoading(false);
       }
  };

  const daftarAkun = (): void => {
    window.location.href = "signup";
  }
  return (
    
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-8">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 mb-6">
                <Lock className="h-7 w-7 text-indigo-600" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Masuk Akun
              </h3>

              {/* Alert Message */}
              {message.status && (
                <div
                  className={`mb-4 px-4 py-3 rounded-lg text-sm text-center font-medium ${
                    !message.danger
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                name="username"
                required
                minLength={3}
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline dark:text-blue-400">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            aria-label={isLoading ? "Signing in..." : "Sign in"}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLoginView ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
                  <button
                    type="button"
                    onClick={daftarAkun}
                    className="font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Daftar disini
                  </button>
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;