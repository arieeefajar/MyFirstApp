import type { LoginResult } from "@/types/auth";

// Kredensial dummy untuk materi pembelajaran (tanpa backend).
const DUMMY_EMAIL = "lorem@example.com";
const DUMMY_PASSWORD = "lorem123";
const DUMMY_NAMA = "Lorem";

// Ubah nilai ini jika ingin mempercepat atau memperlama pengujian expiry.
export const TOKEN_TTL_MS = 60_000;

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function createDemoToken() {
  return `demo-token-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  // Simulasi latensi network agar loading state terlihat.
  await sleep(350);

  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail !== DUMMY_EMAIL ||
    password !== DUMMY_PASSWORD
  ) {
    return { ok: false, error: "Email atau password salah" };
  }

  return {
    ok: true,
    user: { nama: DUMMY_NAMA, email: DUMMY_EMAIL },
    session: {
      token: createDemoToken(),
      expiresAt: Date.now() + TOKEN_TTL_MS,
    },
  };
}
