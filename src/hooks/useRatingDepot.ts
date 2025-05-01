import { getRatingByDepot, submitRatingDepot } from "@/services/RatingService";
import { RatingRequest } from "@/types/rating";

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

      const SubmitRatingDepot = async (rating:RatingRequest,token:string): Promise<ApiResponse<null>> => {
        try {
            const response = await submitRatingDepot(rating,token)
            const data: ApiResponse<null> = await response.json();
            if (!response.ok) {
                throw new Error("error in server :"+data.message)
            }
            return data;
        } catch (error) {
          console.error("Submit rating error:", error);
          throw error;
        }
  }
  
    return {GetRatingDepot,SubmitRatingDepot}

}