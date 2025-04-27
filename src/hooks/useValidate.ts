export const useValidate = ()=> {
    const validatePassword = (password:string) => {
        // Minimum 8 karakter
        const minLength = password.length >= 8;
      
        // Memiliki setidaknya 1 huruf kapital
        const hasUpperCase = /[A-Z]/.test(password);
      
        // Memiliki setidaknya 1 angka
        const hasNumber = /\d/.test(password);
      
        // Memiliki setidaknya 1 karakter spesial
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
      
        // Mengembalikan true jika semua kondisi terpenuhi
        return minLength && hasUpperCase && hasNumber && hasSpecialChar;
      }
    return {validatePassword}  
}