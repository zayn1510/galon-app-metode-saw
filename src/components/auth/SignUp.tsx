"use client"

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowRight, FiCheck, FiLock, FiUser, FiPhone, FiKey, FiMail } from 'react-icons/fi';
import { UserRequest } from '@/types/users';
import { useValidate } from '@/hooks/useValidate';
import Alert from '@mui/material/Alert';
import { UseAuthUser } from '@/hooks/useAuthUser';


const SignUp = () => {
  const [step, setStep] = useState(1);
  const [passwordError, setPasswordError] = useState('');
  const {validatePassword} =useValidate();
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formData, setFormData] = useState<UserRequest>({
    username: "",
    password: "",
    nama: "",
    role: "",
    status: "",
    nomor_handphone: "",
    confirm_password: ""
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordError('Password harus minimal 8 karakter, mengandung 1 huruf kapital, 1 angka, dan 1 karakter spesial.');
      } else {
        setPasswordError('');
      }
    }

    // Validasi confirm password jika field yang berubah adalah confirm_password
    if (name === 'confirm_password') {
      if (value !== formData.password) {
        setConfirmPasswordError('Password dan konfirmasi password tidak cocok.');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  const handleNextStep = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
     
      try {
        const payload:UserRequest ={
          username:formData.username,
          password:formData.password,
          nama:formData.nama,
          nomor_handphone:formData.nomor_handphone,
          role:"user",
          status:"active",
          confirm_password:""
        };
        const {signUp} = UseAuthUser();
        const res: ApiResponse<null> = await signUp(payload);
        if (res.status) {
          toast.success('Akun berhasil dibuat! Mengarahkan...', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(()=>{
            window.location.href="/";
          },3000)
          return;
        }
        toast.error('Akun gagal dibuat', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

         
      } catch (error) {
          console.error("error in server :"+error)
      }
     
    }
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <FiPhone className="w-4 h-4" />;
      case 2: return <FiUser className="w-4 h-4" />;
      case 3: return <FiMail className="w-4 h-4" />;
      case 4: return <FiLock className="w-4 h-4" />;
      default: return <FiCheck className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            {step === 4 ? 'Amankan Akun Anda' : 'Buat Akun Anda'}
          </h2>
          <p className="text-gray-500 text-sm">
            {step === 4 ? 'Tentukan password yang kuat untuk melindungi akun Anda' : `Langkah ${step} dari 4`}
          </p>
        </div>

        {/* Minimal Step Progress */}
        <div className="mb-8 px-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>

            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${step >= stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'} 
                  ${step === stepNumber ? 'ring-2 ring-blue-200' : ''} transition-colors`}>
                  {step > stepNumber ? <FiCheck className="w-3 h-3" /> : getStepIcon(stepNumber)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span className={step >= 1 ? "text-blue-500 font-medium" : ""}>Telepon</span>
            <span className={step >= 2 ? "text-blue-500 font-medium" : ""}>Username</span>
            <span className={step >= 3 ? "text-blue-500 font-medium" : ""}>Profil</span>
            <span className={step >= 4 ? "text-blue-500 font-medium" : ""}>Password</span>
          </div>
        </div>

        <form onSubmit={handleNextStep} className="space-y-5">
          {step === 1 && (
            <div className="space-y-1">
              <label htmlFor="nomor_handphone" className="text-sm font-medium text-gray-700">
                Nomor Telepon
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">+62</span>
                </div>
                <input
                  type="tel"
                  name="nomor_handphone"
                  id="nomor_handphone"
                  value={formData.nomor_handphone}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="81234567890"
                  pattern="^[0-9]{9,13}$"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Kami akan mengirimkan kode verifikasi ke nomor ini
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="username"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Pilih username yang unik (huruf, angka, garis bawah)
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-1">
              <label htmlFor="nama" className="text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <>
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiKey className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                    
                  />
                                 {passwordError && (
                    <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
                      {passwordError}
                    </Alert>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiKey className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                  {confirmPasswordError && (
  <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
    {confirmPasswordError}
  </Alert>
)}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 mt-5"
          >
            <span>{step === 4 ? 'Daftar' : 'Lanjutkan'}</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
