import { Logout, SignUp } from "@/services/AuthUser";
import { UserRequest } from "@/types/users";

export const UseAuthUser = () => {
    const logout = async () => {
        try {
            const response = await Logout();
            return response;
        } catch (err: any) {
          console.error("Logout error:", err);
          throw err; 
        }
      };
      const signUp = async (payload:UserRequest): Promise<ApiResponse<null>> => {
        try {
            const response = await SignUp(payload);
            const data: ApiResponse<null> = await response.json();
            if (!response.ok) {
                throw new Error("error in server :"+data.message)
            }
            return data;
        } catch (error) {
          console.error("SignUp error:", error);
          throw error; // <= Penting!
        }
      }
    return {logout,signUp};
}