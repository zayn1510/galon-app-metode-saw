import { API_ENDPOINT } from "@/config/api";
import { UserRequest } from "@/types/users";

export const Logout = async () => {
    try {
        const res = await fetch("api/auth-user/logout",{
            method : "POST",
            headers : {
                "Content-Type" : 'application/json'
            },
        })
        const data = await await res.json();
        if (!res.ok) {
            console.error(data.message || 'Logout Failed')
            return;
        }
        return data;
 
    } catch (error:any) {
        console.error('Logout error : ',error);
    }
}

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

