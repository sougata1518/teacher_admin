export const login = (token) => {
  localStorage.setItem("jwt_token", token)
}

export const logout = () => {
  localStorage.removeItem("jwt_token")
}

export const isLoggedIn = () => {
  return !!localStorage.getItem("jwt_token")
}
