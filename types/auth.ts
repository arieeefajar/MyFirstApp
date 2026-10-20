import type { User } from "@/types";

export type AuthSession = {
  token: string;
  expiresAt: number;
};

export type LoginResult =
  | {
      ok: true;
      user: User;
      session: AuthSession;
    }
  | {
      ok: false;
      error: string;
    };

export type UnauthorizedReason = "expired" | "unauthorized";
