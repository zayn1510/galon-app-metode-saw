import { API_ENDPOINT } from "@/config/api";

export const getRatingByDepot = async(page:number,limit:number,depot_id:number,token:string): Promise<Response> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        depot:depot_id.toString()
      });  
    const res = await fetch(API_ENDPOINT.ratingDepot+"?"+params,{
        method : "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
    })
    return res;
};