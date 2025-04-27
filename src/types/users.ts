export type UsersResource = {
    id:number,
    name:string,
    email:string,
    username:string,
    role:string,
    status:string
}

export type UserLocation = {
    id:number,
    user_id:number,
    latitude:number,
    longitude:number
}
export type UserLocationRequest = {
    userid:number | null,
    latitude:number,
    longitude:number
}

export type UserRequest = {
    nama:string,
    username:string,
    password:string,
    role:string,
    status:string
    nomor_handphone:string
    confirm_password:string
}


