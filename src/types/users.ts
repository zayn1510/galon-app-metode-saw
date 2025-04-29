export type UsersResource = {
    id:number,
    name:string,
    email:string,
    username:string,
    role:string,
    status:string,
    nomor_handphone:string
}

export type UserLocation = {
    id:number,
    user_id:number,
    latitude:number,
    longitude:number
}
export type UserLocationRequest = {
    userid:number | null,
    latitude:number | 0,
    longitude:number | 0
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

export type UpdateUserRequest = {
    nama:string,
    username:string,
    role:string,
    status:string
    nomor_handphone:string
    confirm_password:string
}

export type UpdatePasswordRequest = {
    username:string,
    password:string,
    new_password:string,
    confirm_new_password:string
}


