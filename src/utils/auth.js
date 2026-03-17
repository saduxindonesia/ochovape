const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'roma';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'romamotor1234';

export function login(username, password) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem('roma-admin-auth', JSON.stringify({ user: username, loggedIn: true }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('roma-admin-auth');
}

export function isAuthenticated() {
  try {
    const auth = JSON.parse(localStorage.getItem('roma-admin-auth'));
    return auth?.loggedIn === true;
  } catch {
    return false;
  }
}
