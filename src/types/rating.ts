
export interface RatingRequest {
    user_id:number,
    depot_id:number,
    komentar:string,
    rating:number
}
export type Ratings = {
  id: number;
  user_id: number;
  depot_id: number;
  nama: string;
  depot: string;
  komentar: string;
  rating: number;
  role: string;
  created_at: string;
};