import type {
  AuthSession,
  UnauthorizedReason,
} from "@/types/auth";

let currentSession: AuthSession | null = null;
let unauthorizedHandler:
  | ((reason: UnauthorizedReason) => void)
  | null = null;
let isNotifying = false;

export function setSession(session: AuthSession) {
  currentSession = session;
  isNotifying = false;
}

export function clearSession() {
  currentSession = null;
}

export function getToken() {
  return currentSession?.token ?? null;
}

export function getExpiresAt() {
  return currentSession?.expiresAt ?? null;
}

export function isTokenExpired() {
  return (
    currentSession === null ||
    Date.now() >= currentSession.expiresAt
  );
}

export function subscribeUnauthorized(
  handler: (reason: UnauthorizedReason) => void,
) {
  unauthorizedHandler = handler;

  return () => {
    if (unauthorizedHandler === handler) {
      unauthorizedHandler = null;
    }
  };
}

export function notifyUnauthorized(reason: UnauthorizedReason) {
  if (isNotifying || !unauthorizedHandler) return;

  isNotifying = true;
  unauthorizedHandler(reason);
}
