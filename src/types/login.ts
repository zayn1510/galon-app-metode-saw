export type LoginRequest = {
    username:string,
    password:string
}

export type TokenResource = {
    userid:number,
    username:string,
    token:string,
    role:string
}

export type UserProfil = {
    id:number,
    name:string,
    username:string,
    role:string,
    status:string
}

export type LoginLastResource = {
    user_id:number,
    isp:string,
    username:string,
    nama:string,
    role:string,
    ip_address:string,
    device:string,
    browser:string,
    platform:string,
    country:string,
    city:string
}
export type  UserToken = {
  id:number
  username: string
}
