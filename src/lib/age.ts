const SESSION_KEY = "sp_age_ok";
const LEGACY_COOKIE = "sp_age";

function clearLegacy() {
  if (typeof document === "undefined") return;
  document.cookie = `${LEGACY_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  try {
    window.localStorage.removeItem(LEGACY_COOKIE);
  } catch {
    /* ignore */
  }
}

/** True only for this browser tab session — a new visit always gates. */
export function readAgeVerified(): boolean {
  if (typeof window === "undefined") return false;
  try {
    clearLegacy();
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeAgeVerified() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
  clearLegacy();
}

export function clearAgeVerified() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
  clearLegacy();
}
