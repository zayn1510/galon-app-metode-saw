import { API_ENDPOINT } from "@/config/api";
import { UpdatePasswordRequest, UpdateUserRequest, UserRequest } from "@/types/users";

const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

export const Logout = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/auth-user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'same-origin' // optional but recommended for cookie support
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.message || 'Logout Failed');
      return;
    }

    return data;
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const LogoutAdmin = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'same-origin'
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.message || 'Logout Failed');
      return;
    }

    return data;
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const SignUp = async (payload:UserRequest): Promise<Response> => {
    const res = await fetch(API_ENDPOINT.user+"user/signup",{
        method : "POST",
        headers : {
            "Content-Type" : 'application/json'
        },
        body:JSON.stringify(payload)
    })
    return res;
}

export const Detailuser = async (username:string,token:string): Promise<Response> => {
    const res = await fetch(API_ENDPOINT.users+"/by/"+username,{
        method : "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
    })
    return res;
}

export const Updateuser = async (id:number,user:UpdateUserRequest,token:string): Promise<Response> => {
    const res = await fetch(API_ENDPOINT.users+"/"+id,{
        method : "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        body : JSON.stringify(user)
    })
    return res;
}
export const UpdatePassword = async (update:UpdatePasswordRequest): Promise<Response> => {
  const res = await fetch(API_ENDPOINT.auth+"/update-password",{
      method : "PUT",
      headers: {
          "Content-Type": "application/json",
        },
      credentials:"include",
      body : JSON.stringify(update)
  })
  return res;
}

