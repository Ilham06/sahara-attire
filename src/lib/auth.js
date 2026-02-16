const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const SESSION_KEY = "sahara_admin_session";

export function login(username, password) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: username, loggedIn: true }));
    }
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;
  try {
    return JSON.parse(session).loggedIn === true;
  } catch {
    return false;
  }
}
