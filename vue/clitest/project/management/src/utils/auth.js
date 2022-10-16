// setToken()
export function setToken(token){
    sessionStorage.setItem("token",token)
}
// getToken
export function getToken(){
   return sessionStorage.getItem("token")
}
// remove
export function removeToken(){
    sessionStorage.clear()
}