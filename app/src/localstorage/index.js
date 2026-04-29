export const login = (user_data) => {
  localStorage.setItem("user_data", JSON.stringify(user_data))
}

export const logout = () => {
  localStorage.removeItem("user_data")
}

export const isLoggedIn = () => {
  return !!localStorage.getItem("user_data")
}

export const getUserData = (option) => {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  if (option === "token") return user_data?.token;
  return user_data;
}

export const updateUserData = (newData) => {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const updated_data = { ...user_data, ...newData };
  localStorage.setItem("user_data", JSON.stringify(updated_data));
}
