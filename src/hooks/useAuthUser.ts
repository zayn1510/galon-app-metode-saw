
import { Detailuser, fetchUserById, Logout, LogoutAdmin, SignUp, UpdatePassword, Updateuser } from "@/services/AuthUser";
import { UpdatePasswordRequest, UpdateUserRequest, UserRequest } from "@/types/users";

export const UseAuthUser = () => {
    const logout = async () => {
        try {
            const response = await Logout();
            return response;
        } catch (err) {
          console.error("Logout error:", err);
          throw err; 
        }
      };

      const logoutAdmin = async () => {
        try {
            const response = await LogoutAdmin();
            return response;
        } catch (err) {
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

      const detailUser = async (username:string,token:string): Promise<ApiResponse<null>> => {
        try {
            const response = await Detailuser(username,token);
            const data: ApiResponse<null> = await response.json();
            if (!response.ok) {
                throw new Error("error in server :"+data.message)
            }
            return data;
        } catch (error) {
          console.error("SignUp error:", error);
          throw error;
        }
      }

      const updateUser = async (id:number,user:UpdateUserRequest,token:string): Promise<ApiResponse<null>> => {
        try {
            const response = await Updateuser(id,user,token);
            const data: ApiResponse<null> = await response.json();
            if (!response.ok) {
                throw new Error("error in server :"+data.message)
            }
            return data;
        } catch (error) {
          console.error("SignUp error:", error);
          throw error;
        }
      }

      const updatePassword = async (update:UpdatePasswordRequest): Promise<ApiResponse<null>> => {
        try {
            const response = await UpdatePassword(update);
            const data: ApiResponse<null> = await response.json();
            if (!response.ok) {
                throw new Error("error in server :"+data.message)
            }
            return data;
        } catch (error) {
          console.error("SignUp error:", error);
          throw error;
        }
      }

      const detailUserById = async (id:number): Promise<ApiResponse<null>> => {
        try {
            const response = await fetchUserById(id)
            const data: ApiResponse<null> = await response.json();
            if (!response.ok) {
                throw new Error("error in server :"+data.message)
            }
            return data;
        } catch (error) {
          console.error("error:", error);
          throw error;
        }
      }
      
      
    return {logout,signUp,detailUser,updateUser,logoutAdmin,updatePassword,detailUserById};
}