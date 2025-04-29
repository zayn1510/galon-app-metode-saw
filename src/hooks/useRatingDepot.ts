import { getRatingByDepot } from "@/services/RatingService";

export const useRatingDepot = ()=>{

      const GetRatingDepot = async (offset:number,limit:number,depot_id:number,token:string): Promise<ApiResponse<null>> => {
            try {
                const response = await getRatingByDepot(offset,limit,depot_id,token);
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
    return {GetRatingDepot}

}