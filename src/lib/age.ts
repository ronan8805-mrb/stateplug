const COOKIE = "sp_age";
const DAYS = 30;

export function readAgeVerified(): boolean {
  if (typeof document === "undefined") return false;
  try {
    if (document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=1`))) {
      return true;
    }
    return window.localStorage.getItem(COOKIE) === "1";
  } catch {
    return false;
  }
}

export function writeAgeVerified() {
  if (typeof document === "undefined") return;
  const maxAge = DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE}=1; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  try {
    window.localStorage.setItem(COOKIE, "1");
  } catch {
    /* ignore */
  }
}

export function clearAgeVerified() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  try {
    window.localStorage.removeItem(COOKIE);
  } catch {
    /* ignore */
  }
}
