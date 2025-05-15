export const signup = async ({ email, password }) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const { error } = await response.json();
    console.log(error);
    throw new Error(error || "Signup Falied");
  }
  return await response.json();
};

export const login = async ({ email, password }) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const { error } = await response.json();
    console.log(error);
    throw new Error(error || "Login Falied");
  }
  return await response.json();
};
export const logout = async ({ token }) => {
  const response = await fetch("api/auth/logout", {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "applicaiton/json",
    },
  });
  if (!response.ok) {
    const { error } = await response.json();
    console.log(error);
    throw new Error(error || "Logout Falied");
  }
  return response;
};