const base_url = process.env.NEXT_PUBLIC_API_URL

export const API_ENDPOINT ={
    stat:`${base_url}/statistik`,
    kriteria:`${base_url}/kriteria`,
    kecamatan:`${base_url}/kecamatan`,
    depot:`${base_url}/depot`,
    users:`${base_url}/users`,
    auth:`${base_url}/auth`,
    loginLogs:`${base_url}/login-logs`,
    user:`${base_url}/`,
    userLocation:`${base_url}/user-locations`,
    ratingDepot:`${base_url}/rating`
    
}