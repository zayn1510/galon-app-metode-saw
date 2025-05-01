'use client';

import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { LoginRequest, TokenResource } from '@/types/login';
import { API_ENDPOINT } from '@/config/api';

import { useRouter } from 'next/navigation';
import { UserIcon } from 'lucide-react';
import { MessageLogin } from '@/components/dashboard/components/MessageLogin';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, status: boolean | null }>({
    text: "",
    status: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.password) {
      setMessage({ text: "Username and password are required", status: false });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", status: null });

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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await res.json();
      const data: TokenResource = result.data;
      if (data.role !=='admin') {
        setMessage({
          text: "Akses terbatas - Hanya untuk Administrator sistem",
          status: false
        });
          return;
      }

      // Set token via API route
      const tokenResponse = await fetch('/api/set-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: data.token }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to set authentication token");
      }

      setMessage({ text: 'Login successful! Redirecting...', status: true });
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'Something went wrong', 
        status: false 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <LockClosedIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <MessageLogin 
            onClear={() => setMessage({ text: "", status: null })} 
            message={message} 
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Sign in to your account
          </p>
        </div>

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

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Dont have an account?
          <a
            href="#"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}